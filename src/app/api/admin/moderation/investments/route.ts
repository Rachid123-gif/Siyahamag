import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { INVESTMENTS_PER_PAGE } from "@/lib/constants"
import { z } from "zod"

// --- Query params validation ---

const listPendingInvestmentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(INVESTMENTS_PER_PAGE),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "SOLD"], {
      message: "Statut invalide",
    })
    .optional()
    .default("PENDING"),
})

// --- GET: Admin list investments by status (default PENDING) ---

export async function GET(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const parsed = listPendingInvestmentsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Parametres invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { page, limit, status } = parsed.data
    const skip = (page - 1) * limit

    const where = { status: status as "PENDING" | "APPROVED" | "REJECTED" | "SOLD" }

    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
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
        },
      }),
      prisma.investment.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: investments,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/admin/moderation/investments error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
