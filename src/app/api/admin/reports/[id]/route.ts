import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const actionSchema = z.object({
  action: z.enum(["RESOLVE", "DISMISS"]),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 })
  }

  const { id } = await params

  const body = await request.json()
  const parsed = actionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Action invalide. Utilisez RESOLVE ou DISMISS." },
      { status: 400 }
    )
  }

  const report = await prisma.report.findUnique({ where: { id } })
  if (!report) {
    return NextResponse.json(
      { error: "Signalement introuvable." },
      { status: 404 }
    )
  }

  if (report.status !== "PENDING") {
    return NextResponse.json(
      { error: "Ce signalement a deja ete traite." },
      { status: 400 }
    )
  }

  const { action } = parsed.data
  const newStatus = action === "RESOLVE" ? "RESOLVED" : "DISMISSED"

  const updatedReport = await prisma.report.update({
    where: { id },
    data: {
      status: newStatus,
      resolvedAt: new Date(),
      resolvedByUserId: admin.id,
    },
  })

  // Create moderation log entry
  await prisma.moderationLog.create({
    data: {
      action: action === "RESOLVE" ? "REPORT_RESOLVED" : "REPORT_DISMISSED",
      targetType: "REPORT",
      targetId: id,
      reason: `Signalement ${action === "RESOLVE" ? "resolu" : "rejete"}`,
      adminId: admin.id,
    },
  })

  return NextResponse.json({
    data: updatedReport,
    message:
      action === "RESOLVE"
        ? "Signalement resolu avec succes."
        : "Signalement rejete avec succes.",
  })
}
