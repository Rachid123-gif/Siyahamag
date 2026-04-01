import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { z } from "zod"
import slugify from "slugify"
import type { ArticleWhereInput } from "@/generated/prisma/models/Article"
import type { InputJsonValue } from "@prisma/client/runtime/client"

// --- GET: List all articles for admin (all statuses) ---

const adminListSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z
    .enum(["DRAFT", "PUBLISHED", "SCHEDULED"], {
      message: "Statut invalide",
    })
    .optional(),
  q: z.string().max(200).optional(),
})

export async function GET(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const parsed = adminListSchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      q: searchParams.get("q") ?? undefined,
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

    const { page, limit, status, q } = parsed.data
    const skip = (page - 1) * limit

    const where: ArticleWhereInput = {}

    if (status) {
      where.status = status
    }

    if (q) {
      where.title = { contains: q, mode: "insensitive" }
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
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

    return NextResponse.json({
      data: articles,
      meta: { total, page, limit, totalPages },
    })
  } catch (error) {
    console.error("GET /api/admin/articles error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- POST: Create a new article ---

const createArticleSchema = z
  .object({
    title: z
      .string()
      .min(5, "Le titre doit contenir au moins 5 caracteres")
      .max(200, "Le titre ne doit pas depasser 200 caracteres"),
    slug: z.string().max(250).optional().default(""),
    content: z.record(z.string(), z.any()),
    category: z.enum(
      [
        "HEBERGEMENT",
        "TRANSPORT",
        "AERIEN",
        "GASTRONOMIE",
        "EVENEMENTS",
        "DEVELOPPEMENT",
        "MICE",
      ],
      { message: "La categorie est requise" }
    ),
    coverImage: z.string().url("L'URL de l'image est invalide"),
    summary: z
      .string()
      .max(300, "Le resume ne doit pas depasser 300 caracteres")
      .optional(),
    status: z
      .enum(["DRAFT", "PUBLISHED", "SCHEDULED"], {
        message: "Le statut est invalide",
      })
      .default("DRAFT"),
    scheduledAt: z.string().datetime({ message: "Date planifiee invalide" }).optional(),
  })
  .refine(
    (data) => {
      if (data.status === "SCHEDULED" && !data.scheduledAt) {
        return false
      }
      return true
    },
    {
      message:
        "La date de planification est requise pour les articles planifies",
      path: ["scheduledAt"],
    }
  )

/**
 * Generate a unique slug from a title. If the slug already exists,
 * append an incrementing suffix (-2, -3, etc.).
 */
async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title, { lower: true, strict: true, locale: "fr" })

  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.article.findUnique({ where: { slug } })
    if (!existing) return slug
    counter++
    slug = `${baseSlug}-${counter}`
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const body = await request.json()

    const parsed = createArticleSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Donnees invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { title, slug, content, category, coverImage, summary, status, scheduledAt } =
      parsed.data

    // Generate slug: use provided slug or auto-generate from title
    const finalSlug = slug
      ? slugify(slug, { lower: true, strict: true, locale: "fr" })
      : await generateUniqueSlug(title)

    // If a custom slug was provided, verify it's unique
    if (slug) {
      const existing = await prisma.article.findUnique({
        where: { slug: finalSlug },
      })
      if (existing) {
        return NextResponse.json(
          { error: "Ce slug est deja utilise" },
          { status: 409 }
        )
      }
    }

    // Determine publishedAt
    let publishedAt: Date | null = null
    if (status === "PUBLISHED") {
      publishedAt = new Date()
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: finalSlug,
        content: content as InputJsonValue,
        category,
        coverImage,
        summary: summary ?? null,
        status,
        publishedAt,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        authorId: admin.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(
      { data: article, message: "Article cree avec succes" },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/admin/articles error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
