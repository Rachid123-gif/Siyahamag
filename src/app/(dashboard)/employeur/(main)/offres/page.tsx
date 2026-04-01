import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { JobStatusBadge } from "@/components/employer/JobStatusBadge"
import { Plus, Pencil, ExternalLink } from "lucide-react"
import { JOB_CATEGORIES, CONTRACT_TYPES } from "@/lib/constants"
import type { JobStatus, JobCategory, ContractType } from "@/types"

export const metadata = {
  title: "Mes offres d'emploi | SiyahaMag",
  description: "Gérez vos offres d'emploi sur SiyahaMag.",
}

interface EmployerJobsPageProps {
  searchParams: Promise<{ status?: string }>
}

const STATUS_TABS = [
  { label: "Toutes", value: "" },
  { label: "Brouillons", value: "DISABLED" },
  { label: "En attente", value: "PENDING" },
  { label: "Actives", value: "APPROVED" },
  { label: "Rejetées", value: "REJECTED" },
]

export default async function EmployerJobsPage({
  searchParams,
}: EmployerJobsPageProps) {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  const params = await searchParams
  const statusFilter = params.status || ""

  const where: Record<string, unknown> = {
    companyId: auth.company.id,
  }

  if (statusFilter) {
    where.status = statusFilter
  }

  const jobs = await prisma.jobListing.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { applications: true } },
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mes offres</h1>
          <p className="text-muted-foreground">
            Gérez vos offres d&apos;emploi
          </p>
        </div>
        <Button asChild>
          <Link href="/employeur/offres/nouvelle">
            <Plus className="h-4 w-4" />
            Nouvelle offre
          </Link>
        </Button>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={statusFilter === tab.value ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link
              href={
                tab.value
                  ? `/employeur/offres?status=${tab.value}`
                  : "/employeur/offres"
              }
            >
              {tab.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Jobs table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {statusFilter
              ? `Offres : ${STATUS_TABS.find((t) => t.value === statusFilter)?.label ?? statusFilter}`
              : "Toutes les offres"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <div className="py-12 text-center">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                  <TableHead className="hidden md:table-cell">Contrat</TableHead>
                  <TableHead className="hidden sm:table-cell">Ville</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden sm:table-cell">Candidatures</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {job.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {JOB_CATEGORIES[job.jobCategory as JobCategory]}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {CONTRACT_TYPES[job.contractType as ContractType]}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {job.city}
                    </TableCell>
                    <TableCell>
                      <JobStatusBadge status={job.status as JobStatus} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {job._count.applications}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/employeur/offres/${job.id}/modifier`}
                            title="Modifier"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        {job.status === "APPROVED" && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link
                              href={`/emplois/${job.slug}`}
                              title="Voir l'offre"
                              target="_blank"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
