import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { updateJobSchema } from "@/lib/validations/job"
import type { InputJsonValue } from "@prisma/client/runtime/client"

// --- GET: Get a single job for editing (owner only) ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { id } = await params

    const job = await prisma.jobListing.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    // Ownership check
    if (job.companyId !== auth.company.id) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 })
    }

    return NextResponse.json({ data: job })
  } catch (error) {
    console.error("GET /api/employer/jobs/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- PATCH: Update a job listing (owner only) ---

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { id } = await params

    const existingJob = await prisma.jobListing.findUnique({
      where: { id },
    })

    if (!existingJob) {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    if (existingJob.companyId !== auth.company.id) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 })
    }

    const body = await request.json()

    const parsed = updateJobSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { submit, description, deadline, ...rest } = parsed.data

    // Build update data
    const updateData: Record<string, unknown> = { ...rest }

    if (description !== undefined) {
      updateData.description = description as InputJsonValue
    }

    if (deadline !== undefined) {
      updateData.deadline = deadline ? new Date(deadline) : null
    }

    // If the job was already APPROVED and is being edited, send it back to PENDING
    if (existingJob.status === "APPROVED") {
      updateData.status = "PENDING"
      updateData.approvedAt = null
    }

    // If submitting a disabled/draft job for moderation
    if (submit && existingJob.status === "DISABLED") {
      updateData.status = "PENDING"
    }

    const updatedJob = await prisma.jobListing.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      data: updatedJob,
      message: "Offre d'emploi mise à jour avec succès",
    })
  } catch (error) {
    console.error("PATCH /api/employer/jobs/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- DELETE: Soft-delete a job listing (owner only) ---

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
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

    if (job.companyId !== auth.company.id) {
      return NextResponse.json({ error: "Accès interdit" }, { status: 403 })
    }

    // Soft delete by setting status to DISABLED
    await prisma.jobListing.update({
      where: { id },
      data: { status: "DISABLED" },
    })

    return NextResponse.json({
      message: "Offre d'emploi supprimée avec succès",
    })
  } catch (error) {
    console.error("DELETE /api/employer/jobs/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
