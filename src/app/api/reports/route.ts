import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createReportSchema } from "@/lib/validations/report"

// --- POST: Submit a report ---

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = createReportSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { targetType, targetId, reason, reporterEmail } = parsed.data

    // Verify the target exists
    if (targetType === "JOB_LISTING") {
      const job = await prisma.jobListing.findUnique({
        where: { id: targetId },
      })
      if (!job) {
        return NextResponse.json(
          { error: "Offre d'emploi introuvable" },
          { status: 404 }
        )
      }
    } else if (targetType === "INVESTMENT") {
      const investment = await prisma.investment.findUnique({
        where: { id: targetId },
      })
      if (!investment) {
        return NextResponse.json(
          { error: "Annonce d'investissement introuvable" },
          { status: 404 }
        )
      }
    }

    // Prevent duplicate reports from the same email for the same target
    const existingReport = await prisma.report.findFirst({
      where: {
        targetType,
        targetId,
        reporterEmail,
        status: "PENDING",
      },
    })

    if (existingReport) {
      return NextResponse.json(
        { error: "Vous avez déjà signalé cet élément. Votre signalement est en cours de traitement." },
        { status: 409 }
      )
    }

    const report = await prisma.report.create({
      data: {
        targetType,
        targetId,
        reason,
        reporterEmail,
        status: "PENDING",
      },
    })

    return NextResponse.json(
      { data: report, message: "Signalement envoyé avec succès. Merci pour votre vigilance." },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/reports error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
