import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Emploi Restauration & Hôtellerie Fès 2026 : Offres, Salaires & Conseils | SiyahaMag",
  description:
    "Guide complet pour trouver un emploi dans la restauration et l'hôtellerie à Fès. Offres disponibles, salaires moyens, compétences recherchées et conseils pour décrocher votre poste en 2026.",
  alternates: {
    canonical: "/guide/emploi-restauration-fes-2026",
  },
  openGraph: {
    title: "Emploi Restauration & Hôtellerie Fès 2026 : Offres & Salaires",
    description:
      "Fès recrute ! Découvrez les opportunités d'emploi dans la restauration et l'hôtellerie de la capitale spirituelle du Maroc.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi restauration fes",
    "emploi hotel fes",
    "travail hotellerie fes maroc",
    "chef cuisine fes",
    "recrutement restauration fes",
    "offre emploi fes tourisme",
    "salaire restauration fes",
    "job hotellerie fes medina",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Emploi Restauration & Hôtellerie à Fès 2026 : Guide Complet",
  description:
    "Guide complet pour trouver un emploi dans la restauration et l'hôtellerie à Fès — offres, salaires et conseils pratiques.",
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
  mainEntityOfPage: "https://siyahamag.ma/guide/emploi-restauration-fes-2026",
  image:
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le salaire moyen dans la restauration à Fès ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le salaire moyen dans la restauration à Fès varie entre 3 500 et 12 000 MAD par mois selon le poste et l'établissement. Un serveur débutant gagne environ 3 500 à 5 000 MAD/mois. Un chef cuisinier confirmé dans un riad ou restaurant gastronomique peut atteindre 10 000 à 15 000 MAD. Les postes de direction (directeur de restaurant, chef exécutif) se négocient entre 15 000 et 25 000 MAD.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les principaux employeurs dans l'hôtellerie à Fès ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les principaux employeurs hôteliers à Fès sont : Marriott Fès (Palais de Fès), Riad Fès — Relais & Châteaux, Sofitel Palais Jamai, Barceló Fès Medina, Dar Roumana et une centaine de riads-hôtels boutique dans la médina. Les restaurants gastronomiques comme La Maison Bleue et Dar Hatim recrutent également régulièrement des profils qualifiés.",
      },
    },
    {
      "@type": "Question",
      name: "Quels profils sont les plus recherchés dans la restauration à Fès en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En 2026, les profils les plus recherchés à Fès sont : chefs cuisiniers maîtrisant la gastronomie marocaine et internationale, réceptionnistes multilingues (français/anglais/espagnol), sommeliers et responsables bar, pâtissiers spécialisés en pâtisserie orientale et française, et managers de restauration avec expérience en hôtellerie 4 et 5 étoiles.",
      },
    },
    {
      "@type": "Question",
      name: "Fès est-elle une bonne ville pour travailler dans l'hôtellerie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, Fès est une destination touristique majeure avec 2,8 millions de visiteurs par an et un parc hôtelier en forte croissance (+18 % d'établissements entre 2023 et 2026). La ville bénéficie d'un fort potentiel avec la montée en gamme de l'offre hôtelière et l'inscription de la médina au patrimoine mondial de l'UNESCO. La Coupe du Monde 2030 (Fès est ville hôte) va accélérer cette dynamique.",
      },
    },
    {
      "@type": "Question",
      name: "Comment trouver un emploi dans l'hôtellerie à Fès ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour trouver un emploi dans l'hôtellerie à Fès : consultez les offres sur SiyahaMag.ma (spécialisé tourisme Maroc), envoyez votre CV directement aux établissements, contactez les agences de recrutement hôtelier comme Hospitality Maroc et RH Tourisme, participez aux forums emploi de l'ISITT de Tanger (formation hôtellerie reconnue) et networkez sur LinkedIn avec les directeurs RH des grands hôtels de Fès.",
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
      name: "Emploi Tourisme",
      item: "https://siyahamag.ma/emploi",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Emploi Restauration & Hôtellerie Fès 2026",
      item: "https://siyahamag.ma/guide/emploi-restauration-fes-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function EmploiRestaurationFesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1400&h=600&fit=crop"
            alt="Médina de Fès avec ses ruelles animées et sa gastronomie traditionnelle"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Guide Emploi
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Emploi Restauration &amp; Hôtellerie à Fès 2026 : Offres, Salaires &amp; Conseils
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Emploi Tourisme", href: "/emploi" },
              { label: "Emploi Restauration & Hôtellerie Fès 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>23 avril 2026</span>
            <span>·</span>
            <span>Lecture : 10 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Fès, capitale spirituelle et culturelle du Maroc, connaît un essor remarquable de son
              industrie hôtelière et de restauration. Avec 2,8 millions de visiteurs en 2025 et la
              désignation de la ville comme site hôte de la Coupe du Monde 2030, les opportunités
              d&apos;emploi dans la restauration et l&apos;hôtellerie fassi n&apos;ont jamais été aussi nombreuses.
              Voici tout ce que vous devez savoir pour décrocher votre poste.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "2,8M", label: "Visiteurs/an à Fès", color: "bg-emerald-50 border-emerald-200" },
                { value: "320+", label: "Établissements hôteliers", color: "bg-blue-50 border-blue-200" },
                { value: "3,5–15K", label: "Salaire mensuel (MAD)", color: "bg-amber-50 border-amber-200" },
                { value: "+18 %", label: "Croissance parc hôtelier 2023–26", color: "bg-purple-50 border-purple-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Fès : Une Destination Gastronomique et Hôtelière en Plein Essor</h2>
            <p>
              La médina de Fès, classée au patrimoine mondial de l&apos;UNESCO depuis 1981, attire chaque
              année une clientèle internationale de plus en plus exigeante. Cette évolution a poussé les
              opérateurs hôteliers et les restaurateurs à investir massivement dans la montée en gamme
              de leurs établissements et dans le recrutement de profils qualifiés.
            </p>
            <p>
              Entre 2023 et 2026, le parc hôtelier de la région Fès-Meknès a enregistré une croissance
              de <strong>18 %</strong>, avec l&apos;ouverture de plusieurs enseignes internationales et la
              rénovation de dizaines de riads en hôtels boutique de luxe. Cette dynamique se traduit
              par un marché de l&apos;emploi particulièrement actif dans les secteurs de la restauration
              et de l&apos;hébergement.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 not-prose">
              <p className="font-semibold text-blue-900">Fès, ville hôte de la Coupe du Monde 2030</p>
              <p className="text-blue-800 text-sm mt-1">
                Désignée comme l&apos;une des six villes marocaines accueillant la Coupe du Monde FIFA 2030,
                Fès va bénéficier d&apos;investissements massifs dans ses infrastructures hôtelières. Les
                estimations prévoient la création de 8 000 à 12 000 emplois supplémentaires dans
                l&apos;hôtellerie-restauration d&apos;ici 2030.
              </p>
            </div>

            <h2>Les Postes les Plus Recherchés à Fès en 2026</h2>
            <p>
              Le marché de l&apos;emploi hôtelier et de restauration à Fès présente des besoins diversifiés.
              Voici les postes les plus fréquemment proposés par les recruteurs fassis en 2026 :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  poste: "Chef Cuisinier / Chef de Partie",
                  secteur: "Gastronomie marocaine & internationale",
                  salaire: "7 000 – 15 000 MAD",
                  demande: "Très forte",
                  couleur: "bg-red-50 border-red-200",
                },
                {
                  poste: "Réceptionniste Hôtel (H/F)",
                  secteur: "Hôtellerie 4 & 5 étoiles, riads",
                  salaire: "4 500 – 8 000 MAD",
                  demande: "Forte",
                  couleur: "bg-orange-50 border-orange-200",
                },
                {
                  poste: "Serveur / Maître d'Hôtel",
                  secteur: "Restaurants gastronomiques, hôtels",
                  salaire: "3 500 – 7 500 MAD",
                  demande: "Forte",
                  couleur: "bg-yellow-50 border-yellow-200",
                },
                {
                  poste: "Pâtissier",
                  secteur: "Pâtisserie orientale, desserts fusion",
                  salaire: "5 000 – 10 000 MAD",
                  demande: "Modérée",
                  couleur: "bg-green-50 border-green-200",
                },
                {
                  poste: "Responsable Hébergement",
                  secteur: "Hôtellerie boutique, riads de luxe",
                  salaire: "8 000 – 14 000 MAD",
                  demande: "Modérée",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  poste: "Gouvernante d'Étage",
                  secteur: "Hôtels 4 & 5 étoiles",
                  salaire: "5 000 – 9 000 MAD",
                  demande: "Forte",
                  couleur: "bg-purple-50 border-purple-200",
                },
              ].map((item) => (
                <div key={item.poste} className={`${item.couleur} border rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between`}>
                  <div>
                    <div className="font-bold text-gray-900">{item.poste}</div>
                    <div className="text-sm text-gray-600">{item.secteur}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 text-sm">{item.salaire}</div>
                    <div className="text-xs text-gray-500">Demande : {item.demande}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Salaires dans la Restauration et l&apos;Hôtellerie à Fès</h2>
            <p>
              Les rémunérations dans le secteur hôtelier et de restauration à Fès ont progressé de
              <strong> 12 % en moyenne</strong> entre 2024 et 2026, portées par la compétition
              accrue entre établissements pour attirer les meilleurs profils. Voici un tableau
              comparatif des salaires bruts observés en 2026 :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Poste</th>
                    <th className="text-center p-3 border border-gray-200">Débutant (0–2 ans)</th>
                    <th className="text-center p-3 border border-gray-200">Confirmé (3–7 ans)</th>
                    <th className="text-center p-3 border border-gray-200">Senior (8+ ans)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { poste: "Chef Exécutif", debut: "—", confirme: "10 000–15 000 MAD", senior: "18 000–28 000 MAD" },
                    { poste: "Chef de Partie", debut: "5 500–7 000 MAD", confirme: "7 500–11 000 MAD", senior: "12 000–16 000 MAD" },
                    { poste: "Réceptionniste", debut: "4 000–5 500 MAD", confirme: "5 500–8 000 MAD", senior: "8 000–12 000 MAD" },
                    { poste: "Serveur", debut: "3 500–4 500 MAD", confirme: "4 500–6 500 MAD", senior: "6 500–9 000 MAD" },
                    { poste: "Pâtissier", debut: "4 500–6 000 MAD", confirme: "6 500–9 500 MAD", senior: "10 000–14 000 MAD" },
                    { poste: "Directeur d'hébergement", debut: "—", confirme: "10 000–15 000 MAD", senior: "16 000–25 000 MAD" },
                    { poste: "Gouvernante d'étage", debut: "4 500–5 500 MAD", confirme: "5 500–8 000 MAD", senior: "8 000–11 000 MAD" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.poste}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.debut}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.confirme}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm text-green-700 font-semibold">{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Salaires bruts indicatifs. Les avantages en nature (repas, logement dans certains établissements) peuvent représenter 800 à 2 000 MAD/mois supplémentaires.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=400&fit=crop"
              alt="Restaurant gastronomique élégant avec une mise en table soignée"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Les Principaux Employeurs Hôteliers et Restaurateurs de Fès</h2>
            <p>
              Fès compte plus de 320 établissements hôteliers classés et une centaine de restaurants
              gastronomiques qui recrutent régulièrement. Voici les principaux acteurs du marché :
            </p>

            <h3>Hôtels internationaux et de prestige</h3>
            <ul>
              <li>
                <strong>Palais de Fès Dar Tazi</strong> — Hôtel boutique de luxe 5 étoiles, recrute régulièrement des profils F&amp;B haut de gamme
              </li>
              <li>
                <strong>Sofitel Palais Jamai</strong> — Établissement historique 5 étoiles, leader du recrutement qualifié à Fès
              </li>
              <li>
                <strong>Barceló Fès Medina</strong> — Hôtel de la chaîne espagnole, profils bilingues et trilingues recherchés
              </li>
              <li>
                <strong>Riad Fès — Relais &amp; Châteaux</strong> — Standard d&apos;excellence, excellent tremplin de carrière
              </li>
              <li>
                <strong>Mövenpick Hotel Fès</strong> — Grande capacité, recrutement annuel de 30 à 50 postes
              </li>
            </ul>

            <h3>Riads-hôtels boutique de la médina</h3>
            <p>
              La médina de Fès compte plus de 200 riads convertis en hôtels boutique, représentant
              un vivier d&apos;emploi important pour les profils polyvalents. Ces établissements offrent
              souvent une expérience polyvalente précieuse pour une carrière internationale.
            </p>

            <h3>Restaurants gastronomiques</h3>
            <ul>
              <li><strong>La Maison Bleue</strong> — Restaurant iconique de la médina, référence de la gastronomie marocaine</li>
              <li><strong>Dar Hatim</strong> — Restaurant traditionnel, formation sur les recettes ancestrales fassi</li>
              <li><strong>Le Restaurant de l&apos;Hôtel Batha</strong> — Cuisine fusion marocaine-internationale</li>
              <li><strong>Café Clock</strong> — Concept innovant, profils créatifs bienvenus</li>
            </ul>

            <h2>Compétences et Formations Valorisées</h2>
            <p>
              Le marché de l&apos;emploi hôtelier à Fès valorise particulièrement les profils issus des
              établissements de formation reconnus. Voici les formations qui facilitent l&apos;insertion
              dans les meilleurs établissements fassis :
            </p>

            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
              {[
                { icon: "🍳", comp: "CAP / BTS Cuisine", detail: "Formation de base indispensable pour les postes en cuisine" },
                { icon: "🏨", comp: "BTS Hôtellerie-Restauration", detail: "Formation complète pour postes d'encadrement" },
                { icon: "🌍", comp: "Multilinguisme", detail: "Français + anglais minimum, espagnol très apprécié" },
                { icon: "📜", comp: "Licence ISITT / ISRTH", detail: "Formations nationales agréées par le Ministère" },
                { icon: "🍷", comp: "Sommellerie (WSET)", detail: "Certification internationale valorisée dans les 5 étoiles" },
                { icon: "⭐", comp: "Expérience en 4/5 étoiles", detail: "2 ans minimum dans un établissement de référence" },
                { icon: "💻", comp: "Maîtrise des PMS", detail: "Opera, Fidelio, ou Protel selon l'établissement" },
                { icon: "🫱", comp: "Service client", detail: "Formation aux standards internationaux (LQA, Forbes)" },
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

            <h2>Conseils Pratiques pour Trouver un Emploi à Fès</h2>

            <h3>1. Candidature directe aux établissements</h3>
            <p>
              La plupart des grands hôtels de Fès centralisent leurs recrutements via leurs départements
              RH internes. Envoyez un CV soigné accompagné d&apos;une lettre de motivation personnalisée
              directement au Directeur des Ressources Humaines de chaque établissement ciblé. Mentionnez
              votre connaissance de la culture fassi et votre appétence pour la gastronomie marocaine.
            </p>

            <h3>2. Plateformes spécialisées tourisme</h3>
            <p>
              Consultez quotidiennement les offres sur <strong>SiyahaMag.ma</strong>, la plateforme
              n°1 de l&apos;emploi touristique marocain, ainsi que Rekrute.ma et Emploi.ma pour les offres
              hôtelières à Fès. Activez les alertes email pour ne manquer aucune opportunité.
            </p>

            <h3>3. Stages de fin d&apos;études</h3>
            <p>
              Les stages en hôtellerie 4 et 5 étoiles à Fès sont souvent convertis en CDI pour les
              profils performants. Anticipez votre recherche de stage 6 mois avant la fin de votre
              formation pour cibler les meilleurs établissements.
            </p>

            <h3>4. Réseaux professionnels</h3>
            <p>
              L&apos;Association Régionale des Hôteliers de Fès-Meknès (ARFM) organise régulièrement des
              forums emploi et des journées de recrutement. Adhérez aux groupes LinkedIn des
              professionnels de l&apos;hôtellerie marocaine et participez aux événements sectoriels.
            </p>

            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&h=400&fit=crop"
              alt="Hall d'hôtel de luxe avec une décoration orientale raffinée"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>L&apos;Impact de la Coupe du Monde 2030 sur l&apos;Emploi à Fès</h2>
            <p>
              La désignation de Fès comme ville hôte de la Coupe du Monde FIFA 2030 va profondément
              transformer le marché de l&apos;emploi hôtelier et de restauration. Les projets en cours
              comprennent :
            </p>
            <ul>
              <li>Construction de <strong>3 nouveaux hôtels 4 et 5 étoiles</strong> près du futur stade de Fès (capacité combinée : 1 200 chambres)</li>
              <li>Rénovation et extension du parc hôtelier existant (+400 chambres planifiées)</li>
              <li>Création d&apos;<strong>un village gastronomique</strong> permanent mettant en valeur la cuisine fassi</li>
              <li>Programme de certification de 2 000 professionnels de l&apos;hôtellerie aux standards FIFA d&apos;ici 2029</li>
            </ul>
            <p>
              Ces projets représentent une opportunité unique pour les jeunes diplômés qui souhaitent
              bâtir une carrière dans l&apos;hôtellerie de luxe au Maroc.
            </p>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le salaire moyen dans la restauration à Fès ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Entre 3 500 et 15 000 MAD/mois selon le poste. Les chefs cuisiniers confirmés dans les
                établissements haut de gamme peuvent atteindre 15 000 à 25 000 MAD. Les avantages en
                nature (repas, logement) peuvent représenter 800 à 2 000 MAD supplémentaires.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quels sont les principaux employeurs hôteliers à Fès ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Sofitel Palais Jamai, Barceló Fès Medina, Mövenpick Hotel Fès, Riad Fès (Relais &amp; Châteaux)
                et les 200+ riads-hôtels boutique de la médina. Les restaurants gastronomiques comme
                La Maison Bleue recrutent également régulièrement.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Fès est-elle une bonne ville pour travailler dans l&apos;hôtellerie ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui, Fès est une destination en forte croissance avec 2,8 millions de visiteurs/an et
                la Coupe du Monde 2030 comme catalyseur. Le parc hôtelier a crû de 18 % entre 2023 et
                2026, créant de nombreuses opportunités d&apos;emploi qualifié.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Comment postuler à un emploi dans l&apos;hôtellerie à Fès ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Consultez SiyahaMag.ma pour les offres spécialisées tourisme, envoyez votre CV directement
                aux DRH des hôtels, participez aux forums emploi de l&apos;ARFM et activez les alertes sur
                Rekrute.ma et LinkedIn.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Trouvez votre poste à Fès sur SiyahaMag
              </h3>
              <p className="text-emerald-100 mb-4">
                Consultez toutes les offres d&apos;emploi dans l&apos;hôtellerie et la restauration à Fès.
                Postulez en 2 minutes avec votre profil candidat.
              </p>
              <Link
                href="/emplois/fes"
                className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Voir les offres à Fès →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/emploi-guide-touristique-maroc"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emploi Guide Touristique Maroc 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Salaires, formations et débouchés pour devenir guide officiel
                </div>
              </Link>
              <Link
                href="/guide/emploi-tourisme-maroc"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emploi Tourisme Maroc : Guide Complet 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Vue d&apos;ensemble des métiers et débouchés du tourisme marocain
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
                  Comment la CM2030 transforme le marché du travail hôtelier
                </div>
              </Link>
              <Link
                href="/emplois"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Toutes les offres d&apos;emploi tourisme
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Hôtels, restaurants, guides — toutes les villes du Maroc
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
