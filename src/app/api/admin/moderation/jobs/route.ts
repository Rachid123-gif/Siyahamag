import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { z } from "zod"
import { JOBS_PER_PAGE } from "@/lib/constants"

// --- GET: List jobs pending moderation ---

const listPendingJobsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(JOBS_PER_PAGE),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED"], {
      message: "Statut invalide",
    })
    .optional()
    .default("PENDING"),
})

export async function GET(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const parsed = listPendingJobsSchema.safeParse({
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

    const where = { status: status as "PENDING" | "APPROVED" | "REJECTED" }

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              verificationStatus: true,
            },
          },
        },
      }),
      prisma.jobListing.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: jobs,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/admin/moderation/jobs error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
