import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Clock, XCircle } from "lucide-react"

export const metadata = {
  title: "Vérification du compte | SiyahaMag",
  description: "Statut de vérification de votre compte employeur.",
}

export default async function VerificationPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/connexion")

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { company: true },
  })

  if (!dbUser || dbUser.role !== "EMPLOYER" || !dbUser.company) {
    redirect("/connexion")
  }

  const company = dbUser.company

  // If verified, redirect to the employer dashboard
  if (company.verificationStatus === "VERIFIED") {
    redirect("/employeur")
  }

  const isPending = company.verificationStatus === "PENDING"

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            {isPending ? (
              <Clock className="h-8 w-8 text-orange-500" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-xl">
            {isPending
              ? "Vérification en cours"
              : "Demande rejetée"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {isPending ? (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Votre compte est en cours de vérification. Nous vous notifierons
                par email une fois le processus terminé.
              </p>
              <p className="text-sm text-muted-foreground">
                La vérification prend généralement 24 à 48 heures ouvrables.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Votre demande a été rejetée.
              </p>
              {company.rejectionReason && (
                <div className="rounded-lg bg-destructive/10 p-4 text-left text-sm">
                  <p className="font-medium text-destructive">Raison :</p>
                  <p className="mt-1 text-destructive/90">
                    {company.rejectionReason}
                  </p>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Contactez-nous à{" "}
                <a
                  href="mailto:contact@siyahamag.com"
                  className="text-primary hover:underline"
                >
                  contact@siyahamag.com
                </a>{" "}
                pour plus d&apos;informations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
