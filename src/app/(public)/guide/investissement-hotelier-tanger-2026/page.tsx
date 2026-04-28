import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Investissement Hôtelier Tanger 2026 : Rendements, Opportunités & Guide | SiyahaMag",
  description:
    "Guide complet pour investir dans l'hôtellerie à Tanger en 2026. Analyse du marché, rendements attendus, zones prioritaires, fiscalité et financement pour les investisseurs touristiques.",
  alternates: {
    canonical: "/guide/investissement-hotelier-tanger-2026",
  },
  openGraph: {
    title: "Investissement Hôtelier Tanger 2026 : Guide & Rendements",
    description:
      "Tanger s'impose comme la nouvelle capitale touristique du nord du Maroc. Découvrez les meilleures opportunités d'investissement hôtelier dans la ville du Détroit en 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investissement hotelier tanger 2026",
    "investir hotel tanger maroc",
    "rendement hotelier tanger",
    "immobilier touristique tanger",
    "opportunite investissement tanger",
    "hotel tanger coupe du monde 2030",
    "achat hotel tanger maroc",
    "projet touristique tanger 2026",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Investissement Hôtelier à Tanger 2026 : Guide Pratique Rendements et Opportunités",
  description:
    "Guide complet pour investir dans l'hôtellerie à Tanger — marché, rendements, zones et financement pour 2026.",
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
  datePublished: "2026-04-28",
  dateModified: "2026-04-28",
  mainEntityOfPage: "https://siyahamag.ma/guide/investissement-hotelier-tanger-2026",
  image:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le rendement d'un hôtel à Tanger en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le rendement brut d'un hôtel bien positionné à Tanger varie entre 7 % et 13 % selon l'emplacement et le standing. Les hôtels 4 étoiles en centre-ville ou sur le front de mer affichent des taux d'occupation de 68 à 78 % sur l'année, avec un RevPAR en hausse de 22 % entre 2024 et 2026. Les hôtels boutique en médina offrent des rendements souvent supérieurs grâce à des tarifs de nuitée premium.",
      },
    },
    {
      "@type": "Question",
      name: "Tanger est-elle une bonne destination pour investir dans l'hôtellerie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Tanger est l'une des destinations d'investissement hôtelier les plus prometteuses du Maroc en 2026. La ville bénéficie d'un triple moteur de croissance : la Coupe du Monde 2030 (Tanger est ville hôte), l'expansion continue de la zone franche Tanger Med et la montée en puissance du tourisme MICE (congrès et événements d'entreprise). Le nombre de nuitées touristiques a progressé de 34 % entre 2022 et 2026.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les meilleures zones pour investir dans un hôtel à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les quatre zones les plus attractives pour l'investissement hôtelier à Tanger sont : la Corniche (front de mer, hôtels premium), le quartier Malabata (zone hôtelière établie, accès plage), la Médina historique (boutique-hôtels et riads, clientèle haut de gamme) et la zone Tanger Business City près du port (clientèle d'affaires et MICE, taux d'occupation élevé en semaine).",
      },
    },
    {
      "@type": "Question",
      name: "Quel budget prévoir pour ouvrir un hôtel à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les coûts d'investissement varient selon le format : un riad-boutique de 10 chambres en médina nécessite 3 à 6 millions de MAD (rénovation incluse), un hôtel 3 étoiles de 60 chambres représente 25 à 40 millions de MAD, et un hôtel 4 étoiles de 150 chambres nécessite 80 à 140 millions de MAD. Les prix de l'immobilier commercial à Tanger ont augmenté de 18 % entre 2023 et 2026, ce qui renforce l'intérêt d'investir avant la Coupe du Monde.",
      },
    },
    {
      "@type": "Question",
      name: "Comment financer un investissement hôtelier à Tanger ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs options de financement sont disponibles : le crédit hôtelier du Crédit du Maroc (jusqu'à 65 % du montant HT, taux 5–7 %), les subventions du Fonds Hassan II (20–30 % pour les nouvelles créations), le programme CRI Tanger-Tétouan-Al Hoceïma pour l'accompagnement des investisseurs, et les partenariats avec des fonds d'investissement spécialisés en hospitality (CDG Invest, Holdco).",
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
      name: "Investissement Touristique",
      item: "https://siyahamag.ma/investissement",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Investissement Hôtelier Tanger 2026",
      item: "https://siyahamag.ma/guide/investissement-hotelier-tanger-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function InvestissementHotelierTangerPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1400&h=600&fit=crop"
            alt="Vue panoramique du détroit de Tanger avec la ville et le port en arrière-plan"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Investissement
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Investissement Hôtelier Tanger 2026 : Rendements, Zones &amp; Guide Pratique
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Investissement Touristique", href: "/investissement" },
              { label: "Investissement Hôtelier Tanger 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>28 avril 2026</span>
            <span>·</span>
            <span>Lecture : 13 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Tanger est en train de vivre sa transformation la plus spectaculaire depuis des décennies.
              Ville hôte de la Coupe du Monde FIFA 2030, hub économique du Détroit et nouvelle capitale
              culturelle du Nord marocain, la cité du Détroit concentre tous les ingrédients d&apos;un marché
              hôtelier en pleine ascension. En 2026, c&apos;est l&apos;une des villes les plus attractives du Maroc
              pour investir dans l&apos;hôtellerie et le tourisme.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "7–13 %", label: "Rendement brut annuel", color: "bg-teal-50 border-teal-200" },
                { value: "+34 %", label: "Nuitées touristiques 2022–26", color: "bg-blue-50 border-blue-200" },
                { value: "12 Md", label: "Investissements touristiques prévus (MAD)", color: "bg-amber-50 border-amber-200" },
                { value: "2030", label: "Ville hôte Coupe du Monde FIFA", color: "bg-indigo-50 border-indigo-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Pourquoi Investir dans l&apos;Hôtellerie à Tanger en 2026 ?</h2>
            <p>
              Tanger n&apos;est plus seulement une ville de transit entre l&apos;Europe et l&apos;Afrique. En 2026, elle
              s&apos;est imposée comme l&apos;une des destinations touristiques à la plus forte croissance du Maroc,
              portée par trois moteurs structurels qui la distinguent de toutes les autres villes du Royaume.
            </p>

            <h3>1. La Coupe du Monde FIFA 2030 : un accélérateur sans précédent</h3>
            <p>
              Tanger figure parmi les <strong>6 villes marocaines hôtes</strong> de la Coupe du Monde 2030.
              Le stade Ibn Battuta, rénové et agrandi pour accueillir <strong>65 000 spectateurs</strong>,
              sera l&apos;un des sites iconiques du tournoi. Ce statut implique :
            </p>
            <ul>
              <li>Un programme d&apos;investissement public de <strong>12 milliards de dirhams</strong> en infrastructures touristiques d&apos;ici 2029</li>
              <li>La construction de <strong>8 à 10 nouveaux hôtels 4 et 5 étoiles</strong> supplémentaires</li>
              <li>La rénovation complète du front de mer et du centre-ville historique</li>
              <li>L&apos;amélioration des liaisons aériennes directes depuis l&apos;Europe et le Golfe</li>
            </ul>

            <h3>2. L&apos;effet Tanger Med : un bassin de clientèle d&apos;affaires exceptionnel</h3>
            <p>
              Le complexe portuaire Tanger Med est devenu le <strong>premier port à conteneurs d&apos;Afrique
              et de Méditerranée</strong>. Il génère en 2026 plus de <strong>350 000 nuitées business</strong>
              par an dans les hôtels tangerois, avec un taux d&apos;occupation en semaine supérieur à 80 %
              dans les hôtels 4 et 5 étoiles. Cette clientèle d&apos;affaires (directeurs de multinationales,
              consultants, délégations commerciales) est la plus rentable pour un hôtelier : elle paie
              les tarifs les plus élevés et consomme restaurants, salles de réunion et business centers.
            </p>

            <h3>3. La montée en puissance du tourisme culturel et de loisirs</h3>
            <p>
              Tanger bénéficie d&apos;un capital culturel unique au Maroc. Ancienne ville internationale
              fréquentée par des artistes et écrivains légendaires (Tennessee Williams, Paul Bowles,
              Matisse, Delacroix), la ville attire une clientèle de voyageurs cultivés européens.
              Son patrimoine architectural art déco, ses cafés mythiques, sa médina restaurée et
              ses plages du Détroit en font une destination de plus en plus prisée pour les city breaks.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6 not-prose">
              <p className="font-semibold text-teal-900">Signal fort du marché</p>
              <p className="text-teal-800 text-sm mt-1">
                Le taux d&apos;occupation moyen des hôtels classés de Tanger a atteint <strong>71 %</strong>
                en 2025, contre 58 % en 2022 — soit la plus forte progression parmi toutes les
                villes marocaines sur la période. Le RevPAR (revenu par chambre disponible) a
                progressé de <strong>28 %</strong> en 3 ans, signe d&apos;un marché en phase de maturation
                rapide.
              </p>
            </div>

            <h2>Analyse du Marché Hôtelier de Tanger en 2026</h2>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Indicateur</th>
                    <th className="text-center p-3 border border-gray-200">2022</th>
                    <th className="text-center p-3 border border-gray-200">2024</th>
                    <th className="text-center p-3 border border-gray-200">2026 (est.)</th>
                    <th className="text-center p-3 border border-gray-200">Évolution</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { indic: "Nuitées touristiques (millions)", v2022: "2,1", v2024: "2,7", v2026: "2,8", evol: "+34 %" },
                    { indic: "Taux d'occupation moyen", v2022: "58 %", v2024: "67 %", v2026: "71 %", evol: "+13 pts" },
                    { indic: "RevPAR moyen (MAD)", v2022: "385", v2024: "465", v2026: "492", evol: "+28 %" },
                    { indic: "Prix moyen nuitée 4★ (MAD)", v2022: "650", v2024: "780", v2026: "850", evol: "+31 %" },
                    { indic: "Nombre d'hôtels classés", v2022: "48", v2024: "57", v2026: "65", evol: "+35 %" },
                    { indic: "Capacité lits classés", v2022: "8 200", v2024: "10 400", v2026: "12 100", evol: "+47 %" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.indic}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm text-gray-500">{row.v2022}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.v2024}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm font-semibold text-teal-700">{row.v2026}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm font-bold text-green-600">{row.evol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Sources : Observatoire du Tourisme Marocain, Direction Régionale du Tourisme Tanger-Tétouan-Al Hoceïma, estimations SiyahaMag 2026.
              </p>
            </div>

            <h2>Les 4 Zones Prioritaires pour Investir dans un Hôtel à Tanger</h2>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  zone: "La Corniche & Front de Mer",
                  potentiel: "★★★★★",
                  description: "Zone premium avec vue sur le Détroit. Clientèle loisirs et premium, forte demande saisonnière estivale. Idéal pour hôtels 4–5 étoiles avec piscine et restaurants.",
                  prix_m2: "18 000–32 000 MAD/m²",
                  occupation: "70–82 %",
                  revpar: "520–720 MAD",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  zone: "Quartier Malabata (Zone Hôtelière)",
                  potentiel: "★★★★★",
                  description: "Zone hôtelière traditionnelle de Tanger, à 3 km du centre. Plages, établissements classés, accessibilité. Profil investisseur modéré, rendements stables.",
                  prix_m2: "10 000–18 000 MAD/m²",
                  occupation: "68–78 %",
                  revpar: "420–580 MAD",
                  couleur: "bg-teal-50 border-teal-200",
                },
                {
                  zone: "Médina Historique & Kasbah",
                  potentiel: "★★★★☆",
                  description: "Boutique-hôtels et riads à fort potentiel premium. Clientèle culturelle européenne haut de gamme. Rénovation patrimoniale éligible aux aides de l'INDH.",
                  prix_m2: "8 000–15 000 MAD/m²",
                  occupation: "65–78 %",
                  revpar: "550–850 MAD",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  zone: "Tanger Business City & Périphérie du Port",
                  potentiel: "★★★★☆",
                  description: "Zone idéale pour les hôtels d'affaires (corporate). Taux d'occupation semaine > 80 %, clientèle Tanger Med. Développement MICE (salles conférence) très rentable.",
                  prix_m2: "7 000–13 000 MAD/m²",
                  occupation: "72–85 % (semaine)",
                  revpar: "480–650 MAD",
                  couleur: "bg-indigo-50 border-indigo-200",
                },
              ].map((item) => (
                <div key={item.zone} className={`${item.couleur} border rounded-xl p-5`}>
                  <div className="flex flex-wrap gap-3 items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900 text-base">{item.zone}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                    </div>
                    <div className="text-lg shrink-0">{item.potentiel}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/70 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">Prix m²</div>
                      <div className="text-xs font-semibold text-gray-800">{item.prix_m2}</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">Taux occupation</div>
                      <div className="text-xs font-semibold text-gray-800">{item.occupation}</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">RevPAR moyen</div>
                      <div className="text-xs font-semibold text-gray-800">{item.revpar}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&h=400&fit=crop"
              alt="Hôtel de luxe en bord de mer à Tanger avec piscine et vue sur le détroit de Gibraltar"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Simulation Financière : Hôtel Boutique 4 Étoiles à Tanger</h2>
            <p>
              Pour illustrer la rentabilité d&apos;un investissement hôtelier à Tanger, voici l&apos;analyse
              financière d&apos;un <strong>hôtel boutique 4 étoiles de 45 chambres</strong> sur la Corniche,
              construit neuf :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200" colSpan={2}>Investissement Total (45 chambres — Corniche)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { poste: "Terrain (1 500 m² Corniche)", montant: "35 000 000 MAD" },
                    { poste: "Construction (4 500 m² bâti, standing 4★)", montant: "45 000 000 MAD" },
                    { poste: "Aménagement intérieur & mobilier (4★)", montant: "12 000 000 MAD" },
                    { poste: "Restaurant, bar, spa, piscine", montant: "8 000 000 MAD" },
                    { poste: "Systèmes techniques (HVAC, sécurité, IT)", montant: "4 500 000 MAD" },
                    { poste: "Frais de classement & certifications", montant: "800 000 MAD" },
                    { poste: "Fonds de roulement 12 mois", montant: "3 500 000 MAD" },
                    { poste: "TOTAL INVESTISSEMENT", montant: "108 800 000 MAD" },
                  ].map((row, i) => (
                    <tr key={i} className={i === 7 ? "bg-teal-50 font-bold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200">{row.poste}</td>
                      <td className="p-3 border border-gray-200 text-right font-mono">{row.montant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200" colSpan={2}>Revenus Annuels Estimés (taux occupation 72 %)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { poste: "Hébergement (45 ch. × 850 MAD RevPAR × 263 nuits)", montant: "10 057 500 MAD" },
                    { poste: "Restaurant & Bar (35 % CA hébergement)", montant: "3 520 125 MAD" },
                    { poste: "Séminaires & MICE (salles de réunion)", montant: "950 000 MAD" },
                    { poste: "Spa & bien-être", montant: "480 000 MAD" },
                    { poste: "TOTAL REVENUS BRUTS", montant: "15 007 625 MAD" },
                    { poste: "Charges d'exploitation (personnel, charges fixes, marketing)", montant: "- 10 200 000 MAD" },
                    { poste: "RÉSULTAT BRUT D'EXPLOITATION (EBITDA)", montant: "4 807 625 MAD" },
                    { poste: "RENDEMENT BRUT SUR INVESTISSEMENT", montant: "≈ 8,6 %" },
                  ].map((row, i) => (
                    <tr key={i} className={i >= 6 ? "bg-teal-50 font-bold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200">{row.poste}</td>
                      <td className="p-3 border border-gray-200 text-right font-mono">{row.montant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Simulation indicative. La montée en puissance progressive (1–3 ans), les avantages fiscaux et la valorisation du fonds de commerce à horizon 2030 peuvent améliorer significativement le rendement réel.
              </p>
            </div>

            <h2>Impact de la Coupe du Monde 2030 sur l&apos;Investissement Hôtelier à Tanger</h2>
            <p>
              La Coupe du Monde 2030 est le principal catalyseur de l&apos;investissement hôtelier
              à Tanger. Son impact sur le marché hôtelier se matérialise à plusieurs niveaux :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  titre: "Construction de nouveaux hôtels (2024–2029)",
                  detail: "8 à 10 hôtels internationaux 4 et 5 étoiles sont en cours de construction ou de planification à Tanger pour répondre aux exigences FIFA en matière d'hébergement. Les contrats de management ont été signés avec Marriott, Hilton et Accor.",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  titre: "Pic de demande pendant la compétition (juin 2030)",
                  detail: "Les 6 à 8 matchs prévus au stade Ibn Battuta de Tanger vont générer un pic de demande exceptionnel. Les hôtels existants pourront pratiquer des tarifs multipliés par 3 à 5 pendant les semaines de match, avec 100 % d'occupation garanti.",
                  couleur: "bg-teal-50 border-teal-200",
                },
                {
                  titre: "Valorisation du patrimoine hôtelier post-CM2030",
                  detail: "L'expérience des villes hôtes précédentes (Qatar 2022, France 1998, Afrique du Sud 2010) montre une valorisation durable du parc hôtelier de +15 à +25 % dans les 3 ans suivant la compétition. Les hôtels rénovés pour 2030 bénéficieront d'un positionnement premium.",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  titre: "Amélioration des infrastructures (effets induits)",
                  detail: "La construction du tramway de Tanger, l'extension de l'aéroport Ibn Battuta (+4 millions de passagers/an), le renforcement des liaisons ferroviaires (ONCF) et la modernisation du port de plaisance vont structurellement améliorer l'attractivité touristique de la ville pour les décennies à venir.",
                  couleur: "bg-indigo-50 border-indigo-200",
                },
              ].map((item) => (
                <div key={item.titre} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="font-bold text-gray-900 mb-2">{item.titre}</div>
                  <div className="text-sm text-gray-600">{item.detail}</div>
                </div>
              ))}
            </div>

            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=900&h=400&fit=crop"
              alt="Vue nocturne du port et du centre-ville de Tanger illuminés avec les lumières de l'Europe en arrière-plan"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Cadre Juridique et Avantages Fiscaux pour les Investisseurs Hôteliers à Tanger</h2>

            <h3>Zone Franche et Avantages Spécifiques à Tanger</h3>
            <p>
              Tanger bénéficie d&apos;un cadre fiscal particulièrement avantageux pour les investisseurs,
              notamment grâce à la proximité de la Zone Franche de Tanger et du complexe Tanger Med :
            </p>

            <div className="not-prose space-y-2 my-4">
              {[
                { avantage: "Exonération IS totale (5 ans)", detail: "Pour les nouveaux établissements touristiques classés — Charte d'Investissement 2022, éligible immédiatement" },
                { avantage: "IS réduit à 17,5 % (années 6–20)", detail: "Taux préférentiel pour les hôtels classés exportateurs de services (clientèle internationale > 50 %)" },
                { avantage: "TVA 10 % sur hébergement", detail: "Taux réduit sur les prestations d'hébergement touristique classé — économie de 10 points vs taux standard" },
                { avantage: "Subvention Fonds Hassan II", detail: "Jusqu'à 25 % du montant d'investissement HT pour les hôtels classés 4★ et 5★ construits avant 2029" },
                { avantage: "Taxe professionnelle exonérée (5 ans)", detail: "Pour les nouvelles activités touristiques — économie de 1–3 % du chiffre d'affaires annuellement" },
                { avantage: "Droits d'importation préférentiels", detail: "Sur les équipements hôteliers spécialisés (linge, équipements cuisine pro, systèmes HVAC) selon liste MEFRA" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <span className="text-teal-600 font-bold text-sm shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.avantage}</div>
                    <div className="text-xs text-gray-600">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Sources de Financement Disponibles pour un Hôtel à Tanger</h2>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  source: "Crédit du Maroc — Prêt Hôtelier",
                  detail: "Financement jusqu'à 65 % du montant HT, taux 5–7 %, durée max. 20 ans avec différé de 3 ans. Partenariat historique avec les chaînes hôtelières marocaines.",
                  type: "Banque",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  source: "Attijariwafa Bank — Financement MICE",
                  detail: "Lignes de crédit dédiées aux projets MICE (congrès, événements) avec des conditions préférentielles pour les établissements situés à Tanger ou Casablanca.",
                  type: "Banque",
                  couleur: "bg-indigo-50 border-indigo-200",
                },
                {
                  source: "Fonds Hassan II — Investissements Hôteliers CM2030",
                  detail: "Programme spécial CM2030 : subvention à fonds perdus de 20–25 % pour les hôtels classés 4★ et 5★ en cours de construction dans les villes hôtes. Dossiers via CRI régional.",
                  type: "Subvention",
                  couleur: "bg-teal-50 border-teal-200",
                },
                {
                  source: "CDG Invest — Fonds Tourisme",
                  detail: "Le fonds d'investissement de la Caisse de Dépôt et de Gestion co-investit dans des projets hôteliers structurants avec prise de participation minoritaire.",
                  type: "Capital",
                  couleur: "bg-emerald-50 border-emerald-200",
                },
                {
                  source: "CRI Tanger-Tétouan-Al Hoceïma",
                  detail: "Centre Régional d'Investissement : accompagnement administratif, mise en relation avec les autorités locales, facilitation des permis de construire et des autorisations d'exploitation.",
                  type: "Appui administratif",
                  couleur: "bg-amber-50 border-amber-200",
                },
              ].map((item) => (
                <div key={item.source} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="flex flex-wrap gap-2 items-start justify-between mb-2">
                    <div className="font-bold text-gray-900 text-sm">{item.source}</div>
                    <span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-600">{item.type}</span>
                  </div>
                  <div className="text-sm text-gray-600">{item.detail}</div>
                </div>
              ))}
            </div>

            <h2>Risques à Anticiper avant d&apos;Investir dans un Hôtel à Tanger</h2>
            <ul>
              <li>
                <strong>Pression concurrentielle croissante :</strong> L&apos;attractivité de Tanger attire de nombreux investisseurs. 10 nouveaux hôtels d&apos;ici 2029 vont augmenter l&apos;offre de 15 %, avec un risque de pression temporaire sur les tarifs. Positionnez-vous clairement sur un segment (boutique premium, affaires, famille) pour vous différencier.
              </li>
              <li>
                <strong>Saisonnalité marquée :</strong> La clientèle loisirs se concentre sur juin–septembre. Pour lisser les revenus sur 12 mois, développez la clientèle d&apos;affaires (lundi–vendredi) et les MICE, qui ont des calendriers inverses aux loisirs.
              </li>
              <li>
                <strong>Tension sur la main-d&apos;œuvre qualifiée :</strong> La forte croissance de l&apos;offre hôtelière à Tanger crée une tension sur les profils qualifiés (chefs cuisiniers, chefs de réception, revenue managers). Anticipez vos recrutements 12 à 18 mois avant l&apos;ouverture.
              </li>
              <li>
                <strong>Risque réglementaire de classement :</strong> Les exigences de classement 4★ et 5★ sont strictes et contrôlées par le Ministère du Tourisme. Un manquement aux normes peut entraîner un déclassement et la perte des avantages fiscaux associés. Intégrez le coût des certifications dès la phase de construction.
              </li>
            </ul>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le rendement d&apos;un hôtel à Tanger en 2026 ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Entre 7 % et 13 % de rendement brut selon l&apos;emplacement et le standing.
                Notre simulation sur un boutique hôtel 4★ de 45 chambres sur la Corniche
                aboutit à 8,6 % de rendement brut, avant avantages fiscaux et valorisation
                du fonds de commerce à horizon 2030.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Tanger est-elle une bonne destination pour un investissement hôtelier ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui, Tanger est l&apos;une des meilleures destinations d&apos;investissement hôtelier du Maroc
                en 2026. Triple moteur de croissance : Coupe du Monde 2030 (ville hôte), clientèle
                d&apos;affaires Tanger Med et tourisme culturel en forte progression.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle est la meilleure zone pour un hôtel à Tanger ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                La Corniche offre les meilleurs indicateurs pour les hôtels loisirs premium (RevPAR 520–720 MAD,
                occupation 70–82 %). La zone Business City est idéale pour les hôtels d&apos;affaires
                avec un taux d&apos;occupation semaine de plus de 80 %. La Médina est parfaite pour les
                boutique-hôtels à tarifs premium.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Y a-t-il des subventions pour construire un hôtel à Tanger ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui : le Fonds Hassan II subventionne jusqu&apos;à 25 % des nouveaux hôtels classés
                construits dans les villes hôtes de la CM2030. L&apos;exonération IS pendant 5 ans et
                le taux IS réduit de 17,5 % sont également disponibles. Le CRI Tanger accompagne
                gratuitement les porteurs de projets dans leurs démarches administratives.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est l&apos;impact de la Coupe du Monde 2030 sur les hôtels de Tanger ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Massif et durable. La CM2030 va générer un pic de 100 % d&apos;occupation avec tarifs
                multipliés par 3 à 5 pendant les semaines de match. À long terme, l&apos;expérience
                des précédentes villes hôtes montre une valorisation du parc hôtelier de +15 à +25 %
                dans les 3 ans suivant la compétition.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Découvrez les projets hôteliers à financer à Tanger sur SiyahaMag
              </h3>
              <p className="text-teal-100 mb-4">
                Hôtels boutique, riads, resorts — explorez toutes les opportunités d&apos;investissement
                touristique sur la plateforme n°1 du secteur au Maroc.
              </p>
              <Link
                href="/investissement"
                className="inline-block bg-white text-teal-600 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              >
                Voir les opportunités d&apos;investissement →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investissement Hôtelier Marrakech 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Opportunités et rendements dans la capitale touristique
                </div>
              </Link>
              <Link
                href="/guide/investir-riad-maroc"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investir dans un Riad au Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Guide pratique pour l&apos;achat et la gestion d&apos;un riad
                </div>
              </Link>
              <Link
                href="/guide/coupe-du-monde-2030-tourisme"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Coupe du Monde 2030 : Impact Tourisme Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Opportunités d&apos;investissement liées à la CM2030
                </div>
              </Link>
              <Link
                href="/emplois/tanger"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emplois Tourisme Tanger
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Offres d&apos;emploi dans l&apos;hôtellerie et le tourisme à Tanger
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
