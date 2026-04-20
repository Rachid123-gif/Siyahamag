import type { Metadata } from "next"
import { SignupCandidateForm } from "@/components/auth/SignupCandidateForm"

export const metadata: Metadata = {
  title: "Inscription Candidat — Postulez aux Offres Tourisme",
  description:
    "Créez votre compte candidat sur SiyahaMag pour postuler aux offres d'emploi dans le tourisme marocain.",
  alternates: {
    canonical: "/inscription",
  },
}

export default function SignupCandidatePage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean">Créer un compte</h1>
          <p className="mt-2 text-muted-foreground">
            Rejoignez SiyahaMag pour postuler aux offres d&apos;emploi
          </p>
        </div>
        <SignupCandidateForm />
      </div>
    </div>
  )
}
