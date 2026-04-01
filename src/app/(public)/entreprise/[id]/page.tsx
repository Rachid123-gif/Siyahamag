import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobStatusBadge } from "@/components/employer/JobStatusBadge"
import {
  MapPin,
  Globe,
  Building,
  BadgeCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react"
import { JOB_CATEGORIES, CONTRACT_TYPES } from "@/lib/constants"
import type { JobCategory, ContractType } from "@/types"

interface CompanyPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { id } = await params

  const company = await prisma.company.findUnique({
    where: { id },
    select: { name: true, description: true, city: true, sector: true },
  })

  if (!company) {
    return { title: "Entreprise introuvable | SiyahaMag" }
  }

  return {
    title: `${company.name} — Emploi tourisme ${company.city} | SiyahaMag`,
    description:
      company.description?.slice(0, 160) ||
      `Découvrez ${company.name}, entreprise dans le secteur ${company.sector} à ${company.city}. Consultez les offres d'emploi disponibles.`,
    openGraph: {
      title: `${company.name} | SiyahaMag`,
      description:
        company.description?.slice(0, 160) ||
        `${company.name} — ${company.sector} à ${company.city}`,
    },
  }
}

export default async function CompanyPublicPage({ params }: CompanyPageProps) {
  const { id } = await params

  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      jobListings: {
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { applications: true } },
        },
      },
    },
  })

  if (!company || company.verificationStatus !== "VERIFIED") {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Company header */}
      <Card>
        <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Logo */}
          {company.logo ? (
            <Image
              src={company.logo}
              alt={`Logo ${company.name}`}
              width={100}
              height={100}
              className="shrink-0 rounded-lg border object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border bg-muted">
              <Building className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <Badge className="bg-green-100 text-green-700 border-0">
                <BadgeCheck className="mr-1 h-3 w-3" />
                Vérifié
              </Badge>
            </div>

            {company.description && (
              <p className="text-muted-foreground">{company.description}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.city}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {company.sector}
              </span>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Site web
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active job listings */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">
          Offres d&apos;emploi ({company.jobListings.length})
        </h2>

        {company.jobListings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Aucune offre d&apos;emploi disponible pour le moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {company.jobListings.map((job) => (
              <Card key={job.id}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <Link
                      href={`/emplois/${job.slug}`}
                      className="text-lg font-semibold hover:underline"
                    >
                      {job.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {JOB_CATEGORIES[job.jobCategory as JobCategory]}
                      </span>
                      <span>&middot;</span>
                      <span>
                        {CONTRACT_TYPES[job.contractType as ContractType]}
                      </span>
                      <span>&middot;</span>
                      <span>{job.city}</span>
                      {job.salary && (
                        <>
                          <span>&middot;</span>
                          <span>{job.salary}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/emplois/${job.slug}`}>
                      Voir l&apos;offre
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
