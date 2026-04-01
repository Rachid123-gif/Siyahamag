import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { JOB_CATEGORIES, ITEMS_PER_PAGE } from "@/lib/constants"
import { Eye, CheckCircle2, ShieldCheck } from "lucide-react"
import type { JobStatus } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

const STATUS_TABS: { value: JobStatus; label: string }[] = [
  { value: "PENDING", label: "En attente" },
  { value: "APPROVED", label: "Approuvees" },
  { value: "REJECTED", label: "Rejetees" },
]

export default async function JobModerationPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentStatus = (params.status as JobStatus) || "PENDING"
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  // Fetch counts for each status tab
  const [pendingCount, approvedCount, rejectedCount] = await Promise.all([
    prisma.jobListing.count({ where: { status: "PENDING" } }),
    prisma.jobListing.count({ where: { status: "APPROVED" } }),
    prisma.jobListing.count({ where: { status: "REJECTED" } }),
  ])

  const statusCounts: Record<string, number> = {
    PENDING: pendingCount,
    APPROVED: approvedCount,
    REJECTED: rejectedCount,
  }

  // Fetch jobs for current tab
  const totalItems = statusCounts[currentStatus] ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const jobs = await prisma.jobListing.findMany({
    where: { status: currentStatus },
    include: {
      company: {
        select: {
          name: true,
          verificationStatus: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Moderation des offres d&apos;emploi
        </h1>
        <p className="text-muted-foreground">
          Examinez et validez les offres soumises par les employeurs.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = currentStatus === tab.value
          return (
            <Link
              key={tab.value}
              href={`/admin/moderation/offres?status=${tab.value}`}
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

      {/* Jobs table */}
      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {currentStatus === "PENDING"
              ? "Aucune offre en attente de moderation."
              : currentStatus === "APPROVED"
                ? "Aucune offre approuvee."
                : "Aucune offre rejetee."}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead>Date soumission</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {job.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {job.company.name}
                        {job.company.verificationStatus === "VERIFIED" && (
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{job.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {JOB_CATEGORIES[
                          job.jobCategory as keyof typeof JOB_CATEGORIES
                        ] ?? job.jobCategory}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(job.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/moderation/offres/${job.id}`}
                      >
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-1.5 h-4 w-4" />
                          Voir
                        </Button>
                      </Link>
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
                  href={`/admin/moderation/offres?status=${currentStatus}&page=${currentPage - 1}`}
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
                  href={`/admin/moderation/offres?status=${currentStatus}&page=${currentPage + 1}`}
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
