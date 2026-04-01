import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSellerSchema } from "@/lib/validations/investment"

// --- POST: Contact seller (send a message about an investment) ---
// Uses the investment ID passed as [slug] param (accepts both slug and UUID)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Look up by ID first, then by slug
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)

    const investment = isUuid
      ? await prisma.investment.findUnique({
          where: { id: slug },
          select: { id: true, status: true },
        })
      : await prisma.investment.findUnique({
          where: { slug },
          select: { id: true, status: true },
        })

    if (!investment) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    if (investment.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Cette annonce n'est pas disponible" },
        { status: 400 }
      )
    }

    const body = await request.json()

    const parsed = contactSellerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Donnees invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { senderName, senderEmail, message } = parsed.data

    const contactMessage = await prisma.contactMessage.create({
      data: {
        investmentId: investment.id,
        senderName,
        senderEmail,
        message,
      },
    })

    return NextResponse.json(
      {
        data: { id: contactMessage.id },
        message: "Votre message a ete envoye au vendeur avec succes.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/investments/[slug]/contact error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
