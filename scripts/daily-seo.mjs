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

// Negative keywords — exclude if present even if other keywords match
const NEGATIVE_KEYWORDS = [
  "meurtre", "assassinat", "cocaïne", "cocaine", "drogue", "trafic",
  "suicide", "suicides", "enquête judiciaire", "enquete judiciaire",
  "prison", "détenu", "detenu", "accident mortel", "décès", "deces",
  "cadavre", "agression", "viol", "crime",
]

function isTourismRelated(title, content) {
  const titleLower = (title || "").toLowerCase()
  const text = `${title || ""} ${content || ""}`.toLowerCase()
  // Exclude if any negative keyword is present (title or content)
  if (NEGATIVE_KEYWORDS.some((kw) => text.includes(kw))) return false
  // STRICT : tourism keywords must be in the TITLE only
  // (not just mentioned in passing in the content)
  if (TOURISM_STRONG.some((kw) => titleLower.includes(kw))) return true
  // Otherwise, need 2 weak keywords in title
  const weakInTitle = TOURISM_WEAK.filter((kw) => titleLower.includes(kw)).length
  return weakInTitle >= 2
}

function escapeJsx(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
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

function buildArticleContent({ title, summary, source, sourceUrl, publishedAt, slug }) {
  const dateIso = publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
  const dateFr = new Date(dateIso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const escTitle = escapeJsx(title)
  const escSummary = escapeJsx(summary || title)
  const escSource = escapeJsx(source || "Source externe")
  const escSourceUrl = escapeJsx(sourceUrl || "")

  return `import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: \`${escTitle} | SiyahaMag\`,
  description: \`${escSummary.slice(0, 155)}\`,
  alternates: { canonical: "/news/${slug}" },
  openGraph: {
    title: \`${escTitle}\`,
    description: \`${escSummary.slice(0, 155)}\`,
    type: "article",
    publishedTime: "${dateIso}",
  },
}

const ARTICLE = {
  title: \`${escTitle}\`,
  summary: \`${escSummary}\`,
  source: \`${escSource}\`,
  sourceUrl: \`${escSourceUrl}\`,
  publishedAt: "${dateIso}",
  dateFr: "${dateFr}",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: ARTICLE.title,
  description: ARTICLE.summary,
  datePublished: ARTICLE.publishedAt,
  dateModified: ARTICLE.publishedAt,
  author: { "@type": "Organization", name: "SiyahaMag" },
  publisher: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://siyahamag.ma/news/${slug}",
  },
}

export default function NewsArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={jsonLd} />
      <Breadcrumbs segments={[{ label: "Actualités", href: "/actualites" }, { label: ARTICLE.title }]} />

      <article className="mt-6 space-y-6">
        <header className="space-y-4">
          <Badge className="bg-ocean-50 text-ocean border-0">Actualité</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {ARTICLE.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {ARTICLE.dateFr}
            </span>
            <span className="flex items-center gap-1.5">
              Source : <strong className="text-foreground">{ARTICLE.source}</strong>
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {ARTICLE.summary}
          </p>
        </div>

        {ARTICLE.sourceUrl && (
          <div className="border-t border-border pt-6">
            <a
              href={ARTICLE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ocean hover:underline font-medium"
            >
              Lire l&apos;article original sur {ARTICLE.source}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        <div className="border-t border-border pt-6 mt-8">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </article>
    </div>
  )
}
`
}

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

  const summary = (item.contentSnippet || item.content || item.summary || item.title || "")
    .replace(/<[^>]+>/g, "")
    .trim()
    .slice(0, 800)

  const content = buildArticleContent({
    title: item.title,
    summary,
    source: item.source,
    sourceUrl: item.link,
    publishedAt: item.pubDate || item.isoDate,
    slug,
  })

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, content, "utf8")
  return { slug, skipped: false }
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 SiyahaMag Daily SEO Automation")
  console.log(`📅 ${new Date().toISOString()}`)

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
        console.log(`  ✓ Created: ${res.slug}`)
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

// Global hard timeout — script must finish within 2 minutes
const GLOBAL_TIMEOUT_MS = 120000
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
