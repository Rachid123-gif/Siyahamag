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
  Trophy,
  Hotel,
  Star,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { JsonLd } from "@/components/seo/JsonLd"
import type { Metadata } from "next"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tourisme Maroc — Actualités, Emploi & Investissement | SiyahaMag",
  description:
    "La première plateforme marocaine dédiée au tourisme : actualités du secteur, offres d'emploi hôtellerie et restauration, statistiques et opportunités d'investissement.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tourisme Maroc — Actualités, Emploi & Investissement | SiyahaMag",
    description:
      "Actualités, offres d'emploi, statistiques et investissement — la première plateforme dédiée au secteur touristique du Maroc.",
  },
}

// ── Static data ──────────────────────────────────────────────────────

const KEY_FIGURES = [
  {
    icon: Users,
    value: "15.9M",
    label: "Touristes en 2024",
    color: "text-ocean",
    bg: "bg-ocean-50",
  },
  {
    icon: TrendingUp,
    value: "87.6 Mrd",
    label: "Recettes (MAD)",
    color: "text-oasis",
    bg: "bg-emerald-50",
  },
  {
    icon: Briefcase,
    value: "500+",
    label: "Offres actives",
    color: "text-sahara",
    bg: "bg-amber-50",
  },
  {
    icon: MapPin,
    value: "12",
    label: "Regions couvertes",
    color: "text-ocean-light",
    bg: "bg-sky-50",
  },
]

const ARTICLES = [
  {
    id: "1",
    title: "Les riads de Marrakech : entre tradition et modernite",
    slug: "riads-marrakech-tradition-modernite",
    summary:
      "Decouvrez comment les riads historiques de la medina se reinventent pour seduire une clientele internationale en quete d'authenticite.",
    coverImage:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    category: "Culture & Patrimoine",
    categoryColor: "bg-blue-100 text-blue-800",
    date: "2 avril 2026",
    author: "Amina Benali",
  },
  {
    id: "2",
    title: "Ouverture du nouveau terminal de l'aeroport de Marrakech",
    slug: "nouveau-terminal-aeroport-marrakech",
    summary:
      "Le nouveau terminal T2 vise a tripler la capacite d'accueil de l'aeroport Menara pour accompagner la montee en puissance touristique.",
    coverImage:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=400&fit=crop",
    category: "Investissement",
    categoryColor: "bg-amber-100 text-amber-800",
    date: "2 avril 2026",
    author: "Youssef El Idrissi",
  },
  {
    id: "3",
    title: "La gastronomie marocaine classee patrimoine immateriel",
    slug: "gastronomie-marocaine-patrimoine-immateriel",
    summary:
      "L'UNESCO reconnait officiellement la richesse culinaire du Maroc, un atout majeur pour l'attractivite touristique du Royaume.",
    coverImage:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop",
    category: "Gastronomie",
    categoryColor: "bg-rose-100 text-rose-800",
    date: "2 avril 2026",
    author: "Fatima Zahra Ouali",
  },
  {
    id: "4",
    title: "Coupe du Monde 2030 : le Maroc prepare ses infrastructures",
    slug: "coupe-du-monde-2030-maroc-infrastructures",
    summary:
      "Stades, transports, hebergements : le Maroc accelere ses grands chantiers en vue de la coorganisation du Mondial 2030.",
    coverImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400&fit=crop",
    category: "Projets & Federations",
    categoryColor: "bg-purple-100 text-purple-800",
    date: "2 avril 2026",
    author: "Karim Tazi",
  },
  {
    id: "5",
    title: "Tourisme durable : les eco-lodges du Haut Atlas",
    slug: "tourisme-durable-eco-lodges-haut-atlas",
    summary:
      "Une nouvelle generation d'hebergements ecologiques emerge dans les montagnes de l'Atlas, attirant voyageurs responsables.",
    coverImage:
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&h=400&fit=crop",
    category: "Investissement",
    categoryColor: "bg-amber-100 text-amber-800",
    date: "2 avril 2026",
    author: "Nadia Moussaoui",
  },
  {
    id: "6",
    title: "Record de touristes a Essaouira pendant le festival Gnaoua",
    slug: "record-touristes-essaouira-festival-gnaoua",
    summary:
      "Le festival Gnaoua d'Essaouira attire un nombre record de visiteurs, confirmant le potentiel culturel de la cite des Alizes.",
    coverImage:
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=600&h=400&fit=crop",
    category: "Evenements",
    categoryColor: "bg-purple-100 text-purple-800",
    date: "2 avril 2026",
    author: "Hassan Amrani",
  },
]

const SECTIONS = [
  {
    href: "/actualites",
    icon: Newspaper,
    title: "Actualites",
    description:
      "Suivez les dernieres nouvelles du secteur touristique marocain en temps reel.",
    color: "bg-ocean-50 text-ocean",
  },
  {
    href: "/actualites",
    icon: BarChart3,
    title: "Thematiques",
    description:
      "Explorez nos dossiers par theme : hebergement, transport, gastronomie, evenements.",
    color: "bg-emerald-50 text-oasis",
  },
  {
    href: "/emplois",
    icon: Briefcase,
    title: "Offres d'Emploi",
    description:
      "Trouvez votre emploi dans le tourisme ou recrutez les meilleurs talents du secteur.",
    color: "bg-amber-50 text-sahara",
  },
  {
    href: "/inscription",
    icon: Mail,
    title: "Newsletter",
    description:
      "Recevez chaque semaine le meilleur de l'actualite touristique marocaine.",
    color: "bg-sky-50 text-ocean-light",
  },
]

const BIG_NUMBERS = [
  {
    icon: Users,
    value: "26M",
    label: "touristes vises d'ici 2030",
    color: "text-ocean",
  },
  {
    icon: Trophy,
    value: "2030",
    label: "Coupe du Monde au Maroc",
    color: "text-sahara",
  },
  {
    icon: Hotel,
    value: "+200",
    label: "nouveaux hotels en construction",
    color: "text-oasis",
  },
  {
    icon: Star,
    value: "1er",
    label: "site specialise tourisme + emploi au Maroc",
    color: "text-ocean-light",
  },
]

// ── JSON-LD Schemas ──────────────────────────────────────────────────

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SiyahaMag",
  url: "https://siyahamag.ma",
  description:
    "La première plateforme marocaine dédiée au tourisme : actualités, emploi, statistiques et investissement.",
  inLanguage: "fr",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://siyahamag.ma/emplois?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SiyahaMag",
  url: "https://siyahamag.ma",
  description:
    "Plateforme marocaine combinant média touristique, emploi spécialisé, statistiques et investissement.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "Maroc",
  },
  sameAs: [],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <JsonLd data={[websiteJsonLd, organizationJsonLd]} />

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean via-ocean to-ocean-light py-20 md:py-32">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 border-0 bg-white/15 text-white text-sm px-4 py-1.5 backdrop-blur-sm">
            La plateforme de reference du tourisme marocain
          </Badge>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Le tourisme marocain,{" "}
            <span className="text-sahara-light">tout en un</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            Actualites, emploi, statistiques et investissement — la premiere
            plateforme dediee au secteur touristique du Maroc.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-sahara text-white hover:bg-sahara/90 text-base px-8 py-6 shadow-lg shadow-sahara/30"
            >
              <Link href="/emplois">
                <Briefcase className="mr-2 h-5 w-5" />
                Voir les offres d&apos;emploi
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 text-base px-8 py-6"
            >
              <Link href="/actualites">
                Decouvrir les actualites
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Key Figures Band ─────────────────────────────────────── */}
      <section className="border-b bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {KEY_FIGURES.map((figure) => (
              <div
                key={figure.label}
                className={`flex flex-col items-center rounded-2xl ${figure.bg} p-6 text-center transition-transform hover:scale-105`}
              >
                <figure.icon className={`h-8 w-8 ${figure.color}`} />
                <p
                  className={`mt-3 text-3xl font-bold md:text-4xl ${figure.color}`}
                >
                  {figure.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {figure.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Dernieres Actualites ─────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sahara">
                A la une
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl lg:text-4xl">
                Dernieres Actualites
              </h2>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden text-ocean hover:text-ocean/80 sm:inline-flex"
            >
              <Link href="/actualites">
                Voir toutes les actualites
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className="group block"
              >
                <Card className="h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Cover image */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute left-3 top-3">
                      <Badge
                        className={`${article.categoryColor} border-0 shadow-sm`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-ocean">
                      {article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {article.summary}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
                      <time>{article.date}</time>
                      <span aria-hidden="true">&#183;</span>
                      <span>{article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile "see all" link */}
          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="border-ocean text-ocean"
            >
              <Link href="/actualites">
                Voir toutes les actualites
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Explorez nos rubriques ───────────────────────────────── */}
      <section className="bg-secondary/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-oasis">
              Tout le secteur en un clic
            </p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl lg:text-4xl">
              Explorez nos rubriques
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SECTIONS.map((section) => (
              <Link key={section.title} href={section.href} className="group">
                <Card className="h-full border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex rounded-xl p-3 ${section.color}`}
                    >
                      <section.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-ocean">
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

      {/* ─── Chiffres du secteur ──────────────────────────────────── */}
      <section className="bg-gradient-to-br from-ocean via-ocean to-ocean-light py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-sahara-light">
              Vision 2030
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              Chiffres du secteur
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {BIG_NUMBERS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-transform hover:scale-105"
              >
                <item.icon className="mx-auto h-8 w-8 text-sahara-light" />
                <p className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            Pret a rejoindre la communaute ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Creez votre compte gratuitement et accedez a toutes les
            fonctionnalites de SiyahaMag.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-ocean text-white hover:bg-ocean/90 text-base px-8 py-6 shadow-lg"
            >
              <Link href="/inscription">Je cherche un emploi</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-ocean text-ocean hover:bg-ocean hover:text-white text-base px-8 py-6"
            >
              <Link href="/inscription/employeur">Je recrute</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
