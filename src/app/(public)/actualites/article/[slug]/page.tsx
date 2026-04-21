import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { ShareButtons } from "@/components/articles/ShareButtons"
import {
  ALL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articlesData"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return { title: "Article introuvable | SiyahaMag" }
  }
  return {
    title: `${article.title} | SiyahaMag`,
    description: article.summary.slice(0, 160),
    alternates: { canonical: `/actualites/article/${slug}` },
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.datePublished,
      images: [article.image],
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug, 3)
  const appUrl = `https://siyahamag.ma/actualites/article/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SiyahaMag",
      url: "https://siyahamag.ma",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": appUrl,
    },
    articleSection: article.categoryLabel,
  }

  const paragraphs = article.content.split("\n\n").filter((p) => p.trim())

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: article.categoryLabel, href: article.categoryPath },
          { label: article.title },
        ]}
      />

      <article className="mt-6 space-y-6">
        {/* Cover image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute left-4 top-4">
            <Badge className={`${article.color} border-0`}>
              {article.tag}
            </Badge>
          </div>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <Link
              href={article.categoryPath}
              className="flex items-center gap-1.5 text-ocean hover:underline"
            >
              <Tag className="h-4 w-4" />
              {article.categoryLabel}
            </Link>
          </div>
        </header>

        {/* Summary */}
        <div className="rounded-lg border-l-4 border-ocean bg-ocean-50 p-4">
          <p className="text-base font-medium text-ocean leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-foreground leading-relaxed mb-4"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Share */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Partager cet article
          </h3>
          <ShareButtons url={appUrl} title={article.title} />
        </div>

        {/* Back link */}
        <div className="border-t border-border pt-6">
          <Link
            href={article.categoryPath}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités {article.categoryLabel}
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/actualites/article/${r.slug}`}
                className="group block"
              >
                <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-ocean transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {r.date}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
