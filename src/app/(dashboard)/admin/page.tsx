import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatRelativeDate } from "@/lib/formatDate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Newspaper,
  Briefcase,
  FileText,
  Building2,
  Users,
  BadgeCheck,
  AlertTriangle,
  Clock,
  ArrowRight,
  Shield,
} from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Tableau de bord | SiyahaMag Admin",
}

export default async function AdminDashboardPage() {
  let totalArticles = 0
  let totalActiveJobs = 0
  let totalApplications = 0
  let totalActiveInvestments = 0
  let totalUsers = 0
  let verifiedEmployers = 0
  let pendingJobs = 0
  let pendingCompanies = 0
  let pendingInvestments = 0
  let pendingReports = 0
  type RecentActivityItem = {
    id: string
    action: string
    targetType: string
    createdAt: Date
    admin: { name: string } | null
  }
  let recentActivity: RecentActivityItem[] = []

  try {
    const results = await Promise.all([
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.jobListing.count({ where: { status: "APPROVED" } }),
      prisma.application.count(),
      prisma.investment.count({ where: { status: "APPROVED" } }),
      prisma.user.count(),
      prisma.company.count({ where: { verificationStatus: "VERIFIED" } }),
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
    totalArticles = results[0]
    totalActiveJobs = results[1]
    totalApplications = results[2]
    totalActiveInvestments = results[3]
    totalUsers = results[4]
    verifiedEmployers = results[5]
    pendingJobs = results[6]
    pendingCompanies = results[7]
    pendingInvestments = results[8]
    pendingReports = results[9]
    recentActivity = results[10] as RecentActivityItem[]
  } catch {
    // DB query failed — show zeros
  }

  const metricCards = [
    {
      title: "Articles publies",
      value: totalArticles,
      icon: Newspaper,
      color: "text-[#0C4A6E]",
      bg: "bg-[#0C4A6E]/10",
    },
    {
      title: "Offres actives",
      value: totalActiveJobs,
      icon: Briefcase,
      color: "text-[#059669]",
      bg: "bg-[#059669]/10",
    },
    {
      title: "Candidatures recues",
      value: totalApplications,
      icon: FileText,
      color: "text-[#D97706]",
      bg: "bg-[#D97706]/10",
    },
    {
      title: "Investissements actifs",
      value: totalActiveInvestments,
      icon: Building2,
      color: "text-[#0EA5E9]",
      bg: "bg-[#0EA5E9]/10",
    },
    {
      title: "Utilisateurs inscrits",
      value: totalUsers,
      icon: Users,
      color: "text-[#0C4A6E]",
      bg: "bg-[#0C4A6E]/10",
    },
    {
      title: "Employeurs verifies",
      value: verifiedEmployers,
      icon: BadgeCheck,
      color: "text-[#059669]",
      bg: "bg-[#059669]/10",
    },
  ]

  const moderationCards = [
    {
      title: "Offres en attente",
      count: pendingJobs,
      href: "/admin/moderation/offres",
      icon: Briefcase,
    },
    {
      title: "Entreprises en attente",
      count: pendingCompanies,
      href: "/admin/moderation/entreprises",
      icon: Building2,
    },
    {
      title: "Investissements en attente",
      count: pendingInvestments,
      href: "/admin/moderation/investissements",
      icon: Building2,
    },
    {
      title: "Signalements",
      count: pendingReports,
      href: "/admin/signalements",
      icon: AlertTriangle,
    },
  ]

  const ACTION_LABELS: Record<string, string> = {
    JOB_APPROVED: "Offre approuvee",
    JOB_REJECTED: "Offre rejetee",
    COMPANY_VERIFIED: "Entreprise verifiee",
    COMPANY_REJECTED: "Entreprise rejetee",
    INVESTMENT_APPROVED: "Investissement approuve",
    INVESTMENT_REJECTED: "Investissement rejete",
    USER_SUSPENDED: "Utilisateur suspendu",
    USER_REACTIVATED: "Utilisateur reactive",
    REPORT_RESOLVED: "Signalement resolu",
    REPORT_DISMISSED: "Signalement rejete",
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans l&apos;espace d&apos;administration de SiyahaMag.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardContent className="flex items-center gap-4 pt-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${card.bg}`}
                >
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Moderation overview */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Moderation</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moderationCards.map((card) => {
            const Icon = card.icon
            return (
              <Link key={card.href} href={card.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {card.title}
                        </p>
                        <p className="text-xl font-bold">{card.count}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent moderation activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Activite recente</h2>
        <Card>
          <CardContent className="pt-4">
            {recentActivity.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                Aucune activite de moderation recente.
              </p>
            ) : (
              <ul className="divide-y">
                {recentActivity.map((log) => (
                  <li
                    key={log.id}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{log.admin?.name ?? "Admin"}</span>
                        {" "}
                        <span className="text-muted-foreground">
                          {ACTION_LABELS[log.action] || log.action}
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatRelativeDate(log.createdAt)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
