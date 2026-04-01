import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Building2, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ModerationOverviewPage() {
  const [pendingJobsCount, pendingCompaniesCount, recentLogs] =
    await Promise.all([
      prisma.jobListing.count({ where: { status: "PENDING" } }),
      prisma.company.count({ where: { verificationStatus: "PENDING" } }),
      prisma.moderationLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { admin: { select: { name: true } } },
      }),
    ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Centre de moderation
        </h1>
        <p className="text-muted-foreground">
          Gerez les offres d&apos;emploi et les entreprises en attente de
          validation.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/moderation/offres">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardDescription>Offres en attente</CardDescription>
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Briefcase className="h-6 w-6 text-primary" />
                {pendingJobsCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {pendingJobsCount === 0
                  ? "Aucune offre en attente"
                  : `${pendingJobsCount} offre${pendingJobsCount > 1 ? "s" : ""} a moderer`}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/moderation/entreprises">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardDescription>Entreprises en attente</CardDescription>
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Building2 className="h-6 w-6 text-primary" />
                {pendingCompaniesCount}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {pendingCompaniesCount === 0
                  ? "Aucune entreprise en attente"
                  : `${pendingCompaniesCount} entreprise${pendingCompaniesCount > 1 ? "s" : ""} a verifier`}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent moderation activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Activite recente</h2>
        {recentLogs.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Aucune activite de moderation recente.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <Card key={log.id} size="sm">
                <CardContent className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{log.admin.name}</span>
                      {" — "}
                      <ModerationActionLabel action={log.action} />
                    </p>
                    {log.reason && (
                      <p className="text-xs text-muted-foreground">
                        Motif : {log.reason}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {log.targetType === "JOB_LISTING"
                      ? "Offre"
                      : log.targetType === "COMPANY"
                        ? "Entreprise"
                        : log.targetType}
                  </Badge>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ModerationActionLabel({ action }: { action: string }) {
  const labels: Record<string, string> = {
    APPROVE_JOB: "a approuve une offre d'emploi",
    REJECT_JOB: "a rejete une offre d'emploi",
    VERIFY_COMPANY: "a verifie une entreprise",
    REJECT_COMPANY: "a rejete une entreprise",
  }

  return <span>{labels[action] ?? action}</span>
}
