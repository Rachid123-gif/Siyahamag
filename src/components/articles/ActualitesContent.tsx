"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ALL_ARTICLES, type Category } from "@/lib/articlesData"

// ── Categories shown in the filter bar ───────────────────────────────

const CATEGORIES: Array<{ key: "ALL" | Category; label: string }> = [
  { key: "ALL", label: "Toutes" },
  { key: "INVEST", label: "Invest" },
  { key: "GOUVERNEMENT", label: "Gouvernement" },
  { key: "MARCHES", label: "Marchés" },
  { key: "PROJETS", label: "Projets & Fédérations" },
  { key: "EVENEMENTS", label: "Événements" },
  { key: "GASTRONOMIE", label: "Gastronomie" },
  { key: "CULTURE", label: "Culture & Patrimoine" },
]

// ── Component ────────────────────────────────────────────────────────

export function ActualitesContent() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | Category>("ALL")

  const sorted = [...ALL_ARTICLES].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  )

  const filtered =
    activeCategory === "ALL"
      ? sorted
      : sorted.filter((a) => a.category === activeCategory)

  const activeLabel =
    CATEGORIES.find((c) => c.key === activeCategory)?.label ?? "Toutes"

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
        {activeCategory !== "ALL" ? `dans "${activeLabel}"` : "disponibles"}
      </p>

      {/* Articles grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/actualites/article/${article.slug}`}
              className="group block"
            >
              <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className={`${article.color} border-0`}>
                      {article.categoryLabel}
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
                    <time>{article.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
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
