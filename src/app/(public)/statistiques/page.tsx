import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Statistiques du tourisme marocain",
  description:
    "Consultez les chiffres officiels du tourisme au Maroc : nombre de touristes, recettes, nuitées, taux d'occupation par région.",
}

export default function StatistiquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-ocean">Statistiques</h1>
      <p className="mt-2 text-muted-foreground">
        Les chiffres officiels du tourisme marocain.
      </p>
      <div className="mt-8 text-center py-16 text-muted-foreground">
        Les statistiques seront affichées ici prochainement.
      </div>
    </div>
  )
}
