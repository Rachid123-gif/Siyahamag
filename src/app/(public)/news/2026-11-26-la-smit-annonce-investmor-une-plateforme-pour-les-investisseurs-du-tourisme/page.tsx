import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "InvestMOR : La SMIT lance une plateforme clé pour l'investissement touristique au Maroc | SiyahaMag",
  description: "Découvrez InvestMOR, la nouvelle plateforme digitale de la SMIT pour faciliter l'investissement touristique au Maroc. Repérez des sites, évaluez le potenti",
  keywords: ["Investissement touristique Maroc","SMIT","InvestMOR","Développement touristique","Hôtellerie Maroc","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-11-26-la-smit-annonce-investmor-une-plateforme-pour-les-investisseurs-du-tourisme" },
  openGraph: {
    title: "InvestMOR : La SMIT lance une plateforme clé pour l'investissement touristique au Maroc",
    description: "Découvrez InvestMOR, la nouvelle plateforme digitale de la SMIT pour faciliter l'investissement touristique au Maroc. Repérez des sites, évaluez le potenti",
    type: "article",
    publishedTime: "2026-11-26T16:30:44.000Z",
  },
}

const ARTICLE = {
  "title": "InvestMOR : La SMIT lance une plateforme clé pour l'investissement touristique au Maroc",
  "metaDescription": "Découvrez InvestMOR, la nouvelle plateforme digitale de la SMIT pour faciliter l'investissement touristique au Maroc. Repérez des sites, évaluez le potenti",
  "intro": "La Société Marocaine d'Ingénierie Touristique (SMIT) vient de franchir une étape majeure dans la promotion de l'investissement touristique au Royaume avec le lancement officiel d'InvestMOR. Présentée lors du Morocco Showcase Summit à Casablanca, cette plateforme numérique est conçue pour simplifier et accélérer le processus de développement de projets touristiques. Elle offre aux investisseurs, tant nationaux qu'internationaux, un outil centralisé pour identifier des opportunités, évaluer leur potentiel et nouer des partenariats stratégiques, marquant ainsi une nouvelle ère pour l'attractivité du secteur.",
  "sections": [
    {
      "heading": "InvestMOR, un catalyseur numérique pour l'investissement touristique",
      "paragraphs": [
        "Le lancement d'InvestMOR par la SMIT représente une avancée significative pour le paysage de l'investissement touristique marocain. Cette plateforme digitale se positionne comme un guichet unique, offrant une panoplie de services essentiels aux acteurs désireux de s'engager dans le développement touristique du pays. L'objectif principal est de dématérialiser et d'optimiser les premières étapes cruciales de tout projet : l'identification de terrains ou de sites propices, l'analyse approfondie de leur potentiel de rentabilité et la mise en relation avec des partenaires fiables et complémentaires.",
        "En centralisant ces informations et ces fonctionnalités, InvestMOR vise à lever les obstacles traditionnels liés à la recherche d'opportunités et à la coordination des différents intervenants. La plateforme est pensée pour apporter une transparence accrue et une efficacité opérationnelle, permettant aux investisseurs de gagner un temps précieux et de prendre des décisions éclairées. Elle s'inscrit pleinement dans la stratégie nationale de digitalisation des services publics et d'amélioration du climat des affaires, renforçant la position du Maroc en tant que destination privilégiée pour l'investissement.",
        "Cette initiative est d'autant plus pertinente que le secteur touristique marocain connaît une dynamique de croissance soutenue, portée par une politique volontariste et des infrastructures en constante amélioration. InvestMOR arrive à point nommé pour capitaliser sur cet élan, en offrant un cadre structuré et moderne pour transformer les intentions d'investissement en réalisations concrètes, contribuant ainsi à la création de valeur et d'emplois dans les différentes régions du Royaume."
      ]
    },
    {
      "heading": "La SMIT au cœur de la stratégie de développement touristique marocain",
      "paragraphs": [
        "La Société Marocaine d'Ingénierie Touristique (SMIT) joue un rôle pivot dans la mise en œuvre de la stratégie touristique du Maroc. En tant que bras armé de l'État pour le développement et la promotion de l'investissement dans le secteur, la SMIT est chargée d'identifier les zones à fort potentiel, de structurer l'offre touristique et d'attirer les capitaux nécessaires à la réalisation de projets d'envergure. La création d'InvestMOR s'inscrit directement dans cette mission stratégique, démontrant la capacité de la SMIT à innover et à s'adapter aux exigences d'un marché mondialisé.",
        "Sous la direction d'Imad Barrakad, la SMIT a constamment cherché à moderniser ses outils et ses approches pour maximiser l'attractivité du Maroc. La digitalisation des processus d'investissement, à travers InvestMOR, est une réponse directe aux attentes des investisseurs modernes qui recherchent rapidité, clarté et accessibilité. Cette plateforme est le reflet d'une vision qui intègre la technologie comme un levier essentiel pour démultiplier les opportunités et faciliter les transactions. Elle complète les efforts de l'Office National Marocain du Tourisme (ONMT) qui, de son côté, œuvre à la promotion de la destination Maroc à l'échelle internationale, créant un écosystème favorable à l'ensemble de la chaîne de valeur touristique.",
        "L'impact de telles initiatives dépasse le simple cadre de l'investissement. En facilitant la concrétisation de nouveaux projets hôteliers, de resorts, d'infrastructures de loisirs ou d'éco-tourisme, la SMIT contribue directement à la diversification de l'offre touristique marocaine et à la création d'emplois qualifiés. Ces investissements sont cruciaux pour le développement économique régional, notamment dans les villes émergentes ou les zones rurales à fort potentiel, et pour la préparation du Maroc aux grands événements internationaux, à l'instar de la Coupe du Monde 2030, qui nécessitera des infrastructures touristiques de pointe."
      ]
    },
    {
      "heading": "Fonctionnalités et avantages d'InvestMOR pour les investisseurs",
      "paragraphs": [
        "InvestMOR est conçue pour être une interface intuitive et complète, guidant l'investisseur à travers les différentes étapes de son projet. La plateforme met à disposition une base de données exhaustive de sites d'investissement potentiels, qu'il s'agisse de terrains vierges, de propriétés existantes à rénover ou de projets clés en main. Chaque fiche de site est enrichie d'informations détaillées, incluant les caractéristiques géographiques, les régulations urbanistiques, les études de marché préliminaires et les projections de rentabilité, offrant ainsi une vision à 360 degrés de chaque opportunité.",
        "Au-delà de la simple consultation, InvestMOR intègre des outils d'évaluation de potentiel, permettant aux utilisateurs de simuler différents scénarios d'investissement et d'analyser les retours sur investissement attendus. Cette fonctionnalité est cruciale pour la prise de décision, car elle offre une analyse prédictive basée sur des données fiables. La plateforme propose également un mécanisme de mise en relation intelligent, connectant les investisseurs avec des partenaires locaux potentiels, tels que des promoteurs immobiliers, des opérateurs hôteliers, des institutions financières ou des fournisseurs de services, facilitant ainsi la constitution d'équipes projet solides et la structuration de montages financiers innovants.",
        "Les avantages d'InvestMOR sont multiples : gain de temps considérable dans la recherche d'opportunités, réduction des risques grâce à une information centralisée et validée, accès facilité à un réseau de partenaires qualifiés et optimisation des processus administratifs. En définitive, la plateforme vise à démocratiser l'accès à l'investissement touristique au Maroc, rendant le Royaume encore plus attractif pour les capitaux étrangers et nationaux, et accélérant la réalisation des ambitions du secteur."
      ]
    },
    {
      "heading": "Investissement touristique et vision 2030 : Le Maroc en pleine mutation",
      "paragraphs": [
        "L'introduction d'InvestMOR s'inscrit dans une vision plus large du Maroc pour son secteur touristique, notamment en prévision de la Coupe du Monde 2030 que le Royaume co-organisera. Cet événement majeur, couplé à la Vision 2030 du tourisme, nécessite un développement massif et intelligent des infrastructures et des services touristiques. L'investissement est le moteur de cette transformation, et des outils comme InvestMOR sont essentiels pour canaliser et optimiser les flux de capitaux vers les projets les plus stratégiques et les plus prometteurs.",
        "Le Maroc s'est fixé des objectifs ambitieux en termes d'arrivées touristiques et de recettes, visant à doubler sa capacité d'accueil et à diversifier son offre au-delà des destinations traditionnelles. Cela implique non seulement des investissements dans l'hôtellerie de luxe et les grands resorts, mais aussi dans l'éco-tourisme, le tourisme culturel, le tourisme d'affaires et les niches innovantes. InvestMOR, par sa capacité à présenter une gamme variée d'opportunités, devient un levier pour cette diversification, encourageant les investisseurs à explorer de nouvelles régions et de nouveaux segments de marché.",
        "En renforçant l'attractivité du Maroc pour les investissements, la plateforme contribue également à la création d'un écosystème touristique plus résilient et plus compétitif. Les retombées attendues sont significatives en termes d'emploi, de transfert de compétences et de développement des chaînes de valeur locales. La SMIT, à travers InvestMOR, réaffirme son engagement à faire du Maroc une terre d'opportunités pour l'investissement touristique, préparant le terrain pour une croissance durable et inclusive du secteur."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qu'est-ce que la SMIT et quel est son rôle dans le tourisme marocain ?",
      "answer": "La Société Marocaine d'Ingénierie Touristique (SMIT) est l'institution publique chargée du développement de l'investissement touristique au Maroc. Son rôle est de concevoir et de mettre en œuvre la stratégie d'investissement, d'identifier les zones à potentiel, de structurer l'offre touristique et d'attirer les capitaux nationaux et étrangers pour la réalisation de projets touristiques."
    },
    {
      "question": "Qui peut utiliser la plateforme InvestMOR ?",
      "answer": "InvestMOR est ouverte à tous les investisseurs, qu'ils soient nationaux ou internationaux, désireux de développer des projets touristiques au Maroc. Cela inclut les groupes hôteliers, les promoteurs immobiliers, les fonds d'investissement, les opérateurs de loisirs, ainsi que les entrepreneurs individuels."
    },
    {
      "question": "Comment InvestMOR facilite-t-elle la recherche de partenaires ?",
      "answer": "La plateforme InvestMOR intègre un mécanisme de mise en relation. Elle permet aux investisseurs de trouver des partenaires potentiels (promoteurs, opérateurs, financiers, etc.) en fonction des besoins spécifiques de leurs projets, facilitant ainsi la constitution d'équipes et de montages financiers solides."
    },
    {
      "question": "Quel est l'impact attendu d'InvestMOR sur l'emploi au Maroc ?",
      "answer": "En facilitant et en accélérant la concrétisation de nouveaux projets touristiques, InvestMOR devrait indirectement stimuler la création d'emplois directs et indirects dans le secteur de l'hôtellerie, de la restauration, des loisirs, des services et de la construction. Chaque investissement touristique génère une chaîne de valeur importante en termes d'opportunités professionnelles."
    }
  ],
  "tags": [
    "Investissement touristique Maroc",
    "SMIT",
    "InvestMOR",
    "Développement touristique",
    "Hôtellerie Maroc",
    "Coupe du Monde 2030"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/11/26/la-smit-annonce-investmor-une-plateforme-pour-les-investisseurs-du-tourisme_2020059/",
  "dateIso": "2026-11-26T16:30:44.000Z",
  "dateFr": "26 novembre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-11-26-la-smit-annonce-investmor-une-plateforme-pour-les-investisseurs-du-tourisme" },
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
