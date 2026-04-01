import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { createStatisticSchema } from "@/lib/validations/statistic"
import { ITEMS_PER_PAGE } from "@/lib/constants"
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
 * GET /api/admin/statistics
 * List all statistics for admin (paginated, with filters).
 */
export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  try {
    const { searchParams } = request.nextUrl
    const indicator = searchParams.get("indicator")
    const year = searchParams.get("year")
    const region = searchParams.get("region")
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))

    const where: Record<string, unknown> = {}

    if (indicator && VALID_INDICATORS.includes(indicator)) {
      where.indicator = indicator as StatisticIndicator
    }

    if (year) {
      const parsedYear = parseInt(year, 10)
      if (!isNaN(parsedYear)) {
        where.year = parsedYear
      }
    }

    if (region && VALID_REGIONS.includes(region)) {
      where.region = region as MoroccoRegion
    }

    const [statistics, total] = await Promise.all([
      prisma.tourismStatistic.findMany({
        where,
        orderBy: [{ year: "desc" }, { indicator: "asc" }],
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        include: {
          updatedBy: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.tourismStatistic.count({ where }),
    ])

    return NextResponse.json({
      data: statistics,
      total,
      page,
      pageSize: ITEMS_PER_PAGE,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    })
  } catch (error) {
    console.error("Error fetching admin statistics:", error)
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des statistiques" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/statistics
 * Create a new statistic entry. Admin only.
 */
export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = createStatisticSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Donnees invalides"
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { indicator, value, year, region, source } = parsed.data

    // Validate occupancy rate is <= 100
    if (indicator === "OCCUPANCY_RATE" && value > 100) {
      return NextResponse.json(
        { error: "Le taux d'occupation ne peut pas depasser 100%" },
        { status: 400 }
      )
    }

    // Check for duplicates (same indicator + year + region)
    const existing = await prisma.tourismStatistic.findFirst({
      where: {
        indicator,
        year,
        region: region ?? null,
      },
    })

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Une statistique existe deja pour cet indicateur, cette annee et cette region",
        },
        { status: 409 }
      )
    }

    const statistic = await prisma.tourismStatistic.create({
      data: {
        indicator,
        value,
        year,
        region: region ?? null,
        source,
        updatedByUserId: admin.id,
      },
    })

    return NextResponse.json(
      { data: statistic, message: "Statistique creee avec succes" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating statistic:", error)
    return NextResponse.json(
      { error: "Erreur lors de la creation de la statistique" },
      { status: 500 }
    )
  }
}
