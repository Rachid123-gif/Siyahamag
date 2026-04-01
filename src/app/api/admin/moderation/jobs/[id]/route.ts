import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { moderateJobSchema } from "@/lib/validations/job"

// --- PATCH: Approve or reject a job listing ---

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

    const job = await prisma.jobListing.findUnique({
      where: { id },
    })

    if (!job) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    if (job.status !== "PENDING") {
      return NextResponse.json(
        { error: "Cette offre n'est pas en attente de modération" },
        { status: 400 }
      )
    }

    const body = await request.json()

    const parsed = moderateJobSchema.safeParse(body)
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

    if (action === "APPROVE") {
      await prisma.$transaction([
        prisma.jobListing.update({
          where: { id },
          data: {
            status: "APPROVED",
            approvedAt: new Date(),
            rejectionReason: null,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "APPROVE_JOB",
            targetType: "JOB_LISTING",
            targetId: id,
            reason: reason ?? null,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Offre d'emploi approuvée avec succès",
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
        prisma.jobListing.update({
          where: { id },
          data: {
            status: "REJECTED",
            rejectionReason: reason,
          },
        }),
        prisma.moderationLog.create({
          data: {
            action: "REJECT_JOB",
            targetType: "JOB_LISTING",
            targetId: id,
            reason,
            adminId: admin.id,
          },
        }),
      ])

      return NextResponse.json({
        message: "Offre d'emploi rejetée",
      })
    }
  } catch (error) {
    console.error("PATCH /api/admin/moderation/jobs/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
