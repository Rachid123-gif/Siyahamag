import type { Metadata } from "next"
import { Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Réglementation touristique au Maroc",
  description: "Lois, réglementations, normes et cadre juridique du secteur touristique au Maroc.",
}

export default function ReglementationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex p-3 rounded-lg bg-amber-50 text-amber-700">
          <Scale className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Réglementation</h1>
          <p className="text-muted-foreground">Cadre juridique et normes du secteur touristique</p>
        </div>
      </div>
      <div className="mt-8 text-center py-16 text-muted-foreground border border-dashed rounded-lg">
        Les articles Réglementation seront disponibles prochainement.
      </div>
    </div>
  )
}
