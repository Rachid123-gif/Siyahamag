import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { INVESTMENT_TYPES } from "@/lib/constants"
import { InvestmentFilters } from "@/components/investments/InvestmentFilters"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Ruler, Banknote } from "lucide-react"

// ── SEO ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Investissement touristique au Maroc | SiyahaMag",
  description:
    "Decouvrez les opportunites d'investissement dans le secteur touristique marocain : hotels, riads, restaurants, terrains.",
  openGraph: {
    title: "Investissement touristique au Maroc | SiyahaMag",
    description:
      "Decouvrez les meilleures opportunites d'investissement dans le secteur touristique marocain.",
    type: "website",
  },
}

// ── Static demo data ─────────────────────────────────────────────────

const DEMO_INVESTMENTS = [
  {
    id: "1",
    title: "Riad de charme a vendre - Medina de Marrakech",
    slug: "riad-charme-medina-marrakech",
    investmentType: "RIAD" as const,
    city: "Marrakech",
    price: 3500000,
    surface: 320,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Terrain en zone touristique - Baie d'Agadir",
    slug: "terrain-zone-touristique-agadir",
    investmentType: "TERRAIN" as const,
    city: "Agadir",
    price: 8000000,
    surface: 5000,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Hotel 4 etoiles - Front de mer Tanger",
    slug: "hotel-4-etoiles-tanger",
    investmentType: "HOTEL" as const,
    city: "Tanger",
    price: 45000000,
    surface: 4200,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Restaurant panoramique vue ocean - Essaouira",
    slug: "restaurant-panoramique-essaouira",
    investmentType: "RESTAURANT" as const,
    city: "Essaouira",
    price: 2800000,
    surface: 180,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Projet resort eco-touristique - Dakhla",
    slug: "projet-resort-eco-dakhla",
    investmentType: "PROJET" as const,
    city: "Dakhla",
    price: 120000000,
    surface: 25000,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Maison d'hotes avec terrasse - Chefchaouen",
    slug: "maison-hotes-chefchaouen",
    investmentType: "RIAD" as const,
    city: "Chefchaouen",
    price: 4200000,
    surface: 280,
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=600&h=400&fit=crop",
  },
]

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)} M MAD`
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)} K MAD`
  }
  return `${price.toLocaleString("fr-FR")} MAD`
}

// ── Page ─────────────────────────────────────────────────────────────

export default function InvestissementPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Investissement touristique au Maroc
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Decouvrez les meilleures opportunites d&apos;investissement dans le
          secteur touristique marocain.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
          <InvestmentFilters />
        </Suspense>
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          {DEMO_INVESTMENTS.length} opportunites disponibles
        </span>
      </div>

      {/* Investment grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_INVESTMENTS.map((investment) => {
          const typeLabel =
            INVESTMENT_TYPES[
              investment.investmentType as keyof typeof INVESTMENT_TYPES
            ] ?? investment.investmentType

          return (
            <Link
              key={investment.id}
              href={`/investissement/${investment.slug}`}
              className="group block"
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-md">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={investment.image}
                    alt={investment.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3">{typeLabel}</Badge>
                </div>

                <CardContent className="space-y-2">
                  {/* Title */}
                  <h3 className="font-heading text-base font-semibold leading-snug text-foreground line-clamp-2">
                    {investment.title}
                  </h3>

                  {/* City */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    <span>{investment.city}</span>
                  </div>

                  {/* Price + Surface */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-base font-bold text-ocean">
                      {formatPrice(investment.price)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <Ruler className="size-3.5" />
                      {investment.surface.toLocaleString("fr-FR")} m&sup2;
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Vous avez un bien a proposer ?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Publiez votre opportunite d&apos;investissement et touchez des
          investisseurs qualifies du secteur touristique.
        </p>
        <Link
          href="/inscription/employeur"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ocean px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ocean/90"
        >
          Publier une opportunite
        </Link>
      </div>
    </div>
  )
}
