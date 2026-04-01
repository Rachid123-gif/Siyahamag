import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, BarChart3, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Tableau de bord | SiyahaMag Admin",
}

const PLACEHOLDER_CARDS = [
  {
    title: "Articles",
    description: "Gerez les articles et actualites du site.",
    icon: FileText,
    href: "/admin/articles",
  },
  {
    title: "Utilisateurs",
    description: "Gerez les comptes utilisateurs.",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Statistiques",
    description: "Consultez les indicateurs touristiques.",
    icon: BarChart3,
    href: "/admin/categories",
  },
  {
    title: "Moderation",
    description: "Moderez les offres et annonces.",
    icon: Building2,
    href: "/admin/moderation",
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Tableau de bord administrateur
        </h1>
        <p className="text-sm text-muted-foreground">
          Bienvenue dans l&apos;espace d&apos;administration de SiyahaMag.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium text-muted-foreground">
            Le tableau de bord complet sera disponible prochainement.
          </p>
          <p className="text-sm text-muted-foreground">
            Utilisez la navigation pour acceder aux differentes sections.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
