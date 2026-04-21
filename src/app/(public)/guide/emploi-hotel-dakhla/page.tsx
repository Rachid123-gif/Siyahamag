import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Emploi Hôtel Dakhla 2026 : Offres, Salaires & Conseils | SiyahaMag",
  description:
    "Guide complet pour trouver un emploi dans l'hôtellerie à Dakhla. Offres disponibles, salaires moyens, compétences recherchées et conseils pour décrocher votre poste.",
  alternates: {
    canonical: "/guide/emploi-hotel-dakhla",
  },
  openGraph: {
    title: "Emploi Hôtel Dakhla 2026 : Offres, Salaires & Conseils",
    description:
      "Dakhla recrute ! Découvrez les opportunités d'emploi dans l'hôtellerie et le tourisme à Dakhla, capitale du kite-surf marocain.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi hotel dakhla",
    "travail dakhla tourisme",
    "offre emploi dakhla",
    "hotellerie dakhla",
    "salaire hotel dakhla",
    "recrutement tourisme dakhla",
    "emploi sahara marocain",
    "job dakhla maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Emploi Hôtel Dakhla 2026 : Guide Complet des Opportunités",
  description:
    "Guide complet pour trouver un emploi dans l'hôtellerie à Dakhla — offres, salaires et conseils.",
  author: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  publisher: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  datePublished: "2026-04-21",
  dateModified: "2026-04-21",
  mainEntityOfPage: "https://siyahamag.ma/guide/emploi-hotel-dakhla",
  image:
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels sont les emplois hôteliers disponibles à Dakhla ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "À Dakhla, les postes les plus demandés sont : réceptionniste bilingue (français/anglais/espagnol), guide spécialisé kite-surf et sports nautiques, chef cuisinier spécialisé poissons et fruits de mer, animateur touristique, et responsable activités outdoor. Le boom touristique génère aussi de nombreux postes en management hôtelier.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le salaire moyen dans l'hôtellerie à Dakhla ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les salaires à Dakhla varient entre 4 500 MAD pour un poste de débutant et 22 000 MAD pour un directeur d'établissement. Les guides nautiques et instructeurs kite-surf peuvent atteindre 18 000 à 25 000 MAD en haute saison, avec des pourboires significatifs des touristes européens.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il parler espagnol pour travailler à Dakhla ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'espagnol est un atout majeur à Dakhla en raison de la forte clientèle espagnole et des liens avec les Îles Canaries. La maîtrise de l'espagnol, du français et de l'anglais peut augmenter votre salaire de 30 à 50 % par rapport à un profil unilingue.",
      },
    },
    {
      "@type": "Question",
      name: "Comment postuler aux offres d'emploi hôteliers à Dakhla ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inscrivez-vous gratuitement sur SiyahaMag, créez votre profil candidat avec votre CV et vos certifications (BPJEPS, DUT tourisme, etc.), puis postulez directement aux offres de Dakhla. Activez les alertes emploi pour la ville de Dakhla pour ne manquer aucune opportunité.",
      },
    },
    {
      "@type": "Question",
      name: "Quand est la haute saison touristique à Dakhla ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dakhla bénéficie d'un climat quasi-constant avec deux pics touristiques : novembre à février pour le kite-surf (vents Alizés) et juin à septembre pour la plongée et la pêche sportive. La demande en emplois hôteliers est soutenue toute l'année, avec un pic de recrutement en octobre-novembre.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://siyahamag.ma",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: "https://siyahamag.ma/guide/emploi-tourisme-maroc",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Emploi Hôtel Dakhla",
      item: "https://siyahamag.ma/guide/emploi-hotel-dakhla",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideEmploiHotelDakhlaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Guides", href: "/guide/emploi-tourisme-maroc" },
          { label: "Emploi hôtel Dakhla" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide emploi</span>
          <span>/</span>
          <span>Publié le 21 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Emploi Hôtel Dakhla 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Dakhla s&apos;impose comme l&apos;une des destinations touristiques à la croissance
          la plus rapide au Maroc. Capitale mondiale du kite-surf, cette ville du Sahara
          atlantique attire chaque année plus de 150 000 visiteurs et génère des milliers
          d&apos;emplois dans l&apos;hôtellerie et le tourisme. Voici tout ce qu&apos;il faut
          savoir pour décrocher un poste à Dakhla.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=500&fit=crop"
          alt="Lagune de Dakhla, destination kite-surf Maroc"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          La lagune de Dakhla, haut lieu du tourisme sportif marocain
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">
          Sommaire
        </h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#marche-emploi", "Le marché de l'emploi hôtelier à Dakhla"],
            ["#postes-recherches", "Les postes les plus recherchés"],
            ["#salaires", "Les salaires dans l'hôtellerie dakhlaoise"],
            ["#etablissements", "Principaux établissements qui recrutent"],
            ["#competences", "Compétences et langues requises"],
            ["#trouver-emploi", "Comment trouver un emploi à Dakhla"],
            ["#vivre-dakhla", "Vivre et travailler à Dakhla"],
            ["#faq", "Questions fréquentes"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-primary hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="marche-emploi">Le marché de l&apos;emploi hôtelier à Dakhla</h2>
        <p>
          En 2025, le secteur touristique de Dakhla a généré plus de <strong>8 200 emplois directs</strong>,
          soit une augmentation de 34 % par rapport à 2022. Cette croissance exceptionnelle
          s&apos;explique par plusieurs facteurs convergents :
        </p>
        <ul>
          <li>L&apos;ouverture de <strong>23 nouveaux établissements hôteliers</strong> entre 2023 et 2025</li>
          <li>Le développement du tourisme sportif (kite-surf, windsurf, quad, pêche sportive)</li>
          <li>Les investissements dans la nouvelle marina de Dakhla, inaugurée en 2024</li>
          <li>La montée en gamme de l&apos;offre hôtelière avec l&apos;arrivée de chaînes internationales</li>
          <li>La proximité avec les Îles Canaries (3h de vol) qui facilite le tourisme ibérique</li>
        </ul>
        <p>
          Selon le Conseil Régional du Tourisme de Dakhla-Oued Ed-Dahab, la capacité hôtelière
          a atteint <strong>4 800 lits en 2025</strong> et devrait dépasser les 7 500 lits d&apos;ici
          2028 avec les projets en cours. Ce boom crée une demande structurelle en ressources
          humaines qualifiées, rendant le marché de l&apos;emploi particulièrement favorable
          aux candidats.
        </p>

        <h2 id="postes-recherches">Les postes les plus recherchés à Dakhla</h2>

        <h3>Réceptionniste polyglotte</h3>
        <p>
          Le poste le plus demandé à Dakhla est sans conteste celui de <strong>réceptionniste
          trilingue</strong> (français, espagnol, anglais). La forte clientèle espagnole et
          canarienne exige impérativement la maîtrise de l&apos;espagnol. Les établissements
          offrent souvent le logement et les repas, ce qui rend ces postes particulièrement
          attractifs pour des candidats venant d&apos;autres régions du Maroc.
        </p>

        <h3>Guide nautique et instructeur sports de glisse</h3>
        <p>
          Dakhla étant la capitale mondiale du kite-surf, les guides et instructeurs certifiés
          sont très recherchés d&apos;octobre à mars (saison des vents). Les certifications
          IKO (International Kiteboarding Organization) et RYA (Royal Yachting Association)
          sont fortement valorisées. Ces profils peuvent atteindre des rémunérations de
          <strong>20 000 à 30 000 MAD/mois</strong> en haute saison.
        </p>

        <h3>Chef cuisinier spécialisé fruits de mer</h3>
        <p>
          La richesse des eaux de l&apos;Atlantique Sud fait de Dakhla un haut lieu de la
          gastronomie maritime. Les chefs maîtrisant la cuisine de poissons et crustacés,
          ainsi que la fusion cuisine marocaine/méditerranéenne, sont particulièrement
          appréciés. L&apos;expérience en restauration gastronomique ou brasserie de standing
          est un atout majeur.
        </p>

        <h3>Responsable activités outdoor</h3>
        <p>
          Nouveau profil émergent, le responsable activités outdoor coordonne les excursions
          en quad, les sorties pêche, les sessions de kite, le surf et les bivouacs sahariens.
          Ce poste requiert des compétences en gestion d&apos;équipe, en sécurité et idéalement
          des certifications de premiers secours.
        </p>

        <h3>Animateur touristique</h3>
        <p>
          Les lodges et hôtels de standing recrutent des animateurs pour proposer des programmes
          culturels (musique hassanie, artisanat sahraoui, astronomie dans le désert). La
          maîtrise de langues européennes et une personnalité dynamique sont essentielles.
        </p>

        <h2 id="salaires">Les salaires dans l&apos;hôtellerie dakhlaoise</h2>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Poste</th>
                <th>Salaire bas</th>
                <th>Salaire moyen</th>
                <th>Salaire haut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Réceptionniste</td>
                <td>4 500 MAD</td>
                <td>7 000 MAD</td>
                <td>12 000 MAD</td>
              </tr>
              <tr>
                <td>Instructeur kite-surf</td>
                <td>8 000 MAD</td>
                <td>15 000 MAD</td>
                <td>28 000 MAD*</td>
              </tr>
              <tr>
                <td>Chef cuisinier</td>
                <td>6 000 MAD</td>
                <td>11 000 MAD</td>
                <td>20 000 MAD</td>
              </tr>
              <tr>
                <td>Gouvernante</td>
                <td>4 500 MAD</td>
                <td>6 500 MAD</td>
                <td>9 000 MAD</td>
              </tr>
              <tr>
                <td>Responsable activités</td>
                <td>7 000 MAD</td>
                <td>12 000 MAD</td>
                <td>18 000 MAD</td>
              </tr>
              <tr>
                <td>Directeur d&apos;hôtel</td>
                <td>15 000 MAD</td>
                <td>20 000 MAD</td>
                <td>35 000 MAD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          *Pourboires et commissions non inclus. Haute saison : novembre à février.
        </p>
        <p>
          À noter que la plupart des établissements de Dakhla proposent le <strong>logement
          et la restauration</strong> inclus dans le package de rémunération, ce qui représente
          une économie significative par rapport aux grandes villes.
        </p>

        <h2 id="etablissements">Principaux établissements qui recrutent à Dakhla</h2>
        <p>
          Le tissu hôtelier de Dakhla se divise en plusieurs catégories d&apos;établissements,
          chacun avec ses spécificités en matière de recrutement :
        </p>
        <ul>
          <li>
            <strong>Camps de kite-surf :</strong> Dakhla Attitude, Club Mistral, ION CLUB
            — recrutent principalement instructeurs et guides nautiques
          </li>
          <li>
            <strong>Hôtels balnéaires :</strong> Hôtel Dakhla Club, Calipau Dakhla, Villa
            de Dakhla — recherchent des profils polyvalents en réception et service
          </li>
          <li>
            <strong>Eco-lodges sahariens :</strong> Bivouacs et lodges désertiques qui
            recrutent des animateurs culturels et guides
          </li>
          <li>
            <strong>Marina de Dakhla :</strong> Nouveau pôle en développement avec hôtels,
            restaurants et activités nautiques — forte demande 2026-2028
          </li>
        </ul>

        <h2 id="competences">Compétences et langues requises</h2>

        <h3>Les langues : votre atout principal</h3>
        <p>
          À Dakhla, la maîtrise des langues détermine largement votre niveau de rémunération :
        </p>
        <ul>
          <li><strong>Espagnol :</strong> Indispensable — 60 % des touristes sont hispanophones</li>
          <li><strong>Français :</strong> Obligatoire pour tous les postes</li>
          <li><strong>Anglais :</strong> Très apprécié pour la clientèle internationale</li>
          <li><strong>Hassania :</strong> La langue locale, un plus pour les interactions avec
            la communauté et la clientèle arabe du Golfe</li>
        </ul>

        <h3>Certifications valorisées</h3>
        <ul>
          <li>IKO Level 1 & 2 (kite-surf) — Obligatoire pour les instructeurs</li>
          <li>BPJEPS Voile ou Sports Nautiques</li>
          <li>Certificat de Premier Secours en mer</li>
          <li>BTS Hôtellerie-Restauration ou équivalent</li>
          <li>HACCP (hygiène alimentaire) pour la restauration</li>
        </ul>

        <h2 id="trouver-emploi">Comment trouver un emploi à Dakhla</h2>
        <p>
          Plusieurs canaux existent pour accéder aux offres d&apos;emploi à Dakhla :
        </p>
        <ol>
          <li>
            <strong>SiyahaMag.ma :</strong> La plateforme spécialisée tourisme au Maroc.
            Créez votre profil candidat et{" "}
            <Link href="/emplois/dakhla" className="text-primary hover:underline">
              consultez les offres emploi à Dakhla
            </Link>
            . Activez les alertes emploi pour être notifié en priorité.
          </li>
          <li>
            <strong>Contact direct :</strong> La plupart des établissements de Dakhla
            acceptent les candidatures spontanées, surtout en septembre-octobre avant
            la haute saison.
          </li>
          <li>
            <strong>Réseaux professionnels :</strong> Les groupes Facebook spécialisés
            tourisme Maroc et les forums de kitesurfers sont actifs pour les offres locales.
          </li>
          <li>
            <strong>ANAPEC Dakhla :</strong> L&apos;agence nationale de l&apos;emploi de
            Dakhla organise des forums emploi tourisme en partenariat avec la région.
          </li>
        </ol>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2">Conseil SiyahaMag</h3>
          <p className="text-sm">
            Envoyez votre candidature entre <strong>septembre et octobre</strong> pour
            les postes haute saison (novembre-mars). Pour les postes permanents, la
            période mai-juin est idéale car les établissements se préparent à la saison
            estivale de plongée et pêche.
          </p>
        </div>

        <h2 id="vivre-dakhla">Vivre et travailler à Dakhla</h2>
        <p>
          Travailler à Dakhla, c&apos;est choisir un cadre de vie exceptionnel. La ville
          offre un coût de la vie modéré par rapport à Marrakech ou Casablanca, une
          population accueillante et des paysages à couper le souffle entre désert et
          océan. Le coût moyen d&apos;un logement en colocation tourne autour de
          2 000 à 3 500 MAD/mois, et la majorité des employeurs hôteliers proposent
          le logement en interne.
        </p>
        <p>
          La ville dispose d&apos;une aéroport international avec vols directs vers
          Casablanca, Marrakech, Madrid et Paris, facilitant les retours en famille
          lors des jours de congé. L&apos;infrastructure de santé s&apos;est améliorée
          avec l&apos;ouverture d&apos;une nouvelle clinique privée en 2024.
        </p>

        <p>
          Pour explorer plus d&apos;opportunités dans d&apos;autres villes,
          consultez notre{" "}
          <Link href="/guide/emploi-tourisme-maroc" className="text-primary hover:underline">
            guide national de l&apos;emploi tourisme au Maroc
          </Link>{" "}
          ou les{" "}
          <Link href="/emplois" className="text-primary hover:underline">
            offres d&apos;emploi tourisme en direct
          </Link>
          .
        </p>

        {/* FAQ */}
        <h2 id="faq">Questions fréquentes sur l&apos;emploi hôtelier à Dakhla</h2>

        <div className="space-y-6 not-prose">
          {[
            {
              q: "Quels sont les emplois hôteliers disponibles à Dakhla ?",
              a: "Les postes les plus demandés sont : réceptionniste trilingue, instructeur kite-surf certifié IKO, chef cuisinier fruits de mer, guide nautique, animateur culturel et responsable activités outdoor. Le développement de la marina crée également de nouveaux postes en management.",
            },
            {
              q: "Quel est le salaire moyen dans l'hôtellerie à Dakhla ?",
              a: "Entre 4 500 MAD pour un débutant et 35 000 MAD pour un directeur. Les instructeurs kite-surf certifiés gagnent 15 000 à 28 000 MAD en haute saison. La plupart des postes incluent logement et repas.",
            },
            {
              q: "Faut-il parler espagnol pour travailler à Dakhla ?",
              a: "L'espagnol est quasi-indispensable : 60 % des visiteurs sont hispanophones. Sa maîtrise peut augmenter votre salaire de 30 à 50 %. Le français reste obligatoire et l'anglais est un plus.",
            },
            {
              q: "Comment postuler aux offres d'emploi hôteliers à Dakhla ?",
              a: "Inscrivez-vous sur SiyahaMag, créez votre profil candidat et postulez aux offres de Dakhla. Vous pouvez aussi envoyer des candidatures spontanées aux établissements entre septembre et octobre.",
            },
            {
              q: "Quand est la haute saison touristique à Dakhla ?",
              a: "Dakhla a deux pics : novembre-mars pour le kite-surf (vents Alizés) et juin-septembre pour la plongée et pêche sportive. La demande est soutenue toute l'année, pic de recrutement en octobre.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border rounded-xl p-5">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-muted-foreground text-sm">{a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Prêt à travailler dans l&apos;hôtellerie à Dakhla ?
        </h2>
        <p className="mb-6 opacity-90">
          Des dizaines d&apos;offres vous attendent. Créez votre profil candidat gratuit
          et postulez en quelques clics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inscription"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition"
          >
            Créer mon profil candidat
          </Link>
          <Link
            href="/emplois"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Voir les offres d&apos;emploi
          </Link>
        </div>
      </div>
    </div>
  )
}
