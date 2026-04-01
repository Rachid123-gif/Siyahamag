import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedUser } from "@/lib/auth"
import { createInvestmentSchema } from "@/lib/validations/investment"
import { INVESTMENTS_PER_PAGE } from "@/lib/constants"
import { z } from "zod"
import slugify from "slugify"
import type { InputJsonValue } from "@prisma/client/runtime/client"

// --- Query params validation ---

const listInvestmentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(INVESTMENTS_PER_PAGE),
  investmentType: z
    .enum(["TERRAIN", "HOTEL", "RIAD", "RESTAURANT", "PROJET", "AUTRE"])
    .optional(),
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
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  sort: z
    .enum(["createdAt:desc", "price:asc", "price:desc"])
    .optional()
    .default("createdAt:desc"),
})

// --- GET: Public paginated list of APPROVED investments ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const parsed = listInvestmentsSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      investmentType: searchParams.get("investmentType") ?? undefined,
      city: searchParams.get("city") ?? undefined,
      region: searchParams.get("region") ?? undefined,
      priceMin: searchParams.get("priceMin") ?? undefined,
      priceMax: searchParams.get("priceMax") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
    })

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Parametres invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { page, limit, investmentType, city, region, priceMin, priceMax, sort } =
      parsed.data
    const skip = (page - 1) * limit

    // Only show approved investments
    const where: Record<string, unknown> = {
      status: "APPROVED",
    }

    if (investmentType) {
      where.investmentType = investmentType
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" }
    }

    if (region) {
      where.region = region
    }

    // Price range filter
    if (priceMin !== undefined || priceMax !== undefined) {
      const priceFilter: Record<string, number> = {}
      if (priceMin !== undefined) priceFilter.gte = priceMin
      if (priceMax !== undefined) priceFilter.lte = priceMax
      where.price = priceFilter
    }

    // Sort order
    let orderBy: Record<string, string>
    switch (sort) {
      case "price:asc":
        orderBy = { price: "asc" }
        break
      case "price:desc":
        orderBy = { price: "desc" }
        break
      default:
        orderBy = { createdAt: "desc" }
    }

    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          investmentType: true,
          city: true,
          region: true,
          price: true,
          surface: true,
          rooms: true,
          condition: true,
          images: true,
          viewCount: true,
          createdAt: true,
          contactName: true,
          contactCompany: true,
        },
      }),
      prisma.investment.count({ where }),
    ])

    // Return only the first image for list view
    const data = investments.map((inv) => ({
      ...inv,
      coverImage: inv.images[0] ?? null,
      images: undefined,
    }))

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/investments error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- Slug generation helper ---

async function generateUniqueInvestmentSlug(title: string): Promise<string> {
  const baseSlug = slugify(title, { lower: true, strict: true, locale: "fr" })
  let counter = 0
  let slug = baseSlug

  while (true) {
    const existing = await prisma.investment.findUnique({ where: { slug } })
    if (!existing) return slug
    counter++
    slug = `${baseSlug}-${counter}`
  }
}

// --- POST: Create a new investment (authenticated user) ---

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const body = await request.json()

    const parsed = createInvestmentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Donnees invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const {
      title,
      investmentType,
      city,
      region,
      description,
      price,
      surface,
      rooms,
      condition,
      images,
      contactName,
      contactEmail,
      contactCompany,
    } = parsed.data

    const slug = await generateUniqueInvestmentSlug(title)

    const investment = await prisma.investment.create({
      data: {
        title,
        slug,
        investmentType,
        city,
        region: region ?? null,
        description: description as InputJsonValue,
        price: price ?? null,
        surface: surface ?? null,
        rooms: rooms ?? null,
        condition: condition ?? null,
        images,
        contactName,
        contactEmail,
        contactCompany: contactCompany ?? null,
        status: "PENDING",
        userId: user.id,
      },
    })

    return NextResponse.json(
      {
        data: investment,
        message: "Annonce soumise avec succes. Elle sera visible apres moderation.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/investments error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
