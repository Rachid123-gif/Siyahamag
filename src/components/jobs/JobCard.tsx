import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CONTRACT_TYPES, JOB_CATEGORIES, MOROCCO_REGIONS } from "@/lib/constants"
import { formatRelativeDate } from "@/lib/formatDate"
import { MapPin, Building2, Clock, BadgeCheck, Banknote } from "lucide-react"
import type {
  JobCategory,
  ContractType,
  CompanyVerification,
  MoroccoRegion,
} from "@/types"

interface JobCardProps {
  job: {
    id: string
    title: string
    slug: string
    jobCategory: JobCategory
    contractType: ContractType
    city: string
    region: MoroccoRegion | null
    salary: string | null
    createdAt: Date | string
    company: {
      id: string
      name: string
      logo: string | null
      verificationStatus: CompanyVerification
    }
  }
}

export function JobCard({ job }: JobCardProps) {
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

  return (
    <Link href={`/emplois/${job.slug}`} className="block">
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex gap-4">
          {/* Company logo */}
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

          {/* Job info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
              {job.title}
            </h3>

            {/* Company name */}
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{job.company.name}</span>
              {isVerified && (
                <BadgeCheck className="size-4 text-blue-500" aria-label="Entreprise verifiee" />
              )}
            </div>

            {/* Location + contract + date */}
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {job.city}
                {regionLabel && `, ${regionLabel}`}
              </span>

              <Badge variant="secondary" className="text-xs">
                {contractLabel}
              </Badge>

              <Badge variant="outline" className="text-xs">
                {categoryLabel}
              </Badge>

              {job.salary && (
                <span className="inline-flex items-center gap-1">
                  <Banknote className="size-3.5" />
                  {job.salary}
                </span>
              )}

              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {formatRelativeDate(job.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
