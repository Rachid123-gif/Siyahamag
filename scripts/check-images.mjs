#!/usr/bin/env node
/**
 * Daily image checker for SiyahaMag.ma
 *
 * Crawls every page in the sitemap, extracts all image URLs (remote like
 * Unsplash + absolute image src), and verifies each returns HTTP 200.
 * Writes a Markdown report and exits 1 if any image is broken, so the
 * workflow can open a GitHub issue.
 *
 * No dependencies (Node 20+ global fetch).
 */

import fs from "node:fs/promises"

const BASE = "https://siyahamag.ma"
const SITEMAP = `${BASE}/sitemap.xml`
const IMG_EXT = /\.(jpe?g|png|webp|gif|avif|svg)(\?|$)/i

async function getText(url, timeoutMs = 15000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": "SiyahaMag-ImageChecker/1.0" } })
    if (!r.ok) return ""
    return await r.text()
  } catch {
    return ""
  } finally {
    clearTimeout(t)
  }
}

function extractImages(html) {
  const urls = new Set()
  // Remote image hosts (Unsplash etc.)
  for (const m of html.matchAll(/https:\/\/images\.unsplash\.com\/[^\s"'<>)]+/g)) {
    urls.add(m[0].replace(/&amp;/g, "&"))
  }
  // Any <img src="..."> with an absolute URL or image extension
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
    let src = m[1].replace(/&amp;/g, "&")
    if (src.startsWith("/_next/image")) continue // proxied; the source URL is already captured above
    if (src.startsWith("/")) src = BASE + src
    if (src.startsWith("http") && (src.includes("unsplash") || IMG_EXT.test(src))) urls.add(src)
  }
  return urls
}

async function checkImage(url, timeoutMs = 12000) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    // GET a tiny range — some CDNs don't answer HEAD reliably.
    const r = await fetch(url, { signal: ctrl.signal, headers: { Range: "bytes=0-0", "User-Agent": "SiyahaMag-ImageChecker/1.0" } })
    return r.status
  } catch {
    return 0
  } finally {
    clearTimeout(t)
  }
}

async function main() {
  console.log("🖼️  Image checker — fetching sitemap…")
  const sitemap = await getText(SITEMAP)
  const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (pages.length < 5) {
    console.error("Sitemap too small — aborting.")
    process.exit(0)
  }
  console.log(`Pages to scan: ${pages.length}`)

  // Collect unique images across all pages.
  const images = new Set()
  const imagePages = new Map() // image -> first page it appeared on
  let scanned = 0
  for (const page of pages) {
    const html = await getText(page)
    for (const img of extractImages(html)) {
      if (!images.has(img)) imagePages.set(img, page)
      images.add(img)
    }
    scanned++
    if (scanned % 25 === 0) console.log(`  scanned ${scanned}/${pages.length} pages…`)
  }
  console.log(`Unique images found: ${images.size}`)

  // Test each unique image.
  const broken = []
  let i = 0
  for (const img of images) {
    const status = await checkImage(img)
    if (status !== 200 && status !== 206) {
      broken.push({ img, status, page: imagePages.get(img) })
      console.log(`  ✗ ${status}  ${img}`)
    }
    i++
    if (i % 50 === 0) console.log(`  tested ${i}/${images.size} images…`)
  }

  const report = [
    `# Rapport vérification images — ${new Date().toISOString().slice(0, 10)}`,
    "",
    `Pages scannées : ${pages.length} · Images testées : ${images.size} · Cassées : **${broken.length}**`,
    "",
  ]
  if (broken.length) {
    report.push("| Statut | Image | Page concernée |", "|---|---|---|")
    for (const b of broken) report.push(`| ${b.status} | ${b.img} | ${b.page.replace(BASE, "")} |`)
  } else {
    report.push("✅ Aucune image cassée.")
  }
  await fs.writeFile("broken-images-report.md", report.join("\n"), "utf8")

  console.log(`\n=== ${broken.length} image(s) cassée(s) sur ${images.size} ===`)
  if (broken.length) process.exit(1)
}

main().catch((e) => {
  console.error("image checker failed:", e.message)
  process.exit(0) // don't fail the workflow on the checker's own error
})
