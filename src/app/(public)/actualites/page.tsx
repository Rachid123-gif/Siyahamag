import type { Metadata } from "next"
import { ActualitesContent } from "@/components/articles/ActualitesContent"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Actualités Tourisme Maroc — Dernières Nouvelles du Secteur",
  description:
    "Suivez les dernières nouvelles du secteur touristique au Maroc : hébergement, transport, gastronomie, événements, investissement et projets.",
  alternates: {
    canonical: "/actualites",
  },
  openGraph: {
    title: "Actualités Tourisme Maroc — Dernières Nouvelles du Secteur | SiyahaMag",
    description:
      "Suivez les dernières nouvelles du secteur touristique au Maroc.",
    type: "website",
  },
}

export default function ActualitesPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs segments={[{ label: "Actualités" }]} />
      </div>
      <ActualitesContent />
    </>
  )
}
