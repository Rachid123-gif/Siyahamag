import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { ARTICLE_CATEGORIES, ARTICLES_PER_PAGE } from "@/lib/constants"
import { ArticleCard } from "@/components/articles/ArticleCard"
import { CategoryFilterBar } from "@/components/articles/CategoryFilterBar"
import type { ArticleCategory } from "@/types"

// ── SEO ───────────────────────────────────────────────────────────────

export async function generateMetadata(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const category = typeof searchParams.category === "string" ? searchParams.category : null
  const categoryLabel = category
    ? ARTICLE_CATEGORIES[category as keyof typeof ARTICLE_CATEGORIES]
    : null

  const title = categoryLabel
    ? `${categoryLabel} — Actualités tourisme Maroc | SiyahaMag`
    : "Actualités du tourisme marocain | SiyahaMag"

  const description = categoryLabel
    ? `Articles et actualités sur ${categoryLabel.toLowerCase()} dans le secteur touristique marocain.`
    : "Suivez les dernières nouvelles du secteur touristique au Maroc : hébergement, transport, gastronomie, événements."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

// ── Helpers ───────────────────────────────────────────────────────────

function splitName(fullName: string): { firstName: string | null; lastName: string | null } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return { firstName: null, lastName: null }
  if (parts.length === 1) return { firstName: parts[0], lastName: null }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

// ── Valid categories ──────────────────────────────────────────────────

const VALID_CATEGORIES = new Set(Object.keys(ARTICLE_CATEGORIES))

// ── Page ──────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

interface ActualitesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ActualitesPage(props: ActualitesPageProps) {
  const searchParams = await props.searchParams

  // Parse search params
  const categoryParam = typeof searchParams.category === "string" ? searchParams.category : null
  const category = categoryParam && VALID_CATEGORIES.has(categoryParam) ? categoryParam : null
  const q = typeof searchParams.q === "string" ? searchParams.q.trim() : null
  const pageParam = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1
  const currentPage = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1

  const skip = (currentPage - 1) * ARTICLES_PER_PAGE
  const now = new Date()

  // Build where clause
  const where = {
    status: "PUBLISHED" as const,
    publishedAt: { lte: now },
    ...(category && { category: category as ArticleCategory }),
    ...(q && { title: { contains: q, mode: "insensitive" as const } }),
  }

  // Fetch articles + total count (graceful fallback if DB unavailable)
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = []
  let total = 0
  try {
    const result = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: ARTICLES_PER_PAGE,
      }),
      prisma.article.count({ where }),
    ])
    articles = result[0]
    total = result[1]
  } catch {
    // DB not available
  }

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)

  // Map to ArticleCard format
  const articleCards = articles.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    summary: article.summary,
    coverImageUrl: article.coverImage,
    category: article.category,
    publishedAt: article.publishedAt,
    author: splitName(article.author.name),
  }))

  // Build pagination URL helper
  function buildPageUrl(page: number): string {
    const params = new URLSearchParams()
    if (category) params.set("category", category)
    if (q) params.set("q", q)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    return `/actualites${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <h1 className="text-3xl font-bold text-ocean">Actualités</h1>
      <p className="mt-2 text-muted-foreground">
        Les dernières nouvelles du secteur touristique marocain.
      </p>

      {/* Category filter */}
      <div className="mt-6">
        <CategoryFilterBar currentCategory={category} />
      </div>

      {/* Search results header */}
      {q && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>
            {total} résultat{total !== 1 ? "s" : ""} pour &laquo;{" "}
            <span className="font-medium text-foreground">{q}</span> &raquo;
          </span>
          <Link
            href={category ? `/actualites?category=${category}` : "/actualites"}
            className="ml-2 text-ocean hover:underline"
          >
            Effacer la recherche
          </Link>
        </div>
      )}

      {/* Articles grid */}
      {articleCards.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articleCards.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center py-16">
          <p className="text-muted-foreground">
            Aucun article disponible pour le moment.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination des articles"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {/* Previous */}
          {currentPage > 1 ? (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors"
            >
              <span aria-hidden="true">&lsaquo;</span>
              <span className="hidden sm:inline">Précédent</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
              <span aria-hidden="true">&lsaquo;</span>
              <span className="hidden sm:inline">Précédent</span>
            </span>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first, last, current, and adjacent pages
              if (page === 1 || page === totalPages) return true
              if (Math.abs(page - currentPage) <= 1) return true
              return false
            })
            .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== undefined && page - (arr[idx - 1] as number) > 1) {
                acc.push("ellipsis")
              }
              acc.push(page)
              return acc
            }, [])
            .map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground"
                  aria-hidden="true"
                >
                  &hellip;
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildPageUrl(item)}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                    item === currentPage
                      ? "bg-ocean text-white"
                      : "border hover:bg-secondary"
                  }`}
                >
                  {item}
                </Link>
              )
            )}

          {/* Next */}
          {currentPage < totalPages ? (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary transition-colors"
            >
              <span className="hidden sm:inline">Suivant</span>
              <span aria-hidden="true">&rsaquo;</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
              <span className="hidden sm:inline">Suivant</span>
              <span aria-hidden="true">&rsaquo;</span>
            </span>
          )}
        </nav>
      )}
    </div>
  )
}
