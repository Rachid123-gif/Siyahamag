import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Offres d'emploi tourisme Maroc — SiyahaJobs",
  description:
    "Trouvez votre emploi dans le secteur touristique marocain : hôtellerie, restauration, animation, guide, management.",
}

export default function EmploisPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-ocean">SiyahaJobs</h1>
      <p className="mt-2 text-muted-foreground">
        Trouvez votre emploi dans le tourisme marocain.
      </p>
      <div className="mt-8 text-center py-16 text-muted-foreground">
        Les offres d&apos;emploi seront affichées ici prochainement.
      </div>
    </div>
  )
}
