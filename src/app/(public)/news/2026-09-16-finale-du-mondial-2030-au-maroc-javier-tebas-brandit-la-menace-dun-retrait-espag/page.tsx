import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Finale du Mondial 2030 au Maroc : Javier Tebas brandit la menace d’un retrait espagnol | SiyahaMag",
  description: "À Madrid, Javier Tebas a de nouveau fait monter la pression autour de la Coupe du monde 2030. Le président de LaLiga a évoqué mardi la possibilité pour l’E",
  // Thin aggregated summary — noindex so it doesn't dilute domain quality.
  robots: { index: false, follow: true },
  alternates: { canonical: "/news/2026-09-16-finale-du-mondial-2030-au-maroc-javier-tebas-brandit-la-menace-dun-retrait-espag" },
}

const ARTICLE = {
  "title": "Finale du Mondial 2030 au Maroc : Javier Tebas brandit la menace d’un retrait espagnol",
  "summary": "À Madrid, Javier Tebas a de nouveau fait monter la pression autour de la Coupe du monde 2030. Le président de LaLiga a évoqué mardi la possibilité pour l’Espagne de revoir sa participation à l’organisation du tournoi, dans l’hypothèse où la finale serait attribuée au Maroc et où Gianni Infantino conserverait la présidence de la […]\nThe post Finale du Mondial 2030 au Maroc : Javier Tebas brandit la menace d’un retrait espagnol appeared first on Hespress Français - Actualités du Maroc.",
  "source": "Hespress Fr",
  "sourceUrl": "https://fr.hespress.com/488518-finale-du-mondial-2030-au-maroc-javier-tebas-brandit-la-menace-dun-retrait-espagnol.html",
  "dateFr": "16 septembre 2026"
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
