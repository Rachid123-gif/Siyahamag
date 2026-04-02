import type { Metadata } from "next"
import { Cpu } from "lucide-react"

export const metadata: Metadata = {
  title: "Tech & Innovation touristique",
  description: "Innovation technologique, digitalisation et solutions numériques pour le tourisme marocain.",
}

export default function TechPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex p-3 rounded-lg bg-blue-50 text-blue-700">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Tech</h1>
          <p className="text-muted-foreground">Innovation technologique et digitalisation du tourisme</p>
        </div>
      </div>
      <div className="mt-8 text-center py-16 text-muted-foreground border border-dashed rounded-lg">
        Les articles Tech seront disponibles prochainement.
      </div>
    </div>
  )
}
