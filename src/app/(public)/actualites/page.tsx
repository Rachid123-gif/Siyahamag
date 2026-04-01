import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Actualités du tourisme marocain",
  description:
    "Suivez les dernières nouvelles du secteur touristique au Maroc : hébergement, transport, gastronomie, événements.",
}

export default function ActualitesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-ocean">Actualités</h1>
      <p className="mt-2 text-muted-foreground">
        Les dernières nouvelles du secteur touristique marocain.
      </p>
      <div className="mt-8 text-center py-16 text-muted-foreground">
        Les articles seront affichés ici prochainement.
      </div>
    </div>
  )
}
