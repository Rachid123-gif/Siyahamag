import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
  MAJOR_CITIES,
} from "@/lib/constants"
import { JobSearchFilters } from "@/components/jobs/JobSearchFilters"
import { JobSearchBar } from "@/components/jobs/JobSearchBar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Building2, Clock, BadgeCheck, Banknote } from "lucide-react"

// ── SEO ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Offres d'emploi tourisme Maroc | SiyahaMag",
  description:
    "Trouvez votre emploi dans le secteur touristique marocain : hotellerie, restauration, animation, guide, management.",
  openGraph: {
    title: "Offres d'emploi tourisme Maroc | SiyahaMag",
    description:
      "Trouvez votre emploi dans le secteur touristique marocain.",
    type: "website",
  },
}

// ── Static demo data ─────────────────────────────────────────────────

const DEMO_JOBS = [
  {
    id: "1",
    title: "Receptionniste bilingue",
    slug: "receptionniste-bilingue-marrakech",
    jobCategory: "RECEPTION" as const,
    contractType: "CDI" as const,
    city: "Marrakech",
    salary: "6 000 - 8 000 MAD",
    createdAt: "2026-03-30",
    company: {
      name: "Royal Mansour Marrakech",
      verified: true,
    },
  },
  {
    id: "2",
    title: "Chef de cuisine - Restaurant gastronomique",
    slug: "chef-cuisine-agadir",
    jobCategory: "CUISINE" as const,
    contractType: "CDI" as const,
    city: "Agadir",
    salary: "12 000 - 18 000 MAD",
    createdAt: "2026-03-28",
    company: {
      name: "Sofitel Agadir Royal Bay",
      verified: true,
    },
  },
  {
    id: "3",
    title: "Guide touristique certifie",
    slug: "guide-touristique-fes",
    jobCategory: "GUIDE" as const,
    contractType: "FREELANCE" as const,
    city: "Fes",
    salary: "8 000 - 12 000 MAD",
    createdAt: "2026-03-26",
    company: {
      name: "Fes Medina Tours",
      verified: false,
    },
  },
  {
    id: "4",
    title: "Directeur d'hotel 4 etoiles",
    slug: "directeur-hotel-casablanca",
    jobCategory: "MANAGEMENT" as const,
    contractType: "CDI" as const,
    city: "Casablanca",
    salary: "25 000 - 35 000 MAD",
    createdAt: "2026-03-24",
    company: {
      name: "Hyatt Regency Casablanca",
      verified: true,
    },
  },
  {
    id: "5",
    title: "Animateur touristique polyvalent",
    slug: "animateur-touristique-essaouira",
    jobCategory: "ANIMATION" as const,
    contractType: "SAISONNIER" as const,
    city: "Essaouira",
    salary: "5 000 - 7 000 MAD",
    createdAt: "2026-03-22",
    company: {
      name: "Mogador Hotels & Resorts",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Responsable spa et bien-etre",
    slug: "responsable-spa-tanger",
    jobCategory: "BIEN_ETRE" as const,
    contractType: "CDI" as const,
    city: "Tanger",
    salary: "10 000 - 14 000 MAD",
    createdAt: "2026-03-20",
    company: {
      name: "Hilton Tanger City Center",
      verified: true,
    },
  },
  {
    id: "7",
    title: "Stagiaire en gestion hoteliere",
    slug: "stagiaire-gestion-hoteliere-rabat",
    jobCategory: "MANAGEMENT" as const,
    contractType: "STAGE" as const,
    city: "Rabat",
    salary: "2 500 MAD",
    createdAt: "2026-03-18",
    company: {
      name: "The View Hotel Rabat",
      verified: false,
    },
  },
  {
    id: "8",
    title: "Chef de rang - Restaurant panoramique",
    slug: "chef-rang-restaurant-ouarzazate",
    jobCategory: "SERVICE" as const,
    contractType: "CDD" as const,
    city: "Ouarzazate",
    salary: "5 500 - 7 500 MAD",
    createdAt: "2026-03-15",
    company: {
      name: "Kasbah Tamadot",
      verified: true,
    },
  },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function EmploisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <div className="rounded-2xl bg-gradient-to-r from-ocean to-ocean/80 px-6 py-12 text-center text-white sm:py-16">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Offres d&apos;emploi tourisme au Maroc
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">
          Trouvez votre prochain poste dans le secteur touristique marocain.
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-3xl">
          <Suspense fallback={<div className="h-11 animate-pulse rounded-lg bg-white/20" />}>
            <JobSearchBar
              defaultQuery=""
              defaultCity=""
              cities={[...MAJOR_CITIES]}
            />
          </Suspense>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8">
        <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
          <JobSearchFilters />
        </Suspense>
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          {DEMO_JOBS.length} offres disponibles
        </span>
      </div>

      {/* Job list */}
      <div className="mt-6 space-y-4">
        {DEMO_JOBS.map((job) => {
          const categoryLabel =
            JOB_CATEGORIES[job.jobCategory as keyof typeof JOB_CATEGORIES] ??
            job.jobCategory
          const contractLabel =
            CONTRACT_TYPES[job.contractType as keyof typeof CONTRACT_TYPES] ??
            job.contractType

          return (
            <Link key={job.id} href={`/emplois/${job.slug}`} className="block">
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex gap-4">
                  {/* Company icon */}
                  <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                    <Building2 className="size-6 text-muted-foreground" />
                  </div>

                  {/* Job info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                      {job.title}
                    </h3>

                    {/* Company name */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span>{job.company.name}</span>
                      {job.company.verified && (
                        <BadgeCheck
                          className="size-4 text-blue-500"
                          aria-label="Entreprise verifiee"
                        />
                      )}
                    </div>

                    {/* Location + contract + date */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.city}
                      </span>

                      <Badge variant="secondary" className="text-xs">
                        {contractLabel}
                      </Badge>

                      <Badge variant="outline" className="text-xs">
                        {categoryLabel}
                      </Badge>

                      {job.salary && (
                        <span className="inline-flex items-center gap-1">
                          <Banknote className="size-3.5" />
                          {job.salary}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {new Date(job.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
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
          Vous etes candidat ?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Creez votre profil pour postuler aux offres et recevoir des alertes
          personnalisees.
        </p>
        <Link
          href="/inscription"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ocean px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ocean/90"
        >
          Creer mon compte candidat
        </Link>
      </div>
    </div>
  )
}
