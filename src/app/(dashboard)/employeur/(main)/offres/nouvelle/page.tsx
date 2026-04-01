import { redirect } from "next/navigation"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { JobPostingForm } from "@/components/employer/JobPostingForm"

export const metadata = {
  title: "Nouvelle offre d'emploi | SiyahaMag",
  description: "Publiez une nouvelle offre d'emploi sur SiyahaMag.",
}

export default async function NewJobPage() {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nouvelle offre</h1>
        <p className="text-muted-foreground">
          Remplissez les informations de votre offre d&apos;emploi
        </p>
      </div>
      <JobPostingForm mode="create" />
    </div>
  )
}
