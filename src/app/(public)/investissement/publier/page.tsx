import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InvestmentPublishForm } from "@/components/investments/InvestmentPublishForm"

export const metadata: Metadata = {
  title: "Publier une annonce d'investissement | SiyahaMag",
  description:
    "Publiez votre opportunite d'investissement touristique sur SiyahaMag.",
}

export default async function InvestmentPublishPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/connexion")

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Publier une annonce d&apos;investissement
        </h1>
        <p className="mt-2 text-muted-foreground">
          Remplissez les informations ci-dessous pour soumettre votre annonce.
          Elle sera examinee par notre equipe avant publication.
        </p>
      </div>

      <InvestmentPublishForm />
    </div>
  )
}
