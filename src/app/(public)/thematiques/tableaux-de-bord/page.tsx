import type { Metadata } from "next"
import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Tableaux de Bord Tourisme Maroc — Indicateurs & Données",
  description:
    "Indicateurs clés, données et analyses pour suivre la performance du tourisme marocain.",
  alternates: {
    canonical: "/thematiques/tableaux-de-bord",
  },
}

const DASHBOARD_ARTICLES = [
  {
    id: "d1",
    title: "Bilan touristique 2025 : le Maroc depasse les 14 millions de visiteurs",
    summary:
      "Analyse complete des indicateurs cles de performance du secteur touristique marocain pour l'annee 2025, avec comparaisons regionales et internationales.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
    date: "18 mars 2026",
    tag: "Bilan annuel",
  },
  {
    id: "d2",
    title: "Tableau de bord mensuel : fevrier 2026 en chiffres",
    summary:
      "Arrivees aux frontieres, nuitees hoteliers, recettes en devises : tous les indicateurs mensuels du tourisme marocain pour fevrier 2026.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=400&fit=crop",
    date: "10 mars 2026",
    tag: "Mensuel",
  },
  {
    id: "d3",
    title: "Comparatif regional : quelle region attire le plus de touristes ?",
    summary:
      "Marrakech-Safi domine, mais Dakhla affiche la plus forte croissance. Analyse detaillee des flux touristiques par region du Maroc.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    date: "2 mars 2026",
    tag: "Analyse regionale",
  },
]

export default function TableauxDeBordPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Thématiques", href: "/thematiques" },
          { label: "Tableaux de bord" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-emerald-50 text-emerald-700">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Tableaux de bord</h1>
          <p className="text-muted-foreground">
            Indicateurs cles et analyses du secteur touristique marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href="/thematiques/tableaux-de-bord"
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
                  <Badge className="bg-emerald-100 text-emerald-800 border-0">
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

      {/* Link to full statistics */}
      <div className="mt-10 text-center">
        <Link
          href="/statistiques"
          className="inline-flex items-center gap-2 rounded-lg bg-ocean px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ocean/90"
        >
          <BarChart3 className="size-4" />
          Voir toutes les statistiques
        </Link>
      </div>
    </div>
  )
}
