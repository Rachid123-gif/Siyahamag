import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// --- GET: Public job detail by slug ---

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const job = await prisma.jobListing.findUnique({
      where: { slug },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            city: true,
            sector: true,
            website: true,
            description: true,
            verificationStatus: true,
          },
        },
      },
    })

    if (!job || job.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Offre d'emploi introuvable" },
        { status: 404 }
      )
    }

    // Increment view count (fire and forget)
    prisma.jobListing
      .update({
        where: { id: job.id },
        data: { viewCount: { increment: 1 } },
      })
      .catch(() => {
        // Silently ignore view count errors
      })

    // Fetch 3 similar jobs (same city OR same jobCategory, excluding current)
    const similarJobs = await prisma.jobListing.findMany({
      where: {
        status: "APPROVED",
        id: { not: job.id },
        OR: [{ city: job.city }, { jobCategory: job.jobCategory }],
      },
      orderBy: { approvedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        jobCategory: true,
        contractType: true,
        city: true,
        salary: true,
        approvedAt: true,
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
    })

    return NextResponse.json({
      data: { ...job, similarJobs },
    })
  } catch (error) {
    console.error("GET /api/jobs/[slug] error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
