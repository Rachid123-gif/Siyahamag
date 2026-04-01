import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const actionSchema = z.object({
  action: z.enum(["SUSPEND", "REACTIVATE"]),
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
      { error: "Action invalide. Utilisez SUSPEND ou REACTIVATE." },
      { status: 400 }
    )
  }

  const targetUser = await prisma.user.findUnique({ where: { id } })
  if (!targetUser) {
    return NextResponse.json(
      { error: "Utilisateur introuvable." },
      { status: 404 }
    )
  }

  // Prevent suspending another admin
  if (targetUser.role === "ADMIN") {
    return NextResponse.json(
      { error: "Impossible de suspendre un administrateur." },
      { status: 403 }
    )
  }

  const { action } = parsed.data
  const isSuspended = action === "SUSPEND"

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isSuspended },
  })

  // Create moderation log entry
  await prisma.moderationLog.create({
    data: {
      action: action === "SUSPEND" ? "USER_SUSPENDED" : "USER_REACTIVATED",
      targetType: "USER",
      targetId: id,
      reason:
        action === "SUSPEND"
          ? `Utilisateur ${targetUser.name} suspendu`
          : `Utilisateur ${targetUser.name} reactived`,
      adminId: admin.id,
    },
  })

  return NextResponse.json({
    data: updatedUser,
    message:
      action === "SUSPEND"
        ? "Utilisateur suspendu avec succes."
        : "Utilisateur reactive avec succes.",
  })
}
