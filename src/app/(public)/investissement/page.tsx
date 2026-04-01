import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { INVESTMENT_TYPES, INVESTMENTS_PER_PAGE } from "@/lib/constants"
import { InvestmentCard } from "@/components/investments/InvestmentCard"
import { InvestmentFilters } from "@/components/investments/InvestmentFilters"
import type { InvestmentType } from "@/types"

// ── SEO ───────────────────────────────────────────────────────────────

export async function generateMetadata(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const city =
    typeof searchParams.city === "string" ? searchParams.city : null
  const typeKey =
    typeof searchParams.investmentType === "string"
      ? searchParams.investmentType
      : null
  const typeLabel = typeKey
    ? INVESTMENT_TYPES[typeKey as keyof typeof INVESTMENT_TYPES]
    : null

  const parts = ["Investissement touristique"]
  if (typeLabel) parts.push(typeLabel)
  if (city) parts.push(city)
  parts.push("Maroc | SiyahaMag")

  const title = parts.join(" - ")
  const description = typeLabel
    ? `Decouvrez les opportunites d'investissement en ${typeLabel.toLowerCase()} dans le secteur touristique marocain.`
    : "Decouvrez les opportunites d'investissement dans le secteur touristique marocain : hotels, riads, restaurants, terrains."

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  }
}

// ── Valid keys ────────────────────────────────────────────────────────

const VALID_TYPES = new Set(Object.keys(INVESTMENT_TYPES))
const PER_PAGE = 12

// ── Page ─────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function InvestissementPage(props: PageProps) {
  const searchParams = await props.searchParams

  // Parse search params
  const investmentTypeParam =
    typeof searchParams.investmentType === "string"
      ? searchParams.investmentType
      : null
  const investmentType =
    investmentTypeParam && VALID_TYPES.has(investmentTypeParam)
      ? investmentTypeParam
      : null
  const city =
    typeof searchParams.city === "string" ? searchParams.city.trim() : null
  const priceMinParam =
    typeof searchParams.priceMin === "string"
      ? parseFloat(searchParams.priceMin)
      : null
  const priceMaxParam =
    typeof searchParams.priceMax === "string"
      ? parseFloat(searchParams.priceMax)
      : null
  const priceMin =
    priceMinParam != null && Number.isFinite(priceMinParam) && priceMinParam >= 0
      ? priceMinParam
      : null
  const priceMax =
    priceMaxParam != null && Number.isFinite(priceMaxParam) && priceMaxParam > 0
      ? priceMaxParam
      : null
  const pageParam =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page, 10)
      : 1
  const currentPage =
    Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1

  const skip = (currentPage - 1) * PER_PAGE

  // Build where clause
  const where: Record<string, unknown> = {
    status: "APPROVED" as const,
  }
  if (investmentType) {
    where.investmentType = investmentType as InvestmentType
  }
  if (city) {
    where.city = { contains: city, mode: "insensitive" }
  }
  if (priceMin != null || priceMax != null) {
    const priceFilter: Record<string, number> = {}
    if (priceMin != null) priceFilter.gte = priceMin
    if (priceMax != null) priceFilter.lte = priceMax
    where.price = priceFilter
  }

  // Fetch investments + count in parallel
  const [investments, total] = await Promise.all([
    prisma.investment.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        investmentType: true,
        city: true,
        price: true,
        surface: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: PER_PAGE,
    }),
    prisma.investment.count({ where }),
  ])

  const totalPages = Math.ceil(total / PER_PAGE)

  // Pagination URL builder
  function buildPageUrl(page: number): string {
    const params = new URLSearchParams()
    if (investmentType) params.set("investmentType", investmentType)
    if (city) params.set("city", city)
    if (priceMin != null) params.set("priceMin", String(priceMin))
    if (priceMax != null) params.set("priceMax", String(priceMax))
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    return `/investissement${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Investissement touristique au Maroc
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Decouvrez les meilleures opportunites d&apos;investissement dans le
          secteur touristique marocain.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <InvestmentFilters />
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="size-4" />
        <span>
          {total} opportunite{total !== 1 ? "s" : ""} trouvee
          {total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Investment grid */}
      {investments.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {investments.map((investment) => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-16 text-center">
          <p className="text-muted-foreground">
            Aucune opportunite disponible pour le moment.
          </p>
          <Link
            href="/investissement"
            className="mt-4 inline-block text-ocean hover:underline"
          >
            Voir toutes les opportunites
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination des investissements"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {currentPage > 1 ? (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span aria-hidden="true">&lsaquo;</span>
              <span className="hidden sm:inline">Precedent</span>
            </Link>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground opacity-50">
              <span aria-hidden="true">&lsaquo;</span>
              <span className="hidden sm:inline">Precedent</span>
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (page === 1 || page === totalPages) return true
              if (Math.abs(page - currentPage) <= 1) return true
              return false
            })
            .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
              if (
                idx > 0 &&
                arr[idx - 1] !== undefined &&
                page - (arr[idx - 1] as number) > 1
              ) {
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

          {currentPage < totalPages ? (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span className="hidden sm:inline">Suivant</span>
              <span aria-hidden="true">&rsaquo;</span>
            </Link>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground opacity-50">
              <span className="hidden sm:inline">Suivant</span>
              <span aria-hidden="true">&rsaquo;</span>
            </span>
          )}
        </nav>
      )}
    </div>
  )
}
