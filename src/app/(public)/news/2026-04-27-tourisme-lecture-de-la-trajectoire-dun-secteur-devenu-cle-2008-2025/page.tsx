import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `Tourisme. Lecture de la trajectoire d’un secteur devenu clé (2008-2025) | SiyahaMag`,
  description: `Porté par la reprise post-Covid, le tourisme marocain a retrouvé puis dépassé ses niveaux d’avant-crise. Mais une lecture de long terme montre une trajecto`,
  alternates: { canonical: "/news/2026-04-27-tourisme-lecture-de-la-trajectoire-dun-secteur-devenu-cle-2008-2025" },
  openGraph: {
    title: `Tourisme. Lecture de la trajectoire d’un secteur devenu clé (2008-2025)`,
    description: `Porté par la reprise post-Covid, le tourisme marocain a retrouvé puis dépassé ses niveaux d’avant-crise. Mais une lecture de long terme montre une trajecto`,
    type: "article",
    publishedTime: "2026-04-27T18:11:59.000Z",
  },
}

const ARTICLE = {
  title: `Tourisme. Lecture de la trajectoire d’un secteur devenu clé (2008-2025)`,
  summary: `Porté par la reprise post-Covid, le tourisme marocain a retrouvé puis dépassé ses niveaux d’avant-crise. Mais une lecture de long terme montre une trajectoire plus contrastée, marquée par le choc de 2008 suivi d’une phase d’expansion modérée, puis un changement d’échelle à partir de 2022.
The post Tourisme. Lecture de la trajectoire d’un secteur devenu clé (2008-2025) appeared first on Médias24 - Numéro un de l'information économique marocaine.`,
  source: `Medias24`,
  sourceUrl: `https://medias24.com/2026/04/27/tourisme-au-maroc-ce-que-revele-la-trajectoire-2008-2025-1666461/`,
  publishedAt: "2026-04-27T18:11:59.000Z",
  dateFr: "27 avril 2026",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: ARTICLE.title,
  description: ARTICLE.summary,
  datePublished: ARTICLE.publishedAt,
  dateModified: ARTICLE.publishedAt,
  author: { "@type": "Organization", name: "SiyahaMag" },
  publisher: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://siyahamag.ma/news/2026-04-27-tourisme-lecture-de-la-trajectoire-dun-secteur-devenu-cle-2008-2025",
  },
}

export default function NewsArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={jsonLd} />
      <Breadcrumbs segments={[{ label: "Actualités", href: "/actualites" }, { label: ARTICLE.title }]} />

      <article className="mt-6 space-y-6">
        <header className="space-y-4">
          <Badge className="bg-ocean-50 text-ocean border-0">Actualité</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {ARTICLE.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {ARTICLE.dateFr}
            </span>
            <span className="flex items-center gap-1.5">
              Source : <strong className="text-foreground">{ARTICLE.source}</strong>
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {ARTICLE.summary}
          </p>
        </div>

        {ARTICLE.sourceUrl && (
          <div className="border-t border-border pt-6">
            <a
              href={ARTICLE.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ocean hover:underline font-medium"
            >
              Lire l&apos;article original sur {ARTICLE.source}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        <div className="border-t border-border pt-6 mt-8">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </article>
    </div>
  )
}
