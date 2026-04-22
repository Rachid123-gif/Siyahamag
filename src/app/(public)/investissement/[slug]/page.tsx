import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  MapPin,
  Banknote,
  Ruler,
  BedDouble,
  Building2,
  Tag,
  Flag,
  User,
} from "lucide-react"

import { prisma } from "@/lib/prisma"
import {
  INVESTMENT_TYPES,
  PROPERTY_CONDITIONS,
  MOROCCO_REGIONS,
} from "@/lib/constants"
import { formatDate } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextRenderer } from "@/components/articles/RichTextRenderer"
import { PhotoGallery } from "@/components/investments/PhotoGallery"
import { ContactSellerDialog } from "@/components/investments/ContactSellerDialog"
import { InvestmentCard } from "@/components/investments/InvestmentCard"

// ── Types ─────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>
}

// ── Helpers ──────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR") + " MAD"
}

// Static fallback shown when the DB is temporarily unreachable. Keys match
// the slugs published in the sitemap so every known URL always renders
// rich content rather than 404.
type StaticInvestment = {
  id: string
  title: string
  slug: string
  investmentType: string
  city: string
  region: string | null
  price: number | null
  surface: number | null
  rooms: number | null
  condition: string | null
  images: string[]
  description: { type: "doc"; content: Array<{ type: "paragraph"; content: Array<{ type: "text"; text: string }> }> }
  contactName: string
  contactCompany: string | null
  createdAt: Date
  viewCount: number
  user: { name: string } | null
}

function para(text: string) {
  return { type: "doc" as const, content: [{ type: "paragraph" as const, content: [{ type: "text" as const, text }] }] }
}

const DEMO_INVESTMENTS: Record<string, StaticInvestment> = {
  "riad-charme-medina-marrakech": {
    id: "demo-1",
    title: "Riad de charme à vendre - Médina de Marrakech",
    slug: "riad-charme-medina-marrakech",
    investmentType: "RIAD",
    city: "Marrakech",
    region: "MARRAKECH_SAFI",
    price: 3500000,
    surface: 320,
    rooms: 8,
    condition: "EN_ACTIVITE",
    images: ["https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=800&fit=crop"],
    description: para("Superbe riad du 19e siècle entièrement rénové au cœur de la médina de Marrakech. Huit chambres avec salle de bain, patio central avec fontaine, terrasse panoramique avec vue sur les toits de la médina. Idéal pour activité de maison d'hôtes haut de gamme."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
  "terrain-zone-touristique-agadir": {
    id: "demo-2",
    title: "Terrain en zone touristique - Baie d'Agadir",
    slug: "terrain-zone-touristique-agadir",
    investmentType: "TERRAIN",
    city: "Agadir",
    region: "SOUSS_MASSA",
    price: 8000000,
    surface: 5000,
    rooms: null,
    condition: null,
    images: ["https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop"],
    description: para("Terrain de 5 000 m² en zone touristique classée, à 500 mètres de la plage. Titre foncier disponible, viabilisé, idéal pour un projet d'hôtel-resort ou un ensemble de villas touristiques. Autorisations d'urbanisme favorables."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
  "hotel-4-etoiles-tanger": {
    id: "demo-3",
    title: "Hôtel 4 étoiles - Front de mer Tanger",
    slug: "hotel-4-etoiles-tanger",
    investmentType: "HOTEL",
    city: "Tanger",
    region: "TANGER_TETOUAN_AL_HOCEIMA",
    price: 45000000,
    surface: 4200,
    rooms: 85,
    condition: "EN_ACTIVITE",
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop"],
    description: para("Hôtel 4 étoiles de 85 chambres en front de mer, parfait état, restaurant panoramique, piscine, spa, parking privatif. Emplacement stratégique à 5 minutes du port et de la médina. Actuellement en activité avec un taux d'occupation moyen de 78%."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
  "restaurant-panoramique-essaouira": {
    id: "demo-4",
    title: "Restaurant panoramique vue océan - Essaouira",
    slug: "restaurant-panoramique-essaouira",
    investmentType: "RESTAURANT",
    city: "Essaouira",
    region: "MARRAKECH_SAFI",
    price: 2800000,
    surface: 180,
    rooms: null,
    condition: "EN_ACTIVITE",
    images: ["https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1200&h=800&fit=crop"],
    description: para("Restaurant-bar de 180 m² en duplex avec terrasse panoramique sur l'océan Atlantique. Capacité de 80 couverts intérieurs et 40 en terrasse. Cuisine entièrement équipée aux normes. Licence d'exploitation transférable, clientèle établie."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
  "projet-resort-eco-dakhla": {
    id: "demo-5",
    title: "Projet resort éco-touristique - Dakhla",
    slug: "projet-resort-eco-dakhla",
    investmentType: "PROJET",
    city: "Dakhla",
    region: "DAKHLA_OUED_ED_DAHAB",
    price: 120000000,
    surface: 250000,
    rooms: 60,
    condition: "NEUF",
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop"],
    description: para("Projet clé en main d'un resort éco-touristique de 60 bungalows sur 25 hectares en bord de lagune. Autorisations d'exploitation obtenues, études d'impact environnemental validées. Conception bioclimatique avec énergie solaire, circuit court d'alimentation."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
  "maison-hotes-chefchaouen": {
    id: "demo-6",
    title: "Maison d'hôtes avec terrasse - Chefchaouen",
    slug: "maison-hotes-chefchaouen",
    investmentType: "RIAD",
    city: "Chefchaouen",
    region: "TANGER_TETOUAN_AL_HOCEIMA",
    price: 4200000,
    surface: 280,
    rooms: 6,
    condition: "EN_ACTIVITE",
    images: ["https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=1200&h=800&fit=crop"],
    description: para("Maison d'hôtes classée de 6 chambres dans le cœur bleu de Chefchaouen. Patio traditionnel, terrasse panoramique sur le Rif, salon marocain, hammam privatif. En activité depuis 8 ans, excellente e-réputation (4,8/5 sur Booking)."),
    contactName: "SiyahaMag",
    contactCompany: null,
    createdAt: new Date("2026-04-01"),
    viewCount: 0,
    user: { name: "SiyahaMag" },
  },
}

// ── SEO ──────────────────────────────────────────────────────────────

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params

  const dbInvestment = await prisma.investment
    .findUnique({
      where: { slug, status: "APPROVED" },
      select: { title: true, city: true, investmentType: true, images: true },
    })
    .catch(() => undefined)

  const investment = dbInvestment ?? DEMO_INVESTMENTS[slug] ?? null
  if (!investment) {
    return { title: "Annonce introuvable | SiyahaMag" }
  }

  const typeLabel =
    INVESTMENT_TYPES[
      investment.investmentType as keyof typeof INVESTMENT_TYPES
    ] ?? investment.investmentType

  const title = `${investment.title} - ${typeLabel} a ${investment.city} | SiyahaMag`
  const description = `Opportunite d'investissement touristique : ${typeLabel} a ${investment.city}. Consultez les details sur SiyahaMag.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: investment.images[0] ? [investment.images[0]] : [],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

export default async function InvestmentDetailPage(props: PageProps) {
  const { slug } = await props.params

  // Resilient to transient DB outages: try Prisma first, fall back to the
  // static DEMO_INVESTMENTS map (covers every slug published in the sitemap).
  // Only 404 when the slug is truly unknown AND DB returned an empty result.
  const dbInvestment = await prisma.investment
    .findUnique({
      where: { slug, status: "APPROVED" },
      include: {
        user: { select: { name: true } },
      },
    })
    .catch((err) => {
      console.error("[investment] findUnique failed, using static fallback:", err)
      return undefined
    })

  const investment = dbInvestment ?? DEMO_INVESTMENTS[slug] ?? null
  if (!investment) notFound()

  // Increment view count (non-blocking)
  prisma.investment
    .update({
      where: { id: investment.id },
      data: { viewCount: { increment: 1 } },
    })
    .catch(() => {})

  const typeLabel =
    INVESTMENT_TYPES[
      investment.investmentType as keyof typeof INVESTMENT_TYPES
    ] ?? investment.investmentType
  const conditionLabel = investment.condition
    ? PROPERTY_CONDITIONS[
        investment.condition as keyof typeof PROPERTY_CONDITIONS
      ]
    : null
  const regionLabel = investment.region
    ? MOROCCO_REGIONS[investment.region as keyof typeof MOROCCO_REGIONS]
    : null

  // Fetch similar investments (non-blocking: empty array on DB failure).
  // Cast investmentType through the Prisma enum via `as never` since the
  // value may come from either the DB (enum) or the static fallback (string).
  const similarInvestments = await prisma.investment
    .findMany({
      where: {
        status: "APPROVED",
        investmentType: investment.investmentType as never,
        id: { not: investment.id },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        investmentType: true,
        city: true,
        price: true,
        surface: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    })
    .catch(() => [] as never[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Accueil
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/investissement" className="hover:text-foreground">
          Investissement
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground line-clamp-1">{investment.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Photo gallery */}
          <PhotoGallery images={investment.images} alt={investment.title} />

          {/* Title + meta */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{typeLabel}</Badge>
              {conditionLabel && (
                <Badge variant="secondary">{conditionLabel}</Badge>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
              {investment.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {investment.city}
                {regionLabel && `, ${regionLabel}`}
              </span>

              {investment.price != null && (
                <span className="inline-flex items-center gap-1.5 text-lg font-bold text-ocean">
                  <Banknote className="size-4" />
                  {formatPrice(investment.price)}
                </span>
              )}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {investment.surface != null && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Ruler className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Surface</p>
                  <p className="font-medium">
                    {investment.surface.toLocaleString("fr-FR")} m&sup2;
                  </p>
                </div>
              </div>
            )}

            {investment.rooms != null && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <BedDouble className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Chambres</p>
                  <p className="font-medium">{investment.rooms}</p>
                </div>
              </div>
            )}

            {conditionLabel && (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Tag className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Etat</p>
                  <p className="font-medium">{conditionLabel}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Description</h2>
            <RichTextRenderer
              content={
                investment.description as {
                  type: "doc"
                  content: Array<{
                    type: string
                    attrs?: Record<string, unknown>
                    content?: Array<{
                      type: string
                      attrs?: Record<string, unknown>
                      content?: Array<{
                        type: string
                        attrs?: Record<string, unknown>
                        marks?: Array<{
                          type:
                            | "bold"
                            | "italic"
                            | "underline"
                            | "strike"
                            | "link"
                            | "code"
                          attrs?: Record<string, unknown>
                        }>
                        text?: string
                      }>
                    }>
                    marks?: Array<{
                      type:
                        | "bold"
                        | "italic"
                        | "underline"
                        | "strike"
                        | "link"
                        | "code"
                      attrs?: Record<string, unknown>
                    }>
                    text?: string
                  }>
                }
              }
            />
          </div>

          {/* Report link */}
          <div className="border-t pt-4">
            <Link
              href={`/investissement/${slug}#signaler`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <Flag className="size-4" />
              Signaler cette annonce
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Seller info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="size-4" />
                Vendeur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{investment.contactName}</p>
                {investment.contactCompany && (
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="size-3.5" />
                    {investment.contactCompany}
                  </p>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Publiee le {formatDate(investment.createdAt)}
              </p>
            </CardContent>
          </Card>

          {/* Contact button */}
          <ContactSellerDialog investmentSlug={slug} />

          {/* Publication info */}
          <Card size="sm">
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {investment.viewCount} vue{investment.viewCount !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar investments */}
      {similarInvestments.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">
            Opportunites similaires
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarInvestments.map((inv) => (
              <InvestmentCard key={inv.id} investment={inv} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
