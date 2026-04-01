import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { updateCandidateProfileSchema } from "@/lib/validations/application"

// --- GET: Get candidate profile ---

export async function GET() {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    // Return user info with candidate profile
    const user = await prisma.user.findUnique({
      where: { id: candidate.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        avatarUrl: true,
        createdAt: true,
        candidateProfile: {
          select: {
            id: true,
            cvUrl: true,
            experiences: true,
            skills: true,
            education: true,
            desiredCity: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    return NextResponse.json({ data: user })
  } catch (error) {
    console.error("GET /api/candidate/profile error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

// --- PATCH: Update candidate profile ---

export async function PATCH(request: Request) {
  try {
    const candidate = await getAuthenticatedCandidate()
    if (!candidate) {
      return NextResponse.json(
        { error: "Non autorisé. Vous devez être connecté en tant que candidat." },
        { status: 401 }
      )
    }

    const body = await request.json()

    const parsed = updateCandidateProfileSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Upsert the candidate profile (create if it doesn't exist yet)
    const updatedProfile = await prisma.candidateProfile.upsert({
      where: { userId: candidate.id },
      create: {
        userId: candidate.id,
        cvUrl: data.cvUrl ?? null,
        experiences: data.experiences ?? undefined,
        skills: data.skills ?? [],
        education: data.education ?? null,
        desiredCity: data.desiredCity ?? null,
        availability: data.availability ?? "IMMEDIATE",
      },
      update: {
        ...(data.cvUrl !== undefined && { cvUrl: data.cvUrl }),
        ...(data.experiences !== undefined && { experiences: data.experiences }),
        ...(data.skills !== undefined && { skills: data.skills }),
        ...(data.education !== undefined && { education: data.education }),
        ...(data.desiredCity !== undefined && { desiredCity: data.desiredCity }),
        ...(data.availability !== undefined && { availability: data.availability }),
      },
    })

    return NextResponse.json({
      data: updatedProfile,
      message: "Profil mis à jour avec succès",
    })
  } catch (error) {
    console.error("PATCH /api/candidate/profile error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
