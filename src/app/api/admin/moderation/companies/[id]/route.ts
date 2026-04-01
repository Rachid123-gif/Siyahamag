import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { moderateCompanySchema } from "@/lib/validations/job"

// --- PATCH: Verify or reject a company ---

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { id } = await params

    const company = await prisma.company.findUnique({
      where: { id },
    })

    if (!company) {
      return NextResponse.json(
        { error: "Entreprise introuvable" },
        { status: 404 }
      )
    }

    if (company.verificationStatus !== "PENDING") {
      return NextResponse.json(
        { error: "Cette entreprise n'est pas en attente de vérification" },
        { status: 400 }
      )
    }

    const body = await request.json()

    const parsed = moderateCompanySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { action, reason } = parsed.data

    if (action === "VERIFY") {
      await prisma.$transaction([
        prisma.company.update({
          where: { id },
          data: {
            verificationStatus: "VERIFIED",
            verifiedAt: new Date(),
            rejectionReason: null,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "VERIFY_COMPANY",
            targetType: "COMPANY",
            targetId: id,
            reason: reason ?? null,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Entreprise vérifiée avec succès",
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
        prisma.company.update({
          where: { id },
          data: {
            verificationStatus: "REJECTED",
            rejectionReason: reason,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "REJECT_COMPANY",
            targetType: "COMPANY",
            targetId: id,
            reason,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Entreprise rejetée",
      })
    }
  } catch (error) {
    console.error("PATCH /api/admin/moderation/companies/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
