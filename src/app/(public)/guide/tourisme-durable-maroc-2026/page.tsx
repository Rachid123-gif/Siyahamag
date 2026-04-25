import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tourisme Durable Maroc 2026 : Éco-Tourisme, Tendances & Emplois | SiyahaMag",
  description:
    "Le tourisme durable au Maroc en 2026 : état des lieux, destinations éco-responsables, certifications vertes, opportunités d'emploi et perspectives pour les professionnels du secteur.",
  alternates: {
    canonical: "/guide/tourisme-durable-maroc-2026",
  },
  openGraph: {
    title: "Tourisme Durable Maroc 2026 : Éco-Tourisme & Opportunités",
    description:
      "Découvrez comment le Maroc s'engage dans le tourisme durable en 2026 : destinations, labels, emplois verts et stratégie nationale.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "tourisme durable maroc",
    "eco tourisme maroc",
    "tourisme responsable maroc 2026",
    "emploi tourisme durable maroc",
    "ecolodge maroc",
    "certification verte hotel maroc",
    "tourisme vert maroc",
    "strategie tourisme durable maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tourisme Durable au Maroc 2026 : Éco-Tourisme, Certifications et Emplois Verts",
  description:
    "État des lieux du tourisme durable au Maroc en 2026 — destinations, certifications, emplois et stratégie nationale.",
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
  datePublished: "2026-04-25",
  dateModified: "2026-04-25",
  mainEntityOfPage: "https://siyahamag.ma/guide/tourisme-durable-maroc-2026",
  image:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que le tourisme durable au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le tourisme durable au Maroc désigne les pratiques touristiques qui minimisent l'impact environnemental, valorisent les communautés locales et préservent le patrimoine culturel. Cela inclut les éco-lodges, les circuits de randonnée responsables dans les parcs nationaux, le tourisme solidaire dans les douars et les hôtels certifiés Green Key ou Clef Verte. Le Maroc a adopté une stratégie nationale de tourisme durable dans le cadre de la Vision 2030.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les meilleures destinations d'éco-tourisme au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les meilleures destinations d'éco-tourisme au Maroc sont : le Parc National de Toubkal (trekking responsable dans le Haut Atlas), les gorges du Dadès et du Todra (bivouacs éco-responsables), les dunes de l'Erg Chebbi (camps nomades durables), la côte d'Essaouira (kitesurf et activités marines durables), la forêt de Cèdres d'Azrou (Parc National d'Ifrane) et les plages de Dakhla (sports nautiques et éco-lodges).",
      },
    },
    {
      "@type": "Question",
      name: "Quels emplois existent dans le tourisme durable au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le tourisme durable au Maroc crée des emplois spécifiques : guides de randonnée certifiés (accompagnateur en montagne, guide naturaliste), gestionnaires d'éco-lodges et de maisons d'hôtes vertes, coordinateurs de tourisme solidaire et communautaire, responsables RSE dans les hôtels, experts en certification environnementale (Green Key, Rainforest Alliance), et formateurs en pratiques hôtelières durables.",
      },
    },
    {
      "@type": "Question",
      name: "Comment un hôtel peut-il obtenir une certification verte au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les principales certifications vertes accessibles aux hôtels marocains sont la Clef Verte (Green Key), délivrée par la Foundation for Environmental Education, et l'EarthCheck. Pour l'obtenir, l'établissement doit réduire sa consommation d'eau et d'énergie, gérer ses déchets, utiliser des produits locaux et sensibiliser son personnel et ses clients. Le Ministère marocain du Tourisme subventionne une partie des audits de certification.",
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
      name: "Actualités Tourisme",
      item: "https://siyahamag.ma/actualites",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Tourisme Durable Maroc 2026",
      item: "https://siyahamag.ma/guide/tourisme-durable-maroc-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function TourismeDurableMarocPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&h=600&fit=crop"
            alt="Paysage naturel marocain préservé avec des dunes de sable et un ciel étoilé"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Analyse Marché
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Tourisme Durable au Maroc 2026 : Éco-Tourisme, Tendances &amp; Emplois Verts
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Actualités Tourisme", href: "/actualites" },
              { label: "Tourisme Durable Maroc 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>25 avril 2026</span>
            <span>·</span>
            <span>Lecture : 11 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Le Maroc s&apos;impose comme l&apos;un des leaders africains du tourisme durable. Avec une
              stratégie nationale ambitieuse, des paysages naturels d&apos;exception et une richesse
              culturelle incomparable, le Royaume chérifien attire une nouvelle génération de voyageurs
              éco-responsables. Mais le tourisme durable, c&apos;est aussi un secteur qui génère des emplois
              qualifiés et des opportunités d&apos;investissement inédites. Tour d&apos;horizon.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "380+", label: "Éco-lodges et maisons d'hôtes vertes", color: "bg-green-50 border-green-200" },
                { value: "28 %", label: "Touristes sensibles à l'éco-tourisme", color: "bg-emerald-50 border-emerald-200" },
                { value: "12 000", label: "Emplois verts dans le tourisme", color: "bg-teal-50 border-teal-200" },
                { value: "2030", label: "Objectif zéro déchet dans les parcs", color: "bg-lime-50 border-lime-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Le Tourisme Durable au Maroc : État des Lieux 2026</h2>
            <p>
              Le Maroc a inscrit le tourisme durable au cœur de sa stratégie de développement
              touristique. La Vision Tourisme 2030 du Ministère du Tourisme, de l&apos;Artisanat et de
              l&apos;Économie Sociale place la durabilité comme l&apos;un des trois piliers stratégiques du
              secteur, aux côtés de la compétitivité et de l&apos;inclusion.
            </p>
            <p>
              En 2026, on dénombre plus de <strong>380 éco-lodges et maisons d&apos;hôtes certifiées</strong>
              en termes de pratiques durables, principalement dans les zones rurales et les régions de
              montagne. Le segment de l&apos;éco-tourisme représente aujourd&apos;hui environ <strong>8 %</strong>
              des nuitées touristiques totales, contre 3 % en 2020, une progression qui reflète
              l&apos;évolution des attentes des voyageurs internationaux.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 not-prose">
              <p className="font-semibold text-green-900">Vision Tourisme 2030 — axe durabilité</p>
              <p className="text-green-800 text-sm mt-1">
                Le gouvernement marocain s&apos;est fixé pour objectif d&apos;atteindre <strong>30 %</strong>
                des nuitées dans des hébergements certifiés durables d&apos;ici 2030. Un fonds de soutien
                de 500 millions de dirhams est dédié à la mise aux normes environnementales des
                établissements hôteliers, avec des subventions pouvant couvrir 40 % du coût des travaux.
              </p>
            </div>

            <h2>Les Grandes Destinations d&apos;Éco-Tourisme au Maroc</h2>
            <p>
              La diversité géographique du Maroc — des côtes atlantiques aux sommets de l&apos;Atlas en
              passant par le désert saharien — en fait une destination idéale pour l&apos;éco-tourisme.
              Voici les zones phares du tourisme responsable en 2026 :
            </p>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  destination: "Parc National de Toubkal (Haut Atlas)",
                  description: "Randonnées responsables, refuges certifiés, guides locaux agréés. Plus de 40 000 randonneurs éco-responsables par an.",
                  activites: ["Trekking", "Bivouac éco", "Faune locale"],
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  destination: "Erg Chebbi et Merzougua (Sahara)",
                  description: "Camps nomades durables, expériences astronomiques, réduction de l'empreinte carbone des excursions en 4x4.",
                  activites: ["Bivouac désert", "Astronomie", "Caravane chameau"],
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  destination: "Dakhla (Côte Atlantique Sud)",
                  description: "Éco-lodges sur le lagon, kitesurf et windsurf responsables, protection des écosystèmes marins.",
                  activites: ["Kitesurf", "Éco-lodge", "Ornithologie"],
                  couleur: "bg-cyan-50 border-cyan-200",
                },
                {
                  destination: "Parc National d'Ifrane (Moyen Atlas)",
                  description: "Forêt de cèdres préservée, observation des singes de Barbarie, randonnées pédagogiques pour scolaires.",
                  activites: ["Forêt cèdres", "Faune endémique", "Ski durable"],
                  couleur: "bg-green-50 border-green-200",
                },
                {
                  destination: "Souss-Massa (Parc National)",
                  description: "Réserve naturelle d'Ibis chauve, oiseaux migrateurs, birding tours certifiés.",
                  activites: ["Ornithologie", "Safari photo", "Plages préservées"],
                  couleur: "bg-teal-50 border-teal-200",
                },
              ].map((item) => (
                <div key={item.destination} className={`${item.couleur} border rounded-xl p-5`}>
                  <div className="font-bold text-gray-900 text-base mb-1">{item.destination}</div>
                  <div className="text-sm text-gray-700 mb-3">{item.description}</div>
                  <div className="flex flex-wrap gap-2">
                    {item.activites.map((a) => (
                      <span key={a} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <img
              src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&h=400&fit=crop"
              alt="Randonneurs dans les montagnes de l'Atlas au Maroc avec un guide local"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Certifications et Labels Verts pour les Établissements Marocains</h2>
            <p>
              L&apos;obtention d&apos;une certification environnementale est devenue un atout commercial majeur
              pour les établissements touristiques marocains. Les voyageurs internationaux, notamment
              européens et nord-américains, filtrent désormais leurs recherches selon des critères
              de durabilité. Voici les labels les plus reconnus :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Label</th>
                    <th className="text-left p-3 border border-gray-200">Organisme</th>
                    <th className="text-center p-3 border border-gray-200">Établissements certifiés au Maroc</th>
                    <th className="text-center p-3 border border-gray-200">Coût audit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Clef Verte (Green Key)", organisme: "Foundation for Environmental Education", nb: "120+", cout: "8 000–15 000 MAD" },
                    { label: "EarthCheck", organisme: "EarthCheck Pty Ltd (Australie)", nb: "45+", cout: "15 000–30 000 MAD" },
                    { label: "Travelife", organisme: "ABTA / Travel Foundation", nb: "30+", cout: "5 000–12 000 MAD" },
                    { label: "Rainforest Alliance", organisme: "Rainforest Alliance (USA)", nb: "12+", cout: "20 000–40 000 MAD" },
                    { label: "Label Éco-Lodge Maroc", organisme: "Ministère Tourisme Maroc", nb: "180+", cout: "Gratuit (subventionné)" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium text-green-700">{row.label}</td>
                      <td className="p-3 border border-gray-200 text-sm">{row.organisme}</td>
                      <td className="p-3 border border-gray-200 text-center font-semibold">{row.nb}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.cout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Emplois Verts dans le Tourisme Marocain : Les Métiers d&apos;Avenir</h2>
            <p>
              Le tourisme durable génère des emplois spécifiques qui n&apos;existaient pas il y a dix ans.
              Ces &quot;emplois verts&quot; requièrent une double compétence — expertise sectorielle et
              sensibilité environnementale — et sont parmi les plus recherchés du marché en 2026 :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  poste: "Guide Éco-Touristique Certifié",
                  detail: "Accompagnement de groupes en milieu naturel, interprétation de l'environnement",
                  salaire: "4 500 – 9 000 MAD",
                  formation: "Diplôme guide officiel + certification naturaliste",
                  couleur: "bg-green-50 border-green-200",
                },
                {
                  poste: "Responsable RSE Hôtelier",
                  detail: "Pilotage de la stratégie environnementale et sociale de l'établissement",
                  salaire: "10 000 – 18 000 MAD",
                  formation: "Master tourisme durable ou RSE",
                  couleur: "bg-emerald-50 border-emerald-200",
                },
                {
                  poste: "Gestionnaire d'Éco-Lodge",
                  detail: "Direction opérationnelle d'un hébergement durable en zone naturelle",
                  salaire: "8 000 – 15 000 MAD",
                  formation: "BTS hôtellerie + formation éco-tourisme",
                  couleur: "bg-teal-50 border-teal-200",
                },
                {
                  poste: "Coordinateur Tourisme Solidaire",
                  detail: "Conception et gestion de circuits impliquant les communautés locales",
                  salaire: "7 000 – 12 000 MAD",
                  formation: "Licence tourisme + expérience terrain",
                  couleur: "bg-lime-50 border-lime-200",
                },
                {
                  poste: "Auditeur Environnemental Hôtelier",
                  detail: "Évaluation et conseil pour l'obtention de certifications vertes",
                  salaire: "12 000 – 22 000 MAD",
                  formation: "Ingénieur environnement ou master développement durable",
                  couleur: "bg-blue-50 border-blue-200",
                },
              ].map((item) => (
                <div key={item.poste} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="flex flex-wrap gap-3 items-start justify-between mb-2">
                    <div>
                      <div className="font-bold text-gray-900">{item.poste}</div>
                      <div className="text-sm text-gray-600">{item.detail}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-gray-900 text-sm">{item.salaire}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 bg-white/60 rounded px-2 py-1 inline-block">
                    Formation : {item.formation}
                  </div>
                </div>
              ))}
            </div>

            <h2>La Stratégie du Maroc pour un Tourisme Durable d&apos;ici 2030</h2>
            <p>
              Le Maroc a adopté plusieurs programmes nationaux structurants pour accélérer la
              transition vers un tourisme durable :
            </p>

            <h3>1. Programme &quot;Hôtels Verts&quot;</h3>
            <p>
              Lancé en 2024 par le Ministère du Tourisme en partenariat avec l&apos;ADEREE (Agence Nationale
              pour le Développement des Énergies Renouvelables et de l&apos;Efficacité Énergétique), ce
              programme accompagne les hôtels dans l&apos;installation de panneaux solaires, la récupération
              des eaux pluviales et la gestion des déchets. En 2026, plus de <strong>650 établissements</strong>
              ont bénéficié de ce programme, réduisant leur consommation énergétique de 25 % en moyenne.
            </p>

            <h3>2. Tourisme Rural et Communautaire</h3>
            <p>
              Le programme &quot;Tourisme Rural&quot; de l&apos;ONMT (Office National Marocain du Tourisme) soutient
              la création de coopératives touristiques dans les zones rurales. En 2026, on dénombre
              plus de <strong>280 coopératives actives</strong> dans les régions de l&apos;Atlas, du Rif
              et du Sahara, offrant des circuits authentiques avec hébergement chez l&apos;habitant et
              gastronomie locale.
            </p>

            <h3>3. Gestion Durable des Sites Naturels</h3>
            <p>
              Le Maroc gère actuellement <strong>10 parcs nationaux</strong> couvrant plus de
              1,5 million d&apos;hectares. L&apos;Agence Nationale des Eaux et Forêts (ANEF) travaille avec les
              opérateurs touristiques pour développer des chartes d&apos;écotourisme, limiter la capacité
              de charge des sites les plus fréquentés et former les guides locaux aux pratiques
              d&apos;accompagnement responsable.
            </p>

            <img
              src="https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=900&h=400&fit=crop"
              alt="Éco-lodge marocain en pisé avec jardins et panneaux solaires dans le désert"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Coupe du Monde 2030 et Durabilité : Le Pari Vert du Maroc</h2>
            <p>
              La Coupe du Monde FIFA 2030 représente à la fois un défi et une opportunité pour le
              tourisme durable marocain. Le Comité d&apos;Organisation s&apos;est engagé à faire de cet
              événement l&apos;un des plus durables de l&apos;histoire de la compétition :
            </p>
            <ul>
              <li>
                <strong>100 % d&apos;énergie renouvelable</strong> pour les stades et les fan zones
              </li>
              <li>
                Construction des nouveaux hôtels selon les normes <strong>LEED Gold minimum</strong>
              </li>
              <li>
                Programme de <strong>compensation carbone</strong> pour les vols des supporters (partenariat avec des coopératives d&apos;arganiers)
              </li>
              <li>
                Formation de <strong>10 000 professionnels du tourisme</strong> aux pratiques durables d&apos;ici 2029
              </li>
              <li>
                Héritage post-CM : création d&apos;un <strong>réseau de destinations éco-certifiées</strong> dans les 6 villes hôtes
              </li>
            </ul>
            <p>
              Ces engagements créent une demande croissante pour des professionnels spécialisés
              en tourisme durable, avec des recrutements prévus dans toutes les villes hôtes
              à partir de 2027.
            </p>

            <h2>Comment Travailler dans le Tourisme Durable au Maroc ?</h2>
            <p>
              Le secteur du tourisme durable est en pleine structuration au Maroc. Voici les voies
              d&apos;accès les plus efficaces pour construire une carrière dans ce domaine :
            </p>

            <h3>Formations recommandées</h3>
            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
              {[
                { icon: "🌿", comp: "Master Tourisme Durable", detail: "Universités de Marrakech, Agadir et Rabat — 2 ans" },
                { icon: "🏔️", comp: "Diplôme Guide Officiel Maroc", detail: "ISITT + stage terrain en milieu naturel — 18 mois" },
                { icon: "☀️", comp: "Certification Énergie Renouvelable", detail: "ADEREE ou IRESEN — spécialisation hôtelière" },
                { icon: "🤝", comp: "Licence Développement Local", detail: "Axe tourisme communautaire, financement bourses INDH" },
                { icon: "📊", comp: "Formation RSE Hôtellerie", detail: "CFCIM ou formations en ligne (3 à 6 mois)" },
                { icon: "🌍", comp: "Certification ISO 14001", detail: "Management environnemental, valorisé dans les chaînes" },
              ].map((item) => (
                <div key={item.comp} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.comp}</div>
                    <div className="text-xs text-gray-600">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Qu&apos;est-ce que le tourisme durable au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Le tourisme durable au Maroc regroupe les pratiques qui minimisent l&apos;impact
                environnemental tout en valorisant les communautés et le patrimoine local. Cela inclut
                les éco-lodges, les circuits solidaires et les hôtels certifiés Green Key ou Clef Verte.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelles sont les meilleures destinations d&apos;éco-tourisme au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Toubkal (trekking responsable), Erg Chebbi (bivouac durable), Dakhla (éco-lodges
                sur le lagon), Ifrane (forêt de cèdres) et le Parc National de Souss-Massa
                (ornithologie) sont les destinations phares de l&apos;éco-tourisme marocain.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quels emplois existent dans le tourisme durable au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Guides éco-touristiques certifiés, responsables RSE hôteliers, gestionnaires
                d&apos;éco-lodges, coordinateurs tourisme solidaire et auditeurs environnementaux sont
                les principaux métiers verts du tourisme marocain. Les salaires varient de
                4 500 à 22 000 MAD selon le poste.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Comment obtenir une certification verte pour un hôtel au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Les labels les plus accessibles sont la Clef Verte (Green Key) et le Label Éco-Lodge
                Maroc du Ministère du Tourisme (subventionné). L&apos;hôtel doit réduire sa consommation
                d&apos;eau et d&apos;énergie, gérer ses déchets et sensibiliser son personnel. Un fonds de
                500 millions de dirhams subventionne jusqu&apos;à 40 % des travaux de mise aux normes.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Trouvez un emploi dans le tourisme durable sur SiyahaMag
              </h3>
              <p className="text-green-100 mb-4">
                Guides éco-touristiques, gestionnaires d&apos;éco-lodges, responsables RSE — toutes les offres
                d&apos;emploi vert du tourisme marocain sur une seule plateforme.
              </p>
              <Link
                href="/emplois"
                className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                Voir les offres tourisme durable →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/analyse-marche-tourisme-agadir-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Analyse Marché Tourisme Agadir 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Chiffres clés et tendances du tourisme à Agadir
                </div>
              </Link>
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investissement Hôtelier Marrakech 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Opportunités et rendements dans la capitale touristique
                </div>
              </Link>
              <Link
                href="/guide/coupe-du-monde-2030-tourisme"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Coupe du Monde 2030 : Impact Tourisme Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Comment la CM2030 transforme le tourisme marocain
                </div>
              </Link>
              <Link
                href="/statistiques"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
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
