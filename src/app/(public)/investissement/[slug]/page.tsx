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

// ── SEO ──────────────────────────────────────────────────────────────

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params

  const investment = await prisma.investment.findUnique({
    where: { slug, status: "APPROVED" },
    select: { title: true, city: true, investmentType: true, images: true },
  })

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

  const investment = await prisma.investment.findUnique({
    where: { slug, status: "APPROVED" },
    include: {
      user: { select: { name: true } },
    },
  })

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

  // Fetch similar investments
  const similarInvestments = await prisma.investment.findMany({
    where: {
      status: "APPROVED",
      investmentType: investment.investmentType,
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
