import { redirect } from "next/navigation"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { EmployerSidebar } from "@/components/employer/EmployerSidebar"

export default async function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  // Redirect unverified companies to verification page
  if (
    auth.company.verificationStatus === "PENDING" ||
    auth.company.verificationStatus === "REJECTED"
  ) {
    redirect("/employeur/verification")
  }

  return (
    <div className="flex min-h-screen">
      <EmployerSidebar />
      <main className="flex-1 overflow-auto bg-muted/30 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
