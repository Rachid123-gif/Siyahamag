import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { StatisticIndicator, MoroccoRegion } from "@/types"

const VALID_INDICATORS = ["TOURISTS", "REVENUE", "NIGHTS", "OCCUPANCY_RATE"]
const VALID_REGIONS = [
  "MARRAKECH_SAFI",
  "SOUSS_MASSA",
  "TANGER_TETOUAN_AL_HOCEIMA",
  "FES_MEKNES",
  "RABAT_SALE_KENITRA",
  "CASABLANCA_SETTAT",
  "ORIENTAL",
  "BENI_MELLAL_KHENIFRA",
  "DRAA_TAFILALET",
  "GUELMIM_OUED_NOUN",
  "LAAYOUNE_SAKIA_EL_HAMRA",
  "DAKHLA_OUED_ED_DAHAB",
]

/**
 * GET /api/statistics
 * Public endpoint - returns tourism statistics with optional filters.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const indicator = searchParams.get("indicator")
    const year = searchParams.get("year")
    const region = searchParams.get("region")

    const where: Record<string, unknown> = {}

    if (indicator && VALID_INDICATORS.includes(indicator)) {
      where.indicator = indicator as StatisticIndicator
    }

    if (year) {
      const parsedYear = parseInt(year, 10)
      if (!isNaN(parsedYear) && parsedYear >= 2000 && parsedYear <= 2100) {
        where.year = parsedYear
      }
    }

    if (region && VALID_REGIONS.includes(region)) {
      where.region = region as MoroccoRegion
    }

    const statistics = await prisma.tourismStatistic.findMany({
      where,
      orderBy: [{ year: "desc" }, { indicator: "asc" }],
    })

    return NextResponse.json({ data: statistics })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des statistiques" },
      { status: 500 }
    )
  }
}
