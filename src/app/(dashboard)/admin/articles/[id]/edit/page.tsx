import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { ArticleForm } from "@/components/admin/ArticleForm"
import type { Metadata } from "next"

interface EditArticlePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: EditArticlePageProps): Promise<Metadata> {
  const { id } = await params
  const article = await prisma.article.findUnique({
    where: { id },
    select: { title: true },
  })

  return {
    title: article
      ? `Modifier : ${article.title} | SiyahaMag Admin`
      : "Article introuvable | SiyahaMag Admin",
  }
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) redirect("/connexion")

  const { id } = await params

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  })

  if (!article) notFound()

  // Serialize the article for the client component
  const serializedArticle = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    summary: article.summary ?? "",
    content: article.content,
    coverImage: article.coverImage ?? "",
    category: article.category,
    status: article.status,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    scheduledAt: article.scheduledAt?.toISOString() ?? null,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Modifier l&apos;article
        </h1>
        <p className="text-sm text-muted-foreground">
          {article.title}
        </p>
      </div>
      <ArticleForm mode="edit" article={serializedArticle} />
    </div>
  )
}
