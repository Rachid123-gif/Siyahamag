import type { Metadata } from "next"
import Link from "next/link"
import { Search } from "lucide-react"

import { prisma } from "@/lib/prisma"
import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
  MAJOR_CITIES,
  JOBS_PER_PAGE,
} from "@/lib/constants"
import { JobCard } from "@/components/jobs/JobCard"
import { JobSearchFilters } from "@/components/jobs/JobSearchFilters"
import { JobSearchBar } from "@/components/jobs/JobSearchBar"
import type { JobCategory, ContractType } from "@/types"

// ── SEO ───────────────────────────────────────────────────────────────

export async function generateMetadata(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const city =
    typeof searchParams.city === "string" ? searchParams.city : null
  const categoryKey =
    typeof searchParams.jobCategory === "string"
      ? searchParams.jobCategory
      : null
  const categoryLabel = categoryKey
    ? JOB_CATEGORIES[categoryKey as keyof typeof JOB_CATEGORIES]
    : null

  const parts = ["Offres d'emploi tourisme"]
  if (categoryLabel) parts.push(categoryLabel)
  if (city) parts.push(city)
  parts.push("Maroc | SiyahaMag")

  const title = parts.join(" - ")
  const description = categoryLabel
    ? `Trouvez un emploi en ${categoryLabel.toLowerCase()} dans le secteur touristique marocain.`
    : "Trouvez votre emploi dans le secteur touristique marocain : hotellerie, restauration, animation, guide, management."

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  }
}

// ── Valid keys ────────────────────────────────────────────────────────

const VALID_CATEGORIES = new Set(Object.keys(JOB_CATEGORIES))
const VALID_CONTRACTS = new Set(Object.keys(CONTRACT_TYPES))

// ── Page ─────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

interface EmploisPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function EmploisPage(props: EmploisPageProps) {
  const searchParams = await props.searchParams

  // Parse search params
  const q =
    typeof searchParams.q === "string" ? searchParams.q.trim() : null
  const city =
    typeof searchParams.city === "string" ? searchParams.city.trim() : null
  const jobCategoryParam =
    typeof searchParams.jobCategory === "string"
      ? searchParams.jobCategory
      : null
  const jobCategory =
    jobCategoryParam && VALID_CATEGORIES.has(jobCategoryParam)
      ? jobCategoryParam
      : null
  const contractTypeParam =
    typeof searchParams.contractType === "string"
      ? searchParams.contractType
      : null
  const contractType =
    contractTypeParam && VALID_CONTRACTS.has(contractTypeParam)
      ? contractTypeParam
      : null
  const pageParam =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page, 10)
      : 1
  const currentPage =
    Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1

  const skip = (currentPage - 1) * JOBS_PER_PAGE

  // Build where clause
  const where = {
    status: "APPROVED" as const,
    ...(q && { title: { contains: q, mode: "insensitive" as const } }),
    ...(city && { city: { contains: city, mode: "insensitive" as const } }),
    ...(jobCategory && { jobCategory: jobCategory as JobCategory }),
    ...(contractType && { contractType: contractType as ContractType }),
  }

  // Fetch jobs + count in parallel (graceful fallback if DB unavailable)
  let jobs: Awaited<ReturnType<typeof prisma.jobListing.findMany>> = []
  let total = 0
  try {
    const result = await Promise.all([
      prisma.jobListing.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              verificationStatus: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: JOBS_PER_PAGE,
      }),
      prisma.jobListing.count({ where }),
    ])
    jobs = result[0]
    total = result[1]
  } catch {
    // DB not available
  }

  const totalPages = Math.ceil(total / JOBS_PER_PAGE)

  // Pagination URL builder
  function buildPageUrl(page: number): string {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (city) params.set("city", city)
    if (jobCategory) params.set("jobCategory", jobCategory)
    if (contractType) params.set("contractType", contractType)
    if (page > 1) params.set("page", String(page))
    const qs = params.toString()
    return `/emplois${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Offres d&apos;emploi tourisme au Maroc
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Trouvez votre prochain poste dans le secteur touristique marocain.
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-3xl">
          <JobSearchBar
            defaultQuery={q ?? ""}
            defaultCity={city ?? ""}
            cities={[...MAJOR_CITIES]}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <JobSearchFilters />
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="size-4" />
        <span>
          {total} offre{total !== 1 ? "s" : ""} trouvee{total !== 1 ? "s" : ""}
        </span>
        {(q || city) && (
          <Link
            href={
              jobCategory || contractType
                ? `/emplois?${new URLSearchParams({
                    ...(jobCategory && { jobCategory }),
                    ...(contractType && { contractType }),
                  }).toString()}`
                : "/emplois"
            }
            className="ml-2 text-ocean hover:underline"
          >
            Effacer la recherche
          </Link>
        )}
      </div>

      {/* Job list */}
      {jobs.length > 0 ? (
        <div className="mt-6 space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-16 text-center">
          <p className="text-muted-foreground">
            Aucune offre ne correspond a vos criteres.
          </p>
          <Link
            href="/emplois"
            className="mt-4 inline-block text-ocean hover:underline"
          >
            Voir toutes les offres
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination des offres"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {/* Previous */}
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

          {/* Page numbers */}
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

          {/* Next */}
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
