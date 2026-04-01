import type { Metadata } from "next"
import { SignupEmployerForm } from "@/components/auth/SignupEmployerForm"

export const metadata: Metadata = {
  title: "Inscription employeur",
  description:
    "Créez votre compte employeur sur SiyahaMag pour publier des offres d'emploi dans le tourisme marocain.",
}

export default function SignupEmployerPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean">Espace Employeur</h1>
          <p className="mt-2 text-muted-foreground">
            Créez votre compte entreprise pour publier des offres d&apos;emploi
          </p>
        </div>
        <SignupEmployerForm />
      </div>
    </div>
  )
}
