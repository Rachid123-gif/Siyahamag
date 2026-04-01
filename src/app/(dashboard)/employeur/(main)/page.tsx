import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobStatusBadge } from "@/components/employer/JobStatusBadge"
import {
  Briefcase,
  Users,
  Clock,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react"
import { JOB_CATEGORIES, CONTRACT_TYPES } from "@/lib/constants"
import type { JobStatus, JobCategory, ContractType } from "@/types"

export const metadata = {
  title: "Tableau de bord employeur | SiyahaMag",
  description: "Gérez vos offres d'emploi et votre profil entreprise.",
}

export default async function EmployerDashboardPage() {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  const companyId = auth.company.id

  // Fetch metrics in parallel
  const [activeJobsCount, totalApplications, pendingJobsCount, totalViews, recentJobs] =
    await Promise.all([
      prisma.jobListing.count({
        where: { companyId, status: "APPROVED" },
      }),
      prisma.application.count({
        where: { jobListing: { companyId } },
      }),
      prisma.jobListing.count({
        where: { companyId, status: "PENDING" },
      }),
      prisma.jobListing.aggregate({
        where: { companyId, status: "APPROVED" },
        _sum: { viewCount: true },
      }),
      prisma.jobListing.findMany({
        where: { companyId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          _count: { select: { applications: true } },
        },
      }),
    ])

  const metrics = [
    {
      label: "Offres actives",
      value: activeJobsCount,
      icon: Briefcase,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Candidatures reçues",
      value: totalApplications,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "En attente de modération",
      value: pendingJobsCount,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Vues totales",
      value: totalViews._sum.viewCount ?? 0,
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue, {auth.company.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/employeur/offres/nouvelle">
            <Plus className="h-4 w-4" />
            Nouvelle offre
          </Link>
        </Button>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardContent className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${metric.bgColor}`}
                >
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Offres récentes</CardTitle>
          <CardDescription>Vos 5 dernières offres d&apos;emploi</CardDescription>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                Vous n&apos;avez aucune offre.{" "}
                <Link
                  href="/employeur/offres/nouvelle"
                  className="text-primary hover:underline"
                >
                  Publiez votre première offre !
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/employeur/offres/${job.id}/modifier`}
                        className="font-medium hover:underline"
                      >
                        {job.title}
                      </Link>
                      <JobStatusBadge status={job.status as JobStatus} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {JOB_CATEGORIES[job.jobCategory as JobCategory]} &middot;{" "}
                      {CONTRACT_TYPES[job.contractType as ContractType]} &middot;{" "}
                      {job.city} &middot; {job._count.applications} candidature
                      {job._count.applications !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/employeur/offres/${job.id}/modifier`}>
                      Modifier
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Button variant="outline" asChild>
                  <Link href="/employeur/offres">
                    Voir toutes les offres
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
