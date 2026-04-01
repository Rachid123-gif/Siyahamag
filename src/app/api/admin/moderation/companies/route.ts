import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { z } from "zod"
import { ITEMS_PER_PAGE } from "@/lib/constants"

// --- GET: List companies pending verification ---

const listCompaniesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(ITEMS_PER_PAGE),
  status: z
    .enum(["PENDING", "VERIFIED", "REJECTED"], {
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

    const parsed = listCompaniesSchema.safeParse({
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

    const where = {
      verificationStatus: status as "PENDING" | "VERIFIED" | "REJECTED",
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: { jobListings: true },
          },
        },
      }),
      prisma.company.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: companies,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/admin/moderation/companies error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
