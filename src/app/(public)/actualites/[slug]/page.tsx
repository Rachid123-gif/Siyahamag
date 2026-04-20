import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { ARTICLE_CATEGORIES } from "@/lib/constants"
import { formatDate, calculateReadingTime } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import { ArticleCard } from "@/components/articles/ArticleCard"
import { ShareButtons } from "@/components/articles/ShareButtons"
import { RichTextRenderer } from "@/components/articles/RichTextRenderer"

// ── Types ─────────────────────────────────────────────────────────────

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// ── Category badge colors ─────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  HEBERGEMENT: "bg-blue-100 text-blue-800",
  TRANSPORT: "bg-amber-100 text-amber-800",
  AERIEN: "bg-sky-100 text-sky-800",
  GASTRONOMIE: "bg-rose-100 text-rose-800",
  EVENEMENTS: "bg-purple-100 text-purple-800",
  DEVELOPPEMENT: "bg-emerald-100 text-emerald-800",
  MICE: "bg-teal-100 text-teal-800",
}

// ── Helpers ───────────────────────────────────────────────────────────

function splitName(fullName: string): { firstName: string | null; lastName: string | null } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0) return { firstName: null, lastName: null }
  if (parts.length === 1) return { firstName: parts[0], lastName: null }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

// ── Data fetching ─────────────────────────────────────────────────────

async function getArticle(slug: string) {
  const now = new Date()

  const article = await prisma.article.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      publishedAt: { lte: now },
    },
    include: {
      author: {
        select: { id: true, name: true, avatarUrl: true },
      },
    },
  })

  return article
}

async function getSimilarArticles(category: string, excludeId: string) {
  const now = new Date()

  const articles = await prisma.article.findMany({
    where: {
      category: category as never,
      status: "PUBLISHED",
      publishedAt: { lte: now },
      id: { not: excludeId },
    },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  })

  return articles
}

// ── Increment view count (fire-and-forget) ────────────────────────────

function incrementViewCount(articleId: string) {
  prisma.article
    .update({
      where: { id: articleId },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => {
      // Silently ignore errors — view count is not critical
    })
}

// ── SEO metadata ──────────────────────────────────────────────────────

export async function generateMetadata(props: ArticlePageProps): Promise<Metadata> {
  const { slug } = await props.params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: "Article introuvable | SiyahaMag",
    }
  }

  const categoryLabel =
    ARTICLE_CATEGORIES[article.category as keyof typeof ARTICLE_CATEGORIES] ??
    article.category

  return {
    title: `${article.title} | SiyahaMag`,
    description: article.summary ?? `Article ${categoryLabel} — SiyahaMag`,
    openGraph: {
      title: article.title,
      description: article.summary ?? undefined,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author.name],
      ...(article.coverImage && { images: [article.coverImage] }),
    },
  }
}

// ── Page component ────────────────────────────────────────────────────

export default async function ArticleDetailPage(props: ArticlePageProps) {
  const { slug } = await props.params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  // Increment view count (fire-and-forget)
  incrementViewCount(article.id)

  // Fetch similar articles
  const similarArticles = await getSimilarArticles(article.category, article.id)

  const categoryLabel =
    ARTICLE_CATEGORIES[article.category as keyof typeof ARTICLE_CATEGORIES] ??
    article.category
  const colorClass = CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-800"
  const readingTime = calculateReadingTime(article.content)
  const articleUrl = `https://siyahamag.ma/actualites/${article.slug}`

  // Map similar articles for ArticleCard
  const similarCards = similarArticles.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    summary: a.summary,
    coverImageUrl: a.coverImage,
    category: a.category,
    publishedAt: a.publishedAt,
    author: splitName(a.author.name),
  }))

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary ?? undefined,
    image: article.coverImage ?? undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "SiyahaMag",
      url: "https://siyahamag.ma",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-ocean transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link href="/actualites" className="hover:text-ocean transition-colors">
                Actualités
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link
                href={`/actualites?category=${article.category}`}
                className="hover:text-ocean transition-colors"
              >
                {categoryLabel}
              </Link>
            </li>
            <li>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Cover image hero */}
        {article.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-8">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Category + Date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge className={`${colorClass} border-0`}>{categoryLabel}</Badge>
          {article.publishedAt && (
            <time
              dateTime={article.publishedAt.toISOString()}
              className="text-sm text-muted-foreground"
            >
              {formatDate(article.publishedAt)}
            </time>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-foreground mb-6">
          {article.title}
        </h1>

        {/* Author info + reading time */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          {article.author.avatarUrl ? (
            <Image
              src={article.author.avatarUrl}
              alt={article.author.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-ocean font-semibold text-sm">
              {article.author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">{article.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {readingTime} min de lecture
            </p>
          </div>
        </div>

        {/* Article body with share buttons */}
        <div className="flex gap-8">
          {/* Share buttons (sticky sidebar on desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Partager
              </p>
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </aside>

          {/* Article content */}
          <div className="flex-1 min-w-0">
            <RichTextRenderer
              content={article.content as { type: "doc"; content: never[] }}
            />

            {/* Mobile share buttons */}
            <div className="mt-8 pt-8 border-t md:hidden">
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Partager cet article
              </p>
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </div>
        </div>

        {/* Similar articles */}
        {similarCards.length > 0 && (
          <section className="mt-16 pt-12 border-t">
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarCards.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
