import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    "Investissement Touristique Agadir 2026 : Hôtels, Rendements & Opportunités | SiyahaMag",
  description:
    "Guide complet d'investissement touristique à Agadir en 2026 : hôtels balnéaires, résidences, rendements, fiscalité, zones d'investissement et conseils experts.",
  alternates: {
    canonical: "/guide/investissement-touristique-agadir-2026",
  },
  openGraph: {
    title: "Investissement Touristique Agadir 2026 : Le Guide Complet",
    description:
      "Agadir, station balnéaire phare du Maroc, prépare la Coupe du Monde 2030. Découvrez les meilleures opportunités d'investissement touristique en 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investissement tourisme agadir",
    "investir hotel agadir 2026",
    "investissement touristique agadir maroc",
    "rendement hotel agadir",
    "achat residence touristique agadir",
    "fiscalite investissement tourisme maroc",
    "investir baie agadir",
    "zone touristique agadir",
    "rentabilite hotel maroc 2026",
    "investissement balneaire agadir",
    "coupe du monde 2030 agadir investissement",
    "promoteur hotelier agadir",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Investissement Touristique Agadir 2026 : Opportunités, Rendements & Stratégies",
  description:
    "Guide complet d'investissement touristique à Agadir en 2026 : hôtels balnéaires, résidences, rendements et fiscalité.",
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
    "https://siyahamag.ma/guide/investissement-touristique-agadir-2026",
  image:
    "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Pourquoi investir dans le tourisme à Agadir en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agadir cumule plusieurs avantages décisifs en 2026 : 6,8 millions de nuitées en 2025 (+18 % vs 2023), un climat permettant 300 jours de soleil par an, l'aéroport Al Massira en pleine expansion (5,2 millions de passagers en 2025), la préparation de la Coupe du Monde 2030 avec rénovation du Stade Adrar, des prix d'acquisition encore 30 à 40 % inférieurs à Marrakech et une fiscalité touristique avantageuse (exonération IS pendant 5 ans pour les hôtels neufs en zone touristique aménagée).",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le rendement moyen d'un hôtel à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les rendements bruts moyens s'établissent ainsi en 2026 : hôtel 3 étoiles bien situé : 9 à 12 % brut, 6 à 8 % net. Hôtel 4 étoiles plage : 8 à 11 % brut, 5,5 à 7,5 % net. Hôtel 5 étoiles : 6 à 9 % brut, 4 à 6 % net (rentabilité plus longue, valorisation patrimoniale forte). Résidence touristique gérée : 5 à 8 % net garanti par contrat de gestion. Le RevPAR moyen agadirois 2025 s'établit à 720 MAD/nuit, en hausse de 22 % sur deux ans.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles zones privilégier pour investir à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Quatre zones se démarquent en 2026. Zone 1 : la baie d'Agadir et la corniche (premium, prix élevés mais demande maximale). Zone 2 : Founty et la nouvelle marina (en pleine valorisation, très prisée des investisseurs européens). Zone 3 : Taghazout Bay (resort intégré, golf, surf, croissance forte des projets eco-luxe). Zone 4 : la baie d'Anza et Aourir (en développement, prix encore accessibles, idéal pour résidences touristiques moyennes gammes). Les terrains en zones d'aménagement touristique bénéficient d'incitations fiscales spécifiques.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la fiscalité pour un investisseur étranger à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le Maroc offre un cadre fiscal attractif : exonération de l'IS pendant 5 ans pour les hôtels neufs en zone d'aménagement touristique, puis taux réduit de 17,5 % les 20 années suivantes (vs 31 % standard). TVA réduite à 10 % sur l'hôtellerie. Convention fiscale avec la France, l'Espagne, le Royaume-Uni et 60+ pays évitant la double imposition. Rapatriement libre des bénéfices via la Convention de Change. Visa de retraité avec exonération partielle d'IR sur les pensions de source étrangère.",
      },
    },
    {
      "@type": "Question",
      name: "Combien faut-il pour démarrer un investissement hôtelier à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trois fourchettes selon le projet. Achat d'appartement en résidence touristique : 800 000 à 2,5 millions MAD (apport 20-30 %). Acquisition petit hôtel 3 étoiles existant (30-50 chambres) : 18 à 45 millions MAD. Construction hôtel 4 étoiles plage (120-180 chambres) : 180 à 420 millions MAD. Le marché regorge de copropriétés en location gérée (apport plus faible, gestion déléguée), idéales pour un premier investissement avec ticket d'entrée de 600 000 MAD.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe l'achat d'un bien touristique au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le processus suit cinq étapes. 1) Réservation avec compromis et acompte de 5-10 %. 2) Audit juridique et technique (titre foncier, conformité, urbanisme). 3) Acte authentique notarié (compter 6-8 semaines après le compromis). 4) Inscription à la conservation foncière. 5) Pour les non-résidents : déclaration de l'investissement à l'Office des Changes pour garantir le rapatriement futur. Frais totaux : environ 7-9 % du prix (notaire, droits, conservation foncière). Un avocat spécialisé en immobilier touristique est fortement recommandé.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les risques d'un investissement hôtelier à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les principaux risques à anticiper. Saisonnalité : Agadir reste plus saisonnière que Marrakech, prévoir une trésorerie pour les mois creux (juin et novembre). Concurrence : explosion du parc hôtelier prévue 2026-2030, soigner le positionnement et le yield management. Coûts de construction : matériaux et main-d'œuvre en hausse de 14 % depuis 2024. Risque sismique : Agadir est en zone sismique 3, prévoir surcoût construction antisismique de 8-12 %. Risque dépendance OTA : commissions Booking/Expedia jusqu'à 25 %, indispensable de développer la vente directe.",
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
      name: "Investissement Touristique Agadir 2026",
      item: "https://siyahamag.ma/guide/investissement-touristique-agadir-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideInvestissementTouristiqueAgadirPage() {
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
          { label: "Investissement touristique Agadir 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide investissement</span>
          <span>/</span>
          <span>Publié le 2 mai 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Investissement Touristique Agadir 2026 : Le Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Première station balnéaire du Maroc avec{" "}
          <strong>6,8 millions de nuitées en 2025</strong> et 9 km de plage,
          Agadir entre dans une nouvelle décennie d&apos;investissements
          accélérés par la préparation de la Coupe du Monde 2030 et
          l&apos;essor de Taghazout Bay. Ce guide complet analyse les
          opportunités, rendements, zones porteuses, fiscalité et risques
          pour investir efficacement dans le tourisme agadirois en 2026.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=1200&h=500&fit=crop"
          alt="Plage et baie d'Agadir avec hôtels et marina au lever du soleil"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          La baie d&apos;Agadir, l&apos;une des plus rentables zones
          d&apos;investissement touristique balnéaire d&apos;Afrique du Nord
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#contexte", "Le contexte du marché agadirois en 2026"],
            ["#opportunites", "Les opportunités d'investissement"],
            ["#zones", "Les zones d'investissement à privilégier"],
            ["#rendements", "Rendements & RevPAR par typologie"],
            ["#fiscalite", "Fiscalité & cadre juridique"],
            ["#financement", "Financement & montage juridique"],
            ["#risques", "Risques à anticiper"],
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
          { value: "6,8M", label: "Nuitées 2025", color: "bg-rose-50 border-rose-200" },
          { value: "720 MAD", label: "RevPAR moyen", color: "bg-amber-50 border-amber-200" },
          { value: "9-12%", label: "Rendement brut 3-4*", color: "bg-emerald-50 border-emerald-200" },
          { value: "+18%", label: "Croissance 2023-25", color: "bg-violet-50 border-violet-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="contexte">Le contexte du marché touristique agadirois en 2026</h2>
        <p>
          Agadir s&apos;impose en 2026 comme la première destination
          balnéaire du Maroc. Reconstruite après le tremblement de terre de
          1960, la ville a fait du tourisme balnéaire son moteur économique
          principal. Avec une orientation plein sud, un microclimat
          atlantique tempéré et 9 kilomètres de plage continue, Agadir
          attire une clientèle européenne fidèle, principalement allemande
          (28 %), française (24 %), britannique (19 %), néerlandaise (12 %)
          et belge (8 %).
        </p>
        <p>
          Le marché vit une transformation profonde. Le parc hôtelier
          historique (souvent construit dans les années 1980-90) fait
          l&apos;objet d&apos;une <strong>vague de rénovation et de
          repositionnement</strong> sans précédent. En parallèle, plusieurs
          mégaprojets structurants redéfinissent l&apos;offre : le complexe
          Taghazout Bay (1 615 hectares, golf, surf, hôtels eco-luxe), la
          marina d&apos;Agadir et l&apos;extension de la zone Founty.
        </p>
        <p>
          Trois facteurs portent l&apos;optimisme pour 2026-2030 :
          la <strong>Coupe du Monde 2030</strong> (Agadir sera ville hôte
          avec rénovation complète du Stade Adrar), l&apos;ouverture de
          nouvelles lignes aériennes low-cost depuis l&apos;Europe (Ryanair,
          easyJet, Transavia), et le développement du tourisme expérientiel
          (surf, gastronomie locale, désert).
        </p>

        <h2 id="opportunites">Les opportunités d&apos;investissement en 2026</h2>

        <h3>1. Acquisition d&apos;hôtels existants à rénover</h3>
        <p>
          Le parc agadirois compte plus de 60 hôtels 3 et 4 étoiles
          construits avant 2000 et en attente de repositionnement. Ces
          actifs s&apos;acquièrent souvent à des prix attractifs (40 à 60 %
          en dessous du coût de construction neuf) mais nécessitent un
          capex de rénovation de 20 à 40 % du prix d&apos;acquisition. Les
          marques internationales (Best Western, Wyndham, Radisson Red,
          Voco) cherchent activement des partenaires gestionnaires pour ces
          repositionnements en franchise ou contrat de gestion.
        </p>

        <h3>2. Résidences touristiques en location gérée</h3>
        <p>
          Format en plein essor à Agadir : appartements ou villas dans des
          résidences gérées par un opérateur professionnel (Anantara, Pierre
          &amp; Vacances, Sunrise Resorts, opérateurs locaux comme Iberostar
          Founty Beach). L&apos;investisseur achète un lot, signe un bail de
          gestion (généralement 9 à 12 ans), perçoit un loyer garanti net de
          5 à 8 %. Idéal pour un premier investissement : ticket d&apos;entrée
          de 600 000 à 2 millions MAD, gestion déléguée intégrale.
        </p>

        <h3>3. Construction neuve en zone d&apos;aménagement</h3>
        <p>
          Les zones d&apos;aménagement touristique (ZAT) bénéficient
          d&apos;avantages exclusifs : exonération de l&apos;IS pendant
          5 ans, terrains aménagés (VRD, accès), procédures d&apos;urbanisme
          accélérées. Les ZAT majeures à Agadir : Founty (extension en
          cours), Taghazout Bay (lots disponibles pour hôtels boutique,
          eco-lodges), Aourir et Tamraght (segment surf et lifestyle). Les
          tickets d&apos;entrée pour un projet hôtelier 4 étoiles : 180 à
          280 millions MAD selon la capacité.
        </p>

        <h3>4. Riads urbains et maisons d&apos;hôtes</h3>
        <p>
          Segment plus discret mais très rentable. La médina d&apos;Agadir
          étant moderne, les opportunités se concentrent dans les villas de
          Founty et de la corniche. Une villa rénovée transformée en maison
          d&apos;hôtes (8 à 14 chambres) génère un rendement net de 10 à 14 %
          si la commercialisation est soignée (Booking, Airbnb premium,
          réseau de tour-opérateurs).
        </p>

        <h3>5. Investissement dans le segment golf et wellness</h3>
        <p>
          Agadir compte cinq parcours de golf opérationnels et trois en
          projet à Taghazout. Le segment golf-resort est en très forte
          croissance, porté par la clientèle senior européenne. Les
          opérateurs cherchent investisseurs pour résidences golf en
          copropriété (rendements 6 à 9 % net) et villas premium en
          location haut de gamme.
        </p>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=900&h=400&fit=crop"
            alt="Hôtel resort balnéaire avec piscine donnant sur l'océan"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            Les complexes hôteliers de la baie d&apos;Agadir maintiennent un
            taux d&apos;occupation moyen supérieur à 72 % toute l&apos;année
          </figcaption>
        </figure>

        <h2 id="zones">Les zones d&apos;investissement à privilégier</h2>

        <h3>Zone 1 — Baie d&apos;Agadir et corniche</h3>
        <p>
          Cœur historique du tourisme agadirois. Avantages : flux clientèle
          maximum, infrastructures matures, écoles internationales, services
          médicaux. Inconvénients : prix au m² élevés (18 000 à 28 000
          MAD/m² en façade plage), faible disponibilité foncière. Idéal pour
          repositionnement d&apos;hôtels existants et acquisition de
          résidences premium en location gérée.
        </p>

        <h3>Zone 2 — Founty et marina</h3>
        <p>
          Zone résidentielle haut de gamme en pleine valorisation. Prix au
          m² : 12 000 à 22 000 MAD. La marina (extension prévue 2027) attire
          investisseurs européens, restaurants, boutique-hôtels et villas
          premium. Excellent rapport qualité-prix-potentiel de plus-value
          pour investisseurs patients (5-7 ans).
        </p>

        <h3>Zone 3 — Taghazout Bay</h3>
        <p>
          Le projet le plus ambitieux du Souss-Massa. 1 615 hectares,
          parcours de golf (Hyatt Regency Taghazout, futur Mandarin
          Oriental, Fairmont, Marriott), village surf, marina secondaire.
          Lots disponibles pour hôtels boutique 30-80 chambres. Tickets
          d&apos;entrée : 60 à 220 millions MAD selon emplacement et
          capacité. Cible : investisseurs visant un produit eco-luxe ou
          surf-lifestyle avec tour-opérateurs partenaires européens.
        </p>

        <h3>Zone 4 — Anza, Aourir, Tamraght</h3>
        <p>
          Zone en pleine émergence sur l&apos;axe Agadir-Taghazout. Prix au
          m² : 7 000 à 14 000 MAD. Forte demande surf, eco-tourisme et
          retraite digitale (digital nomads). Idéale pour résidences
          touristiques moyenne gamme, eco-lodges, riads de plage et maisons
          d&apos;hôtes thématiques. Croissance des nuitées : +34 % entre
          2023 et 2025.
        </p>

        <h2 id="rendements">Rendements &amp; RevPAR par typologie</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left">Typologie</th>
                <th className="border border-border p-3 text-left">Ticket entrée</th>
                <th className="border border-border p-3 text-left">RevPAR moyen</th>
                <th className="border border-border p-3 text-left">Rdt brut</th>
                <th className="border border-border p-3 text-left">Rdt net</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-medium">Résidence gérée 4*</td>
                <td className="border border-border p-3">800 K — 2 M MAD</td>
                <td className="border border-border p-3">650 MAD</td>
                <td className="border border-border p-3">7 — 9 %</td>
                <td className="border border-border p-3">5 — 7 %</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Hôtel 3* à rénover</td>
                <td className="border border-border p-3">18 — 35 M MAD</td>
                <td className="border border-border p-3">520 MAD</td>
                <td className="border border-border p-3">9 — 12 %</td>
                <td className="border border-border p-3">6 — 8 %</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Hôtel 4* plage neuf</td>
                <td className="border border-border p-3">180 — 320 M MAD</td>
                <td className="border border-border p-3">820 MAD</td>
                <td className="border border-border p-3">8 — 11 %</td>
                <td className="border border-border p-3">5,5 — 7,5 %</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Hôtel 5* premium</td>
                <td className="border border-border p-3">350 — 750 M MAD</td>
                <td className="border border-border p-3">1 450 MAD</td>
                <td className="border border-border p-3">6 — 9 %</td>
                <td className="border border-border p-3">4 — 6 %</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium">Eco-lodge Taghazout</td>
                <td className="border border-border p-3">25 — 80 M MAD</td>
                <td className="border border-border p-3">980 MAD</td>
                <td className="border border-border p-3">10 — 14 %</td>
                <td className="border border-border p-3">7 — 10 %</td>
              </tr>
              <tr className="bg-muted/30">
                <td className="border border-border p-3 font-medium">Maison d&apos;hôtes Founty</td>
                <td className="border border-border p-3">6 — 18 M MAD</td>
                <td className="border border-border p-3">760 MAD</td>
                <td className="border border-border p-3">12 — 16 %</td>
                <td className="border border-border p-3">8 — 12 %</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-2">
            Sources : SiyahaMag, observations marché 2026. RevPAR = Revenue
            Per Available Room (chiffre d&apos;affaires hébergement / chambres
            disponibles). Rendements indicatifs hors plus-value patrimoniale.
          </p>
        </div>

        <h2 id="fiscalite">Fiscalité &amp; cadre juridique pour investir à Agadir</h2>

        <h3>Le statut de Zone d&apos;Aménagement Touristique (ZAT)</h3>
        <p>
          Les projets implantés dans une ZAT bénéficient d&apos;un cadre
          fiscal exceptionnellement favorable. Exonération totale d&apos;IS
          pendant les <strong>5 premiers exercices</strong>, puis taux
          réduit de <strong>17,5 %</strong> les 20 années suivantes (vs
          taux standard de 31 %). À cela s&apos;ajoute la TVA hôtelière
          réduite à 10 % sur les nuitées et la restauration. Les ZAT
          majeures d&apos;Agadir : Founty, Taghazout Bay, baie d&apos;Anza.
        </p>

        <h3>Cadre pour investisseurs étrangers</h3>
        <p>
          Le Maroc offre l&apos;un des cadres les plus libéraux du
          continent pour les investisseurs étrangers : libre transfert des
          bénéfices grâce à la Convention de Change, conventions fiscales
          de non-double imposition avec plus de 60 pays, droit de propriété
          étendu (sauf terrains agricoles).
          L&apos;<strong>Agence Marocaine de Développement des
          Investissements (AMDIE)</strong> propose un guichet unique pour
          les projets de plus de 50 millions MAD, avec aides directes
          jusqu&apos;à 30 % du coût d&apos;investissement pour les projets
          stratégiques.
        </p>

        <h3>Frais d&apos;acquisition et fiscalité courante</h3>
        <ul>
          <li>Droits d&apos;enregistrement : 4 à 6 % (selon nature)</li>
          <li>Conservation foncière : 1,5 % du prix</li>
          <li>Honoraires de notaire : 0,5 à 1 %</li>
          <li>Taxe annuelle des services communaux : 10,5 % sur la valeur locative théorique</li>
          <li>Taxe de promotion touristique : 35 à 40 MAD/nuit/personne</li>
          <li>Taxe de séjour municipale : 30 MAD/nuit/personne en hôtel 4-5*</li>
        </ul>

        <h2 id="financement">Financement &amp; montage juridique</h2>

        <h3>Solutions de financement disponibles</h3>
        <p>
          Trois grandes voies de financement à Agadir en 2026. Les{" "}
          <strong>banques marocaines</strong> (Attijariwafa Bank, Banque
          Populaire, BMCE Bank of Africa, CFG Bank) financent jusqu&apos;à
          70 % du projet sur 12 à 20 ans, taux moyens 6,5 à 8,2 %.
          Le <strong>fonds Mohammed VI pour l&apos;investissement</strong>{" "}
          intervient en quasi-fonds propres pour les projets stratégiques.
          Les <strong>fonds de private equity</strong> spécialisés en
          tourisme africain (Mediterrania Capital, Africinvest, Helios)
          accompagnent les opérations supérieures à 100 millions MAD.
        </p>

        <h3>Montage juridique recommandé</h3>
        <p>
          Le véhicule classique reste la <strong>SARL ou SA marocaine</strong>{" "}
          détenant directement les actifs, idéale pour la simplicité fiscale.
          Pour les structurations plus complexes ou multi-investisseurs, la
          combinaison <strong>SCI marocaine + SAS française</strong>{" "}
          (ou holding luxembourgeoise / mauricienne) optimise la fiscalité
          des dividendes et la transmission. Faire appel à un cabinet
          spécialisé en immobilier touristique transfrontalier dès la phase
          de structuration est un investissement très rentable.
        </p>

        <h2 id="risques">Risques à anticiper</h2>

        <ul>
          <li>
            <strong>Risque saisonnalité</strong> — Agadir reste plus
            saisonnière que Marrakech. Les mois de juin et novembre
            affichent des taux d&apos;occupation moyens de 58-64 %. Prévoir
            une trésorerie suffisante et soigner le yield management.
          </li>
          <li>
            <strong>Risque de surcapacité</strong> — Plus de 12 000 chambres
            supplémentaires sont en construction d&apos;ici 2030. La
            sélectivité du positionnement (eco, surf, golf, wellness, MICE)
            sera déterminante.
          </li>
          <li>
            <strong>Risque sismique</strong> — Agadir se situe en zone
            sismique 3 (sur 5). Les normes de construction imposent un
            surcoût antisismique de 8 à 12 %. Veiller à l&apos;assurance
            tremblement de terre obligatoire.
          </li>
          <li>
            <strong>Risque de dépendance OTA</strong> — Booking, Expedia et
            consorts captent jusqu&apos;à 25 % du chiffre d&apos;affaires en
            commissions. Investir dans la vente directe (site, CRM,
            fidélité) dès l&apos;ouverture.
          </li>
          <li>
            <strong>Risque coûts construction</strong> — Matériaux et
            main-d&apos;œuvre en hausse de 14 % depuis 2024. Verrouiller les
            contrats fournisseurs et prévoir une marge de 8 à 12 % en
            réserve technique.
          </li>
          <li>
            <strong>Risque change</strong> — Pour les investisseurs en
            euros : le dirham est rattaché à un panier 60 % EUR / 40 % USD,
            ce qui limite le risque mais ne l&apos;élimine pas. Couvertures
            ponctuelles à envisager pour les flux importants.
          </li>
        </ul>

        {/* CTA */}
        <div className="not-prose my-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-2">
            Prêt à investir à Agadir ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Découvrez les opportunités d&apos;investissement touristique
            à Agadir et dans tout le Maroc, mises à jour quotidiennement
            par SiyahaMag.
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
                href="/guide/analyse-marche-tourisme-agadir-2026"
                className="text-primary hover:underline"
              >
                Analyse du marché touristique d&apos;Agadir 2026
              </Link>
            </li>
            <li>
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="text-primary hover:underline"
              >
                Investissement hôtelier Marrakech 2026 — Riads &amp; palaces
              </Link>
            </li>
            <li>
              <Link
                href="/guide/coupe-du-monde-2030-tourisme"
                className="text-primary hover:underline"
              >
                Coupe du Monde 2030 — Impact sur le tourisme marocain
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  )
}
