import type { Metadata } from "next"
import { BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Tableaux de bord du tourisme marocain",
  description: "Indicateurs clés, données et analyses pour suivre la performance du tourisme marocain.",
}

export default function TableauxDeBordPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex p-3 rounded-lg bg-emerald-50 text-emerald-700">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Tableaux de bord</h1>
          <p className="text-muted-foreground">Indicateurs clés et analyses du secteur touristique</p>
        </div>
      </div>
      <div className="mt-8 text-center py-16 text-muted-foreground border border-dashed rounded-lg">
        Les tableaux de bord seront disponibles prochainement.
      </div>
    </div>
  )
}
