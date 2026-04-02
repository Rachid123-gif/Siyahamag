import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ARTICLE_CATEGORIES } from "@/lib/constants"
import { CategoryFilterBar } from "@/components/articles/CategoryFilterBar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// ── SEO ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Actualites du tourisme marocain | SiyahaMag",
  description:
    "Suivez les dernieres nouvelles du secteur touristique au Maroc : hebergement, transport, gastronomie, evenements.",
  openGraph: {
    title: "Actualites du tourisme marocain | SiyahaMag",
    description:
      "Suivez les dernieres nouvelles du secteur touristique au Maroc.",
    type: "website",
  },
}

// ── Static demo data ─────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  HEBERGEMENT: "bg-blue-100 text-blue-800",
  TRANSPORT: "bg-amber-100 text-amber-800",
  AERIEN: "bg-sky-100 text-sky-800",
  GASTRONOMIE: "bg-rose-100 text-rose-800",
  EVENEMENTS: "bg-purple-100 text-purple-800",
  DEVELOPPEMENT: "bg-emerald-100 text-emerald-800",
  INVEST: "bg-orange-100 text-orange-800",
  GOUVERNEMENT: "bg-indigo-100 text-indigo-800",
  MARCHES: "bg-cyan-100 text-cyan-800",
  PROJETS_FEDERATIONS: "bg-teal-100 text-teal-800",
  CULTURE_PATRIMOINE: "bg-pink-100 text-pink-800",
  MICE: "bg-teal-100 text-teal-800",
}

const DEMO_ARTICLES = [
  {
    id: "1",
    title: "Les riads de Marrakech affichent complet pour la saison printemps 2026",
    slug: "riads-marrakech-complet-printemps-2026",
    summary:
      "Avec un taux d'occupation record de 92%, les riads de la medina de Marrakech confirment l'engouement des touristes internationaux pour l'hebergement traditionnel marocain.",
    coverImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    category: "HEBERGEMENT" as const,
    publishedAt: "2026-03-28",
    author: "Yasmine El Amrani",
  },
  {
    id: "2",
    title: "Le nouvel aeroport de Marrakech-Menara accueillera 20 millions de passagers",
    slug: "nouvel-aeroport-marrakech-menara-2026",
    summary:
      "L'extension du terminal 2 de l'aeroport de Marrakech entre dans sa phase finale, avec une capacite doublee pour repondre a la croissance du trafic aerien.",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
    category: "AERIEN" as const,
    publishedAt: "2026-03-25",
    author: "Karim Bennis",
  },
  {
    id: "3",
    title: "La gastronomie marocaine inscrite au patrimoine mondial de l'UNESCO",
    slug: "gastronomie-marocaine-unesco-2026",
    summary:
      "Le couscous, le tajine et les patisseries traditionnelles marocaines obtiennent une reconnaissance internationale meritee aupres de l'organisation onusienne.",
    coverImage: "https://images.unsplash.com/photo-1541518763-27a024444965?w=600&h=400&fit=crop",
    category: "GASTRONOMIE" as const,
    publishedAt: "2026-03-22",
    author: "Fatima Zahra Idrissi",
  },
  {
    id: "4",
    title: "Coupe du Monde 2030 : le Maroc accelere la construction des stades",
    slug: "coupe-du-monde-2030-stades-maroc",
    summary:
      "Les chantiers des six stades marocains pour la Coupe du Monde 2030 avancent a grand rythme. Le Grand Stade de Casablanca sera le plus grand d'Afrique.",
    coverImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
    category: "EVENEMENTS" as const,
    publishedAt: "2026-03-20",
    author: "Omar Tazi",
  },
  {
    id: "5",
    title: "Le tourisme durable au coeur de la strategie Vision 2030 du Maroc",
    slug: "tourisme-durable-vision-2030-maroc",
    summary:
      "Le Ministere du Tourisme devoile un plan ambitieux pour un tourisme respectueux de l'environnement, avec des labels ecologiques pour les etablissements hoteliers.",
    coverImage: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    category: "DEVELOPPEMENT" as const,
    publishedAt: "2026-03-18",
    author: "Nadia Alaoui",
  },
  {
    id: "6",
    title: "Le TGV Al Boraq relie desormais Tanger a Essaouira en 4 heures",
    slug: "tgv-al-boraq-tanger-essaouira",
    summary:
      "L'extension de la ligne a grande vitesse vers le sud permet aux touristes de decouvrir la cote atlantique marocaine plus facilement que jamais.",
    coverImage: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&h=400&fit=crop",
    category: "TRANSPORT" as const,
    publishedAt: "2026-03-15",
    author: "Mehdi Chraibi",
  },
  {
    id: "7",
    title: "Festival des musiques sacrees de Fes : edition record avec 200 000 visiteurs",
    slug: "festival-musiques-sacrees-fes-2026",
    summary:
      "La 30e edition du celebre festival de Fes a attire un nombre record de visiteurs nationaux et internationaux, confirmant le rayonnement culturel de la ville.",
    coverImage: "https://images.unsplash.com/photo-1531219572328-a0171b4448a7?w=600&h=400&fit=crop",
    category: "EVENEMENTS" as const,
    publishedAt: "2026-03-12",
    author: "Salma Bennani",
  },
  {
    id: "8",
    title: "Les plages du Maroc classees parmi les plus belles de la Mediterranee",
    slug: "plages-maroc-classement-mediterranee",
    summary:
      "Plusieurs plages marocaines figurent dans le top 20 du classement europeen Blue Flag, recompensant la qualite de l'eau et les infrastructures touristiques.",
    coverImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop",
    category: "DEVELOPPEMENT" as const,
    publishedAt: "2026-03-10",
    author: "Hassan Ouazzani",
  },
  {
    id: "9",
    title: "Investissements hoteliers : 15 milliards MAD injectes en 2025",
    slug: "investissements-hoteliers-15-milliards-2025",
    summary:
      "Le secteur hotelier marocain connait une vague d'investissements sans precedent, avec l'arrivee de grandes chaines internationales a Tanger et Dakhla.",
    coverImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    category: "INVEST" as const,
    publishedAt: "2026-03-07",
    author: "Rachid Amri",
  },
  {
    id: "10",
    title: "Chefchaouen, la perle bleue, bat son record de frequentation touristique",
    slug: "chefchaouen-record-frequentation-2026",
    summary:
      "La ville bleue du Rif a accueilli plus de 500 000 visiteurs en 2025, portee par les reseaux sociaux et son classement dans les destinations les plus photogeniques.",
    coverImage: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=600&h=400&fit=crop",
    category: "CULTURE_PATRIMOINE" as const,
    publishedAt: "2026-03-04",
    author: "Amina Kettani",
  },
]

// ── Page ──────────────────────────────────────────────────────────────

export default function ActualitesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16 mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Actualites du tourisme marocain
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Toute l&apos;information du secteur touristique au Maroc : hebergement,
          transport, gastronomie, evenements et investissements.
        </p>
      </div>

      {/* Category filter */}
      <div className="mb-8">
        <CategoryFilterBar currentCategory={null} />
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {DEMO_ARTICLES.length} articles disponibles
      </p>

      {/* Articles grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_ARTICLES.map((article) => {
          const categoryLabel =
            ARTICLE_CATEGORIES[article.category as keyof typeof ARTICLE_CATEGORIES] ??
            article.category
          const colorClass =
            CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-800"

          return (
            <Link
              key={article.id}
              href={`/actualites/${article.slug}`}
              className="group block"
            >
              <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-lg">
                {/* Cover image */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className={`${colorClass} border-0`}>
                      {categoryLabel}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {article.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <time>{new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
                    <span aria-hidden="true">&#183;</span>
                    <span>{article.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
