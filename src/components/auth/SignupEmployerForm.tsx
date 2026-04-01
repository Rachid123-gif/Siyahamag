"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import {
  signupEmployerSchema,
  type SignupEmployerInput,
} from "@/lib/validations/auth"
import { COMPANY_SECTORS } from "@/lib/constants"

export function SignupEmployerForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupEmployerInput>({
    resolver: zodResolver(signupEmployerSchema),
  })

  const onSubmit = async (data: SignupEmployerInput) => {
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: "EMPLOYER",
            companyName: data.companyName,
            companyEmail: data.companyEmail,
            ice: data.ice,
            website: data.website,
            city: data.city,
            sector: data.sector,
          },
        },
      })

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("Un compte avec cet email existe déjà.")
        } else {
          setError(authError.message)
        }
        return
      }

      router.push("/connexion?registered=employer")
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 pt-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Info banner */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-ocean-50 text-sm">
            <Building className="h-5 w-5 text-ocean mt-0.5 shrink-0" />
            <p className="text-ocean">
              Votre compte sera vérifié par notre équipe avant activation.
              Munissez-vous de votre ICE et de votre email professionnel.
            </p>
          </div>

          {/* Personal info */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom du responsable *</Label>
            <Input
              id="name"
              placeholder="Ex: Ahmed Benali"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email de connexion *</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 caractères"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Company info */}
          <div className="border-t border-border pt-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              Informations entreprise
            </h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l&apos;entreprise *</Label>
            <Input
              id="companyName"
              placeholder="Ex: Hôtel Atlas Marrakech"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">Email professionnel *</Label>
            <Input
              id="companyEmail"
              type="email"
              placeholder="contact@votre-entreprise.ma"
              {...register("companyEmail")}
            />
            {errors.companyEmail && (
              <p className="text-sm text-destructive">
                {errors.companyEmail.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ice">ICE *</Label>
              <Input
                id="ice"
                placeholder="Ex: 001234567000089"
                {...register("ice")}
              />
              {errors.ice && (
                <p className="text-sm text-destructive">{errors.ice.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                placeholder="Ex: Marrakech"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Site web *</Label>
            <Input
              id="website"
              placeholder="https://www.votre-entreprise.ma"
              {...register("website")}
            />
            {errors.website && (
              <p className="text-sm text-destructive">
                {errors.website.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Secteur d&apos;activité *</Label>
            <select
              id="sector"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...register("sector")}
              defaultValue=""
            >
              <option value="" disabled>
                Sélectionnez un secteur
              </option>
              {COMPANY_SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {errors.sector && (
              <p className="text-sm text-destructive">
                {errors.sector.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-ocean hover:bg-ocean/90"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer mon compte employeur
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-sm text-center">
          <p className="text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="text-ocean hover:underline font-medium">
              Se connecter
            </Link>
          </p>
          <p className="text-muted-foreground">
            Vous cherchez un emploi ?{" "}
            <Link
              href="/inscription"
              className="text-ocean hover:underline font-medium"
            >
              Compte candidat
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
