import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { createJobSchema } from "@/lib/validations/job"
import { z } from "zod"
import slugify from "slugify"
import { JOBS_PER_PAGE } from "@/lib/constants"
import type { JobListingWhereInput } from "@/generated/prisma/models/JobListing"
import type { InputJsonValue } from "@prisma/client/runtime/client"

// --- GET: List employer's own jobs ---

const listOwnJobsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(JOBS_PER_PAGE),
  status: z
    .enum(["PENDING", "APPROVED", "REJECTED", "EXPIRED", "DISABLED"], {
      message: "Statut invalide",
    })
    .optional(),
})

export async function GET(request: Request) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const parsed = listOwnJobsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Paramètres invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { page, limit, status } = parsed.data
    const skip = (page - 1) * limit

    const where: JobListingWhereInput = {
      companyId: auth.company.id,
    }

    if (status) {
      where.status = status
    }

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          _count: {
            select: { applications: true },
          },
        },
      }),
      prisma.jobListing.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: jobs,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/employer/jobs error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- POST: Create a new job listing ---

/**
 * Generate a unique slug for a job listing from the title.
 */
async function generateUniqueJobSlug(title: string): Promise<string> {
  const baseSlug = slugify(title, { lower: true, strict: true, locale: "fr" })

  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.jobListing.findUnique({ where: { slug } })
    if (!existing) return slug
    counter++
    slug = `${baseSlug}-${counter}`
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Only verified companies can create jobs
    if (auth.company.verificationStatus !== "VERIFIED") {
      return NextResponse.json(
        {
          error:
            "Votre entreprise doit être vérifiée avant de publier des offres",
        },
        { status: 403 }
      )
    }

    const body = await request.json()

    const parsed = createJobSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const {
      title,
      jobCategory,
      contractType,
      city,
      region,
      description,
      skills,
      experience,
      salary,
      deadline,
      submit,
    } = parsed.data

    const slug = await generateUniqueJobSlug(title)

    // DISABLED if saved as draft, PENDING if submitted for moderation
    const status = submit ? "PENDING" : "DISABLED"

    const job = await prisma.jobListing.create({
      data: {
        title,
        slug,
        description: description as InputJsonValue,
        jobCategory,
        contractType,
        city,
        region: region ?? null,
        skills,
        experience: experience ?? null,
        salary: salary ?? null,
        deadline: deadline ? new Date(deadline) : null,
        status,
        companyId: auth.company.id,
      },
    })

    return NextResponse.json(
      { data: job, message: "Offre d'emploi créée avec succès" },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/employer/jobs error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
