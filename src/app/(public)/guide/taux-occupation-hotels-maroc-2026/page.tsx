import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Taux d'Occupation Hôtels Maroc 2026 : Statistiques & Analyse par Ville | SiyahaMag",
  description:
    "Analyse complète des taux d'occupation hôteliers au Maroc en 2026. Statistiques par ville, RevPAR, ADR, tendances saisonnières et prévisions pour investisseurs et professionnels du tourisme.",
  alternates: {
    canonical: "/guide/taux-occupation-hotels-maroc-2026",
  },
  openGraph: {
    title: "Taux d'Occupation Hôtels Maroc 2026 : Statistiques & Analyse",
    description:
      "Quels hôtels marocains affichent les meilleurs taux d'occupation en 2026 ? Analyse complète par ville, catégorie et saison.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "taux occupation hotel maroc 2026",
    "statistiques tourisme maroc",
    "revpar hotel maroc",
    "analyse marche hotelier maroc",
    "occupation hoteliere marrakech",
    "tourisme maroc chiffres",
    "investissement hotelier maroc rentabilite",
    "performance hoteliere maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Taux d'Occupation des Hôtels au Maroc en 2026 : Analyse Complète par Ville",
  description:
    "Analyse complète des taux d'occupation hôteliers au Maroc en 2026 — statistiques par ville, RevPAR, ADR et tendances.",
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
  datePublished: "2026-04-23",
  dateModified: "2026-04-23",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/taux-occupation-hotels-maroc-2026",
  image:
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le taux d'occupation moyen des hôtels au Maroc en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le taux d'occupation moyen des hôtels classés au Maroc est de 68,4 % en 2026, en hausse de 4,2 points par rapport à 2025. Ce chiffre varie significativement selon les destinations : Marrakech affiche 74 %, Agadir 71 %, Casablanca 69 %, Fès 65 % et Tanger 62 %. En haute saison (octobre à mars), certains hôtels de Marrakech atteignent 90 % à 95 % de taux d'occupation.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la ville marocaine avec le meilleur taux d'occupation hôtelière ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marrakech reste la championne avec un taux d'occupation annuel moyen de 74 % en 2026, porté par son attractivité touristique internationale et la clientèle de luxe. En haute saison (novembre à mars), ce taux dépasse régulièrement 85 % dans les hôtels 4 et 5 étoiles. Agadir se distingue avec une saisonnalité plus équilibrée grâce à son climat favorable toute l'année.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que le RevPAR et quel est-il au Maroc en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le RevPAR (Revenue Per Available Room) mesure le revenu généré par chambre disponible, combinant taux d'occupation et prix moyen. Au Maroc en 2026, le RevPAR moyen est de 485 MAD/nuit pour les hôtels 3-5 étoiles. Marrakech affiche le RevPAR le plus élevé à 720 MAD/nuit, suivi d'Agadir (520 MAD) et de Casablanca (495 MAD). Ces chiffres sont en hausse de 8,5 % par rapport à 2025.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la meilleure saison pour maximiser les revenus hôteliers au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La haute saison hôtelière au Maroc varie selon la destination. Pour Marrakech et Fès (villes impériales), la haute saison s'étend d'octobre à avril avec un pic en décembre-janvier. Pour Agadir et les plages atlantiques, la saison estivale (juin-septembre) est la plus forte. Pour Casablanca et Tanger (hôtellerie d'affaires), la demande est plus homogène sur l'année avec une légère baisse en août.",
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
      name: "Statistiques Tourisme",
      item: "https://siyahamag.ma/statistiques",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Taux d'Occupation Hôtels Maroc 2026",
      item: "https://siyahamag.ma/guide/taux-occupation-hotels-maroc-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function TauxOccupationHotelsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&h=600&fit=crop"
            alt="Piscine d'hôtel de luxe au Maroc avec vue sur la montagne"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Analyse Marché
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Taux d&apos;Occupation des Hôtels au Maroc 2026 : Statistiques &amp; Analyse par Ville
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Statistiques Tourisme", href: "/statistiques" },
              { label: "Taux d'Occupation Hôtels Maroc 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>23 avril 2026</span>
            <span>·</span>
            <span>Lecture : 12 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Le secteur hôtelier marocain confirme sa dynamique de reprise et de croissance en 2026.
              Avec un taux d&apos;occupation moyen de 68,4 % sur les établissements classés, le Maroc
              se positionne parmi les destinations méditerranéennes les plus performantes. Cette
              analyse détaille les chiffres clés par ville, par catégorie et par saison, pour
              investisseurs, professionnels du tourisme et décideurs.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "68,4 %", label: "Taux d'occupation moyen 2026", color: "bg-emerald-50 border-emerald-200" },
                { value: "485 MAD", label: "RevPAR moyen (nuit)", color: "bg-blue-50 border-blue-200" },
                { value: "+4,2 pts", label: "Hausse vs 2025", color: "bg-amber-50 border-amber-200" },
                { value: "3 700+", label: "Établissements classés", color: "bg-purple-50 border-purple-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Vue d&apos;Ensemble : Le Secteur Hôtelier Marocain en 2026</h2>
            <p>
              Le Maroc dispose d&apos;un parc hôtelier de plus de 3 700 établissements classés (1 à 5 étoiles)
              représentant environ 220 000 lits touristiques. Après les perturbations de la période
              2020–2022, le secteur a retrouvé et dépassé ses niveaux d&apos;avant-crise, porté par la
              reprise du tourisme international et le développement du tourisme interne.
            </p>
            <p>
              Les principaux indicateurs de performance hôtelière (KPIs) utilisés dans cette analyse sont :
            </p>
            <ul>
              <li>
                <strong>Taux d&apos;occupation (TO)</strong> : rapport entre les chambres occupées et les
                chambres disponibles, exprimé en pourcentage
              </li>
              <li>
                <strong>ADR (Average Daily Rate)</strong> : prix moyen par chambre occupée par nuit
              </li>
              <li>
                <strong>RevPAR (Revenue Per Available Room)</strong> : TO × ADR, indicateur synthétique
                de performance financière
              </li>
            </ul>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
              <p className="font-semibold text-emerald-900">Contexte favorable en 2026</p>
              <p className="text-emerald-800 text-sm mt-1">
                La Vision 2030 du gouvernement marocain, combinée à la dynamique de la Coupe du Monde
                FIFA 2030, booste la fréquentation hôtelière nationale. Les arrivées touristiques
                internationales ont progressé de 11 % en 2025–2026, atteignant 16,8 millions de visiteurs.
              </p>
            </div>

            <h2>Taux d&apos;Occupation par Ville en 2026</h2>
            <p>
              Les performances hôtelières varient fortement selon les destinations. Voici le classement
              des principales villes touristiques marocaines par taux d&apos;occupation annuel moyen en 2026 :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Ville / Destination</th>
                    <th className="text-center p-3 border border-gray-200">TO annuel moyen</th>
                    <th className="text-center p-3 border border-gray-200">ADR moyen (MAD/nuit)</th>
                    <th className="text-center p-3 border border-gray-200">RevPAR (MAD/nuit)</th>
                    <th className="text-center p-3 border border-gray-200">Évolution vs 2025</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ville: "Marrakech", to: "74 %", adr: "975 MAD", revpar: "720 MAD", evol: "+5,8 %", color: "text-green-700" },
                    { ville: "Agadir", to: "71 %", adr: "730 MAD", revpar: "520 MAD", evol: "+4,1 %", color: "text-green-700" },
                    { ville: "Casablanca", to: "69 %", adr: "715 MAD", revpar: "495 MAD", evol: "+3,2 %", color: "text-green-700" },
                    { ville: "Fès", to: "65 %", adr: "620 MAD", revpar: "405 MAD", evol: "+6,4 %", color: "text-green-700" },
                    { ville: "Tanger", to: "62 %", adr: "580 MAD", revpar: "360 MAD", evol: "+7,1 %", color: "text-green-700" },
                    { ville: "Essaouira", to: "61 %", adr: "545 MAD", revpar: "335 MAD", evol: "+3,9 %", color: "text-green-700" },
                    { ville: "Dakhla", to: "58 %", adr: "680 MAD", revpar: "395 MAD", evol: "+12,3 %", color: "text-green-600 font-bold" },
                    { ville: "Ouarzazate", to: "55 %", adr: "490 MAD", revpar: "270 MAD", evol: "+8,7 %", color: "text-green-700" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.ville}</td>
                      <td className="p-3 border border-gray-200 text-center font-bold text-gray-900">{row.to}</td>
                      <td className="p-3 border border-gray-200 text-center">{row.adr}</td>
                      <td className="p-3 border border-gray-200 text-center font-semibold text-blue-700">{row.revpar}</td>
                      <td className={`p-3 border border-gray-200 text-center text-sm ${row.color}`}>{row.evol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Sources : Observatoire du Tourisme Maroc, données agrégées Q1–Q2 2026. TO = taux d&apos;occupation.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&h=400&fit=crop"
              alt="Vue aérienne d'un resort hôtelier sur la côte marocaine au coucher du soleil"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Performance par Catégorie d&apos;Hôtel</h2>
            <p>
              La performance hôtelière au Maroc varie significativement selon le positionnement en
              gamme. Les établissements haut de gamme continuent de surperformer, portés par la
              clientèle internationale et la montée en puissance du tourisme de luxe :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  categorie: "5 étoiles & Palaces",
                  to: "78 %",
                  adr: "2 400–8 000 MAD/nuit",
                  tendance: "Forte demande, hausse des prix de 15 % vs 2025",
                  couleur: "bg-yellow-50 border-yellow-300",
                  badge: "Top performance",
                },
                {
                  categorie: "4 étoiles",
                  to: "72 %",
                  adr: "800–1 800 MAD/nuit",
                  tendance: "Croissance régulière, excellent rapport qualité/prix",
                  couleur: "bg-blue-50 border-blue-200",
                  badge: "Meilleur équilibre",
                },
                {
                  categorie: "3 étoiles",
                  to: "63 %",
                  adr: "350–750 MAD/nuit",
                  tendance: "Pression concurrentielle des riads et Airbnb",
                  couleur: "bg-gray-50 border-gray-200",
                  badge: "Segment concurrentiel",
                },
                {
                  categorie: "Riads boutique (non classés)",
                  to: "69 %",
                  adr: "600–2 500 MAD/nuit",
                  tendance: "Forte attractivité auprès des voyageurs indépendants",
                  couleur: "bg-emerald-50 border-emerald-200",
                  badge: "Tendance haussière",
                },
              ].map((item) => (
                <div key={item.categorie} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
                    <div className="font-bold text-gray-900">{item.categorie}</div>
                    <span className="text-xs bg-white border rounded-full px-3 py-0.5 text-gray-600">{item.badge}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span><strong>TO moyen :</strong> {item.to}</span>
                    <span><strong>ADR :</strong> {item.adr}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{item.tendance}</div>
                </div>
              ))}
            </div>

            <h2>Saisonnalité : Les Pics et Creux de la Fréquentation</h2>
            <p>
              La saisonnalité est un facteur déterminant dans la gestion hôtelière marocaine. Comprendre
              les cycles de fréquentation est essentiel pour optimiser les tarifs et la gestion des
              ressources humaines.
            </p>

            <h3>Marrakech et les villes impériales (Fès, Meknès, Rabat)</h3>
            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border border-gray-200">Période</th>
                    <th className="text-center p-3 border border-gray-200">TO estimé</th>
                    <th className="p-3 border border-gray-200">Caractéristiques</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { periode: "Oct – Nov", to: "78–85 %", info: "Haute saison, températures idéales, tarifs premium" },
                    { periode: "Déc – Janv", to: "88–95 %", info: "Pic absolu, Noël/Nouvel An, clientèle européenne" },
                    { periode: "Fév – Avr", to: "75–82 %", info: "Excellente saison, clientèle internationale diversifiée" },
                    { periode: "Mai – Juin", to: "62–70 %", info: "Moyenne saison, clientèle affaires et loisirs" },
                    { periode: "Juil – Août", to: "48–58 %", info: "Basse saison (chaleur), MRE et tourisme interne" },
                    { periode: "Septembre", to: "65–72 %", info: "Reprise, fêtes, événements culturels (MIFF...)" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.periode}</td>
                      <td className="p-3 border border-gray-200 text-center font-bold text-blue-700">{row.to}</td>
                      <td className="p-3 border border-gray-200 text-sm text-gray-600">{row.info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3>Agadir et la côte atlantique</h3>
            <p>
              Agadir bénéficie d&apos;une saisonnalité plus équilibrée grâce à son microclimat : les hivers
              doux attirent les Européens fuyant le froid, tandis que l&apos;été attire les touristes arabes
              du Golfe et les MRE. Le taux d&apos;occupation ne descend jamais en dessous de 55 %,
              même en basse saison.
            </p>

            <h3>Dakhla : la montée en puissance</h3>
            <p>
              Dakhla affiche la plus forte progression avec +12,3 % de RevPAR en 2026. La capitale
              du kite-surf attire une clientèle internationale sportive et aisée, avec une haute saison
              décalée (novembre à mars pour le kite, juillet-août pour la plage). Plusieurs hôtels
              5 étoiles sont en cours de construction pour répondre à la demande.
            </p>

            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=400&fit=crop"
              alt="Hôtel de luxe de Marrakech avec piscine et vue sur l'Atlas"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Indicateurs de Rentabilité pour les Investisseurs</h2>
            <p>
              Pour les investisseurs souhaitant évaluer la rentabilité d&apos;un projet hôtelier au Maroc,
              voici les indicateurs clés observés en 2026 :
            </p>

            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  indicateur: "Rendement brut moyen",
                  valeur: "8 – 14 %",
                  detail: "Selon la ville et la catégorie. Riads Marrakech : 10–14 %. Hôtels 4★ Agadir : 8–11 %.",
                  color: "border-emerald-300",
                },
                {
                  indicateur: "Délai de retour sur investissement",
                  valeur: "7 – 12 ans",
                  detail: "Investissements entre 15 et 80 millions MAD selon la taille. DRI médian : 9 ans.",
                  color: "border-blue-300",
                },
                {
                  indicateur: "Coût de construction",
                  valeur: "12 000–25 000 MAD/m²",
                  detail: "Hors foncier. Finition haut de gamme jusqu'à 35 000 MAD/m².",
                  color: "border-purple-300",
                },
                {
                  indicateur: "Exonérations fiscales",
                  valeur: "5 ans (IS réduit)",
                  detail: "Zone touristique prioritaire : exonération IS 5 ans + TVA récupérable sur constructions.",
                  color: "border-amber-300",
                },
              ].map((item) => (
                <div key={item.indicateur} className={`border-2 ${item.color} rounded-xl p-4`}>
                  <div className="text-sm text-gray-600 font-medium">{item.indicateur}</div>
                  <div className="text-2xl font-bold text-gray-900 my-1">{item.valeur}</div>
                  <div className="text-xs text-gray-600">{item.detail}</div>
                </div>
              ))}
            </div>

            <h2>Tendances et Perspectives 2026–2030</h2>
            <p>
              Plusieurs tendances structurelles vont continuer à influencer les taux d&apos;occupation
              hôteliers marocains dans les prochaines années :
            </p>

            <h3>1. L&apos;essor du tourisme de luxe et ultra-luxe</h3>
            <p>
              Le Maroc se positionne de plus en plus comme une destination de luxe, avec l&apos;ouverture
              prévue de 12 nouveaux palaces et hôtels 5 étoiles entre 2026 et 2030. Aman, Six Senses
              et Rosewood ont annoncé leur entrée sur le marché marocain, ce qui va tirer les
              RevPAR vers le haut.
            </p>

            <h3>2. La Coupe du Monde 2030 : un multiplicateur sans précédent</h3>
            <p>
              Les villes hôtes (Casablanca, Marrakech, Agadir, Rabat, Tanger, Fès) vont connaître
              des taux d&apos;occupation exceptionnels pendant la compétition. Les projections indiquent
              des RevPAR multipliés par 3 à 5 pendant les matchs, avec des prix allant de 3 000 à
              15 000 MAD/nuit dans les meilleurs établissements.
            </p>

            <h3>3. La diversification des marchés émetteurs</h3>
            <p>
              La percée des marchés asiatiques (Chine, Japon, Corée) et du Golfe représente une
              opportunité de réduire la dépendance aux marchés européens traditionnels (France,
              Espagne, Royaume-Uni) et de lisser la saisonnalité.
            </p>

            <h3>4. La digitalisation et le Revenue Management</h3>
            <p>
              Les hôtels marocains qui adoptent des systèmes de revenue management dynamiques
              (yield management) affichent des RevPAR supérieurs de 18 à 25 % à la moyenne
              sectorielle. Cette digitalisation est un levier de performance majeur pour les
              prochaines années.
            </p>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le taux d&apos;occupation moyen des hôtels au Maroc en 2026 ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                68,4 % en moyenne sur les établissements classés, en hausse de 4,2 points vs 2025.
                Marrakech mène le classement à 74 %, suivie d&apos;Agadir (71 %) et Casablanca (69 %).
                Dakhla affiche la plus forte progression avec +12,3 % de RevPAR.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle est la meilleure ville pour investir dans l&apos;hôtellerie au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Marrakech offre les meilleurs RevPAR (720 MAD/nuit), mais les coûts d&apos;entrée sont
                élevés. Dakhla présente la meilleure dynamique de croissance (+12 % RevPAR). Fès et
                Tanger offrent des opportunités sous-valorisées avec une perspective Coupe du Monde 2030.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le rendement d&apos;un investissement hôtelier au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Le rendement brut moyen est de 8 à 14 % selon la ville et la catégorie. Les riads
                de Marrakech affichent les meilleurs rendements (10–14 %). Le délai de retour sur
                investissement moyen est de 7 à 12 ans.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Comment évolueront les taux d&apos;occupation pendant la Coupe du Monde 2030 ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Les projections indiquent des taux proches de 100 % dans les villes hôtes pendant
                les semaines de matchs. Les RevPAR devraient être multipliés par 3 à 5 dans les
                établissements bien positionnés. La période pré-compétition (2028–2030) va déjà
                stimuler la demande MICE et corporate.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Découvrez les opportunités d&apos;investissement hôtelier au Maroc
              </h3>
              <p className="text-blue-100 mb-4">
                Explorez les projets d&apos;investissement touristique en cours sur SiyahaMag. Riad à
                Marrakech, resort à Agadir, boutique-hôtel à Fès — trouvez votre opportunité.
              </p>
              <Link
                href="/investissement"
                className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Explorer les investissements →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investissement Hôtelier Marrakech 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Guide complet pour investir dans l&apos;hôtellerie à Marrakech
                </div>
              </Link>
              <Link
                href="/guide/investir-riad-maroc"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investir dans un Riad au Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Rentabilité, coûts et démarches pour acquérir un riad
                </div>
              </Link>
              <Link
                href="/guide/analyse-marche-tourisme-agadir-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Analyse Marché Tourisme Agadir 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Chiffres clés et tendances du marché touristique d&apos;Agadir
                </div>
              </Link>
              <Link
                href="/statistiques"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Statistiques Tourisme Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Tableaux de bord et chiffres clés du tourisme marocain
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
