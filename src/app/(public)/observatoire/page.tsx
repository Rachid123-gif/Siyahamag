import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Citable, link-worthy data hub ("link magnet"). Fully static, source-cited,
// with Dataset + Article JSON-LD so journalists/bloggers can find and cite it.
export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Observatoire du Tourisme au Maroc — Chiffres clés 2026",
  description:
    "Observatoire SiyahaMag : chiffres clés du tourisme marocain 2026 — arrivées, recettes, nuitées, emploi et investissement. Données à jour, sources officielles, libres de citation.",
  alternates: { canonical: "/observatoire" },
  keywords: [
    "chiffres tourisme maroc",
    "statistiques tourisme maroc 2026",
    "observatoire tourisme maroc",
    "données tourisme maroc",
    "emploi tourisme maroc chiffres",
  ],
  openGraph: {
    title: "Observatoire du Tourisme au Maroc — Chiffres clés 2026 | SiyahaMag",
    description:
      "Les chiffres clés du tourisme marocain, à jour et libres de citation : arrivées, recettes, nuitées, emploi, investissement.",
    type: "website",
  },
}

const KEY_FIGURES = [
  { label: "Touristes (2025)", value: "20 millions", note: "Objectif 26 M d'ici 2030", source: "ONMT" },
  { label: "Recettes touristiques (2024)", value: "105,3 Mrd MAD", note: "+18 % vs 2023", source: "Office des Changes" },
  { label: "Nuitées (2024)", value: "27,8 millions", note: "Hôtels classés", source: "Observatoire du Tourisme" },
  { label: "Taux d'occupation (2024)", value: "52 %", note: "Moyenne nationale", source: "Observatoire du Tourisme" },
]

const REGIONS = [
  { region: "Marrakech-Safi", value: "4,2 M de touristes" },
  { region: "Souss-Massa (Agadir)", value: "3,1 M de touristes" },
  { region: "Tanger-Tétouan-Al Hoceïma", value: "2,8 M de touristes" },
  { region: "Fès-Meknès", value: "1,9 M de touristes" },
  { region: "Rabat-Salé-Kénitra", value: "1,5 M de touristes" },
  { region: "Dakhla-Oued Ed-Dahab", value: "0,8 M de touristes" },
]

const datasetLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Observatoire du Tourisme au Maroc — Chiffres clés",
  description:
    "Indicateurs clés du tourisme marocain : arrivées de touristes, recettes, nuitées, taux d'occupation et données régionales.",
  creator: { "@type": "Organization", name: "SiyahaMag", url: "https://siyahamag.ma" },
  url: "https://siyahamag.ma/observatoire",
  isAccessibleForFree: true,
  license: "https://siyahamag.ma/observatoire",
  keywords: ["tourisme", "Maroc", "statistiques", "ONMT", "emploi", "investissement"],
  spatialCoverage: { "@type": "Place", name: "Maroc" },
}

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Observatoire du Tourisme au Maroc — Chiffres clés 2026",
  author: { "@type": "Organization", name: "SiyahaMag" },
  publisher: { "@type": "Organization", name: "SiyahaMag", url: "https://siyahamag.ma" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/observatoire" },
}

export default function ObservatoirePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={datasetLd} />
      <JsonLd data={articleLd} />
      <Breadcrumbs segments={[{ label: "Observatoire du tourisme" }]} />

      <header className="mt-6 space-y-4">
        <Badge className="bg-ocean-50 text-ocean border-0">Données ouvertes</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Observatoire du Tourisme au Maroc — Chiffres clés 2026
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          SiyahaMag agrège les indicateurs clés du tourisme marocain à partir de sources officielles
          (ONMT, Office des Changes, Observatoire du Tourisme). Ces données sont <strong>libres de
          citation</strong> : journalistes, étudiants et professionnels peuvent les reprendre en
          créditant SiyahaMag avec un lien vers cette page.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Indicateurs nationaux</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {KEY_FIGURES.map((f) => (
            <Card key={f.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{f.label}</p>
                <p className="text-3xl font-bold text-ocean mt-1">{f.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{f.note}</p>
                <p className="text-xs text-muted-foreground mt-2">Source : {f.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Arrivées par région (2024)</h2>
        <div className="rounded-lg border border-border divide-y">
          {REGIONS.map((r) => (
            <div key={r.region} className="flex items-center justify-between px-4 py-3">
              <span className="text-foreground">{r.region}</span>
              <span className="font-semibold text-ocean">{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">Méthodologie</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les chiffres présentés proviennent des publications officielles de l'Office National
          Marocain du Tourisme (ONMT), de l'Office des Changes et de l'Observatoire du Tourisme.
          Ils sont actualisés à mesure de la publication des données officielles. SiyahaMag suit
          également en continu l'emploi et l'investissement touristique au Maroc.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-ocean/20 bg-ocean-50 p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Citer ces données</h2>
        <p className="text-sm text-muted-foreground">
          Vous pouvez reprendre ces chiffres en citant la source ainsi :
        </p>
        <p className="mt-3 rounded-md bg-background p-3 text-sm font-mono">
          Source : Observatoire du Tourisme SiyahaMag — https://siyahamag.ma/observatoire
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-foreground mb-3">Aller plus loin</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li><Link href="/statistiques" className="text-ocean hover:underline">Statistiques détaillées du tourisme</Link></li>
          <li><Link href="/emplois" className="text-ocean hover:underline">Emploi tourisme &amp; hôtellerie</Link></li>
          <li><Link href="/investissement" className="text-ocean hover:underline">Investissement touristique</Link></li>
          <li><Link href="/actualites" className="text-ocean hover:underline">Actualités du secteur</Link></li>
        </ul>
      </section>
    </div>
  )
}
