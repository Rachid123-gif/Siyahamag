import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import {
  STATISTIC_INDICATORS,
  MOROCCO_REGIONS,
  ITEMS_PER_PAGE,
} from "@/lib/constants"
import { formatStatValue } from "@/lib/formatNumber"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatisticFormModal } from "@/components/admin/StatisticFormModal"
import { StatisticDeleteButton } from "@/components/admin/StatisticDeleteButton"
import type { Metadata } from "next"
import type {
  StatisticIndicator,
  MoroccoRegion,
  TourismStatistic,
} from "@/types"

export const metadata: Metadata = {
  title: "Gestion des statistiques | SiyahaMag Admin",
}

const INDICATOR_KEYS = Object.keys(
  STATISTIC_INDICATORS
) as StatisticIndicator[]
const REGION_KEYS = Object.keys(MOROCCO_REGIONS) as MoroccoRegion[]

interface AdminStatistiquesPageProps {
  searchParams: Promise<{
    indicator?: string
    year?: string
    region?: string
    page?: string
  }>
}

export default async function AdminStatistiquesPage({
  searchParams,
}: AdminStatistiquesPageProps) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) redirect("/connexion")

  const params = await searchParams
  const currentIndicator = params.indicator || ""
  const currentYear = params.year || ""
  const currentRegion = params.region || ""
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  const where: Record<string, unknown> = {}

  if (
    currentIndicator &&
    INDICATOR_KEYS.includes(currentIndicator as StatisticIndicator)
  ) {
    where.indicator = currentIndicator as StatisticIndicator
  }

  if (currentYear) {
    const parsedYear = parseInt(currentYear, 10)
    if (!isNaN(parsedYear)) {
      where.year = parsedYear
    }
  }

  if (currentRegion && REGION_KEYS.includes(currentRegion as MoroccoRegion)) {
    where.region = currentRegion as MoroccoRegion
  }

  const [statistics, total] = await Promise.all([
    prisma.tourismStatistic.findMany({
      where,
      orderBy: [{ year: "desc" }, { indicator: "asc" }],
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.tourismStatistic.count({ where }),
  ])

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const buildUrl = (overrides: Record<string, string>) => {
    const p = new URLSearchParams()
    const merged = {
      indicator: currentIndicator,
      year: currentYear,
      region: currentRegion,
      page: String(currentPage),
      ...overrides,
    }
    for (const [key, value] of Object.entries(merged)) {
      if (value) p.set(key, value)
    }
    return `/admin/statistiques?${p.toString()}`
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "—"
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date))
  }

  // Serialize statistics for client components
  const serializedStats = statistics.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestion des statistiques
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} donnee{total !== 1 ? "s" : ""} au total
          </p>
        </div>
        <StatisticFormModal />
      </div>

      {/* Filters */}
      <form
        action="/admin/statistiques"
        method="get"
        className="flex flex-wrap items-end gap-3"
      >
        {/* Indicator filter */}
        <div className="min-w-[180px]">
          <label
            htmlFor="filter-indicator"
            className="mb-1 block text-xs font-medium text-muted-foreground"
          >
            Indicateur
          </label>
          <select
            id="filter-indicator"
            name="indicator"
            defaultValue={currentIndicator}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Tous</option>
            {INDICATOR_KEYS.map((key) => (
              <option key={key} value={key}>
                {STATISTIC_INDICATORS[key]}
              </option>
            ))}
          </select>
        </div>

        {/* Year filter */}
        <div className="min-w-[100px]">
          <label
            htmlFor="filter-year"
            className="mb-1 block text-xs font-medium text-muted-foreground"
          >
            Annee
          </label>
          <input
            id="filter-year"
            type="number"
            name="year"
            min="2000"
            max="2030"
            defaultValue={currentYear}
            placeholder="Toutes"
            className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        {/* Region filter */}
        <div className="min-w-[180px]">
          <label
            htmlFor="filter-region"
            className="mb-1 block text-xs font-medium text-muted-foreground"
          >
            Region
          </label>
          <select
            id="filter-region"
            name="region"
            defaultValue={currentRegion}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Toutes</option>
            {REGION_KEYS.map((key) => (
              <option key={key} value={key}>
                {MOROCCO_REGIONS[key]}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="secondary" className="h-9">
          Filtrer
        </Button>

        {(currentIndicator || currentYear || currentRegion) && (
          <Button variant="ghost" className="h-9" asChild>
            <Link href="/admin/statistiques">Reinitialiser</Link>
          </Button>
        )}
      </form>

      {/* Table */}
      {statistics.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-muted-foreground">
            Aucune statistique trouvee.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicateur</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Annee</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Mis a jour</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.map((stat, index) => (
                <TableRow key={stat.id}>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {STATISTIC_INDICATORS[
                        stat.indicator as keyof typeof STATISTIC_INDICATORS
                      ]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatStatValue(stat.value, stat.indicator)}
                  </TableCell>
                  <TableCell>{stat.year}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {stat.region
                      ? MOROCCO_REGIONS[
                          stat.region as keyof typeof MOROCCO_REGIONS
                        ]
                      : "National"}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate text-muted-foreground">
                    {stat.source}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(stat.updatedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <StatisticFormModal
                        statistic={serializedStats[index] as never}
                      />
                      <StatisticDeleteButton statisticId={stat.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: String(currentPage - 1) })}>
                Precedent
              </Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </span>
          {currentPage < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: String(currentPage + 1) })}>
                Suivant
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
