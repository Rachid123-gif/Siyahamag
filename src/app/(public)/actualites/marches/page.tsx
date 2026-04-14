import type { Metadata } from "next"
import Link from "next/link"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Marches — Tendances du marche touristique | SiyahaMag",
  description:
    "Taux d'occupation, arrivees de touristes et tendances du marche touristique marocain.",
  openGraph: {
    title: "Marches — Tendances du marche touristique | SiyahaMag",
    description:
      "Taux d'occupation, arrivees de touristes et tendances du marche touristique marocain.",
    type: "website",
  },
}

const MARCHES_ARTICLES = [
  {
    id: "mar1",
    title: "Taux d'occupation record de 72 % au premier trimestre 2026",
    summary:
      "Les hotels classes du Maroc affichent un taux d'occupation en hausse de 5 points, tire par la reprise des marches europeens et l'essor du tourisme interne.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "11 avril 2026",
    author: "Mehdi Alaoui",
    tag: "Occupation hoteliere",
  },
  {
    id: "mar2",
    title: "Marrakech : premiere destination du continent africain selon Euromonitor",
    summary:
      "Le classement mondial 2026 place Marrakech devant Le Cap et Le Caire, confirmant l'attractivite de la Ville rouge aupres des voyageurs internationaux.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "4 avril 2026",
    author: "Sara Filali",
    tag: "Classement mondial",
  },
  {
    id: "mar3",
    title: "Le marche chinois en forte progression : +45 % d'arrivees en 2025",
    summary:
      "Les touristes chinois decouvrent le Maroc en masse, attires par les vols directs Pekin-Casablanca et les campagnes promotionnelles ciblees de l'ONMT.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "27 mars 2026",
    author: "Kamal Idrissi",
    tag: "Marches emetteurs",
  },
  {
    id: "mar4",
    title: "Revenus touristiques : le Maroc franchit le cap des 110 milliards MAD",
    summary:
      "Les recettes touristiques du royaume atteignent un nouveau sommet, soutenues par la montee en gamme de l'offre et l'augmentation du panier moyen des visiteurs.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=500&fit=crop",
    date: "18 mars 2026",
    author: "Zineb Lahlou",
    tag: "Recettes",
  },
]

export default function MarchesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-purple-50 text-purple-700">
          <ShoppingCart className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Marches</h1>
          <p className="text-muted-foreground">
            Tendances et indicateurs du marche touristique marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {MARCHES_ARTICLES.map((article) => (
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
                <Badge className="bg-purple-100 text-purple-800 border-0">
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
