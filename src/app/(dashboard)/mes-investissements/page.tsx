import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getAuthenticatedUser } from "@/lib/auth"
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
import { Badge } from "@/components/ui/badge"
import { INVESTMENT_TYPES } from "@/lib/constants"
import { Plus, ExternalLink, Pencil } from "lucide-react"
import type { InvestmentType, InvestmentStatus } from "@/types"

export const metadata: Metadata = {
  title: "Mes annonces d'investissement | SiyahaMag",
  description: "Gerez vos annonces d'investissement sur SiyahaMag.",
}

const INVESTMENT_STATUSES: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  PENDING: { label: "En attente", variant: "secondary" },
  APPROVED: { label: "Publiee", variant: "default" },
  REJECTED: { label: "Rejetee", variant: "destructive" },
  SOLD: { label: "Vendu", variant: "outline" },
}

export default async function SellerDashboardPage() {
  const user = await getAuthenticatedUser()
  if (!user) redirect("/connexion")

  const investments = await prisma.investment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Mes annonces d&apos;investissement
          </h1>
          <p className="text-muted-foreground">
            Gerez vos annonces d&apos;investissement
          </p>
        </div>
        <Button asChild>
          <Link href="/investissement/publier">
            <Plus className="h-4 w-4" />
            Nouvelle annonce
          </Link>
        </Button>
      </div>

      {/* Investments table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Toutes les annonces</CardTitle>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Vous n&apos;avez aucune annonce.{" "}
                <Link
                  href="/investissement/publier"
                  className="text-primary hover:underline"
                >
                  Publiez votre premiere annonce !
                </Link>
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Ville</TableHead>
                  <TableHead className="hidden lg:table-cell">Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((inv) => {
                  const typeLabel =
                    INVESTMENT_TYPES[
                      inv.investmentType as InvestmentType
                    ] ?? inv.investmentType
                  const statusInfo =
                    INVESTMENT_STATUSES[inv.status as InvestmentStatus] ?? {
                      label: inv.status,
                      variant: "outline" as const,
                    }

                  return (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {inv.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {typeLabel}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {inv.city}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {inv.price
                          ? `${inv.price.toLocaleString("fr-FR")} MAD`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {new Date(inv.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {inv.status === "APPROVED" && (
                            <Button variant="ghost" size="icon" asChild>
                              <Link
                                href={`/investissement/${inv.slug}`}
                                title="Voir l'annonce"
                                target="_blank"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
