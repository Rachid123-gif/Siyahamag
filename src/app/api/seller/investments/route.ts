import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedUser } from "@/lib/auth"
import { INVESTMENTS_PER_PAGE } from "@/lib/constants"
import { z } from "zod"

// --- Query params validation ---

const listMyInvestmentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(INVESTMENTS_PER_PAGE),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "SOLD"])
    .optional(),
})

// --- GET: List authenticated user's own investments (all statuses) ---

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const parsed = listMyInvestmentsSchema.safeParse({
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

    const where: Record<string, unknown> = {
      userId: user.id,
    }

    if (status) {
      where.status = status
    }

    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          investmentType: true,
          city: true,
          region: true,
          price: true,
          surface: true,
          rooms: true,
          condition: true,
          images: true,
          status: true,
          rejectionReason: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { contactMessages: true },
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
    console.error("GET /api/seller/investments error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
