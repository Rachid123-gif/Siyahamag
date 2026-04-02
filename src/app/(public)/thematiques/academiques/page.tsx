import type { Metadata } from "next"
import { GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "Recherches académiques — Tourisme au Maroc",
  description: "Recherches, études universitaires et publications académiques sur le tourisme au Maroc.",
}

export default function AcademiquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex p-3 rounded-lg bg-purple-50 text-purple-700">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Académiques</h1>
          <p className="text-muted-foreground">Recherches et études universitaires sur le tourisme</p>
        </div>
      </div>
      <div className="mt-8 text-center py-16 text-muted-foreground border border-dashed rounded-lg">
        Les publications académiques seront disponibles prochainement.
      </div>
    </div>
  )
}
