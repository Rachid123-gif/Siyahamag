import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Investissement Hôtelier Marrakech 2026 : Rendements, Opportunités & Guide | SiyahaMag",
  description:
    "Guide complet de l'investissement hôtelier à Marrakech en 2026 : rendements locatifs, prix au m², opportunités riads et hôtels, fiscalité et conseils d'experts pour investir dans la ville ocre.",
  alternates: {
    canonical: "/guide/investissement-hotelier-marrakech-2026",
  },
  openGraph: {
    title: "Investissement Hôtelier Marrakech 2026 : Rendements & Opportunités",
    description:
      "Marrakech, 1ère destination d'investissement hôtelier au Maghreb. Découvrez les rendements, les zones à fort potentiel et les opportunités pour 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investissement hotel marrakech",
    "investir marrakech tourisme",
    "riad investissement marrakech",
    "rendement locatif marrakech",
    "prix immobilier marrakech hotelier",
    "investissement touristique maroc",
    "acheter riad marrakech",
    "hotel investissement marrakech 2026",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Investissement Hôtelier à Marrakech 2026 : Guide Complet",
  description:
    "Guide de l'investissement hôtelier à Marrakech — rendements, zones stratégiques, fiscalité et opportunités en 2026.",
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
  datePublished: "2026-04-22",
  dateModified: "2026-04-22",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/investissement-hotelier-marrakech-2026",
  image:
    "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le rendement moyen d'un investissement hôtelier à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le rendement brut moyen d'un investissement hôtelier à Marrakech se situe entre 7 % et 12 % selon le type de bien et la localisation. Un riad bien géré en médina peut atteindre 10 à 14 % de rendement brut grâce aux plateformes de location courte durée. Les hôtels classés en zone Guéliz affichent des rendements nets de 6 à 9 %.",
      },
    },
    {
      "@type": "Question",
      name: "Quel budget prévoir pour investir dans un riad à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le budget d'entrée pour un riad à rénover en médina de Marrakech démarre à 2,5 millions MAD (environ 230 000 €). Un riad clé-en-main avec 5 chambres en état locatif immédiat se négocie entre 5 et 12 millions MAD. Les prix ont progressé de 18 % entre 2024 et 2026 sous l'effet de la demande internationale et de la Coupe du Monde 2030.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les zones les plus rentables pour investir à Marrakech ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La médina (Bab Doukkala, Mouassine) offre les meilleurs rendements locatifs pour les riads touristiques. La Palmeraie est prisée pour les résidences de luxe et éco-lodges. Guéliz attire les hôtels d'affaires. L'Hivernage convient aux boutique-hôtels 4-5 étoiles. Les nouvelles zones (Route d'Ouarzazate, Agdal) présentent des prix encore accessibles avec fort potentiel.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la fiscalité pour un investissement hôtelier étranger au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les investisseurs étrangers bénéficient d'exonérations fiscales attractives au Maroc : exonération d'IS pendant 5 ans pour les nouveaux établissements hôteliers, TVA récupérable sur les travaux, et possibilité de rapatriement des revenus en devises. La convention fiscale France-Maroc évite la double imposition. Le Code des investissements marocain 2023 renforce ces avantages.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il obligatoirement résider au Maroc pour gérer un investissement hôtelier ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, de nombreux investisseurs gèrent leurs biens à distance via des sociétés de gestion locative spécialisées. Ces sociétés prennent en charge l'exploitation, la relation client, l'entretien et la comptabilité, moyennant une commission de 15 à 25 % des revenus. Des plateformes comme Airbnb et Booking.com permettent une gestion semi-autonome avec des taux d'occupation optimisés.",
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
      name: "Investissement Hôtelier Marrakech 2026",
      item: "https://siyahamag.ma/guide/investissement-hotelier-marrakech-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function InvestissementHotelierMarrakechPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1400&h=600&fit=crop"
            alt="Riad de luxe à Marrakech avec patio et fontaine traditionnelle"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Investissement
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Investissement Hôtelier à Marrakech 2026 : Guide Complet des Opportunités
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Investissement", href: "/investissement" },
              { label: "Investissement Hôtelier Marrakech 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>22 avril 2026</span>
            <span>·</span>
            <span>Lecture : 9 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Marrakech s&apos;impose comme la première destination d&apos;investissement hôtelier au Maghreb.
              Avec 4,2 millions de touristes internationaux attendus en 2026, une Coupe du Monde 2030 qui
              propulse la demande et des rendements locatifs parmi les plus élevés d&apos;Afrique, la ville
              ocre offre des opportunités exceptionnelles pour les investisseurs avertis.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "8–12 %", label: "Rendement brut moyen", color: "bg-amber-50 border-amber-200" },
                { value: "4,2 M", label: "Touristes attendus 2026", color: "bg-blue-50 border-blue-200" },
                { value: "+18 %", label: "Hausse des prix 2024–2026", color: "bg-green-50 border-green-200" },
                { value: "2030", label: "Coupe du Monde (catalyseur)", color: "bg-red-50 border-red-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Pourquoi Investir à Marrakech en 2026 ?</h2>
            <p>
              La ville ocre bénéficie d&apos;un triple catalyseur sans précédent : la montée en gamme de
              l&apos;offre touristique nationale, l&apos;afflux d&apos;investissements internationaux liés à la
              Coupe du Monde 2030, et un déficit structurel de logements de qualité face à une demande
              en forte croissance. Cette convergence crée une fenêtre d&apos;opportunité rare pour les
              investisseurs qui agissent en 2026.
            </p>
            <p>
              Le taux d&apos;occupation moyen des établissements hôteliers marrakchis atteint
              <strong> 78 % sur l&apos;année</strong>, contre 68 % en 2022. En haute saison (octobre–avril),
              ce chiffre dépasse les 90 % dans les riads bien référencés, permettant des revenus
              locatifs particulièrement attractifs.
            </p>

            <h2>Les Zones Stratégiques d&apos;Investissement</h2>

            <h3>1. La Médina : le cœur battant du tourisme de luxe</h3>
            <p>
              La médina de Marrakech, classée au Patrimoine Mondial de l&apos;UNESCO, concentre la majorité
              des riads touristiques haut de gamme. Les quartiers de <strong>Mouassine, Bab Doukkala
              et Riad Zitoun</strong> affichent les prix les plus élevés mais aussi les meilleurs
              rendements : entre 10 et 14 % bruts pour un riad bien géré.
            </p>
            <p>
              Le prix moyen d&apos;un riad en médina (5 à 8 chambres) se situe entre 5 et 15 millions MAD
              selon l&apos;état, la localisation et le niveau de rénovation. Les riads à rénover représentent
              les meilleures opportunités pour les investisseurs disposant d&apos;un budget travaux, avec des
              plus-values potentielles de 30 à 50 % après réhabilitation.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 not-prose">
              <p className="font-semibold text-amber-900">Bon à savoir</p>
              <p className="text-amber-800 text-sm mt-1">
                Les riads de la médina sont soumis aux règles de l&apos;ADER (Agence pour la Dédensification
                et la Réhabilitation de la Médina) qui impose des contraintes architecturales mais
                garantit aussi la valeur patrimoniale des biens.
              </p>
            </div>

            <h3>2. La Palmeraie : l&apos;eldorado des éco-lodges</h3>
            <p>
              La Palmeraie de Marrakech, avec ses 13 000 palmiers sur 13 000 hectares, attire
              une clientèle internationale de très haut de gamme. Les éco-lodges et villas de luxe
              y affichent des tarifs nuitée de 800 à 3 000 € pour 2 à 4 nuits, générant des revenus
              exceptionnels sur une courte saison.
            </p>
            <p>
              Le prix du terrain constructible en Palmeraie oscille entre 1 500 et 4 000 MAD/m²,
              avec des restrictions de construction strictes (hauteur maximale, emprise au sol)
              qui préservent le caractère naturel de la zone et donc la valeur des biens existants.
            </p>

            <h3>3. Guéliz et l&apos;Hivernage : le marché des hôtels d&apos;affaires</h3>
            <p>
              Le quartier moderne de Guéliz et l&apos;Hivernage accueillent les hôtels 4-5 étoiles
              chaînes internationales (Marriott, Sofitel, Four Seasons). Les opportunités
              d&apos;investissement portent sur la <strong>reprise d&apos;établissements existants</strong>
              ou la construction de boutique-hôtels sur des terrains encore disponibles.
            </p>

            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=900&h=400&fit=crop"
              alt="Vue aérienne de Marrakech avec les palmeraies et l'Atlas en arrière-plan"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Analyse des Rendements par Type de Bien</h2>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Type de bien</th>
                    <th className="text-center p-3 border border-gray-200">Prix moyen</th>
                    <th className="text-center p-3 border border-gray-200">Rendement brut</th>
                    <th className="text-center p-3 border border-gray-200">Taux d&apos;occupation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "Riad médina (5–8 ch.)", prix: "5–15 M MAD", rendement: "10–14 %", occupation: "80–92 %" },
                    { type: "Riad médina à rénover", prix: "2,5–6 M MAD", rendement: "8–12 %", occupation: "75–85 %" },
                    { type: "Boutique-hôtel Guéliz", prix: "20–50 M MAD", rendement: "7–9 %", occupation: "72–82 %" },
                    { type: "Éco-lodge Palmeraie", prix: "8–30 M MAD", rendement: "9–13 %", occupation: "60–75 %" },
                    { type: "Villa Palmeraie (location)", prix: "5–25 M MAD", rendement: "6–10 %", occupation: "55–70 %" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.type}</td>
                      <td className="p-3 border border-gray-200 text-center">{row.prix}</td>
                      <td className="p-3 border border-gray-200 text-center text-green-700 font-semibold">{row.rendement}</td>
                      <td className="p-3 border border-gray-200 text-center">{row.occupation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Fiscalité et Avantages pour les Investisseurs Étrangers</h2>
            <p>
              Le Maroc propose un cadre fiscal particulièrement favorable aux investissements
              hôteliers étrangers, renforcé par le Code des investissements de 2023 :
            </p>
            <ul>
              <li>
                <strong>Exonération d&apos;IS</strong> : 5 ans d&apos;exonération totale de l&apos;impôt
                sur les sociétés pour tout nouvel établissement hôtelier
              </li>
              <li>
                <strong>TVA récupérable</strong> sur tous les travaux de construction et rénovation
              </li>
              <li>
                <strong>Rapatriement des bénéfices</strong> en devises garanti par l&apos;Office des Changes
              </li>
              <li>
                <strong>Double imposition évitée</strong> grâce aux conventions fiscales avec
                France, Espagne, Belgique, Italie, Allemagne et 50+ pays
              </li>
              <li>
                <strong>Abattements fonciers</strong> pour les terrains acquis dans le cadre
                de projets touristiques labellisés
              </li>
            </ul>

            <h2>Impact de la Coupe du Monde 2030 sur l&apos;Investissement</h2>
            <p>
              Marrakech accueillera plusieurs matchs de la Coupe du Monde de football 2030,
              co-organisée par le Maroc, l&apos;Espagne et le Portugal. Cet événement planétaire
              engendre des investissements massifs en infrastructure qui bénéficient directement
              à la rentabilité des établissements hôteliers :
            </p>
            <ul>
              <li>Extension de l&apos;aéroport Marrakech-Ménara avec une capacité portée à 10 millions de passagers</li>
              <li>Ligne à grande vitesse Casablanca–Marrakech en cours de finalisation</li>
              <li>Réaménagement urbain du centre-ville et de l&apos;accès à la Palmeraie</li>
              <li>Mise aux normes FIFA de 6 hôtels 5 étoiles impliquant des rénovations profondes</li>
            </ul>
            <p>
              Les experts immobiliers anticipent une <strong>appréciation supplémentaire de 25 à 35 %</strong>
              des biens hôteliers bien positionnés entre 2026 et 2030, offrant une plus-value
              considérable aux investisseurs entrant dès aujourd&apos;hui.
            </p>

            <img
              src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=900&h=400&fit=crop"
              alt="Détail architectural d'un riad traditionnel marocain avec zellige coloré"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Comment Investir : Étapes Pratiques</h2>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  num: "01",
                  titre: "Définir votre stratégie",
                  desc: "Riad en location courte durée, hôtel classé ou éco-lodge ? Chaque modèle a ses propres contraintes réglementaires, fiscales et de gestion.",
                },
                {
                  num: "02",
                  titre: "Sélectionner et visiter les biens",
                  desc: "Faites appel à un agent immobilier local spécialisé dans le marché hôtelier. Prévoyez au moins 3 visites et une inspection technique indépendante.",
                },
                {
                  num: "03",
                  titre: "Due diligence juridique",
                  desc: "Vérifier le titre foncier (réquisition TF), l'absence de servitudes, les autorisations d'exploitation hôtelière et la conformité aux normes incendie.",
                },
                {
                  num: "04",
                  titre: "Structurer l'investissement",
                  desc: "Création d'une société marocaine (SARL ou SA) recommandée. Permet d'optimiser la fiscalité et de faciliter les transactions en devises.",
                },
                {
                  num: "05",
                  titre: "Choisir un opérateur de gestion",
                  desc: "Confier la gestion à un professionnel local réduit les risques et optimise le remplissage. Compter 15–25 % de commission sur les revenus.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-500 min-w-12">{step.num}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{step.titre}</div>
                    <div className="text-gray-600 text-sm mt-1">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le rendement moyen d&apos;un investissement hôtelier à Marrakech ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Le rendement brut moyen se situe entre 7 % et 12 % selon le type de bien. Un riad bien
                géré en médina peut atteindre 10 à 14 % de rendement brut. Les hôtels classés en zone
                Guéliz affichent des rendements nets de 6 à 9 %.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel budget prévoir pour investir dans un riad à Marrakech ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                L&apos;entrée de gamme pour un riad à rénover en médina démarre à 2,5 millions MAD
                (environ 230 000 €). Un riad clé-en-main avec 5 chambres se négocie entre 5 et
                12 millions MAD. Les prix ont progressé de 18 % entre 2024 et 2026.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle est la fiscalité pour un investisseur étranger au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Les investisseurs bénéficient d&apos;une exonération d&apos;IS de 5 ans, TVA récupérable
                sur travaux, et rapatriement des revenus en devises garanti. La convention
                France–Maroc évite la double imposition.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Explorez nos opportunités d&apos;investissement à Marrakech
              </h3>
              <p className="text-amber-100 mb-4">
                Riads, hôtels et éco-lodges sélectionnés par nos experts immobiliers touristiques.
              </p>
              <Link
                href="/investissement"
                className="inline-block bg-white text-amber-600 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors"
              >
                Voir les opportunités →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/investir-riad-maroc"
                className="block p-4 border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investir dans un Riad au Maroc : Guide 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Stratégies et conseils pour acheter et rentabiliser un riad traditionnel
                </div>
              </Link>
              <Link
                href="/guide/analyse-marche-tourisme-agadir-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Tourisme Agadir 2026 : Analyse de Marché
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Taux d&apos;occupation, chiffres clés et opportunités à Agadir
                </div>
              </Link>
              <Link
                href="/emploi"
                className="block p-4 border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Offres d&apos;emploi tourisme Maroc
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Gérez votre investissement avec les meilleurs profils du secteur
                </div>
              </Link>
              <Link
                href="/guide/coupe-du-monde-2030-tourisme"
                className="block p-4 border border-gray-200 rounded-xl hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Coupe du Monde 2030 : Impact sur le Tourisme
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Comment le Mondial transforme le marché immobilier touristique marocain
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
