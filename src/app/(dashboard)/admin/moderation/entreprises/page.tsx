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
import { ITEMS_PER_PAGE } from "@/lib/constants"
import { Eye } from "lucide-react"
import type { CompanyVerification } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

const STATUS_TABS: { value: CompanyVerification; label: string }[] = [
  { value: "PENDING", label: "En attente" },
  { value: "VERIFIED", label: "Verifiees" },
  { value: "REJECTED", label: "Rejetees" },
]

export default async function CompanyModerationPage({
  searchParams,
}: PageProps) {
  const params = await searchParams
  const currentStatus =
    (params.status as CompanyVerification) || "PENDING"
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  // Fetch counts for each status tab
  const [pendingCount, verifiedCount, rejectedCount] = await Promise.all([
    prisma.company.count({ where: { verificationStatus: "PENDING" } }),
    prisma.company.count({ where: { verificationStatus: "VERIFIED" } }),
    prisma.company.count({ where: { verificationStatus: "REJECTED" } }),
  ])

  const statusCounts: Record<string, number> = {
    PENDING: pendingCount,
    VERIFIED: verifiedCount,
    REJECTED: rejectedCount,
  }

  // Fetch companies for current tab
  const totalItems = statusCounts[currentStatus] ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const companies = await prisma.company.findMany({
    where: { verificationStatus: currentStatus },
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: ITEMS_PER_PAGE,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Verification des entreprises
        </h1>
        <p className="text-muted-foreground">
          Examinez et validez les entreprises inscrites sur la plateforme.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = currentStatus === tab.value
          return (
            <Link
              key={tab.value}
              href={`/admin/moderation/entreprises?status=${tab.value}`}
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

      {/* Companies table */}
      {companies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {currentStatus === "PENDING"
              ? "Aucune entreprise en attente de verification."
              : currentStatus === "VERIFIED"
                ? "Aucune entreprise verifiee."
                : "Aucune entreprise rejetee."}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>ICE</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Secteur</TableHead>
                  <TableHead>Date inscription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      {company.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {company.ice}
                    </TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.city}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{company.sector}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(company.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/moderation/entreprises/${company.id}`}
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
                  href={`/admin/moderation/entreprises?status=${currentStatus}&page=${currentPage - 1}`}
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
                  href={`/admin/moderation/entreprises?status=${currentStatus}&page=${currentPage + 1}`}
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
