import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Investissement touristique au Maroc",
  description:
    "Découvrez les opportunités d'investissement dans le secteur touristique marocain : hôtels, riads, restaurants, terrains.",
}

export default function InvestissementPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-ocean">Investissement</h1>
      <p className="mt-2 text-muted-foreground">
        Opportunités d&apos;investissement dans le tourisme marocain.
      </p>
      <div className="mt-8 text-center py-16 text-muted-foreground">
        Les opportunités seront affichées ici prochainement.
      </div>
    </div>
  )
}
