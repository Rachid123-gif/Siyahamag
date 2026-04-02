import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Scale } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Reglementation touristique au Maroc | SiyahaMag",
  description:
    "Lois, reglementations, normes et cadre juridique du secteur touristique au Maroc.",
}

const REGLEMENTATION_ARTICLES = [
  {
    id: "r1",
    title: "Nouvelle loi sur les locations touristiques : ce qui change en 2026",
    summary:
      "Le cadre juridique des locations saisonnieres et des plateformes en ligne est renforce avec de nouvelles obligations pour les proprietaires et les gestionnaires.",
    image: "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=600&h=400&fit=crop",
    date: "20 mars 2026",
    tag: "Legislation",
  },
  {
    id: "r2",
    title: "Normes de securite hoteliere : mise a jour des exigences 2026",
    summary:
      "Le Ministere du Tourisme publie les nouvelles normes de securite incendie et d'accessibilite obligatoires pour tous les etablissements d'hebergement touristique.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    date: "12 mars 2026",
    tag: "Normes",
  },
  {
    id: "r3",
    title: "Guide des autorisations pour ouvrir un riad touristique au Maroc",
    summary:
      "De la declaration d'activite au classement en passant par les autorisations sanitaires : le parcours complet pour mettre en activite un riad.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    date: "5 mars 2026",
    tag: "Guide pratique",
  },
  {
    id: "r4",
    title: "Fiscalite touristique : les avantages fiscaux pour les investisseurs en 2026",
    summary:
      "Exonerations de TVA, zones franches et incitations fiscales : panorama complet des dispositifs fiscaux favorables au secteur touristique marocain.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    date: "25 fevrier 2026",
    tag: "Fiscalite",
  },
]

export default function ReglementationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-amber-50 text-amber-700">
          <Scale className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Reglementation</h1>
          <p className="text-muted-foreground">
            Cadre juridique et normes du secteur touristique marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {REGLEMENTATION_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href="/thematiques/reglementation"
            className="group block"
          >
            <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-amber-100 text-amber-800 border-0">
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
                <p className="mt-auto pt-2 text-xs text-muted-foreground">
                  {article.date}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
