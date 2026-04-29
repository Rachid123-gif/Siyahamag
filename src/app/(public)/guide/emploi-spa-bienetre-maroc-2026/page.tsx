import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Emploi Spa & Bien-Être Maroc 2026 : Salaires, Formations & Recrutement | SiyahaMag",
  description:
    "Guide complet emploi spa et bien-être au Maroc en 2026. Salaires par poste (thérapeute, manager spa, esthéticienne), formations reconnues et meilleures destinations qui recrutent.",
  alternates: {
    canonical: "/guide/emploi-spa-bienetre-maroc-2026",
  },
  openGraph: {
    title: "Emploi Spa & Bien-Être Maroc 2026 : Salaires & Opportunités",
    description:
      "Le secteur spa et bien-être au Maroc recrute massivement. Découvrez salaires, formations et conseils pour décrocher un poste dans un hammam de luxe, un spa hôtelier 5 étoiles ou un centre wellness.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi spa maroc 2026",
    "emploi bien-être maroc",
    "thérapeute spa hotel maroc",
    "manager spa maroc salaire",
    "esthéticienne hotel maroc",
    "recrutement spa hammam maroc",
    "wellness tourisme maroc emploi",
    "praticien massage hotel maroc",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Emploi Spa & Bien-Être Maroc 2026 : Guide Complet Salaires et Recrutement",
  description:
    "Guide complet sur les métiers du spa et du bien-être au Maroc en 2026 — salaires, formations, employeurs et opportunités dans les hôtels 4 et 5 étoiles.",
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
  datePublished: "2026-04-29",
  dateModified: "2026-04-29",
  mainEntityOfPage: "https://siyahamag.ma/guide/emploi-spa-bienetre-maroc-2026",
  image:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le salaire d'un thérapeute spa au Maroc en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le salaire d'un thérapeute spa au Maroc varie entre 4 000 et 8 500 MAD par mois selon l'établissement et l'expérience. Un praticien débutant dans un hôtel 3 étoiles gagne entre 3 800 et 5 000 MAD, tandis qu'un thérapeute senior dans un palace ou resort 5 étoiles peut atteindre 8 000 à 10 000 MAD avec les pourboires inclus. Les managers spa touchent entre 10 000 et 18 000 MAD.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles formations sont reconnues pour travailler dans un spa au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les formations les plus reconnues sont le BTS Esthétique-Cosmétique de l'ISITT (2 ans), le Technicien Spécialisé Esthétique de l'OFPPT, les certifications internationales CIDESCO et ITEC (reconnues dans les chaînes internationales), et les diplômes de massothérapie des centres agréés. Les formations en médecines douces (ayurveda, soins asiatiques) constituent un atout différenciant.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles villes marocaines recrutent le plus dans le secteur spa ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marrakech est la capitale incontestée du spa au Maroc avec plus de 400 établissements et 1 800 postes. Agadir arrive en deuxième position avec ses complexes balnéaires. Fès connaît une forte croissance avec ses riads de luxe intégrant des hammams traditionnels. Casablanca recrute des profils urban wellness pour sa clientèle d'affaires.",
      },
    },
    {
      "@type": "Question",
      name: "Les hammams traditionnels marocains recrutent-ils des professionnels formés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, les hammams de luxe et les palaces marocains modernisent leurs équipes et recrutent de plus en plus des professionnels formés. Les kessals (praticiens du gommage traditionnel) expérimentés dans les hôtels 5 étoiles peuvent gagner entre 5 000 et 9 000 MAD mensuels, contre 2 500 à 3 500 MAD dans les hammams de quartier.",
      },
    },
    {
      "@type": "Question",
      name: "La Coupe du Monde 2030 va-t-elle créer des emplois dans le secteur spa au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, considérablement. La construction de nouveaux hôtels 5 étoiles et resorts dans les 6 villes hôtes va générer des centaines de nouveaux postes spa. Les investissements touristiques liés au Mondial prévoient l'ouverture de plus de 60 spas hôteliers d'ici 2029. Les professionnels formés dès maintenant seront prioritaires sur ces recrutements.",
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
      item: "https://siyahamag.ma/emplois",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Emploi Spa & Bien-Être Maroc 2026",
      item: "https://siyahamag.ma/guide/emploi-spa-bienetre-maroc-2026",
    },
  ],
}

// ── Page Component ────────────────────────────────────────────────────

export default function EmploiSpaBienEtreMarocPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&h=600&fit=crop"
            alt="Praticienne réalisant un soin dans un spa luxueux d'un hôtel marocain"
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                Guide Emploi
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Emploi Spa &amp; Bien-Être Maroc 2026 : Salaires, Formations &amp; Recrutement
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumbs
            segments={[
              { label: "Emploi Tourisme", href: "/emplois" },
              { label: "Emploi Spa & Bien-Être Maroc 2026" },
            ]}
          />

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-4 mb-8 pb-8 border-b">
            <span>29 avril 2026</span>
            <span>·</span>
            <span>Lecture : 12 min</span>
            <span>·</span>
            <span>Par la rédaction SiyahaMag</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
              Le secteur du spa et du bien-être est devenu l&apos;un des piliers de l&apos;hôtellerie marocaine
              haut de gamme. Des riads de Marrakech aux resorts balnéaires d&apos;Agadir, en passant par les
              palaces de Fès et les hôtels 5 étoiles de Tanger, les établissements recrutent massivement
              des thérapeutes qualifiés, esthéticiennes et managers spa. En 2026, plus de <strong>3 200 postes</strong>{" "}
              sont ouverts dans ce secteur en pleine expansion au Maroc.
            </p>

            {/* Chiffres clés */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
              {[
                { value: "3 200+", label: "Postes spa ouverts", color: "bg-teal-50 border-teal-200" },
                { value: "4–18K", label: "Salaire mensuel (MAD)", color: "bg-emerald-50 border-emerald-200" },
                { value: "+38 %", label: "Croissance emplois 2022–26", color: "bg-amber-50 border-amber-200" },
                { value: "420+", label: "Spas hôteliers au Maroc", color: "bg-blue-50 border-blue-200" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.color} border rounded-xl p-4 text-center`}>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2>Le Marché de l&apos;Emploi Spa au Maroc en 2026</h2>
            <p>
              Le bien-être est devenu un critère de choix primordial pour les voyageurs internationaux
              qui visitent le Maroc. La tradition du hammam marocain, revisitée et modernisée par les
              chaînes hôtelières de luxe, a créé un secteur spa local robuste et en constante évolution.
            </p>
            <p>
              En 2026, le Maroc compte plus de <strong>420 spas hôteliers</strong> classifiés, dont 180
              dans des établissements 5 étoiles. Ce parc a progressé de 38 % depuis 2022, tiré par les
              ouvertures d&apos;hôtels de luxe, l&apos;essor du tourisme médical et la tendance wellness qui touche
              toutes les clientèles — notamment les touristes européens et du Golfe.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6 not-prose">
              <p className="font-semibold text-teal-900">Un secteur sous tension positive</p>
              <p className="text-teal-800 text-sm mt-1">
                Les directeurs spa des palaces marocains signalent des difficultés à recruter des thérapeutes
                alliant savoir-faire technique, maîtrise des langues étrangères et présentation irréprochable.
                Cette pénurie de profils qualifiés tire les salaires vers le haut et favorise les candidats
                issus des formations CIDESCO, ITEC et ISITT.
              </p>
            </div>

            <h2>Les Principaux Métiers du Spa Hôtelier au Maroc</h2>
            <p>
              Le département spa d&apos;un grand hôtel marocain regroupe de nombreux profils complémentaires.
              Voici les postes les plus recherchés en 2026 :
            </p>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  profil: "Thérapeute Spa / Praticien Massage",
                  detail: "Réalise les soins du corps (massages, gommages, enveloppements) et soins du visage. Maîtrise des techniques occidentales et orientales. Principal poste en volume.",
                  salaire: "4 000–8 500 MAD/mois",
                  couleur: "bg-teal-50 border-teal-200",
                },
                {
                  profil: "Esthéticienne / Praticienne Soins Visage",
                  detail: "Soins esthétiques du visage, épilation, maquillage, manucure et pédicure. Expertise en produits cosmétiques et protocoles de marques internationales.",
                  salaire: "3 800–7 000 MAD/mois",
                  couleur: "bg-pink-50 border-pink-200",
                },
                {
                  profil: "Kessal / Praticien Hammam Traditionnel",
                  detail: "Spécialiste du gommage marocain traditionnel (kessa) et des soins au savon beldi. Très recherché dans les spas authentiques des palaces et riads de luxe.",
                  salaire: "4 500–9 000 MAD/mois",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  profil: "Thérapeute Wellness / Instructeur Yoga-Méditation",
                  detail: "Anime les séances de yoga, méditation, pilates et sophrologie. Profil hybride très demandé dans les resorts wellness et les retraites bien-être.",
                  salaire: "5 000–10 000 MAD/mois",
                  couleur: "bg-purple-50 border-purple-200",
                },
                {
                  profil: "Réceptionniste Spa / Guest Experience",
                  detail: "Accueil des clients, gestion des réservations, vente de soins et produits, coordination des équipes. Interface entre le client et les équipes de soins.",
                  salaire: "3 500–6 000 MAD/mois",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  profil: "Manager Spa / Directeur(trice) Bien-Être",
                  detail: "Gestion complète du département spa : recrutement, formation, budgets, protocoles, relations fournisseurs, reporting à la direction hôtelière.",
                  salaire: "10 000–18 000 MAD/mois",
                  couleur: "bg-emerald-50 border-emerald-200",
                },
              ].map((item) => (
                <div key={item.profil} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="flex flex-wrap gap-2 items-start justify-between mb-1">
                    <div className="font-bold text-gray-900">{item.profil}</div>
                    <div className="text-sm font-semibold text-gray-700">{item.salaire}</div>
                  </div>
                  <div className="text-sm text-gray-600">{item.detail}</div>
                </div>
              ))}
            </div>

            <h2>Grille de Salaires Spa Maroc par Ville et Standing</h2>
            <p>
              Les rémunérations dans le secteur spa varient significativement selon la destination,
              le standing de l&apos;établissement et l&apos;expérience du candidat :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Poste</th>
                    <th className="text-center p-3 border border-gray-200">Marrakech 5★</th>
                    <th className="text-center p-3 border border-gray-200">Agadir 4–5★</th>
                    <th className="text-center p-3 border border-gray-200">Fès / Tanger</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      poste: "Thérapeute Spa (Débutant)",
                      marrakech: "5 000–7 500 MAD",
                      agadir: "4 500–7 000 MAD",
                      fes: "4 000–6 000 MAD",
                    },
                    {
                      poste: "Thérapeute Senior / Spécialiste",
                      marrakech: "7 000–10 000 MAD",
                      agadir: "6 500–9 000 MAD",
                      fes: "6 000–8 000 MAD",
                    },
                    {
                      poste: "Esthéticienne",
                      marrakech: "5 500–8 000 MAD",
                      agadir: "5 000–7 000 MAD",
                      fes: "4 000–6 500 MAD",
                    },
                    {
                      poste: "Kessal / Praticien Hammam",
                      marrakech: "6 000–9 500 MAD",
                      agadir: "5 000–8 000 MAD",
                      fes: "5 000–7 500 MAD",
                    },
                    {
                      poste: "Manager Spa",
                      marrakech: "13 000–18 000 MAD",
                      agadir: "11 000–16 000 MAD",
                      fes: "10 000–14 000 MAD",
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium">{row.poste}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm text-teal-700 font-semibold">{row.marrakech}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.agadir}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.fes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">
                * Salaires bruts mensuels hors pourboires. Dans les palaces, les pourboires peuvent représenter 1 000 à 3 500 MAD supplémentaires par mois selon la fréquentation.
              </p>
            </div>

            <h2>Compétences et Profil Recherchés par les Employeurs Spa</h2>
            <p>
              Au-delà des compétences techniques, les directeurs spa des hôtels marocains recherchent
              des candidats avec un ensemble de qualités comportementales et relationnelles :
            </p>

            <div className="not-prose grid sm:grid-cols-2 gap-3 my-6">
              {[
                { icon: "🤲", comp: "Excellence Technique", detail: "Maîtrise des techniques de massage (suédois, pierres chaudes, thaï), soins visage et protocoles des grandes marques cosmétiques." },
                { icon: "🌍", comp: "Langues Étrangères", detail: "Français et anglais indispensables dans les hôtels 4–5 étoiles. L'arabe, l'espagnol et le russe constituent des atouts selon la clientèle cible." },
                { icon: "✨", comp: "Présentation Soignée", detail: "Apparence impeccable, tenue professionnelle, hygiène irréprochable. Le thérapeute incarne l'image de marque du spa et de l'établissement." },
                { icon: "🧘", comp: "Sens du Service Discret", detail: "Capacité à créer un environnement de relaxation profonde. L'écoute active, la discrétion et l'empathie sont des qualités indispensables." },
                { icon: "📋", comp: "Connaissance des Contre-Indications", detail: "Maîtrise des précautions médicales pour chaque soin (grossesse, pathologies, allergies) pour garantir la sécurité des clients." },
                { icon: "💼", comp: "Upselling & Conseil", detail: "Capacité à conseiller et proposer des soins complémentaires et produits cosmétiques de manière naturelle et non intrusive." },
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

            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&h=400&fit=crop"
              alt="Salle de soins élégante dans un spa d'hôtel de luxe au Maroc avec bougies et déco orientale"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Formations Reconnues pour Travailler dans le Secteur Spa au Maroc</h2>
            <p>
              Le secteur spa au Maroc valorise à la fois les diplômes nationaux et les certifications
              internationales, qui ouvrent les portes des chaînes hôtelières de luxe :
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 border border-gray-200">Formation</th>
                    <th className="text-left p-3 border border-gray-200">Organisme</th>
                    <th className="text-center p-3 border border-gray-200">Durée</th>
                    <th className="text-center p-3 border border-gray-200">Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { formation: "BTS Esthétique-Cosmétique-Parfumerie", etab: "ISITT Casablanca", duree: "2 ans", niveau: "Palace 5★" },
                    { formation: "TS Esthétique-Beauté-Cosmétique", etab: "OFPPT (20 instituts)", duree: "2 ans", niveau: "4★ à 5★" },
                    { formation: "Diplôme CIDESCO International", etab: "Centres agréés CIDESCO Maroc", duree: "1 an", niveau: "Chaînes intl." },
                    { formation: "Certificat ITEC (Londres)", etab: "Écoles privées agréées", duree: "6–12 mois", niveau: "Chaînes intl." },
                    { formation: "Technicien Hammam & Soins Traditionnels", etab: "OFPPT + centres privés", duree: "6 mois", niveau: "Riads & Palaces" },
                    { formation: "Spa Management (niveau cadre)", etab: "ISITT / Universités privées", duree: "3 ans", niveau: "Direction spa" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 border border-gray-200 font-medium text-teal-700">{row.formation}</td>
                      <td className="p-3 border border-gray-200 text-sm">{row.etab}</td>
                      <td className="p-3 border border-gray-200 text-center">{row.duree}</td>
                      <td className="p-3 border border-gray-200 text-center text-sm">{row.niveau}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Les Principaux Employeurs Spa au Maroc</h2>

            <h3>Chaînes internationales (recrutement permanent)</h3>
            <ul>
              <li>
                <strong>Four Seasons Hotels (Marrakech)</strong> — Spa Noria de renommée mondiale,
                recrutement de thérapeutes CIDESCO/ITEC bilingues, protocoles exclusifs.
              </li>
              <li>
                <strong>Mandarin Oriental (Marrakech)</strong> — Spa primé internationalement,
                équipe de 35 thérapeutes, formation interne intensive, haute rémunération.
              </li>
              <li>
                <strong>Accor Hotels (Sofitel, MGallery)</strong> — Programme So Spa dans plusieurs
                établissements au Maroc, recrutement standardisé avec niveau CIDESCO requis.
              </li>
              <li>
                <strong>Fairmont (Marrakech, Taghazout)</strong> — Willow Stream Spa, équipes internationales,
                formation continue en techniques asiatiques et ayurvédiques.
              </li>
            </ul>

            <h3>Groupes hôteliers marocains</h3>
            <ul>
              <li>
                <strong>Groupe Palmeraie (Marrakech)</strong> — Complexe Palmeraie Golf Palace &amp; Resort
                avec spa complet de 2 500 m², plus grand spa hôtelier du Maroc.
              </li>
              <li>
                <strong>Kenzi Hotels</strong> — Développement de l&apos;offre spa dans 7 établissements,
                programme de montée en compétences internes, CDI après période d&apos;essai.
              </li>
              <li>
                <strong>Atlas Hospitality Group</strong> — Réseau d&apos;hôtels 4–5 étoiles au Maroc,
                recrutement régulier de techniciens spa et esthéticiennes.
              </li>
              <li>
                <strong>Mogador Hotels</strong> — Développement accéléré du concept spa dans ses
                établissements de bord de mer, recherche de profils spécialisés nautique &amp; thalasso.
              </li>
            </ul>

            <h2>Les Destinations Phares du Secteur Spa au Maroc</h2>

            <div className="not-prose space-y-3 my-6">
              {[
                {
                  ville: "Marrakech",
                  postes: "1 200+ postes",
                  profils: "Thérapeutes 5★, managers spa, kessals hammam de luxe",
                  etablissements: "160+ spas hôteliers dont 60 palaces",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  ville: "Agadir",
                  postes: "650+ postes",
                  profils: "Thérapeutes balnéo, moniteurs fitness wellness, thalasso",
                  etablissements: "85+ spas dans les resorts balnéaires",
                  couleur: "bg-blue-50 border-blue-200",
                },
                {
                  ville: "Fès",
                  postes: "380+ postes",
                  profils: "Kessals traditionnels, soins visage orientaux, spa riad",
                  etablissements: "60+ spas dans riads et palais médina",
                  couleur: "bg-amber-50 border-amber-200",
                },
                {
                  ville: "Casablanca",
                  postes: "420+ postes",
                  profils: "Urban wellness, massage corporatif, esthétique premium",
                  etablissements: "55+ spas urbains et hôteliers haut de gamme",
                  couleur: "bg-gray-50 border-gray-200",
                },
                {
                  ville: "Tanger",
                  postes: "310+ postes",
                  profils: "Thérapeutes internationaux, soins corps et visage 5★",
                  etablissements: "40+ spas en forte croissance depuis 2024",
                  couleur: "bg-teal-50 border-teal-200",
                },
              ].map((item) => (
                <div key={item.ville} className={`${item.couleur} border rounded-xl p-4`}>
                  <div className="flex flex-wrap gap-2 items-center justify-between mb-2">
                    <div className="font-bold text-gray-900 text-base">{item.ville}</div>
                    <span className="text-sm font-semibold text-gray-700">{item.postes}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1"><strong>Profils :</strong> {item.profils}</div>
                  <div className="text-xs text-gray-500"><strong>Marché :</strong> {item.etablissements}</div>
                </div>
              ))}
            </div>

            <img
              src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=900&h=400&fit=crop"
              alt="Hammam traditionnel marocain en carreaux zellige avec vapeur et bougies dans un riad de luxe"
              className="rounded-xl my-6 w-full"
              width={900}
              height={400}
            />

            <h2>Impact de la Coupe du Monde 2030 sur l&apos;Emploi Spa</h2>
            <p>
              Le Mondial 2030 est un catalyseur majeur pour l&apos;hôtellerie de luxe marocaine et, par
              extension, pour le secteur spa :
            </p>
            <ul>
              <li>
                <strong>62 nouveaux hôtels 4 et 5 étoiles</strong> sont programmés dans les villes hôtes,
                chacun intégrant un spa de minimum 500 m². Chaque spa emploie en moyenne 12 à 25 thérapeutes.
              </li>
              <li>
                <strong>Le tourisme wellness</strong> devrait représenter 18 % des nuitées touristiques
                au Maroc en 2030 contre 11 % en 2025, selon les projections du Ministère du Tourisme.
              </li>
              <li>
                Les <strong>investissements en tourisme médical</strong> (Casablanca, Marrakech, Agadir)
                créeront une demande de thérapeutes spécialisés en post-opératoire et réhabilitation.
              </li>
              <li>
                Le Programme &quot;Accueil 2030&quot; inclut une filière <strong>Spa &amp; Wellness Management</strong>{" "}
                avec 2 000 postes à former d&apos;ici 2028 dans les instituts de formation touristique marocains.
              </li>
            </ul>

            <h2>Conseils pour Décrocher un Emploi Spa au Maroc</h2>

            <h3>1. Certifiez vos compétences avec un diplôme international</h3>
            <p>
              Les grandes chaînes hôtelières (Four Seasons, Mandarin, Accor) exigent quasi
              systématiquement une certification CIDESCO ou ITEC pour les thérapeutes senior.
              Ces diplômes ouvrent également les portes du marché européen et du Golfe,
              diversifiant vos opportunités géographiques.
            </p>

            <h3>2. Spécialisez-vous dans une technique premium</h3>
            <p>
              La maîtrise de techniques spécifiques — ayurvéda, médecine traditionnelle chinoise,
              massages balinais, lithothérapie, soins rasul — vous distingue dans un marché où
              les généralistes sont abondants. Les profils spécialisés peuvent prétendre à des salaires
              30 à 50 % supérieurs.
            </p>

            <h3>3. Maîtrisez les protocoles des marques partenaires</h3>
            <p>
              Filorga, Biologique Recherche, ESPA, Elemis, L&apos;Occitane — les spas hôteliers travaillent
              avec des marques premium dont ils appliquent les protocoles exclusifs. Se former sur
              ces marques (formations souvent gratuites) est un atout différenciant très concret.
            </p>

            <h3>4. Construisez votre réseau via SiyahaMag.ma</h3>
            <p>
              SiyahaMag publie régulièrement des offres d&apos;emploi dans le secteur spa et bien-être
              dans toutes les villes du Maroc. Activez les alertes emploi pour votre spécialité et
              ne manquez aucune ouverture dans les nouveaux établissements.
            </p>

            <h2>Questions Fréquentes</h2>

            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quel est le salaire d&apos;un thérapeute spa dans un hôtel 5 étoiles au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Entre 5 000 et 10 000 MAD/mois selon l&apos;expérience et la spécialité, hors pourboires.
                Dans les palaces comme le Mandarin Oriental ou le Four Seasons de Marrakech,
                les thérapeutes seniors peuvent atteindre 10 000 à 13 000 MAD avec les pourboires.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Faut-il parler anglais pour travailler dans un spa au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Dans les hôtels 4 et 5 étoiles, le français et l&apos;anglais sont indispensables pour
                communiquer avec les clients internationaux. Dans les riads et spas de médinas,
                le français seul peut suffire. L&apos;arabe dialectal est toujours apprécié pour
                les clients marocains et du Golfe.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Le secteur spa recrute-t-il des profils masculins au Maroc ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui, les hommes sont recrutés pour les soins destinés à la clientèle masculine
                (massages sportifs, soins corps, bain hammam). Dans les grands spas, les équipes
                sont mixtes avec des cabines dédiées à chaque genre. Les thérapeutes masculins
                spécialisés (sport massage, thérapies manuelles) sont particulièrement recherchés.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Quelle est la meilleure ville marocaine pour trouver un emploi spa ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Marrakech offre le plus grand bassin d&apos;emploi spa avec 160+ établissements et
                1 200+ postes. Pour les profils axés thalasso et balnéothérapie, Agadir est
                la destination de référence. Fès est idéale pour les spécialistes du hammam
                traditionnel marocain dans les riads et palais.
              </div>
            </details>
            <details className="border border-gray-200 rounded-lg mb-3">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50">
                Les pourboires sont-ils courants dans les spas marocains ?
              </summary>
              <div className="p-4 pt-0 text-gray-700">
                Oui, dans les palaces et hôtels de luxe, les pourboires représentent une part
                significative de la rémunération des thérapeutes (500 à 3 500 MAD/mois).
                Certains établissements pratiquent un système de pool de pourboires
                répartis équitablement entre l&apos;équipe spa.
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-6 md:p-8 my-8 not-prose text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Trouvez votre emploi spa & bien-être sur SiyahaMag
              </h3>
              <p className="text-teal-100 mb-4">
                Thérapeute, esthéticienne, manager spa — toutes les offres d&apos;emploi wellness
                du Maroc sur une seule plateforme spécialisée tourisme.
              </p>
              <Link
                href="/emplois"
                className="inline-block bg-white text-teal-600 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              >
                Voir les offres spa & bien-être →
              </Link>
            </div>

            {/* Maillage interne */}
            <h2>Articles liés</h2>
            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
              <Link
                href="/guide/emploi-receptionniste-hotel-maroc-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emploi Réceptionniste Hôtel Maroc 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Salaires et opportunités pour les métiers de l&apos;accueil hôtelier
                </div>
              </Link>
              <Link
                href="/guide/emploi-animateur-tourisme-maroc-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Emploi Animateur Tourisme Maroc 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Salaires et opportunités dans l&apos;animation hôtelière
                </div>
              </Link>
              <Link
                href="/guide/investissement-hotelier-marrakech-2026"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Investissement Hôtelier Marrakech 2026
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Opportunités d&apos;investissement dans l&apos;hôtellerie à Marrakech
                </div>
              </Link>
              <Link
                href="/guide/coupe-du-monde-2030-tourisme"
                className="block p-4 border border-gray-200 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all"
              >
                <div className="text-sm font-semibold text-gray-900">
                  Coupe du Monde 2030 : Impact Tourisme
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Milliers de postes créés dans l&apos;hôtellerie de luxe et le spa
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
