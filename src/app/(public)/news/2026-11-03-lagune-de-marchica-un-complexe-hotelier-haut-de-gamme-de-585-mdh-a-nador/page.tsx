import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Nador : Un Complexe Hôtelier de Luxe de 585 MDH à Marchica | SiyahaMag",
  description: "Découvrez le nouveau complexe hôtelier haut de gamme de 585 MDH à Marchica, Nador. Un investissement majeur pour l'essor touristique de la région Orientale",
  keywords: ["Marchica","Nador","Tourisme Maroc","Investissement Hôtelier","Marchica Med","Hôtellerie Luxe"],
  alternates: { canonical: "/news/2026-11-03-lagune-de-marchica-un-complexe-hotelier-haut-de-gamme-de-585-mdh-a-nador" },
  openGraph: {
    title: "Nador : Un Complexe Hôtelier de Luxe de 585 MDH à Marchica",
    description: "Découvrez le nouveau complexe hôtelier haut de gamme de 585 MDH à Marchica, Nador. Un investissement majeur pour l'essor touristique de la région Orientale",
    type: "article",
    publishedTime: "2026-11-03T10:56:52.000Z",
  },
}

const ARTICLE = {
  "title": "Nador : Un Complexe Hôtelier de Luxe de 585 MDH à Marchica",
  "metaDescription": "Découvrez le nouveau complexe hôtelier haut de gamme de 585 MDH à Marchica, Nador. Un investissement majeur pour l'essor touristique de la région Orientale",
  "intro": "La lagune de Marchica, joyau naturel de la région de Nador, s'apprête à accueillir un projet hôtelier d'envergure. Marchica Med, entité clé de l'aménagement de ce site exceptionnel, a officialisé le lancement prochain des travaux d'un complexe de luxe, représentant un investissement colossal de plus de 585 millions de dirhams. Cette initiative stratégique vise à consolider la position de Nador comme destination touristique de premier plan et à dynamiser l'économie locale et régionale.",
  "sections": [
    {
      "heading": "Marchica : Un Investissement Hôtelier de 585 MDH pour un Tourisme Haut de Gamme",
      "paragraphs": [
        "L'annonce par Marchica Med, filiale de l'Agence pour l'aménagement du site de la lagune de Marchica, de la construction d'un complexe hôtelier haut de gamme à Nador marque une étape décisive pour le développement touristique de la province. Avec un investissement dépassant les 585 millions de dirhams, ce projet ambitieux est conçu pour répondre aux standards internationaux du luxe et de l'hospitalité. Il s'inscrit parfaitement dans la vision globale de Marchica, qui aspire à devenir une destination méditerranéenne emblématique, alliant nature préservée, infrastructures modernes et services de haute qualité.",
        "Ce futur établissement, dont les travaux débuteront prochainement, est appelé à diversifier l'offre d'hébergement dans la région Orientale, en ciblant une clientèle exigeante, à la recherche d'expériences exclusives. Son positionnement haut de gamme est un atout majeur pour rehausser l'image de Nador sur la carte du tourisme international, attirant des visiteurs à fort pouvoir d'achat et stimulant ainsi les retombées économiques locales. L'intégration harmonieuse du complexe dans le paysage de la lagune de Marchica sera également un élément clé, promettant une expérience immersive entre confort moderne et beauté naturelle."
      ]
    },
    {
      "heading": "La Lagune de Marchica : Un Moteur de Développement Touristique et Économique pour Nador",
      "paragraphs": [
        "Le projet de la lagune de Marchica est bien plus qu'une simple opération d'aménagement ; c'est une véritable stratégie de développement territorial impulsée par l'État marocain. L'Agence pour l'aménagement du site de la lagune de Marchica œuvre depuis plusieurs années à transformer cette zone en un pôle d'attractivité majeur. L'objectif est de créer une ville nouvelle intégrant des zones résidentielles, des infrastructures de loisirs, des ports de plaisance et, bien sûr, une offre hôtelière de qualité. L'arrivée de ce complexe de 585 MDH est une concrétisation de cette vision, renforçant l'attractivité de Nador non seulement pour le tourisme balnéaire mais aussi pour le tourisme d'affaires et de bien-être.",
        "La province de Nador, de par sa position géographique stratégique sur la côte méditerranéenne et sa proximité avec l'Europe, possède un potentiel touristique immense. Le développement de Marchica est un catalyseur pour libérer ce potentiel, en créant des emplois, en attirant des investissements et en améliorant l'infrastructure locale. Ce complexe hôtelier de luxe est un maillon essentiel de cette chaîne de valeur, promettant de générer des centaines de postes, directs et indirects, et de stimuler l'activité pour les fournisseurs locaux, contribuant ainsi significativement à la prospérité de la région Orientale."
      ]
    },
    {
      "heading": "Impact sur l'Emploi, l'Investissement et la Stratégie Touristique Nationale",
      "paragraphs": [
        "L'investissement de 585 millions de dirhams dans ce complexe hôtelier est un signal fort pour le secteur touristique marocain. Il démontre la confiance des investisseurs dans le potentiel de croissance de nouvelles destinations au Maroc, au-delà des pôles traditionnels comme Marrakech, Agadir ou Fès. Ce projet s'aligne parfaitement avec la stratégie nationale du tourisme qui vise à diversifier l'offre, à monter en gamme et à répartir les bénéfices du tourisme sur l'ensemble du territoire. La création d'un établissement de cette envergure aura un impact direct sur l'emploi, nécessitant des compétences variées, de l'hôtellerie-restauration à la gestion, en passant par les services et la maintenance.",
        "Pour l'Office National Marocain du Tourisme (ONMT), l'émergence de destinations comme Nador et le développement de projets structurants à Marchica offrent de nouvelles opportunités de promotion. L'ONMT pourra capitaliser sur cette offre haut de gamme pour attirer de nouveaux marchés et renforcer l'image du Maroc comme destination sûre, moderne et diversifiée. À l'approche d'événements majeurs comme la Coupe du Monde 2030, co-organisée par le Maroc, l'Espagne et le Portugal, l'amélioration et la diversification des infrastructures hôtelières sont cruciales pour accueillir des millions de visiteurs dans les meilleures conditions et garantir une expérience mémorable, même si Nador n'est pas une ville hôte directe, elle bénéficie de l'attractivité générale du pays."
      ]
    },
    {
      "heading": "Nador : Une Destination en Pleine Ascension",
      "paragraphs": [
        "Le développement de Marchica et l'arrivée de ce complexe hôtelier s'inscrivent dans une dynamique plus large de transformation de Nador. La ville bénéficie déjà d'un aéroport international en pleine expansion et de projets d'infrastructures portuaires majeurs, qui renforcent sa connectivité et son attractivité logistique et économique. Ces éléments combinés créent un écosystème favorable à l'investissement touristique et à l'émergence d'une nouvelle destination méditerranéenne qui pourra rivaliser avec d'autres pôles régionaux.",
        "L'orientation vers le tourisme de luxe et les séjours de qualité supérieure est une voie prometteuse pour Nador. Cela permet non seulement d'attirer une clientèle à forte valeur ajoutée, mais aussi de préserver l'environnement naturel exceptionnel de la lagune de Marchica, en favorisant un développement durable et respectueux. Ce nouveau complexe sera un fleuron de l'hôtellerie marocaine, contribuant à positionner Nador comme une escale incontournable pour les voyageurs en quête d'authenticité et de raffinement."
      ]
    }
  ],
  "faq": [
    {
      "question": "Quel est l'objectif principal du complexe hôtelier de Marchica à Nador ?",
      "answer": "L'objectif principal est de renforcer l'offre touristique haut de gamme dans la région de Nador, d'attirer une clientèle internationale exigeante, et de contribuer significativement au développement économique et à la création d'emplois locaux, en s'inscrivant dans la vision globale de la lagune de Marchica comme pôle d'attractivité méditerranéen."
    },
    {
      "question": "Quel est le montant de l'investissement pour ce nouveau complexe hôtelier ?",
      "answer": "L'investissement global pour la construction de ce complexe hôtelier haut de gamme est estimé à plus de 585 millions de dirhams, témoignant de l'ampleur et de l'importance stratégique de ce projet pour la région."
    },
    {
      "question": "Comment ce projet s'intègre-t-il dans la stratégie touristique nationale du Maroc ?",
      "answer": "Ce projet s'aligne avec la stratégie nationale visant à diversifier les destinations touristiques au-delà des villes traditionnelles, à monter en gamme l'offre d'hébergement et à répartir les bénéfices du tourisme sur l'ensemble du territoire, notamment dans des régions à fort potentiel comme l'Oriental."
    },
    {
      "question": "Quel impact ce complexe aura-t-il sur l'emploi à Nador ?",
      "answer": "La construction et l'exploitation de ce complexe hôtelier généreront des centaines d'emplois directs et indirects dans divers secteurs (hôtellerie, restauration, services, maintenance, sécurité), contribuant ainsi à la dynamisation du marché du travail local et régional."
    }
  ],
  "tags": [
    "Marchica",
    "Nador",
    "Tourisme Maroc",
    "Investissement Hôtelier",
    "Marchica Med",
    "Hôtellerie Luxe"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/11/03/lagune-de-marchica-un-complexe-hotelier-haut-de-gamme-de-585-mdh-a-nador_2016356/",
  "dateIso": "2026-11-03T10:56:52.000Z",
  "dateFr": "3 novembre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-11-03-lagune-de-marchica-un-complexe-hotelier-haut-de-gamme-de-585-mdh-a-nador" },
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
