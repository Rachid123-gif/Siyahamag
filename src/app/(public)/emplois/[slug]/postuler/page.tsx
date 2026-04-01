import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { createClient } from "@/lib/supabase/server"
import { ApplicationForm } from "@/components/jobs/ApplicationForm"

// ── Types ─────────────────────────────────────────────────────────────

interface PostulerPageProps {
  params: Promise<{ slug: string }>
}

// ── SEO ───────────────────────────────────────────────────────────────

export async function generateMetadata(
  props: PostulerPageProps
): Promise<Metadata> {
  const { slug } = await props.params

  const job = await prisma.jobListing.findUnique({
    where: { slug, status: "APPROVED" },
    include: { company: { select: { name: true } } },
  })

  if (!job) {
    return { title: "Offre introuvable | SiyahaMag" }
  }

  return {
    title: `Postuler - ${job.title} | SiyahaMag`,
    description: `Postulez a l'offre ${job.title} chez ${job.company.name}.`,
  }
}

// ── Page ──────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic"

export default async function PostulerPage(props: PostulerPageProps) {
  const { slug } = await props.params

  // Fetch job
  const job = await prisma.jobListing.findUnique({
    where: { slug, status: "APPROVED" },
    include: { company: { select: { id: true, name: true } } },
  })

  if (!job) notFound()

  // Check deadline
  const isExpired = job.deadline ? new Date(job.deadline) < new Date() : false
  if (isExpired) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Date limite depassee</h1>
        <p className="mt-2 text-muted-foreground">
          La date limite de candidature pour cette offre est depassee.
        </p>
        <Link
          href={`/emplois/${slug}`}
          className="mt-4 inline-block text-ocean hover:underline"
        >
          Retour a l&apos;offre
        </Link>
      </div>
    )
  }

  // Get current user if authenticated
  let user: {
    id: string
    name: string
    email: string
    cvUrl: string | null
  } | null = null

  try {
    const supabase = await createClient()
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (authUser) {
      const dbUser = await prisma.user.findUnique({
        where: { supabaseId: authUser.id },
        include: { candidateProfile: { select: { cvUrl: true } } },
      })

      if (dbUser && dbUser.role === "CANDIDATE") {
        user = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          cvUrl: dbUser.candidateProfile?.cvUrl ?? null,
        }
      }
    }
  } catch {
    // Not authenticated, continue as guest
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Fil d'Ariane"
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li>
            <Link href="/emplois" className="hover:text-foreground">
              Emplois
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li>
            <Link
              href={`/emplois/${slug}`}
              className="hover:text-foreground"
            >
              {job.title}
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li className="font-medium text-foreground">Postuler</li>
        </ol>
      </nav>

      {/* Application form */}
      <ApplicationForm
        job={{
          id: job.id,
          title: job.title,
          company: job.company.name,
        }}
        user={user}
      />
    </div>
  )
}
