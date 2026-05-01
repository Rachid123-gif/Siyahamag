import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Emploi Tourisme Marrakech 2026 : Offres, Salaires & Riads | SiyahaMag",
  description:
    "Guide complet de l'emploi dans le tourisme et l'hôtellerie à Marrakech en 2026 : offres, salaires, riads, palaces, restauration et conseils pour postuler.",
  alternates: {
    canonical: "/guide/emploi-tourisme-marrakech-2026",
  },
  openGraph: {
    title: "Emploi Tourisme Marrakech 2026 : Offres, Salaires & Secteurs",
    description:
      "Marrakech recrute massivement dans les riads, palaces, restauration et tourisme expérientiel. Découvrez les opportunités et salaires pour 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi tourisme marrakech",
    "emploi hotel marrakech",
    "emploi riad marrakech",
    "recrutement hotelier marrakech 2026",
    "travail tourisme marrakech",
    "offre emploi restauration marrakech",
    "salaire hotel marrakech",
    "emploi palace marrakech",
    "job hotellerie marrakech",
    "recrutement marrakech maroc tourisme",
    "emploi guide marrakech",
    "spa therapeute marrakech recrutement",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Emploi Tourisme Marrakech 2026 : Guide Complet des Opportunités",
  description:
    "Guide complet de l'emploi dans le tourisme et l'hôtellerie à Marrakech en 2026.",
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
  datePublished: "2026-05-01",
  dateModified: "2026-05-01",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/emploi-tourisme-marrakech-2026",
  image:
    "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels secteurs touristiques recrutent le plus à Marrakech en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les secteurs les plus dynamiques à Marrakech sont : l'hôtellerie haut de gamme (riads de charme, palaces 5 étoiles tels que La Mamounia, Royal Mansour, Selman, Mandarin Oriental), la restauration gastronomique de la Médina et de Guéliz, les spas et le wellness (segment en très forte croissance), les agences réceptives (excursions, randonnées Atlas, désert Agafay) et l'événementiel haut de gamme (mariages internationaux, séminaires d'entreprise).",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le salaire moyen d'un employé d'hôtel à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le salaire moyen varie fortement selon le poste et la catégorie d'établissement. Réceptionniste : 5 000 à 12 000 MAD. Chef de cuisine : 18 000 à 45 000 MAD dans un palace. Spa thérapeute : 4 500 à 9 000 MAD avec primes. Directeur d'hôtel 5 étoiles : 50 000 à 120 000 MAD avec avantages (logement, véhicule). Les pourboires dans les palaces représentent souvent 30 à 50 % du salaire net.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il parler plusieurs langues pour travailler à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, le multilinguisme est un avantage déterminant à Marrakech. Le français reste la langue de travail principale. L'anglais est devenu indispensable dans les palaces et auprès de la clientèle américaine et britannique. L'espagnol est très utile (clients espagnols, andalous). L'italien et l'allemand sont des atouts précieux dans les riads de charme. La maîtrise de l'arabe dialectal et du berbère ouvre des portes auprès des employeurs locaux.",
      },
    },
    {
      "@type": "Question",
      name: "Comment trouver un emploi dans un riad à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Créez votre profil sur SiyahaMag et activez les alertes 'riad' sur Marrakech. Présentez-vous directement dans la Médina en remettant votre CV au gérant de chaque riad : cette pratique reste très efficace. Les associations de propriétaires de riads (Riads Boutiques de Marrakech) diffusent également des offres. Le réseau personnel reste capital : les recommandations entre gérants pèsent énormément dans le recrutement.",
      },
    },
    {
      "@type": "Question",
      name: "Quels diplômes sont reconnus dans l'hôtellerie marrakchie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les diplômes les plus appréciés sont ceux de l'Institut Spécialisé de Technologie Appliquée Hôtellerie et Tourisme de Marrakech (ISTAHT Marrakech), de l'Institut Supérieur International de Tourisme de Tanger (ISITT), les BTS hôtellerie-restauration français, les certifications Vatel et Cordon Bleu, ainsi que les programmes de formation interne des chaînes Accor, Marriott et Four Seasons. Une expérience dans un palace est valorisée comme un diplôme.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il une saisonnalité forte à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marrakech connaît une saisonnalité moins marquée que les villes côtières mais bien réelle. Hautes saisons : mars-mai et septembre-novembre (climat idéal). Pic absolu : décembre-janvier (fêtes, marché européen). Basse saison : juillet-août (chaleur extrême, baisse des nuitées européennes). Les contrats CDD saisonniers se concentrent en début d'année et avant l'été. Les CDI sont nombreux dans les palaces qui maintiennent un taux d'occupation élevé toute l'année.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les perspectives d'évolution dans le tourisme marrakchi ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marrakech offre d'excellentes perspectives grâce à la concentration de palaces internationaux. Un parcours type : commis de cuisine (5 000 MAD) → chef de partie (8 000 MAD) → sous-chef (15 000 MAD) → chef exécutif (30 000+ MAD) en 8 à 10 ans. Côté hébergement : réceptionniste → chef de réception → directeur de l'hébergement → directeur général adjoint. Plusieurs grandes enseignes proposent une mobilité internationale (Dubaï, Maldives, Paris) pour leurs talents marrakchis.",
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
      name: "Emploi Tourisme Marrakech 2026",
      item: "https://siyahamag.ma/guide/emploi-tourisme-marrakech-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideEmploiTourismeMarrakechPage() {
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
          { label: "Emploi tourisme Marrakech 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide emploi</span>
          <span>/</span>
          <span>Publié le 1er mai 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Emploi Tourisme Marrakech 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Première destination touristique du Maroc avec plus de{" "}
          <strong>3,8 millions de visiteurs en 2025</strong>, Marrakech concentre
          près de 30 % des emplois touristiques du Royaume. De la médina aux
          palaces de la Palmeraie, en passant par la nouvelle hôtellerie de
          Guéliz, la ville ocre offre des opportunités exceptionnelles aux
          professionnels du tourisme. Ce guide décrypte le marché de l&apos;emploi
          marrakchi en 2026 : secteurs porteurs, salaires réels, employeurs
          majeurs et conseils concrets pour décrocher votre poste.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&h=500&fit=crop"
          alt="Vue panoramique de la médina de Marrakech au coucher du soleil"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Marrakech, capitale touristique du Maroc et premier marché de l&apos;emploi
          hôtelier du Royaume
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#marche", "Le marché de l'emploi touristique à Marrakech"],
            ["#secteurs", "Les secteurs qui recrutent en 2026"],
            ["#postes", "Les postes les plus recherchés"],
            ["#salaires", "Grille des salaires 2026"],
            ["#employeurs", "Les employeurs majeurs à Marrakech"],
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
          { value: "78 000", label: "Emplois directs", color: "bg-rose-50 border-rose-200" },
          { value: "412", label: "Hôtels & riads classés", color: "bg-amber-50 border-amber-200" },
          { value: "9,1M", label: "Nuitées 2025", color: "bg-emerald-50 border-emerald-200" },
          { value: "+22%", label: "Recrutements 2024-26", color: "bg-violet-50 border-violet-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="marche">Le marché de l&apos;emploi touristique à Marrakech</h2>
        <p>
          Marrakech occupe une position singulière dans le paysage touristique
          marocain. Avec 3,8 millions de visiteurs en 2025 et un objectif de
          5 millions à l&apos;horizon 2030, la ville ocre est passée du statut
          de destination culturelle saisonnière à celui de hub touristique
          permanent. Cette mutation a profondément transformé son marché de
          l&apos;emploi.
        </p>
        <p>
          Le tourisme représente aujourd&apos;hui <strong>près de 45 % de
          l&apos;activité économique</strong> de la région Marrakech-Safi.
          On dénombre plus de 78 000 emplois directs dans l&apos;hôtellerie,
          la restauration et les services touristiques, sans compter les
          dizaines de milliers d&apos;emplois indirects (artisanat, transport,
          guides, commerces).
        </p>
        <p>
          La préparation de la <strong>Coupe du Monde 2030</strong>, dont
          Marrakech sera l&apos;une des villes hôtes, a accéléré les
          investissements hôteliers : 23 nouveaux établissements 4 et 5 étoiles
          ont ouvert leurs portes entre 2024 et 2026, créant un appel d&apos;air
          considérable pour les profils qualifiés.
        </p>

        <h2 id="secteurs">Les secteurs qui recrutent en 2026</h2>

        <h3>1. Les palaces et l&apos;hôtellerie ultra-luxe</h3>
        <p>
          Marrakech compte la plus forte concentration de palaces du Maghreb :
          La Mamounia, Royal Mansour, Selman, Mandarin Oriental, Four Seasons,
          Fairmont Royal Palm, Amanjena. Ces établissements emploient en moyenne
          <strong> 250 à 600 collaborateurs chacun</strong> et recrutent en
          permanence. Les profils recherchés combinent excellence technique,
          maîtrise de plusieurs langues et sens aigu du service personnalisé.
          Les rémunérations y sont 30 à 50 % supérieures à la moyenne nationale.
        </p>

        <h3>2. Les riads de charme et boutique-hôtels</h3>
        <p>
          Marrakech abrite plus de <strong>1 200 riads</strong>, dont 300
          classés. Ces établissements de petite capacité (8 à 30 chambres) offrent
          un environnement de travail intimiste, idéal pour les professionnels
          souhaitant développer une polyvalence rare. Les postes-clés : gérant
          (manager) de riad, majordome, chef de cuisine traditionnelle, gouvernante.
          Le secteur valorise l&apos;expérience client et la connaissance fine
          de la culture marocaine.
        </p>

        <h3>3. La restauration et la gastronomie</h3>
        <p>
          La scène culinaire marrakchie a explosé ces cinq dernières années.
          Plus de <strong>2 800 restaurants</strong> opèrent dans la ville, dont
          80 établissements gastronomiques de niveau international. Les rooftops
          de la médina (Nomad, Le Salama, La Terrasse des Épices) et les
          restaurants de Guéliz et Hivernage recrutent activement chefs créatifs,
          sommeliers, chefs de rang formés au service à la française et baristas
          expérimentés.
        </p>

        <h3>4. Le wellness, spa et bien-être</h3>
        <p>
          Marrakech est devenue la <strong>capitale du wellness</strong> en
          Afrique du Nord. Hammams traditionnels haut de gamme, spas de palaces,
          retraites yoga et centres holistiques se multiplient. Les profils
          recherchés : thérapeutes formées (Cidesco, ITEC), spa managers,
          praticiens de massage thaï, professeurs de yoga certifiés. Le segment
          connaît une croissance annuelle de 18 %.
        </p>

        <h3>5. Les agences réceptives et l&apos;outdoor</h3>
        <p>
          Marrakech est le point de départ de la majorité des excursions au
          Maroc : Atlas, désert Agafay, vallée d&apos;Ourika, Essaouira, désert
          de Merzouga. Les agences réceptives recrutent guides certifiés,
          accompagnateurs de voyage, chauffeurs-guides anglophones et
          chargés de la relation clientèle B2B avec les tour-opérateurs européens.
        </p>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&h=400&fit=crop"
            alt="Riad de charme dans la Médina de Marrakech"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            Les riads de la Médina concentrent une part importante des emplois
            en hôtellerie indépendante
          </figcaption>
        </figure>

        <h2 id="postes">Les postes les plus recherchés à Marrakech</h2>

        <h3>Manager de riad</h3>
        <p>
          Véritable chef d&apos;orchestre, le manager de riad gère l&apos;ensemble
          des opérations : accueil, ménage, cuisine, comptabilité, marketing
          digital, relations OTA. Polyvalence et trilinguisme français-anglais-arabe
          exigés. Salaire : 9 000 à 18 000 MAD selon la taille de l&apos;établissement,
          souvent assorti d&apos;un logement sur place.
        </p>

        <h3>Spa Manager / Spa Director</h3>
        <p>
          Profil pénurique en 2026. Le spa manager pilote les équipes de
          thérapeutes, optimise les revenus du spa (souvent 8 à 12 % du chiffre
          d&apos;affaires d&apos;un palace), gère les prestations VIP. Formation
          internationale (Cidesco, Steiner) et expérience en palace exigées.
          Salaire : 22 000 à 45 000 MAD selon l&apos;établissement.
        </p>

        <h3>Chef exécutif et chef de partie</h3>
        <p>
          La concurrence entre palaces a fait flamber les rémunérations des
          chefs. Un chef exécutif d&apos;un palace 5 étoiles gagne entre 40 000
          et 90 000 MAD par mois. Les chefs de partie (cuisine froide, chaude,
          pâtisserie) sont également très recherchés : 8 000 à 15 000 MAD avec
          avantages (logement, navette, repas).
        </p>

        <h3>Concierge Clefs d&apos;Or</h3>
        <p>
          Les palaces de Marrakech recrutent activement des concierges
          francophones avec une connaissance intime de la ville. La certification
          Clefs d&apos;Or est le saint graal du métier. Salaire : 15 000 à
          30 000 MAD avec pourboires significatifs.
        </p>

        <h3>Revenue Manager hôtelier</h3>
        <p>
          Profil très rare au Maroc. Maîtrise des PMS Opera, des channel managers
          (D-EDGE, SiteMinder) et des outils de pricing dynamique (IDeaS, Duetto).
          Salaire : 25 000 à 50 000 MAD. La majorité des palaces marrakchis
          recrutent à l&apos;international par manque de profils locaux.
        </p>

        <h2 id="salaires">Grille des salaires 2026 — Tourisme Marrakech</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Poste</th>
                <th className="border border-border p-3 text-left">Riad / 3 étoiles</th>
                <th className="border border-border p-3 text-left">Hôtel 4 étoiles</th>
                <th className="border border-border p-3 text-left">Palace 5 étoiles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium">Réceptionniste</td>
                <td className="border border-border p-3">5 000 — 7 500 MAD</td>
                <td className="border border-border p-3">7 500 — 10 000 MAD</td>
                <td className="border border-border p-3">10 000 — 15 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Chef de réception</td>
                <td className="border border-border p-3">9 000 — 13 000 MAD</td>
                <td className="border border-border p-3">14 000 — 20 000 MAD</td>
                <td className="border border-border p-3">22 000 — 32 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Chef de cuisine</td>
                <td className="border border-border p-3">10 000 — 16 000 MAD</td>
                <td className="border border-border p-3">18 000 — 28 000 MAD</td>
                <td className="border border-border p-3">35 000 — 60 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Spa thérapeute</td>
                <td className="border border-border p-3">4 500 — 6 500 MAD</td>
                <td className="border border-border p-3">6 500 — 9 000 MAD</td>
                <td className="border border-border p-3">8 500 — 13 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Manager de riad</td>
                <td className="border border-border p-3">9 000 — 15 000 MAD</td>
                <td className="border border-border p-3">—</td>
                <td className="border border-border p-3">—</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Concierge</td>
                <td className="border border-border p-3">7 000 — 10 000 MAD</td>
                <td className="border border-border p-3">11 000 — 16 000 MAD</td>
                <td className="border border-border p-3">18 000 — 30 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Directeur d&apos;hôtel</td>
                <td className="border border-border p-3">25 000 — 40 000 MAD</td>
                <td className="border border-border p-3">45 000 — 70 000 MAD</td>
                <td className="border border-border p-3">80 000 — 150 000 MAD</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources : SiyahaMag, observations marché 2026. Rémunérations brutes
            mensuelles, hors avantages (logement, repas, primes, pourboires).
            Les pourboires en palace peuvent représenter 20 à 50 % du salaire net.
          </p>
        </div>

        <h2 id="employeurs">Les employeurs majeurs à Marrakech</h2>

        <h3>Palaces et hôtels 5 étoiles</h3>
        <ul>
          <li><strong>La Mamounia</strong> — 350 collaborateurs, recrutement quasi permanent</li>
          <li><strong>Royal Mansour</strong> — Hôtel de la famille royale, exigences très élevées</li>
          <li><strong>Mandarin Oriental Marrakech</strong> — Programmes de formation interne reconnus</li>
          <li><strong>Four Seasons Marrakech</strong> — Mobilité internationale offerte</li>
          <li><strong>Fairmont Royal Palm</strong> — Gros recruteur en wellness et golf</li>
          <li><strong>Selman Marrakech</strong> — Esprit familial, exigence extrême sur le service</li>
          <li><strong>Amanjena</strong> — Palace ultra-luxe, recrutement très sélectif</li>
        </ul>

        <h3>Chaînes 4 étoiles & internationales</h3>
        <ul>
          <li>Sofitel Marrakech Lounge & Spa</li>
          <li>Hilton Garden Inn Marrakech</li>
          <li>Radisson Blu Marrakech Carré Eden</li>
          <li>Mövenpick Hotel Mansour Eddahbi</li>
          <li>Pullman Marrakech</li>
        </ul>

        <h3>Tour-opérateurs et agences réceptives</h3>
        <ul>
          <li>TUI Maroc (siège régional à Marrakech)</li>
          <li>Marrakech Tours & Excursions</li>
          <li>Sahara Tours International</li>
          <li>FRAM Maroc</li>
        </ul>

        <h2 id="competences">Compétences et formations requises</h2>

        <h3>Formations valorisées localement</h3>
        <ul>
          <li>ISTAHT Marrakech — Institut Spécialisé de Technologie Appliquée Hôtellerie & Tourisme</li>
          <li>OFPPT — filières hôtellerie-restauration et accueil</li>
          <li>Centres privés : Hôtel École Le Marrakchi, École Vatel partenariats</li>
        </ul>

        <h3>Formations internationales recherchées</h3>
        <ul>
          <li>Vatel (France, Suisse, Maroc)</li>
          <li>Glion Institute of Higher Education (Suisse)</li>
          <li>Le Cordon Bleu (cuisine et pâtisserie)</li>
          <li>Cidesco / ITEC (esthétique et spa)</li>
          <li>BTS et Bachelor hôtellerie-restauration européens</li>
        </ul>

        <h3>Compétences linguistiques</h3>
        <p>
          La hiérarchie linguistique idéale en 2026 à Marrakech : français
          (indispensable), anglais (très fortement requis dans les palaces),
          arabe (atout fort), espagnol (très utile), italien et allemand
          (fortement valorisés dans les riads de charme). Les recruteurs des
          palaces testent systématiquement le niveau d&apos;anglais lors des entretiens.
        </p>

        <h2 id="postuler">Comment postuler efficacement à Marrakech</h2>

        <ol>
          <li>
            <strong>Soignez votre CV en français et anglais</strong> — Format
            européen, photo professionnelle, expérience hôtelière mise en avant
            avec chiffres concrets (taux d&apos;occupation, nombre de couverts,
            score TripAdvisor).
          </li>
          <li>
            <strong>Créez votre profil sur SiyahaMag</strong> — Activez les
            alertes sur Marrakech et les types de poste qui vous intéressent.
            Notre plateforme agrège plus de 80 % des offres formelles de la ville.
          </li>
          <li>
            <strong>Démarchez physiquement les riads</strong> — Pratique
            traditionnelle qui reste très efficace. Présentez-vous en début
            d&apos;après-midi, demandez à parler au gérant, laissez votre CV
            avec une lettre manuscrite.
          </li>
          <li>
            <strong>Activez votre LinkedIn</strong> — Les directeurs RH des
            palaces sont très actifs sur LinkedIn. Suivez les pages officielles
            des établissements et engagez la conversation avec leurs publications.
          </li>
          <li>
            <strong>Préparez les entretiens en anglais</strong> — Tous les
            palaces conduisent au moins une partie de l&apos;entretien en anglais.
            Préparez une présentation de 2 minutes et entraînez-vous à répondre
            sur des situations clients difficiles.
          </li>
          <li>
            <strong>Misez sur le réseau</strong> — Le secteur marrakchi
            fonctionne énormément à la cooptation. Cultivez vos relations avec
            les anciens collègues, professeurs, gérants rencontrés.
          </li>
        </ol>

        {/* CTA */}
        <div className="not-prose my-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Prêt à postuler à Marrakech ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Accédez aux offres d&apos;emploi tourisme et hôtellerie à Marrakech,
            mises à jour quotidiennement par SiyahaMag.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/emplois/marrakech"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              Voir les offres à Marrakech
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
                href="/guide/emploi-tourisme-casablanca-2026"
                className="text-primary hover:underline"
              >
                Emploi tourisme Casablanca 2026 — Salaires & secteurs
              </Link>
            </li>
            <li>
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="text-primary hover:underline"
              >
                Investissement hôtelier Marrakech 2026 — Riads & palaces
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
