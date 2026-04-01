import Link from "next/link"
import {
  Newspaper,
  Briefcase,
  BarChart3,
  Building2,
  ArrowRight,
  Users,
  TrendingUp,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const KEY_FIGURES = [
  {
    icon: Users,
    value: "15.9M",
    label: "Touristes en 2024",
    color: "text-ocean",
  },
  {
    icon: TrendingUp,
    value: "87.6 Mrd",
    label: "Recettes (MAD)",
    color: "text-oasis",
  },
  {
    icon: Briefcase,
    value: "500+",
    label: "Offres actives",
    color: "text-sahara",
  },
  {
    icon: MapPin,
    value: "12",
    label: "Régions couvertes",
    color: "text-ocean-light",
  },
]

const SECTIONS = [
  {
    href: "/actualites",
    icon: Newspaper,
    title: "Actualités",
    description:
      "Suivez les dernières nouvelles du secteur touristique marocain.",
    color: "bg-ocean-50 text-ocean",
  },
  {
    href: "/emplois",
    icon: Briefcase,
    title: "SiyahaJobs",
    description:
      "Trouvez votre emploi dans le tourisme ou recrutez les meilleurs talents.",
    color: "bg-amber-50 text-sahara",
  },
  {
    href: "/statistiques",
    icon: BarChart3,
    title: "Statistiques",
    description:
      "Consultez les chiffres officiels du tourisme marocain.",
    color: "bg-emerald-50 text-oasis",
  },
  {
    href: "/investissement",
    icon: Building2,
    title: "Investissement",
    description:
      "Découvrez les opportunités d'investissement touristique.",
    color: "bg-sky-50 text-ocean-light",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean via-ocean to-ocean-light text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Le tourisme marocain,{" "}
            <span className="text-sahara-light">tout en un</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Actualités, emploi, statistiques et investissement — la première
            plateforme dédiée au secteur touristique du Maroc.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-sahara hover:bg-sahara/90 text-white"
            >
              <Link href="/emplois">
                <Briefcase className="h-5 w-5 mr-2" />
                Voir les offres d&apos;emploi
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/inscription/employeur">
                Publier une offre
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {KEY_FIGURES.map((figure) => (
              <Card key={figure.label} className="text-center border-0 shadow-sm">
                <CardContent className="pt-6">
                  <figure.icon className={`h-8 w-8 mx-auto ${figure.color}`} />
                  <p className={`mt-2 text-2xl md:text-3xl font-bold ${figure.color}`}>
                    {figure.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {figure.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Explorez nos rubriques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTIONS.map((section) => (
              <Link key={section.href} href={section.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-lg border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div
                      className={`inline-flex p-3 rounded-lg ${section.color}`}
                    >
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold group-hover:text-ocean transition-colors">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ocean-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Créez votre compte gratuitement et accédez à toutes les
            fonctionnalités de SiyahaMag.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ocean hover:bg-ocean/90">
              <Link href="/inscription">
                Je cherche un emploi
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-ocean text-ocean hover:bg-ocean hover:text-white"
            >
              <Link href="/inscription/employeur">
                Je recrute
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
