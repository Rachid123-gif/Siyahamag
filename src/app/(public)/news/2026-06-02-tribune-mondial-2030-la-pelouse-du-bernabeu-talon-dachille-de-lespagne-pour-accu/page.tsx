import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `[Tribune] Mondial 2030 : la pelouse du Bernabéu, talon d'Achille de l'Espagne pour accueillir la finale ? | SiyahaMag`,
  description: `Cinq joueurs du Real Madrid victimes d’une rupture du ligament croisé, tous à Madrid, depuis l’installation de la pelouse rétractable du Santiago Bernabéu.`,
  alternates: { canonical: "/news/2026-06-02-tribune-mondial-2030-la-pelouse-du-bernabeu-talon-dachille-de-lespagne-pour-accu" },
  openGraph: {
    title: `[Tribune] Mondial 2030 : la pelouse du Bernabéu, talon d'Achille de l'Espagne pour accueillir la finale ?`,
    description: `Cinq joueurs du Real Madrid victimes d’une rupture du ligament croisé, tous à Madrid, depuis l’installation de la pelouse rétractable du Santiago Bernabéu.`,
    type: "article",
    publishedTime: "2026-06-02T16:57:46.000Z",
  },
}

const ARTICLE = {
  title: `[Tribune] Mondial 2030 : la pelouse du Bernabéu, talon d'Achille de l'Espagne pour accueillir la finale ?`,
  summary: `Cinq joueurs du Real Madrid victimes d’une rupture du ligament croisé, tous à Madrid, depuis l’installation de la pelouse rétractable du Santiago Bernabéu. Alors que la FIFA n’a pas encore tranché sur le lieu de la finale 2030, ces données sont de plus en plus difficiles à ignorer et devraient faire pencher la balance en...`,
  source: `TelQuel`,
  sourceUrl: `https://telquel.ma/2026/06/02/mondial-2030-la-pelouse-du-bernabeu-talon-dachille-de-lespagne-pour-accueillir-la-finale_1992055`,
  publishedAt: "2026-06-02T16:57:46.000Z",
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
    "@id": "https://siyahamag.ma/news/2026-06-02-tribune-mondial-2030-la-pelouse-du-bernabeu-talon-dachille-de-lespagne-pour-accu",
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
