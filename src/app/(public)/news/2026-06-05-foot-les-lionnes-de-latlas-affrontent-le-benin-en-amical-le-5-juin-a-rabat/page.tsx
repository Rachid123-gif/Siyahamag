import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: `Foot : les Lionnes de l’Atlas affrontent le Bénin en amical le 5 juin à Rabat | SiyahaMag`,
  description: `L’équipe nationale féminine « A » affrontera, vendredi au Stade Moulay El Hassan à Rabat, son homologue béninoise en match amical. Ce match amical, prévu à`,
  alternates: { canonical: "/news/2026-06-05-foot-les-lionnes-de-latlas-affrontent-le-benin-en-amical-le-5-juin-a-rabat" },
  openGraph: {
    title: `Foot : les Lionnes de l’Atlas affrontent le Bénin en amical le 5 juin à Rabat`,
    description: `L’équipe nationale féminine « A » affrontera, vendredi au Stade Moulay El Hassan à Rabat, son homologue béninoise en match amical. Ce match amical, prévu à`,
    type: "article",
    publishedTime: "2026-06-05T09:06:32.000Z",
  },
}

const ARTICLE = {
  title: `Foot : les Lionnes de l’Atlas affrontent le Bénin en amical le 5 juin à Rabat`,
  summary: `L’équipe nationale féminine « A » affrontera, vendredi au Stade Moulay El Hassan à Rabat, son homologue béninoise en match amical. Ce match amical, prévu à partir de 19h00, intervient en marge du stage de préparation des Lionnes de l’Atlas pour la prochaine CAN féminine. Les protégées de Jorge Vilda Rodriguez évolueront dans le groupe A de...`,
  source: `TelQuel`,
  sourceUrl: `https://telquel.ma/instant-t/2026/06/05/foot-les-lionnes-de-latlas-affrontent-le-benin-en-amical-le-5-juin-a-rabat_1992541/`,
  publishedAt: "2026-06-05T09:06:32.000Z",
  dateFr: "5 juin 2026",
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
    "@id": "https://siyahamag.ma/news/2026-06-05-foot-les-lionnes-de-latlas-affrontent-le-benin-en-amical-le-5-juin-a-rabat",
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
