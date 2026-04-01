import { redirect } from "next/navigation"
import { getAuthenticatedCandidate } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CandidateProfileForm } from "@/components/candidate/CandidateProfileForm"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Mon profil | SiyahaMag",
  description: "Gerez votre profil candidat et votre CV.",
}

export default async function CandidateProfilePage() {
  const candidate = await getAuthenticatedCandidate()
  if (!candidate) redirect("/connexion")

  // Fetch full user data with candidate profile
  const user = await prisma.user.findUnique({
    where: { id: candidate.id },
    include: { candidateProfile: true },
  })

  if (!user) redirect("/connexion")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mon profil</h1>
        <p className="text-muted-foreground">
          Gerez vos informations personnelles et votre CV.
        </p>
      </div>

      <CandidateProfileForm
        initialUser={{
          name: user.name,
          email: user.email,
          phone: user.phone ?? "",
          city: user.city ?? "",
        }}
        initialProfile={
          user.candidateProfile
            ? {
                cvUrl: user.candidateProfile.cvUrl ?? "",
                skills: user.candidateProfile.skills ?? [],
                education: user.candidateProfile.education ?? "",
                experiences: user.candidateProfile.experiences
                  ? JSON.stringify(user.candidateProfile.experiences, null, 2)
                  : "",
                availability: user.candidateProfile.availability ?? "IMMEDIATE",
                desiredCity: user.candidateProfile.desiredCity ?? "",
              }
            : null
        }
      />
    </div>
  )
}
