import type { Metadata } from "next"
import Link from "next/link"
import { UtensilsCrossed, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export const metadata: Metadata = {
  title: "Gastronomie Marocaine — Patrimoine Culinaire & Restaurants",
  description:
    "Patrimoine culinaire UNESCO, restaurants, tourisme gastronomique et tendances culinaires au Maroc.",
  alternates: {
    canonical: "/actualites/gastronomie",
  },
  openGraph: {
    title: "Gastronomie Marocaine — Patrimoine Culinaire & Restaurants | SiyahaMag",
    description:
      "Patrimoine culinaire UNESCO, restaurants, tourisme gastronomique et tendances culinaires au Maroc.",
    type: "website",
  },
}

const GASTRONOMIE_ARTICLES = [
  {
    id: "gas1",
    title: "La cuisine marocaine inscrite au patrimoine immateriel de l'UNESCO",
    summary:
      "Apres le couscous, c'est l'ensemble de la gastronomie marocaine qui recoit cette distinction mondiale, reconnaissant des siecles de traditions culinaires uniques.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop",
    date: "8 avril 2026",
    author: "Fatima Zahra Idrissi",
    tag: "UNESCO",
  },
  {
    id: "gas2",
    title: "Top 10 des restaurants gastronomiques du Maroc en 2026",
    summary:
      "De Marrakech a Tanger, les tables marocaines se renouvellent en fusionnant tradition et modernite, attirant une clientele internationale exigeante.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "2 avril 2026",
    author: "Adil Belkadi",
    tag: "Restaurants",
  },
  {
    id: "gas3",
    title: "Tourisme culinaire : les circuits gastronomiques explosent au Maroc",
    summary:
      "Food tours dans les medinas, cours de cuisine dans les riads, routes des epices : le tourisme gastronomique represente desormais 15 % des activites touristiques.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "24 mars 2026",
    author: "Nora Alami",
    tag: "Tourisme culinaire",
  },
]

export default function GastronomiePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: "Gastronomie" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-yellow-50 text-yellow-700">
          <UtensilsCrossed className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Gastronomie</h1>
          <p className="text-muted-foreground">
            Patrimoine culinaire et tourisme gastronomique au Maroc
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {GASTRONOMIE_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href={`/actualites/article/${slugify(article.title)}`}
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
                  <Badge className="bg-yellow-100 text-yellow-800 border-0">
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
          Voir toutes les actualites
        </Link>
      </div>
    </div>
  )
}
