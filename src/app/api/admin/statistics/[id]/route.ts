import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { updateStatisticSchema } from "@/lib/validations/statistic"

interface RouteContext {
  params: Promise<{ id: string }>
}

/**
 * PATCH /api/admin/statistics/[id]
 * Update a statistic entry. Admin only.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  try {
    const { id } = await context.params

    const existing = await prisma.tourismStatistic.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Statistique introuvable" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const parsed = updateStatisticSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Donnees invalides"
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const data = parsed.data

    // Validate occupancy rate is <= 100
    const indicator = data.indicator ?? existing.indicator
    const value = data.value ?? existing.value
    if (indicator === "OCCUPANCY_RATE" && value > 100) {
      return NextResponse.json(
        { error: "Le taux d'occupation ne peut pas depasser 100%" },
        { status: 400 }
      )
    }

    // Check for duplicates if indicator, year, or region changed
    if (data.indicator || data.year || data.region !== undefined) {
      const dupCheck = await prisma.tourismStatistic.findFirst({
        where: {
          indicator: data.indicator ?? existing.indicator,
          year: data.year ?? existing.year,
          region: data.region !== undefined ? (data.region ?? null) : existing.region,
          id: { not: id },
        },
      })

      if (dupCheck) {
        return NextResponse.json(
          {
            error:
              "Une statistique existe deja pour cet indicateur, cette annee et cette region",
          },
          { status: 409 }
        )
      }
    }

    const statistic = await prisma.tourismStatistic.update({
      where: { id },
      data: {
        ...data,
        updatedByUserId: admin.id,
      },
    })

    return NextResponse.json({
      data: statistic,
      message: "Statistique mise a jour avec succes",
    })
  } catch (error) {
    console.error("Error updating statistic:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour de la statistique" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/statistics/[id]
 * Delete a statistic entry. Admin only.
 */
export async function DELETE(_request: NextRequest, context: RouteContext) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  try {
    const { id } = await context.params

    const existing = await prisma.tourismStatistic.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Statistique introuvable" },
        { status: 404 }
      )
    }

    await prisma.tourismStatistic.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Statistique supprimee avec succes",
    })
  } catch (error) {
    console.error("Error deleting statistic:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la statistique" },
      { status: 500 }
    )
  }
}
