import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "La SMIT Revitalise 4 Kasbahs en Joyaux Hôteliers du Maroc | SiyahaMag",
  description: "Découvrez comment la SMIT transforme quatre kasbahs historiques en établissements hôteliers classés. Une initiative clé pour le tourisme durable et la valo",
  keywords: ["SMIT","Tourisme Maroc","Kasbahs","Hôtellerie Patrimoniale","Investissement Touristique","Développement Durable"],
  alternates: { canonical: "/news/2026-07-29-la-smit-prepare-la-reconversion-de-quatre-kasbahs-en-etablissements-hoteliers" },
  openGraph: {
    title: "La SMIT Revitalise 4 Kasbahs en Joyaux Hôteliers du Maroc",
    description: "Découvrez comment la SMIT transforme quatre kasbahs historiques en établissements hôteliers classés. Une initiative clé pour le tourisme durable et la valo",
    type: "article",
    publishedTime: "2026-07-29T16:40:54.000Z",
  },
}

const ARTICLE = {
  "title": "La SMIT Revitalise 4 Kasbahs en Joyaux Hôteliers du Maroc",
  "metaDescription": "Découvrez comment la SMIT transforme quatre kasbahs historiques en établissements hôteliers classés. Une initiative clé pour le tourisme durable et la valo",
  "intro": "La Société Marocaine d'Ingénierie Touristique (SMIT) s'engage activement dans un projet ambitieux de reconversion. Quatre kasbahs emblématiques du royaume sont destinées à devenir de nouveaux pôles d'hébergement touristique classés, marquant une étape importante dans la valorisation du patrimoine national. Cette initiative stratégique vise à enrichir l'offre touristique marocaine tout en promouvant un développement local durable. L'accompagnement juridique pour la négociation et la mise en place des contrats de gestion est actuellement en cours, signalant une avancée concrète dans la concrétisation de ces transformations.",
  "sections": [
    {
      "heading": "Le Rôle Stratégique de la SMIT dans la Valorisation du Patrimoine Marocain",
      "paragraphs": [
        "La Société Marocaine d'Ingénierie Touristique (SMIT) est un acteur central dans l'élaboration et la mise en œuvre des stratégies de développement touristique du Maroc. Sa mission principale consiste à identifier, développer et promouvoir les opportunités d'investissement dans le secteur, tout en veillant à la diversification et à la modernisation de l'offre touristique nationale. Dans cette optique, la valorisation du patrimoine culturel et historique constitue un axe majeur, permettant non seulement de préserver des trésors architecturaux, mais aussi de les intégrer de manière durable dans le circuit touristique.",
        "Le projet de reconversion de ces quatre kasbahs s'inscrit parfaitement dans cette vision. Les kasbahs, symboles de l'architecture traditionnelle marocaine et témoins d'une histoire riche, sont des atouts inestimables pour le tourisme culturel. En les transformant en établissements hôteliers classés, la SMIT ne se contente pas de rénover des bâtisses; elle insuffle une nouvelle vie à des pans entiers de l'héritage marocain, les rendant accessibles aux visiteurs et générant une valeur ajoutée économique pour les régions concernées. C'est une démarche qui réconcilie conservation patrimoniale et dynamique économique, essentielle pour un tourisme inclusif et respectueux de son environnement."
      ]
    },
    {
      "heading": "Des Kasbahs Historiques Transformées en Établissements Hôteliers de Charme",
      "paragraphs": [
        "Le cœur de ce projet réside dans la transformation de quatre kasbahs en établissements d'hébergement touristique classés. Ce processus implique une ingénierie complexe, allant de la restauration architecturale respectueuse de l'authenticité des lieux à l'intégration des standards modernes d'hôtellerie. L'accompagnement juridique que la SMIT est en train de mettre en place est crucial pour sécuriser les négociations et formaliser les contrats de gestion. Ces contrats sont la clé de voûte pour garantir une exploitation professionnelle et durable des futures unités hôtelières, assurant ainsi une expérience client de qualité supérieure.",
        "La classification de ces établissements est un gage de qualité et de conformité aux normes internationales de l'hôtellerie, tout en préservant le caractère unique et l'âme de chaque kasbah. Il ne s'agit pas de créer des hôtels génériques, mais bien des lieux de séjour authentiques offrant une immersion profonde dans la culture et le mode de vie marocains. Ces futures adresses de charme, souvent situées dans des régions à fort potentiel touristique mais moins développées, comme le sud-est marocain (régions de Ouarzazate, Drâa-Tafilalet), promettent une expérience unique, loin des sentiers battus, et contribuent à diversifier l'offre d'hébergement au-delà des grandes villes impériales ou des destinations côtières classiques."
      ]
    },
    {
      "heading": "Un Levier pour le Tourisme Durable et le Développement Régional",
      "paragraphs": [
        "L'impact de ce projet dépasse largement le cadre de la simple création d'hôtels. Il s'agit d'un véritable levier pour le tourisme durable et le développement socio-économique des régions où ces kasbahs sont implantées. En effet, la réhabilitation et l'exploitation de ces structures généreront des emplois directs (personnel hôtelier, guides, artisans) et indirects (fournisseurs locaux, agriculteurs, transporteurs). Cette dynamique économique est essentielle pour fixer les populations locales, lutter contre l'exode rural et créer de nouvelles opportunités pour la jeunesse.",
        "De plus, en attirant des touristes vers ces destinations patrimoniales, le projet contribue à désengorger les zones touristiques traditionnelles et à répartir plus équitablement les retombées économiques du tourisme sur l'ensemble du territoire. L'Office National Marocain du Tourisme (ONMT) œuvre activement pour la promotion de ces nouvelles routes culturelles et expérientielles, mettant en lumière la richesse et la diversité des paysages et des cultures marocaines. L'intégration de ces kasbahs dans l'offre touristique nationale renforce l'image du Maroc en tant que destination authentique et engagée dans la préservation de son héritage."
      ]
    },
    {
      "heading": "Opportunités d'Investissement et Perspectives d'Avenir pour le Secteur Hôtelier Marocain",
      "paragraphs": [
        "Ce projet de la SMIT ouvre de nouvelles perspectives pour l'investissement touristique au Maroc. Il démontre la viabilité et le potentiel de rentabilité des projets de reconversion de patrimoine, encourageant ainsi d'autres investisseurs, nationaux et internationaux, à s'intéresser à des initiatives similaires. Le modèle de partenariat public-privé, souvent privilégié dans ce type de projet, permet de mutualiser les risques et d'optimiser les ressources, tout en garantissant une gestion professionnelle et une valorisation à long terme des biens.",
        "À l'approche d'événements majeurs comme la Coupe du Monde 2030, co-organisée par le Maroc, la diversification et la modernisation de l'offre d'hébergement deviennent encore plus cruciales. Les kasbahs reconverties enrichiront la capacité d'accueil du pays avec des options uniques, répondant à une demande croissante pour des expériences de voyage plus authentiques et respectueuses de l'environnement. Ces initiatives posent les jalons d'un tourisme marocain résilient, innovant et profondément ancré dans son identité culturelle, prêt à accueillir le monde et à offrir des séjours mémorables."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qu'est-ce que la SMIT et quel est son rôle principal dans le tourisme marocain?",
      "answer": "La SMIT, ou Société Marocaine d'Ingénierie Touristique, est l'opérateur de l'État chargé de la mise en œuvre de la stratégie de développement touristique du Maroc. Son rôle principal est d'identifier, de développer et de promouvoir les opportunités d'investissement dans le secteur touristique, en veillant à la diversification de l'offre et à la modernisation des infrastructures, tout en valorisant le patrimoine national."
    },
    {
      "question": "Pourquoi le choix des kasbahs pour cette reconversion hôtelière?",
      "answer": "Les kasbahs sont choisies pour leur valeur architecturale et historique exceptionnelle, représentant un patrimoine culturel unique au Maroc. Leur reconversion en établissements hôteliers classés permet de les préserver, de les rendre accessibles aux touristes et de créer une offre d'hébergement authentique et expérientielle, contribuant ainsi à la diversification de l'offre touristique et au développement économique des régions où elles sont situées."
    },
    {
      "question": "Quels sont les avantages de ces projets pour les régions marocaines concernées?",
      "answer": "Ces projets apportent de multiples avantages aux régions concernées, notamment la création d'emplois directs et indirects pour les populations locales, le développement économique grâce à l'afflux de touristes et la consommation de produits locaux, et la valorisation du patrimoine culturel et architectural de la région. Ils contribuent également à un tourisme plus durable et équitablement réparti sur le territoire."
    },
    {
      "question": "Comment ces kasbahs hôtelières se distingueront-elles des autres offres d'hébergement au Maroc?",
      "answer": "Ces kasbahs hôtelières se distingueront par leur caractère authentique et leur immersion culturelle profonde. Elles offriront une expérience de séjour unique, mêlant confort moderne et respect de l'architecture traditionnelle, de l'histoire et de la culture locale. Elles proposeront une alternative aux hôtels plus conventionnels, ciblant les voyageurs en quête d'expériences originales et de découvertes patrimoniales."
    }
  ],
  "tags": [
    "SMIT",
    "Tourisme Maroc",
    "Kasbahs",
    "Hôtellerie Patrimoniale",
    "Investissement Touristique",
    "Développement Durable"
  ],
  "source": "Medias24",
  "sourceUrl": "https://medias24.com/2026/07/29/la-smit-prepare-la-reconversion-de-quatre-kasbahs-en-etablissements-hoteliers-1733111/",
  "dateIso": "2026-07-29T16:40:54.000Z",
  "dateFr": "29 juillet 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-07-29-la-smit-prepare-la-reconversion-de-quatre-kasbahs-en-etablissements-hoteliers" },
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
