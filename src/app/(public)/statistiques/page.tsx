import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import {
  Users,
  TrendingUp,
  Moon,
  Building,
  Plane,
  Globe,
  BarChart3,
  ArrowUpRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Statistiques Tourisme Maroc 2025 — Chiffres Clés & Données",
  description:
    "Consultez les chiffres officiels du tourisme au Maroc : nombre de touristes, recettes, nuitées, taux d'occupation par région et évolution annuelle.",
  alternates: {
    canonical: "/statistiques",
  },
  openGraph: {
    title: "Statistiques Tourisme Maroc 2025 — Chiffres Clés & Données | SiyahaMag",
    description:
      "Les chiffres clés du secteur touristique marocain : évolution annuelle et comparaisons régionales.",
  },
}

// ── Static KPI data ──────────────────────────────────────────────────

const KPI_DATA = [
  {
    title: "Nombre de touristes",
    value: "14,5 M",
    change: "+12%",
    year: 2025,
    source: "Ministere du Tourisme",
    icon: Users,
    color: "bg-[#0C4A6E]",
  },
  {
    title: "Recettes touristiques",
    value: "105,3 Mrd MAD",
    change: "+18%",
    year: 2025,
    source: "Office des Changes",
    icon: TrendingUp,
    color: "bg-[#D97706]",
  },
  {
    title: "Nuitees totales",
    value: "27,8 M",
    change: "+9%",
    year: 2025,
    source: "Observatoire du Tourisme",
    icon: Moon,
    color: "bg-[#059669]",
  },
  {
    title: "Taux d'occupation",
    value: "52%",
    change: "+4 pts",
    year: 2025,
    source: "Observatoire du Tourisme",
    icon: Building,
    color: "bg-[#0EA5E9]",
  },
]

// ── Regional data ────────────────────────────────────────────────────

const REGIONAL_DATA = [
  { region: "Marrakech-Safi", tourists: "4,2 M", share: "29%", growth: "+14%" },
  { region: "Souss-Massa", tourists: "2,8 M", share: "19%", growth: "+11%" },
  { region: "Tanger-Tetouan-Al Hoceima", tourists: "1,9 M", share: "13%", growth: "+16%" },
  { region: "Casablanca-Settat", tourists: "1,6 M", share: "11%", growth: "+8%" },
  { region: "Fes-Meknes", tourists: "1,3 M", share: "9%", growth: "+12%" },
  { region: "Rabat-Sale-Kenitra", tourists: "1,1 M", share: "8%", growth: "+10%" },
  { region: "Dakhla-Oued Ed-Dahab", tourists: "0,4 M", share: "3%", growth: "+32%" },
  { region: "Autres regions", tourists: "1,2 M", share: "8%", growth: "+7%" },
]

// ── Top markets ──────────────────────────────────────────────────────

const TOP_MARKETS = [
  { country: "France", visitors: "3,1 M", flag: "FR" },
  { country: "Espagne", visitors: "1,2 M", flag: "ES" },
  { country: "Royaume-Uni", visitors: "0,9 M", flag: "GB" },
  { country: "Allemagne", visitors: "0,7 M", flag: "DE" },
  { country: "Etats-Unis", visitors: "0,5 M", flag: "US" },
  { country: "Italie", visitors: "0,4 M", flag: "IT" },
]

// ── Annual evolution ─────────────────────────────────────────────────

const ANNUAL_EVOLUTION = [
  { year: 2019, tourists: 12.9, revenue: 78.6 },
  { year: 2020, tourists: 2.8, revenue: 36.4 },
  { year: 2021, tourists: 3.2, revenue: 34.3 },
  { year: 2022, tourists: 10.9, revenue: 77.5 },
  { year: 2023, tourists: 12.3, revenue: 87.1 },
  { year: 2024, tourists: 13.1, revenue: 93.8 },
  { year: 2025, tourists: 14.5, revenue: 105.3 },
]

export default function StatistiquesPage() {
  const maxTourists = Math.max(...ANNUAL_EVOLUTION.map((d) => d.tourists))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <Breadcrumbs segments={[{ label: "Statistiques" }]} />

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0C4A6E] sm:text-4xl">
          Statistiques du tourisme marocain
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Les chiffres officiels du secteur touristique au Maroc — donnees 2025.
        </p>
      </div>

      {/* KPI cards */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_DATA.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="flex items-start gap-4 pt-2">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${kpi.color}`}
              >
                <kpi.icon className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-2xl font-bold tracking-tight">
                    {kpi.value}
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-sm font-medium text-emerald-600">
                    <ArrowUpRight className="size-3.5" />
                    {kpi.change}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {kpi.year} &middot; {kpi.source}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evolution chart - static bar visualization */}
      <div className="mb-12">
        <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="size-5 text-ocean" />
          Evolution annuelle des arrivees (millions)
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {ANNUAL_EVOLUTION.map((data) => (
                <div key={data.year} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-muted-foreground">
                    {data.year}
                  </span>
                  <div className="flex-1">
                    <div className="relative h-8 rounded-md bg-muted overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-md bg-gradient-to-r from-ocean to-ocean/70 transition-all"
                        style={{
                          width: `${(data.tourists / maxTourists) * 100}%`,
                        }}
                      />
                      <span className="absolute inset-y-0 left-3 flex items-center text-xs font-semibold text-white">
                        {data.tourists} M
                      </span>
                    </div>
                  </div>
                  <span className="w-24 text-right text-sm text-muted-foreground">
                    {data.revenue} Mrd MAD
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-end gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded bg-ocean" />
                <span>Arrivees touristiques</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Recettes en Milliards MAD</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Regional breakdown */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
            <Globe className="size-5 text-ocean" />
            Repartition par region
          </h2>
          <Card>
            <CardContent className="pt-4">
              <div className="divide-y">
                {REGIONAL_DATA.map((region) => (
                  <div
                    key={region.region}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {region.region}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {region.tourists} visiteurs ({region.share})
                      </p>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">
                      {region.growth}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top source markets */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
            <Plane className="size-5 text-ocean" />
            Principaux marches emetteurs
          </h2>
          <Card>
            <CardContent className="pt-4">
              <div className="divide-y">
                {TOP_MARKETS.map((market, index) => (
                  <div
                    key={market.country}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {market.country}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-ocean">
                      {market.visitors}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional info card */}
          <Card className="mt-6 border-ocean/20 bg-ocean/5">
            <CardContent className="pt-4">
              <h3 className="font-semibold text-ocean">
                Objectif Vision 2030
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le Maroc vise 17,5 millions de touristes et 120 milliards MAD de
                recettes d&apos;ici 2030, dans le cadre de la strategie nationale
                de developpement touristique.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="text-xl font-bold text-ocean">17,5 M</p>
                  <p className="text-xs text-muted-foreground">
                    Touristes cibles
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="text-xl font-bold text-ocean">120 Mrd</p>
                  <p className="text-xs text-muted-foreground">
                    Recettes MAD ciblees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Source note */}
      <p className="mt-12 text-center text-xs text-muted-foreground">
        Sources : Ministere du Tourisme, Observatoire du Tourisme, Office des
        Changes — Donnees 2025 provisoires.
      </p>
    </div>
  )
}
