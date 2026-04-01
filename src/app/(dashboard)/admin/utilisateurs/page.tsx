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
import { UserActionButton } from "@/components/admin/UserActionButton"
import { UsersFilterBar } from "@/components/admin/UsersFilterBar"
import type { Role } from "@/generated/prisma/client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Gestion des utilisateurs | SiyahaMag Admin",
}

interface PageProps {
  searchParams: Promise<{
    role?: string
    status?: string
    q?: string
    page?: string
  }>
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  CANDIDATE: "Candidat",
  EMPLOYER: "Employeur",
  INVESTOR: "Investisseur",
}

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-800",
  CANDIDATE: "bg-green-100 text-green-800",
  EMPLOYER: "bg-blue-100 text-blue-800",
  INVESTOR: "bg-orange-100 text-orange-800",
}

export default async function UsersManagementPage({
  searchParams,
}: PageProps) {
  const params = await searchParams
  const roleFilter = params.role as Role | undefined
  const statusFilter = params.status || "all"
  const searchQuery = params.q || ""
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))

  // Build where clause
  const where: Record<string, unknown> = {}

  if (
    roleFilter &&
    ["ADMIN", "CANDIDATE", "EMPLOYER", "INVESTOR"].includes(roleFilter)
  ) {
    where.role = roleFilter
  }

  if (statusFilter === "active") {
    where.isSuspended = false
  } else if (statusFilter === "suspended") {
    where.isSuspended = true
  }

  if (searchQuery.trim()) {
    where.OR = [
      { name: { contains: searchQuery.trim(), mode: "insensitive" } },
      { email: { contains: searchQuery.trim(), mode: "insensitive" } },
    ]
  }

  const [users, totalItems] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        company: {
          select: {
            name: true,
            verificationStatus: true,
          },
        },
        candidateProfile: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.user.count({ where }),
  ])

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE))

  // Build pagination URL helper
  function buildUrl(page: number) {
    const params = new URLSearchParams()
    if (roleFilter) params.set("role", roleFilter)
    if (statusFilter !== "all") params.set("status", statusFilter)
    if (searchQuery) params.set("q", searchQuery)
    params.set("page", String(page))
    return `/admin/utilisateurs?${params.toString()}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Gestion des utilisateurs
        </h1>
        <p className="text-muted-foreground">
          Gerez les comptes utilisateurs de la plateforme.
        </p>
      </div>

      {/* Filter bar */}
      <UsersFilterBar
        currentRole={roleFilter || ""}
        currentStatus={statusFilter}
        currentQuery={searchQuery}
      />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {totalItems} utilisateur{totalItems !== 1 ? "s" : ""} trouve
        {totalItems !== 1 ? "s" : ""}
      </p>

      {/* Users table */}
      {users.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Aucun utilisateur ne correspond a vos criteres.
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Inscrit le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>
                        {user.name}
                        {user.company && (
                          <p className="text-xs text-muted-foreground">
                            {user.company.name}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[user.role] || ""}`}
                      >
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.isSuspended ? (
                        <Badge variant="destructive">Suspendu</Badge>
                      ) : (
                        <Badge variant="secondary">Actif</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      {user.role !== "ADMIN" && (
                        <UserActionButton
                          userId={user.id}
                          isSuspended={user.isSuspended}
                        />
                      )}
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
                <Link href={buildUrl(currentPage - 1)}>
                  <Button variant="outline" size="sm">
                    Precedent
                  </Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </span>
              {currentPage < totalPages && (
                <Link href={buildUrl(currentPage + 1)}>
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
