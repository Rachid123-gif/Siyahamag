import type { Metadata } from "next"
import { ActualitesContent } from "@/components/articles/ActualitesContent"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { ALL_ARTICLES } from "@/lib/articlesData"
import { getDbArticles } from "@/lib/articlesDb"

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

// Build-time only (DB reached at build, not from serverless runtime).
export const dynamic = "force-static"

export default async function ActualitesPage() {
  // Real DB articles first, demo content as fallback/filler.
  const dbArticles = await getDbArticles()
  const articles = [...dbArticles, ...ALL_ARTICLES]
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs segments={[{ label: "Actualités" }]} />
      </div>
      <ActualitesContent articles={articles} />
    </>
  )
}
