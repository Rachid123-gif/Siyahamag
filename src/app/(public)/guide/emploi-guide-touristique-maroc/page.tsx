import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Emploi Guide Touristique Maroc 2026 : Salaires, Formation & Débouchés | SiyahaMag",
  description:
    "Tout savoir sur le métier de guide touristique au Maroc : salaires moyens par ville, formations reconnues, compétences requises, débouchés et comment postuler en 2026.",
  alternates: {
    canonical: "/guide/emploi-guide-touristique-maroc",
  },
  openGraph: {
    title: "Emploi Guide Touristique Maroc 2026 : Salaires & Formations",
    description:
      "Le guide touristique, métier passion au Maroc. Découvrez les salaires, les formations reconnues et les opportunités dans toutes les régions touristiques marocaines.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi guide touristique maroc",
    "guide touristique maroc salaire",
    "formation guide tourisme maroc",
    "metier guide touristique maroc",
    "guide officiel marrakech",
    "guide touristique fes",
    "recrutement guide tourisme",
    "devenir guide touristique maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Emploi Guide Touristique au Maroc 2026 : Guide Complet",
  description:
    "Salaires, formations, compétences et opportunités d'emploi pour devenir guide touristique au Maroc en 2026.",
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
    "https://siyahamag.ma/guide/emploi-guide-touristique-maroc",
  image:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le salaire d'un guide touristique au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le salaire d'un guide touristique au Maroc varie entre 5 000 et 18 000 MAD par mois selon l'expérience, les langues maîtrisées et la ville. Un guide débutant gagne environ 5 000 à 7 000 MAD/mois hors pourboires. Un guide senior multilingue (français, anglais, espagnol, allemand) dans une destination premium peut atteindre 15 000 à 25 000 MAD en haute saison grâce aux commissions et tips.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle formation faut-il pour devenir guide touristique officiel au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour exercer légalement comme guide touristique officiel au Maroc, il faut obtenir la carte professionnelle de guide délivrée par le Ministère du Tourisme. Deux voies sont possibles : le BTS Tourisme (2 ans après le Bac) dans une école agréée, ou la Licence en Tourisme et Hôtellerie (3 ans). L'examen d'État comprend une épreuve écrite de culture générale touristique et une épreuve orale dans la langue étrangère choisie.",
      },
    },
    {
      "@type": "Question",
      name: "Dans quelles villes y a-t-il le plus d'opportunités pour les guides touristiques au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marrakech concentre le plus grand nombre de postes (environ 4 200 guides officiels actifs), suivie de Fès-Meknès (2 100 guides), Agadir-Souss-Massa (1 800 guides) et Casablanca (1 200 guides). Avec la montée en puissance du tourisme saharien, Dakhla, Merzouga et Ouarzazate offrent également de belles opportunités avec des rémunérations souvent supérieures à la moyenne nationale.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles langues faut-il parler pour être guide touristique au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le français et l'anglais sont indispensables sur l'ensemble du territoire marocain. L'espagnol est très recherché au Nord (Tanger, Tétouan) et à Dakhla. L'allemand et le néerlandais sont valorisés à Agadir. Le japonais et le mandarin commencent à être demandés à Marrakech et Fès avec l'émergence du tourisme asiatique. Chaque langue supplémentaire peut augmenter le salaire de 20 à 40 %.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on travailler comme guide touristique indépendant au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, mais uniquement avec la carte professionnelle de guide officiel. Les guides indépendants peuvent se constituer leur propre clientèle via des plateformes comme Viator, GetYourGuide ou les agences réceptives locales. La rémunération en indépendant est plus variable mais potentiellement plus élevée : entre 800 et 3 000 MAD par journée de visite selon le profil de la clientèle et la saison.",
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
      name: "Emploi Guide Touristique Maroc 2026",
      item: "https://siyahamag.ma/guide/emploi-guide-touristique-maroc",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function EmploiGuideTouristiquePage() {
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
            alt="Guide touristique professionnel accompagnant des visiteurs dans la médina de Marrakech"
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
                Emploi Guide Touristique au Maroc 2026 : Salaires, Formations & Débouchés
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Emploi Tourisme", href: "/emploi" },
              { label: "Emploi Guide Touristique Maroc 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>22 avril 2026</span>
            <span>·</span>
            <span>Lecture : 10 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Le guide touristique est l&apos;un des métiers les plus emblématiques du secteur du tourisme
              marocain. Avec 16 millions de touristes internationaux attendus en 2026 et la perspective
              de la Coupe du Monde 2030, la demande pour des guides professionnels et multilingues
              n&apos;a jamais été aussi forte. Mais comment accéder à cette profession, quels sont les
              salaires et où trouver les meilleures opportunités ?
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "12 000+", label: "Guides officiels au Maroc", color: "bg-emerald-50 border-emerald-200" },
                { value: "5–18K", label: "Salaire mensuel (MAD)", color: "bg-blue-50 border-blue-200" },
                { value: "4", label: "Langues en moyenne/guide senior", color: "bg-amber-50 border-amber-200" },
                { value: "+32 %", label: "Offres de recrutement 2025–26", color: "bg-purple-50 border-purple-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Le Métier de Guide Touristique au Maroc</h2>
            <p>
              Le guide touristique officiel marocain est bien plus qu&apos;un simple accompagnateur : il est
              ambassadeur de la culture, médiateur entre les visiteurs et la richesse patrimoniale du
              pays, et professionnel réglementé par le Ministère du Tourisme. La profession est exercée
              dans un cadre légal strict qui protège à la fois les touristes et les professionnels.
            </p>
            <p>
              Au Maroc, on distingue deux catégories principales de guides :
            </p>
            <ul>
              <li>
                <strong>Guide accompagnateur de voyage</strong> : accompagne les groupes sur tout le
                territoire national, planifie les itinéraires et gère la logistique des circuits
              </li>
              <li>
                <strong>Guide régional / local</strong> : expert d&apos;une ville ou d&apos;une région spécifique,
                spécialisé dans l&apos;histoire, la gastronomie ou les activités outdoor d&apos;une destination
              </li>
            </ul>

            <h2>Salaires des Guides Touristiques par Ville</h2>
            <p>
              La rémunération d&apos;un guide touristique au Maroc dépend fortement de la destination, des
              langues maîtrisées, de l&apos;expérience et du statut (salarié ou indépendant). Voici les
              fourchettes salariales observées en 2026 :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Ville / Région</th>
                    <th className="text-center p-3 border border-gray-200">Guide débutant</th>
                    <th className="text-center p-3 border border-gray-200">Guide confirmé</th>
                    <th className="text-center p-3 border border-gray-200">Guide senior multilingue</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ville: "Marrakech", debut: "5 500–7 000 MAD", confirme: "9 000–13 000 MAD", senior: "15 000–25 000 MAD" },
                    { ville: "Fès – Meknès", debut: "5 000–6 500 MAD", confirme: "8 000–11 000 MAD", senior: "13 000–20 000 MAD" },
                    { ville: "Agadir", debut: "5 000–6 000 MAD", confirme: "7 500–10 500 MAD", senior: "12 000–18 000 MAD" },
                    { ville: "Casablanca", debut: "6 000–7 500 MAD", confirme: "9 500–13 500 MAD", senior: "15 000–22 000 MAD" },
                    { ville: "Dakhla / Sahara", debut: "5 500–7 500 MAD", confirme: "9 000–14 000 MAD", senior: "16 000–28 000 MAD" },
                    { ville: "Tanger – Tétouan", debut: "5 000–6 500 MAD", confirme: "8 000–11 500 MAD", senior: "13 000–19 000 MAD" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.ville}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.debut}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.confirme}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm text-green-700 font-semibold">{row.senior}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Salaires bruts indicatifs hors pourboires. Les guides indépendants peuvent ajouter 30–60 % via les commissions et tips.
              </p>
            </div>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
              <p className="font-semibold text-emerald-900">L&apos;impact des pourboires</p>
              <p className="text-emerald-800 text-sm mt-1">
                Les pourboires (tips) représentent une part significative des revenus : entre 30 et 100 €
                par journée pour un groupe international satisfait. Sur une haute saison de 6 mois,
                cela peut représenter un revenu supplémentaire de 30 000 à 80 000 MAD.
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&h=400&fit=crop"
              alt="Médina de Fès avec ses ruelles animées et son architecture traditionnelle"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Formations pour Devenir Guide Touristique Officiel</h2>
            <p>
              L&apos;exercice de la profession de guide touristique officiel au Maroc est réglementé par
              la loi n° 13-81 et nécessite l&apos;obtention d&apos;une <strong>carte professionnelle de guide</strong>
              délivrée par le Ministère du Tourisme.
            </p>

            <h3>Les filières de formation reconnues</h3>

            <div className="not-prose space-y-4 my-6">
              {[
                {
                  titre: "BTS Tourisme — Bac +2",
                  duree: "2 ans après le Bac",
                  etablissements: "ISITT Tanger, ISRTH Marrakech, ISTA Agadir, Institut Camille Saint-Saëns Rabat",
                  debouches: "Guide local, agent d'accueil, animateur touristique",
                  mention: "Accès direct à l'examen de la carte professionnelle",
                },
                {
                  titre: "Licence Tourisme et Hôtellerie — Bac +3",
                  duree: "3 ans après le Bac",
                  etablissements: "Faculté des Sciences de l'Ingénieur (FSI), universités privées agréées",
                  debouches: "Guide accompagnateur, chef de produit agence réceptive, responsable tourisme",
                  mention: "Formation la plus complète, accès aux postes de management",
                },
                {
                  titre: "Certificat de Guide Régional",
                  duree: "1 an (formation continue)",
                  etablissements: "Délégations régionales du Tourisme (Marrakech, Fès, Agadir, Tanger...)",
                  debouches: "Guide spécialisé sur une destination précise",
                  mention: "Idéal pour reconversion professionnelle",
                },
              ].map((f) => (
                <div key={f.titre} className="border border-gray-200 rounded-xl p-5">
                  <div className="font-bold text-gray-900 text-lg">{f.titre}</div>
                  <div className="text-sm text-emerald-700 font-medium mt-1">⏱ {f.duree}</div>
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Établissements : </span>{f.etablissements}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Débouchés : </span>{f.debouches}
                  </div>
                  <div className="text-xs bg-emerald-50 text-emerald-800 rounded px-3 py-1 mt-2 inline-block">
                    {f.mention}
                  </div>
                </div>
              ))}
            </div>

            <h2>Compétences Indispensables en 2026</h2>
            <p>
              Le profil du guide touristique a évolué avec l&apos;essor du tourisme numérique et les nouvelles
              attentes des voyageurs internationaux. Voici les compétences les plus valorisées par les
              agences réceptives et les opérateurs touristiques marocains en 2026 :
            </p>

            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
              {[
                { icon: "🗣️", comp: "Multilinguisme", detail: "Minimum 2 langues étrangères, idéalement 3+" },
                { icon: "📱", comp: "Maîtrise du digital", detail: "Réseaux sociaux, plateformes de réservation, GPS" },
                { icon: "🏛️", comp: "Culture patrimoniale", detail: "Histoire, architecture, gastronomie marocaine" },
                { icon: "🎭", comp: "Storytelling", detail: "Animer une visite avec des récits captivants" },
                { icon: "🚑", comp: "Premiers secours", detail: "Certification PSC1 de plus en plus exigée" },
                { icon: "♻️", comp: "Tourisme responsable", detail: "Connaissance des enjeux environnementaux" },
                { icon: "📊", comp: "Gestion de groupe", detail: "Coordonner 20–40 personnes en toute sécurité" },
                { icon: "🌿", comp: "Guide nature / outdoor", detail: "Randonnée, désert, montagne : spécialisation très demandée" },
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

            <h2>Opportunités de Recrutement : Où et Comment Postuler</h2>
            <p>
              Le marché de l&apos;emploi pour les guides touristiques marocains est structurellement en tension :
              le nombre de guides formés chaque année (environ 1 200) ne couvre pas la demande des
              opérateurs touristiques (estimée à 2 500 à 3 000 postes sur 2026–2027 selon la FNAVM).
            </p>

            <h3>Les principaux employeurs</h3>
            <ul>
              <li>
                <strong>Agences réceptives nationales</strong> (Menara Tours, Terres et Voyages,
                Kuoni Maroc) — recrutement régulier de guides accompagnateurs
              </li>
              <li>
                <strong>Opérateurs de tourisme d&apos;aventure</strong> (Wilderness Travel, Intrepid,
                G Adventures) — guides spécialisés randonnée, désert, VTT
              </li>
              <li>
                <strong>Hôtels et riads de luxe</strong> — guides dédiés pour clients résidents
              </li>
              <li>
                <strong>Croisières méditerranéennes</strong> — guides portuaires à Tanger, Casablanca,
                Agadir lors des escales
              </li>
              <li>
                <strong>Activité indépendante</strong> via GetYourGuide, Viator, Airbnb Experiences
              </li>
            </ul>

            <img
              src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&h=400&fit=crop"
              alt="Dunes de sable dorées du désert marocain à Merzouga au coucher du soleil"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>L&apos;Impact de la Coupe du Monde 2030 sur la Profession</h2>
            <p>
              La Coupe du Monde 2030 co-organisée par le Maroc représente une opportunité
              professionnelle sans précédent pour les guides touristiques marocains. Les estimations
              prévoient l&apos;arrivée de 1,5 à 2 millions de supporters étrangers pendant la compétition,
              créant un besoin massif de :
            </p>
            <ul>
              <li>Guides spécialisés fan zones et ville-hôte (Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès)</li>
              <li>Interprètes et médiateurs culturels pour les délégations officielles</li>
              <li>Guides pour extensions touristiques post-match (circuits désert, médinas)</li>
              <li>Formateurs pour les bénévoles d&apos;accueil FIFA</li>
            </ul>
            <p>
              Le Ministère du Tourisme prévoit de certifier <strong>3 500 guides supplémentaires</strong>
              avant 2029 via des programmes de formation accélérée, ouvrant la voie à des reconversions
              professionnelles facilitées.
            </p>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le salaire d&apos;un guide touristique au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Entre 5 000 et 18 000 MAD/mois selon l&apos;expérience et les langues. Un guide senior
                multilingue peut atteindre 25 000 MAD en haute saison grâce aux commissions et pourboires.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle formation faut-il pour devenir guide touristique officiel au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                BTS Tourisme (2 ans) ou Licence Tourisme et Hôtellerie (3 ans) dans un établissement
                agréé, puis réussite à l&apos;examen d&apos;État pour obtenir la carte professionnelle de guide.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelles langues faut-il parler pour être guide touristique au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Français et anglais sont indispensables. L&apos;espagnol est très recherché au Nord et à Dakhla.
                L&apos;allemand est valorisé à Agadir. Chaque langue supplémentaire peut augmenter le salaire de 20–40 %.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Peut-on travailler comme guide indépendant au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui, avec la carte professionnelle. Les plateformes GetYourGuide et Viator permettent
                de constituer une clientèle internationale. Revenus entre 800 et 3 000 MAD par journée.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Trouvez votre poste de guide touristique sur SiyahaMag
              </h3>
              <p className="text-emerald-100 mb-4">
                Consultez les offres d&apos;emploi guide touristique dans toutes les régions du Maroc.
                Postulez en 2 minutes avec votre profil candidat.
              </p>
              <Link
                href="/emploi"
                className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Voir les offres d&apos;emploi →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/emploi-hotel-dakhla"
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emploi Hôtel Dakhla 2026 : Offres & Salaires
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Tout sur l&apos;emploi dans l&apos;hôtellerie à Dakhla, la perle du Sahara
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
                  Coupe du Monde 2030 : Impact Emploi Tourisme
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  3 500 postes de guides à pourvoir d&apos;ici 2029
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
                  Guides, réceptionnistes, chefs, animateurs — toutes les villes
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
