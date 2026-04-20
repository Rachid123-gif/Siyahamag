import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  BadgeCheck,
  Building2,
  Banknote,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  ArrowLeft,
} from "lucide-react"

import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
} from "@/lib/constants"
import { DEMO_JOBS } from "@/lib/demoData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShareButtons } from "@/components/articles/ShareButtons"
import { JsonLd } from "@/components/seo/JsonLd"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

// ── Types ────────────────────────────────────────────────────────────

interface JobDetailPageProps {
  params: Promise<{ slug: string }>
}

// ── Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const job = DEMO_JOBS.find((j) => j.slug === slug)

  if (!job) {
    return { title: "Offre introuvable | SiyahaMag" }
  }

  return {
    title: `${job.title} — ${job.company.name}`,
    description: job.description.slice(0, 160),
    alternates: {
      canonical: `/emplois/${slug}`,
    },
    openGraph: {
      title: `${job.title} — ${job.company.name} | SiyahaMag`,
      description: job.description.slice(0, 160),
      type: "website",
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params
  const job = DEMO_JOBS.find((j) => j.slug === slug)

  if (!job) notFound()

  const categoryLabel =
    JOB_CATEGORIES[job.jobCategory as keyof typeof JOB_CATEGORIES] ??
    job.jobCategory
  const contractLabel =
    CONTRACT_TYPES[job.contractType as keyof typeof CONTRACT_TYPES] ??
    job.contractType

  const similarJobs = DEMO_JOBS.filter(
    (j) =>
      j.id !== job.id &&
      (j.jobCategory === job.jobCategory || j.city === job.city)
  ).slice(0, 3)

  const appUrl = `https://siyahamag.ma/emplois/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    validThrough: job.deadline,
    employmentType: job.contractType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "MA",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      sameAs: job.company.website,
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* JSON-LD SEO */}
      <JsonLd data={jsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Offres d'emploi", href: "/emplois" },
          { label: job.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-ocean-50 text-ocean border-0">{categoryLabel}</Badge>
              <Badge variant="outline">{contractLabel}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {job.company.name}
                {job.company.verified && <BadgeCheck className="h-4 w-4 text-oasis" />}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />{job.city}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1.5">
                  <Banknote className="h-4 w-4" />{job.salary}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Publié le {new Date(job.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Description du poste</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Compétences requises</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-ocean-50 text-ocean border-ocean/20">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Details grid */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Détails de l&apos;offre</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-ocean-50"><Briefcase className="h-4 w-4 text-ocean" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Catégorie</p>
                    <p className="text-sm font-medium">{categoryLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-ocean-50"><Clock className="h-4 w-4 text-ocean" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contrat</p>
                    <p className="text-sm font-medium">{contractLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-ocean-50"><GraduationCap className="h-4 w-4 text-ocean" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expérience</p>
                    <p className="text-sm font-medium">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-ocean-50"><Calendar className="h-4 w-4 text-ocean" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date limite</p>
                    <p className="text-sm font-medium">{new Date(job.deadline).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Partager cette offre</h3>
            <ShareButtons url={appUrl} title={job.title} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply CTA */}
          <Card className="border-ocean/20 bg-ocean-50">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-lg text-ocean mb-2">Intéressé(e) ?</h3>
              <p className="text-sm text-muted-foreground mb-4">Postulez à cette offre en quelques clics</p>
              <Button asChild size="lg" className="w-full bg-ocean hover:bg-ocean/90">
                <Link href="/inscription">Postuler maintenant</Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Candidature avec ou sans compte</p>
            </CardContent>
          </Card>

          {/* Company card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-5 w-5 text-ocean" />
                {job.company.name}
                {job.company.verified && (
                  <Badge className="bg-oasis/10 text-oasis border-0 text-xs">
                    <BadgeCheck className="h-3 w-3 mr-1" />Vérifié
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{job.company.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />{job.company.city}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />{job.company.sector}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />{job.company.activeJobs} offre{job.company.activeJobs > 1 ? "s" : ""} active{job.company.activeJobs > 1 ? "s" : ""}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar jobs */}
      {similarJobs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">Offres similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarJobs.map((sj) => (
              <Link key={sj.id} href={`/emplois/${sj.slug}`} className="block group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="pt-4 space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {CONTRACT_TYPES[sj.contractType as keyof typeof CONTRACT_TYPES] ?? sj.contractType}
                    </Badge>
                    <h3 className="font-semibold group-hover:text-ocean transition-colors line-clamp-2">{sj.title}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{sj.company.name}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{sj.city}</div>
                      {sj.salary && <div className="flex items-center gap-1.5"><Banknote className="h-3.5 w-3.5" />{sj.salary}</div>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/emplois"><ArrowLeft className="h-4 w-4 mr-2" />Voir toutes les offres</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
