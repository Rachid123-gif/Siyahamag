import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  // Off-topic legacy page — noindex so it doesn't dilute the tourism domain.
  robots: { index: false, follow: true },
  title: `Sortie de l'acier, tensions géopolitiques, Mondial 2030... La stratégie d'Aluminium du Maroc expliquée par Abdeslam El Alami | SiyahaMag`,
  description: `Le groupe industriel installé à Tanger a validé la sortie de son activité acier lors de son conseil d'administration du 12 mai dernier. Son PDG, Abdeslam E`,
  alternates: { canonical: "/news/2026-06-20-sortie-de-lacier-tensions-geopolitiques-mondial-2030-la-strategie-daluminium-du-" },
  openGraph: {
    title: `Sortie de l'acier, tensions géopolitiques, Mondial 2030... La stratégie d'Aluminium du Maroc expliquée par Abdeslam El Alami`,
    description: `Le groupe industriel installé à Tanger a validé la sortie de son activité acier lors de son conseil d'administration du 12 mai dernier. Son PDG, Abdeslam E`,
    type: "article",
    publishedTime: "2026-06-20T12:48:08.000Z",
  },
}

const ARTICLE = {
  title: `Sortie de l'acier, tensions géopolitiques, Mondial 2030... La stratégie d'Aluminium du Maroc expliquée par Abdeslam El Alami`,
  summary: `Le groupe industriel installé à Tanger a validé la sortie de son activité acier lors de son conseil d'administration du 12 mai dernier. Son PDG, Abdeslam El Alami, invité du 12/13 de Médias24, explique les raisons de cette décision, revient sur l'impact de la guerre au Moyen-Orient sur ses approvisionnements en billettes d'aluminium, et anticipe la demande du secteur à l'horizon 2030.
The post Sortie de l'acier, tensions géopolitiques, Mondial 2030... La stratégie d'Aluminium du Maroc expliquée par Abdeslam El Alami appeared first on Médias24 - Numéro un de l'information économique marocaine.`,
  source: `Medias24`,
  sourceUrl: `https://medias24.com/2026/06/20/sortie-de-lacier-tensions-geopolitiques-mondial-2030-la-strategie-daluminium-du-maroc-expliquee-par-abdeslam-el-alami-1704257/`,
  publishedAt: "2026-06-20T12:48:08.000Z",
  dateFr: "20 juin 2026",
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
    "@id": "https://siyahamag.ma/news/2026-06-20-sortie-de-lacier-tensions-geopolitiques-mondial-2030-la-strategie-daluminium-du-",
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
