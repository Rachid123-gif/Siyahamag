import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { toggleAlertSchema } from "@/lib/validations/application"

// --- PATCH: Toggle alert active/inactive ---

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const { id } = await params

    const alert = await prisma.jobAlert.findUnique({
      where: { id },
    })

    if (!alert) {
      return NextResponse.json(
        { error: "Alerte introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (alert.userId !== candidate.id) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      )
    }

    const body = await request.json()

    const parsed = toggleAlertSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { isActive } = parsed.data

    const updatedAlert = await prisma.jobAlert.update({
      where: { id },
      data: { isActive },
    })

    return NextResponse.json({
      data: updatedAlert,
      message: isActive ? "Alerte activée" : "Alerte désactivée",
    })
  } catch (error) {
    console.error("PATCH /api/candidate/alerts/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- DELETE: Delete an alert ---

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const { id } = await params

    const alert = await prisma.jobAlert.findUnique({
      where: { id },
    })

    if (!alert) {
      return NextResponse.json(
        { error: "Alerte introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (alert.userId !== candidate.id) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      )
    }

    await prisma.jobAlert.delete({
      where: { id },
    })

    return NextResponse.json({
      message: "Alerte supprimée avec succès",
    })
  } catch (error) {
    console.error("DELETE /api/candidate/alerts/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
