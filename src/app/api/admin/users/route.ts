import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import type { Role } from "@/generated/prisma/client"

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const role = searchParams.get("role") as Role | null
  const q = searchParams.get("q") || ""
  const isSuspended = searchParams.get("isSuspended")
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))

  const where: Record<string, unknown> = {}

  if (role && ["ADMIN", "CANDIDATE", "EMPLOYER", "INVESTOR"].includes(role)) {
    where.role = role
  }

  if (isSuspended === "true") {
    where.isSuspended = true
  } else if (isSuspended === "false") {
    where.isSuspended = false
  }

  if (q.trim()) {
    where.OR = [
      { name: { contains: q.trim(), mode: "insensitive" } },
      { email: { contains: q.trim(), mode: "insensitive" } },
    ]
  }

  const [users, totalItems] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        company: {
          select: {
            name: true,
            verificationStatus: true,
          },
        },
        candidateProfile: {
          select: {
            id: true,
            availability: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.user.count({ where }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  return NextResponse.json({
    data: {
      users,
      totalItems,
      totalPages,
      currentPage: page,
    },
  })
}
