#!/usr/bin/env node
/**
 * Google Search Console — Search Analytics report.
 *
 * Pulls the last 28 days of search performance for siyahamag.ma and prints a
 * Markdown report: top queries, top pages, and "quick wins" (queries ranking
 * in positions 5-20 — one good edit away from page 1). This is the data-driven
 * core of the ranking strategy: optimize what's already almost ranking.
 *
 * Auth: a Google service account (the same one used for the Indexing API works
 * if it also has read access in Search Console). Provide via:
 *   - GOOGLE_INDEXING_SA_JSON  : the full service-account JSON (string), or
 *   - GOOGLE_APPLICATION_CREDENTIALS : path to the JSON file.
 * The service account must be added as a user (Restricted is enough) on the
 * Search Console property for https://siyahamag.ma/ (or sc-domain:siyahamag.ma).
 *
 * No external dependencies. Fails gracefully (prints a notice, exits 0).
 */

import crypto from "node:crypto"
import fs from "node:fs/promises"
import https from "node:https"

const SITE_URL = process.env.GSC_SITE_URL || "https://siyahamag.ma/"
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"
const TOKEN_HOST = "oauth2.googleapis.com"
const GSC_HOST = "searchconsole.googleapis.com"

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

async function loadServiceAccount() {
  if (process.env.GOOGLE_INDEXING_SA_JSON) return JSON.parse(process.env.GOOGLE_INDEXING_SA_JSON)
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS)
    return JSON.parse(await fs.readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf8"))
  return null
}

function httpsPost(host, path, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({ method: "POST", host, path, headers, timeout: 20000 }, (res) => {
      let data = ""
      res.on("data", (c) => (data += c))
      res.on("end", () => resolve({ status: res.statusCode, body: data }))
    })
    req.on("error", reject)
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")) })
    req.write(body)
    req.end()
  })
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
  const claim = base64url(JSON.stringify({
    iss: sa.client_email, scope: SCOPE, aud: `https://${TOKEN_HOST}/token`, iat: now, exp: now + 3600,
  }))
  const signingInput = `${header}.${claim}`
  const signature = crypto.createSign("RSA-SHA256").update(signingInput).sign(sa.private_key)
  const jwt = `${signingInput}.${base64url(signature)}`
  const form = `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${encodeURIComponent(jwt)}`
  const res = await httpsPost(TOKEN_HOST, "/token",
    { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": Buffer.byteLength(form) }, form)
  if (res.status !== 200) throw new Error(`Token exchange failed: HTTP ${res.status} ${res.body.slice(0, 160)}`)
  return JSON.parse(res.body).access_token
}

async function query(token, body) {
  const payload = JSON.stringify(body)
  const res = await httpsPost(GSC_HOST,
    `/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) },
    payload)
  if (res.status !== 200) throw new Error(`Search Analytics HTTP ${res.status}: ${res.body.slice(0, 200)}`)
  return JSON.parse(res.body).rows || []
}

function dateNDaysAgo(n, nowMs) {
  return new Date(nowMs - n * 864e5).toISOString().slice(0, 10)
}

async function main() {
  const sa = await loadServiceAccount()
  if (!sa) {
    console.log("_Search Console non configuré (GOOGLE_INDEXING_SA_JSON absent)._")
    return
  }
  // Date.now() is fine here — this is a standalone CLI, not a workflow script.
  const nowMs = Date.now()
  const startDate = dateNDaysAgo(28, nowMs)
  const endDate = dateNDaysAgo(2, nowMs) // GSC data lags ~2 days

  try {
    const token = await getAccessToken(sa)
    const base = { startDate, endDate, type: "web" }
    const [queries, pages] = await Promise.all([
      query(token, { ...base, dimensions: ["query"], rowLimit: 25 }),
      query(token, { ...base, dimensions: ["page"], rowLimit: 15 }),
    ])

    const fmt = (r) => ({
      key: r.keys[0], clicks: r.clicks, impr: r.impressions,
      ctr: (r.ctr * 100).toFixed(1) + "%", pos: r.position.toFixed(1),
    })
    const q = queries.map(fmt)
    const quickWins = q.filter((r) => parseFloat(r.pos) >= 5 && parseFloat(r.pos) <= 20 && r.impr >= 10)
      .sort((a, b) => b.impr - a.impr).slice(0, 10)

    const out = []
    out.push(`## Search Console — ${startDate} → ${endDate}`)
    out.push("")
    const totC = q.reduce((s, r) => s + r.clicks, 0)
    const totI = q.reduce((s, r) => s + r.impr, 0)
    out.push(`Clics: **${totC}** · Impressions: **${totI}** (top 25 requêtes)`)
    out.push("")
    out.push("### Quick wins (position 5-20 → cibles page 1)")
    if (quickWins.length) {
      out.push("| Requête | Position | Impressions | CTR |")
      out.push("|---|---|---|---|")
      quickWins.forEach((r) => out.push(`| ${r.key} | ${r.pos} | ${r.impr} | ${r.ctr} |`))
    } else {
      out.push("_Aucune requête en position 5-20 pour l'instant (indexation récente — revenir plus tard)._")
    }
    out.push("")
    out.push("### Top requêtes")
    out.push("| Requête | Clics | Impr. | CTR | Pos. |")
    out.push("|---|---|---|---|---|")
    q.slice(0, 10).forEach((r) => out.push(`| ${r.key} | ${r.clicks} | ${r.impr} | ${r.ctr} | ${r.pos} |`))
    out.push("")
    out.push("### Top pages")
    out.push("| Page | Clics | Impr. | Pos. |")
    out.push("|---|---|---|---|")
    pages.map(fmt).slice(0, 10).forEach((r) => out.push(`| ${r.key.replace("https://siyahamag.ma", "")} | ${r.clicks} | ${r.impr} | ${r.pos} |`))

    console.log(out.join("\n"))
  } catch (err) {
    console.log(`_Rapport Search Console indisponible : ${err.message}_`)
  }
}

main().catch((e) => { console.log(`_GSC report error: ${e.message}_`); process.exitCode = 0 })
