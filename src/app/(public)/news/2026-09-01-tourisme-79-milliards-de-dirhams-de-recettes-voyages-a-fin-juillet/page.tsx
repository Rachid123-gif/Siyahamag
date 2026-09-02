import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tourisme Marocain : Recettes Voyages Atteignent un Record de 79 MMDH | SiyahaMag",
  description: "Le Maroc enregistre 79,009 milliards de dirhams de recettes voyages à fin juillet, marquant une hausse de 13,4%. Une performance solide pour le secteur tou",
  keywords: ["Tourisme Maroc","Recettes Voyages","Office des Changes","ONMT","Investissement Tourisme","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-09-01-tourisme-79-milliards-de-dirhams-de-recettes-voyages-a-fin-juillet" },
  openGraph: {
    title: "Tourisme Marocain : Recettes Voyages Atteignent un Record de 79 MMDH",
    description: "Le Maroc enregistre 79,009 milliards de dirhams de recettes voyages à fin juillet, marquant une hausse de 13,4%. Une performance solide pour le secteur tou",
    type: "article",
    publishedTime: "2026-09-01T14:34:44.000Z",
  },
}

const ARTICLE = {
  "title": "Tourisme Marocain : Recettes Voyages Atteignent un Record de 79 MMDH",
  "metaDescription": "Le Maroc enregistre 79,009 milliards de dirhams de recettes voyages à fin juillet, marquant une hausse de 13,4%. Une performance solide pour le secteur tou",
  "intro": "Le secteur touristique marocain continue de briller, affichant des performances financières remarquables. Selon les dernières données de l'Office des Changes, les recettes générées par les voyages ont atteint un niveau historique à fin juillet. Cette croissance substantielle témoigne de l'attractivité croissante du Royaume et de l'efficacité des stratégies promotionnelles mises en œuvre.",
  "sections": [
    {
      "heading": "Analyse des Chiffres Clés et Croissance Sostenue du Secteur",
      "paragraphs": [
        "Les derniers indicateurs de l'Office des Changes révèlent une dynamique exceptionnelle pour le tourisme marocain. À fin juillet de cette année, les recettes voyages ont culminé à 79,009 milliards de dirhams (MMDH), un chiffre éloquent qui souligne la robustesse du secteur. Cette performance représente une amélioration notable de 13,4% par rapport à la même période de l'année précédente, confirmant la trajectoire ascendante du tourisme national et sa résilience face aux défis économiques mondiaux. Ce bond significatif place le Maroc parmi les destinations les plus performantes en matière de récupération post-pandémique.",
        "Au-delà des recettes, le bulletin de l'Office des Changes met également en lumière une augmentation des dépenses voyages, qui ont progressé de 7,3%. Cette hausse combinée des entrées et des sorties de devises liées au tourisme est un baromètre essentiel de l'activité économique. Elle reflète non seulement l'afflux croissant de visiteurs internationaux, mais aussi une consommation accrue sur le territoire, injectant directement des capitaux dans l'économie locale et nationale. Ces dépenses incluent l'hébergement, la restauration, les achats d'artisanat, les transports locaux et les activités culturelles, bénéficiant à une multitude d'acteurs économiques.",
        "Ces chiffres ne sont pas le fruit du hasard, mais le résultat d'efforts concertés pour revitaliser et moderniser l'offre touristique marocaine. Ils s'inscrivent dans une période de reprise globale post-pandémique, où le Maroc a su se positionner comme une destination sûre et attractive. Le Royaume a capitalisé sur son patrimoine culturel riche, ses paysages diversifiés – des montagnes de l'Atlas aux déserts du Sahara, en passant par ses côtes atlantiques et méditerranéennes – et son hospitalité légendaire, qui sont autant d'atouts majeurs plébiscités par les voyageurs du monde entier."
      ]
    },
    {
      "heading": "Stratégies de Promotion de l'ONMT et Diversification de l'Offre Touristique",
      "paragraphs": [
        "Plusieurs facteurs convergents expliquent cette croissance impressionnante. L'Office National Marocain du Tourisme (ONMT) joue un rôle prépondérant à travers des campagnes de promotion ciblées sur des marchés émetteurs stratégiques, notamment l'Europe, l'Amérique du Nord et les pays du Golfe. Des initiatives audacieuses comme la campagne \"Light in Action\" visent à positionner le Maroc comme une destination de choix, mettant en avant la diversité de ses expériences : de Marrakech l'impériale et festive à Dakhla la balnéaire et sportive, en passant par les plages d'Agadir, le charme historique de Fès et Meknès, et la beauté bleue de Chefchaouen. Ces campagnes modernes utilisent les leviers du marketing digital et des partenariats stratégiques pour maximiser leur portée.",
        "L'amélioration de la connectivité aérienne est également un moteur essentiel. L'ouverture de nouvelles lignes et l'augmentation des fréquences vers les principaux aéroports marocains, tels que ceux de Casablanca Mohammed V, Marrakech Menara, Agadir Al Massira, et Tanger Ibn Battouta, facilitent considérablement l'accès au Royaume pour les voyageurs internationaux. Ces investissements dans la logistique du transport aérien, souvent en partenariat avec des compagnies aériennes internationales et low-cost, sont cruciaux pour maintenir un flux constant de visiteurs et attirer de nouveaux segments de marché, notamment le tourisme d'affaires et de congrès.",
        "Parallèlement, le Maroc continue d'investir massivement dans le développement et la diversification de ses infrastructures touristiques. De nouveaux complexes hôteliers voient le jour, des riads traditionnels sont restaurés, des sites historiques et archéologiques sont valorisés, et l'offre d'activités et de services s'enrichit constamment. Cette diversification et cette montée en gamme permettent au pays de répondre aux attentes d'une clientèle variée, des touristes de luxe en quête d'expériences exclusives aux voyageurs en quête d'aventures authentiques et de tourisme durable, en passant par les familles et les jeunes. Le développement de l'écotourisme et du tourisme rural est également une priorité."
      ]
    },
    {
      "heading": "Impact Économique et Création d'Emplois : Un Secteur Vital",
      "paragraphs": [
        "Les recettes voyages ne sont pas de simples chiffres ; elles représentent une source vitale de devises étrangères pour le Maroc, contribuant de manière significative à l'équilibre de la balance des paiements et au Produit Intérieur Brut (PIB) national. L'afflux de touristes stimule l'ensemble de l'économie, générant un effet multiplicateur important. Chaque dirham dépensé par un visiteur étranger alimente une chaîne de valeur complexe, depuis les producteurs locaux jusqu'aux prestataires de services.",
        "Un aspect crucial de cette dynamique est la création d'emplois. Le secteur touristique est un pourvoyeur majeur de postes, créant des milliers d'emplois directs et indirects dans l'hôtellerie, la restauration, le transport, l'artisanat, les guides touristiques, les agences de voyages et de nombreux autres secteurs de services. Cette vitalité contribue non seulement à réduire le chômage, mais aussi à développer les compétences locales et à soutenir les petites et moyennes entreprises (PME) qui constituent l'épine dorsale de l'économie marocaine. Le développement de nouvelles zones touristiques contribue également à l'aménagement du territoire et à la réduction des disparités régionales."
      ]
    },
    {
      "heading": "Perspectives Futures : Coupe du Monde 2030 et Opportunités d'Investissement",
      "paragraphs": [
        "À l'horizon, les perspectives pour le tourisme marocain sont plus que prometteuses. L'organisation conjointe de la Coupe du Monde de football 2030 avec l'Espagne et le Portugal représente une opportunité sans précédent. Cet événement planétaire attirera des millions de visiteurs et mettra le Maroc sous les feux des projecteurs internationaux, offrant une plateforme exceptionnelle pour valoriser ses atouts touristiques, culturels et sportifs. Les préparatifs de cet événement stimulent déjà les investissements dans les infrastructures hôtelières, routières et sportives, qui bénéficieront au secteur touristique bien au-delà de 2030.",
        "Dans ce contexte favorable, les opportunités d'investissement dans le secteur touristique marocain sont nombreuses et variées. Qu'il s'agisse de projets hôteliers de grande envergure, d'éco-lodges respectueux de l'environnement, de développement de stations balnéaires intégrées ou de l'expansion de l'offre culturelle et de loisirs, le Royaume offre un cadre attractif pour les investisseurs nationaux et étrangers. Le gouvernement, en collaboration avec l'Office National Marocain du Tourisme et d'autres entités, s'efforce de créer un environnement propice à l'innovation, à la croissance durable et à l'investissement responsable, aligné sur la Vision 2020 et la nouvelle stratégie touristique post-2020.",
        "Le Plan d'Action National pour le Tourisme vise à renforcer la compétitivité de la destination Maroc, en mettant l'accent sur la qualité des services, la durabilité et la digitalisation. L'objectif est de consolider la position du Maroc en tant que leader régional et de diversifier ses marchés sources, tout en valorisant son capital humain. Ces efforts combinés devraient permettre au Royaume de capitaliser pleinement sur son potentiel touristique et de transformer ces recettes records en une croissance économique pérenne et inclusive."
      ]
    }
  ],
  "faq": [
    {
      "question": "Que signifient les recettes voyages pour l'économie marocaine ?",
      "answer": "Les recettes voyages sont les devises étrangères dépensées par les touristes au Maroc. Elles sont cruciales pour la balance des paiements, le PIB, et soutiennent des milliers d'emplois dans l'hôtellerie, l'artisanat, et les services."
    },
    {
      "question": "Quels sont les principaux facteurs de croissance du tourisme au Maroc ?",
      "answer": "La croissance est tirée par les campagnes de promotion de l'ONMT, l'amélioration de la connectivité aérienne, le développement des infrastructures, et l'attractivité culturelle et naturelle du Royaume."
    },
    {
      "question": "Quel est l'impact de la Coupe du Monde 2030 sur le tourisme marocain ?",
      "answer": "La Coupe du Monde 2030 est perçue comme un catalyseur majeur, devant attirer un grand nombre de visiteurs et d'investissements, et renforcer la visibilité internationale du Maroc comme destination touristique."
    },
    {
      "question": "Où peut-on trouver les statistiques officielles sur le tourisme marocain ?",
      "answer": "Les statistiques officielles sont principalement publiées par l'Office des Changes, l'Observatoire du Tourisme, et l'Office National Marocain du Tourisme (ONMT)."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "Recettes Voyages",
    "Office des Changes",
    "ONMT",
    "Investissement Tourisme",
    "Coupe du Monde 2030"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/09/01/tourisme-79-milliards-de-dirhams-de-recettes-voyages-a-fin-juillet_2005048/",
  "dateIso": "2026-09-01T14:34:44.000Z",
  "dateFr": "1 septembre 2026"
}

const newsLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: ARTICLE.title,
  description: ARTICLE.metaDescription,
  datePublished: ARTICLE.dateIso,
  dateModified: ARTICLE.dateIso,
  keywords: ARTICLE.tags.join(", "),
  author: { "@type": "Organization", name: "SiyahaMag" },
  publisher: { "@type": "Organization", name: "SiyahaMag", url: "https://siyahamag.ma" },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-09-01-tourisme-79-milliards-de-dirhams-de-recettes-voyages-a-fin-juillet" },
}

const faqLd = ARTICLE.faq.length
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ARTICLE.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }
  : null

export default function NewsArticlePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JsonLd data={newsLd} />
      {faqLd && <JsonLd data={faqLd} />}
      <Breadcrumbs segments={[{ label: "Actualités", href: "/actualites" }, { label: ARTICLE.title }]} />

      <article className="mt-6 space-y-6">
        <header className="space-y-4">
          <Badge className="bg-ocean-50 text-ocean border-0">Actualité tourisme</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {ARTICLE.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {ARTICLE.dateFr}
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">{ARTICLE.intro}</p>
          {ARTICLE.sections.map((section, i) => (
            <section key={i} className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-foreground/90 leading-relaxed mb-4">{p}</p>
              ))}
            </section>
          ))}
        </div>

        {ARTICLE.faq.length > 0 && (
          <section className="border-t border-border pt-6 mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions fréquentes</h2>
            <div className="space-y-4">
              {ARTICLE.faq.map((f, i) => (
                <details key={i} className="rounded-lg border border-border p-4">
                  <summary className="font-semibold cursor-pointer text-foreground">{f.question}</summary>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-border pt-6 mt-8">
          <h2 className="text-xl font-bold text-foreground mb-3">À découvrir aussi sur SiyahaMag</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><Link href="/emplois" className="text-ocean hover:underline">Offres d&apos;emploi tourisme &amp; hôtellerie au Maroc</Link></li>
            <li><Link href="/investissement" className="text-ocean hover:underline">Opportunités d&apos;investissement touristique</Link></li>
            <li><Link href="/statistiques" className="text-ocean hover:underline">Statistiques du tourisme marocain</Link></li>
            <li><Link href="/guide/emploi-tourisme-maroc" className="text-ocean hover:underline">Guide : emploi dans le tourisme au Maroc</Link></li>
          </ul>
        </section>

        {ARTICLE.sourceUrl && (
          <div className="border-t border-border pt-6 text-sm text-muted-foreground">
            D&apos;après une actualité de{" "}
            <a href={ARTICLE.sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              {ARTICLE.source}
            </a>
            .
          </div>
        )}

        <div className="border-t border-border pt-6 mt-4">
          <Link href="/actualites" className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean">
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </article>
    </div>
  )
}
