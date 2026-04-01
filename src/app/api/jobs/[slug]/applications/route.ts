import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { z } from "zod"
import { ITEMS_PER_PAGE } from "@/lib/constants"

// --- GET: List applications for a specific job (employer only) ---

const listJobApplicationsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(ITEMS_PER_PAGE),
  status: z
    .enum(["UNREAD", "VIEWED", "SHORTLISTED", "REJECTED"])
    .optional(),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant qu'employeur." },
        { status: 401 }
      )
    }

    const { slug } = await params

    // Find the job listing by slug
    const job = await prisma.jobListing.findUnique({
      where: { slug },
      select: { id: true, companyId: true, title: true },
    })

    if (!job) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    // Verify the employer owns this job
    if (job.companyId !== auth.company.id) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)

    const parsed = listJobApplicationsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      status: searchParams.get("status") ?? undefined,
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

    const { page, limit, status } = parsed.data
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      jobListingId: job.id,
    }

    if (status) {
      where.status = status
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          candidateName: true,
          candidateEmail: true,
          cvUrl: true,
          message: true,
          status: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              city: true,
              phone: true,
              candidateProfile: {
                select: {
                  skills: true,
                  experiences: true,
                  education: true,
                  availability: true,
                },
              },
            },
          },
        },
      }),
      prisma.application.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: applications,
      job: { id: job.id, title: job.title },
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/jobs/[slug]/applications error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
