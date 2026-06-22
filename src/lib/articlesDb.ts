/**
 * DB-backed articles mapped to the demo Article shape, with safe fallback.
 * Build-time only (serverless runtime can't reach Supabase). Returns [] / null
 * on any error so pages fall back to the static demo articles.
 */
import { prisma } from "@/lib/prisma"
import { getCategoryMeta, type Article, type Category } from "@/lib/articlesData"

// DB ArticleCategory -> closest demo Category (drives badge label/path/color).
const CATEGORY_MAP: Record<string, Category> = {
  HEBERGEMENT: "PROJETS",
  TRANSPORT: "PROJETS",
  AERIEN: "PROJETS",
  GASTRONOMIE: "GASTRONOMIE",
  EVENEMENTS: "EVENEMENTS",
  DEVELOPPEMENT: "MARCHES",
  MICE: "MARCHES",
}

function tiptapToText(content: unknown): string {
  try {
    const doc = content as { content?: Array<{ content?: Array<{ text?: string }> }> }
    if (!doc?.content) return ""
    return doc.content
      .map((n) => (n.content || []).map((c) => c.text || "").join(""))
      .filter(Boolean)
      .join("\n\n")
  } catch {
    return ""
  }
}

type DbArticleRow = {
  slug: string
  title: string
  summary: string | null
  content: unknown
  coverImage: string | null
  category: string
  publishedAt: Date | null
  createdAt: Date
  author?: { name: string } | null
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop"

function mapRow(a: DbArticleRow): Article {
  const category = CATEGORY_MAP[a.category] ?? "MARCHES"
  const meta = getCategoryMeta(category)
  const published = a.publishedAt ?? a.createdAt
  return {
    slug: a.slug,
    title: a.title,
    summary: a.summary ?? "",
    content: tiptapToText(a.content) || (a.summary ?? ""),
    image: a.coverImage || FALLBACK_IMG,
    date: published.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    datePublished: published.toISOString().slice(0, 10),
    author: a.author?.name ?? "Rédaction SiyahaMag",
    tag: meta.label,
    category,
    categoryLabel: meta.label,
    categoryPath: meta.path,
    color: meta.color,
  }
}

export async function getDbArticles(): Promise<Article[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
      take: 100,
    })
    return rows.map(mapRow)
  } catch {
    return []
  }
}

export async function getDbArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const a = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { author: { select: { name: true } } },
    })
    return a ? mapRow(a) : null
  } catch {
    return null
  }
}
