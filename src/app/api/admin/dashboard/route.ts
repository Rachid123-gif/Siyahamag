import { NextResponse } from "next/server"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  const [
    totalArticles,
    totalActiveJobs,
    totalApplications,
    totalActiveInvestments,
    totalUsers,
    totalCandidates,
    totalEmployers,
    pendingJobs,
    pendingCompanies,
    pendingInvestments,
    pendingReports,
    recentActivity,
  ] = await Promise.all([
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.jobListing.count({ where: { status: "APPROVED" } }),
    prisma.application.count(),
    prisma.investment.count({ where: { status: "APPROVED" } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: "CANDIDATE" } }),
    prisma.user.count({ where: { role: "EMPLOYER" } }),
    prisma.jobListing.count({ where: { status: "PENDING" } }),
    prisma.company.count({ where: { verificationStatus: "PENDING" } }),
    prisma.investment.count({ where: { status: "PENDING" } }),
    prisma.report.count({ where: { status: "PENDING" } }),
    prisma.moderationLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        admin: {
          select: { name: true },
        },
      },
    }),
  ])

  return NextResponse.json({
    data: {
      totalArticles,
      totalActiveJobs,
      totalApplications,
      totalActiveInvestments,
      totalUsers,
      totalCandidates,
      totalEmployers,
      pendingJobs,
      pendingCompanies,
      pendingInvestments,
      pendingReports,
      recentActivity,
    },
  })
}
