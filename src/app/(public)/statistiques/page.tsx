import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { formatStatValue } from "@/lib/formatNumber"
import { STATISTIC_INDICATORS } from "@/lib/constants"
import { KpiCard } from "@/components/statistics/KpiCard"
import { StatisticsCharts } from "@/components/statistics/StatisticsCharts"
import { Users, TrendingUp, Moon, Building } from "lucide-react"
import type { StatisticIndicator } from "@/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Statistiques du tourisme marocain | SiyahaMag",
  description:
    "Consultez les chiffres officiels du tourisme au Maroc : nombre de touristes, recettes, nuitees, taux d'occupation par region.",
  openGraph: {
    title: "Statistiques du tourisme marocain | SiyahaMag",
    description:
      "Les chiffres cles du secteur touristique marocain : evolution annuelle et comparaisons regionales.",
  },
}

const KPI_CONFIG: {
  indicator: StatisticIndicator
  title: string
  icon: typeof Users
  color: string
}[] = [
  {
    indicator: "TOURISTS",
    title: "Nombre de touristes",
    icon: Users,
    color: "bg-[#0C4A6E]",
  },
  {
    indicator: "REVENUE",
    title: "Recettes touristiques (MAD)",
    icon: TrendingUp,
    color: "bg-[#D97706]",
  },
  {
    indicator: "NIGHTS",
    title: "Nuitees",
    icon: Moon,
    color: "bg-[#059669]",
  },
  {
    indicator: "OCCUPANCY_RATE",
    title: "Taux d'occupation",
    icon: Building,
    color: "bg-[#0EA5E9]",
  },
]

export default async function StatistiquesPage() {
  let allStatistics: Awaited<ReturnType<typeof prisma.tourismStatistic.findMany>> = []
  try {
    allStatistics = await prisma.tourismStatistic.findMany({
      orderBy: [{ year: "desc" }, { indicator: "asc" }],
    })
  } catch {
    // DB not available
  }

  // Get latest national value for each indicator
  const latestKpis = KPI_CONFIG.map((config) => {
    const latest = allStatistics.find(
      (s) => s.indicator === config.indicator && s.region === null
    )
    return {
      ...config,
      value: latest ? formatStatValue(latest.value, config.indicator) : "—",
      year: latest?.year ?? 0,
      source: latest?.source ?? "",
      hasData: !!latest,
    }
  })

  // Serialize for client component (dates to ISO strings)
  const serializedData = allStatistics.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#0C4A6E]">
          Statistiques du tourisme marocain
        </h1>
        <p className="mt-2 text-muted-foreground">
          Les chiffres officiels du secteur touristique au Maroc.
        </p>
      </div>

      {/* KPI cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {latestKpis.map((kpi) => (
          <KpiCard
            key={kpi.indicator}
            title={kpi.title}
            value={kpi.value}
            year={kpi.year}
            source={kpi.source}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>

      {/* Interactive charts */}
      {allStatistics.length > 0 ? (
        <StatisticsCharts allData={serializedData as never} />
      ) : (
        <div className="mt-8 rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          Aucune donnee statistique disponible pour le moment.
        </div>
      )}
    </div>
  )
}
