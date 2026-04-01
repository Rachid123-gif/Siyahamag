import { redirect } from "next/navigation"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { CandidateSidebar } from "@/components/candidate/CandidateSidebar"

export default async function CandidatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const candidate = await getAuthenticatedCandidate()
  if (!candidate) redirect("/connexion")

  return (
    <div className="flex min-h-screen">
      <CandidateSidebar />
      <main className="flex-1 overflow-auto bg-muted/30 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
