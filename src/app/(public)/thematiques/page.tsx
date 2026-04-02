import type { Metadata } from "next"
import Link from "next/link"
import { Cpu, Scale, BarChart3, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Thématiques — SiyahaMag",
  description:
    "Explorez nos thématiques spécialisées : tech, réglementation, tableaux de bord et études académiques du secteur touristique marocain.",
}

const THEMATIQUES = [
  {
    href: "/thematiques/tech",
    icon: Cpu,
    title: "Tech",
    description:
      "Innovation technologique, digitalisation et solutions numériques pour le tourisme marocain.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    href: "/thematiques/reglementation",
    icon: Scale,
    title: "Réglementation",
    description:
      "Lois, réglementations, normes et cadre juridique du secteur touristique au Maroc.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    href: "/thematiques/tableaux-de-bord",
    icon: BarChart3,
    title: "Tableaux de bord",
    description:
      "Indicateurs clés, données et analyses pour suivre la performance du tourisme marocain.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/thematiques/academiques",
    icon: GraduationCap,
    title: "Académiques",
    description:
      "Recherches, études universitaires et publications académiques sur le tourisme au Maroc.",
    color: "bg-purple-50 text-purple-700",
  },
]

export default function ThematiquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-ocean">
          Thématiques
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Plongez dans les thématiques spécialisées du tourisme marocain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THEMATIQUES.map((theme) => (
          <Link key={theme.href} href={theme.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-lg border-0 shadow-sm">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${theme.color}`}>
                  <theme.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-xl font-semibold group-hover:text-ocean transition-colors">
                  {theme.title}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {theme.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
