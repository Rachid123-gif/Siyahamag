/**
 * Google News sitemap — eligibility for Google News + Discover.
 *
 * Per Google spec (https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap):
 *  - Only articles published in the last 48 hours
 *  - Max 1000 URLs
 *  - Specific <news:news> namespace
 */

import { ALL_ARTICLES } from "@/lib/articlesData"
import dailyLog from "../../../content/queue/daily-log.json"

export const revalidate = 600 // 10 minutes

const BASE_URL = "https://siyahamag.ma"
const SITE_NAME = "SiyahaMag"
const LANGUAGE = "fr"
const MAX_AGE_HOURS = 48

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

type NewsItem = {
  url: string
  title: string
  publishedAt: string // ISO 8601
}

type DailyLogEntry = {
  date: string
  published?: Array<{ slug: string; title: string; source?: string }>
}

function collectDailySeoArticles(): NewsItem[] {
  const items: NewsItem[] = []
  const runs = ((dailyLog as { runs?: DailyLogEntry[] }).runs || [])
  for (const run of runs) {
    const runDate = run.date
    for (const a of run.published || []) {
      // The slug encodes the date prefix, e.g. "2026-04-28-foo-bar..."
      const m = (a.slug || "").match(/^(\d{4}-\d{2}-\d{2})-/)
      const dateStr = m ? m[1] : (runDate || "").slice(0, 10)
      const iso = dateStr
        ? new Date(dateStr + "T07:00:00Z").toISOString()
        : runDate || new Date().toISOString()
      items.push({
        url: `${BASE_URL}/news/${a.slug}`,
        title: (a.title || a.slug || "").trim(),
        publishedAt: iso,
      })
    }
  }
  return items
}

export async function GET() {
  const now = Date.now()
  const cutoff = now - MAX_AGE_HOURS * 60 * 60 * 1000

  const staticItems: NewsItem[] = ALL_ARTICLES.map((a) => ({
    url: `${BASE_URL}/actualites/article/${a.slug}`,
    title: a.title,
    publishedAt: new Date(a.datePublished).toISOString(),
  }))

  const dailyItems = collectDailySeoArticles()

  const all = [...staticItems, ...dailyItems]
    .filter((it) => new Date(it.publishedAt).getTime() >= cutoff)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 1000)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${all
  .map(
    (it) => `  <url>
    <loc>${escapeXml(it.url)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME)}</news:name>
        <news:language>${LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(it.publishedAt)}</news:publication_date>
      <news:title>${escapeXml(it.title)}</news:title>
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  })
}
