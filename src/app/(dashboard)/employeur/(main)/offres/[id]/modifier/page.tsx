import { redirect, notFound } from "next/navigation"
import { getAuthenticatedEmployer } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { JobPostingForm } from "@/components/employer/JobPostingForm"

export const metadata = {
  title: "Modifier l'offre | SiyahaMag",
  description: "Modifiez votre offre d'emploi sur SiyahaMag.",
}

interface EditJobPageProps {
  params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const auth = await getAuthenticatedEmployer()
  if (!auth) redirect("/connexion")

  const { id } = await params

  const job = await prisma.jobListing.findUnique({
    where: { id },
  })

  if (!job) notFound()

  // Ownership check
  if (job.companyId !== auth.company.id) {
    redirect("/employeur/offres")
  }

  // Serialize for client component
  const jobData = {
    id: job.id,
    title: job.title,
    jobCategory: job.jobCategory,
    contractType: job.contractType,
    city: job.city,
    description: job.description,
    skills: job.skills,
    experience: job.experience ?? "",
    salary: job.salary ?? "",
    deadline: job.deadline ? job.deadline.toISOString().split("T")[0] : "",
    status: job.status,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modifier l&apos;offre</h1>
        <p className="text-muted-foreground">
          Modifiez les informations de votre offre d&apos;emploi
        </p>
      </div>
      <JobPostingForm mode="edit" initialData={jobData} />
    </div>
  )
}
