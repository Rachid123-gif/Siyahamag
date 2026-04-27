import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Investissement Éco-Lodge Maroc 2026 : Rendements, Zones & Guide Pratique | SiyahaMag",
  description:
    "Guide complet pour investir dans un éco-lodge au Maroc en 2026. Analyse des meilleures zones, rendements attendus, cadre juridique, financement et retour d'expérience d'investisseurs.",
  alternates: {
    canonical: "/guide/investissement-eco-lodge-maroc-2026",
  },
  openGraph: {
    title: "Investissement Éco-Lodge Maroc 2026 : Guide & Rendements",
    description:
      "Tout savoir pour investir dans un éco-lodge au Maroc : zones prioritaires, rendements, fiscalité, financement et conseils pratiques pour 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investissement eco lodge maroc",
    "investir eco lodge maroc 2026",
    "rendement eco lodge maroc",
    "eco lodge investissement touristique maroc",
    "hebergement durable investissement maroc",
    "zone touristique eco lodge maroc",
    "financement eco lodge maroc",
    "investissement tourisme durable maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Investissement Éco-Lodge au Maroc 2026 : Guide Pratique Rendements et Opportunités",
  description:
    "Guide complet pour investir dans un éco-lodge au Maroc — zones, rendements, fiscalité et financement pour 2026.",
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
  datePublished: "2026-04-27",
  dateModified: "2026-04-27",
  mainEntityOfPage: "https://siyahamag.ma/guide/investissement-eco-lodge-maroc-2026",
  image:
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le rendement d'un éco-lodge au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le rendement brut d'un éco-lodge bien positionné au Maroc varie entre 8 % et 14 % par an selon la destination et le taux d'occupation. Les zones à fort potentiel comme Dakhla, le Parc National de Toubkal ou les gorges du Dadès peuvent atteindre des taux d'occupation de 65 à 80 % en haute saison, avec des nuitées entre 800 et 3 000 MAD selon le standing.",
      },
    },
    {
      "@type": "Question",
      name: "Quel budget prévoir pour créer un éco-lodge au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le budget d'investissement pour un éco-lodge de 5 à 10 unités au Maroc varie de 1,5 à 8 millions de MAD selon la localisation et le standing. Les coûts incluent l'acquisition ou la location du terrain, la construction en matériaux locaux (pisé, pierre, adobe), l'aménagement paysager, les équipements solaires et de récupération d'eau, et les certifications. Des subventions du Fonds Hassan II peuvent couvrir 20 à 30 % de l'investissement.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les meilleures régions pour investir dans un éco-lodge au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les cinq meilleures régions pour un éco-lodge au Maroc en 2026 sont : Dakhla (lagon et kitesurf, croissance +35 % par an), le Haut Atlas près de Toubkal (trekking international, demande européenne forte), les gorges du Dadès et Todra (circuits désert, clientèle française et allemande dominante), Chefchaouen et le Rif (tourisme culturel, demande sociale media très forte) et le Parc National de Souss-Massa (ornithologie, clientèle britannique et nordique).",
      },
    },
    {
      "@type": "Question",
      name: "Quels avantages fiscaux pour un éco-lodge au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les investisseurs dans des hébergements touristiques certifiés durables au Maroc bénéficient de plusieurs avantages : exonération d'IS pendant 5 ans (charte investissement 2022), TVA à 10 % sur les prestations d'hébergement (contre 20 % standard), subventions du Fonds Hassan II et de la Caisse de Dépôt et de Gestion (CDG), et accès aux financements verts de la Banque Centrale Populaire et du Crédit Agricole du Maroc.",
      },
    },
    {
      "@type": "Question",
      name: "Comment financer un projet d'éco-lodge au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Plusieurs sources de financement sont disponibles pour les éco-lodges marocains : le crédit investissement hôtelier du Crédit Agricole du Maroc (jusqu'à 70 % du montant HT, taux préférentiel 4–6 %), les subventions du Programme Tourisme Rural de l'ONMT (jusqu'à 30 % pour les projets en zone rurale), les fonds européens LIFE et INTERREG pour les projets à dimension environnementale, et les investisseurs privés via les plateformes de crowdfunding immobilier halal.",
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
      name: "Investissement Éco-Lodge Maroc 2026",
      item: "https://siyahamag.ma/guide/investissement-eco-lodge-maroc-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function InvestissementEcoLodgeMarocPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&h=600&fit=crop"
            alt="Éco-lodge dans le désert marocain avec panneaux solaires et architecture en pisé"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Investissement
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Investissement Éco-Lodge au Maroc 2026 : Rendements, Zones &amp; Guide Pratique
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Investissement Touristique", href: "/investissement" },
              { label: "Investissement Éco-Lodge Maroc 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>27 avril 2026</span>
            <span>·</span>
            <span>Lecture : 13 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              L&apos;éco-lodge est l&apos;un des segments hôteliers les plus dynamiques du Maroc en 2026.
              Porté par la croissance du tourisme durable, les subventions gouvernementales et une
              demande internationale en forte hausse, l&apos;investissement dans un hébergement
              éco-responsable offre des rendements attractifs tout en contribuant au développement
              des territoires ruraux. Analyse complète pour les investisseurs qui souhaitent se
              positionner sur ce marché.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "8–14 %", label: "Rendement brut annuel", color: "bg-green-50 border-green-200" },
                { value: "380+", label: "Éco-lodges opérationnels au Maroc", color: "bg-emerald-50 border-emerald-200" },
                { value: "+42 %", label: "Croissance réservations 2023–26", color: "bg-teal-50 border-teal-200" },
                { value: "500M", label: "Fonds gouvernemental (MAD)", color: "bg-blue-50 border-blue-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Pourquoi Investir dans un Éco-Lodge au Maroc en 2026 ?</h2>
            <p>
              Le marché de l&apos;hébergement durable au Maroc connaît une croissance structurelle
              exceptionnelle. Trois facteurs convergents créent une opportunité d&apos;investissement
              rare pour les porteurs de projets éco-touristiques :
            </p>

            <h3>1. Une demande internationale en forte hausse</h3>
            <p>
              Les touristes européens — qui représentent plus de <strong>65 % des arrivées
              internationales au Maroc</strong> — intègrent systématiquement des critères de
              durabilité dans leurs critères de sélection d&apos;hébergement. En 2026, près de
              <strong> 34 % des réservations</strong> sur Booking.com filtrent par &quot;hébergement
              durable&quot;, un chiffre en hausse de 12 points depuis 2022. Les éco-lodges marocains
              bien positionnés affichent des taux d&apos;occupation de <strong>65 à 80 %</strong>
              sur l&apos;année, avec des RevPAR supérieurs de 25 à 40 % aux hébergements classiques
              équivalents.
            </p>

            <h3>2. Un soutien gouvernemental sans précédent</h3>
            <p>
              Le gouvernement marocain a inscrit le tourisme durable comme priorité stratégique.
              Un fonds dédié de <strong>500 millions de dirhams</strong> a été mis en place pour
              subventionner la mise aux normes environnementales et la création de nouveaux
              hébergements certifiés. Les zones rurales et les parcs nationaux bénéficient
              d&apos;avantages fiscaux additionnels pour attirer les investisseurs privés.
            </p>

            <h3>3. Un effet Coupe du Monde 2030</h3>
            <p>
              La Coupe du Monde FIFA 2030 va attirer des millions de visiteurs supplémentaires
              et accélérer le développement des infrastructures touristiques. Les éco-lodges situés
              dans des zones naturelles proches des villes hôtes vont bénéficier d&apos;un surplus de
              demande de la part des supporters qui souhaitent combiner football et découverte
              authentique du Maroc.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 not-prose">
              <p className="font-semibold text-green-900">Chiffre clé — croissance du segment</p>
              <p className="text-green-800 text-sm mt-1">
                Les réservations dans les éco-lodges et hébergements durables marocains ont
                progressé de <strong>42 %</strong> entre 2023 et 2026, contre 18 % pour
                l&apos;hôtellerie classique. Le prix moyen de la nuitée dans un éco-lodge de qualité
                (5 à 15 unités) est passé de 650 MAD en 2022 à <strong>1 150 MAD en 2026</strong>,
                une hausse de 77 % en 4 ans.
              </p>
            </div>

            <h2>Les 5 Meilleures Zones pour Investir dans un Éco-Lodge au Maroc</h2>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  zone: "Dakhla (Côte Atlantique Sud)",
                  potentiel: "★★★★★",
                  description: "Lagon classé parmi les 10 meilleurs spots de kitesurf au monde. Demande explosive, offre insuffisante. Zone franche économique.",
                  prix_terrain: "150–350 MAD/m²",
                  taux_occupation: "72–85 %",
                  nuitee_moy: "1 200–2 500 MAD",
                  couleur: "bg-cyan-50 border-cyan-200",
                },
                {
                  zone: "Haut Atlas — Vallée de l'Ourika / Asni",
                  potentiel: "★★★★★",
                  description: "Accès depuis Marrakech en 1h. Trekking vers Toubkal, rivières, villages berbères. Clientèle européenne aisée et familles.",
                  prix_terrain: "120–280 MAD/m²",
                  taux_occupation: "68–78 %",
                  nuitee_moy: "900–2 000 MAD",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  zone: "Gorges du Dadès et Todra (Drâa-Tafilalet)",
                  potentiel: "★★★★☆",
                  description: "Paysages de renom international, circuits désert. Forte demande française et allemande. Terrains accessibles.",
                  prix_terrain: "80–180 MAD/m²",
                  taux_occupation: "60–75 %",
                  nuitee_moy: "800–1 800 MAD",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  zone: "Chefchaouen (Rif Occidental)",
                  potentiel: "★★★★☆",
                  description: "Ville bleue Instagram-friendly. Forte attractivité sociale media. Clientèle jeune internationale en croissance rapide.",
                  prix_terrain: "200–400 MAD/m²",
                  taux_occupation: "65–80 %",
                  nuitee_moy: "700–1 500 MAD",
                  couleur: "bg-indigo-50 border-indigo-200",
                },
                {
                  zone: "Parc National de Souss-Massa (Tiznit-Agadir)",
                  potentiel: "★★★☆☆",
                  description: "Ornithologie, plages préservées, ibis chauve. Clientèle spécialisée (birding tours) à fort pouvoir d'achat.",
                  prix_terrain: "100–200 MAD/m²",
                  taux_occupation: "55–70 %",
                  nuitee_moy: "800–1 600 MAD",
                  couleur: "bg-teal-50 border-teal-200",
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
                      <div className="text-xs text-gray-500">Prix terrain</div>
                      <div className="text-xs font-semibold text-gray-800">{item.prix_terrain}</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">Taux occupation</div>
                      <div className="text-xs font-semibold text-gray-800">{item.taux_occupation}</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-2 text-center">
                      <div className="text-xs text-gray-500">Nuitée moyenne</div>
                      <div className="text-xs font-semibold text-gray-800">{item.nuitee_moy}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <img
              src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=400&fit=crop"
              alt="Vue panoramique d'un éco-lodge dans les montagnes de l'Atlas au coucher du soleil"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Analyse Financière : Budget et Rendements d&apos;un Éco-Lodge Marocain</h2>
            <p>
              Pour illustrer la rentabilité d&apos;un projet éco-lodge au Maroc, voici l&apos;analyse
              financière type d&apos;un établissement de <strong>8 unités</strong> (tentes ou suites
              glamping) dans le Haut Atlas, à 1h30 de Marrakech :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200" colSpan={2}>Investissement Initial (8 unités — Haut Atlas)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { poste: "Acquisition terrain (3 000 m²)", montant: "360 000 MAD" },
                    { poste: "Construction en pisé/adobe (8 unités × 40 m²)", montant: "1 200 000 MAD" },
                    { poste: "Aménagement paysager et espaces communs", montant: "280 000 MAD" },
                    { poste: "Énergie solaire + récupération eau de pluie", montant: "220 000 MAD" },
                    { poste: "Mobilier et décoration (artisanat local)", montant: "180 000 MAD" },
                    { poste: "Certifications (Label Éco-Lodge + Green Key)", montant: "45 000 MAD" },
                    { poste: "Fonds de roulement 6 mois", montant: "120 000 MAD" },
                    { poste: "TOTAL", montant: "2 405 000 MAD" },
                  ].map((row, i) => (
                    <tr key={i} className={i === 7 ? "bg-green-50 font-bold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
                    <th className="text-left p-3 border border-gray-200" colSpan={2}>Revenus Annuels Estimés (taux occupation 70 %)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { poste: "Hébergement (8 unités × 1 100 MAD × 255 nuits)", montant: "2 244 000 MAD" },
                    { poste: "Restauration et pension complète (+40 % nuitée)", montant: "897 600 MAD" },
                    { poste: "Activités et excursions guidées", montant: "180 000 MAD" },
                    { poste: "Séminaires et retraites bien-être", montant: "120 000 MAD" },
                    { poste: "TOTAL REVENUS BRUTS", montant: "3 441 600 MAD" },
                    { poste: "Charges d'exploitation (personnel, maintenance, marketing)", montant: "- 1 850 000 MAD" },
                    { poste: "RÉSULTAT BRUT D'EXPLOITATION", montant: "1 591 600 MAD" },
                    { poste: "RENDEMENT BRUT SUR INVESTISSEMENT", montant: "≈ 13,2 %" },
                  ].map((row, i) => (
                    <tr key={i} className={i >= 6 ? "bg-green-50 font-bold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200">{row.poste}</td>
                      <td className="p-3 border border-gray-200 text-right font-mono">{row.montant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Simulation indicative basée sur les données de marché 2026. Hors avantages fiscaux et subventions qui peuvent améliorer significativement la rentabilité réelle.
              </p>
            </div>

            <h2>Cadre Juridique et Fiscalité de l&apos;Éco-Lodge au Maroc</h2>
            <p>
              Investir dans un éco-lodge au Maroc nécessite de maîtriser le cadre réglementaire.
              Voici les points essentiels pour structurer votre projet :
            </p>

            <h3>Statuts juridiques recommandés</h3>
            <ul>
              <li>
                <strong>SARL (Société à Responsabilité Limitée)</strong> — Le plus courant pour les projets
                individuels ou en famille. Capital minimum symbolique depuis la réforme 2022 (1 MAD).
                Comptabilité simplifiée possible.
              </li>
              <li>
                <strong>SA (Société Anonyme)</strong> — Recommandée pour les projets de plus grande
                envergure ou si vous souhaitez accueillir des investisseurs extérieurs. Capital
                minimum 300 000 MAD.
              </li>
              <li>
                <strong>Coopérative touristique</strong> — Intéressante pour les projets à dimension
                communautaire avec des partenaires locaux. Bénéficie d&apos;avantages fiscaux spécifiques.
              </li>
            </ul>

            <h3>Avantages fiscaux disponibles en 2026</h3>
            <div className="not-prose space-y-2 my-4">
              {[
                { avantage: "Exonération IS (5 ans)", detail: "Pour les entreprises touristiques créées dans des zones rurales ou proches de parcs nationaux — Charte d'Investissement 2022" },
                { avantage: "TVA réduite 10 %", detail: "Sur les prestations d'hébergement touristique classé, contre 20 % pour le régime standard" },
                { avantage: "Subvention Fonds Hassan II", detail: "Jusqu'à 30 % du montant HT de l'investissement pour les projets hôteliers durables en zone rurale" },
                { avantage: "Droits de douane 0 %", detail: "Sur les équipements solaires et les matériaux de construction éco-responsables (liste préférentielle MEFRA)" },
                { avantage: "Taxe professionnelle exonérée (5 ans)", detail: "Pour les nouvelles activités touristiques en dehors des grandes villes" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 font-bold text-sm shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.avantage}</div>
                    <div className="text-xs text-gray-600">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Financement d&apos;un Projet Éco-Lodge au Maroc</h2>
            <p>
              Plusieurs mécanismes de financement sont disponibles pour les porteurs de projets
              éco-touristiques au Maroc :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  source: "Crédit Agricole du Maroc — Prêt Tourisme Rural",
                  detail: "Financement jusqu'à 70 % du montant HT, taux préférentiel 4–5,5 %, durée max. 15 ans avec différé de 3 ans",
                  type: "Banque",
                  couleur: "bg-green-50 border-green-200",
                },
                {
                  source: "Banque Centrale Populaire — Green Finance",
                  detail: "Lignes de crédit dédiées aux projets verts, conditions négociées avec le PNUE, taux 4,5–6 %",
                  type: "Banque",
                  couleur: "bg-emerald-50 border-emerald-200",
                },
                {
                  source: "Fonds Hassan II pour le Développement Économique",
                  detail: "Subvention à fonds perdus de 20–30 % pour les projets hôteliers en zone rurale, dossier via Maroc Invest",
                  type: "Subvention",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  source: "Programme ONMT — Tourisme Rural",
                  detail: "Aide à la commercialisation, référencement dans les brochures ONMT et les salons internationaux (ITB, ATM), formation du personnel",
                  type: "Appui commercial",
                  couleur: "bg-indigo-50 border-indigo-200",
                },
                {
                  source: "Fonds Européens LIFE et INTERREG",
                  detail: "Pour les projets ayant une composante conservation de la biodiversité, co-financement possible jusqu'à 40 % si éligible",
                  type: "Fonds UE",
                  couleur: "bg-purple-50 border-purple-200",
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

            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&h=400&fit=crop"
              alt="Coucher de soleil depuis un éco-lodge dans les montagnes du Maroc avec vue sur la vallée"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Étapes Clés pour Lancer un Projet Éco-Lodge au Maroc</h2>
            <p>
              Voici le parcours type d&apos;un investisseur qui monte un projet éco-lodge au Maroc,
              de l&apos;idée à l&apos;ouverture :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                { etape: "1", titre: "Étude de faisabilité (1–2 mois)", detail: "Analyse de la zone cible, étude de la concurrence locale, simulation financière, identification des aides disponibles" },
                { etape: "2", titre: "Acquisition foncière (2–6 mois)", detail: "Vérification du titre foncier, consultation du plan d'aménagement local, engagement d'un notaire agréé" },
                { etape: "3", titre: "Obtention des autorisations (3–8 mois)", detail: "Permis de construire auprès de la commune, étude d'impact environnemental (EIE) si zone protégée, autorisation d'exploitation touristique au MTTAH" },
                { etape: "4", titre: "Construction et aménagement (6–18 mois)", detail: "Appel d'offres artisans locaux, construction en matériaux durables, installation énergie solaire, aménagement paysager" },
                { etape: "5", titre: "Certification et classement (1–3 mois)", detail: "Dossier de classement hébergement touristique, demande Label Éco-Lodge Maroc, audit Green Key si ciblé" },
                { etape: "6", titre: "Lancement commercial", detail: "Référencement Booking.com, Airbnb, création site web, partenariats agences réceptives, présence ONMT" },
              ].map((item) => (
                <div key={item.etape} className="flex gap-4 items-start p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center font-bold text-sm shrink-0 text-green-700">
                    {item.etape}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{item.titre}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Points de Vigilance et Risques à Anticiper</h2>
            <p>
              Comme tout investissement, l&apos;éco-lodge au Maroc comporte des risques qu&apos;il convient
              d&apos;anticiper pour sécuriser votre projet :
            </p>
            <ul>
              <li>
                <strong>Risque foncier :</strong> Vérifiez impérativement le titre foncier (TF) avant tout engagement. Les terrains non titrés (melkiya) peuvent générer des litiges. Exigez un TF définitif ou engagez une procédure de titrisation avant l&apos;achat.
              </li>
              <li>
                <strong>Risque réglementaire en zone protégée :</strong> Certaines zones proches des parcs nationaux sont soumises à des restrictions de construction strictes. Consultez l&apos;Agence Nationale des Eaux et Forêts (ANEF) et les plans d&apos;aménagement locaux en amont.
              </li>
              <li>
                <strong>Risque de saisonnalité :</strong> Certaines destinations (Atlas en hiver, désert en été) connaissent de fortes variations de fréquentation. Prévoyez un fonds de roulement suffisant pour couvrir 3 à 4 mois de basse saison.
              </li>
              <li>
                <strong>Risque de dépendance aux OTA :</strong> Booking.com et Airbnb prennent des commissions de 15 à 25 %. Développez progressivement votre canal de vente directe (site web + réseaux sociaux) pour réduire cette dépendance.
              </li>
            </ul>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel rendement pour un éco-lodge au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Entre 8 % et 14 % de rendement brut annuel pour un éco-lodge bien positionné.
                Notre simulation sur 8 unités dans le Haut Atlas aboutit à 13,2 % de rendement
                brut, avant prise en compte des avantages fiscaux qui peuvent l&apos;améliorer
                significativement.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel budget prévoir pour un éco-lodge au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Comptez entre 1,5 et 8 millions de MAD selon le nombre d&apos;unités et la zone.
                Un projet de 8 unités dans le Haut Atlas représente environ 2,4 millions de MAD
                d&apos;investissement total, dont 70 % peuvent être financés par crédit bancaire.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle est la meilleure zone pour un éco-lodge au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Dakhla et le Haut Atlas (vallée de l&apos;Ourika) offrent les meilleurs indicateurs
                en 2026 : taux d&apos;occupation 70–85 %, nuitées &gt; 1 000 MAD et forte croissance.
                Les gorges du Dadès et Chefchaouen sont également très attractives avec un
                potentiel de développement encore important.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Y a-t-il des subventions pour créer un éco-lodge au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui : le Fonds Hassan II peut subventionner jusqu&apos;à 30 % du projet, l&apos;ONMT
                offre un appui commercial, et le Crédit Agricole du Maroc propose des prêts
                préférentiels à 4–5,5 %. L&apos;exonération d&apos;IS pendant 5 ans est également disponible
                pour les nouvelles créations en zone rurale.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Comment obtenir le Label Éco-Lodge Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Le Label Éco-Lodge Maroc est délivré par le Ministère du Tourisme. L&apos;audit est
                gratuit et subventionné. Critères principaux : matériaux de construction locaux
                et durables, autonomie énergétique &gt; 50 %, gestion responsable des déchets,
                approvisionnement local &gt; 60 % et formation du personnel aux pratiques durables.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Découvrez les projets d&apos;éco-tourisme à financer sur SiyahaMag
              </h3>
              <p className="text-green-100 mb-4">
                Riads, éco-lodges, resorts durable — explorez les opportunités d&apos;investissement
                touristique sur la plateforme n°1 du secteur au Maroc.
              </p>
              <Link
                href="/investissement"
                className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                Voir les opportunités d&apos;investissement →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/tourisme-durable-maroc-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Tourisme Durable Maroc 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  État des lieux, certifications et emplois verts au Maroc
                </div>
              </Link>
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all"
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
                className="block p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investir dans un Riad au Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Guide pratique pour l&apos;achat et la gestion d&apos;un riad
                </div>
              </Link>
              <Link
                href="/statistiques"
                className="block p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Statistiques Tourisme Maroc 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Données officielles : arrivées, nuitées, recettes touristiques
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
