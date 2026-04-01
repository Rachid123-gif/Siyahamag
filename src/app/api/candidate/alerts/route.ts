import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { createAlertSchema } from "@/lib/validations/application"

const MAX_ALERTS_PER_USER = 10

// --- GET: List candidate's job alerts ---

export async function GET() {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const alerts = await prisma.jobAlert.findMany({
      where: { userId: candidate.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ data: alerts })
  } catch (error) {
    console.error("GET /api/candidate/alerts error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- POST: Create a job alert ---

export async function POST(request: Request) {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const body = await request.json()

    const parsed = createAlertSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { city, region, jobCategory, contractType } = parsed.data

    // At least one filter must be specified
    if (!city && !region && !jobCategory && !contractType) {
      return NextResponse.json(
        { error: "Veuillez spécifier au moins un critère pour l'alerte" },
        { status: 400 }
      )
    }

    // Check max alerts per user
    const alertCount = await prisma.jobAlert.count({
      where: { userId: candidate.id },
    })

    if (alertCount >= MAX_ALERTS_PER_USER) {
      return NextResponse.json(
        {
          error: `Vous ne pouvez pas créer plus de ${MAX_ALERTS_PER_USER} alertes. Veuillez en supprimer une avant d'en créer une nouvelle.`,
        },
        { status: 400 }
      )
    }

    const alert = await prisma.jobAlert.create({
      data: {
        userId: candidate.id,
        city: city || null,
        region: region as never || null,
        jobCategory: jobCategory as never || null,
        contractType: contractType as never || null,
        isActive: true,
      },
    })

    return NextResponse.json(
      { data: alert, message: "Alerte créée avec succès" },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/candidate/alerts error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
