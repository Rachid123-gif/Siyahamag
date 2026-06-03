import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `La Biennale internationale de Casablanca se délocalise à Essaouira pour sa 6e édition | SiyahaMag`,
  description: `La 6e édition de la Biennale internationale de Casablanca se tiendra exceptionnellement à Essaouira, du 10 décembre 2026 au 10 janvier 2027. Le comité de l`,
  alternates: { canonical: "/news/2026-06-02-la-biennale-internationale-de-casablanca-se-delocalise-a-essaouira-pour-sa-6e-ed" },
  openGraph: {
    title: `La Biennale internationale de Casablanca se délocalise à Essaouira pour sa 6e édition`,
    description: `La 6e édition de la Biennale internationale de Casablanca se tiendra exceptionnellement à Essaouira, du 10 décembre 2026 au 10 janvier 2027. Le comité de l`,
    type: "article",
    publishedTime: "2026-06-02T14:40:28.000Z",
  },
}

const ARTICLE = {
  title: `La Biennale internationale de Casablanca se délocalise à Essaouira pour sa 6e édition`,
  summary: `La 6e édition de la Biennale internationale de Casablanca se tiendra exceptionnellement à Essaouira, du 10 décembre 2026 au 10 janvier 2027. Le comité de la manifestation a annoncé ce report et ce déplacement géographique en raison des tensions et incertitudes internationales, et du focus accordé cette année aux artistes du Moyen-Orient. Placée sous le...`,
  source: `TelQuel`,
  sourceUrl: `https://telquel.ma/instant-t/2026/06/02/la-biennale-internationale-de-casablanca-se-delocalise-a-essaouira-pour-sa-6e-edition_1992024/`,
  publishedAt: "2026-06-02T14:40:28.000Z",
  dateFr: "2 juin 2026",
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
    "@id": "https://siyahamag.ma/news/2026-06-02-la-biennale-internationale-de-casablanca-se-delocalise-a-essaouira-pour-sa-6e-ed",
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
