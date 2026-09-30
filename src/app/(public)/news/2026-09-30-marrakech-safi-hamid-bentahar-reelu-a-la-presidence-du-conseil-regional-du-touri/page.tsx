import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Hamid Bentahar Réélu à la Tête du CRT Marrakech-Safi | SiyahaMag",
  description: "Hamid Bentahar reconduit à la présidence du CRT Marrakech-Safi pour un nouveau mandat. Découvrez les enjeux de cette réélection pour le tourisme régional.",
  keywords: ["Tourisme Maroc","Marrakech","CRT Marrakech-Safi","Hamid Bentahar","Développement touristique","Investissement hôtelier"],
  alternates: { canonical: "/news/2026-09-30-marrakech-safi-hamid-bentahar-reelu-a-la-presidence-du-conseil-regional-du-touri" },
  openGraph: {
    title: "Hamid Bentahar Réélu à la Tête du CRT Marrakech-Safi",
    description: "Hamid Bentahar reconduit à la présidence du CRT Marrakech-Safi pour un nouveau mandat. Découvrez les enjeux de cette réélection pour le tourisme régional.",
    type: "article",
    publishedTime: "2026-09-30T11:06:08.000Z",
  },
}

const ARTICLE = {
  "title": "Hamid Bentahar Réélu à la Tête du CRT Marrakech-Safi",
  "metaDescription": "Hamid Bentahar reconduit à la présidence du CRT Marrakech-Safi pour un nouveau mandat. Découvrez les enjeux de cette réélection pour le tourisme régional.",
  "intro": "Le Conseil Régional du Tourisme (CRT) Marrakech-Safi a récemment confirmé Hamid Bentahar à sa présidence pour un nouveau mandat. Cette décision, prise à l'issue de l'Assemblée Générale Ordinaire élective, marque une volonté affirmée de continuité dans la stratégie de développement touristique de cette destination emblématique. Elle témoigne de la confiance placée en sa vision pour dynamiser la promotion et l'expansion du secteur dans la région, en étroite collaboration avec les acteurs locaux et nationaux.",
  "sections": [
    {
      "heading": "Une Réélection Stratégique pour le Tourisme de Marrakech-Safi",
      "paragraphs": [
        "La reconduction d'Hamid Bentahar à la tête du Conseil Régional du Tourisme (CRT) Marrakech-Safi n'est pas qu'une simple formalité administrative ; elle incarne une orientation stratégique claire pour l'avenir du tourisme dans l'une des régions les plus vitales du Maroc. Cette décision consensuelle reflète une volonté collective des professionnels, des élus et des institutionnels de maintenir une dynamique proactive et ambitieuse. Elle vise à consolider les acquis, à innover et à relever les défis complexes que présente le marché touristique mondial, en s'appuyant sur une expertise reconnue et une connaissance approfondie des spécificités de la destination.",
        "Marrakech, en tant que locomotive du tourisme national, et la région de Safi, avec son potentiel balnéaire et culturel, constituent un pôle d'attraction majeur. La stabilité à la tête du CRT est perçue comme un atout essentiel pour la mise en œuvre de stratégies à long terme, notamment en matière de promotion ciblée, de diversification des offres et d'amélioration continue de l'expérience client. Ce nouveau mandat s'inscrit dans un contexte où le tourisme marocain se redresse avec vigueur et se prépare à des échéances majeures, telles que la Coupe du Monde de football 2030, où Marrakech jouera un rôle central."
      ]
    },
    {
      "heading": "Les Priorités du Nouveau Mandat : Innovation et Développement Durable",
      "paragraphs": [
        "Sous l'impulsion de Hamid Bentahar, le CRT Marrakech-Safi devrait s'atteler à des chantiers prioritaires axés sur l'innovation et le développement durable. La diversification de l'offre touristique est cruciale, allant au-delà du tourisme culturel et de loisirs traditionnel pour explorer des créneaux comme l'écotourisme, le tourisme sportif, le bien-être ou encore le tourisme d'affaires et de congrès (MICE). Cela implique de développer de nouvelles infrastructures, de moderniser les services existants et de s'adapter aux attentes d'une clientèle internationale de plus en plus exigeante et soucieuse de l'impact environnemental et social de ses voyages.",
        "La promotion digitale et l'exploitation des nouvelles technologies seront également au cœur de la stratégie. L'Office National Marocain du Tourisme (ONMT) a déjà initié une transformation numérique d'envergure, et le CRT Marrakech-Safi est appelé à s'inscrire pleinement dans cette démarche. L'objectif est de renforcer la visibilité de la destination sur les marchés émetteurs clés, de cibler de nouveaux segments et d'offrir des parcours clients fluides et personnalisés. Parallèlement, la formation et la valorisation des ressources humaines dans le secteur de l'hôtellerie et de la restauration resteront des axes fondamentaux pour garantir un service de qualité et soutenir la croissance de l'emploi local."
      ]
    },
    {
      "heading": "Synergies et Partenariats : Clés de la Réussite Régionale",
      "paragraphs": [
        "Le succès du tourisme dans la région Marrakech-Safi repose intrinsèquement sur la force des synergies et des partenariats entre les différentes parties prenantes. La réélection de Hamid Bentahar s'accompagne d'une volonté de renforcer la collaboration avec les autorités locales, les collectivités territoriales, l'ONMT, le Ministère du Tourisme, de l'Artisanat et de l'Économie Sociale et Solidaire, ainsi qu'avec les investisseurs privés et les professionnels du secteur. Cette approche collaborative est essentielle pour aligner les stratégies, mutualiser les ressources et maximiser l'impact des initiatives de développement et de promotion. Les projets d'investissement dans l'hôtellerie et les infrastructures touristiques, par exemple, nécessitent une coordination étroite pour assurer leur pertinence et leur rentabilité.",
        "Dans la perspective de la Coupe du Monde 2030, la région de Marrakech-Safi est appelée à jouer un rôle prépondérant. Cette échéance représente une opportunité sans précédent pour attirer des investissements massifs, moderniser ses infrastructures d'accueil et de transport, et renforcer sa capacité hôtelière. Le CRT, sous la direction de M. Bentahar, sera un acteur clé dans la préparation de cet événement mondial, en veillant à ce que la destination soit prête à accueillir des millions de visiteurs, tout en laissant un héritage durable en termes de développement économique et social pour les populations locales. L'emploi dans le secteur hôtelier et de la restauration est directement lié à ces dynamiques d'investissement et de promotion, offrant des perspectives significatives pour la jeunesse marocaine."
      ]
    },
    {
      "heading": "Perspectives d'Avenir et Ambition pour la Destination Marrakech-Safi",
      "paragraphs": [
        "Le nouveau mandat d'Hamid Bentahar à la tête du CRT Marrakech-Safi s'inscrit dans une période de forte croissance et de transformation pour le tourisme marocain. L'ambition est claire : positionner Marrakech-Safi comme une destination de référence mondiale, non seulement pour son patrimoine historique et culturel, mais aussi pour son offre diversifiée, son engagement en faveur du tourisme durable et son hospitalité légendaire. Cela passe par une amélioration continue de la qualité des services, une gestion optimisée des flux touristiques et une valorisation authentique des richesses locales, qu'elles soient urbaines, rurales ou côtières.",
        "Le CRT, en lien avec la vision nationale, œuvrera à attirer de nouveaux marchés émetteurs, notamment asiatiques et américains, tout en consolidant sa présence sur les marchés européens traditionnels. L'objectif est de dépasser les performances pré-pandémiques et de contribuer de manière significative aux objectifs nationaux en matière d'arrivées touristiques et de recettes. Le développement de nouvelles expériences, l'intégration des technologies intelligentes dans la gestion de la destination et la promotion d'un tourisme inclusif qui bénéficie à toutes les strates de la société marocaine, seront les piliers de cette stratégie ambitieuse pour les années à venir."
      ]
    }
  ],
  "faq": [
    {
      "question": "Quel est le rôle principal du Conseil Régional du Tourisme (CRT) Marrakech-Safi ?",
      "answer": "Le CRT Marrakech-Safi a pour mission principale de promouvoir et de développer l'activité touristique dans la région. Cela inclut l'élaboration de stratégies de marketing, la participation à des salons internationaux, la diversification de l'offre touristique, la collaboration avec les professionnels du secteur et les autorités publiques pour améliorer l'attractivité de la destination et attirer les investissements."
    },
    {
      "question": "Pourquoi la réélection de Hamid Bentahar est-elle importante pour le tourisme marocain ?",
      "answer": "La réélection de Hamid Bentahar, figure reconnue du secteur, assure une continuité et une stabilité à la tête d'un CRT majeur. C'est un signal positif pour les investisseurs et les partenaires, garantissant la poursuite des stratégies de développement et de promotion dans une région clé du tourisme marocain, essentielle pour atteindre les objectifs nationaux, notamment en vue de la Coupe du Monde 2030."
    },
    {
      "question": "Quels sont les défis majeurs pour le tourisme dans la région Marrakech-Safi ?",
      "answer": "Les défis incluent la diversification de l'offre pour attirer de nouveaux segments de clientèle, le renforcement de la promotion digitale, l'amélioration continue de la qualité des services, la gestion durable des ressources touristiques face au changement climatique et l'augmentation de la capacité d'accueil en prévision des grands événements comme la Coupe du Monde 2030, tout en assurant une répartition équitable des bénéfices économiques."
    },
    {
      "question": "Comment le CRT Marrakech-Safi contribue-t-il à l'emploi local dans le tourisme ?",
      "answer": "En stimulant le développement touristique, le CRT favorise la création d'emplois directs et indirects dans l'hôtellerie, la restauration, le transport, l'artisanat et les services. Il travaille également à renforcer la formation professionnelle pour améliorer les compétences de la main-d'œuvre locale et s'assurer qu'elle réponde aux besoins du secteur en pleine croissance."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "Marrakech",
    "CRT Marrakech-Safi",
    "Hamid Bentahar",
    "Développement touristique",
    "Investissement hôtelier"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/09/30/marrakech-safi-hamid-bentahar-reelu-a-la-presidence-du-conseil-regional-du-tourisme_2010591/",
  "dateIso": "2026-09-30T11:06:08.000Z",
  "dateFr": "30 septembre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-09-30-marrakech-safi-hamid-bentahar-reelu-a-la-presidence-du-conseil-regional-du-touri" },
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
