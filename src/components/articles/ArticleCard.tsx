import Image from "next/image"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ARTICLE_CATEGORIES } from "@/lib/constants"
import { formatDate } from "@/lib/formatDate"
import type { ArticleCategory } from "@/types"

// Color mapping for article category badges
const CATEGORY_COLORS: Record<string, string> = {
  HEBERGEMENT: "bg-blue-100 text-blue-800",
  TRANSPORT: "bg-amber-100 text-amber-800",
  AERIEN: "bg-sky-100 text-sky-800",
  GASTRONOMIE: "bg-rose-100 text-rose-800",
  EVENEMENTS: "bg-purple-100 text-purple-800",
  DEVELOPPEMENT: "bg-emerald-100 text-emerald-800",
  MICE: "bg-teal-100 text-teal-800",
}

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    summary: string | null
    coverImageUrl: string | null
    category: ArticleCategory
    publishedAt: Date | string | null
    author: {
      firstName: string | null
      lastName: string | null
    }
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const categoryLabel =
    ARTICLE_CATEGORIES[article.category as keyof typeof ARTICLE_CATEGORIES] ??
    article.category
  const colorClass = CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-800"

  return (
    <Link href={`/actualites/${article.slug}`} className="group block">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-lg">
        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm text-muted-foreground">
                Pas d&apos;image
              </span>
            </div>
          )}
          {/* Category badge overlay */}
          <div className="absolute left-3 top-3">
            <Badge className={`${colorClass} border-0`}>
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
            {article.title}
          </h3>

          {article.summary && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {article.summary}
            </p>
          )}

          <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
            {article.publishedAt && (
              <time dateTime={new Date(article.publishedAt).toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            {article.publishedAt && article.author.firstName && (
              <span aria-hidden="true">&#183;</span>
            )}
            {article.author.firstName && (
              <span>
                {article.author.firstName} {article.author.lastName}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
