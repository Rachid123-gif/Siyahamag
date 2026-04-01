import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import type { ReportStatus, ReportTargetType } from "@/generated/prisma/client"

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") as ReportStatus | null
  const targetType = searchParams.get("targetType") as ReportTargetType | null
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10))

  const where: Record<string, unknown> = {}

  if (
    status &&
    ["PENDING", "RESOLVED", "DISMISSED"].includes(status)
  ) {
    where.status = status
  }

  if (
    targetType &&
    ["JOB_LISTING", "INVESTMENT"].includes(targetType)
  ) {
    where.targetType = targetType
  }

  const [reports, totalItems] = await Promise.all([
    prisma.report.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.report.count({ where }),
  ])

  // Enrich reports with target info
  const enrichedReports = await Promise.all(
    reports.map(async (report) => {
      let targetTitle = "Element inconnu"
      let targetSlug: string | null = null

      if (report.targetType === "JOB_LISTING") {
        const job = await prisma.jobListing.findUnique({
          where: { id: report.targetId },
          select: { title: true, slug: true },
        })
        if (job) {
          targetTitle = job.title
          targetSlug = `/emploi/${job.slug}`
        }
      } else if (report.targetType === "INVESTMENT") {
        const investment = await prisma.investment.findUnique({
          where: { id: report.targetId },
          select: { title: true, slug: true },
        })
        if (investment) {
          targetTitle = investment.title
          targetSlug = `/investir/${investment.slug}`
        }
      }

      return {
        ...report,
        targetTitle,
        targetSlug,
      }
    })
  )

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  return NextResponse.json({
    data: {
      reports: enrichedReports,
      totalItems,
      totalPages,
      currentPage: page,
    },
  })
}
