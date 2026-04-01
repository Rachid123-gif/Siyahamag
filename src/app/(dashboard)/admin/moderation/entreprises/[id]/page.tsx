import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  ShieldX,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { CompanyModerationActions } from "@/components/admin/CompanyModerationActions"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CompanyModerationDetailPage({
  params,
}: PageProps) {
  const { id } = await params

  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, email: true, phone: true, createdAt: true },
      },
      _count: { select: { jobListings: true } },
    },
  })

  if (!company) notFound()

  const statusLabel =
    company.verificationStatus === "VERIFIED"
      ? "Verifiee"
      : company.verificationStatus === "REJECTED"
        ? "Rejetee"
        : "En attente"

  const statusVariant =
    company.verificationStatus === "VERIFIED"
      ? "default"
      : company.verificationStatus === "REJECTED"
        ? "destructive"
        : "secondary"

  // Verification checklist items
  const checklistItems = [
    {
      label: "Numero ICE",
      value: company.ice,
      valid: !!company.ice && company.ice.length > 0,
    },
    {
      label: "Email professionnel",
      value: company.email,
      valid: !!company.email && company.email.includes("@"),
    },
    {
      label: "Site web",
      value: company.website,
      valid:
        !!company.website &&
        (company.website.startsWith("http://") ||
          company.website.startsWith("https://")),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/moderation/entreprises">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Company details - main column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5" />
                {company.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Company info grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">ICE :</span>
                  <span className="font-mono">{company.ice}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${company.email}`}
                    className="text-primary hover:underline"
                  >
                    {company.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {company.website}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Non renseigne</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{company.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Secteur :</span>
                  <Badge variant="secondary">{company.sector}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    Offres publiees :
                  </span>
                  <span>{company._count.jobListings}</span>
                </div>
              </div>

              {/* Description */}
              {company.description && (
                <div>
                  <p className="mb-2 text-sm font-medium">Description</p>
                  <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
                    {company.description}
                  </div>
                </div>
              )}

              {/* Rejection reason if rejected */}
              {company.verificationStatus === "REJECTED" &&
                company.rejectionReason && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                    <p className="mb-1 text-sm font-medium text-destructive">
                      Motif du rejet
                    </p>
                    <p className="text-sm">{company.rejectionReason}</p>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Verification checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Checklist de verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.valid ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.value || "Non renseigne"}
                        </p>
                      </div>
                    </div>
                    <Badge variant={item.valid ? "default" : "outline"}>
                      {item.valid ? "OK" : "A verifier"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <CompanyModerationActions
            companyId={company.id}
            currentStatus={company.verificationStatus}
          />
        </div>

        {/* User info sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Responsable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{company.user.name}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <a
                    href={`mailto:${company.user.email}`}
                    className="text-primary hover:underline"
                  >
                    {company.user.email}
                  </a>
                </div>
                {company.user.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{company.user.phone}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Inscrit le{" "}
                  {new Date(company.user.createdAt).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardContent>
              <p className="text-xs text-muted-foreground">Inscrite le</p>
              <p className="text-sm font-medium">
                {new Date(company.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {company.verifiedAt && (
                <>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Verifiee le
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(company.verifiedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
