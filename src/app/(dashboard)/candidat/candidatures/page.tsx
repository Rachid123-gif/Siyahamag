import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ApplicationStatusBadge } from "@/components/candidate/ApplicationStatusBadge"
import { FileText, ArrowRight, MapPin, Building, Calendar } from "lucide-react"
import { formatDate } from "@/lib/formatDate"
import { ITEMS_PER_PAGE } from "@/lib/constants"
import type { ApplicationStatus } from "@/types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Mes candidatures | SiyahaMag",
  description: "Suivez l'etat de vos candidatures.",
}

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function CandidateApplicationsPage({
  searchParams,
}: PageProps) {
  const candidate = await getAuthenticatedCandidate()
  if (!candidate) redirect("/connexion")

  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const [applications, totalCount] = await Promise.all([
    prisma.application.findMany({
      where: { userId: candidate.id },
      orderBy: { createdAt: "desc" },
      skip,
      take: ITEMS_PER_PAGE,
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
    prisma.application.count({
      where: { userId: candidate.id },
    }),
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mes candidatures</h1>
        <p className="text-muted-foreground">
          {totalCount} candidature{totalCount !== 1 ? "s" : ""} envoyee
          {totalCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Applications list */}
      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">
              Vous n&apos;avez envoye aucune candidature.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Parcourez les offres d&apos;emploi et postulez directement en
              ligne.
            </p>
            <Button asChild className="mt-4">
              <Link href="/emplois">
                Voir les offres
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
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
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      {app.jobListing.company.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {app.jobListing.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(app.createdAt)}
                    </span>
                  </div>
                  {app.message && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {app.message}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm" asChild className="shrink-0">
                  <Link href={`/emplois/${app.jobListing.slug}`}>
                    Voir l&apos;offre
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/candidat/candidatures?page=${currentPage - 1}`}
              >
                Precedent
              </Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </span>
          {currentPage < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`/candidat/candidatures?page=${currentPage + 1}`}
              >
                Suivant
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
