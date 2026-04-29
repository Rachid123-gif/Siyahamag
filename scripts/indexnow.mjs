#!/usr/bin/env node
/**
 * IndexNow — instant indexation on Bing, Yandex (and any IndexNow-compliant
 * search engine). Pings the IndexNow API with the list of URLs we want
 * crawled now instead of waiting for Bing/Yandex to come find them.
 *
 * Spec: https://www.indexnow.org/documentation
 *
 * Setup:
 *  1. A key file has been deposited at /public/<KEY>.txt containing only
 *     the key — Bing fetches it to verify ownership.
 *  2. Run this script with `URLS=url1,url2,...` to ping those URLs, OR
 *     run with no args to ping the whole sitemap (max 10000).
 *
 * The daily-seo workflow calls this with the freshly generated URLs.
 */

import https from "node:https"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

const KEY = "d4f8a72e9c1b48a3bf6d5e9c2a8b71e3"
const HOST = "siyahamag.ma"
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

function postJson(host, payloadObj) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payloadObj)
    const req = https.request(
      {
        method: "POST",
        host,
        path: "/indexnow",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(data),
        },
        timeout: 15000,
      },
      (res) => {
        let body = ""
        res.on("data", (c) => (body += c))
        res.on("end", () =>
          resolve({ host, status: res.statusCode, body: body.slice(0, 200) })
        )
      }
    )
    req.on("error", (e) =>
      resolve({ host, status: 0, body: `error: ${e.message}` })
    )
    req.on("timeout", () => {
      req.destroy()
      resolve({ host, status: 0, body: "timeout" })
    })
    req.write(data)
    req.end()
  })
}

async function readSitemapUrls() {
  return new Promise((resolve, reject) => {
    https
      .get(`https://${HOST}/sitemap.xml`, { timeout: 20000 }, (res) => {
        let body = ""
        res.on("data", (c) => (body += c))
        res.on("end", () => {
          const matches = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
            (m) => m[1]
          )
          resolve(matches)
        })
      })
      .on("error", reject)
  })
}

async function main() {
  let urls
  if (process.env.URLS) {
    urls = process.env.URLS.split(",")
      .map((u) => u.trim())
      .filter(Boolean)
  } else {
    console.log("Fetching sitemap from prod ...")
    urls = await readSitemapUrls()
  }
  if (urls.length === 0) {
    console.log("No URLs to submit.")
    return
  }
  // Cap at 10000 per IndexNow spec, batch into chunks of 500.
  urls = urls.slice(0, 10000)
  const chunks = []
  for (let i = 0; i < urls.length; i += 500) {
    chunks.push(urls.slice(i, i + 500))
  }
  console.log(
    `Submitting ${urls.length} URL(s) in ${chunks.length} chunk(s) to IndexNow ...`
  )
  // Submit to multiple IndexNow endpoints in parallel — they sync between
  // themselves but submitting to >1 reduces single-point-of-failure risk.
  const ENDPOINTS = ["api.indexnow.org", "www.bing.com", "yandex.com"]

  for (const [i, chunk] of chunks.entries()) {
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    }
    const results = await Promise.all(ENDPOINTS.map((h) => postJson(h, payload)))
    for (const r of results) {
      console.log(`  chunk ${i + 1} → ${r.host} HTTP ${r.status} ${r.body}`)
    }
  }

  // Persist what we submitted (for later auditability)
  const logPath = path.join(ROOT, "content/queue/indexnow-log.json")
  let log = { runs: [] }
  try {
    log = JSON.parse(await fs.readFile(logPath, "utf8"))
  } catch {
    /* first run */
  }
  log.runs = [
    { date: new Date().toISOString(), count: urls.length },
    ...(log.runs || []).slice(0, 49),
  ]
  await fs.mkdir(path.dirname(logPath), { recursive: true })
  await fs.writeFile(logPath, JSON.stringify(log, null, 2))
  console.log(`Logged. Total runs tracked: ${log.runs.length}`)
}

main().catch((e) => {
  console.error("indexnow failed:", e.message)
  process.exitCode = 1
})
