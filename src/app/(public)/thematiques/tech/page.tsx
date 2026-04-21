import type { Metadata } from "next"
import Link from "next/link"
import { Cpu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export const metadata: Metadata = {
  title: "Tech & Innovation Touristique Maroc — Digitalisation",
  description:
    "Innovation technologique, digitalisation et solutions numériques pour le tourisme marocain.",
  alternates: {
    canonical: "/thematiques/tech",
  },
}

const TECH_ARTICLES = [
  {
    id: "t1",
    title: "L'intelligence artificielle transforme l'experience client dans les hotels marocains",
    summary:
      "Chatbots, conciergerie virtuelle et recommandations personnalisees : les grands hotels du Maroc adoptent l'IA pour ameliorer le service client.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    date: "15 mars 2026",
    tag: "Intelligence artificielle",
  },
  {
    id: "t2",
    title: "Digitalisation des offices de tourisme : le Maroc mise sur le tout-numerique",
    summary:
      "Bornes interactives, applications mobiles et realite augmentee : les offices de tourisme se reinventent pour seduire les voyageurs connectes.",
    image: "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=600&h=400&fit=crop",
    date: "8 mars 2026",
    tag: "Transformation digitale",
  },
  {
    id: "t3",
    title: "Les startups marocaines du tourisme levent 120 millions MAD en 2025",
    summary:
      "L'ecosysteme TravelTech marocain attire de plus en plus d'investisseurs, avec des solutions innovantes pour la reservation, le transport et l'hebergement.",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    date: "1 mars 2026",
    tag: "TravelTech",
  },
  {
    id: "t4",
    title: "Blockchain et tourisme : vers une certification transparente des hebergements",
    summary:
      "Un projet pilote utilise la blockchain pour certifier la qualite des riads et maisons d'hotes, renforçant la confiance des voyageurs internationaux.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    date: "22 fevrier 2026",
    tag: "Blockchain",
  },
]

export default function TechPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        segments={[
          { label: "Thématiques", href: "/thematiques" },
          { label: "Tech & Innovation" },
        ]}
      />
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex p-3 rounded-lg bg-blue-50 text-blue-700">
          <Cpu className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ocean">Tech & Innovation</h1>
          <p className="text-muted-foreground">
            Innovation technologique et digitalisation du tourisme marocain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {TECH_ARTICLES.map((article) => (
          <Link
            key={article.id}
            href={`/actualites/article/${slugify(article.title)}`}
            className="group block"
          >
            <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-blue-100 text-blue-800 border-0">
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
                <p className="mt-auto pt-2 text-xs text-muted-foreground">
                  {article.date}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
