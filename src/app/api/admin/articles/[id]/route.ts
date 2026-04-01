import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { z } from "zod"
import slugify from "slugify"

// --- GET: Single article for editing ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json(
        { error: "Article introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: article })
  } catch (error) {
    console.error("GET /api/admin/articles/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- PATCH: Update article ---

const updateArticleSchema = z
  .object({
    title: z
      .string()
      .min(5, "Le titre doit contenir au moins 5 caracteres")
      .max(200, "Le titre ne doit pas depasser 200 caracteres")
      .optional(),
    slug: z.string().max(250).optional(),
    content: z.record(z.string(), z.any()).optional(),
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
        { message: "La categorie est invalide" }
      )
      .optional(),
    coverImage: z.string().url("L'URL de l'image est invalide").optional(),
    summary: z
      .string()
      .max(300, "Le resume ne doit pas depasser 300 caracteres")
      .optional()
      .nullable(),
    status: z
      .enum(["DRAFT", "PUBLISHED", "SCHEDULED"], {
        message: "Le statut est invalide",
      })
      .optional(),
    scheduledAt: z.string().datetime({ message: "Date planifiee invalide" }).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.status === "SCHEDULED" && data.scheduledAt === undefined) {
        // When updating to SCHEDULED, scheduledAt must be provided
        // (unless it was already set on the article)
        return true // we'll check in the handler
      }
      return true
    },
    { message: "Validation echouee" }
  )

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const existing = await prisma.article.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: "Article introuvable" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const parsed = updateArticleSchema.safeParse(body)

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

    // If switching to SCHEDULED, require scheduledAt (from body or existing)
    if (
      status === "SCHEDULED" &&
      !scheduledAt &&
      !existing.scheduledAt
    ) {
      return NextResponse.json(
        {
          error:
            "La date de planification est requise pour les articles planifies",
        },
        { status: 400 }
      )
    }

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (category !== undefined) updateData.category = category
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (summary !== undefined) updateData.summary = summary

    // Handle slug
    if (slug !== undefined) {
      const newSlug = slugify(slug, {
        lower: true,
        strict: true,
        locale: "fr",
      })
      // Check uniqueness (excluding current article)
      const slugExists = await prisma.article.findFirst({
        where: { slug: newSlug, id: { not: id } },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: "Ce slug est deja utilise" },
          { status: 409 }
        )
      }
      updateData.slug = newSlug
    }

    // Handle status transitions
    if (status !== undefined) {
      updateData.status = status

      // Set publishedAt when transitioning to PUBLISHED
      if (status === "PUBLISHED" && existing.status !== "PUBLISHED") {
        updateData.publishedAt = new Date()
      }
    }

    if (scheduledAt !== undefined) {
      updateData.scheduledAt = scheduledAt ? new Date(scheduledAt) : null
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      data: article,
      message: "Article mis a jour avec succes",
    })
  } catch (error) {
    console.error("PATCH /api/admin/articles/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- DELETE: Delete article ---

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const existing = await prisma.article.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: "Article introuvable" },
        { status: 404 }
      )
    }

    await prisma.article.delete({ where: { id } })

    return NextResponse.json({
      message: "Article supprime avec succes",
    })
  } catch (error) {
    console.error("DELETE /api/admin/articles/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
