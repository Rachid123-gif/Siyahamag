import type { MetadataRoute } from "next"
import { DEMO_JOBS } from "@/lib/demoData"
import { ALL_ARTICLES } from "@/lib/articlesData"
import dailyLog from "../../content/queue/daily-log.json"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://siyahamag.ma"
  const now = new Date()

  // ── Static pages ────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${baseUrl}/actualites`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emplois`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/statistiques`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investissement`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/thematiques`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/connexion`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/inscription`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  // ── Actualites sub-categories ───────────────────────────────────────
  const actualitesSubCategories = [
    "culture",
    "evenements",
    "gastronomie",
    "gouvernement",
    "invest",
    "marches",
    "projets",
  ]

  const subCategoryPages: MetadataRoute.Sitemap = actualitesSubCategories.map(
    (slug) => ({
      url: `${baseUrl}/actualites/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })
  )

  // ── Thematiques sub-pages ───────────────────────────────────────────
  const thematiques = [
    "tech",
    "reglementation",
    "tableaux-de-bord",
    "academiques",
  ]

  const thematiquePages: MetadataRoute.Sitemap = thematiques.map((slug) => ({
    url: `${baseUrl}/thematiques/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // ── Article detail pages ───────────────────────────────────────────
  // Derived from the single source of truth in src/lib/articlesData.ts,
  // so every link on every category/thematique page resolves to a real URL.
  const articlePages: MetadataRoute.Sitemap = ALL_ARTICLES.map((article) => ({
    url: `${baseUrl}/actualites/article/${article.slug}`,
    lastModified: new Date(article.datePublished),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // ── City job pages ─────────────────────────────────────────────────
  const cityJobPages: MetadataRoute.Sitemap = [
    "marrakech",
    "agadir",
    "casablanca",
    "fes",
    "tanger",
    "essaouira",
  ].map((city) => ({
    url: `${baseUrl}/emplois/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // ── Guide pages ───────────────────────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guide/emploi-tourisme-maroc`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/investir-riad-maroc`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/coupe-du-monde-2030-tourisme`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-hotel-dakhla`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/analyse-marche-tourisme-agadir-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/investissement-hotelier-marrakech-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-guide-touristique-maroc`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-restauration-fes-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/taux-occupation-hotels-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-chef-cuisinier-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/tourisme-durable-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-receptionniste-hotel-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/investissement-eco-lodge-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-animateur-tourisme-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/investissement-hotelier-tanger-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/emploi-spa-bienetre-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/investissement-camping-glamping-maroc-2026`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  // ── Job detail pages ───────────────────────────────────────────────
  const jobPages: MetadataRoute.Sitemap = DEMO_JOBS.map((job) => ({
    url: `${baseUrl}/emplois/${job.slug}`,
    lastModified: new Date(job.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // ── Investment detail pages ────────────────────────────────────────
  const demoInvestmentSlugs = [
    "riad-charme-medina-marrakech",
    "terrain-zone-touristique-agadir",
    "hotel-4-etoiles-tanger",
    "restaurant-panoramique-essaouira",
    "projet-resort-eco-dakhla",
    "maison-hotes-chefchaouen",
  ]

  const investmentPages: MetadataRoute.Sitemap = demoInvestmentSlugs.map(
    (slug) => ({
      url: `${baseUrl}/investissement/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })
  )

  // ── Daily-SEO RSS-generated news pages ─────────────────────────────
  // Pulled from content/queue/daily-log.json so every article published
  // by scripts/daily-seo.mjs ends up in the sitemap on the same build.
  const seenNewsSlugs = new Set<string>()
  const newsPages: MetadataRoute.Sitemap = []
  type Run = { date?: string; published?: Array<{ slug?: string }> }
  for (const run of (dailyLog as { runs?: Run[] }).runs || []) {
    for (const a of run.published || []) {
      if (!a.slug || seenNewsSlugs.has(a.slug)) continue
      seenNewsSlugs.add(a.slug)
      const m = a.slug.match(/^(\d{4}-\d{2}-\d{2})-/)
      const lastModified = m ? new Date(m[1]) : (run.date ? new Date(run.date) : now)
      newsPages.push({
        url: `${baseUrl}/news/${a.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    }
  }

  return [
    ...staticPages,
    ...subCategoryPages,
    ...thematiquePages,
    ...articlePages,
    ...cityJobPages,
    ...guidePages,
    ...jobPages,
    ...investmentPages,
    ...newsPages,
  ]
}
