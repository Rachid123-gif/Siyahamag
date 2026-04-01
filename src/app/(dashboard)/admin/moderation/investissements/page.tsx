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
import { INVESTMENT_TYPES, ITEMS_PER_PAGE } from "@/lib/constants"
import { Eye } from "lucide-react"
import type { InvestmentStatus } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ status?: string; page?: string }>
}

const STATUS_TABS: { value: InvestmentStatus; label: string }[] = [
  { value: "PENDING", label: "En attente" },
  { value: "APPROVED", label: "Approuvees" },
  { value: "REJECTED", label: "Rejetees" },
]

export default async function InvestmentModerationPage({
  searchParams,
}: PageProps) {
  const params = await searchParams
  const currentStatus = (params.status as InvestmentStatus) || "PENDING"
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  // Fetch counts for each status tab
  const [pendingCount, approvedCount, rejectedCount] = await Promise.all([
    prisma.investment.count({ where: { status: "PENDING" } }),
    prisma.investment.count({ where: { status: "APPROVED" } }),
    prisma.investment.count({ where: { status: "REJECTED" } }),
  ])

  const statusCounts: Record<string, number> = {
    PENDING: pendingCount,
    APPROVED: approvedCount,
    REJECTED: rejectedCount,
  }

  // Fetch investments for current tab
  const totalItems = statusCounts[currentStatus] ?? 0
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))
  const skip = (currentPage - 1) * ITEMS_PER_PAGE

  const investments = await prisma.investment.findMany({
    where: { status: currentStatus },
    include: {
      user: {
        select: {
          name: true,
          email: true,
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
          Moderation des investissements
        </h1>
        <p className="text-muted-foreground">
          Examinez et validez les annonces d&apos;investissement soumises.
        </p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = currentStatus === tab.value
          return (
            <Link
              key={tab.value}
              href={`/admin/moderation/investissements?status=${tab.value}`}
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

      {/* Investments table */}
      {investments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {currentStatus === "PENDING"
              ? "Aucune annonce en attente de moderation."
              : currentStatus === "APPROVED"
                ? "Aucune annonce approuvee."
                : "Aucune annonce rejetee."}
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead className="hidden md:table-cell">Prix</TableHead>
                  <TableHead className="hidden md:table-cell">Vendeur</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {inv.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {INVESTMENT_TYPES[
                          inv.investmentType as keyof typeof INVESTMENT_TYPES
                        ] ?? inv.investmentType}
                      </Badge>
                    </TableCell>
                    <TableCell>{inv.city}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {inv.price
                        ? `${inv.price.toLocaleString("fr-FR")} MAD`
                        : "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {inv.contactName}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(inv.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/moderation/investissements/${inv.id}`}
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
                  href={`/admin/moderation/investissements?status=${currentStatus}&page=${currentPage - 1}`}
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
                  href={`/admin/moderation/investissements?status=${currentStatus}&page=${currentPage + 1}`}
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
