#!/usr/bin/env node
/**
 * One-shot maintenance: mark clearly off-topic legacy /news pages as noindex.
 *
 * Early daily-seo runs (before the filter was hardened) published some pages
 * that have nothing to do with tourism — football results, public-health, heavy
 * industry, poetry. They dilute the domain's topical authority. This script
 * adds `robots: { index: false, follow: true }` to their metadata so Google
 * drops them from the index, without deleting the pages.
 *
 * Conservative on purpose: music/cultural festivals and World-Cup-2030
 * infrastructure are LEFT indexed (they're legitimate tourism topics).
 *
 * Idempotent — safe to re-run.
 */

import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const NEWS_DIR = path.join(__dirname, "..", "src/app/(public)/news")

// Match slugs that are unambiguously NOT about tourism.
const OFF_TOPIC = /(^|-)(foot|football|lionnes|lions-de-latlas|sanitaire|industriel|sortie-de-lacier|aluminium|poesie)(-|$)/i

async function main() {
  const entries = await fs.readdir(NEWS_DIR, { withFileTypes: true })
  let touched = 0
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (!OFF_TOPIC.test(entry.name)) continue

    const filePath = path.join(NEWS_DIR, entry.name, "page.tsx")
    let src
    try {
      src = await fs.readFile(filePath, "utf8")
    } catch {
      continue
    }
    if (src.includes("index: false")) {
      console.log(`  • already noindex: ${entry.name}`)
      continue
    }
    const marker = "export const metadata: Metadata = {"
    if (!src.includes(marker)) {
      console.log(`  ⚠️  no metadata block, skipped: ${entry.name}`)
      continue
    }
    src = src.replace(
      marker,
      `${marker}\n  // Off-topic legacy page — noindex so it doesn't dilute the tourism domain.\n  robots: { index: false, follow: true },`
    )
    await fs.writeFile(filePath, src, "utf8")
    touched++
    console.log(`  ✓ noindex: ${entry.name}`)
  }
  console.log(`\nDone. ${touched} page(s) updated.`)
}

main().catch((err) => {
  console.error("noindex-offtopic-news failed:", err.message)
  process.exit(1)
})
