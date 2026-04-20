import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/connexion")

  // Lookup role in Prisma DB and redirect to proper dashboard
  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    })

    if (dbUser) {
      switch (dbUser.role) {
        case "ADMIN":
          redirect("/admin")
        case "EMPLOYER":
          redirect("/employeur")
        case "CANDIDATE":
          redirect("/candidat")
        case "INVESTOR":
          redirect("/mes-investissements")
      }
    }
  } catch {
    // DB not available — show fallback
  }

  // Fallback if no DB user found
  redirect("/candidat")
}
