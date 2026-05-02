import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Emploi Tourisme Tanger 2026 : Hôtels, Salaires & Recrutement | SiyahaMag",
  description:
    "Guide complet de l'emploi dans le tourisme et l'hôtellerie à Tanger en 2026 : offres, salaires, marina, croisières, palaces et conseils pour postuler.",
  alternates: {
    canonical: "/guide/emploi-tourisme-tanger-2026",
  },
  openGraph: {
    title: "Emploi Tourisme Tanger 2026 : Offres, Salaires & Hôtels",
    description:
      "Tanger ouvre 18 nouveaux hôtels d'ici 2030. Découvrez les opportunités, salaires et secteurs qui recrutent dans le tourisme tangérois.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1539634936668-ed40b6242b56?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi tourisme tanger",
    "emploi hotel tanger",
    "recrutement hotelier tanger 2026",
    "travail tourisme tanger",
    "offre emploi restauration tanger",
    "salaire hotel tanger",
    "emploi marina tanger",
    "job hotellerie tanger maroc",
    "recrutement croisiere tanger",
    "emploi palace tanger",
    "emploi guide touristique tanger",
    "spa therapeute tanger recrutement",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Emploi Tourisme Tanger 2026 : Le Guide Complet du Marché de l'Emploi",
  description:
    "Guide complet de l'emploi dans le tourisme et l'hôtellerie à Tanger en 2026.",
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
  datePublished: "2026-05-02",
  dateModified: "2026-05-02",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/emploi-tourisme-tanger-2026",
  image:
    "https://images.unsplash.com/photo-1539634936668-ed40b6242b56?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels secteurs touristiques recrutent le plus à Tanger en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les secteurs les plus dynamiques à Tanger en 2026 sont : l'hôtellerie 4 et 5 étoiles autour de la corniche et de la marina (Hilton, Movenpick, Fairmont, Hyatt), la restauration internationale dans la nouvelle zone touristique de Tanger Marina Bay, le secteur croisière au port (escales Costa, MSC, Royal Caribbean), les agences réceptives spécialisées Nord (excursions Tétouan, Chefchaouen, Cap Spartel) et l'événementiel d'affaires en plein essor avec le centre de conventions de Tanger.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le salaire moyen d'un employé d'hôtel à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les salaires à Tanger se situent légèrement en dessous de Marrakech mais au-dessus de la moyenne nationale. Réceptionniste : 5 500 à 11 000 MAD. Chef de cuisine : 16 000 à 38 000 MAD dans un 5 étoiles. Spa thérapeute : 4 500 à 8 500 MAD avec primes. Directeur d'hôtel 5 étoiles : 45 000 à 100 000 MAD. La proximité de l'Espagne attire des profils espagnols, ce qui tire les rémunérations linguistiques vers le haut.",
      },
    },
    {
      "@type": "Question",
      name: "L'espagnol est-il indispensable pour travailler dans le tourisme tangérois ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'espagnol est un atout déterminant à Tanger. Près de 35 % des touristes étrangers viennent d'Espagne via les ferries de Tarifa et Algeciras. Les hôtels de la corniche et les restaurants de Tanger Marina recrutent prioritairement des candidats trilingues français-anglais-espagnol. La maîtrise de l'arabe dialectal reste essentielle pour les échanges avec les fournisseurs locaux et les artisans.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se positionner sur le secteur croisière à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le port de Tanger Ville accueille plus de 180 escales de croisières par an. Les opportunités se concentrent côté agences réceptives (excursions de la journée), terminal passagers (accueil, billetterie), restauration de la médina et boutiques d'artisanat partenaires. Pour postuler, visez Costa Tours, MSC Excursions, Tanger Med Cruises et les opérateurs comme Atlas Ulysse, Crown Tours et Voyages Schwartz. Les pics de recrutement sont mars-avril et septembre.",
      },
    },
    {
      "@type": "Question",
      name: "Quels diplômes sont reconnus dans l'hôtellerie tangéroise ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les diplômes les plus appréciés sont ceux de l'Institut Spécialisé de Technologie Appliquée Hôtellerie et Tourisme de Tanger (ISTAHT Tanger), de l'Institut Supérieur International de Tourisme de Tanger (ISITT, école nationale de référence), les BTS hôtellerie-restauration espagnols et français, ainsi que les certifications internationales Vatel, Glion et Cordon Bleu. Une expérience dans un hôtel de la Costa del Sol espagnole est très valorisée.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il une saisonnalité forte à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tanger connaît une saisonnalité plus marquée que Marrakech mais plus douce qu'Agadir. Haute saison : juin à septembre (tourisme balnéaire et MRE), avril-mai et octobre (tourisme culturel européen). Pic absolu : juillet-août avec le retour massif des Marocains résidant à l'étranger. Basse saison : novembre à février, où les hôtels d'affaires prennent le relais grâce à la zone industrielle Tanger Med. Les CDD saisonniers se multiplient d'avril à octobre.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les perspectives d'évolution dans le tourisme tangérois ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tanger offre un parcours de carrière intéressant grâce à sa proximité avec l'Espagne. Beaucoup de cadres alternent missions au Maroc et en Andalousie. Un parcours type : commis de cuisine (5 500 MAD) → chef de partie (8 500 MAD) → sous-chef (16 000 MAD) → chef exécutif (32 000+ MAD) en 7 à 9 ans. Côté hébergement : réceptionniste → chef de réception → directeur de l'hébergement → directeur général adjoint, avec possibilité de mobilité vers Casablanca, Marrakech ou les filiales européennes des chaînes internationales.",
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
      name: "Emploi Tourisme Tanger 2026",
      item: "https://siyahamag.ma/guide/emploi-tourisme-tanger-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideEmploiTourismeTangerPage() {
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
          { label: "Emploi tourisme Tanger 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide emploi</span>
          <span>/</span>
          <span>Publié le 2 mai 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Emploi Tourisme Tanger 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Porte d&apos;entrée du Maroc depuis l&apos;Europe, Tanger a connu une
          métamorphose spectaculaire en dix ans. Avec{" "}
          <strong>2,3 millions de visiteurs en 2025</strong> et l&apos;ouverture
          imminente de 18 nouveaux hôtels d&apos;ici 2030, la ville du détroit
          s&apos;impose comme l&apos;un des marchés de l&apos;emploi
          touristique les plus dynamiques du Royaume. Ce guide décrypte le
          marché tangérois en 2026 : secteurs porteurs, salaires réels,
          employeurs majeurs et conseils concrets pour décrocher votre poste.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539634936668-ed40b6242b56?w=1200&h=500&fit=crop"
          alt="Vue panoramique de la baie de Tanger et de la corniche"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Tanger, capitale du Nord et porte du détroit, offre un marché de
          l&apos;emploi en plein essor dans le tourisme et l&apos;hôtellerie
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#marche", "Le marché de l'emploi touristique à Tanger"],
            ["#secteurs", "Les secteurs qui recrutent en 2026"],
            ["#postes", "Les postes les plus recherchés"],
            ["#salaires", "Grille des salaires 2026"],
            ["#employeurs", "Les employeurs majeurs à Tanger"],
            ["#competences", "Compétences et formations requises"],
            ["#postuler", "Comment postuler efficacement"],
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

      {/* Chiffres clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: "42 000", label: "Emplois directs", color: "bg-rose-50 border-rose-200" },
          { value: "186", label: "Hôtels classés", color: "bg-amber-50 border-amber-200" },
          { value: "5,4M", label: "Nuitées 2025", color: "bg-emerald-50 border-emerald-200" },
          { value: "+28%", label: "Recrutements 2024-26", color: "bg-violet-50 border-violet-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="marche">Le marché de l&apos;emploi touristique à Tanger</h2>
        <p>
          Tanger occupe une place stratégique dans le tourisme marocain. Sa
          position au croisement de la Méditerranée et de l&apos;Atlantique,
          son port de croisière, sa nouvelle marina et la liaison TGV avec
          Casablanca en font une destination en pleine ascension. Avec
          2,3 millions de visiteurs en 2025 et un objectif de 4 millions à
          l&apos;horizon 2030, la ville bouleverse profondément son marché de
          l&apos;emploi.
        </p>
        <p>
          Le tourisme représente aujourd&apos;hui <strong>près de 28 % de
          l&apos;activité économique</strong> de la région Tanger-Tétouan-Al
          Hoceima, juste derrière l&apos;industrie automobile. On dénombre
          plus de 42 000 emplois directs dans l&apos;hôtellerie, la
          restauration et les services touristiques, sans compter les emplois
          indirects (taxis, guides, artisanat de la médina, prestataires
          marina).
        </p>
        <p>
          L&apos;accueil de matchs de la <strong>Coupe du Monde 2030</strong>
          {" "}au Grand Stade de Tanger (rénové, 75 000 places) a accéléré
          massivement les investissements hôteliers : 18 nouveaux
          établissements 4 et 5 étoiles ouvriront entre 2026 et 2029,
          créant un appel d&apos;air estimé à 6 500 emplois directs
          supplémentaires.
        </p>

        <h2 id="secteurs">Les secteurs qui recrutent en 2026</h2>

        <h3>1. L&apos;hôtellerie haut de gamme et chaînes internationales</h3>
        <p>
          Tanger a vu débarquer la quasi-totalité des grandes chaînes en
          quelques années : Hilton Tanger City Center, Movenpick Hotel &amp;
          Casino Malabata, Fairmont Tazi Palace, Hyatt Place Tanger, Marriott
          en construction. Ces établissements emploient en moyenne{" "}
          <strong>180 à 400 collaborateurs chacun</strong> et recrutent en
          permanence des profils trilingues. Les rémunérations y sont 25 à
          40 % supérieures à la moyenne nationale tangéroise.
        </p>

        <h3>2. Tanger Marina Bay et la restauration internationale</h3>
        <p>
          La marina de Tanger Ville, inaugurée en 2018 et fortement étendue en
          2024, abrite désormais plus de <strong>140 commerces et
          restaurants</strong>. Les enseignes internationales (Eataly, Costa,
          Five Guys), les restaurants gastronomiques et les rooftops
          recrutent activement chefs créatifs, sommeliers, baristas
          spécialisés, chefs de rang formés au service à la française et
          managers de restaurant trilingues.
        </p>

        <h3>3. Le secteur croisière et tourisme nautique</h3>
        <p>
          Tanger Ville accueille en 2026 plus de <strong>185 escales de
          croisière</strong> par an (Costa, MSC, Royal Caribbean, Norwegian).
          Le secteur emploie agents d&apos;accueil au terminal, guides
          excursionnistes (4 à 8 heures de visite par escale), chauffeurs-
          guides, vendeurs sur les sites touristiques (Cap Spartel, Grottes
          d&apos;Hercule). Le yachting de plaisance se développe également
          dans la marina (skippers, hôtesses, mécaniciens).
        </p>

        <h3>4. Le wellness, spa et thalassothérapie</h3>
        <p>
          Tanger développe un positionnement bien-être autour de
          l&apos;eau de mer atlantique et de la spa-thalasso. Le Fairmont
          Tazi Palace, le Hilton et plusieurs centres indépendants
          (Thalasso Cabo Negro étendu) recrutent thérapeutes formés Cidesco,
          ITEC, Phytomer ou Algotherm. Le segment connaît une croissance
          annuelle de 16 % portée par la clientèle espagnole et MRE.
        </p>

        <h3>5. L&apos;événementiel MICE et tourisme d&apos;affaires</h3>
        <p>
          Le centre de conventions de Tanger (capacité 3 000 places) a
          changé la donne. Tanger accueille désormais plus de 80 grands
          événements professionnels par an : congrès médicaux, foires
          industrielles, séminaires d&apos;entreprise. Les hôtels d&apos;affaires
          (Movenpick, Hilton, Andalucia Golf, Mövenpick Casino) recrutent
          coordinateurs MICE, chefs de projet événementiel et chargés de
          banquets bilingues.
        </p>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=900&h=400&fit=crop"
            alt="Marina et baie de Tanger au coucher de soleil"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            Tanger Marina Bay concentre une part croissante des nouveaux
            recrutements en restauration et nautisme
          </figcaption>
        </figure>

        <h2 id="postes">Les postes les plus recherchés à Tanger</h2>

        <h3>Réceptionniste trilingue</h3>
        <p>
          Profil le plus demandé à Tanger en 2026. Maîtrise impérative
          français-anglais-espagnol exigée par 92 % des hôtels 4-5 étoiles
          de la corniche. Salaire : 6 500 à 11 000 MAD selon
          l&apos;établissement, avec primes de pourboires significatives en
          haute saison.
        </p>

        <h3>Chef de partie et chef de cuisine internationale</h3>
        <p>
          Les nouveaux restaurants de Tanger Marina attirent des chefs
          internationaux. Un chef exécutif d&apos;un restaurant gastronomique
          gagne entre 25 000 et 65 000 MAD par mois. Les chefs de partie
          (cuisine méditerranéenne, asiatique, pâtisserie) sont également
          très recherchés : 8 000 à 14 000 MAD avec avantages.
        </p>

        <h3>Coordinateur MICE et chargé de banquets</h3>
        <p>
          Profil pénurique en 2026 avec l&apos;essor du MICE tangérois.
          Coordonne séminaires, congrès, mariages internationaux. Maîtrise
          d&apos;Opera Sales &amp; Catering ou Delphi exigée. Salaire : 12 000
          à 22 000 MAD en hôtel, jusqu&apos;à 35 000 MAD en chef de département.
        </p>

        <h3>Spa thérapeute et spa manager</h3>
        <p>
          Très forte demande dans les spas thalasso. Le spa manager pilote
          les équipes de thérapeutes (12 à 35 personnes), gère les protocoles
          et les revenus. Formation Cidesco ou Steiner exigée. Salaire :
          18 000 à 35 000 MAD selon l&apos;établissement.
        </p>

        <h3>Guide et accompagnateur croisière</h3>
        <p>
          Les agences réceptives de Tanger recrutent activement des guides
          francophones, anglophones et hispanophones pour les escales de
          croisière. Carte professionnelle de guide de tourisme exigée.
          Rémunération : à la journée (450 à 900 MAD) ou en CDI saisonnier
          (8 000 à 14 000 MAD selon les langues).
        </p>

        <h2 id="salaires">Grille des salaires 2026 — Tourisme Tanger</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Poste</th>
                <th className="border border-border p-3 text-left">Hôtel 3 étoiles</th>
                <th className="border border-border p-3 text-left">Hôtel 4 étoiles</th>
                <th className="border border-border p-3 text-left">Hôtel 5 étoiles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium">Réceptionniste trilingue</td>
                <td className="border border-border p-3">5 500 — 7 500 MAD</td>
                <td className="border border-border p-3">7 500 — 10 500 MAD</td>
                <td className="border border-border p-3">10 500 — 14 500 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Chef de réception</td>
                <td className="border border-border p-3">9 500 — 13 500 MAD</td>
                <td className="border border-border p-3">14 000 — 19 500 MAD</td>
                <td className="border border-border p-3">21 000 — 30 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Chef de cuisine</td>
                <td className="border border-border p-3">10 500 — 16 000 MAD</td>
                <td className="border border-border p-3">17 500 — 27 000 MAD</td>
                <td className="border border-border p-3">32 000 — 55 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Spa thérapeute</td>
                <td className="border border-border p-3">4 500 — 6 500 MAD</td>
                <td className="border border-border p-3">6 500 — 8 500 MAD</td>
                <td className="border border-border p-3">8 500 — 12 500 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Coordinateur MICE</td>
                <td className="border border-border p-3">9 000 — 13 000 MAD</td>
                <td className="border border-border p-3">12 000 — 18 000 MAD</td>
                <td className="border border-border p-3">17 000 — 28 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Concierge</td>
                <td className="border border-border p-3">7 000 — 9 500 MAD</td>
                <td className="border border-border p-3">10 500 — 15 000 MAD</td>
                <td className="border border-border p-3">17 000 — 27 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Directeur d&apos;hôtel</td>
                <td className="border border-border p-3">22 000 — 38 000 MAD</td>
                <td className="border border-border p-3">42 000 — 65 000 MAD</td>
                <td className="border border-border p-3">75 000 — 130 000 MAD</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources : SiyahaMag, observations marché 2026. Rémunérations brutes
            mensuelles, hors avantages (logement, repas, primes, pourboires).
            Une prime de 800 à 1 500 MAD par langue supplémentaire (espagnol,
            italien, allemand) est fréquente à Tanger.
          </p>
        </div>

        <h2 id="employeurs">Les employeurs majeurs à Tanger</h2>

        <h3>Palaces et hôtels 5 étoiles</h3>
        <ul>
          <li><strong>Fairmont Tazi Palace Tanger</strong> — Palace de référence, recrutement quasi permanent</li>
          <li><strong>Hilton Tanger City Center</strong> — 280 collaborateurs, gros recruteur en MICE</li>
          <li><strong>Mövenpick Hotel &amp; Casino Malabata</strong> — Combinaison hôtel + casino, profils variés</li>
          <li><strong>Royal Tulip City Center</strong> — Bonne porte d&apos;entrée pour jeunes diplômés</li>
          <li><strong>Hyatt Place Tanger</strong> — Programmes de formation interne reconnus</li>
        </ul>

        <h3>Chaînes 4 étoiles &amp; internationales</h3>
        <ul>
          <li>Kenzi Solazur</li>
          <li>Atlas Almohades Tanger</li>
          <li>Andalucia Golf &amp; Spa</li>
          <li>Ibis Tanger City Center / Free Zone</li>
          <li>El Minzah Hotel (palace historique)</li>
        </ul>

        <h3>Tour-opérateurs et opérateurs croisière</h3>
        <ul>
          <li>Atlas Ulysse Tours (excursions croisière)</li>
          <li>Crown Tours Morocco</li>
          <li>Voyages Schwartz</li>
          <li>Tanger Med Cruises (terminal)</li>
          <li>Costa Excursions / MSC Excursions</li>
        </ul>

        <h2 id="competences">Compétences et formations requises</h2>

        <h3>Formations valorisées localement</h3>
        <ul>
          <li>ISITT — Institut Supérieur International de Tourisme de Tanger (école nationale phare)</li>
          <li>ISTAHT Tanger — Institut Spécialisé Hôtellerie &amp; Tourisme</li>
          <li>OFPPT Tanger — filières hôtellerie-restauration et accueil</li>
          <li>Centres privés : École Hôtelière El Minzah, École Vatel partenariats</li>
        </ul>

        <h3>Formations internationales recherchées</h3>
        <ul>
          <li>Vatel (France, Suisse, Maroc)</li>
          <li>Glion Institute of Higher Education (Suisse)</li>
          <li>Le Cordon Bleu (cuisine et pâtisserie)</li>
          <li>Cidesco / ITEC / Phytomer (esthétique et thalasso)</li>
          <li>BTS et bachelors hôtellerie-restauration espagnols (très valorisés)</li>
        </ul>

        <h3>Compétences linguistiques</h3>
        <p>
          La hiérarchie linguistique idéale en 2026 à Tanger : français
          (indispensable), espagnol (très fortement requis pour 78 % des
          postes en contact clientèle), anglais (incontournable dans les
          chaînes internationales), arabe dialectal (atout fort pour les
          relations fournisseurs), italien et allemand (valorisés sur la
          marina). Les hôtels 5 étoiles testent systématiquement le niveau
          d&apos;anglais et d&apos;espagnol lors des entretiens.
        </p>

        <h2 id="postuler">Comment postuler efficacement à Tanger</h2>

        <ol>
          <li>
            <strong>Soignez votre CV en trois langues</strong> — Format
            européen, photo professionnelle, expérience hôtelière mise en
            avant avec chiffres concrets (taux d&apos;occupation, nombre de
            couverts, score TripAdvisor, langues parlées avec niveau CECRL).
          </li>
          <li>
            <strong>Créez votre profil sur SiyahaMag</strong> — Activez les
            alertes sur Tanger et les types de poste qui vous intéressent.
            Notre plateforme agrège plus de 75 % des offres formelles de la
            ville.
          </li>
          <li>
            <strong>Démarchez la corniche en haute saison</strong> — Pratique
            traditionnelle qui reste très efficace. Présentez-vous en début
            d&apos;après-midi dans les hôtels de la corniche et de Malabata,
            laissez votre CV avec une lettre manuscrite trilingue.
          </li>
          <li>
            <strong>Activez votre LinkedIn</strong> — Les directeurs RH des
            chaînes internationales basés à Tanger sont très actifs sur
            LinkedIn. Suivez les pages officielles et engagez la conversation
            avec leurs publications.
          </li>
          <li>
            <strong>Ciblez les pré-ouvertures</strong> — Les nouveaux hôtels
            recrutent 6 à 9 mois avant leur ouverture. Surveillez
            attentivement les annonces de pré-ouverture (Marriott Tanger,
            extension Fairmont Tazi, nouveaux complexes Coupe du Monde 2030).
          </li>
          <li>
            <strong>Misez sur les langues rares</strong> — L&apos;italien,
            l&apos;allemand et le néerlandais sont des atouts différenciants
            à Tanger. Une certification linguistique récente (DELE, Goethe,
            CILS) booste votre CV de manière spectaculaire.
          </li>
        </ol>

        {/* CTA */}
        <div className="not-prose my-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Prêt à postuler à Tanger ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Accédez aux offres d&apos;emploi tourisme et hôtellerie à Tanger,
            mises à jour quotidiennement par SiyahaMag.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/emplois/tanger"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              Voir les offres à Tanger
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition"
            >
              Créer mon profil candidat
            </Link>
          </div>
        </div>

        <h2 id="faq">Questions fréquentes</h2>

        {faqJsonLd.mainEntity.map((q, i) => (
          <div key={i} className="mb-6">
            <h3 className="font-semibold">{q.name}</h3>
            <p>{q.acceptedAnswer.text}</p>
          </div>
        ))}

        {/* Maillage interne */}
        <div className="not-prose mt-12 pt-8 border-t border-border">
          <h3 className="font-semibold mb-4 text-base">Sur le même thème</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/guide/investissement-hotelier-tanger-2026"
                className="text-primary hover:underline"
              >
                Investissement hôtelier Tanger 2026 — Marina &amp; Coupe du Monde
              </Link>
            </li>
            <li>
              <Link
                href="/guide/emploi-tourisme-casablanca-2026"
                className="text-primary hover:underline"
              >
                Emploi tourisme Casablanca 2026 — Salaires &amp; secteurs
              </Link>
            </li>
            <li>
              <Link
                href="/guide/emploi-tourisme-maroc"
                className="text-primary hover:underline"
              >
                Emploi tourisme Maroc — Le guide général
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  )
}
