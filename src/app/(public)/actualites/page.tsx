import type { Metadata } from "next"
import { ActualitesContent } from "@/components/articles/ActualitesContent"

export const metadata: Metadata = {
  title: "Actualités du tourisme marocain | SiyahaMag",
  description:
    "Suivez les dernières nouvelles du secteur touristique au Maroc : hébergement, transport, gastronomie, événements.",
  openGraph: {
    title: "Actualités du tourisme marocain | SiyahaMag",
    description:
      "Suivez les dernières nouvelles du secteur touristique au Maroc.",
    type: "website",
  },
}

export default function ActualitesPage() {
  return <ActualitesContent />
}
