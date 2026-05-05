import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `Lancement en octobre de deux liaisons aériennes directes Bordeaux-Agadir et Nantes-Essaouira | SiyahaMag`,
  description: `Deux nouvelles liaisons aériennes directes reliant Bordeaux à Agadir et Nantes à Essaouira seront lancées en octobre prochain par la compagnie EasyJet, eng`,
  alternates: { canonical: "/news/2026-05-04-lancement-en-octobre-de-deux-liaisons-aeriennes-directes-bordeaux-agadir-et-nant" },
  openGraph: {
    title: `Lancement en octobre de deux liaisons aériennes directes Bordeaux-Agadir et Nantes-Essaouira`,
    description: `Deux nouvelles liaisons aériennes directes reliant Bordeaux à Agadir et Nantes à Essaouira seront lancées en octobre prochain par la compagnie EasyJet, eng`,
    type: "article",
    publishedTime: "2026-05-04T14:37:02.000Z",
  },
}

const ARTICLE = {
  title: `Lancement en octobre de deux liaisons aériennes directes Bordeaux-Agadir et Nantes-Essaouira`,
  summary: `Deux nouvelles liaisons aériennes directes reliant Bordeaux à Agadir et Nantes à Essaouira seront lancées en octobre prochain par la compagnie EasyJet, engagée dans un plan d’extension de ses dessertes vers le Royaume. EasyJet, 2e compagnie aérienne en France et 3e au Maroc, étend son réseau avec six nouvelles liaisons dont deux directes reliant Nantes...`,
  source: `TelQuel`,
  sourceUrl: `https://telquel.ma/instant-t/2026/05/04/lancement-en-octobre-de-deux-liaisons-aeriennes-directes-bordeaux-agadir-et-nantes-essaouira_1987714/`,
  publishedAt: "2026-05-04T14:37:02.000Z",
  dateFr: "4 mai 2026",
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
    "@id": "https://siyahamag.ma/news/2026-05-04-lancement-en-octobre-de-deux-liaisons-aeriennes-directes-bordeaux-agadir-et-nant",
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
