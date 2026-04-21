import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ApplicationStatusBadge } from "@/components/candidate/ApplicationStatusBadge"
import {
  FileText,
  Clock,
  Bell,
  ArrowRight,
  Briefcase,
  UserCircle,
} from "lucide-react"
import { formatDate } from "@/lib/formatDate"
import type { ApplicationStatus } from "@/types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Tableau de bord candidat | SiyahaMag",
  description: "Suivez vos candidatures et gerez votre profil.",
}

export default async function CandidateDashboardPage() {
  const candidate = await getAuthenticatedCandidate()
  if (!candidate) redirect("/connexion")

  // Fetch metrics in parallel — with graceful fallback if DB fails
  let totalApplications = 0
  let unreadApplications = 0
  let activeAlerts = 0
  type RecentApp = {
    id: string
    status: string
    createdAt: Date
    jobListing: {
      title: string
      slug: string
      city: string
      company: { name: string }
    }
  }
  let recentApplications: RecentApp[] = []
  try {
    const results = await Promise.all([
      prisma.application.count({
        where: { userId: candidate.id },
      }),
      prisma.application.count({
        where: { userId: candidate.id, status: "UNREAD" },
      }),
      prisma.jobAlert.count({
        where: { userId: candidate.id, isActive: true },
      }),
      prisma.application.findMany({
        where: { userId: candidate.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          jobListing: {
            select: {
              title: true,
              slug: true,
              city: true,
              company: {
                select: { name: true },
              },
            },
          },
        },
      }),
    ])
    totalApplications = results[0]
    unreadApplications = results[1]
    activeAlerts = results[2]
    recentApplications = results[3] as RecentApp[]
  } catch {
    // DB query failed — show dashboard with zeros
  }

  const metrics = [
    {
      label: "Candidatures envoyees",
      value: totalApplications,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "En attente",
      value: unreadApplications,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Alertes actives",
      value: activeAlerts,
      icon: Bell,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {candidate.name}
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Recent applications */}
      <Card>
        <CardHeader>
          <CardTitle>Candidatures recentes</CardTitle>
          <CardDescription>Vos 5 dernieres candidatures</CardDescription>
        </CardHeader>
        <CardContent>
          {recentApplications.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                Vous n&apos;avez envoye aucune candidature.{" "}
                <Link
                  href="/emplois"
                  className="text-primary hover:underline"
                >
                  Parcourez les offres !
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/emplois/${app.jobListing.slug}`}
                        className="font-medium hover:underline"
                      >
                        {app.jobListing.title}
                      </Link>
                      <ApplicationStatusBadge
                        status={app.status as ApplicationStatus}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {app.jobListing.company.name} &middot;{" "}
                      {app.jobListing.city} &middot;{" "}
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Button variant="outline" asChild>
                  <Link href="/candidat/candidatures">
                    Voir toutes les candidatures
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Voir les offres</p>
              <p className="text-sm text-muted-foreground">
                Parcourez les dernieres offres d&apos;emploi
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/emplois">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Completer mon profil</p>
              <p className="text-sm text-muted-foreground">
                Ajoutez votre CV et vos competences
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/candidat/profil">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
