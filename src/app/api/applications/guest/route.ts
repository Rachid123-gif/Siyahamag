import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createGuestApplicationSchema } from "@/lib/validations/application"

// --- POST: Submit an application without an account (guest) ---

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = createGuestApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { jobListingId, candidateName, candidateEmail, cvUrl, message } =
      parsed.data

    // Verify job exists and is approved
    const job = await prisma.jobListing.findUnique({
      where: { id: jobListingId },
    })

    if (!job) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    if (job.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Cette offre d'emploi n'est plus active" },
        { status: 400 }
      )
    }

    // Check if the job deadline has passed
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return NextResponse.json(
        { error: "La date limite de candidature est dépassée" },
        { status: 400 }
      )
    }

    // Prevent duplicate guest applications (same email + same job)
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobListingId,
        candidateEmail,
        userId: null,
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: "Une candidature avec cet email existe déjà pour cette offre" },
        { status: 409 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobListingId,
        userId: null,
        candidateName,
        candidateEmail,
        cvUrl,
        message: message || null,
        status: "UNREAD",
      },
    })

    return NextResponse.json(
      { data: application, message: "Candidature envoyée avec succès" },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/applications/guest error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
