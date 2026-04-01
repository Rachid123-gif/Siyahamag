import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  INVESTMENT_TYPES,
  PROPERTY_CONDITIONS,
  MOROCCO_REGIONS,
} from "@/lib/constants"
import {
  ArrowLeft,
  MapPin,
  Banknote,
  Ruler,
  BedDouble,
  Tag,
  User,
  Building2,
  Mail,
  Calendar,
} from "lucide-react"
import { InvestmentModerationActions } from "@/components/admin/InvestmentModerationActions"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_INFO: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  PENDING: { label: "En attente", variant: "secondary" },
  APPROVED: { label: "Approuvee", variant: "default" },
  REJECTED: { label: "Rejetee", variant: "destructive" },
  SOLD: { label: "Vendu", variant: "outline" },
}

export default async function InvestmentModerationDetailPage({
  params,
}: PageProps) {
  const { id } = await params

  const investment = await prisma.investment.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
    },
  })

  if (!investment) notFound()

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
  const statusInfo = STATUS_INFO[investment.status] ?? {
    label: investment.status,
    variant: "outline" as const,
  }

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/moderation/investissements">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{investment.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meta info */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Type :</span>
                  <span>{typeLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ville :</span>
                  <span>
                    {investment.city}
                    {regionLabel && `, ${regionLabel}`}
                  </span>
                </div>
                {investment.price != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Prix :</span>
                    <span className="font-medium">
                      {investment.price.toLocaleString("fr-FR")} MAD
                    </span>
                  </div>
                )}
                {investment.surface != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Surface :</span>
                    <span>
                      {investment.surface.toLocaleString("fr-FR")} m&sup2;
                    </span>
                  </div>
                )}
                {investment.rooms != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Chambres :</span>
                    <span>{investment.rooms}</span>
                  </div>
                )}
                {conditionLabel && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Etat :</span>
                    <span>{conditionLabel}</span>
                  </div>
                )}
              </div>

              {/* Images */}
              {investment.images.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Photos</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {investment.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-lg bg-muted"
                      >
                        <Image
                          src={img}
                          alt={`Photo ${index + 1}`}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="mb-2 text-sm font-medium">Description</p>
                <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
                  {renderTiptapText(investment.description)}
                </div>
              </div>

              {/* Rejection reason */}
              {investment.status === "REJECTED" && investment.rejectionReason && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <p className="mb-1 text-sm font-medium text-destructive">
                    Motif du rejet
                  </p>
                  <p className="text-sm">{investment.rejectionReason}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <InvestmentModerationActions
            investmentId={investment.id}
            currentStatus={investment.status}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Seller info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Vendeur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{investment.contactName}</p>
                {investment.contactCompany && (
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {investment.contactCompany}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <a
                    href={`mailto:${investment.contactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {investment.contactEmail}
                  </a>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Utilisateur inscrit
                </p>
                <p className="text-sm font-medium">{investment.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {investment.user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardContent>
              <p className="text-xs text-muted-foreground">Soumise le</p>
              <p className="text-sm font-medium">
                {new Date(investment.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/**
 * Basic renderer that extracts plain text from Tiptap JSON.
 * For moderation purposes, we display the content as text paragraphs.
 */
function renderTiptapText(content: unknown): React.ReactNode {
  if (!content || typeof content !== "object") {
    return <p className="text-muted-foreground">Aucun contenu</p>
  }

  const doc = content as {
    type?: string
    content?: Array<{
      type?: string
      content?: Array<{ text?: string }>
    }>
  }

  if (!doc.content || !Array.isArray(doc.content)) {
    if (typeof content === "string") {
      return <p>{content}</p>
    }
    return <p className="text-muted-foreground">Aucun contenu</p>
  }

  return doc.content.map((node, index) => {
    const text =
      node.content?.map((inline) => inline.text ?? "").join("") ?? ""
    if (node.type === "heading") {
      return (
        <p key={index} className="font-semibold">
          {text}
        </p>
      )
    }
    return <p key={index}>{text || "\u00A0"}</p>
  })
}
