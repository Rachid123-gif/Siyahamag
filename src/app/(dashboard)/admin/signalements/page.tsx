import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/formatDate"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ReportActionButtons } from "@/components/admin/ReportActionButtons"
import type { ReportStatus } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Signalements | SiyahaMag Admin",
}

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

const STATUS_TABS: { value: ReportStatus | "ALL"; label: string }[] = [
  { value: "PENDING", label: "En attente" },
  { value: "RESOLVED", label: "Resolus" },
  { value: "DISMISSED", label: "Rejetes" },
]

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  RESOLVED: "Resolu",
  DISMISSED: "Rejete",
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  RESOLVED: "default",
  DISMISSED: "destructive",
}

const TARGET_TYPE_LABELS: Record<string, string> = {
  JOB_LISTING: "Offre",
  INVESTMENT: "Investissement",
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentStatus = (params.status as ReportStatus) || "PENDING"
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  // Count per status
  const [pendingCount, resolvedCount, dismissedCount] = await Promise.all([
    prisma.report.count({ where: { status: "PENDING" } }),
    prisma.report.count({ where: { status: "RESOLVED" } }),
    prisma.report.count({ where: { status: "DISMISSED" } }),
  ])

  const statusCounts: Record<string, number> = {
    PENDING: pendingCount,
    RESOLVED: resolvedCount,
    DISMISSED: dismissedCount,
  }

  const totalItems = statusCounts[currentStatus] ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const reports = await prisma.report.findMany({
    where: { status: currentStatus },
    orderBy: { createdAt: "desc" },
    skip,
    take: ITEMS_PER_PAGE,
  })

  // Enrich with target info
  const enrichedReports = await Promise.all(
    reports.map(async (report) => {
      let targetTitle = "Element supprime ou introuvable"
      let targetHref: string | null = null

      if (report.targetType === "JOB_LISTING") {
        const job = await prisma.jobListing.findUnique({
          where: { id: report.targetId },
          select: { title: true, slug: true },
        })
        if (job) {
          targetTitle = job.title
          targetHref = `/emploi/${job.slug}`
        }
      } else if (report.targetType === "INVESTMENT") {
        const investment = await prisma.investment.findUnique({
          where: { id: report.targetId },
          select: { title: true, slug: true },
        })
        if (investment) {
          targetTitle = investment.title
          targetHref = `/investir/${investment.slug}`
        }
      }

      return { ...report, targetTitle, targetHref }
    })
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Signalements</h1>
        <p className="text-muted-foreground">
          Gerez les signalements soumis par les utilisateurs.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = currentStatus === tab.value
          return (
            <Link
              key={tab.value}
              href={`/admin/signalements?status=${tab.value}`}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="gap-2"
              >
                {tab.label}
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className="ml-1"
                >
                  {statusCounts[tab.value] ?? 0}
                </Badge>
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Reports table */}
      {enrichedReports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun signalement{" "}
            {currentStatus === "PENDING"
              ? "en attente"
              : currentStatus === "RESOLVED"
                ? "resolu"
                : "rejete"}
            .
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Cible</TableHead>
                  <TableHead>Raison</TableHead>
                  <TableHead>Signale par</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrichedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Badge variant="secondary">
                        {TARGET_TYPE_LABELS[report.targetType] ||
                          report.targetType}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {report.targetHref ? (
                        <Link
                          href={report.targetHref}
                          className="truncate text-primary underline-offset-4 hover:underline"
                          target="_blank"
                        >
                          {report.targetTitle}
                        </Link>
                      ) : (
                        <span className="truncate text-muted-foreground">
                          {report.targetTitle}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate">
                      {report.reason}
                    </TableCell>
                    <TableCell>{report.reporterEmail}</TableCell>
                    <TableCell>{formatDate(report.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[report.status] || "outline"}>
                        {STATUS_LABELS[report.status] || report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <ReportActionButtons
                        reportId={report.id}
                        currentStatus={report.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={`/admin/signalements?status=${currentStatus}&page=${currentPage - 1}`}
                >
                  <Button variant="outline" size="sm">
                    Precedent
                  </Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link
                  href={`/admin/signalements?status=${currentStatus}&page=${currentPage + 1}`}
                >
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
