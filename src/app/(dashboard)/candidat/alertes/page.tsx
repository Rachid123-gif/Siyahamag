import { redirect } from "next/navigation"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AlertsList } from "@/components/candidate/AlertsList"
import type { JobAlert } from "@/types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Alertes emploi | SiyahaMag",
  description: "Gerez vos alertes emploi pour etre notifie des nouvelles offres.",
}

export default async function CandidateAlertsPage() {
  const candidate = await getAuthenticatedCandidate()
  if (!candidate) redirect("/connexion")

  const alerts = await prisma.jobAlert.findMany({
    where: { userId: candidate.id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alertes emploi</h1>
        <p className="text-muted-foreground">
          Recevez des notifications quand de nouvelles offres correspondent a
          vos criteres.
        </p>
      </div>

      <AlertsList initialAlerts={alerts as JobAlert[]} />
    </div>
  )
}
