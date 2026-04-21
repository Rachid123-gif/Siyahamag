import type { Metadata } from "next"
import Link from "next/link"
import { CalendarDays, ArrowLeft } from "lucide-react"
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
  title: "Événements Touristiques Maroc — Festivals & Salons",
  description:
    "Festivals, conférences, salons professionnels et événements MICE au Maroc.",
  alternates: {
    canonical: "/actualites/evenements",
  },
  openGraph: {
    title: "Événements Touristiques Maroc — Festivals & Salons | SiyahaMag",
    description:
      "Festivals, conférences, salons professionnels et événements MICE au Maroc.",
    type: "website",
  },
}

const EVENEMENTS_ARTICLES = [
  {
    id: "evt1",
    title: "FITUR Africa 2026 : Marrakech accueille le plus grand salon du tourisme africain",
    summary:
      "Plus de 3 000 exposants et 80 pays representes au Palais des Congres de Marrakech pour la premiere edition africaine du salon espagnol de reference.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "9 avril 2026",
    author: "Rachida Bouhia",
    tag: "Salon professionnel",
  },
  {
    id: "evt2",
    title: "Festival de Fes des musiques sacrees : 30e edition sous le signe de la paix",
    summary:
      "L'edition anniversaire du celebre festival reunira des artistes de 25 pays autour du theme du dialogue interreligieux, attirant 100 000 visiteurs attendus.",
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=500&fit=crop",
    date: "3 avril 2026",
    author: "Ahmed Tazi",
    tag: "Festival",
  },
  {
    id: "evt3",
    title: "Morocco Tourism Awards : les laureats 2026 devoiles",
    summary:
      "La ceremonie recompense les meilleurs etablissements, experiences et initiatives durables du tourisme marocain, avec une categorie speciale innovation digitale.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "26 mars 2026",
    author: "Laila Benjelloun",
    tag: "Ceremonie",
  },
  {
    id: "evt4",
    title: "Congres mondial du MICE a Casablanca : le Maroc hub de l'evenementiel",
    summary:
      "Casablanca se positionne comme destination MICE de premier plan en Afrique, avec l'inauguration du nouveau centre de conventions de 50 000 m2.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "15 mars 2026",
    author: "Mourad Cherkaoui",
    tag: "MICE",
  },
]

export default function EvenementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: "Événements" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-rose-50 text-rose-700">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Evenements</h1>
          <p className="text-muted-foreground">
            Festivals, salons et evenements touristiques au Maroc
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {EVENEMENTS_ARTICLES.map((article) => (
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
                  <Badge className="bg-rose-100 text-rose-800 border-0">
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
