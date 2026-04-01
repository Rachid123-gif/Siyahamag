import { redirect } from "next/navigation"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CompanyProfileForm } from "@/components/employer/CompanyProfileForm"

export const metadata = {
  title: "Profil entreprise | SiyahaMag",
  description: "Gérez le profil de votre entreprise sur SiyahaMag.",
}

export default async function EmployerProfilePage() {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  const company = await prisma.company.findUnique({
    where: { id: auth.company.id },
  })

  if (!company) redirect("/connexion")

  const companyData = {
    id: company.id,
    name: company.name,
    description: company.description ?? "",
    logo: company.logo ?? "",
    city: company.city,
    sector: company.sector,
    website: company.website,
    email: company.email,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil entreprise</h1>
        <p className="text-muted-foreground">
          Modifiez les informations de votre entreprise
        </p>
      </div>
      <CompanyProfileForm initialData={companyData} />
    </div>
  )
}
