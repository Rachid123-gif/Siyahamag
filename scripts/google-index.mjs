#!/usr/bin/env node
/**
 * Google Indexing API — notify Google of new/updated URLs.
 *
 * Google's Indexing API officially supports pages with JobPosting or
 * BroadcastEvent structured data (which SiyahaMag's /emplois pages have).
 * We use it to push freshly published URLs for fast crawling, in addition
 * to the sitemap (which remains the primary discovery channel for the rest).
 *
 * Auth: a Google Cloud service account with the Indexing API enabled, added
 * as an *owner* of the property in Search Console. Provide its credentials via:
 *   - GOOGLE_INDEXING_SA_JSON  : the full service-account JSON (as a string), or
 *   - GOOGLE_APPLICATION_CREDENTIALS : path to the JSON file.
 *
 * Usage:
 *   URLS="https://siyahamag.ma/news/x,https://siyahamag.ma/emplois/y" \
 *   GOOGLE_INDEXING_SA_JSON='{...}' node scripts/google-index.mjs
 *
 * No external dependencies — JWT is signed with Node's built-in crypto.
 * Fails gracefully (exit 0) so it never breaks the daily pipeline.
 */

import crypto from "node:crypto"
import fs from "node:fs/promises"
import https from "node:https"

const TOKEN_HOST = "oauth2.googleapis.com"
const INDEXING_HOST = "indexing.googleapis.com"
const SCOPE = "https://www.googleapis.com/auth/indexing"

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

async function loadServiceAccount() {
  if (process.env.GOOGLE_INDEXING_SA_JSON) {
    return JSON.parse(process.env.GOOGLE_INDEXING_SA_JSON)
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"))
  }
  return null
}

function httpsPost(host, path, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { method: "POST", host, path, headers, timeout: 15000 },
      (res) => {
        let data = ""
        res.on("data", (c) => (data += c))
        res.on("end", () => resolve({ status: res.statusCode, body: data }))
      }
    )
    req.on("error", reject)
    req.on("timeout", () => {
      req.destroy()
      reject(new Error("timeout"))
    })
    req.write(body)
    req.end()
  })
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
      aud: `https://${TOKEN_HOST}/token`,
      iat: now,
      exp: now + 3600,
    })
  )
  const signingInput = `${header}.${claim}`
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(signingInput)
    .sign(sa.private_key)
  const jwt = `${signingInput}.${base64url(signature)}`

  const form = `grant_type=${encodeURIComponent(
    "urn:ietf:params:oauth:grant-type:jwt-bearer"
  )}&assertion=${encodeURIComponent(jwt)}`

  const res = await httpsPost(
    TOKEN_HOST,
    "/token",
    { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(form) },
    form
  )
  if (res.status !== 200) {
    throw new Error(`Token exchange failed: HTTP ${res.status} ${res.body.slice(0, 200)}`)
  }
  return JSON.parse(res.body).access_token
}

async function publishUrl(token, url) {
  const payload = JSON.stringify({ url, type: "URL_UPDATED" })
  const res = await httpsPost(
    INDEXING_HOST,
    "/v3/urlNotifications:publish",
    {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
    payload
  )
  return res
}

async function main() {
  const sa = await loadServiceAccount()
  if (!sa) {
    console.log("⏭️  No Google service-account credentials — skipping Indexing API.")
    return
  }

  const urls = (process.env.URLS || "")
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean)
    // Indexing API is most reliable for job/news detail pages.
    .filter((u) => u.includes("/news/") || u.includes("/emplois/"))

  if (urls.length === 0) {
    console.log("No eligible URLs for the Indexing API.")
    return
  }

  console.log(`🔎 Submitting ${urls.length} URL(s) to Google Indexing API ...`)
  const token = await getAccessToken(sa)
  for (const url of urls) {
    try {
      const res = await publishUrl(token, url)
      console.log(`  ${url} → HTTP ${res.status}`)
    } catch (err) {
      console.log(`  ${url} → error: ${err.message}`)
    }
  }
  console.log("✅ Google Indexing API done.")
}

main().catch((err) => {
  console.error("google-index failed (non-fatal):", err.message)
  process.exitCode = 0
})
