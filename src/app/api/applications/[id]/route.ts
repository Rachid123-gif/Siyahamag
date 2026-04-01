import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { updateApplicationStatusSchema } from "@/lib/validations/application"

// --- PATCH: Update application status (employer only) ---

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant qu'employeur." },
        { status: 401 }
      )
    }

    const { id } = await params

    // Find the application and include the job listing for ownership check
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        jobListing: {
          select: { companyId: true },
        },
      },
    })

    if (!application) {
      return NextResponse.json(
        { error: "Candidature introuvable" },
        { status: 404 }
      )
    }

    // Verify the employer owns the job listing
    if (application.jobListing.companyId !== auth.company.id) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      )
    }

    const body = await request.json()

    const parsed = updateApplicationStatusSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { status } = parsed.data

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({
      data: updatedApplication,
      message: "Statut de la candidature mis à jour",
    })
  } catch (error) {
    console.error("PATCH /api/applications/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
