import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
  JOB_STATUSES,
} from "@/lib/constants"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  Globe,
  Mail,
  ShieldCheck,
  ShieldX,
  Clock,
} from "lucide-react"
import { JobModerationActions } from "@/components/admin/JobModerationActions"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobModerationDetailPage({ params }: PageProps) {
  const { id } = await params

  const job = await prisma.jobListing.findUnique({
    where: { id },
    include: {
      company: {
        include: {
          user: { select: { name: true, email: true } },
        },
      },
    },
  })

  if (!job) notFound()

  const categoryLabel =
    JOB_CATEGORIES[job.jobCategory as keyof typeof JOB_CATEGORIES] ??
    job.jobCategory
  const contractLabel =
    CONTRACT_TYPES[job.contractType as keyof typeof CONTRACT_TYPES] ??
    job.contractType
  const statusLabel =
    JOB_STATUSES[job.status as keyof typeof JOB_STATUSES] ?? job.status

  const statusVariant =
    job.status === "APPROVED"
      ? "default"
      : job.status === "REJECTED"
        ? "destructive"
        : "secondary"

  return (
    <div className="space-y-6">
      {/* Back link + header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/moderation/offres">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Retour
          </Button>
        </Link>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Job details - main column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meta info grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Categorie :</span>
                  <span>{categoryLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Contrat :</span>
                  <span>{contractLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Ville :</span>
                  <span>{job.city}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Salaire :</span>
                    <span>{job.salary}</span>
                  </div>
                )}
                {job.experience && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Experience :</span>
                    <span>{job.experience}</span>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date limite :</span>
                    <span>
                      {new Date(job.deadline).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Skills */}
              {job.skills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Competences requises</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <p className="mb-2 text-sm font-medium">Description du poste</p>
                <div className="rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed">
                  {renderTiptapText(job.description)}
                </div>
              </div>

              {/* Rejection reason if rejected */}
              {job.status === "REJECTED" && job.rejectionReason && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <p className="mb-1 text-sm font-medium text-destructive">
                    Motif du rejet
                  </p>
                  <p className="text-sm">{job.rejectionReason}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action buttons */}
          <JobModerationActions jobId={job.id} currentStatus={job.status} />
        </div>

        {/* Company sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                Entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{job.company.name}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  {job.company.verificationStatus === "VERIFIED" ? (
                    <Badge variant="default" className="gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verifiee
                    </Badge>
                  ) : job.company.verificationStatus === "REJECTED" ? (
                    <Badge variant="destructive" className="gap-1">
                      <ShieldX className="h-3 w-3" />
                      Rejetee
                    </Badge>
                  ) : (
                    <Badge variant="secondary">En attente</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">ICE : </span>
                  <span>{job.company.ice}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  <a
                    href={`mailto:${job.company.email}`}
                    className="text-primary hover:underline"
                  >
                    {job.company.email}
                  </a>
                </div>
                {job.company.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {job.company.website}
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Ville : </span>
                  <span>{job.company.city}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Secteur : </span>
                  <span>{job.company.sector}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground">
                  Contact employeur
                </p>
                <p className="text-sm font-medium">{job.company.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {job.company.user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardContent>
              <p className="text-xs text-muted-foreground">Soumise le</p>
              <p className="text-sm font-medium">
                {new Date(job.createdAt).toLocaleDateString("fr-FR", {
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
    // If content is a string, display it directly
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
