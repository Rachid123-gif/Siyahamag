/**
 * DB-backed job data with safe fallback.
 *
 * Every function is wrapped so that if the database is empty or unreachable,
 * it returns empty/null and the page falls back to demo data — the public
 * site never breaks or empties out.
 */
import { prisma } from "@/lib/prisma"

// Tiptap JSON doc -> plain text (paragraphs separated by blank lines).
function tiptapToText(content: unknown): string {
  try {
    const doc = content as { content?: Array<{ content?: Array<{ text?: string }> }> }
    if (!doc?.content) return ""
    return doc.content
      .map((node) => (node.content || []).map((c) => c.text || "").join(""))
      .filter(Boolean)
      .join("\n\n")
  } catch {
    return ""
  }
}

// Shape used by the /emplois list cards.
export interface JobCard {
  id: string
  title: string
  slug: string
  jobCategory: string
  contractType: string
  city: string
  salary: string | null
  createdAt: string
  company: { name: string; verified: boolean }
}

// Shape used by the /emplois/[slug] detail page (matches demoData jobs).
export interface JobDetail extends JobCard {
  description: string
  experience: string
  deadline: string
  skills: string[]
  company: {
    name: string
    verified: boolean
    website: string
    description: string
    city: string
    sector: string
    activeJobs: number
  }
}

export async function getApprovedJobCards(): Promise<JobCard[]> {
  try {
    const jobs = await prisma.jobListing.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      include: { company: { select: { name: true, verificationStatus: true } } },
      take: 50,
    })
    return jobs.map((j) => ({
      id: j.id,
      title: j.title,
      slug: j.slug,
      jobCategory: j.jobCategory,
      contractType: j.contractType,
      city: j.city,
      salary: j.salary,
      createdAt: j.createdAt.toISOString().slice(0, 10),
      company: { name: j.company?.name ?? "Entreprise", verified: j.company?.verificationStatus === "VERIFIED" },
    }))
  } catch {
    return []
  }
}

export async function getDbJobBySlug(slug: string): Promise<JobDetail | null> {
  try {
    const j = await prisma.jobListing.findFirst({
      where: { slug, status: "APPROVED" },
      include: { company: true },
    })
    if (!j) return null
    let activeJobs = 1
    try {
      activeJobs = await prisma.jobListing.count({
        where: { companyId: j.companyId, status: "APPROVED" },
      })
    } catch {
      /* keep default */
    }
    return {
      id: j.id,
      title: j.title,
      slug: j.slug,
      jobCategory: j.jobCategory,
      contractType: j.contractType,
      city: j.city,
      salary: j.salary,
      createdAt: j.createdAt.toISOString().slice(0, 10),
      description: tiptapToText(j.description),
      experience: j.experience ?? "Non précisé",
      deadline: (j.deadline ?? new Date(Date.now() + 60 * 864e5)).toISOString().slice(0, 10),
      skills: j.skills ?? [],
      company: {
        name: j.company?.name ?? "Entreprise",
        verified: j.company?.verificationStatus === "VERIFIED",
        website: j.company?.website ?? "",
        description: j.company?.description ?? "",
        city: j.company?.city ?? j.city,
        sector: j.company?.sector ?? "Tourisme",
        activeJobs,
      },
    }
  } catch {
    return null
  }
}
