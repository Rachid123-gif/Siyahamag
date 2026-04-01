import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  MapPin,
  Clock,
  BadgeCheck,
  Building2,
  Banknote,
  Briefcase,
  Calendar,
  Eye,
} from "lucide-react"

import { prisma } from "@/lib/prisma"
import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
  MOROCCO_REGIONS,
} from "@/lib/constants"
import { formatDate, formatRelativeDate } from "@/lib/formatDate"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RichTextRenderer } from "@/components/articles/RichTextRenderer"
import { ShareButtons } from "@/components/articles/ShareButtons"
import { JobCard } from "@/components/jobs/JobCard"
import { ReportJobDialog } from "@/components/jobs/ReportJobDialog"

// ── Types ─────────────────────────────────────────────────────────────

interface JobPageProps {
  params: Promise<{ slug: string }>
}

// ── SEO ───────────────────────────────────────────────────────────────

export async function generateMetadata(props: JobPageProps): Promise<Metadata> {
  const { slug } = await props.params

  const job = await prisma.jobListing.findUnique({
    where: { slug, status: "APPROVED" },
    include: { company: { select: { name: true } } },
  })

  if (!job) {
    return { title: "Offre introuvable | SiyahaMag" }
  }

  const title = `${job.title} - ${job.company.name} | SiyahaMag`
  const description = `Offre d'emploi ${job.title} chez ${job.company.name} a ${job.city}. Postulez maintenant sur SiyahaMag.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

export default async function JobDetailPage(props: JobPageProps) {
  const { slug } = await props.params

  // Fetch job
  const job = await prisma.jobListing.findUnique({
    where: { slug, status: "APPROVED" },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logo: true,
          description: true,
          city: true,
          sector: true,
          verificationStatus: true,
        },
      },
    },
  })

  if (!job) notFound()

  // Increment view count (fire-and-forget)
  prisma.jobListing
    .update({ where: { id: job.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {})

  // Fetch similar jobs (same category or same city, excluding current)
  const similarJobs = await prisma.jobListing.findMany({
    where: {
      status: "APPROVED",
      id: { not: job.id },
      OR: [
        { jobCategory: job.jobCategory },
        { city: job.city },
      ],
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logo: true,
          verificationStatus: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  })

  // Count active jobs for this company
  const companyJobsCount = await prisma.jobListing.count({
    where: { companyId: job.company.id, status: "APPROVED" },
  })

  // Labels
  const categoryLabel =
    JOB_CATEGORIES[job.jobCategory as keyof typeof JOB_CATEGORIES] ??
    job.jobCategory
  const contractLabel =
    CONTRACT_TYPES[job.contractType as keyof typeof CONTRACT_TYPES] ??
    job.contractType
  const regionLabel = job.region
    ? MOROCCO_REGIONS[job.region as keyof typeof MOROCCO_REGIONS]
    : null
  const isVerified = job.company.verificationStatus === "VERIFIED"
  const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false

  // Page URL for sharing
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://siyahamag.com"}/emplois/${job.slug}`

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.title,
    datePosted: job.createdAt.toISOString(),
    ...(job.deadline && { validThrough: new Date(job.deadline).toISOString() }),
    employmentType: mapContractToSchema(job.contractType),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      ...(job.company.logo && { logo: job.company.logo }),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "MA",
      },
    },
    ...(job.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "MAD",
        value: { "@type": "QuantitativeValue", value: job.salary },
      },
    }),
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Accueil
              </Link>
            </li>
            <ChevronRight className="size-3.5" />
            <li>
              <Link href="/emplois" className="hover:text-foreground">
                Emplois
              </Link>
            </li>
            <ChevronRight className="size-3.5" />
            <li className="truncate font-medium text-foreground">
              {job.title}
            </li>
          </ol>
        </nav>

        {/* Job header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{contractLabel}</Badge>
            <Badge variant="outline">{categoryLabel}</Badge>
            {isExpired && (
              <Badge className="bg-red-100 text-red-700 border-0">
                Date limite depassee
              </Badge>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            {job.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="size-4" />
              {job.company.name}
              {isVerified && (
                <BadgeCheck className="size-4 text-blue-500" aria-label="Entreprise verifiee" />
              )}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {job.city}
              {regionLabel && `, ${regionLabel}`}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              Publiee {formatRelativeDate(job.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="size-4" />
              {job.viewCount} vue{job.viewCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column: job details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">
                Description du poste
              </h2>
              <RichTextRenderer
                content={job.description as unknown as Parameters<typeof RichTextRenderer>[0]["content"]}
              />
            </section>

            {/* Skills */}
            {job.skills.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">
                  Competences requises
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Details grid */}
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-semibold">Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {job.experience && (
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <Briefcase className="mt-0.5 size-5 text-ocean" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">
                        {job.experience}
                      </p>
                    </div>
                  </div>
                )}
                {job.salary && (
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <Banknote className="mt-0.5 size-5 text-ocean" />
                    <div>
                      <p className="text-sm font-medium">Salaire</p>
                      <p className="text-sm text-muted-foreground">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-start gap-3 rounded-lg border p-4">
                    <Calendar className="mt-0.5 size-5 text-ocean" />
                    <div>
                      <p className="text-sm font-medium">Date limite</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(job.deadline)}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 rounded-lg border p-4">
                  <MapPin className="mt-0.5 size-5 text-ocean" />
                  <div>
                    <p className="text-sm font-medium">Localisation</p>
                    <p className="text-sm text-muted-foreground">
                      {job.city}
                      {regionLabel && `, ${regionLabel}`}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Share + Report */}
            <section className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div>
                <p className="mb-2 text-sm font-medium">Partager cette offre</p>
                <ShareButtons url={pageUrl} title={job.title} />
              </div>
              <ReportJobDialog jobId={job.id} />
            </section>
          </div>

          {/* Right column: sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply CTA */}
              {!isExpired ? (
                <Button asChild size="lg" className="w-full">
                  <Link href={`/emplois/${job.slug}/postuler`}>
                    Postuler a cette offre
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="w-full" disabled>
                  Date limite depassee
                </Button>
              )}

              {/* Company card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">A propos de l&apos;entreprise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                      {job.company.logo ? (
                        <Image
                          src={job.company.logo}
                          alt={job.company.name}
                          width={48}
                          height={48}
                          className="size-12 object-cover"
                        />
                      ) : (
                        <Building2 className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold">
                        {job.company.name}
                        {isVerified && (
                          <BadgeCheck className="size-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {job.company.sector} - {job.company.city}
                      </p>
                    </div>
                  </div>

                  {job.company.description && (
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {job.company.description}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {companyJobsCount} offre{companyJobsCount !== 1 ? "s" : ""}{" "}
                    active{companyJobsCount !== 1 ? "s" : ""}
                  </p>

                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/entreprise/${job.company.id}`}>
                      Voir le profil
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar jobs */}
        {similarJobs.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold">
              Offres similaires
            </h2>
            <div className="space-y-4">
              {similarJobs.map((similar) => (
                <JobCard key={similar.id} job={similar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────

function mapContractToSchema(contractType: string): string {
  const map: Record<string, string> = {
    CDI: "FULL_TIME",
    CDD: "CONTRACT",
    SAISONNIER: "TEMPORARY",
    STAGE: "INTERN",
    FREELANCE: "CONTRACTOR",
  }
  return map[contractType] ?? "OTHER"
}
