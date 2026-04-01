import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { createApplicationSchema } from "@/lib/validations/application"
import { z } from "zod"
import { ITEMS_PER_PAGE } from "@/lib/constants"

// --- POST: Submit an application (authenticated candidate) ---

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

    const parsed = createApplicationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { jobListingId, message, cvUrl } = parsed.data

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

    // Prevent duplicate applications (same user + same job)
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobListingId,
        userId: candidate.id,
      },
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: "Vous avez déjà postulé à cette offre" },
        { status: 409 }
      )
    }

    // Determine CV URL: use provided one, or fall back to profile CV
    const finalCvUrl = cvUrl || candidate.candidateProfile?.cvUrl

    if (!finalCvUrl) {
      return NextResponse.json(
        { error: "Aucun CV disponible. Veuillez en fournir un ou mettre à jour votre profil." },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobListingId,
        userId: candidate.id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        cvUrl: finalCvUrl,
        message: message || null,
        status: "UNREAD",
      },
    })

    return NextResponse.json(
      { data: application, message: "Candidature envoyée avec succès" },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/applications error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- GET: List candidate's own applications ---

const listApplicationsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(ITEMS_PER_PAGE),
})

export async function GET(request: Request) {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)

    const parsed = listApplicationsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Paramètres invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { page, limit } = parsed.data
    const skip = (page - 1) * limit

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where: { userId: candidate.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          jobListing: {
            select: {
              id: true,
              title: true,
              slug: true,
              city: true,
              contractType: true,
              status: true,
              company: {
                select: {
                  id: true,
                  name: true,
                  logo: true,
                },
              },
            },
          },
        },
      }),
      prisma.application.count({ where: { userId: candidate.id } }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: applications,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/applications error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
