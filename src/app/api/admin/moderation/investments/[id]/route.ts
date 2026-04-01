import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { moderateInvestmentSchema } from "@/lib/validations/investment"

// --- PATCH: Admin approve or reject an investment ---

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

    const investment = await prisma.investment.findUnique({
      where: { id },
    })

    if (!investment) {
      return NextResponse.json(
        { error: "Annonce introuvable" },
        { status: 404 }
      )
    }

    if (investment.status !== "PENDING") {
      return NextResponse.json(
        { error: "Cette annonce n'est pas en attente de moderation" },
        { status: 400 }
      )
    }

    const body = await request.json()

    const parsed = moderateInvestmentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Donnees invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { action, reason } = parsed.data

    if (action === "APPROVE") {
      await prisma.$transaction([
        prisma.investment.update({
          where: { id },
          data: {
            status: "APPROVED",
            approvedAt: new Date(),
            rejectionReason: null,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "APPROVE_INVESTMENT",
            targetType: "INVESTMENT",
            targetId: id,
            reason: reason ?? null,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Annonce d'investissement approuvee avec succes",
      })
    } else {
      // REJECT
      if (!reason) {
        return NextResponse.json(
          { error: "Le motif de rejet est requis" },
          { status: 400 }
        )
      }

      await prisma.$transaction([
        prisma.investment.update({
          where: { id },
          data: {
            status: "REJECTED",
            rejectionReason: reason,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "REJECT_INVESTMENT",
            targetType: "INVESTMENT",
            targetId: id,
            reason,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Annonce d'investissement rejetee",
      })
    }
  } catch (error) {
    console.error("PATCH /api/admin/moderation/investments/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
