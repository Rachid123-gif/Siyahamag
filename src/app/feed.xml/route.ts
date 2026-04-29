/**
 * RSS 2.0 feed — picked up by Google Discover, news aggregators, RSS readers,
 * and (importantly) by Google Search Console as a discoverable feed for
 * faster indexation of new posts.
 */

import { ALL_ARTICLES } from "@/lib/articlesData"

export const revalidate = 600

const BASE_URL = "https://siyahamag.ma"

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function rfc822(iso: string): string {
  return new Date(iso).toUTCString()
}

export async function GET() {
  const items = [...ALL_ARTICLES]
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, 50)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>SiyahaMag — Tourisme Maroc</title>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Actualités tourisme, emploi et investissement au Maroc.</description>
    <language>fr-MA</language>
    <copyright>© ${new Date().getFullYear()} SiyahaMag</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${BASE_URL}/actualites/article/${a.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/actualites/article/${a.slug}</guid>
      <pubDate>${escapeXml(rfc822(a.datePublished))}</pubDate>
      <category>${escapeXml(a.categoryLabel)}</category>
      <author>noreply@siyahamag.ma (${escapeXml(a.author)})</author>
      <description>${escapeXml(a.summary)}</description>
      <content:encoded><![CDATA[<p>${a.summary}</p>]]></content:encoded>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  })
}
