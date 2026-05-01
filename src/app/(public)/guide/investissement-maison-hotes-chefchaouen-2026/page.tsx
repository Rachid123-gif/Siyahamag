import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Investissement Maison d'Hôtes Chefchaouen 2026 : Guide Complet | SiyahaMag",
  description:
    "Investir dans une maison d'hôtes à Chefchaouen en 2026 : prix, rendements, démarches, fiscalité, retour sur investissement et opportunités dans la perle bleue du Rif.",
  alternates: {
    canonical: "/guide/investissement-maison-hotes-chefchaouen-2026",
  },
  openGraph: {
    title:
      "Investissement Maison d'Hôtes Chefchaouen 2026 : Le Guide Complet",
    description:
      "Chefchaouen attire 1,2M de visiteurs/an. Découvrez les prix, rendements et démarches pour investir dans une maison d'hôtes dans la ville bleue.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1553244998-9bf61eb31a8d?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investissement chefchaouen",
    "maison hotes chefchaouen",
    "acheter maison chefchaouen",
    "rendement maison hotes maroc",
    "prix immobilier chefchaouen 2026",
    "investir tourisme rif",
    "guesthouse chefchaouen",
    "ville bleue maroc investissement",
    "rentabilite location courte duree maroc",
    "ouvrir maison hotes maroc demarches",
    "fiscalite maison hotes maroc",
    "tourisme nord maroc opportunites",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Investissement Maison d'Hôtes Chefchaouen 2026 : Prix, Rendements & Démarches",
  description:
    "Guide complet pour investir dans une maison d'hôtes à Chefchaouen en 2026.",
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
    "https://siyahamag.ma/guide/investissement-maison-hotes-chefchaouen-2026",
  image:
    "https://images.unsplash.com/photo-1553244998-9bf61eb31a8d?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte une maison d'hôtes à Chefchaouen en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les prix varient selon l'emplacement et l'état du bien. Une maison traditionnelle à rénover dans la médina coûte entre 1,2 et 2,5 millions de MAD pour 200 à 350 m². Une maison déjà rénovée et opérationnelle en maison d'hôtes (5 à 8 chambres) se négocie entre 3,5 et 7 millions de MAD. Hors médina (quartiers Andalous, El Kala), les prix démarrent à 800 000 MAD pour une bâtisse à transformer.",
      },
    },
    {
      "@type": "Question",
      name: "Quel rendement attendre d'une maison d'hôtes à Chefchaouen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le rendement brut moyen d'une maison d'hôtes bien gérée à Chefchaouen se situe entre 9 et 14 % par an. Le taux d'occupation moyen atteint 62 % sur l'année (avec des pics à 95 % en avril-mai et septembre-octobre). Le tarif moyen par chambre varie de 600 à 1 200 MAD/nuit. Une maison d'hôtes de 6 chambres bien positionnée peut générer 750 000 à 1,1 million de MAD de chiffre d'affaires annuel.",
      },
    },
    {
      "@type": "Question",
      name: "Un étranger peut-il acheter une maison à Chefchaouen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, les étrangers peuvent acheter librement des biens immobiliers urbains au Maroc, y compris à Chefchaouen. Seules les terres agricoles (terres melk agricoles) sont restreintes aux ressortissants marocains. Il est fortement recommandé de passer par un notaire (adoul ou notaire moderne) et de vérifier le statut juridique du bien (titre foncier de préférence, plutôt que melk non immatriculé) avant tout engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles autorisations pour ouvrir une maison d'hôtes à Chefchaouen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Il faut obtenir : un certificat de classement délivré par la Délégation Régionale du Tourisme de Tétouan-Tanger-Al Hoceima, un agrément municipal de la commune de Chefchaouen, l'inscription au registre du commerce, l'identifiant fiscal et la CNSS, et une autorisation d'aménagement si la maison se trouve dans un site classé (médina). Les normes sanitaires, sécurité incendie et accessibilité sont contrôlées avant l'ouverture. Compter 4 à 8 mois pour finaliser l'ensemble.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle fiscalité s'applique aux maisons d'hôtes au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les maisons d'hôtes bénéficient depuis 2016 d'avantages fiscaux : exonération totale de l'IS pendant 5 ans suivant la première opération de séjour (puis taux réduit à 17,5 % pendant 5 ans), TVA à 10 % sur l'hébergement, taxe professionnelle réduite. Les revenus locatifs sont déclarés au titre des bénéfices commerciaux (BIC). Une SARL ou SARLAU est la structure la plus courante. La taxe de séjour communale s'élève à 8 à 15 MAD/nuit/personne à Chefchaouen.",
      },
    },
    {
      "@type": "Question",
      name: "Quel quartier choisir pour ouvrir une maison d'hôtes à Chefchaouen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La médina (quartiers Outa El Hammam, Souika, Bab El Aïn) reste la zone la plus rentable mais aussi la plus chère et la plus contraignante (rénovation, accès véhicules limité). Les quartiers Andalous et El Kala offrent un excellent compromis : authentiques, à 5 minutes à pied de la place principale, avec un meilleur ratio prix/rendement. Le quartier moderne (avenue Hassan II) est moins demandé par les touristes mais convient pour de l'hébergement long séjour.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps pour rentabiliser un investissement maison d'hôtes à Chefchaouen ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le retour sur investissement (ROI) complet d'une maison d'hôtes bien gérée à Chefchaouen se situe entre 7 et 10 ans, en intégrant l'achat, la rénovation, les autorisations, le mobilier et le fonds de roulement. Une exploitation directe par le propriétaire (sans gérant salarié) accélère la rentabilité. La plus-value à la revente est très significative : les prix dans la médina ont progressé de 6 à 9 % par an entre 2020 et 2025.",
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
      name: "Investissement",
      item: "https://siyahamag.ma/investissement",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Investissement Maison d'Hôtes Chefchaouen 2026",
      item: "https://siyahamag.ma/guide/investissement-maison-hotes-chefchaouen-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideInvestissementMaisonHotesChefchaouenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Investissement", href: "/investissement" },
          { label: "Maison d'hôtes Chefchaouen 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide investissement</span>
          <span>/</span>
          <span>Publié le 1er mai 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Investissement Maison d&apos;Hôtes Chefchaouen 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Surnommée la <strong>perle bleue du Rif</strong>, Chefchaouen est
          devenue en quelques années l&apos;une des destinations les plus
          photographiées au monde. Avec <strong>1,2 million de visiteurs en
          2025</strong> et une croissance touristique annuelle de 11 %, la ville
          offre des opportunités d&apos;investissement remarquables pour qui
          souhaite ouvrir une maison d&apos;hôtes. Ce guide détaille les prix
          réels du marché, les rendements observés, les démarches administratives
          et la fiscalité applicable en 2026.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553244998-9bf61eb31a8d?w=1200&h=500&fit=crop"
          alt="Vue de la médina bleue de Chefchaouen au Maroc"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Chefchaouen, la perle bleue du Rif, attire chaque année plus de
          1,2 million de visiteurs internationaux
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#marche", "Pourquoi Chefchaouen attire les investisseurs"],
            ["#prix", "Prix de l'immobilier à Chefchaouen en 2026"],
            ["#rendement", "Rendement et exemples chiffrés"],
            ["#quartiers", "Les meilleurs quartiers où investir"],
            ["#demarches", "Démarches administratives et autorisations"],
            ["#fiscalite", "Fiscalité applicable"],
            ["#renovation", "Coûts de rénovation et exploitation"],
            ["#risques", "Risques et points de vigilance"],
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
          { value: "1,2M", label: "Visiteurs/an", color: "bg-blue-50 border-blue-200" },
          { value: "62 %", label: "Taux d'occupation moyen", color: "bg-emerald-50 border-emerald-200" },
          { value: "9-14 %", label: "Rendement brut annuel", color: "bg-amber-50 border-amber-200" },
          { value: "+11 %", label: "Croissance touristique 2025", color: "bg-violet-50 border-violet-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="marche">Pourquoi Chefchaouen attire les investisseurs</h2>
        <p>
          Chefchaouen a connu une métamorphose fulgurante. Petite cité de
          montagne longtemps réservée aux randonneurs et aux voyageurs en quête
          d&apos;authenticité, la ville bleue est devenue en moins de dix ans
          une <strong>icône Instagram mondiale</strong>. Ses ruelles aux nuances
          azur, son architecture andalouse et son atmosphère paisible attirent
          aujourd&apos;hui une clientèle internationale très diverse :
          backpackers, couples en lune de miel, photographes, retraités européens.
        </p>
        <p>
          Cette transformation a tiré la demande hôtelière vers le haut. La
          capacité d&apos;accueil officielle de la ville reste limitée à
          <strong> environ 2 800 lits classés</strong>, alors que la demande
          dépasse régulièrement 4 000 lits en haute saison. Cette tension
          structurelle entre offre et demande maintient des taux d&apos;occupation
          très élevés et des prix de chambre attractifs.
        </p>
        <p>
          Trois facteurs renforcent l&apos;attractivité de l&apos;investissement
          à Chefchaouen en 2026 :
        </p>
        <ul>
          <li>
            <strong>L&apos;extension de l&apos;autoroute Tanger-Tétouan-Al Hoceima
            jusqu&apos;à Chefchaouen</strong> (mise en service 2024) qui a réduit
            le trajet depuis Tanger de 3 h à 1 h 45.
          </li>
          <li>
            <strong>Le programme de mise en valeur du patrimoine de la médina</strong>
            financé par le Ministère du Tourisme et l&apos;UNESCO, qui rénove
            façades, places et infrastructures.
          </li>
          <li>
            <strong>La hausse des connexions aériennes vers Tanger</strong> (Ryanair,
            Transavia, easyJet, Royal Air Maroc), porte d&apos;entrée naturelle
            de Chefchaouen pour la clientèle européenne.
          </li>
        </ul>

        <h2 id="prix">Prix de l&apos;immobilier à Chefchaouen en 2026</h2>
        <p>
          Le marché immobilier de Chefchaouen reste accessible comparé aux autres
          destinations touristiques marocaines. Voici les fourchettes de prix
          observées en 2026 :
        </p>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Type de bien</th>
                <th className="border border-border p-3 text-left">Surface</th>
                <th className="border border-border p-3 text-left">Médina (centre)</th>
                <th className="border border-border p-3 text-left">Quartiers Andalous / El Kala</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium">Maison à rénover</td>
                <td className="border border-border p-3">150 — 250 m²</td>
                <td className="border border-border p-3">1 200 000 — 2 000 000 MAD</td>
                <td className="border border-border p-3">650 000 — 1 200 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Maison à rénover</td>
                <td className="border border-border p-3">250 — 400 m²</td>
                <td className="border border-border p-3">1 800 000 — 3 200 000 MAD</td>
                <td className="border border-border p-3">1 100 000 — 2 100 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Maison d&apos;hôtes opérationnelle (5-6 ch)</td>
                <td className="border border-border p-3">200 — 320 m²</td>
                <td className="border border-border p-3">3 500 000 — 5 200 000 MAD</td>
                <td className="border border-border p-3">2 600 000 — 4 000 000 MAD</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Maison d&apos;hôtes opérationnelle (7-9 ch)</td>
                <td className="border border-border p-3">320 — 500 m²</td>
                <td className="border border-border p-3">5 200 000 — 7 800 000 MAD</td>
                <td className="border border-border p-3">3 800 000 — 5 900 000 MAD</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Riad d&apos;exception (terrasse panoramique)</td>
                <td className="border border-border p-3">400+ m²</td>
                <td className="border border-border p-3">8 000 000 — 14 000 000 MAD</td>
                <td className="border border-border p-3">—</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources : SiyahaMag, agences immobilières locales, observations
            transactions 2025-2026. Prix exprimés en dirhams marocains hors
            frais de notaire (1,2 % à 2 %), enregistrement (3 % à 4 %) et
            commission d&apos;agence (2 % à 3 %).
          </p>
        </div>

        <h2 id="rendement">Rendement et exemples chiffrés</h2>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=900&h=400&fit=crop"
            alt="Ruelle bleue typique de Chefchaouen"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            Les ruelles bleues de la médina sont l&apos;atout marketing
            naturel de toute maison d&apos;hôtes chaouienne
          </figcaption>
        </figure>

        <h3>Exemple 1 — Maison d&apos;hôtes 6 chambres dans la médina</h3>
        <ul>
          <li>Investissement total : 5 200 000 MAD (achat 4 200 000 + rénovation et équipement 1 000 000)</li>
          <li>Tarif moyen par chambre : 950 MAD/nuit</li>
          <li>Taux d&apos;occupation moyen : 64 %</li>
          <li>Chiffre d&apos;affaires annuel : ~1 332 000 MAD</li>
          <li>Charges d&apos;exploitation (35 % du CA) : ~466 000 MAD</li>
          <li>Résultat net annuel : ~720 000 MAD (avant impôts, après amortissement)</li>
          <li><strong>Rendement net : 13,8 %</strong></li>
          <li>ROI complet : ~7,5 ans</li>
        </ul>

        <h3>Exemple 2 — Maison d&apos;hôtes 4 chambres en quartier Andalous</h3>
        <ul>
          <li>Investissement total : 2 600 000 MAD (achat 1 800 000 + rénovation 800 000)</li>
          <li>Tarif moyen par chambre : 720 MAD/nuit</li>
          <li>Taux d&apos;occupation moyen : 58 %</li>
          <li>Chiffre d&apos;affaires annuel : ~610 000 MAD</li>
          <li>Charges d&apos;exploitation (32 % du CA) : ~195 000 MAD</li>
          <li>Résultat net annuel : ~330 000 MAD</li>
          <li><strong>Rendement net : 12,7 %</strong></li>
          <li>ROI complet : ~8 ans</li>
        </ul>

        <h2 id="quartiers">Les meilleurs quartiers où investir</h2>

        <h3>1. Médina haute (Outa El Hammam)</h3>
        <p>
          Le cœur historique de Chefchaouen, autour de la place Outa El Hammam
          et de la Kasbah. Avantages : prestige, photogénie, taux d&apos;occupation
          le plus élevé (jusqu&apos;à 95 % en haute saison). Inconvénients : prix
          d&apos;achat élevés, rénovation complexe (matériaux traditionnels,
          contraintes patrimoniales), accès véhicules très limité.
        </p>

        <h3>2. Souika et Bab El Aïn</h3>
        <p>
          Quartiers commerçants de la médina, légèrement plus accessibles. Mix
          intéressant entre authenticité et praticité. Les prix y sont 15 à
          25 % inférieurs à la médina haute pour des biens souvent plus grands.
        </p>

        <h3>3. Quartier Andalous</h3>
        <p>
          À 5-10 minutes à pied de la médina, ce quartier résidentiel offre
          un excellent compromis. Maisons plus récentes, accès véhicules,
          stationnement possible. Très apprécié par les voyageurs longue durée
          et les groupes. Rendement souvent supérieur à la médina haute en
          raison des prix d&apos;achat plus bas.
        </p>

        <h3>4. Quartier El Kala</h3>
        <p>
          Quartier en pleine valorisation, avec vue panoramique sur la médina.
          Les biens y offrent souvent terrasses et jardins, atouts
          différenciants pour la clientèle internationale. Les prix ont
          progressé de 22 % en 2024-2025.
        </p>

        <h3>À éviter</h3>
        <p>
          Les zones excentrées (route de Tétouan, quartier moderne au-delà de
          l&apos;avenue Hassan II) pâtissent d&apos;un déficit d&apos;image.
          Les voyageurs viennent à Chefchaouen pour vivre la médina, pas pour
          séjourner en périphérie.
        </p>

        <h2 id="demarches">Démarches administratives et autorisations</h2>

        <ol>
          <li>
            <strong>Vérification du statut juridique du bien</strong> — Privilégier
            les biens avec titre foncier (TF) immatriculé. Les biens en melk non
            immatriculé exigent une procédure d&apos;immatriculation préalable
            (12 à 24 mois).
          </li>
          <li>
            <strong>Acte d&apos;achat notarié</strong> — Passer par un notaire
            moderne ou un adoul. Frais notaire : 1,2 à 2 %. Droits
            d&apos;enregistrement : 3 à 4 %. Conservation foncière : 1,5 %.
          </li>
          <li>
            <strong>Création d&apos;une structure juridique</strong> — La SARL
            ou la SARLAU est la forme la plus utilisée pour exploiter une
            maison d&apos;hôtes. Capital minimum 10 000 MAD.
          </li>
          <li>
            <strong>Immatriculation au Registre du Commerce</strong> au Tribunal
            de Commerce de Tétouan (rattachement régional).
          </li>
          <li>
            <strong>Identifiant fiscal et CNSS</strong> auprès de la DGI et de
            la CNSS de Chefchaouen.
          </li>
          <li>
            <strong>Demande d&apos;autorisation d&apos;exploitation</strong>
            auprès de la commune de Chefchaouen et de la Délégation Régionale
            du Tourisme.
          </li>
          <li>
            <strong>Visite de classement</strong> par la commission régionale
            (incendie, hygiène, accessibilité). Classification 1 à 5 jasmins
            selon les normes 2014.
          </li>
          <li>
            <strong>Inscription sur les OTA</strong> (Booking.com, Airbnb,
            Expedia) une fois le classement délivré.
          </li>
        </ol>

        <p>
          <strong>Délai total à prévoir :</strong> 4 à 8 mois entre la signature
          de l&apos;achat et l&apos;ouverture commerciale, hors travaux de
          rénovation.
        </p>

        <h2 id="fiscalite">Fiscalité applicable aux maisons d&apos;hôtes</h2>

        <p>
          Le Maroc a mis en place depuis 2016 un cadre fiscal incitatif pour
          les établissements touristiques :
        </p>

        <ul>
          <li>
            <strong>Impôt sur les Sociétés (IS)</strong> : exonération totale
            pendant les 5 premières années suivant la première opération de
            séjour, puis taux réduit de 17,5 % pendant 5 ans, puis taux normal.
          </li>
          <li>
            <strong>TVA</strong> : taux réduit de 10 % sur les prestations
            d&apos;hébergement (au lieu de 20 %).
          </li>
          <li>
            <strong>Taxe professionnelle</strong> : abattement de 30 % sur la
            valeur locative pendant les 5 premières années.
          </li>
          <li>
            <strong>Taxe de Promotion Touristique (TPT)</strong> : 6 à 30 MAD
            par nuitée selon la catégorie, refacturée au client.
          </li>
          <li>
            <strong>Taxe de séjour communale</strong> à Chefchaouen : 8 à
            15 MAD/nuit/personne, perçue pour le compte de la commune.
          </li>
          <li>
            <strong>IR sur les bénéfices distribués</strong> au gérant
            (rémunération salaire + dividendes selon montage).
          </li>
        </ul>

        <h2 id="renovation">Coûts de rénovation et exploitation</h2>

        <h3>Coûts de rénovation typiques</h3>
        <ul>
          <li>Rénovation lourde médina : 6 000 à 10 000 MAD/m²</li>
          <li>Rénovation médium hors médina : 4 000 à 6 500 MAD/m²</li>
          <li>Mobilier & équipement par chambre : 25 000 à 60 000 MAD</li>
          <li>Mise aux normes incendie : 35 000 à 80 000 MAD selon taille</li>
          <li>Aménagement cuisine professionnelle : 60 000 à 150 000 MAD</li>
        </ul>

        <h3>Charges d&apos;exploitation annuelles</h3>
        <ul>
          <li>Personnel (1 à 3 employés selon taille) : 60 000 à 200 000 MAD/an</li>
          <li>Énergie et fluides : 25 000 à 65 000 MAD/an</li>
          <li>OTA (Booking, Airbnb commissions ~17 %) : variable selon CA</li>
          <li>Petit-déjeuner et consommables : 35 000 à 90 000 MAD/an</li>
          <li>Entretien et maintenance : 20 000 à 50 000 MAD/an</li>
          <li>Assurance et abonnements : 8 000 à 18 000 MAD/an</li>
        </ul>

        <h2 id="risques">Risques et points de vigilance</h2>

        <ul>
          <li>
            <strong>Saisonnalité marquée</strong> — Décembre à février et juin
            à août sont les mois faibles. Prévoir une trésorerie permettant
            d&apos;encaisser 4 mois de charges sans recettes.
          </li>
          <li>
            <strong>Concurrence informelle</strong> — De nombreuses locations
            non déclarées circulent sur Airbnb. Cette concurrence pèse sur les
            tarifs des petits établissements. Le contrôle administratif se
            renforce mais reste imparfait.
          </li>
          <li>
            <strong>Travaux médina</strong> — La rénovation dans les zones
            classées exige des matériaux traditionnels (bois de cèdre, chaux,
            tadelakt) et des artisans qualifiés. Les coûts dépassent souvent
            les estimations initiales de 20 à 40 %.
          </li>
          <li>
            <strong>Statut juridique du bien</strong> — Vérifier impérativement
            l&apos;absence de contentieux familial sur les biens en indivision,
            fréquents dans la médina. Faire faire un certificat de propriété
            récent.
          </li>
          <li>
            <strong>Dépendance aux OTA</strong> — Les commissions Booking et
            Airbnb peuvent atteindre 17 à 22 %. Investir dans un site web
            propre et une stratégie SEO (Google My Business, blog) est
            essentiel à moyen terme.
          </li>
          <li>
            <strong>Gestion à distance</strong> — Confier la gestion à un
            manager local est indispensable pour les propriétaires non
            résidents. Compter 7 000 à 12 000 MAD/mois pour un gérant qualifié.
          </li>
        </ul>

        {/* CTA */}
        <div className="not-prose my-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Prêt à investir à Chefchaouen ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Découvrez les opportunités d&apos;investissement touristique au Maroc
            référencées par SiyahaMag : maisons d&apos;hôtes, riads, terrains,
            hôtels.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/investissement"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              Voir les opportunités d&apos;investissement
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition"
            >
              Créer mon compte investisseur
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
                href="/guide/investir-riad-maroc"
                className="text-primary hover:underline"
              >
                Investir dans un riad au Maroc — Guide général
              </Link>
            </li>
            <li>
              <Link
                href="/guide/investissement-hotelier-tanger-2026"
                className="text-primary hover:underline"
              >
                Investissement hôtelier Tanger 2026 — Marché du nord
              </Link>
            </li>
            <li>
              <Link
                href="/guide/investissement-eco-lodge-maroc-2026"
                className="text-primary hover:underline"
              >
                Investir dans un éco-lodge au Maroc 2026
              </Link>
            </li>
            <li>
              <Link
                href="/guide/reglementation-tourisme-maroc-2026"
                className="text-primary hover:underline"
              >
                Réglementation tourisme Maroc 2026
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  )
}
