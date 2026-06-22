/**
 * DB-backed investment cards with safe fallback (build-time only; the
 * serverless runtime can't reach Supabase). Returns [] on any error.
 */
import { prisma } from "@/lib/prisma"

export interface InvestmentCardData {
  id: string
  title: string
  slug: string
  investmentType: string
  city: string
  price: number | null
  surface: number | null
  image: string
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop"

export async function getApprovedInvestmentCards(): Promise<InvestmentCardData[]> {
  try {
    const rows = await prisma.investment.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      investmentType: r.investmentType,
      city: r.city,
      price: r.price,
      surface: r.surface,
      image: r.images?.[0] || FALLBACK_IMG,
    }))
  } catch {
    return []
  }
}
