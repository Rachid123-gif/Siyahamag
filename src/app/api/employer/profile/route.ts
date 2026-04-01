import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { updateCompanySchema } from "@/lib/validations/job"

// --- GET: Get employer's company profile ---

export async function GET() {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const company = await prisma.company.findUnique({
      where: { id: auth.company.id },
      include: {
        _count: {
          select: { jobListings: true },
        },
      },
    })

    return NextResponse.json({ data: company })
  } catch (error) {
    console.error("GET /api/employer/profile error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- PATCH: Update company profile ---

export async function PATCH(request: Request) {
  try {
    const auth = await getAuthenticatedEmployer()
    if (!auth) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()

    const parsed = updateCompanySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const updatedCompany = await prisma.company.update({
      where: { id: auth.company.id },
      data: parsed.data,
    })

    return NextResponse.json({
      data: updatedCompany,
      message: "Profil entreprise mis à jour avec succès",
    })
  } catch (error) {
    console.error("PATCH /api/employer/profile error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
