import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { JOBS_PER_PAGE } from "@/lib/constants"
import type { JobListingWhereInput } from "@/generated/prisma/models/JobListing"

// --- GET: Public paginated job listings search ---

const listJobsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(JOBS_PER_PAGE),
  city: z.string().max(100).optional(),
  region: z
    .enum([
      "MARRAKECH_SAFI",
      "SOUSS_MASSA",
      "TANGER_TETOUAN_AL_HOCEIMA",
      "FES_MEKNES",
      "RABAT_SALE_KENITRA",
      "CASABLANCA_SETTAT",
      "ORIENTAL",
      "BENI_MELLAL_KHENIFRA",
      "DRAA_TAFILALET",
      "GUELMIM_OUED_NOUN",
      "LAAYOUNE_SAKIA_EL_HAMRA",
      "DAKHLA_OUED_ED_DAHAB",
    ])
    .optional(),
  jobCategory: z
    .enum([
      "RECEPTION",
      "CUISINE",
      "SERVICE",
      "ANIMATION",
      "GUIDE",
      "BIEN_ETRE",
      "MANAGEMENT",
      "MICE",
      "TRANSPORT",
      "ENTRETIEN",
    ])
    .optional(),
  contractType: z
    .enum(["CDI", "CDD", "SAISONNIER", "STAGE", "FREELANCE"])
    .optional(),
  q: z.string().max(200).optional(),
  dateFilter: z.enum(["week", "month", "all"]).optional().default("all"),
  sort: z.enum(["recent", "relevance"]).optional().default("recent"),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const parsed = listJobsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      region: searchParams.get("region") ?? undefined,
      jobCategory: searchParams.get("jobCategory") ?? undefined,
      contractType: searchParams.get("contractType") ?? undefined,
      q: searchParams.get("q") ?? undefined,
      dateFilter: searchParams.get("dateFilter") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
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

    const { page, limit, city, region, jobCategory, contractType, q, dateFilter, sort } =
      parsed.data
    const skip = (page - 1) * limit

    // Only show approved jobs
    const where: JobListingWhereInput = {
      status: "APPROVED",
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" }
    }

    if (region) {
      where.region = region
    }

    if (jobCategory) {
      where.jobCategory = jobCategory
    }

    if (contractType) {
      where.contractType = contractType
    }

    if (q) {
      where.title = { contains: q, mode: "insensitive" }
    }

    // Date filter
    if (dateFilter === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      where.approvedAt = { gte: oneWeekAgo }
    } else if (dateFilter === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      where.approvedAt = { gte: oneMonthAgo }
    }

    // Sort order
    const orderBy =
      sort === "relevance" && q
        ? { viewCount: "desc" as const }
        : { approvedAt: "desc" as const }

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          jobCategory: true,
          contractType: true,
          city: true,
          region: true,
          salary: true,
          experience: true,
          deadline: true,
          approvedAt: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              verificationStatus: true,
            },
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
    console.error("GET /api/jobs error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
