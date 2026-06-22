#!/usr/bin/env node
/**
 * AI content generation for SiyahaMag.ma
 *
 * Turns a raw RSS item (a Moroccan tourism headline + snippet) into an ORIGINAL,
 * long-form French article via the Claude API — instead of re-publishing a thin
 * scraped summary. This is the core of the "rank on Google" strategy: Google
 * indexes and ranks original, useful content, not copied snippets.
 *
 * Exports:
 *   - isAiEnabled(): whether ANTHROPIC_API_KEY is set
 *   - generateArticle(item): Promise<ArticleBody | null>
 *   - buildArticlePage({ ...body, slug, source, sourceUrl, publishedAt }): string (page.tsx source)
 *
 * Designed to fail gracefully: any API error, refusal, or missing key returns
 * null so the caller can fall back to a thin (noindex) summary page.
 */

import Anthropic from "@anthropic-ai/sdk"

// claude-api skill default: use Opus 4.8 unless explicitly overridden.
const MODEL = process.env.AI_MODEL || "claude-opus-4-8"

export function isAiEnabled() {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

// ── JSON schema for the structured article output ────────────────────
// Structured-output constraints: no minLength/maxLength, additionalProperties:false.
const ARTICLE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string", description: "Titre SEO original, 50-65 caractères, en français" },
    metaDescription: { type: "string", description: "Meta description, 120-155 caractères" },
    intro: { type: "string", description: "Paragraphe d'introduction (2-4 phrases)" },
    sections: {
      type: "array",
      description: "3 à 5 sections de corps d'article",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          heading: { type: "string", description: "Sous-titre H2 en français" },
          paragraphs: {
            type: "array",
            description: "1 à 3 paragraphes de texte",
            items: { type: "string" },
          },
        },
        required: ["heading", "paragraphs"],
      },
    },
    faq: {
      type: "array",
      description: "2 à 4 questions/réponses fréquentes",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
      },
    },
    tags: {
      type: "array",
      description: "3 à 6 mots-clés SEO",
      items: { type: "string" },
    },
  },
  required: ["title", "metaDescription", "intro", "sections", "faq", "tags"],
}

const SYSTEM_PROMPT = `Tu es journaliste spécialisé dans le tourisme marocain pour SiyahaMag.ma, la première plateforme marocaine du tourisme (actualités, emploi hôtellerie-restauration, statistiques, investissement).

Tu écris des articles ORIGINAUX en français, jamais une copie de la source. À partir d'un titre et d'un extrait d'actualité, tu produis un article approfondi, factuel et utile :
- Reformule entièrement avec tes propres mots ; n'invente pas de chiffres ou citations qui ne sont pas dans la source.
- Ajoute du contexte sur le secteur touristique marocain (ONMT, villes, Coupe du monde 2030, emploi, investissement) quand c'est pertinent.
- Ton professionnel, clair, optimisé pour le lecteur ET pour Google (mots-clés naturels, pas de bourrage).
- 900 à 1400 mots au total répartis sur les sections.
- La FAQ doit répondre à de vraies questions que se posent les internautes marocains.
- Reste strictement sur le tourisme/hôtellerie/voyage/investissement touristique ; si le sujet n'est pas touristique, renvoie quand même un article centré sur l'angle touristique le plus proche.`

/**
 * Generate an original article body from an RSS item.
 * @returns {Promise<object|null>} validated article body, or null on any failure.
 */
export async function generateArticle(item) {
  if (!isAiEnabled()) return null

  const client = new Anthropic()
  const sourceText = (item.contentSnippet || item.content || item.summary || "")
    .replace(/<[^>]+>/g, "")
    .trim()
    .slice(0, 2000)

  const userPrompt = `Titre de l'actualité : ${item.title}

Extrait de la source (${item.source || "source externe"}) :
${sourceText || "(pas d'extrait disponible — appuie-toi sur le titre)"}

Rédige l'article original complet en respectant le schéma demandé.`

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 12000,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
      output_config: { format: { type: "json_schema", schema: ARTICLE_SCHEMA } },
    })

    // Safety classifiers / model refusals: skip and let caller fall back.
    if (response.stop_reason === "refusal") {
      console.log("  ⚠️  AI refused to generate; falling back.")
      return null
    }

    const textBlock = response.content.find((b) => b.type === "text")
    if (!textBlock) return null

    const body = JSON.parse(textBlock.text)
    // Minimal validation.
    if (!body.title || !Array.isArray(body.sections) || body.sections.length === 0) {
      return null
    }
    return body
  } catch (err) {
    console.log(`  ⚠️  AI generation failed: ${err.message}`)
    return null
  }
}

// ── Page template builders ───────────────────────────────────────────
// All embedded strings go through JSON.stringify, which yields valid JS
// string literals — no manual backtick/$ escaping needed.

/**
 * Build a rich, indexable Next.js page from an AI-generated article body.
 * Includes internal links (emplois, investissement, guides) and FAQ JSON-LD.
 */
export function buildArticlePage({ body, slug, source, sourceUrl, publishedAt }) {
  const dateIso = publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
  const dateFr = new Date(dateIso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // No manual escaping: every embedded string goes through JSON.stringify,
  // which produces a valid double-quoted JS string literal (handles backticks,
  // ${...}, quotes, newlines correctly). `slug` is alphanumeric+hyphens.
  const article = {
    title: String(body.title || ""),
    metaDescription: String(body.metaDescription || "").slice(0, 155),
    intro: String(body.intro || ""),
    sections: body.sections.map((s) => ({
      heading: String(s.heading || ""),
      paragraphs: (s.paragraphs || []).map((p) => String(p || "")),
    })),
    faq: (body.faq || []).map((f) => ({
      question: String(f.question || ""),
      answer: String(f.answer || ""),
    })),
    tags: (body.tags || []).map((t) => String(t || "")),
    source: String(source || "Source externe"),
    sourceUrl: String(sourceUrl || ""),
    dateIso,
    dateFr,
  }

  return `import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: ${JSON.stringify(article.title + " | SiyahaMag")},
  description: ${JSON.stringify(article.metaDescription)},
  keywords: ${JSON.stringify(article.tags)},
  alternates: { canonical: "/news/${slug}" },
  openGraph: {
    title: ${JSON.stringify(article.title)},
    description: ${JSON.stringify(article.metaDescription)},
    type: "article",
    publishedTime: "${article.dateIso}",
  },
}

const ARTICLE = ${JSON.stringify(article, null, 2)}

const newsLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: ARTICLE.title,
  description: ARTICLE.metaDescription,
  datePublished: ARTICLE.dateIso,
  dateModified: ARTICLE.dateIso,
  keywords: ARTICLE.tags.join(", "),
  author: { "@type": "Organization", name: "SiyahaMag" },
  publisher: { "@type": "Organization", name: "SiyahaMag", url: "https://siyahamag.ma" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/${slug}" },
}

const faqLd = ARTICLE.faq.length
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ARTICLE.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }
  : null

export default function NewsArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={newsLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <Breadcrumbs segments={[{ label: "Actualités", href: "/actualites" }, { label: ARTICLE.title }]} />

      <article className="mt-6 space-y-6">
        <header className="space-y-4">
          <Badge className="bg-ocean-50 text-ocean border-0">Actualité tourisme</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {ARTICLE.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {ARTICLE.dateFr}
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">{ARTICLE.intro}</p>
          {ARTICLE.sections.map((section, i) => (
            <section key={i} className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-foreground/90 leading-relaxed mb-4">{p}</p>
              ))}
            </section>
          ))}
        </div>

        {ARTICLE.faq.length > 0 && (
          <section className="border-t border-border pt-6 mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions fréquentes</h2>
            <div className="space-y-4">
              {ARTICLE.faq.map((f, i) => (
                <details key={i} className="rounded-lg border border-border p-4">
                  <summary className="font-semibold cursor-pointer text-foreground">{f.question}</summary>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-border pt-6 mt-8">
          <h2 className="text-xl font-bold text-foreground mb-3">À découvrir aussi sur SiyahaMag</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><Link href="/emplois" className="text-ocean hover:underline">Offres d&apos;emploi tourisme &amp; hôtellerie au Maroc</Link></li>
            <li><Link href="/investissement" className="text-ocean hover:underline">Opportunités d&apos;investissement touristique</Link></li>
            <li><Link href="/statistiques" className="text-ocean hover:underline">Statistiques du tourisme marocain</Link></li>
            <li><Link href="/guide/emploi-tourisme-maroc" className="text-ocean hover:underline">Guide : emploi dans le tourisme au Maroc</Link></li>
          </ul>
        </section>

        {ARTICLE.sourceUrl && (
          <div className="border-t border-border pt-6 text-sm text-muted-foreground">
            D&apos;après une actualité de{" "}
            <a href={ARTICLE.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              {ARTICLE.source}
            </a>
            .
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
`
}

/**
 * Build a THIN fallback page (no AI): summary + nofollow source link, marked
 * noindex so it never dilutes the domain's quality signals.
 */
export function buildThinPage({ title, summary, source, sourceUrl, publishedAt, slug }) {
  const dateIso = publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString()
  const dateFr = new Date(dateIso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const article = {
    title: String(title || ""),
    summary: String(summary || ""),
    source: String(source || "Source externe"),
    sourceUrl: String(sourceUrl || ""),
    dateFr,
  }

  return `import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: ${JSON.stringify(article.title + " | SiyahaMag")},
  description: ${JSON.stringify(article.summary.slice(0, 155))},
  // Thin aggregated summary — noindex so it doesn't dilute domain quality.
  robots: { index: false, follow: true },
  alternates: { canonical: "/news/${slug}" },
}

const ARTICLE = ${JSON.stringify(article, null, 2)}

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
`
}
