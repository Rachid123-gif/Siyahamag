import type { Metadata } from "next"
import Link from "next/link"
import { Landmark, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Politiques Touristiques — Gouvernement & Vision 2030",
  description:
    "Stratégies gouvernementales, politiques de visa et Vision 2030 pour le tourisme marocain.",
  alternates: {
    canonical: "/actualites/gouvernement",
  },
  openGraph: {
    title: "Politiques Touristiques — Gouvernement & Vision 2030 | SiyahaMag",
    description:
      "Stratégies gouvernementales, politiques de visa et Vision 2030 pour le tourisme marocain.",
    type: "website",
  },
}

const GOUVERNEMENT_ARTICLES = [
  {
    id: "gov1",
    title: "Vision 2030 : le gouvernement rehausse l'objectif a 26 millions de touristes",
    summary:
      "La ministre du Tourisme a presente la feuille de route actualisee qui prevoit un doublement des capacites d'hebergement et une diversification des marches emetteurs.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "12 avril 2026",
    author: "Youssef Amrani",
    tag: "Vision 2030",
  },
  {
    id: "gov2",
    title: "Simplification des visas : le Maroc ouvre ses portes a 30 nouveaux pays",
    summary:
      "La nouvelle politique de visa electronique vise a faciliter l'acces au territoire marocain pour les touristes d'Asie et d'Amerique latine, un levier majeur de croissance.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "6 avril 2026",
    author: "Leila Berrada",
    tag: "Politique de visa",
  },
  {
    id: "gov3",
    title: "Budget 2026 : 8 milliards MAD pour les infrastructures touristiques",
    summary:
      "Le projet de loi de finances consacre une enveloppe record au secteur, avec un focus sur les routes d'acces, les aerogares et la formation professionnelle.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "1 avril 2026",
    author: "Hassan Ouazzani",
    tag: "Budget",
  },
  {
    id: "gov4",
    title: "Accord-cadre entre le ministere et les regions pour le tourisme rural",
    summary:
      "Douze regions signent un partenariat strategique pour developper le tourisme de nature, les circuits de randonnee et les hebergements chez l'habitant.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "25 mars 2026",
    author: "Amina El Fassi",
    tag: "Tourisme rural",
  },
]

export default function GouvernementPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Actualités", href: "/actualites" },
          { label: "Gouvernement" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-amber-50 text-amber-700">
          <Landmark className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Gouvernement</h1>
          <p className="text-muted-foreground">
            Politiques et strategies touristiques du Maroc
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {GOUVERNEMENT_ARTICLES.map((article) => (
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
                <Badge className="bg-amber-100 text-amber-800 border-0">
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
