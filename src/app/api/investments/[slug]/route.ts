import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// --- GET: Public investment detail (APPROVED only) ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const investment = await prisma.investment.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        investmentType: true,
        city: true,
        region: true,
        price: true,
        surface: true,
        rooms: true,
        condition: true,
        images: true,
        status: true,
        viewCount: true,
        contactName: true,
        contactCompany: true,
        // contactEmail explicitly excluded for privacy
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!investment || investment.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    // Increment view count (fire and forget)
    prisma.investment
      .update({
        where: { id: investment.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch((err) =>
        console.error("Failed to increment investment viewCount:", err)
      )

    // Remove status from the response (it's always APPROVED)
    const { status: _status, ...data } = investment

    return NextResponse.json({ data })
  } catch (error) {
    console.error("GET /api/investments/[slug] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
