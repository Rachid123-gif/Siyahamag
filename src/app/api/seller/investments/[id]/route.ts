import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedUser } from "@/lib/auth"
import { updateInvestmentSchema } from "@/lib/validations/investment"
import type { InputJsonValue } from "@prisma/client/runtime/client"

// --- GET: Get a single investment for editing (owner only) ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const investment = await prisma.investment.findUnique({
      where: { id },
      include: {
        _count: {
          select: { contactMessages: true },
        },
      },
    })

    if (!investment) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (investment.userId !== user.id) {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    return NextResponse.json({ data: investment })
  } catch (error) {
    console.error("GET /api/seller/investments/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- PATCH: Update own investment (owner only) ---

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const existing = await prisma.investment.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (existing.userId !== user.id) {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    // Cannot edit sold or rejected investments
    if (existing.status === "SOLD" || existing.status === "REJECTED") {
      return NextResponse.json(
        { error: "Cette annonce ne peut plus etre modifiee" },
        { status: 400 }
      )
    }

    const body = await request.json()

    const parsed = updateInvestmentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Donnees invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { description, ...rest } = parsed.data

    // Build update data
    const updateData: Record<string, unknown> = { ...rest }

    if (description !== undefined) {
      updateData.description = description as InputJsonValue
    }

    // If the investment was APPROVED and is being edited, revert to PENDING
    if (existing.status === "APPROVED") {
      updateData.status = "PENDING"
      updateData.approvedAt = null
    }

    const updated = await prisma.investment.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      data: updated,
      message: "Annonce mise a jour avec succes.",
    })
  } catch (error) {
    console.error("PATCH /api/seller/investments/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- DELETE: Withdraw own investment (owner only) ---

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const { id } = await params

    const investment = await prisma.investment.findUnique({
      where: { id },
    })

    if (!investment) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (investment.userId !== user.id) {
      return NextResponse.json({ error: "Acces interdit" }, { status: 403 })
    }

    // Soft delete by setting status to REJECTED
    await prisma.investment.update({
      where: { id },
      data: { status: "REJECTED", rejectionReason: "Retiree par le proprietaire" },
    })

    return NextResponse.json({
      message: "Annonce retiree avec succes.",
    })
  } catch (error) {
    console.error("DELETE /api/seller/investments/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
