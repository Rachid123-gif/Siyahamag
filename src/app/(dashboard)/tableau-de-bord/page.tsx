import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Tableau de bord",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/connexion")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-ocean">Tableau de bord</h1>
      <p className="mt-2 text-muted-foreground">
        Bienvenue, {user.user_metadata?.name || user.email}
      </p>
      <div className="mt-8 text-center py-16 text-muted-foreground">
        Votre espace personnel sera disponible prochainement.
      </div>
    </div>
  )
}
