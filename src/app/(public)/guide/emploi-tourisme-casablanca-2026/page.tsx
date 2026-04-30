import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Emploi Tourisme Casablanca 2026 : Offres, Salaires & Secteurs | SiyahaMag",
  description:
    "Guide complet sur l'emploi dans le tourisme et l'hôtellerie à Casablanca en 2026. Secteurs qui recrutent, salaires moyens, compétences recherchées et conseils pour postuler.",
  alternates: {
    canonical: "/guide/emploi-tourisme-casablanca-2026",
  },
  openGraph: {
    title: "Emploi Tourisme Casablanca 2026 : Offres, Salaires & Secteurs",
    description:
      "Casablanca recrute dans le tourisme d'affaires, MICE, hôtellerie et restauration. Découvrez les opportunités et salaires pour 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi tourisme casablanca",
    "emploi hotel casablanca",
    "recrutement hotelier casablanca 2026",
    "travail tourisme casablanca",
    "offre emploi restauration casablanca",
    "salaire hotel casablanca",
    "emploi mice casablanca",
    "tourisme affaires casablanca maroc",
    "job hotellerie casablanca",
    "recrutement casa maroc tourisme",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Emploi Tourisme Casablanca 2026 : Guide Complet des Opportunités",
  description:
    "Guide complet sur l'emploi dans le tourisme et l'hôtellerie à Casablanca en 2026.",
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
  datePublished: "2026-04-30",
  dateModified: "2026-04-30",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/emploi-tourisme-casablanca-2026",
  image:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels sont les secteurs touristiques qui recrutent le plus à Casablanca ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les secteurs les plus dynamiques à Casablanca sont : le tourisme d'affaires (MICE — réunions, incentives, congrès, événements), les hôtels 4 et 5 étoiles internationaux (Hyatt, Sofitel, Marriott, Four Seasons), la restauration gastronomique et les tour-opérateurs spécialisés en voyages d'affaires. Le secteur événementiel autour du complexe Casablanca Finance City génère également de nombreux emplois.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le salaire moyen d'un réceptionniste d'hôtel à Casablanca ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le salaire moyen d'un réceptionniste à Casablanca varie entre 5 500 MAD (débutant dans un 3 étoiles) et 14 000 MAD (hôtel 5 étoiles international avec bilinguisme). Un chef de réception expérimenté peut atteindre 20 000 MAD avec les avantages.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il parler anglais pour travailler dans l'hôtellerie à Casablanca ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'anglais est quasi-obligatoire pour les postes en contact avec la clientèle dans les établissements 4 et 5 étoiles de Casablanca, notamment dans les hôtels d'affaires internationaux. Le français reste la langue de travail interne. L'espagnol et l'arabe classique sont des atouts supplémentaires.",
      },
    },
    {
      "@type": "Question",
      name: "Comment trouver un emploi dans le tourisme à Casablanca ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Créez votre profil sur SiyahaMag et consultez les offres filtrées sur Casablanca. Les hôtels internationaux affichent également leurs postes sur leurs portails carrières. Le réseau professionnel (LinkedIn, associations hôtelières) est particulièrement efficace à Casablanca pour les postes de cadres.",
      },
    },
    {
      "@type": "Question",
      name: "Quels diplômes sont reconnus dans l'hôtellerie casablancaise ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les diplômes de l'Institut Supérieur International de Tourisme de Tanger (ISITT), de l'Institut Spécialisé de Technologie Appliquée Hôtellerie et Tourisme (ISTAHT), les BTS hôtellerie-restauration français reconnus, et les formations des chaînes internationales (Marriott, Accor) sont très appréciés des employeurs casablancais.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les perspectives d'évolution dans l'hôtellerie à Casablanca ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Casablanca offre les meilleures perspectives d'évolution du Maroc grâce à la présence de sièges régionaux de chaînes hôtelières internationales. Un réceptionniste peut évoluer vers chef de réception, puis directeur des hébergements, puis directeur général en 8-12 ans avec les bonnes formations. Plusieurs chaînes proposent des programmes de mobilité internationale.",
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
      name: "Emploi Tourisme Casablanca 2026",
      item: "https://siyahamag.ma/guide/emploi-tourisme-casablanca-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideEmploiTourismeCasablancaPage() {
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
          { label: "Emploi tourisme Casablanca 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide emploi</span>
          <span>/</span>
          <span>Publié le 30 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Emploi Tourisme Casablanca 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Casablanca, capitale économique du Maroc, est aussi la première métropole du pays en
          matière de tourisme d&apos;affaires. Avec plus de <strong>42 000 emplois directs</strong>{" "}
          dans l&apos;hôtellerie, la restauration et les services touristiques, la ville offre
          des opportunités variées pour tous les profils — des jeunes diplômés aux cadres
          expérimentés. Ce guide vous donne toutes les clés pour réussir votre recherche d&apos;emploi
          dans le tourisme casablancais.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&h=500&fit=crop"
          alt="Skyline de Casablanca, capitale économique du Maroc"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Casablanca, hub du tourisme d&apos;affaires et de la grande hôtellerie internationale au Maroc
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#marche-emploi", "Le marché de l'emploi touristique à Casablanca"],
            ["#secteurs", "Les secteurs qui recrutent en 2026"],
            ["#postes", "Les postes les plus recherchés"],
            ["#salaires", "Grille des salaires 2026"],
            ["#etablissements", "Les employeurs majeurs à Casablanca"],
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
          { value: "42 000", label: "Emplois directs", color: "bg-blue-50 border-blue-200" },
          { value: "187", label: "Établissements classifiés", color: "bg-emerald-50 border-emerald-200" },
          { value: "3,2M", label: "Nuitées/an", color: "bg-amber-50 border-amber-200" },
          { value: "+18%", label: "Croissance emplois 2024-26", color: "bg-violet-50 border-violet-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="marche-emploi">Le marché de l&apos;emploi touristique à Casablanca</h2>
        <p>
          Contrairement aux idées reçues, Casablanca n&apos;est pas seulement une ville de business.
          La métropole accueille chaque année <strong>2,5 millions de touristes</strong>, dont
          40 % de visiteurs d&apos;affaires internationaux, faisant d&apos;elle le premier pôle
          de tourisme MICE (Meetings, Incentives, Conferences, Events) du Maroc.
        </p>
        <p>
          En 2026, le secteur touristique casablancais bénéficie d&apos;un contexte favorable :
          la préparation à la Coupe du Monde 2030 a accéléré les investissements dans l&apos;hôtellerie
          haut de gamme, avec l&apos;ouverture de plusieurs établissements de rang international.
          Entre 2024 et 2026, <strong>14 nouveaux hôtels</strong> ont ouvert leurs portes à
          Casablanca, dont 5 établissements 5 étoiles.
        </p>

        <h2 id="secteurs">Les secteurs qui recrutent en 2026</h2>

        <h3>1. L&apos;hôtellerie haut de gamme</h3>
        <p>
          Le segment 4 et 5 étoiles représente le principal vivier d&apos;emplois qualifiés à
          Casablanca. Les grandes chaînes internationales (Marriott, Hyatt, Sofitel, Fairmont,
          Four Seasons) recrutent en continu des profils bilingues et expérimentés pour leurs
          établissements casablancais. Ces employeurs offrent des packages salariaux compétitifs,
          des formations internes et des perspectives de mobilité internationale.
        </p>

        <h3>2. Le tourisme d&apos;affaires et l&apos;événementiel</h3>
        <p>
          Le développement de Casablanca Finance City (CFC) et l&apos;activité de l&apos;Office des
          Changes ont consolidé la position de la ville comme hub régional pour les congrès et
          conventions. Les <strong>travel managers, coordinateurs d&apos;événements et chargés
          de compte MICE</strong> sont particulièrement recherchés. La demande se concentre
          entre septembre et décembre, période des grands congrès africains.
        </p>

        <h3>3. La restauration gastronomique</h3>
        <p>
          Casablanca compte plus de <strong>3 200 établissements de restauration</strong>, dont
          une centaine de restaurants gastronomiques de niveau international. Le quartier
          d&apos;Anfa et la Corniche abritent les enseignes les plus sélectives en matière de
          recrutement. Le boom de la cuisine fusion maroco-internationale génère une forte
          demande en chefs créatifs et en personnel de salle formé au service à la française.
        </p>

        <h3>4. Les tour-opérateurs et agences réceptives</h3>
        <p>
          De nombreux tour-opérateurs internationaux (TUI, Kuoni, Thomas Cook Africa) ont leurs
          bureaux régionaux à Casablanca. Ils recrutent des <strong>agents réceptifs,
          accompagnateurs de voyage et chargés de la relation clients</strong> maîtrisant
          au moins deux langues européennes.
        </p>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&h=400&fit=crop"
            alt="Restaurant gastronomique à Casablanca"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            La restauration gastronomique casablancaise attire des talents de tout le Maroc
          </figcaption>
        </figure>

        <h2 id="postes">Les postes les plus recherchés à Casablanca</h2>

        <h3>Chef de réception (Front Office Manager)</h3>
        <p>
          Poste pivot dans les hôtels 4-5 étoiles, le chef de réception supervise les équipes
          d&apos;accueil, gère les réclamations et optimise le taux d&apos;occupation. Une
          expérience minimum de 3 ans en réception hôtelière internationale et la maîtrise de
          l&apos;anglais sont exigées. Ce poste est l&apos;un des plus difficiles à pourvoir
          à Casablanca en 2026.
        </p>

        <h3>Revenue Manager</h3>
        <p>
          Profil très recherché dans la grande hôtellerie, le revenue manager pilote les
          stratégies tarifaires en temps réel via des outils comme IDeaS ou Duetto. La maîtrise
          des OTA (Booking.com, Expedia) et des systèmes de gestion hôtelière (PMS Opera) est
          indispensable. La pénurie de ce profil au Maroc entraîne des salaires très compétitifs.
        </p>

        <h3>Event Coordinator / Chef de projet MICE</h3>
        <p>
          La montée en puissance de l&apos;événementiel B2B à Casablanca crée une forte demande
          pour des coordinateurs d&apos;événements capables de gérer des budgets importants
          (500 000 à 5 millions MAD par événement) et des délégations internationales.
          L&apos;expérience en gestion de projet et la maîtrise de l&apos;anglais et du français
          sont essentielles.
        </p>

        <h3>Chef cuisinier / Sous-chef</h3>
        <p>
          La restauration haut de gamme casablancaise cherche en permanence des chefs formés
          aux grandes techniques culinaires françaises, capables d&apos;intégrer les produits
          du terroir marocain dans une cuisine créative. Les expériences en établissements
          étoilés ou en palaces (Marrakech, France, Espagne) sont valorisées.
        </p>

        <h3>Directeur commercial hôtelier (Sales Manager)</h3>
        <p>
          Ce profil gère les contrats avec les agences de voyages, les entreprises clientes et
          les opérateurs de tourisme d&apos;affaires. Il nécessite un réseau professionnel solide,
          une expérience commerciale B2B et une parfaite maîtrise de l&apos;anglais.
        </p>

        <h2 id="salaires">Grille des salaires 2026 — Tourisme Casablanca</h2>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Poste</th>
                <th>Junior</th>
                <th>Confirmé</th>
                <th>Senior/Manager</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Réceptionniste</td>
                <td>5 500 MAD</td>
                <td>8 000 MAD</td>
                <td>14 000 MAD</td>
              </tr>
              <tr>
                <td>Chef de réception</td>
                <td>12 000 MAD</td>
                <td>17 000 MAD</td>
                <td>25 000 MAD</td>
              </tr>
              <tr>
                <td>Revenue Manager</td>
                <td>14 000 MAD</td>
                <td>22 000 MAD</td>
                <td>35 000 MAD</td>
              </tr>
              <tr>
                <td>Event Coordinator</td>
                <td>8 000 MAD</td>
                <td>13 000 MAD</td>
                <td>22 000 MAD</td>
              </tr>
              <tr>
                <td>Chef cuisinier</td>
                <td>8 000 MAD</td>
                <td>15 000 MAD</td>
                <td>28 000 MAD</td>
              </tr>
              <tr>
                <td>Sales Manager hôtelier</td>
                <td>10 000 MAD</td>
                <td>18 000 MAD</td>
                <td>30 000 MAD + commissions</td>
              </tr>
              <tr>
                <td>Directeur d&apos;hôtel</td>
                <td>25 000 MAD</td>
                <td>40 000 MAD</td>
                <td>65 000 MAD</td>
              </tr>
              <tr>
                <td>Agent réceptif</td>
                <td>5 500 MAD</td>
                <td>8 500 MAD</td>
                <td>14 000 MAD</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Salaires bruts mensuels — Source : SiyahaMag, données agrégées des offres publiées en 2026.
          Les hôtels 5 étoiles et chaînes internationales sont en haut de fourchette.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2 text-emerald-800">
            Casablanca vs. Marrakech : que choisir ?
          </h3>
          <p className="text-sm text-emerald-700">
            À Casablanca, les salaires des cadres sont en moyenne <strong>15 à 25 % supérieurs</strong>
            à ceux de Marrakech, mais le coût de la vie (logement, transport) est aussi plus élevé.
            Marrakech offre davantage de postes dans le luxe loisir et les palaces, tandis que
            Casablanca domine sur le tourisme d&apos;affaires et les carrières en management international.
          </p>
        </div>

        <h2 id="etablissements">Les employeurs majeurs à Casablanca</h2>
        <p>
          Casablanca abrite les plus grandes enseignes hôtelières mondiales, offrant des
          opportunités de carrière avec mobilité internationale :
        </p>
        <ul>
          <li>
            <strong>Marriott International :</strong> Renaissance Casablanca, Marriott Casa
            Anfa — postes réguliers en réception, revenue et commercial
          </li>
          <li>
            <strong>Accor Group :</strong> Sofitel Casablanca Tour Blanche, Mercure,
            ibis — plusieurs établissements avec programmes de formation Accor Academy
          </li>
          <li>
            <strong>Hyatt Hotels :</strong> Park Hyatt Casablanca (ex-Ritz) — recrutement
            exigeant, forte réputation de formation interne
          </li>
          <li>
            <strong>Fairmont / AccorHotels :</strong> Fairmont Taghazout Bay (siège commercial
            à Casablanca) — postes commerciaux régionaux
          </li>
          <li>
            <strong>Four Seasons :</strong> Four Seasons Hotel Casablanca — ouverture 2024,
            recrutement intensif de profils bilingues expérimentés
          </li>
          <li>
            <strong>Palais des Congrès de Casablanca :</strong> Employeur public important,
            postes en événementiel et coordination
          </li>
        </ul>

        <h2 id="competences">Compétences et formations requises</h2>

        <h3>Formations reconnues</h3>
        <ul>
          <li>
            <strong>ISITT Tanger :</strong> Institut Supérieur International de Tourisme —
            référence nationale pour les profils haut de gamme
          </li>
          <li>
            <strong>ISTAHT Casablanca :</strong> Institut Spécialisé de Technologie Appliquée
            Hôtellerie et Tourisme — formation technique solide
          </li>
          <li>
            <strong>ESITH Casablanca :</strong> École Supérieure des Industries du Textile
            et de l&apos;Habillement — section tourisme et management
          </li>
          <li>
            <strong>Écoles françaises :</strong> BTS Hôtellerie, Bachelor VATEL, EHL —
            très appréciés dans la grande hôtellerie internationale
          </li>
        </ul>

        <h3>Soft skills décisifs à Casablanca</h3>
        <p>
          Dans une métropole internationale comme Casablanca, les compétences comportementales
          font souvent la différence lors des recrutements :
        </p>
        <ul>
          <li>Intelligence émotionnelle et gestion du stress (clientèle d&apos;affaires exigeante)</li>
          <li>Maîtrise des codes de l&apos;étiquette internationale</li>
          <li>Adaptabilité culturelle (clients du Golfe, européens, africains)</li>
          <li>Aisance avec les outils numériques (PMS, CRM, outils de Revenue Management)</li>
          <li>Autonomie et capacité à prendre des décisions rapides</li>
        </ul>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&h=400&fit=crop"
            alt="Hôtel de luxe à Casablanca, hall d'accueil"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            Les grands hôtels internationaux de Casablanca offrent des cadres de travail premium
          </figcaption>
        </figure>

        <h2 id="postuler">Comment postuler efficacement à Casablanca</h2>

        <h3>Optimiser son profil candidat</h3>
        <p>
          À Casablanca, les recruteurs des grands hôtels reçoivent des centaines de candidatures.
          Pour sortir du lot :
        </p>
        <ol>
          <li>
            <strong>Un CV bilingue (français + anglais) :</strong> Indispensable pour les
            établissements internationaux. Format épuré, une page pour les moins de 5 ans
            d&apos;expérience.
          </li>
          <li>
            <strong>Certifications sur le profil SiyahaMag :</strong>{" "}
            <Link href="/inscription" className="text-primary hover:underline">
              Créez votre profil candidat
            </Link>{" "}
            et renseignez vos certifications professionnelles (HACCP, PMS Opera, langues certifiées DALF/IELTS).
          </li>
          <li>
            <strong>Alertes emploi géolocalisées :</strong> Activez les alertes pour Casablanca
            sur SiyahaMag pour recevoir les nouvelles offres en priorité.
          </li>
          <li>
            <strong>Candidatures spontanées en juin-juillet :</strong> Avant les grandes
            saisons d&apos;activité (septembre-décembre), les RH des hôtels casablancais
            constituent leurs réserves de candidats.
          </li>
        </ol>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2">Conseil SiyahaMag</h3>
          <p className="text-sm">
            Pour les postes de cadres à Casablanca, le réseau professionnel est aussi important
            que les candidatures classiques. Rejoignez les associations professionnelles comme
            la FNIH (Fédération Nationale de l&apos;Industrie Hôtelière) et participez aux
            salons touristiques (SIAM, FITUR Maroc) pour créer des contacts directs avec les DRH.
          </p>
        </div>

        <p>
          Pour comparer avec d&apos;autres villes, consultez notre{" "}
          <Link href="/guide/emploi-tourisme-maroc" className="text-primary hover:underline">
            guide national de l&apos;emploi tourisme au Maroc
          </Link>
          {" "}ou notre{" "}
          <Link href="/guide/analyse-marche-tourisme-agadir-2026" className="text-primary hover:underline">
            analyse du marché touristique d&apos;Agadir
          </Link>
          .
        </p>

        {/* FAQ */}
        <h2 id="faq">Questions fréquentes — Emploi tourisme Casablanca</h2>

        <div className="space-y-6 not-prose">
          {[
            {
              q: "Quels sont les secteurs touristiques qui recrutent le plus à Casablanca ?",
              a: "Le tourisme d'affaires (MICE), les hôtels 4-5 étoiles internationaux, la restauration gastronomique et les tour-opérateurs spécialisés B2B. La préparation à la Coupe du Monde 2030 accélère également les recrutements dans l'événementiel.",
            },
            {
              q: "Quel est le salaire moyen d'un réceptionniste d'hôtel à Casablanca ?",
              a: "Entre 5 500 MAD (débutant, 3 étoiles) et 14 000 MAD (hôtel 5 étoiles international, bilingue). Un chef de réception expérimenté peut atteindre 25 000 MAD.",
            },
            {
              q: "Faut-il parler anglais pour travailler dans l'hôtellerie à Casablanca ?",
              a: "Oui, l'anglais est quasi-obligatoire dans les établissements 4-5 étoiles. Le français reste la langue interne. L'espagnol et l'arabe classique sont des atouts supplémentaires valorisés.",
            },
            {
              q: "Comment trouver un emploi dans le tourisme à Casablanca ?",
              a: "Créez votre profil SiyahaMag et filtrez les offres sur Casablanca. Les hôtels internationaux publient sur leurs portails carrières. Le réseau LinkedIn est particulièrement efficace pour les postes cadres.",
            },
            {
              q: "Quels diplômes sont reconnus dans l'hôtellerie casablancaise ?",
              a: "ISITT Tanger, ISTAHT Casablanca, BTS français, Bachelor VATEL et EHL sont très appréciés. Les certifications PMS Opera, HACCP et les diplômes de langue (DALF, IELTS) renforcent votre profil.",
            },
            {
              q: "Quelles sont les perspectives d'évolution dans l'hôtellerie à Casablanca ?",
              a: "Excellentes : Casablanca héberge des sièges régionaux de chaînes internationales. Un réceptionniste peut évoluer vers directeur général en 8-12 ans. Plusieurs chaînes offrent des programmes de mobilité internationale.",
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
          Trouvez votre emploi dans le tourisme à Casablanca
        </h2>
        <p className="mb-6 opacity-90">
          Des dizaines d&apos;offres en hôtellerie, restauration et événementiel à Casablanca.
          Créez votre profil candidat gratuit et postulez en quelques clics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inscription"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition"
          >
            Créer mon profil candidat
          </Link>
          <Link
            href="/emplois/casablanca"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Offres à Casablanca
          </Link>
        </div>
      </div>
    </div>
  )
}
