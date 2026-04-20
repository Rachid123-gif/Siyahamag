import Link from "next/link"
import { MapPin, Building2, BadgeCheck, Banknote, Clock, Briefcase, TrendingUp, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { DEMO_JOBS } from "@/lib/demoData"
import { JOB_CATEGORIES, CONTRACT_TYPES } from "@/lib/constants"

// ── City Data ────────────────────────────────────────────────────────

export const CITY_DATA: Record<string, { name: string; region: string; description: string; image: string; highlights: string[] }> = {
  marrakech: {
    name: "Marrakech",
    region: "Marrakech-Safi",
    description: "Capitale touristique du Maroc, Marrakech offre de nombreuses opportunités dans l'hôtellerie de luxe, la restauration et le guidage touristique.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=400&fit=crop",
    highlights: [
      "Plus de 200 hôtels classés et des milliers de riads emploient en permanence",
      "Destination n°1 du Maroc avec 3 millions de touristes par an",
      "Salaires attractifs dans l'hôtellerie de luxe (palaces 5 étoiles)",
      "Écosystème complet : hébergement, restauration, guidage, animation, spa",
    ],
  },
  agadir: {
    name: "Agadir",
    region: "Souss-Massa",
    description: "Station balnéaire prisée, Agadir recrute dans les resorts, les restaurants de plage et les activités nautiques.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=400&fit=crop",
    highlights: [
      "Première station balnéaire du Maroc avec 300 jours de soleil par an",
      "Forte demande saisonnière de mai à octobre (contrats saisonniers bien rémunérés)",
      "Nombreux resorts all-inclusive qui recrutent en volume",
      "Secteur nautique en plein essor (surf, kitesurf, plongée)",
    ],
  },
  casablanca: {
    name: "Casablanca",
    region: "Casablanca-Settat",
    description: "Capitale économique du Maroc, Casablanca concentre les sièges des grands groupes hôteliers et le tourisme d'affaires.",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=400&fit=crop",
    highlights: [
      "Sièges des grands groupes hôteliers internationaux (Accor, Marriott, Hilton)",
      "Tourisme d'affaires et MICE en forte croissance",
      "Salaires les plus élevés du secteur grâce au coût de la vie urbain",
      "Opportunités de management et de postes stratégiques",
    ],
  },
  fes: {
    name: "Fès",
    region: "Fès-Meknès",
    description: "Ville impériale et spirituelle, Fès recherche des guides touristiques, des artisans et des spécialistes du patrimoine.",
    image: "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=800&h=400&fit=crop",
    highlights: [
      "Médina classée UNESCO — forte demande de guides spécialisés",
      "Secteur des riads-boutiques en pleine expansion",
      "Tourisme culturel et artisanal : un créneau unique au Maroc",
      "Formations locales en patrimoine et conservation",
    ],
  },
  tanger: {
    name: "Tanger",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Porte de l'Afrique sur l'Europe, Tanger connaît un boom hôtelier avec de nombreux projets en cours.",
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=400&fit=crop",
    highlights: [
      "Boom hôtelier : dizaines de nouveaux établissements en construction",
      "Proximité de l'Europe — clientèle internationale à fort pouvoir d'achat",
      "Ville hôte de la Coupe du Monde 2030 — investissements massifs",
      "Secteur spa et bien-être en forte croissance",
    ],
  },
  essaouira: {
    name: "Essaouira",
    region: "Marrakech-Safi",
    description: "Cité des Alizés, Essaouira recrute pour ses riads, ses restaurants et ses activités culturelles et nautiques.",
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=400&fit=crop",
    highlights: [
      "Destination culturelle et balnéaire prisée des Européens",
      "Fort besoin en animation touristique et sports nautiques",
      "Cadre de vie exceptionnel — qualité de vie recherchée par les candidats",
      "Festival Gnaoua et événements culturels créent des emplois saisonniers",
    ],
  },
}

export const CITY_SLUGS = Object.keys(CITY_DATA)

// ── Additional city-specific jobs (generic roles adapted per city) ────

const GENERIC_JOBS_BY_CITY: Record<string, Array<{
  id: string
  title: string
  slug: string
  jobCategory: string
  contractType: string
  city: string
  salary: string
  createdAt: string
  company: { name: string; verified: boolean }
}>> = {
  marrakech: [
    {
      id: "city-mrk-1",
      title: "Concierge de palace",
      slug: "receptionniste-bilingue-marrakech",
      jobCategory: "RECEPTION",
      contractType: "CDI",
      city: "Marrakech",
      salary: "8 000 - 12 000 MAD",
      createdAt: "2026-04-01",
      company: { name: "La Mamounia", verified: true },
    },
    {
      id: "city-mrk-2",
      title: "Sous-chef pâtissier",
      slug: "receptionniste-bilingue-marrakech",
      jobCategory: "CUISINE",
      contractType: "CDI",
      city: "Marrakech",
      salary: "7 000 - 9 000 MAD",
      createdAt: "2026-04-05",
      company: { name: "Four Seasons Marrakech", verified: true },
    },
    {
      id: "city-mrk-3",
      title: "Guide accompagnateur trilingue",
      slug: "receptionniste-bilingue-marrakech",
      jobCategory: "GUIDE",
      contractType: "FREELANCE",
      city: "Marrakech",
      salary: "6 000 - 10 000 MAD",
      createdAt: "2026-04-08",
      company: { name: "Marrakech Insiders", verified: false },
    },
  ],
  agadir: [
    {
      id: "city-agd-1",
      title: "Maître-nageur sauveteur",
      slug: "chef-cuisine-agadir",
      jobCategory: "ANIMATION",
      contractType: "SAISONNIER",
      city: "Agadir",
      salary: "5 000 - 6 500 MAD",
      createdAt: "2026-04-02",
      company: { name: "RIU Tikida Beach", verified: true },
    },
    {
      id: "city-agd-2",
      title: "Serveur(se) restaurant de plage",
      slug: "chef-cuisine-agadir",
      jobCategory: "SERVICE",
      contractType: "SAISONNIER",
      city: "Agadir",
      salary: "4 500 - 6 000 MAD",
      createdAt: "2026-04-06",
      company: { name: "Pure Passion Restaurant", verified: false },
    },
    {
      id: "city-agd-3",
      title: "Moniteur de surf",
      slug: "chef-cuisine-agadir",
      jobCategory: "ANIMATION",
      contractType: "FREELANCE",
      city: "Agadir",
      salary: "5 500 - 8 000 MAD",
      createdAt: "2026-04-10",
      company: { name: "Taghazout Bay Surf", verified: true },
    },
  ],
  casablanca: [
    {
      id: "city-cas-1",
      title: "Revenue Manager",
      slug: "directeur-hotel-casablanca",
      jobCategory: "MANAGEMENT",
      contractType: "CDI",
      city: "Casablanca",
      salary: "15 000 - 22 000 MAD",
      createdAt: "2026-04-03",
      company: { name: "Marriott Casablanca", verified: true },
    },
    {
      id: "city-cas-2",
      title: "Coordinateur événementiel MICE",
      slug: "directeur-hotel-casablanca",
      jobCategory: "MICE",
      contractType: "CDI",
      city: "Casablanca",
      salary: "10 000 - 14 000 MAD",
      createdAt: "2026-04-07",
      company: { name: "Mazagan Beach Resort", verified: true },
    },
    {
      id: "city-cas-3",
      title: "Chef de réception",
      slug: "directeur-hotel-casablanca",
      jobCategory: "RECEPTION",
      contractType: "CDI",
      city: "Casablanca",
      salary: "9 000 - 12 000 MAD",
      createdAt: "2026-04-09",
      company: { name: "Sofitel Tour Blanche", verified: true },
    },
  ],
  fes: [
    {
      id: "city-fes-1",
      title: "Guide spécialisé patrimoine UNESCO",
      slug: "guide-touristique-fes",
      jobCategory: "GUIDE",
      contractType: "FREELANCE",
      city: "Fès",
      salary: "7 000 - 11 000 MAD",
      createdAt: "2026-04-04",
      company: { name: "Fès Culture Tours", verified: false },
    },
    {
      id: "city-fes-2",
      title: "Gérant de riad-boutique",
      slug: "guide-touristique-fes",
      jobCategory: "MANAGEMENT",
      contractType: "CDI",
      city: "Fès",
      salary: "8 000 - 12 000 MAD",
      createdAt: "2026-04-08",
      company: { name: "Riad Fès Relais & Châteaux", verified: true },
    },
    {
      id: "city-fes-3",
      title: "Chef cuisinier cuisine fassi",
      slug: "guide-touristique-fes",
      jobCategory: "CUISINE",
      contractType: "CDI",
      city: "Fès",
      salary: "7 500 - 10 000 MAD",
      createdAt: "2026-04-12",
      company: { name: "Palais Faraj", verified: true },
    },
  ],
  tanger: [
    {
      id: "city-tng-1",
      title: "Thérapeute spa senior",
      slug: "responsable-spa-tanger",
      jobCategory: "BIEN_ETRE",
      contractType: "CDI",
      city: "Tanger",
      salary: "6 000 - 8 000 MAD",
      createdAt: "2026-04-05",
      company: { name: "Banyan Tree Tamouda Bay", verified: true },
    },
    {
      id: "city-tng-2",
      title: "Réceptionniste hôtel 5 étoiles",
      slug: "responsable-spa-tanger",
      jobCategory: "RECEPTION",
      contractType: "CDI",
      city: "Tanger",
      salary: "5 500 - 7 500 MAD",
      createdAt: "2026-04-09",
      company: { name: "Fairmont Tazi Palace", verified: true },
    },
    {
      id: "city-tng-3",
      title: "Barman mixologue",
      slug: "responsable-spa-tanger",
      jobCategory: "SERVICE",
      contractType: "CDD",
      city: "Tanger",
      salary: "5 000 - 7 000 MAD",
      createdAt: "2026-04-11",
      company: { name: "El Minzah Hotel", verified: true },
    },
  ],
  essaouira: [
    {
      id: "city-ess-1",
      title: "Moniteur de kitesurf",
      slug: "animateur-touristique-essaouira",
      jobCategory: "ANIMATION",
      contractType: "SAISONNIER",
      city: "Essaouira",
      salary: "6 000 - 9 000 MAD",
      createdAt: "2026-04-03",
      company: { name: "Ocean Vagabond", verified: true },
    },
    {
      id: "city-ess-2",
      title: "Chef de cuisine fusion",
      slug: "animateur-touristique-essaouira",
      jobCategory: "CUISINE",
      contractType: "CDI",
      city: "Essaouira",
      salary: "8 000 - 11 000 MAD",
      createdAt: "2026-04-07",
      company: { name: "Heure Bleue Palais", verified: true },
    },
    {
      id: "city-ess-3",
      title: "Responsable hébergement riad",
      slug: "animateur-touristique-essaouira",
      jobCategory: "MANAGEMENT",
      contractType: "CDI",
      city: "Essaouira",
      salary: "7 000 - 9 500 MAD",
      createdAt: "2026-04-10",
      company: { name: "Villa Maroc", verified: false },
    },
  ],
}

// ── Component ────────────────────────────────────────────────────────

interface CityJobsPageProps {
  city: string
}

export function CityJobsPage({ city }: CityJobsPageProps) {
  const cityData = CITY_DATA[city]
  if (!cityData) return null

  // Get jobs from DEMO_JOBS for this city
  const cityJobs = DEMO_JOBS.filter(
    (job) => job.city.toLowerCase() === cityData.name.toLowerCase()
  )

  // Get additional generic jobs for this city
  const additionalJobs = GENERIC_JOBS_BY_CITY[city] || []

  // Combine: real DEMO_JOBS first, then generic ones
  const allJobs = [...cityJobs, ...additionalJobs]

  // JSON-LD for the page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Emploi Tourisme ${cityData.name} — Offres Hôtellerie & Restauration`,
    description: cityData.description,
    url: `https://siyahamag.ma/emplois/${city}`,
    isPartOf: {
      "@type": "WebSite",
      name: "SiyahaMag",
      url: "https://siyahamag.ma",
    },
    about: {
      "@type": "City",
      name: cityData.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: cityData.region,
      },
    },
  }

  // Job postings JSON-LD
  const jobPostingsJsonLd = cityJobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt,
    validThrough: job.deadline,
    employmentType: job.contractType,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: cityData.name,
        addressRegion: cityData.region,
        addressCountry: "MA",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "MAD",
      value: { "@type": "QuantitativeValue", value: job.salary, unitText: "MONTH" },
    },
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={jsonLd} />
      <JsonLd data={jobPostingsJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Offres d'emploi", href: "/emplois" },
          { label: `Emploi tourisme ${cityData.name}` },
        ]}
      />

      {/* Hero section with city image */}
      <div className="relative rounded-2xl overflow-hidden mb-10">
        <img
          src={cityData.image}
          alt={`Emploi tourisme ${cityData.name} - Vue de la ville`}
          className="w-full h-64 sm:h-80 object-cover"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{cityData.region}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Emploi tourisme à {cityData.name}
          </h1>
          <p className="mt-2 max-w-2xl text-white/90 text-sm sm:text-base">
            {cityData.description}
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl border bg-card p-4 text-center">
          <Briefcase className="h-5 w-5 text-ocean mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">{allJobs.length}</p>
          <p className="text-xs text-muted-foreground">Offres actives</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Building2 className="h-5 w-5 text-ocean mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">
            {new Set(allJobs.map((j) => j.company.name)).size}
          </p>
          <p className="text-xs text-muted-foreground">Entreprises</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <TrendingUp className="h-5 w-5 text-ocean mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">+15%</p>
          <p className="text-xs text-muted-foreground">Croissance annuelle</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <Users className="h-5 w-5 text-ocean mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">500+</p>
          <p className="text-xs text-muted-foreground">Candidats actifs</p>
        </div>
      </div>

      {/* Job listings */}
      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
          Offres d&apos;emploi à {cityData.name}
        </h2>

        <div className="space-y-4">
          {allJobs.map((job) => {
            const categoryLabel =
              JOB_CATEGORIES[job.jobCategory as keyof typeof JOB_CATEGORIES] ?? job.jobCategory
            const contractLabel =
              CONTRACT_TYPES[job.contractType as keyof typeof CONTRACT_TYPES] ?? job.contractType

            return (
              <Link key={job.id} href={`/emplois/${job.slug}`} className="block">
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex gap-4 py-4">
                    {/* Company icon */}
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                      <Building2 className="size-6 text-muted-foreground" />
                    </div>

                    {/* Job info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                        {job.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <span>{job.company.name}</span>
                        {job.company.verified && (
                          <BadgeCheck className="size-4 text-blue-500" aria-label="Entreprise vérifiée" />
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {job.city}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {contractLabel}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {categoryLabel}
                        </Badge>
                        {job.salary && (
                          <span className="inline-flex items-center gap-1">
                            <Banknote className="size-3.5" />
                            {job.salary}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {new Date(job.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Why work in tourism in this city */}
      <section className="mb-12 rounded-xl border bg-muted/30 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-oasis" />
          Pourquoi travailler dans le tourisme à {cityData.name} ?
        </h2>
        <ul className="space-y-3">
          {cityData.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-ocean text-xs font-bold">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Other cities */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Autres villes qui recrutent
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(CITY_DATA)
            .filter(([slug]) => slug !== city)
            .map(([slug, data]) => (
              <Link
                key={slug}
                href={`/emplois/${slug}`}
                className="rounded-lg border bg-card p-3 text-center transition-colors hover:border-ocean hover:bg-ocean-50"
              >
                <p className="font-medium text-sm text-foreground">{data.name}</p>
                <p className="text-xs text-muted-foreground">{data.region}</p>
              </Link>
            ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-xl border bg-gradient-to-r from-ocean to-ocean/80 p-8 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold">
          Vous cherchez un emploi à {cityData.name} ?
        </h2>
        <p className="mt-2 text-white/90 max-w-lg mx-auto">
          Créez votre profil candidat pour postuler aux offres et recevoir des alertes personnalisées pour {cityData.name}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean transition-colors hover:bg-white/90"
          >
            Créer mon compte
          </Link>
          <Link
            href="/emplois"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Voir toutes les offres
          </Link>
        </div>
      </div>
    </div>
  )
}
