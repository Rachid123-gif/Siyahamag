import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Investir dans un Riad au Maroc : Guide Complet 2026 | SiyahaMag",
  description:
    "Guide complet pour investir dans un riad au Maroc : villes rentables, cadre juridique, étapes d'achat, prix moyens et rentabilité estimée. Conseils d'experts.",
  alternates: {
    canonical: "/guide/investir-riad-maroc",
  },
  openGraph: {
    title: "Investir dans un Riad au Maroc : Guide Complet 2026",
    description:
      "Tout savoir pour investir dans un riad au Maroc : prix, juridique, rentabilité, villes les plus attractives.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "investir riad maroc",
    "acheter riad marrakech",
    "riad investissement",
    "riad maison d'hotes maroc",
    "immobilier touristique maroc",
    "rentabilite riad maroc",
    "prix riad maroc 2026",
  ],
}

// ── Table of Contents ────────────────────────────────────────────────

const TOC = [
  { id: "pourquoi", label: "Pourquoi investir dans un riad" },
  { id: "villes", label: "Les villes les plus rentables" },
  { id: "juridique", label: "Le cadre juridique" },
  { id: "etapes", label: "Les étapes d'achat" },
  { id: "prix", label: "Les prix moyens par ville" },
  { id: "rentabilite", label: "Rentabilité et gestion" },
  { id: "erreurs", label: "Erreurs à éviter" },
  { id: "faq", label: "Questions fréquentes" },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideInvestirRiadMarocPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Investir dans un Riad au Maroc : Guide Complet 2026",
    description:
      "Guide complet pour investir dans un riad au Maroc : villes rentables, cadre juridique, étapes d'achat, prix moyens et rentabilité estimée.",
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
    datePublished: "2026-02-10",
    dateModified: "2026-04-20",
    mainEntityOfPage: "https://siyahamag.ma/guide/investir-riad-maroc",
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coûte un riad au Maroc en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le prix d'un riad au Maroc varie considérablement selon la ville, l'emplacement et l'état du bien. À Marrakech, comptez entre 1,5 et 15 millions MAD (150 000 à 1,5 million EUR) pour un riad dans la médina. À Fès, les prix sont 30 à 50% inférieurs. À Essaouira, un riad rénové se négocie entre 2 et 6 millions MAD.",
        },
      },
      {
        "@type": "Question",
        name: "Un étranger peut-il acheter un riad au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, les étrangers peuvent acheter un bien immobilier au Maroc, y compris des riads en médina. La seule restriction concerne les terres agricoles. L'achat se fait devant notaire avec un titre foncier (immatriculation). Il est conseillé de se faire accompagner par un avocat spécialisé en droit immobilier marocain.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la rentabilité d'un riad maison d'hôtes au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La rentabilité brute d'un riad maison d'hôtes bien géré se situe entre 8% et 15% par an à Marrakech. La rentabilité nette (après charges, entretien, impôts) est de l'ordre de 5% à 10%. Le taux d'occupation moyen pour un riad bien référencé est de 60% à 75% sur l'année, avec des pics à 90%+ en haute saison.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les charges d'un riad maison d'hôtes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les charges mensuelles d'un riad maison d'hôtes comprennent : personnel (40-50% du CA), eau/électricité (5-8%), entretien courant (5-10%), taxe touristique, assurances, plateforme de réservation (15-20% de commission), marketing et impôts (IR ou IS selon le statut). Prévoyez aussi un fonds de rénovation annuel de 3 à 5% de la valeur du bien.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il une autorisation pour exploiter un riad en maison d'hôtes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, l'exploitation d'une maison d'hôtes au Maroc nécessite une autorisation du Ministère du Tourisme et le classement de l'établissement. Il faut aussi obtenir un permis d'habiter, une autorisation d'exercice commerciale et s'inscrire au registre du commerce. Les normes de sécurité incendie et d'hygiène doivent être respectées.",
        },
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Guide", href: "/guide/investir-riad-maroc" },
          { label: "Investir dans un riad" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide Investissement</span>
          <span>/</span>
          <span>Mis à jour le 20 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          Investir dans un Riad au Maroc : Guide Complet 2026
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Le riad marocain est devenu un placement immobilier prisé par les investisseurs du monde entier.
          Entre patrimoine culturel et rentabilité attractive, découvrez comment réussir votre investissement
          dans un riad au Maroc.
        </p>
      </header>

      {/* Hero image */}
      <div className="rounded-xl overflow-hidden mb-10">
        <img
          src="https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=1200&h=500&fit=crop"
          alt="Riad traditionnel au Maroc avec patio et fontaine"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
      </div>

      {/* Table of Contents */}
      <nav className="rounded-xl border bg-muted/30 p-6 mb-10">
        <h2 className="font-semibold text-foreground mb-3">Sommaire</h2>
        <ol className="space-y-2">
          {TOC.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-ocean hover:underline"
              >
                {index + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Article content */}
      <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
        {/* Pourquoi investir */}
        <section id="pourquoi">
          <h2>Pourquoi investir dans un riad au Maroc</h2>
          <p>
            Le riad, maison traditionnelle marocaine construite autour d&apos;un patio central, est
            devenu un placement immobilier de référence pour plusieurs raisons :
          </p>

          <h3>Un marché touristique en pleine croissance</h3>
          <p>
            Le Maroc a accueilli <strong>15,9 millions de touristes en 2025</strong>, un record historique.
            La tendance est à la hausse, portée par la Coupe du Monde 2030 et la stratégie nationale
            du tourisme. Cette croissance assure un flux constant de clients potentiels pour les
            maisons d&apos;hôtes.
          </p>

          <h3>Des prix encore accessibles</h3>
          <p>
            Comparé à d&apos;autres marchés méditerranéens (Espagne, Italie, Grèce), le Maroc offre des
            prix d&apos;acquisition nettement inférieurs pour une rentabilité souvent supérieure. Un riad
            de 5 chambres à Fès peut s&apos;acquérir pour le prix d&apos;un studio à Paris.
          </p>

          <h3>Un cadre fiscal attractif</h3>
          <p>
            Le Maroc offre des avantages fiscaux aux investisseurs dans le tourisme : exonération
            d&apos;IR pendant les 5 premières années d&apos;exploitation pour les entreprises nouvellement
            créées, TVA à 10% sur l&apos;hébergement touristique (au lieu de 20%), et possibilité de
            déduire les frais de rénovation.
          </p>

          <h3>Un patrimoine architectural unique</h3>
          <p>
            Le riad est un bien rare et non reproductible. Les médinas marocaines sont des centres
            historiques protégés où la construction neuve est très réglementée. Posséder un riad,
            c&apos;est détenir un morceau de patrimoine dont la valeur ne peut que croître à long terme.
          </p>

          <h3>Une demande diversifiée</h3>
          <p>
            Les riads attirent une clientèle variée : touristes en quête d&apos;authenticité, couples
            en voyage romantique, groupes d&apos;amis, retraités en long séjour, et même des entreprises
            pour des séminaires. Cette diversification réduit le risque saisonnier.
          </p>
        </section>

        {/* Villes rentables */}
        <section id="villes">
          <h2>Les villes les plus rentables</h2>

          <h3>Marrakech — Le marché le plus mature</h3>
          <p>
            Marrakech reste la destination n°1 avec le taux d&apos;occupation le plus élevé du pays
            (70-80% en moyenne annuelle). Les riads bien situés (médina, Kasbah, Mouassine)
            affichent des tarifs de 150 à 500 EUR la nuit en haute saison. Le marché est mature
            mais la demande reste soutenue grâce à la renommée internationale de la ville.
          </p>
          <p>
            <strong>Rentabilité brute estimée :</strong> 8-12%<br />
            <strong>Ticket d&apos;entrée :</strong> à partir de 2 millions MAD pour un petit riad à rénover
          </p>

          <h3>Fès — Le meilleur rapport qualité/prix</h3>
          <p>
            Fès offre actuellement le meilleur rapport investissement/rentabilité. Les prix
            d&apos;acquisition sont 30 à 50% inférieurs à Marrakech, tandis que les tarifs de nuitée
            restent attractifs (80-250 EUR). La ville bénéficie d&apos;un tourisme culturel de qualité,
            avec des séjours moyens plus longs.
          </p>
          <p>
            <strong>Rentabilité brute estimée :</strong> 10-15%<br />
            <strong>Ticket d&apos;entrée :</strong> à partir de 1,2 million MAD
          </p>

          <h3>Essaouira — Le charme balnéaire</h3>
          <p>
            Essaouira combine le charme d&apos;une médina authentique avec l&apos;attrait balnéaire. La
            clientèle européenne (française, britannique, allemande) est fidèle et revient
            régulièrement. Les prix d&apos;acquisition sont intermédiaires entre Fès et Marrakech.
          </p>
          <p>
            <strong>Rentabilité brute estimée :</strong> 9-13%<br />
            <strong>Ticket d&apos;entrée :</strong> à partir de 1,8 million MAD
          </p>

          <h3>Chefchaouen — La ville montante</h3>
          <p>
            La &quot;ville bleue&quot; connaît un engouement croissant, notamment sur les réseaux sociaux.
            Les prix d&apos;acquisition restent bas, mais le potentiel de plus-value est important.
            Attention cependant à la saisonnalité marquée (faible fréquentation en hiver).
          </p>
          <p>
            <strong>Rentabilité brute estimée :</strong> 8-11%<br />
            <strong>Ticket d&apos;entrée :</strong> à partir de 800 000 MAD
          </p>

          <h3>Tanger — Le pari sur l&apos;avenir</h3>
          <p>
            Tanger est en pleine transformation. Les investissements massifs liés à la Coupe du
            Monde 2030 et la proximité de l&apos;Europe en font un marché à fort potentiel. Les prix
            sont encore abordables dans la kasbah et la médina historique.
          </p>
          <p>
            <strong>Rentabilité brute estimée :</strong> 7-10% (en croissance)<br />
            <strong>Ticket d&apos;entrée :</strong> à partir de 1,5 million MAD
          </p>
        </section>

        {/* Cadre juridique */}
        <section id="juridique">
          <h2>Le cadre juridique</h2>

          <h3>Qui peut acheter un riad au Maroc ?</h3>
          <p>
            Toute personne physique ou morale, marocaine ou étrangère, peut acquérir un bien
            immobilier au Maroc. La seule exception concerne les <strong>terres agricoles</strong>,
            interdites aux étrangers (les riads en médina ne sont pas concernés par cette restriction).
          </p>

          <h3>Le titre foncier (immatriculation)</h3>
          <p>
            C&apos;est le point crucial de tout achat immobilier au Maroc. Le <strong>titre foncier</strong> est
            le seul document qui garantit juridiquement la propriété. Avant tout achat, vérifiez
            impérativement que le bien dispose d&apos;un titre foncier en bonne et due forme auprès de
            la Conservation Foncière.
          </p>
          <p>
            Si le bien n&apos;est pas immatriculé (cas fréquent dans les anciennes médinas), il faudra
            procéder à l&apos;immatriculation, une procédure qui prend 3 à 12 mois et nécessite des
            actes adoulaires (notariat traditionnel).
          </p>

          <h3>Les frais d&apos;acquisition</h3>
          <p>
            Prévoyez environ <strong>10 à 12% du prix d&apos;achat</strong> en frais :
          </p>
          <ul>
            <li>Droits d&apos;enregistrement : 4% du prix déclaré</li>
            <li>Conservation foncière : 1,5% + frais fixes</li>
            <li>Honoraires notaire : 1 à 2,5%</li>
            <li>Frais de dossier et timbres : environ 1%</li>
            <li>Commission agence (si applicable) : 2,5 à 5%</li>
          </ul>

          <h3>L&apos;autorisation d&apos;exploitation touristique</h3>
          <p>
            Pour exploiter un riad en maison d&apos;hôtes, vous devez obtenir :
          </p>
          <ul>
            <li>L&apos;autorisation du Ministère du Tourisme et le classement (1 à 5 étoiles)</li>
            <li>Le permis d&apos;habiter et la conformité urbanistique</li>
            <li>L&apos;inscription au registre du commerce (RC)</li>
            <li>L&apos;attestation de conformité aux normes de sécurité incendie</li>
            <li>Le respect des normes sanitaires (cuisine, piscine le cas échéant)</li>
          </ul>
          <p>
            Pour plus de détails sur la réglementation, consultez notre rubrique{" "}
            <Link href="/thematiques/reglementation" className="text-ocean font-medium hover:underline">
              Réglementation touristique
            </Link>.
          </p>

          <h3>Le régime fiscal</h3>
          <p>
            Vous pouvez exploiter votre riad en tant que :
          </p>
          <ul>
            <li>
              <strong>Personne physique (IR)</strong> — Régime simplifié pour les petites structures.
              Abattement de 40% sur les revenus locatifs.
            </li>
            <li>
              <strong>Société (IS)</strong> — Recommandé pour les structures plus importantes.
              Taux d&apos;IS de 20% pour les bénéfices inférieurs à 1 million MAD, 25% au-delà.
              Exonération totale les 5 premières années pour les entreprises touristiques nouvelles.
            </li>
          </ul>
        </section>

        {/* Étapes d'achat */}
        <section id="etapes">
          <h2>Les étapes d&apos;achat</h2>

          <h3>1. Définir votre projet</h3>
          <p>
            Avant de chercher un riad, définissez clairement votre projet : résidence secondaire,
            maison d&apos;hôtes exploitée par vous-même, investissement locatif avec gérant, ou
            rénovation-revente. Chaque stratégie implique un budget, une localisation et des
            critères différents.
          </p>

          <h3>2. Rechercher et visiter</h3>
          <p>
            Faites appel à un agent immobilier local spécialisé dans les riads. Prévoyez au
            minimum une semaine sur place pour visiter plusieurs biens. Visitez à différentes
            heures de la journée pour évaluer le bruit, la luminosité et l&apos;environnement.
          </p>
          <p>
            Consultez les opportunités disponibles sur notre rubrique{" "}
            <Link href="/investissement" className="text-ocean font-medium hover:underline">
              Investissement touristique
            </Link>.
          </p>

          <h3>3. Vérifications préalables (due diligence)</h3>
          <p>
            Étape cruciale : vérifiez le titre foncier, l&apos;absence d&apos;hypothèques ou de litiges,
            la conformité urbanistique, l&apos;état structurel du bâtiment (faites appel à un
            architecte), et les limites cadastrales exactes.
          </p>

          <h3>4. Compromis de vente</h3>
          <p>
            Signez un compromis de vente devant notaire avec versement d&apos;un acompte (généralement
            10%). Le compromis fixe les conditions de la vente, le prix, les délais et les
            conditions suspensives.
          </p>

          <h3>5. Financement</h3>
          <p>
            Les banques marocaines accordent des prêts immobiliers aux résidents et non-résidents.
            Les conditions : apport de 20-30%, taux d&apos;intérêt de 4-6%, durée de 15-20 ans.
            Certaines banques internationales proposent aussi des financements pour des achats
            au Maroc.
          </p>

          <h3>6. Acte de vente définitif</h3>
          <p>
            La signature de l&apos;acte définitif se fait chez le notaire. Le transfert de propriété
            est inscrit à la Conservation Foncière. Prévoyez 2 à 4 semaines entre le compromis
            et l&apos;acte définitif.
          </p>

          <h3>7. Rénovation (si nécessaire)</h3>
          <p>
            La rénovation d&apos;un riad requiert des artisans spécialisés (zellige, tadelakt, bois
            sculpté). Budget moyen de rénovation : 3 000 à 8 000 MAD/m² selon l&apos;état et le
            niveau de finition souhaité. Durée : 6 à 18 mois selon l&apos;ampleur des travaux.
          </p>
        </section>

        {/* Prix moyens */}
        <section id="prix">
          <h2>Les prix moyens par ville (2026)</h2>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3 font-semibold">Ville</th>
                  <th className="p-3 font-semibold">Riad à rénover</th>
                  <th className="p-3 font-semibold">Riad rénové (5 ch.)</th>
                  <th className="p-3 font-semibold">Riad de luxe</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">Marrakech</td>
                  <td className="p-3">1,5 - 3 M MAD</td>
                  <td className="p-3">4 - 8 M MAD</td>
                  <td className="p-3">8 - 15+ M MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium">Fès</td>
                  <td className="p-3">800 K - 1,5 M MAD</td>
                  <td className="p-3">2 - 5 M MAD</td>
                  <td className="p-3">5 - 10 M MAD</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Essaouira</td>
                  <td className="p-3">1,2 - 2,5 M MAD</td>
                  <td className="p-3">3 - 6 M MAD</td>
                  <td className="p-3">6 - 12 M MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium">Chefchaouen</td>
                  <td className="p-3">500 K - 1 M MAD</td>
                  <td className="p-3">1,5 - 3 M MAD</td>
                  <td className="p-3">3 - 5 M MAD</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Tanger</td>
                  <td className="p-3">1 - 2 M MAD</td>
                  <td className="p-3">2,5 - 5 M MAD</td>
                  <td className="p-3">5 - 8 M MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium">Meknès</td>
                  <td className="p-3">600 K - 1,2 M MAD</td>
                  <td className="p-3">1,5 - 3,5 M MAD</td>
                  <td className="p-3">3,5 - 6 M MAD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Note :</strong> Ces prix sont indicatifs et varient selon l&apos;emplacement exact
            dans la médina, la surface, le nombre de chambres, l&apos;état général et la présence
            d&apos;éléments architecturaux remarquables (fontaines en zellige, plafonds en cèdre sculpté).
          </p>
        </section>

        {/* Rentabilité */}
        <section id="rentabilite">
          <h2>Rentabilité et gestion</h2>

          <h3>Simulation de rentabilité type (Marrakech, 5 chambres)</h3>
          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3 font-semibold">Poste</th>
                  <th className="p-3 font-semibold">Montant annuel</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">Prix d&apos;acquisition + rénovation</td>
                  <td className="p-3">5 000 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium">Revenus bruts (taux occ. 65%, prix moyen 1 500 MAD/nuit)</td>
                  <td className="p-3">1 781 250 MAD</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Charges d&apos;exploitation (55% du CA)</td>
                  <td className="p-3">- 979 688 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3 font-medium">Résultat net avant impôts</td>
                  <td className="p-3">801 562 MAD</td>
                </tr>
                <tr className="bg-ocean-50">
                  <td className="p-3 font-semibold">Rentabilité nette</td>
                  <td className="p-3 font-semibold text-ocean">~16%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Modes de gestion</h3>
          <p>
            Plusieurs options de gestion s&apos;offrent à vous :
          </p>
          <ul>
            <li>
              <strong>Gestion personnelle</strong> — Vous vivez sur place et gérez le riad
              au quotidien. Meilleure rentabilité mais exige un engagement total.
            </li>
            <li>
              <strong>Gérant salarié</strong> — Vous embauchez un gérant local qui supervise
              les opérations. Coût : 8 000-15 000 MAD/mois. Vous restez décisionnaire.
            </li>
            <li>
              <strong>Société de gestion</strong> — Vous confiez la gestion complète à un
              professionnel qui prend 20-30% du CA en commission. Solution idéale pour les
              investisseurs non-résidents.
            </li>
            <li>
              <strong>Location longue durée</strong> — Vous louez le riad à un exploitant
              professionnel. Rentabilité moindre (5-7%) mais zéro gestion.
            </li>
          </ul>

          <h3>Plateformes de réservation</h3>
          <p>
            Les principaux canaux de distribution pour un riad maison d&apos;hôtes sont :
          </p>
          <ul>
            <li><strong>Booking.com</strong> — 60-70% des réservations. Commission : 15-18%</li>
            <li><strong>Airbnb</strong> — 15-20% des réservations. Commission : 3% côté hôte</li>
            <li><strong>Site web propre</strong> — 10-20% des réservations. Pas de commission</li>
            <li><strong>Agences de voyage</strong> — 5-10%. Commission : 20-25%</li>
          </ul>
        </section>

        {/* Erreurs à éviter */}
        <section id="erreurs">
          <h2>Erreurs à éviter</h2>

          <h3>1. Acheter sans titre foncier</h3>
          <p>
            C&apos;est l&apos;erreur la plus grave. Un bien sans titre foncier (non immatriculé) peut faire
            l&apos;objet de revendications ultérieures. Exigez toujours un titre foncier en bonne et
            due forme ou faites procéder à l&apos;immatriculation avant l&apos;achat.
          </p>

          <h3>2. Sous-estimer le budget de rénovation</h3>
          <p>
            Les riads anciens réservent souvent des surprises (problèmes structurels, humidité,
            installations électriques vétustes). Prévoyez une marge de 30% sur le budget de
            rénovation initial.
          </p>

          <h3>3. Négliger l&apos;emplacement</h3>
          <p>
            Dans une médina, l&apos;emplacement est déterminant. Un riad situé dans un derb (impasse)
            difficile d&apos;accès, loin des axes principaux, aura un taux d&apos;occupation nettement
            inférieur. Privilégiez les quartiers touristiques (Mouassine, Kasbah à Marrakech ;
            quartier des Andalous à Fès).
          </p>

          <h3>4. Ignorer les coûts de personnel</h3>
          <p>
            Un riad maison d&apos;hôtes de 5 chambres nécessite au minimum 3-4 employés (gardien/réceptionniste,
            femme de ménage, cuisinière). Les charges de personnel représentent 40-50% du chiffre d&apos;affaires.
          </p>

          <h3>5. Ne pas prévoir la saisonnalité</h3>
          <p>
            Le tourisme marocain est saisonnier. Prévoyez des mois creux (été à Marrakech, hiver
            à Essaouira) et constituez une trésorerie suffisante pour couvrir 3-4 mois de charges
            sans revenus.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2>Questions fréquentes</h2>

          <div className="not-prose space-y-4 my-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Combien coûte un riad au Maroc en 2026 ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le prix d&apos;un riad au Maroc varie considérablement selon la ville, l&apos;emplacement et
                l&apos;état du bien. À Marrakech, comptez entre 1,5 et 15 millions MAD (150 000 à 1,5 million
                EUR) pour un riad dans la médina. À Fès, les prix sont 30 à 50% inférieurs. À Essaouira,
                un riad rénové se négocie entre 2 et 6 millions MAD.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Un étranger peut-il acheter un riad au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Oui, les étrangers peuvent acheter un bien immobilier au Maroc, y compris des riads en
                médina. La seule restriction concerne les terres agricoles. L&apos;achat se fait devant
                notaire avec un titre foncier (immatriculation). Il est conseillé de se faire accompagner
                par un avocat spécialisé en droit immobilier marocain.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quelle est la rentabilité d&apos;un riad maison d&apos;hôtes au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                La rentabilité brute d&apos;un riad maison d&apos;hôtes bien géré se situe entre 8% et 15% par
                an à Marrakech. La rentabilité nette (après charges, entretien, impôts) est de l&apos;ordre
                de 5% à 10%. Le taux d&apos;occupation moyen pour un riad bien référencé est de 60% à 75%
                sur l&apos;année, avec des pics à 90%+ en haute saison.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quelles sont les charges d&apos;un riad maison d&apos;hôtes ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Les charges mensuelles d&apos;un riad maison d&apos;hôtes comprennent : personnel (40-50% du CA),
                eau/électricité (5-8%), entretien courant (5-10%), taxe touristique, assurances,
                plateforme de réservation (15-20% de commission), marketing et impôts (IR ou IS selon
                le statut). Prévoyez aussi un fonds de rénovation annuel de 3 à 5% de la valeur du bien.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Faut-il une autorisation pour exploiter un riad en maison d&apos;hôtes ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Oui, l&apos;exploitation d&apos;une maison d&apos;hôtes au Maroc nécessite une autorisation du
                Ministère du Tourisme et le classement de l&apos;établissement. Il faut aussi obtenir un
                permis d&apos;habiter, une autorisation d&apos;exercice commerciale et s&apos;inscrire au registre
                du commerce. Les normes de sécurité incendie et d&apos;hygiène doivent être respectées.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div className="mt-12 rounded-xl border bg-gradient-to-r from-ocean to-ocean/80 p-8 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold">
          Prêt à investir dans un riad au Maroc ?
        </h2>
        <p className="mt-2 text-white/90 max-w-lg mx-auto">
          Découvrez les opportunités d&apos;investissement touristique sur SiyahaMag : riads, hôtels,
          terrains et projets en développement.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/investissement"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean transition-colors hover:bg-white/90"
          >
            Voir les opportunités
          </Link>
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Créer mon compte investisseur
          </Link>
        </div>
      </div>
    </div>
  )
}
