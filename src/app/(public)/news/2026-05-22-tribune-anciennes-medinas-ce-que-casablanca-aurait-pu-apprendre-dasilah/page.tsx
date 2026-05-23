import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `[Tribune] Anciennes médinas : ce que Casablanca aurait pu apprendre d'Asilah | SiyahaMag`,
  description: `L’ancienne médina d’Asilah est entretenue, célébrée, habitée. Celle de Casablanca est en voie de démolition. Deux cités atlantiques, deux politiques urbain`,
  alternates: { canonical: "/news/2026-05-22-tribune-anciennes-medinas-ce-que-casablanca-aurait-pu-apprendre-dasilah" },
  openGraph: {
    title: `[Tribune] Anciennes médinas : ce que Casablanca aurait pu apprendre d'Asilah`,
    description: `L’ancienne médina d’Asilah est entretenue, célébrée, habitée. Celle de Casablanca est en voie de démolition. Deux cités atlantiques, deux politiques urbain`,
    type: "article",
    publishedTime: "2026-05-22T16:30:47.000Z",
  },
}

const ARTICLE = {
  title: `[Tribune] Anciennes médinas : ce que Casablanca aurait pu apprendre d'Asilah`,
  summary: `L’ancienne médina d’Asilah est entretenue, célébrée, habitée. Celle de Casablanca est en voie de démolition. Deux cités atlantiques, deux politiques urbaines sans point commun. À quelques centaines de kilomètres l’une de l’autre, deux anciennes médinas racontent deux histoires du même pays. L’une s’effondre sous le poids des bulldozers et de la promesse d’une avenue pharaonique,...`,
  source: `TelQuel`,
  sourceUrl: `https://telquel.ma/2026/05/22/tribune-anciennes-medinas-ce-que-casablanca-aurait-pu-apprendre-dasilah_1990938`,
  publishedAt: "2026-05-22T16:30:47.000Z",
  dateFr: "22 mai 2026",
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
    "@id": "https://siyahamag.ma/news/2026-05-22-tribune-anciennes-medinas-ce-que-casablanca-aurait-pu-apprendre-dasilah",
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
