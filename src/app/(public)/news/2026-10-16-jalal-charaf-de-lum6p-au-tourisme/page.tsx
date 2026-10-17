import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Jalal Charaf au Tourisme : Une Expertise Variée pour le Secteur | SiyahaMag",
  description: "Découvrez l'arrivée de Jalal Charaf, ancien de l'UM6P et de la CGEM, à la tête du ministère du Tourisme, de l'Artisanat et de l'Économie Solidaire au Maroc",
  keywords: ["Jalal Charaf","Tourisme Maroc","Ministère Tourisme","UM6P","CGEM","Artisanat","Économie Solidaire","Investissement Tourisme","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-10-16-jalal-charaf-de-lum6p-au-tourisme" },
  openGraph: {
    title: "Jalal Charaf au Tourisme : Une Expertise Variée pour le Secteur",
    description: "Découvrez l'arrivée de Jalal Charaf, ancien de l'UM6P et de la CGEM, à la tête du ministère du Tourisme, de l'Artisanat et de l'Économie Solidaire au Maroc",
    type: "article",
    publishedTime: "2026-10-16T20:00:07.000Z",
  },
}

const ARTICLE = {
  "title": "Jalal Charaf au Tourisme : Une Expertise Variée pour le Secteur",
  "metaDescription": "Découvrez l'arrivée de Jalal Charaf, ancien de l'UM6P et de la CGEM, à la tête du ministère du Tourisme, de l'Artisanat et de l'Économie Solidaire au Maroc",
  "intro": "Le secteur touristique marocain, pilier essentiel de l'économie nationale, accueille un nouveau visage à sa tête. Jalal Charaf a été nommé ministre du Tourisme, de l'Artisanat et de l'Économie Solidaire, apportant avec lui un profil managérial riche et diversifié. Cette nomination intervient à un moment charnière pour le tourisme marocain, confronté à des défis de taille mais aussi à des opportunités sans précédent. Son parcours, jalonné par des expériences au sein d'institutions clés du pays, suggère une approche pragmatique et stratégique pour dynamiser ces domaines cruciaux.",
  "sections": [
    {
      "heading": "Un Parcours Professionnel Éclectique au Service du Développement",
      "paragraphs": [
        "Jalal Charaf se distingue par une trajectoire professionnelle qui traverse plusieurs sphères de l'économie marocaine, de l'entreprise privée au patronat, en passant par l'enseignement supérieur et la formation. Avant de prendre les rênes du ministère du Tourisme, de l'Artisanat et de l'Économie Solidaire, il a occupé des postes stratégiques qui lui ont permis d'acquérir une compréhension approfondie des mécanismes économiques et sociaux du royaume. Son passage par l'Université Mohammed VI Polytechnique (UM6P), en tant qu'ancien cadre dirigeant, témoigne de son engagement dans l'innovation et le développement du capital humain, des atouts précieux pour un secteur comme le tourisme qui mise sur la qualité des services et la compétitivité.",
        "Son expérience en tant que directeur général délégué de la Confédération Générale des Entreprises du Maroc (CGEM) lui a conféré une connaissance intime des attentes et des contraintes du monde des affaires. Cette perspective patronale est cruciale pour favoriser un environnement propice à l'investissement touristique et à la création d'emplois. De plus, son implication antérieure au sein de l'Office de la Formation Professionnelle et de la Promotion du Travail (OFPPT) et du Groupe OCP, acteur majeur de l'économie marocaine, souligne une expertise dans la gestion de grands projets et la mise en œuvre de politiques de développement des compétences, des éléments fondamentaux pour soutenir la croissance du secteur hôtelier et de la restauration, notamment en vue d'événements majeurs comme la Coupe du Monde 2030.",
        "Ce bagage diversifié positionne Jalal Charaf comme un leader capable de penser stratégiquement et d'agir concrètement, en mobilisant les synergies nécessaires entre les différents acteurs publics et privés. Sa capacité à naviguer entre le monde académique, le secteur privé et les instances de représentation patronale pourrait se traduire par une approche holistique et innovante pour relever les défis complexes du tourisme marocain."
      ]
    },
    {
      "heading": "Les Enjeux Majeurs du Tourisme Marocain sous une Nouvelle Direction",
      "paragraphs": [
        "Le secteur du tourisme au Maroc est en pleine effervescence, porté par une dynamique de croissance et des ambitions fortes. L'arrivée de Jalal Charaf coïncide avec une période où le royaume aspire à consolider sa position de destination touristique mondiale de premier plan. Les objectifs fixés par la Vision 2020, puis les stratégies post-Covid, ont permis de poser les jalons d'un développement durable et inclusif. L'Office National Marocain du Tourisme (ONMT) joue un rôle crucial dans la promotion de la destination, mais le ministère est le garant de la feuille de route stratégique, de la régulation et du soutien à l'investissement.",
        "Parmi les défis majeurs figurent la diversification de l'offre touristique au-delà des destinations traditionnelles comme Marrakech, Agadir et Fès, l'amélioration de la connectivité aérienne, le renforcement de la qualité des infrastructures hôtelières et l'attraction de nouveaux investissements. La Coupe du Monde 2030, que le Maroc co-organisera avec l'Espagne et le Portugal, représente une opportunité historique pour le secteur. Elle exigera des investissements massifs dans les infrastructures d'accueil, les transports et les services, mais aussi une accélération de la formation professionnelle pour répondre à une demande accrue en personnel qualifié dans l'hôtellerie, la restauration et les services annexes. L'expertise de Jalal Charaf en matière de formation et de gestion de grands projets pourrait s'avérer déterminante pour orchestrer ces préparatifs.",
        "Le ministère devra également poursuivre les efforts en matière de tourisme durable et responsable, en intégrant les principes de respect de l'environnement et de valorisation du patrimoine local. La digitalisation des services touristiques, l'expérience client personnalisée et la promotion des nouvelles technologies sont également des axes stratégiques pour maintenir la compétitivité du Maroc sur la scène internationale. La capacité à innover et à s'adapter aux nouvelles tendances de consommation touristique sera essentielle pour atteindre les objectifs ambitieux du royaume en termes de visiteurs et de recettes touristiques."
      ]
    },
    {
      "heading": "Synergies entre Tourisme, Artisanat et Économie Solidaire",
      "paragraphs": [
        "La fusion des portefeuilles du Tourisme, de l'Artisanat et de l'Économie Solidaire sous une même bannière ministérielle n'est pas anodine ; elle reflète une volonté de créer des synergies et de valoriser le potentiel transversal de ces secteurs. L'artisanat marocain, avec sa richesse et sa diversité, est un atout touristique majeur. Il offre aux visiteurs une immersion authentique dans la culture locale et constitue une source de revenus significative pour des milliers de familles. Le défi sera de moderniser la production artisanale, de la promouvoir sur les marchés internationaux et d'assurer une juste rémunération aux artisans, tout en la reliant davantage à l'expérience touristique globale.",
        "L'économie solidaire et sociale, quant à elle, représente un levier puissant pour le développement local et l'inclusion. En intégrant des initiatives telles que le tourisme rural, le tourisme équitable ou les coopératives locales, le ministère peut contribuer à répartir les bénéfices du tourisme de manière plus équitable et à soutenir les communautés régionales. Cette approche permet de créer des circuits touristiques innovants, offrant des expériences uniques et authentiques qui vont au-delà du tourisme de masse. La promotion de l'entrepreneuriat social dans le secteur touristique, notamment pour les jeunes et les femmes, pourrait ouvrir de nouvelles perspectives d'emploi et de développement économique dans les régions moins explorées.",
        "Jalal Charaf, avec son background axé sur le développement économique et la formation, est bien placé pour orchestrer ces synergies. L'objectif est de créer une offre touristique intégrée et différenciée, où l'artisanat est valorisé comme un produit d'excellence et où l'économie solidaire contribue à une expérience touristique plus riche, plus éthique et plus ancrée dans le territoire. Cette vision intégrée est essentielle pour positionner le Maroc comme une destination complète, alliant tradition, modernité et responsabilité sociale."
      ]
    },
    {
      "heading": "Perspectives et Attentes pour le Futur du Secteur",
      "paragraphs": [
        "L'arrivée de Jalal Charaf à la tête du ministère du Tourisme, de l'Artisanat et de l'Économie Solidaire suscite de nombreuses attentes. Son profil de manager expérimenté, doté d'une vision stratégique et d'une connaissance des enjeux de l'entreprise et de la formation, pourrait insuffler une nouvelle dynamique au secteur. Les professionnels du tourisme, les artisans et les acteurs de l'économie solidaire attendent des mesures concrètes pour stimuler la croissance, améliorer la compétitivité et renforcer l'attractivité du Maroc.",
        "Parmi les axes potentiels d'action, on peut anticiper une focalisation sur le développement des compétences et la formation professionnelle, des domaines où son expérience passée sera précieuse. La promotion de l'investissement, tant national qu'international, dans les infrastructures touristiques, les hébergements innovants et les services de haute qualité sera également une priorité. Enfin, la capacité à mobiliser les partenariats public-privé et à créer un cadre réglementaire favorable à l'innovation et à la digitalisation sera déterminante pour l'avenir du tourisme marocain. Le mandat de Jalal Charaf s'inscrit dans une période de transformation profonde, où le Maroc se positionne comme un acteur majeur du tourisme mondial, avec des ambitions claires pour 2030 et au-delà."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qui est Jalal Charaf, le nouveau ministre du Tourisme ?",
      "answer": "Jalal Charaf est le nouveau ministre du Tourisme, de l'Artisanat et de l'Économie Solidaire au Maroc. Il possède une riche expérience managériale, ayant occupé des postes de direction à l'UM6P, à la CGEM, à l'OFPPT et au sein du Groupe OCP, ce qui lui confère une expertise variée en développement économique, formation et gestion d'entreprise."
    },
    {
      "question": "Quel impact son parcours peut-il avoir sur le tourisme marocain ?",
      "answer": "Son parcours diversifié lui apporte une vision stratégique et opérationnelle. Son expérience à l'UM6P et à l'OFPPT pourrait favoriser le développement du capital humain et l'innovation dans le secteur. Sa connaissance du monde des affaires (CGEM, OCP) est un atout pour stimuler l'investissement touristique et renforcer les partenariats public-privé, essentiels notamment pour les préparatifs de la Coupe du Monde 2030."
    },
    {
      "question": "Pourquoi les ministères du Tourisme, de l'Artisanat et de l'Économie Solidaire sont-ils regroupés ?",
      "answer": "Le regroupement de ces portefeuilles vise à créer des synergies fortes. L'artisanat est un pilier de l'attractivité touristique marocaine, et l'économie solidaire permet un développement touristique plus inclusif et local. Cette approche intégrée cherche à valoriser le patrimoine culturel, à diversifier l'offre touristique et à assurer une meilleure répartition des bénéfices du tourisme au profit des populations locales."
    },
    {
      "question": "Quels sont les principaux défis du tourisme marocain pour les années à venir ?",
      "answer": "Les défis majeurs incluent la préparation de la Coupe du Monde 2030 (infrastructures, formation), la diversification de l'offre touristique, la promotion du tourisme durable, l'attraction d'investissements, la digitalisation des services et le renforcement de la compétitivité internationale du Maroc en tant que destination touristique de premier plan."
    }
  ],
  "tags": [
    "Jalal Charaf",
    "Tourisme Maroc",
    "Ministère Tourisme",
    "UM6P",
    "CGEM",
    "Artisanat",
    "Économie Solidaire",
    "Investissement Tourisme",
    "Coupe du Monde 2030"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/2026/10/16/jalal-charaf-de-lum6p-au-tourisme_2013586",
  "dateIso": "2026-10-16T20:00:07.000Z",
  "dateFr": "16 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-16-jalal-charaf-de-lum6p-au-tourisme" },
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
