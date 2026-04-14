import type { Metadata } from "next"
import Link from "next/link"
import { TrendingUp, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Invest — Actualites investissement touristique | SiyahaMag",
  description:
    "Investissements hoteliers, projets de resorts et financements d'infrastructures touristiques au Maroc.",
  openGraph: {
    title: "Invest — Actualites investissement touristique | SiyahaMag",
    description:
      "Investissements hoteliers, projets de resorts et financements d'infrastructures touristiques au Maroc.",
    type: "website",
  },
}

const INVEST_ARTICLES = [
  {
    id: "inv1",
    title: "Marriott annonce trois nouveaux hotels au Maroc pour 2027",
    summary:
      "Le groupe americain prevoit d'investir 1,2 milliard MAD dans des etablissements a Tanger, Essaouira et Dakhla, creant plus de 800 emplois directs.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "10 avril 2026",
    author: "Rachid El Amrani",
    tag: "Hotellerie",
  },
  {
    id: "inv2",
    title: "Le fonds Ithmar Capital investit 500 millions MAD dans le tourisme durable",
    summary:
      "Un programme ambitieux pour developper des eco-lodges dans les regions de l'Atlas et du Souss-Massa, misant sur le tourisme responsable et la preservation de l'environnement.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "5 avril 2026",
    author: "Fatima Zahra Bennani",
    tag: "Tourisme durable",
  },
  {
    id: "inv3",
    title: "Station balneaire de Taghazout Bay : phase 2 lancee avec 3 milliards MAD",
    summary:
      "La deuxieme phase du megaprojet integre un parc aquatique, un centre de congres et 2 000 nouvelles unites d'hebergement pour renforcer l'attractivite de la destination.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
    date: "28 mars 2026",
    author: "Karim Tazi",
    tag: "Megaprojets",
  },
  {
    id: "inv4",
    title: "Les IDE dans le tourisme marocain en hausse de 18 % au premier trimestre",
    summary:
      "Les investissements directs etrangers dans le secteur touristique atteignent un record historique, tires par l'immobilier de loisirs et l'hotellerie haut de gamme.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "20 mars 2026",
    author: "Nadia Chraibi",
    tag: "IDE",
  },
]

export default function InvestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-emerald-50 text-emerald-700">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Invest</h1>
          <p className="text-muted-foreground">
            Actualites de l&apos;investissement touristique au Maroc
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {INVEST_ARTICLES.map((article) => (
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
                <Badge className="bg-emerald-100 text-emerald-800 border-0">
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
