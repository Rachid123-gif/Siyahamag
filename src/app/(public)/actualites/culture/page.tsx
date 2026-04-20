import type { Metadata } from "next"
import Link from "next/link"
import { Palette, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Culture & Patrimoine Maroc — Médinas, Riads & Héritage",
  description:
    "Médinas, riads, patrimoine culturel, Chefchaouen et héritage architectural du Maroc.",
  alternates: {
    canonical: "/actualites/culture",
  },
  openGraph: {
    title: "Culture & Patrimoine Maroc — Médinas, Riads & Héritage | SiyahaMag",
    description:
      "Médinas, riads, patrimoine culturel, Chefchaouen et héritage architectural du Maroc.",
    type: "website",
  },
}

const CULTURE_ARTICLES = [
  {
    id: "cul1",
    title: "Chefchaouen, la perle bleue, classee parmi les 10 plus belles villes du monde",
    summary:
      "Le magazine Travel + Leisure place la ville bleue du Rif dans son classement annuel, saluant son architecture unique et son authenticite preservee.",
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=500&fit=crop",
    date: "11 avril 2026",
    author: "Yasmine Tazi",
    tag: "Patrimoine",
  },
  {
    id: "cul2",
    title: "Restauration de la medina de Fes : un projet de 2 milliards MAD",
    summary:
      "Le programme de rehabilitation de la plus ancienne medina du monde preserve 300 riads historiques et cree un parcours touristique immersif dans l'artisanat traditionnel.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "5 avril 2026",
    author: "Amine Berrada",
    tag: "Medina",
  },
  {
    id: "cul3",
    title: "Les riads marocains : un modele d'hebergement unique au monde",
    summary:
      "Avec plus de 1 500 riads-maisons d'hotes repertories, le Maroc offre une experience d'hebergement authentique qui seduit les voyageurs en quete de culture.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "28 mars 2026",
    author: "Layla Bennani",
    tag: "Riads",
  },
  {
    id: "cul4",
    title: "Essaouira : la cite des alizees mise sur le tourisme culturel",
    summary:
      "Musees, galeries d'art, ateliers d'artisans et festivals de musique gnaoua : Essaouira se reinvente comme capitale culturelle de la cote atlantique.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=500&fit=crop",
    date: "19 mars 2026",
    author: "Hamza Oukacha",
    tag: "Tourisme culturel",
  },
]

export default function CulturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: "Culture & Patrimoine" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-indigo-50 text-indigo-700">
          <Palette className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Culture & Patrimoine</h1>
          <p className="text-muted-foreground">
            Heritage culturel et architectural du Maroc
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CULTURE_ARTICLES.map((article) => (
          <Card key={article.id} className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute left-3 top-3">
                <Badge className="bg-indigo-100 text-indigo-800 border-0">
                  {article.tag}
                </Badge>
              </div>
            </div>
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
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
