"use client"

import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STATISTIC_INDICATORS, MOROCCO_REGIONS } from "@/lib/constants"
import { formatStatValue } from "@/lib/formatNumber"
import type { TourismStatistic, StatisticIndicator, MoroccoRegion } from "@/types"

const CHART_COLORS = {
  primary: "#0C4A6E",
  secondary: "#0EA5E9",
  accent: "#D97706",
  success: "#059669",
}

const INDICATOR_KEYS = Object.keys(STATISTIC_INDICATORS) as StatisticIndicator[]
const REGION_KEYS = Object.keys(MOROCCO_REGIONS) as MoroccoRegion[]

interface StatisticsChartsProps {
  allData: TourismStatistic[]
}

export function StatisticsCharts({ allData }: StatisticsChartsProps) {
  const [selectedIndicator, setSelectedIndicator] =
    useState<StatisticIndicator>("TOURISTS")
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [yearStart, setYearStart] = useState<number | "">("")
  const [yearEnd, setYearEnd] = useState<number | "">("")
  const [barYear, setBarYear] = useState<number | "">("")

  // Compute available years from the data
  const availableYears = useMemo(() => {
    const years = [...new Set(allData.map((d) => d.year))].sort((a, b) => a - b)
    return years
  }, [allData])

  // Initialize bar year to latest available year
  useMemo(() => {
    if (availableYears.length > 0 && barYear === "") {
      setBarYear(availableYears[availableYears.length - 1])
    }
  }, [availableYears, barYear])

  // --- Line chart data: yearly evolution ---
  const lineChartData = useMemo(() => {
    let filtered = allData.filter((d) => d.indicator === selectedIndicator)

    // Filter by region or national (null region)
    if (selectedRegion) {
      filtered = filtered.filter((d) => d.region === selectedRegion)
    } else {
      filtered = filtered.filter((d) => d.region === null)
    }

    // Filter by year range
    if (yearStart !== "") {
      filtered = filtered.filter((d) => d.year >= yearStart)
    }
    if (yearEnd !== "") {
      filtered = filtered.filter((d) => d.year <= yearEnd)
    }

    return filtered
      .sort((a, b) => a.year - b.year)
      .map((d) => ({
        year: d.year,
        value: d.value,
        source: d.source,
      }))
  }, [allData, selectedIndicator, selectedRegion, yearStart, yearEnd])

  // --- Bar chart data: regional comparison for selected year ---
  const barChartData = useMemo(() => {
    if (barYear === "") return []

    const filtered = allData.filter(
      (d) =>
        d.indicator === selectedIndicator &&
        d.year === barYear &&
        d.region !== null
    )

    return REGION_KEYS.map((regionKey) => {
      const entry = filtered.find((d) => d.region === regionKey)
      return {
        region: regionKey,
        label: MOROCCO_REGIONS[regionKey],
        value: entry?.value ?? 0,
        source: entry?.source ?? "",
      }
    }).filter((d) => d.value > 0)
  }, [allData, selectedIndicator, barYear])

  // Sources for attribution
  const lineSources = useMemo(() => {
    const sources = [...new Set(lineChartData.map((d) => d.source))].filter(Boolean)
    return sources.join(", ")
  }, [lineChartData])

  const barSources = useMemo(() => {
    const sources = [...new Set(barChartData.map((d) => d.source))].filter(Boolean)
    return sources.join(", ")
  }, [barChartData])

  const indicatorLabel =
    STATISTIC_INDICATORS[selectedIndicator as keyof typeof STATISTIC_INDICATORS]

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <Card>
        <CardContent className="pt-2">
          <div className="flex flex-wrap items-end gap-4">
            {/* Indicator */}
            <div className="min-w-[180px]">
              <label
                htmlFor="indicator-select"
                className="mb-1 block text-sm font-medium"
              >
                Indicateur
              </label>
              <select
                id="indicator-select"
                value={selectedIndicator}
                onChange={(e) =>
                  setSelectedIndicator(e.target.value as StatisticIndicator)
                }
                className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {INDICATOR_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {STATISTIC_INDICATORS[key]}
                  </option>
                ))}
              </select>
            </div>

            {/* Year start */}
            <div className="min-w-[120px]">
              <label
                htmlFor="year-start-select"
                className="mb-1 block text-sm font-medium"
              >
                Annee debut
              </label>
              <select
                id="year-start-select"
                value={yearStart}
                onChange={(e) =>
                  setYearStart(e.target.value ? Number(e.target.value) : "")
                }
                className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">Toutes</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Year end */}
            <div className="min-w-[120px]">
              <label
                htmlFor="year-end-select"
                className="mb-1 block text-sm font-medium"
              >
                Annee fin
              </label>
              <select
                id="year-end-select"
                value={yearEnd}
                onChange={(e) =>
                  setYearEnd(e.target.value ? Number(e.target.value) : "")
                }
                className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">Toutes</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Region filter */}
            <div className="min-w-[200px]">
              <label
                htmlFor="region-select"
                className="mb-1 block text-sm font-medium"
              >
                Region
              </label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">National</option>
                {REGION_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {MOROCCO_REGIONS[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Chart: Yearly Evolution */}
      <Card>
        <CardHeader>
          <CardTitle>
            Evolution annuelle : {indicatorLabel}
            {selectedRegion
              ? ` - ${MOROCCO_REGIONS[selectedRegion as MoroccoRegion]}`
              : " - National"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lineChartData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Aucune donnee disponible pour cette selection.
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(val: number) =>
                      formatStatValue(val, selectedIndicator)
                    }
                  />
                  <Tooltip
                    formatter={(val) => [
                      formatStatValue(Number(val), selectedIndicator),
                      indicatorLabel,
                    ]}
                    labelFormatter={(label) => `Annee ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name={indicatorLabel}
                    stroke={CHART_COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: CHART_COLORS.primary, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              {lineSources && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Source : {lineSources}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Bar Chart: Regional Comparison */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CardTitle>
              Comparaison regionale : {indicatorLabel}
            </CardTitle>
            <div className="flex items-center gap-2">
              <label
                htmlFor="bar-year-select"
                className="text-sm font-medium text-muted-foreground"
              >
                Annee :
              </label>
              <select
                id="bar-year-select"
                value={barYear}
                onChange={(e) =>
                  setBarYear(e.target.value ? Number(e.target.value) : "")
                }
                className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {barChartData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Aucune donnee regionale disponible pour cette annee.
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(val: number) =>
                      formatStatValue(val, selectedIndicator)
                    }
                  />
                  <Tooltip
                    formatter={(val) => [
                      formatStatValue(Number(val), selectedIndicator),
                      indicatorLabel,
                    ]}
                  />
                  <Bar
                    dataKey="value"
                    name={indicatorLabel}
                    fill={CHART_COLORS.secondary}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              {barSources && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Source : {barSources}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
