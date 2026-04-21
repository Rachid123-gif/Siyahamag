import type { MetadataRoute } from "next"
import { DEMO_JOBS } from "@/lib/demoData"

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

  // ── Demo article slugs ─────────────────────────────────────────────
  const demoArticleSlugs = [
    "riads-marrakech-tradition-modernite",
    "nouveau-terminal-aeroport-marrakech",
    "gastronomie-marocaine-patrimoine-immateriel",
    "coupe-du-monde-2030-maroc-infrastructures",
    "tourisme-durable-eco-lodges-haut-atlas",
    "record-touristes-essaouira-festival-gnaoua",
  ]

  const articlePages: MetadataRoute.Sitemap = demoArticleSlugs.map((slug) => ({
    url: `${baseUrl}/actualites/${slug}`,
    lastModified: now,
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

  return [
    ...staticPages,
    ...subCategoryPages,
    ...thematiquePages,
    ...articlePages,
    ...cityJobPages,
    ...guidePages,
    ...jobPages,
    ...investmentPages,
  ]
}
