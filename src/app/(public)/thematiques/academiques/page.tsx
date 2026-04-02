import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Recherches academiques — Tourisme au Maroc | SiyahaMag",
  description:
    "Recherches, etudes universitaires et publications academiques sur le tourisme au Maroc.",
}

const ACADEMIC_ARTICLES = [
  {
    id: "a1",
    title: "Impact du tourisme durable sur les communautes rurales du Haut Atlas",
    summary:
      "Etude de l'Universite Cadi Ayyad de Marrakech sur les retombees socio-economiques de l'ecotourisme dans les villages berberes du Haut Atlas.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    date: "12 mars 2026",
    tag: "Ecotourisme",
    university: "Universite Cadi Ayyad",
  },
  {
    id: "a2",
    title: "La gastronomie comme levier d'attractivite touristique au Maroc",
    summary:
      "Publication de l'ISCAE analysant le role de la gastronomie marocaine dans la decision de voyage des touristes europeens et americains.",
    image: "https://images.unsplash.com/photo-1541518763-27a024444965?w=600&h=400&fit=crop",
    date: "5 mars 2026",
    tag: "Gastronomie",
    university: "ISCAE Casablanca",
  },
  {
    id: "a3",
    title: "Transformation digitale des PME touristiques marocaines : etat des lieux 2025",
    summary:
      "Rapport de recherche de l'Universite Mohammed V sur l'adoption des outils numeriques par les petites et moyennes entreprises du secteur touristique.",
    image: "https://images.unsplash.com/photo-1531219572328-a0171b4448a7?w=600&h=400&fit=crop",
    date: "20 fevrier 2026",
    tag: "Digital",
    university: "Universite Mohammed V",
  },
  {
    id: "a4",
    title: "Patrimoine architectural et tourisme culturel : le cas de Fes",
    summary:
      "These de doctorat explorant la relation entre la conservation du patrimoine architectural de la medina de Fes et le developpement du tourisme culturel.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    date: "10 fevrier 2026",
    tag: "Patrimoine",
    university: "Universite Sidi Mohamed Ben Abdellah",
  },
]

export default function AcademiquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-purple-50 text-purple-700">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Academiques</h1>
          <p className="text-muted-foreground">
            Recherches et etudes universitaires sur le tourisme marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ACADEMIC_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href="/thematiques/academiques"
            className="group block"
          >
            <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-purple-100 text-purple-800 border-0">
                    {article.tag}
                  </Badge>
                </div>
              </div>
              <CardContent className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span aria-hidden="true">&#183;</span>
                  <span className="font-medium">{article.university}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
