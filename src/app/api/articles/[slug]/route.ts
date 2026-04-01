import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const now = new Date()

    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    })

    // Only return published articles with publishedAt in the past
    if (
      !article ||
      article.status !== "PUBLISHED" ||
      !article.publishedAt ||
      article.publishedAt > now
    ) {
      return NextResponse.json(
        { error: "Article introuvable" },
        { status: 404 }
      )
    }

    // Increment view count asynchronously (fire-and-forget)
    prisma.article
      .update({
        where: { id: article.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) => console.error("View count increment failed:", err))

    // Fetch 3 similar articles (same category, exclude current, published only)
    const similarArticles = await prisma.article.findMany({
      where: {
        category: article.category,
        status: "PUBLISHED",
        publishedAt: { lte: now },
        id: { not: article.id },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
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
    })

    const similarData = similarArticles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      coverImageUrl: a.coverImage,
      category: a.category,
      publishedAt: a.publishedAt,
      author: a.author,
    }))

    return NextResponse.json({
      data: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        coverImageUrl: article.coverImage,
        category: article.category,
        status: article.status,
        publishedAt: article.publishedAt,
        viewCount: article.viewCount + 1, // reflect the increment
        author: article.author,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      },
      similarArticles: similarData,
    })
  } catch (error) {
    console.error("GET /api/articles/[slug] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
