import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// --- GET: Public company profile ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const company = await prisma.company.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        city: true,
        sector: true,
        website: true,
        verificationStatus: true,
        jobListings: {
          where: { status: "APPROVED" },
          orderBy: { approvedAt: "desc" },
          select: {
            id: true,
            title: true,
            slug: true,
            jobCategory: true,
            contractType: true,
            city: true,
            salary: true,
            approvedAt: true,
          },
        },
      },
    })

    if (!company || company.verificationStatus !== "VERIFIED") {
      return NextResponse.json(
        { error: "Entreprise introuvable" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: company })
  } catch (error) {
    console.error("GET /api/companies/[id] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
