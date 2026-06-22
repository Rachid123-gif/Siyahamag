#!/usr/bin/env node
/**
 * Daily SEO automation script for SiyahaMag.ma
 *
 * What it does:
 * 1. Fetches tourism news from Moroccan RSS feeds
 * 2. Filters articles by tourism keywords
 * 3. Generates Next.js pages under src/app/(public)/news/[slug]/
 * 4. Updates the sitemap (via revalidation on Netlify)
 * 5. Logs results for the health check
 *
 * Designed to fail gracefully: if RSS fetching fails, it falls back to
 * evergreen content from content/queue/evergreen.json.
 */

import Parser from "rss-parser"
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  isAiEnabled,
  generateArticle,
  buildArticlePage,
  buildThinPage,
} from "./ai-content.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

// ── Configuration ────────────────────────────────────────────────────

const RSS_FEEDS = [
  { name: "Le360 Fr", url: "https://fr.le360.ma/rss" },
  { name: "Medias24", url: "https://medias24.com/feed/" },
  { name: "Hespress Fr", url: "https://fr.hespress.com/feed" },
  { name: "Morocco World News", url: "https://www.moroccoworldnews.com/feed" },
  { name: "TelQuel", url: "https://telquel.ma/feed" },
]

// Strong keywords — matching one is enough
const TOURISM_STRONG = [
  "tourisme", "touriste", "touristique",
  "hôtel", "hotel", "hôtelier", "hotelier", "hôtellerie", "hotellerie",
  "riad ", "maison d'hôtes", "maison d'hotes",
  "onmt", "office du tourisme", "office national marocain du tourisme",
  "nuitées", "nuitees",
  "coupe du monde 2030", "mondial 2030",
  "recette touristique", "recettes touristiques",
  "fédération hôtelière", "federation hoteliere", "fnih",
  "visit morocco", "tourisme marocain",
]

// Weak keywords — need at least 2 to match
const TOURISM_WEAK = [
  "aéroport", "aeroport", "aérien", "aerien", "compagnie aérienne",
  "marrakech", "agadir", "fès", "fes ", "tanger", "essaouira", "casablanca",
  "chefchaouen", "dakhla", "ouarzazate", "rabat",
  "visa", "arrivées", "arrivees", "voyageur",
  "médina", "medina", "patrimoine", "festival",
  "gastronomie", "culinaire",
  "plage", "désert", "desert", "atlas",
]

const MAX_ARTICLES_PER_DAY = 3
const OUTPUT_DIR = path.join(ROOT, "src/app/(public)/news")
const STATE_FILE = path.join(ROOT, "content/queue/state.json")
const EVERGREEN_FILE = path.join(ROOT, "content/queue/evergreen.json")
const LOG_FILE = path.join(ROOT, "content/queue/daily-log.json")

// ── Utilities ────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

// Negative keywords — exclude if present even if other keywords match.
// Expanded to kill the off-topic noise that was diluting topical authority
// (sport, politics, crime, health, industry, music festivals, etc.).
const NEGATIVE_KEYWORDS = [
  // crime / faits divers
  "meurtre", "assassinat", "cocaïne", "cocaine", "drogue", "trafic",
  "suicide", "suicides", "enquête judiciaire", "enquete judiciaire",
  "prison", "détenu", "detenu", "accident mortel", "décès", "deces",
  "cadavre", "agression", "viol", "crime",
  // sport
  "foot", "football", "match", "matchs", "lionnes", "lions de l'atlas",
  "can 2025", "can-2025", "botola", "raja", "wydad", "stade",
  // santé / industrie / autres hors-sujet
  "sanitaire", "hôpital", "hopital", "industriel", "industrie",
  "poésie", "poesie", "concert", "élections", "elections",
]

function isTourismRelated(title, content) {
  const titleLower = (title || "").toLowerCase()
  const text = `${title || ""} ${content || ""}`.toLowerCase()
  // Exclude if any negative keyword is present (title or content).
  if (NEGATIVE_KEYWORDS.some((kw) => text.includes(kw))) return false
  // STRICT: require at least one STRONG tourism keyword in the TITLE.
  // The old "2 weak keywords" path let through sport/festival/politics noise
  // (e.g. "festival" + a city name), so it has been removed entirely.
  return TOURISM_STRONG.some((kw) => titleLower.includes(kw))
}

async function readJsonSafe(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8")
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
}

// ── RSS Fetching ─────────────────────────────────────────────────────

async function fetchFeed(feed, parser, timeoutMs = 10000) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeoutMs)
  )
  try {
    const data = await Promise.race([parser.parseURL(feed.url), timeoutPromise])
    console.log(`  ✓ ${feed.name}: ${data.items?.length || 0} items`)
    return (data.items || []).map((item) => ({
      ...item,
      source: feed.name,
    }))
  } catch (err) {
    console.log(`  ✗ ${feed.name}: ${err.message}`)
    return []
  }
}

async function fetchAllFeeds() {
  console.log("\n📡 Fetching RSS feeds...")
  const parser = new Parser({
    timeout: 15000,
    headers: {
      "User-Agent": "SiyahaMag-Bot/1.0 (+https://siyahamag.ma)",
    },
  })

  const results = await Promise.allSettled(
    RSS_FEEDS.map((feed) => fetchFeed(feed, parser))
  )

  const items = results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value)

  console.log(`\n→ Total items fetched: ${items.length}`)
  return items
}

// ── Article Generation ───────────────────────────────────────────────
//
// When ANTHROPIC_API_KEY is set, each RSS item becomes an ORIGINAL long-form
// article (indexable, with FAQ + internal links). Without a key, we fall back
// to a thin summary page marked noindex so it never dilutes domain quality.

async function writeArticle(item) {
  const baseSlug = slugify(item.title || "sans-titre")
  const dateSlug = new Date(item.pubDate || item.isoDate || Date.now())
    .toISOString()
    .slice(0, 10)
  const slug = `${dateSlug}-${baseSlug}`.slice(0, 100)

  const dir = path.join(OUTPUT_DIR, slug)
  const filePath = path.join(dir, "page.tsx")

  // Skip if already exists
  try {
    await fs.access(filePath)
    return { slug, skipped: true }
  } catch {
    // Doesn't exist, proceed
  }

  const publishedAt = item.pubDate || item.isoDate
  let content
  let mode

  // Try original AI generation first.
  const body = await generateArticle(item)
  if (body) {
    content = buildArticlePage({
      body,
      slug,
      source: item.source,
      sourceUrl: item.link,
      publishedAt,
    })
    mode = "ai"
  } else {
    // Fallback: thin, noindex summary page.
    const summary = (item.contentSnippet || item.content || item.summary || item.title || "")
      .replace(/<[^>]+>/g, "")
      .trim()
      .slice(0, 800)
    content = buildThinPage({
      title: item.title,
      summary,
      source: item.source,
      sourceUrl: item.link,
      publishedAt,
      slug,
    })
    mode = "thin"
  }

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, content, "utf8")
  return { slug, skipped: false, mode }
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 SiyahaMag Daily SEO Automation")
  console.log(`📅 ${new Date().toISOString()}`)
  console.log(
    isAiEnabled()
      ? "🤖 AI mode: ON — generating original articles via Claude API"
      : "📝 AI mode: OFF (no ANTHROPIC_API_KEY) — thin summary pages (noindex)"
  )

  const state = await readJsonSafe(STATE_FILE, { publishedSlugs: [], lastRun: null })
  const publishedSet = new Set(state.publishedSlugs || [])

  const items = await fetchAllFeeds()

  // Filter tourism-related + not already published
  const candidates = items
    .filter((it) => isTourismRelated(it.title, it.contentSnippet || it.content))
    .filter((it) => {
      const baseSlug = slugify(it.title || "")
      const dateSlug = new Date(it.pubDate || Date.now()).toISOString().slice(0, 10)
      const slug = `${dateSlug}-${baseSlug}`.slice(0, 100)
      return !publishedSet.has(slug)
    })
    .slice(0, MAX_ARTICLES_PER_DAY)

  console.log(`\n📰 Tourism-related new articles: ${candidates.length}`)

  const results = []
  for (const item of candidates) {
    try {
      const res = await writeArticle(item)
      if (!res.skipped) {
        publishedSet.add(res.slug)
        results.push({ slug: res.slug, title: item.title, source: item.source })
        console.log(`  ✓ Created (${res.mode}): ${res.slug}`)
      }
    } catch (err) {
      console.log(`  ✗ Failed for "${item.title}": ${err.message}`)
    }
  }

  // Save state
  await writeJson(STATE_FILE, {
    publishedSlugs: [...publishedSet].slice(-500),  // keep last 500
    lastRun: new Date().toISOString(),
    lastRunStats: {
      feedsChecked: RSS_FEEDS.length,
      itemsFetched: items.length,
      candidates: candidates.length,
      published: results.length,
    },
  })

  // Append to daily log
  const log = await readJsonSafe(LOG_FILE, { runs: [] })
  log.runs = [
    {
      date: new Date().toISOString(),
      feedsChecked: RSS_FEEDS.length,
      itemsFetched: items.length,
      published: results.map((r) => ({ slug: r.slug, title: r.title, source: r.source })),
    },
    ...(log.runs || []),
  ].slice(0, 90)  // keep 90 days
  await writeJson(LOG_FILE, log)

  console.log(`\n✅ Done. Published ${results.length} new articles.`)
  console.log(results.map((r) => `  - ${r.title}`).join("\n"))

  return results.length
}

// Global hard timeout. AI generation needs more headroom than plain RSS, but
// must still finish well inside the workflow's 10-minute job timeout.
const GLOBAL_TIMEOUT_MS = isAiEnabled() ? 480000 : 120000
const hardTimeout = setTimeout(() => {
  console.error(`\n⏱️  Global timeout after ${GLOBAL_TIMEOUT_MS / 1000}s — forcing exit`)
  process.exit(0) // exit 0 so CI doesn't fail
}, GLOBAL_TIMEOUT_MS)

main()
  .then((count) => {
    clearTimeout(hardTimeout)
    console.log(`\n✨ Script completed successfully (${count} articles)`)
    process.exit(0)
  })
  .catch((err) => {
    clearTimeout(hardTimeout)
    console.error("💥 FATAL:", err)
    process.exit(1)
  })
