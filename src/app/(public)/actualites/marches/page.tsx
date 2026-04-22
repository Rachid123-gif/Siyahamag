import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { getArticlesByCategory } from "@/lib/articlesData"

export const metadata: Metadata = {
  title: "Marchés Touristiques Maroc — Tendances & Occupation",
  description:
    "Taux d'occupation, arrivées de touristes et tendances du marché touristique marocain.",
  alternates: { canonical: "/actualites/marches" },
  openGraph: {
    title: "Marchés Touristiques Maroc — Tendances & Occupation | SiyahaMag",
    description:
      "Taux d'occupation, arrivées de touristes et tendances du marché touristique marocain.",
    type: "website",
  },
}

export default function MarchesPage() {
  const articles = getArticlesByCategory("MARCHES")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: "Marchés" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8 mt-4">
        <div className="inline-flex p-3 rounded-lg bg-cyan-50 text-cyan-700">
          <ShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Marchés</h1>
          <p className="text-muted-foreground">
            Tendances et indicateurs du marché touristique marocain
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
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-ocean transition-colors">
                  {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {article.summary}
                </p>
                <div className="mt-auto pt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-sm font-medium text-ocean hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voir toutes les actualités
        </Link>
      </div>
    </div>
  )
}
