import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Coupe du Monde 2030 au Maroc : Impact sur le Tourisme et l'Emploi | SiyahaMag",
  description:
    "Découvrez l'impact de la Coupe du Monde FIFA 2030 sur le tourisme et l'emploi au Maroc. Villes hôtes, infrastructures, 50 000+ emplois créés et opportunités d'investissement.",
  alternates: {
    canonical: "/guide/coupe-du-monde-2030-tourisme",
  },
  openGraph: {
    title: "Coupe du Monde 2030 au Maroc : Impact sur le Tourisme et l'Emploi",
    description:
      "Impact de la Coupe du Monde 2030 sur le tourisme marocain : emplois, infrastructures, investissements.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "coupe du monde 2030 maroc",
    "mondial 2030 maroc tourisme",
    "emploi coupe du monde maroc",
    "infrastructure touristique maroc 2030",
    "investissement coupe du monde maroc",
    "villes hotes maroc 2030",
    "hotel coupe du monde maroc",
  ],
}

// ── Table of Contents ────────────────────────────────────────────────

const TOC = [
  { id: "contexte", label: "Contexte : le Maroc co-organise le Mondial 2030" },
  { id: "villes-hotes", label: "Les villes hôtes marocaines" },
  { id: "infrastructures", label: "Les infrastructures en construction" },
  { id: "emploi", label: "L'impact sur l'emploi (50 000+ postes)" },
  { id: "investissement", label: "Les opportunités d'investissement" },
  { id: "calendrier", label: "Calendrier et échéances" },
  { id: "preparation", label: "Comment se préparer dès maintenant" },
  { id: "faq", label: "Questions fréquentes" },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideCoupeDuMonde2030Page() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Coupe du Monde 2030 au Maroc : Impact sur le Tourisme et l'Emploi",
    description:
      "Découvrez l'impact de la Coupe du Monde FIFA 2030 sur le tourisme et l'emploi au Maroc. Villes hôtes, infrastructures et opportunités.",
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
    datePublished: "2026-03-01",
    dateModified: "2026-04-20",
    mainEntityOfPage: "https://siyahamag.ma/guide/coupe-du-monde-2030-tourisme",
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quelles sont les villes hôtes de la Coupe du Monde 2030 au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le Maroc accueillera des matchs dans 6 villes : Casablanca (stade de 115 000 places, finale), Rabat, Marrakech, Tanger, Agadir et Fès. Chaque ville disposera d'un stade aux normes FIFA et d'infrastructures d'accueil modernisées.",
        },
      },
      {
        "@type": "Question",
        name: "Combien d'emplois seront créés par la Coupe du Monde 2030 au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Coupe du Monde 2030 devrait créer plus de 50 000 emplois directs au Maroc dans les secteurs de l'hôtellerie, la restauration, le transport, la sécurité, l'événementiel et les services. Les emplois indirects pourraient atteindre 150 000 à 200 000 postes.",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le budget d'infrastructure du Maroc pour le Mondial 2030 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le Maroc investit environ 52 milliards de dirhams (5 milliards EUR) dans les infrastructures liées au Mondial 2030. Cela comprend la construction et la rénovation de 6 stades, l'extension des réseaux de transport (LGV, autoroutes, tramways), la construction de nouveaux hôtels et la modernisation des aéroports.",
        },
      },
      {
        "@type": "Question",
        name: "Quand auront lieu les matchs au Maroc pour le Mondial 2030 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Coupe du Monde 2030 se déroulera en juin-juillet 2030. Le Maroc co-organisera l'événement avec l'Espagne et le Portugal. Le match d'ouverture et la finale se tiendront au Grand Stade de Casablanca. Le Maroc accueillera environ un tiers des matchs de la compétition.",
        },
      },
      {
        "@type": "Question",
        name: "Comment profiter des opportunités liées au Mondial 2030 au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour profiter des opportunités du Mondial 2030 : formez-vous aux métiers de l'hôtellerie et du tourisme dès maintenant, investissez dans l'immobilier touristique dans les villes hôtes avant la hausse des prix, et positionnez-vous sur les secteurs en croissance (transport, restauration, événementiel, sécurité).",
        },
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Guide", href: "/guide/coupe-du-monde-2030-tourisme" },
          { label: "Coupe du Monde 2030" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide Tourisme</span>
          <span>/</span>
          <span>Mis à jour le 20 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          Coupe du Monde 2030 au Maroc : Impact sur le Tourisme et l&apos;Emploi
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          La Coupe du Monde FIFA 2030, co-organisée par le Maroc, l&apos;Espagne et le Portugal,
          représente une opportunité historique pour le secteur touristique marocain. Avec plus
          de <strong>52 milliards de MAD</strong> d&apos;investissements et <strong>50 000+ emplois</strong>{" "}
          à créer, cet événement va transformer durablement l&apos;économie du pays.
        </p>
      </header>

      {/* Hero image */}
      <div className="rounded-xl overflow-hidden mb-10">
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=500&fit=crop"
          alt="Stade de football - Coupe du Monde 2030 Maroc"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
      </div>

      {/* Key figures banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="rounded-xl border bg-ocean-50 p-4 text-center">
          <p className="text-2xl font-bold text-ocean">6</p>
          <p className="text-xs text-muted-foreground mt-1">Villes hôtes</p>
        </div>
        <div className="rounded-xl border bg-ocean-50 p-4 text-center">
          <p className="text-2xl font-bold text-ocean">52 Mds</p>
          <p className="text-xs text-muted-foreground mt-1">MAD investis</p>
        </div>
        <div className="rounded-xl border bg-ocean-50 p-4 text-center">
          <p className="text-2xl font-bold text-ocean">50 000+</p>
          <p className="text-xs text-muted-foreground mt-1">Emplois directs</p>
        </div>
        <div className="rounded-xl border bg-ocean-50 p-4 text-center">
          <p className="text-2xl font-bold text-ocean">5M+</p>
          <p className="text-xs text-muted-foreground mt-1">Visiteurs attendus</p>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="rounded-xl border bg-muted/30 p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-3">Sommaire</h2>
        <ol className="space-y-2">
          {TOC.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-ocean hover:underline"
              >
                {index + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Article content */}
      <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
        {/* Contexte */}
        <section id="contexte">
          <h2>Contexte : le Maroc co-organise le Mondial 2030</h2>
          <p>
            Le 11 décembre 2023, la FIFA a officiellement attribué l&apos;organisation de la Coupe du
            Monde 2030 à la candidature conjointe <strong>Maroc-Espagne-Portugal</strong>, avec des
            matchs d&apos;ouverture symboliques en Argentine, Paraguay et Uruguay. Pour le Maroc, c&apos;est
            l&apos;aboutissement de décennies de candidatures et une reconnaissance de sa capacité à
            organiser des événements sportifs majeurs.
          </p>
          <p>
            Le Royaume accueillera environ <strong>un tiers des 104 matchs</strong> de la compétition,
            dont le match d&apos;ouverture africain et la <strong>finale au Grand Stade de Casablanca</strong>.
            Cet événement devrait attirer plus de <strong>5 millions de visiteurs</strong> au Maroc pendant
            la durée du tournoi.
          </p>
          <p>
            Au-delà de l&apos;événement sportif, la Coupe du Monde est un accélérateur de développement
            économique. Les investissements en infrastructures, hôtellerie et services auront un
            impact durable bien au-delà de 2030, positionnant le Maroc comme une destination
            touristique de classe mondiale.
          </p>
        </section>

        {/* Villes hôtes */}
        <section id="villes-hotes">
          <h2>Les villes hôtes marocaines</h2>
          <p>
            Six villes marocaines accueilleront des matchs de la Coupe du Monde 2030. Chacune
            bénéficiera d&apos;investissements massifs en infrastructures et en capacité d&apos;accueil.
          </p>

          <h3>Casablanca — Ville de la finale</h3>
          <p>
            La métropole économique du Maroc accueillera la <strong>finale</strong> dans le
            <strong> Grand Stade Hassan II</strong>, un complexe sportif de 115 000 places
            actuellement en construction. C&apos;est le plus grand stade d&apos;Afrique et le troisième
            plus grand au monde. La ville investit massivement dans le transport urbain
            (extension du tramway, nouvelle ligne de métro) et la capacité hôtelière
            (+15 000 chambres prévues).
          </p>
          <p>
            <Link href="/emplois/casablanca" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Casablanca
            </Link>
          </p>

          <h3>Rabat — La capitale</h3>
          <p>
            La capitale administrative accueillera des matchs de phase de groupes et de huitièmes
            de finale au <strong>Stade Moulay Abdellah</strong> rénové (69 000 places). Rabat mise
            sur son nouveau quartier Mohammed VI (Bouregreg) pour accueillir les visiteurs avec
            de nouveaux hôtels, centres commerciaux et espaces culturels.
          </p>

          <h3>Marrakech — La touristique</h3>
          <p>
            Première destination touristique du Maroc, Marrakech accueillera des matchs au
            <strong> Grand Stade de Marrakech</strong> (68 000 places, rénové). La ville dispose
            déjà d&apos;une capacité hôtelière importante mais la renforcera avec 8 000 chambres
            supplémentaires. Le nouvel aéroport de Marrakech (capacité doublée à 18 millions
            de passagers) sera livré en 2029.
          </p>
          <p>
            <Link href="/emplois/marrakech" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Marrakech
            </Link>
          </p>

          <h3>Tanger — La porte de l&apos;Europe</h3>
          <p>
            Située à 14 km de l&apos;Espagne, Tanger accueillera des matchs au nouveau
            <strong> Stade de Tanger</strong> (75 000 places). La ville bénéficie déjà de la
            LGV Al Boraq (Tanger-Casablanca en 2h10) et verra sa capacité hôtelière augmenter
            de 6 000 chambres. Le port Tanger Med permettra aussi l&apos;accueil de croisiéristes.
          </p>
          <p>
            <Link href="/emplois/tanger" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Tanger
            </Link>
          </p>

          <h3>Agadir — Le balnéaire</h3>
          <p>
            La station balnéaire accueillera des matchs au <strong>Stade d&apos;Agadir</strong> rénové
            (55 000 places). La ville profitera de l&apos;événement pour renforcer son positionnement
            de destination balnéaire, avec de nouveaux resorts et la modernisation de sa corniche.
            L&apos;aéroport Al Massira sera agrandi.
          </p>
          <p>
            <Link href="/emplois/agadir" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Agadir
            </Link>
          </p>

          <h3>Fès — La culturelle</h3>
          <p>
            Ville impériale et spirituelle, Fès accueillera des matchs au <strong>Stade de Fès</strong>
            modernisé (52 000 places). La ville mise sur son patrimoine UNESCO pour offrir
            aux visiteurs une expérience culturelle unique en complément du football. De nouveaux
            hôtels de charme et boutiques-hôtels sont en développement dans la médina.
          </p>
          <p>
            <Link href="/emplois/fes" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Fès
            </Link>
          </p>
        </section>

        {/* Infrastructures */}
        <section id="infrastructures">
          <h2>Les infrastructures en construction</h2>
          <p>
            Le programme d&apos;infrastructures du Mondial 2030 est le plus ambitieux de l&apos;histoire
            du Maroc. Il touche tous les secteurs de la mobilité et de l&apos;accueil :
          </p>

          <h3>Stades</h3>
          <ul>
            <li>
              <strong>Grand Stade Hassan II (Casablanca)</strong> — 115 000 places, nouvelle
              construction, livraison prévue fin 2028. Budget : 5 milliards MAD.
            </li>
            <li>
              <strong>5 stades rénovés/agrandis</strong> — Rabat, Marrakech, Tanger, Agadir, Fès.
              Mise aux normes FIFA, capacités augmentées. Budget total : 8 milliards MAD.
            </li>
          </ul>

          <h3>Transport</h3>
          <ul>
            <li>
              <strong>LGV Phase 2</strong> — Extension vers Marrakech (Casablanca-Marrakech en
              1h20 au lieu de 3h). Livraison prévue 2029.
            </li>
            <li>
              <strong>Autoroutes</strong> — Élargissement de l&apos;axe nord-sud, nouvelle autoroute
              Fès-Tanger. Budget : 12 milliards MAD.
            </li>
            <li>
              <strong>Aéroports</strong> — Agrandissement de Casablanca Mohammed V, Marrakech
              Ménara, Tanger Ibn Battouta et Agadir Al Massira. Capacité totale +25 millions
              de passagers.
            </li>
            <li>
              <strong>Transports urbains</strong> — Extension des tramways à Casablanca et Rabat,
              bus à haut niveau de service (BHNS) dans les 6 villes hôtes.
            </li>
          </ul>

          <h3>Hôtellerie</h3>
          <ul>
            <li>
              <strong>+50 000 chambres d&apos;hôtel</strong> nouvelles dans les 6 villes hôtes d&apos;ici 2029
            </li>
            <li>
              <strong>Grands groupes impliqués</strong> : Marriott, Hilton, Accor, IHG, Hyatt
              ont annoncé des projets au Maroc
            </li>
            <li>
              <strong>Riads et maisons d&apos;hôtes</strong> — Programme de mise aux normes et de
              classement accéléré pour les structures existantes
            </li>
          </ul>

          <h3>Technologie et services</h3>
          <ul>
            <li>Déploiement de la 5G dans les 6 villes hôtes</li>
            <li>Wi-Fi gratuit dans les zones touristiques et les stades</li>
            <li>Applications de mobilité et de guidage multilingues</li>
            <li>Systèmes de billetterie et de paiement dématérialisés</li>
          </ul>
        </section>

        {/* Impact sur l'emploi */}
        <section id="emploi">
          <h2>L&apos;impact sur l&apos;emploi : 50 000+ postes directs</h2>
          <p>
            La Coupe du Monde 2030 va créer une vague d&apos;emplois sans précédent dans le secteur
            touristique marocain. Les estimations officielles font état de <strong>50 000 à 80 000
            emplois directs</strong> et de <strong>150 000 à 200 000 emplois indirects</strong>.
          </p>

          <h3>Les secteurs qui recrutent le plus</h3>

          <h4>Hôtellerie et hébergement</h4>
          <p>
            Avec 50 000 nouvelles chambres d&apos;hôtel, le besoin en personnel est considérable :
            réceptionnistes, femmes de chambre, concierges, directeurs d&apos;hôtel, revenue managers.
            <strong> Estimation : 20 000 à 25 000 emplois</strong> directs dans l&apos;hôtellerie.
          </p>

          <h4>Restauration</h4>
          <p>
            Les millions de visiteurs attendus vont stimuler massivement la restauration :
            chefs cuisiniers, serveurs, barmans, managers de restaurant.
            <strong> Estimation : 10 000 à 15 000 emplois</strong>.
          </p>

          <h4>Transport et mobilité</h4>
          <p>
            Chauffeurs, pilotes, agents d&apos;aéroport, personnel ferroviaire, logisticiens.
            Le développement des transports urbains génère aussi des emplois permanents.
            <strong> Estimation : 8 000 à 10 000 emplois</strong>.
          </p>

          <h4>Événementiel et sécurité</h4>
          <p>
            Organisation des matchs, Fan Zones, événements culturels, sécurité des sites.
            Ces emplois sont principalement temporaires (pendant l&apos;événement) mais les compétences
            acquises ouvrent des portes durables.
            <strong> Estimation : 5 000 à 8 000 emplois</strong>.
          </p>

          <h4>Guidage et animation</h4>
          <p>
            Guides touristiques, animateurs culturels, interprètes, agents d&apos;accueil.
            La diversité linguistique des visiteurs (arabe, français, anglais, espagnol,
            portugais, allemand) crée une forte demande de profils multilingues.
            <strong> Estimation : 3 000 à 5 000 emplois</strong>.
          </p>

          <h3>Profils les plus recherchés</h3>
          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3 font-semibold">Métier</th>
                  <th className="p-3 font-semibold">Compétences clés</th>
                  <th className="p-3 font-semibold">Salaire estimé</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Directeur d&apos;hôtel</td>
                  <td className="p-3">Management, langues, revenue management</td>
                  <td className="p-3">25 000 - 45 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Revenue Manager</td>
                  <td className="p-3">Data, pricing, logiciels PMS</td>
                  <td className="p-3">15 000 - 28 000 MAD</td>
                </tr>
                <tr>
                  <td className="p-3">Chef cuisinier international</td>
                  <td className="p-3">Cuisine multi-culturelle, HACCP, gestion</td>
                  <td className="p-3">12 000 - 25 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Réceptionniste trilingue</td>
                  <td className="p-3">3 langues minimum, Opera PMS, service</td>
                  <td className="p-3">6 000 - 10 000 MAD</td>
                </tr>
                <tr>
                  <td className="p-3">Coordinateur événementiel</td>
                  <td className="p-3">Logistique, communication, langues</td>
                  <td className="p-3">10 000 - 18 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Guide touristique certifié</td>
                  <td className="p-3">Histoire, 3+ langues, premiers secours</td>
                  <td className="p-3">8 000 - 15 000 MAD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Consultez dès maintenant les offres d&apos;emploi disponibles sur{" "}
            <Link href="/emplois" className="text-ocean font-medium hover:underline">
              notre portail emploi
            </Link>{" "}
            pour vous positionner en avance.
          </p>
        </section>

        {/* Investissement */}
        <section id="investissement">
          <h2>Les opportunités d&apos;investissement</h2>
          <p>
            La Coupe du Monde 2030 offre des opportunités d&apos;investissement exceptionnelles
            pour les acteurs du tourisme. Voici les secteurs les plus prometteurs :
          </p>

          <h3>Immobilier hôtelier</h3>
          <p>
            La demande en chambres d&apos;hôtel va exploser pendant le Mondial (+5 millions de
            visiteurs en un mois) puis rester structurellement supérieure grâce à la notoriété
            acquise. Investir dans un hôtel, un riad ou une résidence touristique dans une
            ville hôte est un pari sûr à moyen terme.
          </p>
          <p>
            Les prix de l&apos;immobilier dans les zones touristiques des villes hôtes ont déjà
            augmenté de 15 à 25% depuis l&apos;annonce de l&apos;attribution. La hausse devrait se
            poursuivre jusqu&apos;en 2030 et au-delà.
          </p>

          <h3>Restauration et food courts</h3>
          <p>
            Les Fan Zones et zones piétonnes autour des stades seront des emplacements
            commerciaux premium. Les restaurants, food courts et concepts de street food
            adaptés à une clientèle internationale seront très demandés.
          </p>

          <h3>Transport touristique</h3>
          <p>
            Location de voitures, VTC, navettes aéroport-ville, transport de groupes.
            La croissance du trafic aérien (+25 millions de passagers) crée un besoin
            permanent de services de mobilité.
          </p>

          <h3>Technologies et services digitaux</h3>
          <p>
            Applications de réservation, solutions de paiement mobile, plateformes de
            guidage touristique, réalité augmentée pour visites culturelles. Le Maroc
            mise fortement sur la digitalisation de l&apos;expérience touristique.
          </p>

          <h3>Formation et ressources humaines</h3>
          <p>
            Avec 50 000+ emplois à créer, les centres de formation hôtelière, les organismes
            de placement et les agences de recrutement spécialisées dans le tourisme ont
            un avenir prometteur.
          </p>

          <p>
            Découvrez les opportunités sur notre rubrique{" "}
            <Link href="/investissement" className="text-ocean font-medium hover:underline">
              Investissement touristique
            </Link>{" "}
            et suivez l&apos;actualité des projets sur{" "}
            <Link href="/actualites/projets" className="text-ocean font-medium hover:underline">
              Projets &amp; Fédérations
            </Link>.
          </p>
        </section>

        {/* Calendrier */}
        <section id="calendrier">
          <h2>Calendrier et échéances</h2>

          <div className="not-prose my-6">
            <div className="relative border-l-2 border-ocean/30 ml-4 space-y-6">
              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-ocean flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="font-semibold text-foreground">2024-2025 : Lancement des travaux</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Début de la construction du Grand Stade de Casablanca, lancement des appels
                  d&apos;offres pour les rénovations de stades et les extensions aéroportuaires.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-ocean flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="font-semibold text-foreground">2026-2027 : Phase intensive de construction</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Construction des nouveaux hôtels, extension de la LGV vers Marrakech, modernisation
                  des transports urbains. Début des recrutements massifs en BTP puis en hôtellerie.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-ocean flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="font-semibold text-foreground">2028-2029 : Livraison et tests</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Livraison des stades et des hôtels, événements-tests, recrutement et formation
                  du personnel d&apos;accueil, mise en place de la billetterie.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-oasis flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="font-semibold text-foreground">Juin-Juillet 2030 : La Coupe du Monde</p>
                <p className="text-sm text-muted-foreground mt-1">
                  5+ millions de visiteurs, 32 équipes, des dizaines de matchs au Maroc.
                  Match d&apos;ouverture et finale à Casablanca.
                </p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-2.5 top-1 h-5 w-5 rounded-full bg-ocean/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
                <p className="font-semibold text-foreground">2030+ : L&apos;héritage</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Les infrastructures restent et attirent un flux touristique durablement supérieur.
                  L&apos;effet &quot;Mondial&quot; positionne le Maroc comme destination premium pour les
                  10-20 années suivantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Préparation */}
        <section id="preparation">
          <h2>Comment se préparer dès maintenant</h2>

          <h3>Pour les candidats à l&apos;emploi</h3>
          <ul>
            <li>
              <strong>Formez-vous aux langues</strong> — Le trilinguisme (arabe/français/anglais)
              sera le minimum. L&apos;espagnol et le portugais sont des bonus majeurs étant donné
              les co-organisateurs.
            </li>
            <li>
              <strong>Obtenez des certifications</strong> — HACCP, brevet de guide, formation
              en revenue management, certification Opera PMS. Ces qualifications vous
              démarqueront lors des recrutements.
            </li>
            <li>
              <strong>Créez votre profil sur SiyahaMag</strong> — Positionnez-vous dès maintenant
              pour être repéré par les recruteurs. Les meilleurs profils seront contactés en
              premier quand les vagues de recrutement commenceront.
            </li>
            <li>
              <strong>Acquérez de l&apos;expérience</strong> — Même un stage ou un job saisonnier
              dans l&apos;hôtellerie-tourisme vous donnera un avantage décisif.
            </li>
          </ul>

          <h3>Pour les investisseurs</h3>
          <ul>
            <li>
              <strong>Investissez avant la hausse</strong> — Les prix de l&apos;immobilier touristique
              dans les villes hôtes vont continuer à augmenter. Plus vous investissez tôt,
              plus la plus-value sera importante.
            </li>
            <li>
              <strong>Ciblez les villes hôtes</strong> — Casablanca, Rabat, Marrakech, Tanger,
              Agadir et Fès bénéficieront directement de l&apos;afflux de visiteurs.
            </li>
            <li>
              <strong>Pensez à l&apos;après-Mondial</strong> — L&apos;héritage infrastructurel générera
              un flux touristique supérieur pendant des décennies. Investissez dans des
              projets pérennes, pas dans des solutions temporaires.
            </li>
            <li>
              <strong>Explorez les incitations fiscales</strong> — Le gouvernement marocain
              offre des avantages fiscaux aux investisseurs dans le tourisme.
            </li>
          </ul>

          <p>
            <Link href="/inscription" className="text-ocean font-medium hover:underline">
              Créez votre compte SiyahaMag
            </Link>{" "}
            pour accéder aux offres d&apos;emploi et aux opportunités d&apos;investissement liées au
            Mondial 2030.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2>Questions fréquentes</h2>

          <div className="not-prose space-y-4 my-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quelles sont les villes hôtes de la Coupe du Monde 2030 au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le Maroc accueillera des matchs dans 6 villes : Casablanca (stade de 115 000 places,
                finale), Rabat, Marrakech, Tanger, Agadir et Fès. Chaque ville disposera d&apos;un stade
                aux normes FIFA et d&apos;infrastructures d&apos;accueil modernisées.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Combien d&apos;emplois seront créés par la Coupe du Monde 2030 au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                La Coupe du Monde 2030 devrait créer plus de 50 000 emplois directs au Maroc dans les
                secteurs de l&apos;hôtellerie, la restauration, le transport, la sécurité, l&apos;événementiel
                et les services. Les emplois indirects pourraient atteindre 150 000 à 200 000 postes.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quel est le budget d&apos;infrastructure du Maroc pour le Mondial 2030 ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le Maroc investit environ 52 milliards de dirhams (5 milliards EUR) dans les
                infrastructures liées au Mondial 2030. Cela comprend la construction et la rénovation
                de 6 stades, l&apos;extension des réseaux de transport (LGV, autoroutes, tramways), la
                construction de nouveaux hôtels et la modernisation des aéroports.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quand auront lieu les matchs au Maroc pour le Mondial 2030 ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                La Coupe du Monde 2030 se déroulera en juin-juillet 2030. Le Maroc co-organisera
                l&apos;événement avec l&apos;Espagne et le Portugal. Le match d&apos;ouverture et la finale se
                tiendront au Grand Stade de Casablanca. Le Maroc accueillera environ un tiers des
                matchs de la compétition.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Comment profiter des opportunités liées au Mondial 2030 au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour profiter des opportunités du Mondial 2030 : formez-vous aux métiers de l&apos;hôtellerie
                et du tourisme dès maintenant, investissez dans l&apos;immobilier touristique dans les villes
                hôtes avant la hausse des prix, et positionnez-vous sur les secteurs en croissance
                (transport, restauration, événementiel, sécurité).
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div className="mt-12 rounded-xl border bg-gradient-to-r from-ocean to-ocean/80 p-8 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold">
          Préparez-vous pour le Mondial 2030
        </h2>
        <p className="mt-2 text-white/90 max-w-lg mx-auto">
          Ne manquez pas les opportunités créées par la Coupe du Monde 2030. Emploi ou
          investissement, positionnez-vous dès maintenant.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/emplois"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean transition-colors hover:bg-white/90"
          >
            Voir les offres d&apos;emploi
          </Link>
          <Link
            href="/investissement"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Opportunités d&apos;investissement
          </Link>
        </div>
      </div>
    </div>
  )
}
