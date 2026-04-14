import type { Metadata } from "next"
import Link from "next/link"
import { FolderKanban, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Projets & Federations | SiyahaMag",
  description:
    "Coupe du Monde 2030, ONMT, federations du tourisme et grands projets d'infrastructure au Maroc.",
  openGraph: {
    title: "Projets & Federations | SiyahaMag",
    description:
      "Coupe du Monde 2030, ONMT, federations du tourisme et grands projets d'infrastructure au Maroc.",
    type: "website",
  },
}

const PROJETS_ARTICLES = [
  {
    id: "proj1",
    title: "Coupe du Monde 2030 : 14 stades et 200 000 chambres d'hotel en preparation",
    summary:
      "Le Maroc accelere la construction des infrastructures pour accueillir le Mondial aux cotes de l'Espagne et du Portugal, un investissement colossal de 52 milliards MAD.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "13 avril 2026",
    author: "Omar Benjelloun",
    tag: "Mondial 2030",
  },
  {
    id: "proj2",
    title: "L'ONMT lance une campagne mondiale 'Morocco, Land of Light'",
    summary:
      "L'Office national marocain du tourisme deploie une campagne sur 5 continents avec un budget de 800 millions MAD pour positionner le Maroc comme destination premium.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "7 avril 2026",
    author: "Samira Kettani",
    tag: "ONMT",
  },
  {
    id: "proj3",
    title: "LGV Marrakech-Agadir : mise en service prevue pour 2028",
    summary:
      "La ligne a grande vitesse reliant les deux villes touristiques majeures du sud reduira le temps de trajet a 1h15, ouvrant de nouvelles perspectives pour le tourisme de circuit.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "30 mars 2026",
    author: "Youssef Benali",
    tag: "Infrastructure",
  },
  {
    id: "proj4",
    title: "Federation du tourisme : un plan d'urgence pour la formation de 50 000 jeunes",
    summary:
      "La CNT et les federations regionales s'engagent a former massivement les jeunes Marocains aux metiers de l'hotellerie et de la restauration avant 2030.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=500&fit=crop",
    date: "22 mars 2026",
    author: "Kenza El Ghali",
    tag: "Formation",
  },
]

export default function ProjetsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-orange-50 text-orange-700">
          <FolderKanban className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Projets & Federations</h1>
          <p className="text-muted-foreground">
            Grands projets et actualites des federations touristiques
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJETS_ARTICLES.map((article) => (
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
                <Badge className="bg-orange-100 text-orange-800 border-0">
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
