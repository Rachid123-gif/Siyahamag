"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ── Categories (only the 7 main ones from the wireframe) ─────────────

const CATEGORIES = [
  { key: "ALL", label: "Toutes" },
  { key: "INVEST", label: "Invest" },
  { key: "GOUVERNEMENT", label: "Gouvernement" },
  { key: "MARCHES", label: "Marchés" },
  { key: "PROJETS_FEDERATIONS", label: "Projets & Fédérations" },
  { key: "EVENEMENTS", label: "Événements" },
  { key: "GASTRONOMIE", label: "Gastronomie" },
  { key: "CULTURE_PATRIMOINE", label: "Culture & Patrimoine" },
]

const CATEGORY_LABELS: Record<string, string> = {
  INVEST: "Invest",
  GOUVERNEMENT: "Gouvernement",
  MARCHES: "Marchés",
  PROJETS_FEDERATIONS: "Projets & Fédérations",
  EVENEMENTS: "Événements",
  GASTRONOMIE: "Gastronomie",
  CULTURE_PATRIMOINE: "Culture & Patrimoine",
}

const CATEGORY_COLORS: Record<string, string> = {
  INVEST: "bg-orange-100 text-orange-800",
  GOUVERNEMENT: "bg-indigo-100 text-indigo-800",
  MARCHES: "bg-cyan-100 text-cyan-800",
  PROJETS_FEDERATIONS: "bg-teal-100 text-teal-800",
  EVENEMENTS: "bg-purple-100 text-purple-800",
  GASTRONOMIE: "bg-rose-100 text-rose-800",
  CULTURE_PATRIMOINE: "bg-pink-100 text-pink-800",
}

// ── Demo articles ────────────────────────────────────────────────────

const DEMO_ARTICLES = [
  {
    id: "1",
    title:
      "Investissements hôteliers : 15 milliards MAD injectés en 2025",
    slug: "investissements-hoteliers-15-milliards-2025",
    summary:
      "Le secteur hôtelier marocain connaît une vague d'investissements sans précédent, avec l'arrivée de grandes chaînes internationales à Tanger et Dakhla.",
    coverImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    category: "INVEST",
    publishedAt: "2026-03-28",
    author: "Rachid Amri",
  },
  {
    id: "2",
    title:
      "Le Gouvernement dévoile la feuille de route touristique 2026-2030",
    slug: "feuille-route-touristique-2026-2030",
    summary:
      "Le nouveau plan stratégique vise à attirer 26 millions de touristes d'ici 2030, avec des investissements massifs dans les infrastructures et la formation.",
    coverImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
    category: "GOUVERNEMENT",
    publishedAt: "2026-03-25",
    author: "Karim Bennis",
  },
  {
    id: "3",
    title:
      "La gastronomie marocaine inscrite au patrimoine mondial de l'UNESCO",
    slug: "gastronomie-marocaine-unesco-2026",
    summary:
      "Le couscous, le tajine et les pâtisseries traditionnelles marocaines obtiennent une reconnaissance internationale méritée auprès de l'organisation onusienne.",
    coverImage:
      "https://images.unsplash.com/photo-1541518763-27a024444965?w=600&h=400&fit=crop",
    category: "GASTRONOMIE",
    publishedAt: "2026-03-22",
    author: "Fatima Zahra Idrissi",
  },
  {
    id: "4",
    title:
      "Coupe du Monde 2030 : le Maroc accélère la construction des stades",
    slug: "coupe-du-monde-2030-stades-maroc",
    summary:
      "Les chantiers des six stades marocains avancent à grand rythme. Le Grand Stade de Casablanca sera le plus grand d'Afrique avec 115 000 places.",
    coverImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
    category: "PROJETS_FEDERATIONS",
    publishedAt: "2026-03-20",
    author: "Omar Tazi",
  },
  {
    id: "5",
    title:
      "Le tourisme durable au cœur de la stratégie Vision 2030 du Maroc",
    slug: "tourisme-durable-vision-2030-maroc",
    summary:
      "Le Ministère du Tourisme dévoile un plan ambitieux pour un tourisme respectueux de l'environnement, avec des labels écologiques pour les établissements.",
    coverImage:
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    category: "GOUVERNEMENT",
    publishedAt: "2026-03-18",
    author: "Nadia Alaoui",
  },
  {
    id: "6",
    title:
      "Record de touristes à Essaouira pendant le festival Gnaoua",
    slug: "record-touristes-essaouira-festival-gnaoua",
    summary:
      "La 30e édition du célèbre festival a attiré un nombre record de visiteurs nationaux et internationaux, confirmant le rayonnement culturel de la ville.",
    coverImage:
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&h=400&fit=crop",
    category: "EVENEMENTS",
    publishedAt: "2026-03-15",
    author: "Salma Bennani",
  },
  {
    id: "7",
    title:
      "Le marché hôtelier de Marrakech enregistre un taux d'occupation de 92%",
    slug: "marche-hotelier-marrakech-taux-occupation",
    summary:
      "Les riads et hôtels de la médina affichent complet pour la saison printemps. Le secteur crée 12 000 emplois saisonniers supplémentaires cette année.",
    coverImage:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    category: "MARCHES",
    publishedAt: "2026-03-12",
    author: "Yasmine El Amrani",
  },
  {
    id: "8",
    title:
      "Les plages du Maroc classées parmi les plus belles de la Méditerranée",
    slug: "plages-maroc-classement-mediterranee",
    summary:
      "Plusieurs plages marocaines figurent dans le top 20 du classement européen Blue Flag, récompensant la qualité de l'eau et les infrastructures.",
    coverImage:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop",
    category: "CULTURE_PATRIMOINE",
    publishedAt: "2026-03-10",
    author: "Hassan Ouazzani",
  },
  {
    id: "9",
    title:
      "Chefchaouen bat son record de fréquentation touristique en 2025",
    slug: "chefchaouen-record-frequentation-2025",
    summary:
      "La ville bleue du Rif a accueilli plus de 500 000 visiteurs, portée par les réseaux sociaux et son classement dans les destinations les plus photogéniques.",
    coverImage:
      "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=600&h=400&fit=crop",
    category: "CULTURE_PATRIMOINE",
    publishedAt: "2026-03-07",
    author: "Amina Kettani",
  },
  {
    id: "10",
    title:
      "Ouverture du plus grand resort all-inclusive de Dakhla",
    slug: "ouverture-resort-all-inclusive-dakhla",
    summary:
      "Le groupe Accor inaugure un complexe de 450 chambres face à l'océan, renforçant la position de Dakhla comme destination balnéaire internationale.",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    category: "INVEST",
    publishedAt: "2026-03-04",
    author: "Mehdi Chraibi",
  },
]

// ── Component ────────────────────────────────────────────────────────

export function ActualitesContent() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL")

  const filtered =
    activeCategory === "ALL"
      ? DEMO_ARTICLES
      : DEMO_ARTICLES.filter((a) => a.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16 mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Actualités du tourisme marocain
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Toute l&apos;information du secteur touristique au Maroc :
          investissement, gouvernement, marchés, événements et gastronomie.
        </p>
      </div>

      {/* Category filter — scrollable with fade edges */}
      <div className="relative mb-8">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none pr-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat.key
                  ? "bg-ocean text-white shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* Fade edge indicator for scroll */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        {filtered.length} article{filtered.length > 1 ? "s" : ""}{" "}
        {activeCategory !== "ALL" ? `dans "${CATEGORY_LABELS[activeCategory]}"` : "disponibles"}
      </p>

      {/* Articles grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const categoryLabel =
              CATEGORY_LABELS[article.category] ?? article.category
            const colorClass =
              CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-800"

            return (
              <Link
                key={article.id}
                href={`/actualites`}
                className="group block"
              >
                <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-lg">
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
                  <CardContent className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {article.summary}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                      <time>
                        {new Date(article.publishedAt).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>{article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg">
          <p>Aucun article dans cette catégorie pour le moment.</p>
          <button
            onClick={() => setActiveCategory("ALL")}
            className="mt-3 text-ocean hover:underline font-medium"
          >
            Voir toutes les actualités
          </button>
        </div>
      )}
    </div>
  )
}
