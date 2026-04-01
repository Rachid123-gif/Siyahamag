import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import type { ArticleWhereInput } from "@/generated/prisma/models/Article"

// Validation schema for query params
const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  category: z
    .enum(
      [
        "HEBERGEMENT",
        "TRANSPORT",
        "AERIEN",
        "GASTRONOMIE",
        "EVENEMENTS",
        "DEVELOPPEMENT",
        "MICE",
      ],
      { message: "Categorie invalide" }
    )
    .optional(),
  q: z.string().max(200).optional(),
  sort: z
    .enum(["publishedAt:desc", "publishedAt:asc", "viewCount:desc"], {
      message: "Tri invalide",
    })
    .default("publishedAt:desc"),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const parsed = querySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      q: searchParams.get("q") ?? undefined,
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

    const { page, limit, category, q, sort } = parsed.data
    const skip = (page - 1) * limit
    const now = new Date()

    // Build where clause: only published articles with publishedAt in the past
    const where: ArticleWhereInput = {
      status: "PUBLISHED",
      publishedAt: { lte: now },
    }

    if (category) {
      where.category = category
    }

    if (q) {
      where.title = { contains: q, mode: "insensitive" }
    }

    // Parse sort param
    const [sortField, sortDir] = sort.split(":") as [string, "asc" | "desc"]
    const orderBy: Record<string, "asc" | "desc"> = { [sortField]: sortDir }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          coverImage: true,
          category: true,
          publishedAt: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.article.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    // Map coverImage to coverImageUrl for the response
    const data = articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      coverImageUrl: article.coverImage,
      category: article.category,
      publishedAt: article.publishedAt,
      author: article.author,
    }))

    return NextResponse.json({
      data,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/articles error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
