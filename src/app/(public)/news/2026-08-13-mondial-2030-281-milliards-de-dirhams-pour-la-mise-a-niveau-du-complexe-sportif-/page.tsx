import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Mondial 2030 : 2,81 milliards de dirhams pour la mise à niveau du Complexe sportif de Fès | SiyahaMag",
  description: "Un marché estimé à 2,816 milliards de dirhams vient d’être lancé pour la mise à niveau du Complexe sportif de Fès, dans le cadre des préparatifs du Maroc e",
  // Thin aggregated summary — noindex so it doesn't dilute domain quality.
  robots: { index: false, follow: true },
  alternates: { canonical: "/news/2026-08-13-mondial-2030-281-milliards-de-dirhams-pour-la-mise-a-niveau-du-complexe-sportif-" },
}

const ARTICLE = {
  "title": "Mondial 2030 : 2,81 milliards de dirhams pour la mise à niveau du Complexe sportif de Fès",
  "summary": "Un marché estimé à 2,816 milliards de dirhams vient d’être lancé pour la mise à niveau du Complexe sportif de Fès, dans le cadre des préparatifs du Maroc en perspective de la Coupe du Monde 2030, à travers un appel d’offres ouvert international lancé par l’Agence nationale des équipements publics (ANEP). Selon le cahier des...",
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/08/13/mondial-2030-281-milliards-de-dirhams-pour-la-mise-a-niveau-du-complexe-sportif-de-fes_2003264/",
  "dateFr": "13 août 2026"
}

export default function NewsArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs segments={[{ label: "Actualités", href: "/actualites" }, { label: ARTICLE.title }]} />
      <article className="mt-6 space-y-6">
        <header className="space-y-4">
          <Badge className="bg-ocean-50 text-ocean border-0">Actualité</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{ARTICLE.title}</h1>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {ARTICLE.dateFr}
          </div>
        </header>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{ARTICLE.summary}</p>
        </div>
        {ARTICLE.sourceUrl && (
          <div className="border-t border-border pt-6 text-sm text-muted-foreground">
            Source :{" "}
            <a href={ARTICLE.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              {ARTICLE.source}
            </a>
          </div>
        )}
        <div className="border-t border-border pt-6 mt-4">
          <Link href="/actualites" className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </article>
    </div>
  )
}
