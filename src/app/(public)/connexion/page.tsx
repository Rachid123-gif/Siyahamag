import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte SiyahaMag.",
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean">Se connecter</h1>
          <p className="mt-2 text-muted-foreground">
            Accédez à votre espace SiyahaMag
          </p>
        </div>
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
