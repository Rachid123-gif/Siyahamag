import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { ARTICLE_CATEGORIES, ARTICLES_PER_PAGE } from "@/lib/constants"
import { StatusBadge } from "@/components/articles/StatusBadge"
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
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Metadata } from "next"
import type { ArticleStatus, ArticleCategory } from "@/types"
import type { ArticleWhereInput } from "@/generated/prisma/models/Article"
import { AdminArticleDeleteButton } from "@/components/admin/AdminArticleDeleteButton"

export const metadata: Metadata = {
  title: "Gestion des articles | SiyahaMag Admin",
}

const STATUS_TABS = [
  { label: "Tous", value: "" },
  { label: "Brouillons", value: "DRAFT" },
  { label: "Publies", value: "PUBLISHED" },
  { label: "Programmes", value: "SCHEDULED" },
] as const

interface AdminArticlesPageProps {
  searchParams: Promise<{
    status?: string
    page?: string
    q?: string
  }>
}

export default async function AdminArticlesPage({
  searchParams,
}: AdminArticlesPageProps) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) redirect("/connexion")

  const params = await searchParams
  const currentStatus = params.status || ""
  const currentPage = Math.max(1, parseInt(params.page || "1", 10))
  const searchQuery = params.q || ""

  const where: ArticleWhereInput = {}

  if (currentStatus && ["DRAFT", "PUBLISHED", "SCHEDULED"].includes(currentStatus)) {
    where.status = currentStatus as ArticleStatus
  }

  if (searchQuery) {
    where.title = { contains: searchQuery, mode: "insensitive" }
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ARTICLES_PER_PAGE,
      take: ARTICLES_PER_PAGE,
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.article.count({ where }),
  ])

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)

  // Build search params string helper
  const buildUrl = (overrides: Record<string, string>) => {
    const p = new URLSearchParams()
    const merged = {
      status: currentStatus,
      page: String(currentPage),
      q: searchQuery,
      ...overrides,
    }
    for (const [key, value] of Object.entries(merged)) {
      if (value) p.set(key, value)
    }
    return `/admin/articles?${p.toString()}`
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "—"
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestion des articles
          </h1>
          <p className="text-sm text-muted-foreground">
            {total} article{total !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </div>

      {/* Search */}
      <form action="/admin/articles" method="get" className="flex gap-2">
        {currentStatus && (
          <input type="hidden" name="status" value={currentStatus} />
        )}
        <input
          type="text"
          name="q"
          defaultValue={searchQuery}
          placeholder="Rechercher un article..."
          className="h-10 w-full max-w-sm rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <Button type="submit" variant="secondary">
          Rechercher
        </Button>
      </form>

      {/* Status tabs */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={buildUrl({ status: tab.value, page: "1" })}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              currentStatus === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-muted-foreground">Aucun article trouve.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date publication</TableHead>
                <TableHead>Mis a jour</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="max-w-[300px]">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="font-medium hover:underline line-clamp-1"
                    >
                      {article.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {ARTICLE_CATEGORIES[article.category as keyof typeof ARTICLE_CATEGORIES]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={article.status as ArticleStatus} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(article.publishedAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(article.updatedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/articles/${article.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <AdminArticleDeleteButton
                        articleId={article.id}
                        articleTitle={article.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: String(currentPage - 1) })}>
                Precedent
              </Link>
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </span>
          {currentPage < totalPages && (
            <Button variant="outline" size="sm" asChild>
              <Link href={buildUrl({ page: String(currentPage + 1) })}>
                Suivant
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
