import type { Metadata } from "next"
import { NewsletterForm } from "@/components/newsletter/NewsletterForm"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Newsletter Tourisme Maroc — Actualités Hebdomadaires",
  description:
    "Inscrivez-vous à la newsletter SiyahaMag pour recevoir les dernières actualités, offres d'emploi et opportunités d'investissement du tourisme marocain.",
  alternates: {
    canonical: "/newsletter",
  },
}

export default function NewsletterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs segments={[{ label: "Newsletter" }]} />

      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-ocean">
          Newsletter SiyahaMag
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Recevez chaque semaine les dernières actualités, offres d&apos;emploi
          et opportunités d&apos;investissement du secteur touristique marocain.
        </p>

        <div className="mt-10">
          <NewsletterForm />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-lg bg-ocean-50">
            <h3 className="font-semibold text-ocean">📰 Actualités</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Les dernières nouvelles du secteur touristique marocain
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50">
            <h3 className="font-semibold text-sahara">💼 Emploi</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Les nouvelles offres d&apos;emploi dans le tourisme
            </p>
          </div>
          <div className="p-4 rounded-lg bg-emerald-50">
            <h3 className="font-semibold text-oasis">📊 Statistiques</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Les chiffres clés mis à jour du tourisme marocain
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
