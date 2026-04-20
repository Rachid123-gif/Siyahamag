import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Guide Complet de l'Emploi dans le Tourisme au Maroc (2026) | SiyahaMag",
  description:
    "Découvrez les métiers du tourisme au Maroc, les salaires moyens par poste, les villes qui recrutent le plus et comment postuler. Guide complet et actualisé.",
  alternates: {
    canonical: "/guide/emploi-tourisme-maroc",
  },
  openGraph: {
    title: "Guide Complet de l'Emploi dans le Tourisme au Maroc (2026)",
    description:
      "Métiers, salaires, villes, formations : tout savoir pour travailler dans le tourisme au Maroc.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "emploi tourisme maroc",
    "travail hotellerie maroc",
    "salaire tourisme maroc",
    "metier tourisme maroc",
    "emploi hotel maroc",
    "guide emploi tourisme",
    "recrutement hotellerie maroc 2026",
  ],
}

// ── Table of Contents ────────────────────────────────────────────────

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "metiers", label: "Les différents métiers du tourisme" },
  { id: "salaires", label: "Les salaires moyens par poste" },
  { id: "villes", label: "Les villes qui recrutent le plus" },
  { id: "formations", label: "Les formations requises" },
  { id: "postuler", label: "Comment postuler sur SiyahaMag" },
  { id: "conseils", label: "Conseils pour réussir votre candidature" },
  { id: "faq", label: "Questions fréquentes" },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideEmploiTourismeMarocPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Guide Complet de l'Emploi dans le Tourisme au Maroc (2026)",
    description:
      "Découvrez les métiers du tourisme au Maroc, les salaires moyens par poste, les villes qui recrutent le plus et comment postuler.",
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
    datePublished: "2026-01-15",
    dateModified: "2026-04-20",
    mainEntityOfPage: "https://siyahamag.ma/guide/emploi-tourisme-maroc",
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Quel est le salaire moyen dans le tourisme au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le salaire moyen dans le tourisme au Maroc varie de 4 000 MAD pour un poste d'entrée (réceptionniste junior, serveur) à 35 000 MAD et plus pour un directeur d'hôtel. Le salaire médian se situe autour de 8 000 à 10 000 MAD par mois pour un poste avec 3 à 5 ans d'expérience.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il un diplôme pour travailler dans le tourisme au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un diplôme en hôtellerie-tourisme (BTS, licence ou master) est fortement recommandé pour les postes de management. Cependant, de nombreux postes opérationnels (service, cuisine, animation) sont accessibles avec une formation professionnelle ou de l'expérience. Les certifications spécifiques (HACCP, guide touristique agréé) sont obligatoires pour certains métiers.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la meilleure ville pour travailler dans le tourisme au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Marrakech est la ville qui offre le plus d'opportunités grâce à sa position de première destination touristique du Maroc. Agadir est idéale pour le tourisme balnéaire et les emplois saisonniers. Casablanca domine pour le tourisme d'affaires et les postes de management. Fès recrute activement des guides spécialisés en patrimoine.",
        },
      },
      {
        "@type": "Question",
        name: "Comment postuler aux offres d'emploi tourisme sur SiyahaMag ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Créez un compte candidat gratuit sur SiyahaMag, complétez votre profil avec votre CV et vos compétences, puis postulez directement aux offres qui vous intéressent. Vous pouvez aussi activer les alertes emploi pour être notifié des nouvelles offres correspondant à votre profil.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les métiers du tourisme les plus demandés au Maroc en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En 2026, les métiers les plus demandés sont : réceptionniste bilingue/trilingue, chef cuisinier (cuisine marocaine et internationale), guide touristique certifié, responsable spa et bien-être, revenue manager, et animateur touristique. La préparation de la Coupe du Monde 2030 crée aussi une forte demande en management hôtelier.",
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
          { label: "Guide", href: "/guide/emploi-tourisme-maroc" },
          { label: "Emploi tourisme Maroc" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide</span>
          <span>/</span>
          <span>Mis à jour le 20 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          Guide Complet de l&apos;Emploi dans le Tourisme au Maroc (2026)
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Le secteur touristique marocain emploie plus de 2,5 millions de personnes et continue de croître.
          Ce guide vous donne toutes les clés pour trouver votre place dans cette industrie dynamique :
          métiers, salaires, villes, formations et conseils de candidature.
        </p>
      </header>

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
        {/* Introduction */}
        <section id="introduction">
          <h2>Introduction : le tourisme, moteur de l&apos;économie marocaine</h2>
          <p>
            Le Maroc s&apos;est imposé comme la première destination touristique d&apos;Afrique, avec
            plus de <strong>15,9 millions de touristes</strong> accueillis en 2025. Le secteur
            représente environ <strong>7% du PIB national</strong> et constitue le deuxième
            pourvoyeur d&apos;emplois du pays après l&apos;agriculture.
          </p>
          <p>
            La stratégie nationale du tourisme vise <strong>17,5 millions de touristes d&apos;ici 2030</strong>,
            portée par la Coupe du Monde FIFA 2030 co-organisée par le Maroc. Cet objectif ambitieux
            génère des milliers de créations d&apos;emplois chaque année dans l&apos;hôtellerie, la
            restauration, le guidage, l&apos;animation et le management.
          </p>
          <p>
            Que vous soyez jeune diplômé, professionnel en reconversion ou expatrié souhaitant
            travailler au Maroc, ce guide vous accompagne dans votre recherche d&apos;emploi dans
            le tourisme marocain.
          </p>
        </section>

        {/* Métiers */}
        <section id="metiers">
          <h2>Les différents métiers du tourisme au Maroc</h2>
          <p>
            Le secteur touristique offre une grande diversité de métiers, des postes opérationnels
            aux fonctions de direction. Voici les principales familles de métiers :
          </p>

          <h3>Réception et accueil</h3>
          <p>
            Le personnel d&apos;accueil est la première image de l&apos;établissement. Les postes de
            <strong> réceptionniste</strong>, <strong>concierge</strong> et <strong>night auditor</strong> sont
            parmi les plus demandés. La maîtrise d&apos;au moins deux langues (français + anglais ou arabe)
            est indispensable. Les hôtels de luxe recherchent des profils trilingues voire quadrilingues.
          </p>
          <p>
            Les compétences clés incluent la maîtrise des logiciels de gestion hôtelière (Opera PMS,
            Fidelio), l&apos;aisance relationnelle et la capacité à gérer les réclamations avec diplomatie.
          </p>

          <h3>Cuisine et restauration</h3>
          <p>
            La gastronomie marocaine, inscrite au patrimoine immatériel de l&apos;UNESCO, est un atout majeur
            du tourisme national. Les postes de <strong>chef cuisinier</strong>, <strong>sous-chef</strong>,
            <strong>chef pâtissier</strong> et <strong>commis de cuisine</strong> sont constamment demandés.
          </p>
          <p>
            La cuisine marocaine traditionnelle (tajines, couscous, pastilla) est valorisée, mais la
            demande croissante pour la <strong>cuisine fusion</strong> et <strong>internationale</strong> offre
            des opportunités aux chefs polyvalents. La certification <strong>HACCP</strong> (Hazard Analysis
            Critical Control Points) est devenue obligatoire dans les établissements classés.
          </p>

          <h3>Guide touristique</h3>
          <p>
            Le Maroc regorge de sites historiques, culturels et naturels qui nécessitent des guides
            qualifiés. La profession de <strong>guide touristique</strong> est réglementée : il faut
            obtenir une <strong>carte professionnelle</strong> délivrée par le Ministère du Tourisme après
            une formation spécifique.
          </p>
          <p>
            Les guides spécialisés en patrimoine (médinas de Fès et Marrakech, sites romains de
            Volubilis) sont particulièrement recherchés. Les guides de montagne (Haut Atlas, Toubkal)
            et de désert (Merzouga, M&apos;Hamid) constituent des niches très rémunératrices.
          </p>

          <h3>Animation et loisirs</h3>
          <p>
            Les <strong>animateurs touristiques</strong> travaillent principalement dans les resorts
            balnéaires et les clubs de vacances. Ils organisent des activités sportives, culturelles
            et ludiques pour les clients. C&apos;est un métier idéal pour les jeunes dynamiques qui
            aiment le contact humain.
          </p>
          <p>
            Les activités nautiques (surf, kitesurf, plongée) connaissent un essor particulier
            à Agadir, Essaouira et Dakhla, créant une demande croissante pour des
            <strong> moniteurs certifiés</strong>.
          </p>

          <h3>Management hôtelier</h3>
          <p>
            Les postes de direction sont les plus rémunérateurs du secteur : <strong>directeur d&apos;hôtel</strong>,
            <strong> directeur de la restauration</strong> (F&B Manager), <strong>revenue manager</strong>,
            <strong> directeur commercial</strong>. Ces postes exigent généralement un diplôme supérieur
            (master ou MBA en hôtellerie) et 5 à 10 ans d&apos;expérience.
          </p>
          <p>
            Avec la multiplication des établissements en vue de la Coupe du Monde 2030, la demande
            en cadres dirigeants va fortement augmenter dans les prochaines années.
          </p>

          <h3>Spa et bien-être</h3>
          <p>
            Le Maroc est réputé pour ses hammams traditionnels et ses soins à base de produits naturels
            (huile d&apos;argan, ghassoul, eau de rose). Les <strong>thérapeutes spa</strong>,
            <strong> esthéticiennes</strong> et <strong>responsables bien-être</strong> sont de plus en
            plus demandés, notamment dans les hôtels 4 et 5 étoiles.
          </p>
          <p>
            La tendance au tourisme de bien-être et aux retraites wellness crée de nouvelles
            opportunités, en particulier à Marrakech et dans la région de l&apos;Atlas.
          </p>
        </section>

        {/* Salaires */}
        <section id="salaires">
          <h2>Les salaires moyens par poste</h2>
          <p>
            Les salaires dans le tourisme au Maroc varient considérablement selon le poste, l&apos;expérience,
            la ville et le standing de l&apos;établissement. Voici les fourchettes de rémunération
            mensuelles nettes en dirhams marocains (MAD) pour 2026 :
          </p>

          <div className="not-prose overflow-x-auto my-6">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3 font-semibold">Poste</th>
                  <th className="p-3 font-semibold">Débutant</th>
                  <th className="p-3 font-semibold">Confirmé (3-5 ans)</th>
                  <th className="p-3 font-semibold">Senior (8+ ans)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">Réceptionniste</td>
                  <td className="p-3">4 000 - 5 500 MAD</td>
                  <td className="p-3">6 000 - 8 000 MAD</td>
                  <td className="p-3">9 000 - 12 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Chef cuisinier</td>
                  <td className="p-3">5 000 - 7 000 MAD</td>
                  <td className="p-3">8 000 - 14 000 MAD</td>
                  <td className="p-3">15 000 - 25 000 MAD</td>
                </tr>
                <tr>
                  <td className="p-3">Guide touristique</td>
                  <td className="p-3">4 500 - 6 000 MAD</td>
                  <td className="p-3">7 000 - 12 000 MAD</td>
                  <td className="p-3">12 000 - 18 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Animateur touristique</td>
                  <td className="p-3">3 500 - 5 000 MAD</td>
                  <td className="p-3">5 000 - 7 000 MAD</td>
                  <td className="p-3">8 000 - 10 000 MAD</td>
                </tr>
                <tr>
                  <td className="p-3">Serveur / Chef de rang</td>
                  <td className="p-3">3 500 - 4 500 MAD</td>
                  <td className="p-3">5 000 - 7 500 MAD</td>
                  <td className="p-3">8 000 - 10 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Responsable spa</td>
                  <td className="p-3">5 000 - 7 000 MAD</td>
                  <td className="p-3">8 000 - 14 000 MAD</td>
                  <td className="p-3">15 000 - 20 000 MAD</td>
                </tr>
                <tr>
                  <td className="p-3">Revenue Manager</td>
                  <td className="p-3">8 000 - 10 000 MAD</td>
                  <td className="p-3">12 000 - 18 000 MAD</td>
                  <td className="p-3">20 000 - 28 000 MAD</td>
                </tr>
                <tr className="bg-muted/30">
                  <td className="p-3">Directeur d&apos;hôtel</td>
                  <td className="p-3">-</td>
                  <td className="p-3">18 000 - 25 000 MAD</td>
                  <td className="p-3">25 000 - 45 000 MAD</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Note :</strong> Ces chiffres sont des moyennes nationales. Les salaires dans les palaces
            et hôtels 5 étoiles de Marrakech et Casablanca peuvent être significativement supérieurs.
            Les pourboires et avantages en nature (logement, repas, transport) sont courants et peuvent
            représenter 20 à 30% de la rémunération totale.
          </p>
        </section>

        {/* Villes */}
        <section id="villes">
          <h2>Les villes qui recrutent le plus</h2>
          <p>
            Toutes les villes touristiques du Maroc offrent des opportunités, mais certaines concentrent
            davantage d&apos;offres d&apos;emploi :
          </p>

          <h3>Marrakech — La capitale touristique</h3>
          <p>
            Avec plus de 3 millions de visiteurs par an, Marrakech est de loin la ville qui recrute
            le plus dans le tourisme. On y trouve des palaces (Royal Mansour, La Mamounia), des
            hôtels internationaux (Four Seasons, Oberoi) et des milliers de riads. Les postes les
            plus demandés : réceptionnistes bilingues, chefs cuisiniers, guides de la médina.
          </p>
          <p>
            <Link href="/emplois/marrakech" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Marrakech
            </Link>
          </p>

          <h3>Agadir — Le balnéaire</h3>
          <p>
            Première station balnéaire du Maroc, Agadir recrute massivement pendant la saison
            estivale (mai-octobre). Les resorts all-inclusive comme le RIU Tikida et le Sofitel
            Royal Bay emploient des centaines de saisonniers. Excellente option pour une première
            expérience dans le secteur.
          </p>
          <p>
            <Link href="/emplois/agadir" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Agadir
            </Link>
          </p>

          <h3>Casablanca — Le tourisme d&apos;affaires</h3>
          <p>
            Casablanca domine le segment du tourisme d&apos;affaires et du MICE (Meetings, Incentives,
            Conferences, Exhibitions). Les grands groupes hôteliers y ont leur siège régional,
            offrant des postes de management et de stratégie à des salaires parmi les plus élevés
            du secteur.
          </p>
          <p>
            <Link href="/emplois/casablanca" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Casablanca
            </Link>
          </p>

          <h3>Fès — Le patrimoine</h3>
          <p>
            La médina de Fès, classée au patrimoine mondial de l&apos;UNESCO, attire un tourisme culturel
            de qualité. La ville manque de guides spécialisés et de gérants de riads-boutiques.
            Le secteur de la gastronomie traditionnelle fassi est aussi très porteur.
          </p>
          <p>
            <Link href="/emplois/fes" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Fès
            </Link>
          </p>

          <h3>Tanger — La ville en plein boom</h3>
          <p>
            Tanger connaît une transformation spectaculaire avec de nombreux projets hôteliers
            et la perspective de la Coupe du Monde 2030. La ville offre des opportunités croissantes,
            notamment dans le spa/bien-être et les établissements haut de gamme.
          </p>
          <p>
            <Link href="/emplois/tanger" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Tanger
            </Link>
          </p>

          <h3>Essaouira — Le charme authentique</h3>
          <p>
            Essaouira attire une clientèle européenne fidèle grâce à son patrimoine, ses alizés
            (idéaux pour les sports nautiques) et son festival Gnaoua. Les riads et restaurants
            de la médina recrutent régulièrement des profils passionnés.
          </p>
          <p>
            <Link href="/emplois/essaouira" className="text-ocean font-medium hover:underline">
              Voir les offres d&apos;emploi à Essaouira
            </Link>
          </p>
        </section>

        {/* Formations */}
        <section id="formations">
          <h2>Les formations requises</h2>
          <p>
            Le niveau de formation requis dépend du poste visé. Voici un aperçu des parcours
            les plus courants :
          </p>

          <h3>Formations universitaires</h3>
          <ul>
            <li>
              <strong>Licence en tourisme et hôtellerie</strong> — Proposée par plusieurs universités
              marocaines (ISIT, ISAH, Sup de Co Marrakech). Durée : 3 ans. Ouvre les portes du
              management junior.
            </li>
            <li>
              <strong>Master en management hôtelier</strong> — Pour les postes de direction.
              Écoles reconnues : EHTP, UIR, Al Akhawayn. Programmes parfois en partenariat avec
              des écoles suisses ou françaises.
            </li>
            <li>
              <strong>MBA Hospitality Management</strong> — Formation d&apos;élite pour les postes de
              direction générale dans les chaînes internationales.
            </li>
          </ul>

          <h3>Formations professionnelles</h3>
          <ul>
            <li>
              <strong>OFPPT — Technicien en hôtellerie-restauration</strong> — Formation de 2 ans
              très reconnue par les employeurs. Accessible après le baccalauréat.
            </li>
            <li>
              <strong>Brevet de guide touristique</strong> — Délivré par le Ministère du Tourisme
              après une formation spécifique. Obligatoire pour exercer légalement.
            </li>
            <li>
              <strong>Certification HACCP</strong> — Obligatoire pour les métiers de la cuisine
              en établissement classé. Formations courtes (2-5 jours).
            </li>
          </ul>

          <h3>Certifications complémentaires valorisées</h3>
          <ul>
            <li>Certifications en langues (DELF/DALF, TOEFL, DELE) — un atout majeur</li>
            <li>Certification en gestion hôtelière (Cornell, EHL online)</li>
            <li>Formation en revenue management et yield management</li>
            <li>Certification sommellerie (pour les postes en restauration gastronomique)</li>
            <li>Premiers secours et sécurité — obligatoire pour les métiers d&apos;animation</li>
          </ul>
        </section>

        {/* Postuler */}
        <section id="postuler">
          <h2>Comment postuler sur SiyahaMag</h2>
          <p>
            SiyahaMag est la première plateforme marocaine dédiée à l&apos;emploi dans le tourisme.
            Voici comment maximiser vos chances de décrocher un poste :
          </p>

          <h3>Étape 1 : Créer votre profil candidat</h3>
          <p>
            Rendez-vous sur la page{" "}
            <Link href="/inscription" className="text-ocean font-medium hover:underline">
              d&apos;inscription
            </Link>{" "}
            et créez votre compte gratuit. Complétez votre profil avec vos informations
            personnelles, votre expérience et vos compétences linguistiques.
          </p>

          <h3>Étape 2 : Télécharger votre CV</h3>
          <p>
            Uploadez votre CV au format PDF. Privilégiez un CV clair, structuré et adapté
            au secteur touristique. Mentionnez vos langues parlées, vos certifications et
            vos expériences en contact avec la clientèle.
          </p>

          <h3>Étape 3 : Parcourir les offres</h3>
          <p>
            Consultez les{" "}
            <Link href="/emplois" className="text-ocean font-medium hover:underline">
              offres d&apos;emploi
            </Link>{" "}
            et filtrez par ville, catégorie ou type de contrat. Vous pouvez aussi rechercher
            par mot-clé (ex : &quot;chef cuisinier Marrakech&quot;).
          </p>

          <h3>Étape 4 : Postuler et suivre</h3>
          <p>
            Postulez en un clic aux offres qui vous intéressent. Votre CV et votre profil
            seront automatiquement transmis à l&apos;employeur. Suivez l&apos;avancement de vos
            candidatures directement depuis votre tableau de bord.
          </p>
        </section>

        {/* Conseils */}
        <section id="conseils">
          <h2>Conseils pour réussir votre candidature</h2>

          <h3>Maîtrisez les langues</h3>
          <p>
            Le multilinguisme est l&apos;atout n°1 dans le tourisme marocain. Le français et l&apos;arabe
            sont les bases. L&apos;anglais est indispensable pour les postes en contact avec la
            clientèle internationale. L&apos;espagnol, l&apos;allemand ou le chinois mandarin sont des
            atouts majeurs qui peuvent doubler votre salaire.
          </p>

          <h3>Soignez votre présentation</h3>
          <p>
            L&apos;hôtellerie-tourisme est un secteur de l&apos;image. Votre photo de profil doit être
            professionnelle, votre CV impeccable et votre lettre de motivation personnalisée
            pour chaque candidature.
          </p>

          <h3>Valorisez vos stages et saisons</h3>
          <p>
            Chaque expérience compte. Un stage dans un riad familial, une saison dans un camping,
            un job d&apos;été dans un restaurant : toutes ces expériences montrent votre motivation
            et votre connaissance du terrain.
          </p>

          <h3>Développez votre réseau</h3>
          <p>
            Le bouche-à-oreille reste un canal de recrutement majeur dans le tourisme marocain.
            Participez aux salons professionnels (FITUR, ITB, Salon du Tourisme de Marrakech),
            rejoignez les associations professionnelles et soyez actif sur les réseaux.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2>Questions fréquentes</h2>

          <div className="not-prose space-y-4 my-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quel est le salaire moyen dans le tourisme au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le salaire moyen dans le tourisme au Maroc varie de 4 000 MAD pour un poste d&apos;entrée
                (réceptionniste junior, serveur) à 35 000 MAD et plus pour un directeur d&apos;hôtel. Le
                salaire médian se situe autour de 8 000 à 10 000 MAD par mois pour un poste avec 3 à
                5 ans d&apos;expérience.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Faut-il un diplôme pour travailler dans le tourisme au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Un diplôme en hôtellerie-tourisme (BTS, licence ou master) est fortement recommandé pour
                les postes de management. Cependant, de nombreux postes opérationnels (service, cuisine,
                animation) sont accessibles avec une formation professionnelle ou de l&apos;expérience. Les
                certifications spécifiques (HACCP, guide touristique agréé) sont obligatoires pour
                certains métiers.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quelle est la meilleure ville pour travailler dans le tourisme au Maroc ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Marrakech est la ville qui offre le plus d&apos;opportunités grâce à sa position de première
                destination touristique du Maroc. Agadir est idéale pour le tourisme balnéaire et les
                emplois saisonniers. Casablanca domine pour le tourisme d&apos;affaires et les postes de
                management. Fès recrute activement des guides spécialisés en patrimoine.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Comment postuler aux offres d&apos;emploi tourisme sur SiyahaMag ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Créez un compte candidat gratuit sur SiyahaMag, complétez votre profil avec votre CV
                et vos compétences, puis postulez directement aux offres qui vous intéressent. Vous
                pouvez aussi activer les alertes emploi pour être notifié des nouvelles offres
                correspondant à votre profil.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-semibold text-foreground">
                Quels sont les métiers du tourisme les plus demandés au Maroc en 2026 ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                En 2026, les métiers les plus demandés sont : réceptionniste bilingue/trilingue, chef
                cuisinier (cuisine marocaine et internationale), guide touristique certifié, responsable
                spa et bien-être, revenue manager, et animateur touristique. La préparation de la Coupe
                du Monde 2030 crée aussi une forte demande en management hôtelier.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* CTA */}
      <div className="mt-12 rounded-xl border bg-gradient-to-r from-ocean to-ocean/80 p-8 text-center text-white">
        <h2 className="text-xl sm:text-2xl font-bold">
          Prêt à commencer votre carrière dans le tourisme ?
        </h2>
        <p className="mt-2 text-white/90 max-w-lg mx-auto">
          Rejoignez SiyahaMag et accédez aux meilleures offres d&apos;emploi du secteur touristique marocain.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/inscription"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-ocean transition-colors hover:bg-white/90"
          >
            Créer mon compte candidat
          </Link>
          <Link
            href="/emplois"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Voir les offres d&apos;emploi
          </Link>
        </div>
      </div>
    </div>
  )
}
