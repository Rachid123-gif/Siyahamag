import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { getArticlesByCategory } from "@/lib/articlesData"

export const metadata: Metadata = {
  title: "Recherches Académiques — Tourisme au Maroc",
  description:
    "Recherches, études universitaires et publications académiques sur le tourisme au Maroc.",
  alternates: { canonical: "/thematiques/academiques" },
}

export default function AcademiquesPage() {
  const articles = getArticlesByCategory("ACADEMIQUES")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Thématiques", href: "/thematiques" },
          { label: "Académiques" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8 mt-4">
        <div className="inline-flex p-3 rounded-lg bg-purple-50 text-purple-700">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Académiques</h1>
          <p className="text-muted-foreground">
            Recherches et études universitaires sur le tourisme marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/actualites/article/${article.slug}`}
            className="group block"
          >
            <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3">
                  <Badge className={`${article.color} border-0`}>
                    {article.tag}
                  </Badge>
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium">{article.author}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
