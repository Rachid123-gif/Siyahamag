import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Tourisme Agadir 2026 : Bilan, Chiffres & Perspectives du Marché | SiyahaMag",
  description:
    "Analyse complète du marché touristique d'Agadir en 2026 : taux d'occupation, arrivées, investissements, tendances et opportunités emploi dans la capitale balnéaire du Maroc.",
  alternates: {
    canonical: "/guide/analyse-marche-tourisme-agadir-2026",
  },
  openGraph: {
    title: "Tourisme Agadir 2026 : Bilan & Perspectives du Marché",
    description:
      "Agadir consolide sa place de 1ère station balnéaire africaine. Chiffres clés, taux d'occupation, investissements et opportunités pour 2026.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "tourisme agadir 2026",
    "analyse marche tourisme agadir",
    "taux occupation hotels agadir",
    "investissement touristique agadir",
    "chiffres tourisme agadir",
    "station balneaire maroc agadir",
    "emploi tourisme agadir",
    "perspectives tourisme agadir",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tourisme Agadir 2026 : Analyse Complète du Marché",
  description:
    "Analyse du marché touristique d'Agadir : taux d'occupation, arrivées, investissements et perspectives 2026.",
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
  datePublished: "2026-04-21",
  dateModified: "2026-04-21",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/analyse-marche-tourisme-agadir-2026",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le taux d'occupation des hôtels à Agadir en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En 2026, le taux d'occupation moyen des hôtels à Agadir s'établit à 74 % sur l'année, avec des pics atteignant 92 % en juillet-août et 88 % pendant les vacances scolaires européennes (Noël, Pâques). Ce taux est supérieur de 8 points à la moyenne nationale marocaine.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de touristes visitent Agadir chaque année ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agadir accueille environ 3,2 millions de touristes par an (2025), dont 78 % sont des visiteurs étrangers. Les principaux marchés émetteurs sont la France (32 %), l'Allemagne (18 %), les Pays-Bas (12 %), le Royaume-Uni (11 %) et l'Espagne (8 %).",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les projets hôteliers en cours à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agadir accueille plusieurs grands projets : l'extension de la station Taghazout Bay (2 500 lits supplémentaires d'ici 2028), le projet Oued Souss Resort (1 800 chambres), et la rénovation du front de mer d'Agadir avec 12 nouveaux établissements. L'investissement total dépasse 8 milliards de MAD.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la meilleure période pour travailler dans le tourisme à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agadir offre une saisonnalité étendue grâce à son climat. La haute saison estivale (juin-septembre) est la plus intense, mais l'hiver doux (18-22°C) attire une clientèle européenne de novembre à mars. Les recrutements les plus nombreux ont lieu en mai et en octobre.",
      },
    },
    {
      "@type": "Question",
      name: "Comment investir dans le tourisme à Agadir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Investir dans le tourisme à Agadir est facilité par le Centre Régional d'Investissement (CRI) de Souss-Massa, qui offre des exonérations fiscales pour les projets hôteliers. Les opportunités incluent : résidences touristiques, restaurants gastronomiques et activités de loisirs nautiques. SiyahaMag référence les projets disponibles dans sa section Investissement.",
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
      name: "Guides & Analyses",
      item: "https://siyahamag.ma/statistiques",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Analyse Tourisme Agadir 2026",
      item: "https://siyahamag.ma/guide/analyse-marche-tourisme-agadir-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function AnalyseMarecheTourismeAgadirPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Statistiques & Analyses", href: "/statistiques" },
          { label: "Marché Tourisme Agadir 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Analyse de marché</span>
          <span>/</span>
          <span>Publié le 21 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Tourisme Agadir 2026 : Bilan et Perspectives du Marché
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Agadir consolide en 2026 son statut de première station balnéaire d&apos;Afrique.
          Avec 3,2 millions de visiteurs annuels, un taux d&apos;occupation hôtelière record
          de 74 % et des investissements dépassant 8 milliards de MAD en cours, la capitale
          du Souss-Massa offre un marché touristique parmi les plus dynamiques du continent.
          Analyse complète.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=500&fit=crop"
          alt="Plage d'Agadir, première station balnéaire du Maroc"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          La plage d&apos;Agadir, 7 km de sable doré longeant l&apos;Atlantique
        </figcaption>
      </figure>

      {/* Chiffres clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: "3,2 M", label: "Touristes/an" },
          { value: "74 %", label: "Taux occupation" },
          { value: "28 000", label: "Emplois directs" },
          { value: "8 Md MAD", label: "Investissements" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#positionnement", "Positionnement d'Agadir sur l'échiquier touristique"],
            ["#chiffres-2025", "Bilan 2025 : les chiffres clés"],
            ["#occupation", "Taux d'occupation et saisonnalité"],
            ["#marches-emetteurs", "Les marchés émetteurs principaux"],
            ["#investissements", "Projets d'investissement en cours"],
            ["#emploi", "Impact sur l'emploi touristique"],
            ["#perspectives", "Perspectives 2026-2030"],
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

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="positionnement">Positionnement d&apos;Agadir sur l&apos;échiquier touristique</h2>
        <p>
          Agadir occupe une place stratégique dans le tourisme marocain. Contrairement à
          Marrakech qui mise sur le tourisme culturel et le luxe urbain, ou à Fès sur
          le patrimoine médiéval, Agadir s&apos;est positionnée comme la <strong>destination
          balnéaire de référence</strong> du pays, combinant plage, soleil quasi-permanent
          et offre hôtelière internationale de qualité.
        </p>
        <p>
          La ville dispose d&apos;atouts structurels uniques : <strong>340 jours de soleil
          par an</strong>, une plage de 7 km protégée de l&apos;Atlantique, un aéroport
          international Al Massira (5e du Maroc en trafic), et une infrastructure hôtelière
          mature avec plus de 250 établissements classés.
        </p>
        <p>
          Face à la concurrence régionale (Tunisie, Égypte, Canaries), Agadir tire son
          épingle du jeu grâce à sa sécurité, sa proximité avec l&apos;Europe (3h30 de
          Paris) et la montée en gamme continue de son offre.
        </p>

        <h2 id="chiffres-2025">Bilan 2025 : les chiffres clés</h2>
        <p>
          L&apos;année 2025 marque un <strong>record historique</strong> pour le tourisme
          agadirois. Voici les principaux indicateurs selon le Conseil Régional du Tourisme
          (CRT) de Souss-Massa :
        </p>
        <ul>
          <li>
            <strong>3 200 000 arrivées</strong> de touristes (+11 % par rapport à 2024)
          </li>
          <li>
            <strong>12 400 000 nuitées</strong> dans les établissements classés
            (+9,3 % vs 2024)
          </li>
          <li>
            <strong>Recettes touristiques :</strong> 7,8 milliards de MAD
          </li>
          <li>
            <strong>Durée moyenne de séjour :</strong> 7,2 jours (contre 4,1 jours pour
            Marrakech)
          </li>
          <li>
            <strong>Capacité hôtelière :</strong> 38 500 lits classifiés (+3 200 lits
            ouverts en 2025)
          </li>
        </ul>

        <h2 id="occupation">Taux d&apos;occupation et saisonnalité</h2>
        <p>
          Le taux d&apos;occupation est l&apos;indicateur le plus scruté par les investisseurs
          et les employeurs. Agadir présente un profil de saisonnalité favorable comparé
          à d&apos;autres destinations marocaines :
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Période</th>
                <th>Taux d&apos;occupation</th>
                <th>Demande RH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Janvier–Mars</td>
                <td>68 %</td>
                <td>Moyenne (clientèle hivernale EU)</td>
              </tr>
              <tr>
                <td>Avril–Mai</td>
                <td>72 %</td>
                <td>Haute (vacances Pâques)</td>
              </tr>
              <tr>
                <td>Juin–Août</td>
                <td>91 %</td>
                <td>Très haute (saisonniers nécessaires)</td>
              </tr>
              <tr>
                <td>Septembre–Octobre</td>
                <td>78 %</td>
                <td>Haute (retour tourisme famille)</td>
              </tr>
              <tr>
                <td>Novembre–Décembre</td>
                <td>65 %</td>
                <td>Moyenne (tourisme Noël nordique)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          La saisonnalité étendue d&apos;Agadir permet aux hôtels de maintenir des équipes
          permanentes conséquentes, contrairement à des destinations à forte saisonnalité
          comme Merzouga ou Dakhla. Cela crée davantage d&apos;emplois stables à l&apos;année.
        </p>

        <h2 id="marches-emetteurs">Les marchés émetteurs principaux</h2>
        <p>
          La clientèle d&apos;Agadir est très internationale, avec une forte prédominance
          européenne :
        </p>
        <ul>
          <li><strong>France :</strong> 32 % des nuitées — clientèle familiale et retraités</li>
          <li><strong>Allemagne :</strong> 18 % — très fidèle, longs séjours</li>
          <li><strong>Pays-Bas :</strong> 12 % — parmi les plus dépensiers</li>
          <li><strong>Royaume-Uni :</strong> 11 % — en progression post-Brexit</li>
          <li><strong>Espagne :</strong> 8 % — week-ends et courts séjours</li>
          <li><strong>Maroc (tourisme intérieur) :</strong> 11 % — en forte hausse (+23 % en 2025)</li>
          <li><strong>Autres :</strong> 8 % (Scandinavie, Golf, Amérique du Nord)</li>
        </ul>
        <p>
          La montée du <strong>tourisme intérieur marocain</strong> est l&apos;une des tendances
          les plus significatives. La classe moyenne marocaine découvre les joies du séjour
          balnéaire national, un segment en croissance rapide qui diversifie les revenus
          des hôteliers.
        </p>

        <h2 id="investissements">Projets d&apos;investissement en cours</h2>
        <p>
          Agadir concentre une part importante des grands projets touristiques marocains
          pour la période 2025-2030 :
        </p>

        <h3>Station Taghazout Bay — Phase 2</h3>
        <p>
          Lancée en 2013, la station intégrée de Taghazout Bay (30 km au nord d&apos;Agadir)
          entre dans sa deuxième phase. <strong>2 500 lits supplémentaires</strong> dans
          des hôtels 4 et 5 étoiles, un terrain de golf 18 trous réaménagé et un centre de
          thalassothérapie premium. Livraison prévue fin 2027. Investissement estimé :
          2,8 milliards MAD.
        </p>

        <h3>Projet Oued Souss Resort</h3>
        <p>
          Nouveau complexe mixte de 250 hectares à l&apos;embouchure de l&apos;Oued Souss.
          Comprend un hôtel 5* de 350 chambres, 1 450 résidences touristiques, une marina
          et un parc aquatique. Ce projet, piloté par un consortium marocco-émirati, devrait
          créer <strong>3 200 emplois directs</strong> à terme.
        </p>

        <h3>Réhabilitation du front de mer</h3>
        <p>
          La commune d&apos;Agadir investit 600 millions MAD dans la rénovation de la
          promenade côtière avec 12 nouveaux établissements de restauration et loisirs,
          une nouvelle zone de sports nautiques et l&apos;aménagement de nouveaux espaces
          publics. Livraison progressive entre 2026 et 2028.
        </p>

        <h2 id="emploi">Impact sur l&apos;emploi touristique à Agadir</h2>
        <p>
          Le secteur touristique emploie directement <strong>28 000 personnes</strong> dans
          la région Souss-Massa (2025), auxquelles s&apos;ajoutent environ 85 000 emplois
          indirects (artisanat, transport, agriculture exportatrice). Les projections pour
          2030 tablent sur 42 000 emplois directs, soit une croissance de 50 % en cinq ans.
        </p>
        <p>
          Les profils les plus recherchés pour les années à venir à Agadir :
        </p>
        <ul>
          <li>Managers hôteliers bilingues avec expérience internationale</li>
          <li>Revenue managers et chefs de réservation</li>
          <li>Spécialistes bien-être et thalassothérapie</li>
          <li>Chefs cuisiniers (gastronomie marocaine premium et fusion)</li>
          <li>Responsables MICE (Meetings, Incentives, Conferences, Events)</li>
          <li>Guides touristiques certifiés trilingues</li>
        </ul>
        <p>
          Pour consulter les offres disponibles dès maintenant, rendez-vous sur la page{" "}
          <Link href="/emplois/agadir" className="text-primary hover:underline">
            emploi tourisme Agadir
          </Link>{" "}
          de SiyahaMag.
        </p>

        <h2 id="perspectives">Perspectives 2026-2030</h2>
        <p>
          Le tourisme agadirois bénéficie de plusieurs catalyseurs pour la période à venir :
        </p>

        <h3>L&apos;effet Coupe du Monde 2030</h3>
        <p>
          Si Agadir ne figure pas parmi les 6 villes hôtes de la Coupe du Monde 2030
          (Casablanca, Marrakech, Rabat, Fès, Tanger, Agadir — en attente de confirmation),
          la ville bénéficiera d&apos;un effet d&apos;entraînement fort. La mise à niveau
          des infrastructures nationales (autoroutes, rail, aéroports) améliorera
          l&apos;accessibilité et stimulera les arrivées touristiques globales.
        </p>

        <h3>Diversification vers le tourisme de bien-être</h3>
        <p>
          Agadir positionne stratégiquement sa filière thalassothérapie et bien-être.
          Avec l&apos;argatier et les richesses naturelles du Souss, la région développe
          une offre spa premium appuyée sur les matières premières locales (argan, eau de
          mer, sable volcanique). Ce segment cible une clientèle à fort pouvoir d&apos;achat,
          avec un panier moyen 40 % supérieur au touriste balnéaire classique.
        </p>

        <h3>Montée en puissance du tourisme MICE</h3>
        <p>
          L&apos;inauguration du nouveau centre de conférences d&apos;Agadir (capacité
          5 000 places) en 2025 positionne la ville sur le segment des grands événements
          professionnels. Ce secteur génère des nuitées en basse saison, contribuant à
          lisser la saisonnalité et à justifier des investissements en personnel permanent.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2">Prévisions SiyahaMag à horizon 2030</h3>
          <ul className="text-sm space-y-2">
            <li>• Arrivées touristiques : <strong>4,8 millions</strong> (vs 3,2 M en 2025)</li>
            <li>• Capacité hôtelière : <strong>55 000 lits</strong> classifiés</li>
            <li>• Emplois directs tourisme : <strong>42 000</strong></li>
            <li>• Recettes touristiques : <strong>12 milliards MAD</strong></li>
          </ul>
        </div>

        <p>
          Pour suivre l&apos;évolution des marchés touristiques marocains en temps réel,
          consultez nos{" "}
          <Link href="/statistiques" className="text-primary hover:underline">
            tableaux de bord statistiques
          </Link>{" "}
          ou explorez les{" "}
          <Link href="/investissement" className="text-primary hover:underline">
            opportunités d&apos;investissement touristique
          </Link>{" "}
          référencées sur SiyahaMag.
        </p>

        {/* FAQ */}
        <h2 id="faq">Questions fréquentes sur le tourisme à Agadir</h2>
        <div className="space-y-6 not-prose">
          {[
            {
              q: "Quel est le taux d'occupation des hôtels à Agadir en 2026 ?",
              a: "74 % en moyenne annuelle, avec des pics à 92 % en juillet-août. Ce taux est supérieur de 8 points à la moyenne nationale marocaine.",
            },
            {
              q: "Combien de touristes visitent Agadir chaque année ?",
              a: "Environ 3,2 millions en 2025 (+11 % vs 2024), dont 78 % d'étrangers. La France représente 32 % des nuitées, suivie de l'Allemagne (18 %) et des Pays-Bas (12 %).",
            },
            {
              q: "Quels sont les projets hôteliers en cours à Agadir ?",
              a: "Station Taghazout Bay Phase 2 (2 500 lits, livraison 2027), Oued Souss Resort (1 800 chambres), et réhabilitation du front de mer. Investissement total : plus de 8 milliards MAD.",
            },
            {
              q: "Quelle est la meilleure période pour travailler dans le tourisme à Agadir ?",
              a: "Agadir a une saison étendue. Les recrutements principaux ont lieu en mai (pour l'été) et en octobre (pour la saison hivernale européenne). Les postes permanents existent toute l'année.",
            },
            {
              q: "Comment investir dans le tourisme à Agadir ?",
              a: "Le CRI Souss-Massa offre des exonérations fiscales pour les projets hôteliers. Opportunités : résidences touristiques, restaurants gastronomiques, activités nautiques. SiyahaMag liste les projets disponibles dans sa section Investissement.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border rounded-xl p-5">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-muted-foreground text-sm">{a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Vous cherchez à travailler ou investir à Agadir ?
        </h2>
        <p className="mb-6 opacity-90">
          SiyahaMag vous connecte aux meilleures offres d&apos;emploi et
          aux projets d&apos;investissement touristique de la région.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/emplois/agadir"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition"
          >
            Offres emploi Agadir
          </Link>
          <Link
            href="/investissement"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Opportunités investissement
          </Link>
        </div>
      </div>
    </div>
  )
}
