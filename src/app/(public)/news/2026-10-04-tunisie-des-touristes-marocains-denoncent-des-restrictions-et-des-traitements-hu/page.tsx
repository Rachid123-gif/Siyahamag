import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Touristes Marocains en Tunisie : Dénonciations et Perspectives Voyage | SiyahaMag",
  description: "Des voyageurs marocains rapportent des incidents déplaisants en Tunisie. SiyahaMag.ma explore l'impact sur le tourisme et les alternatives pour les citoyen",
  keywords: ["Tourisme Marocain","Voyageurs Marocains","Expérience Voyage","Tourisme Interne","ONMT","Droits des Voyageurs"],
  alternates: { canonical: "/news/2026-10-04-tunisie-des-touristes-marocains-denoncent-des-restrictions-et-des-traitements-hu" },
  openGraph: {
    title: "Touristes Marocains en Tunisie : Dénonciations et Perspectives Voyage",
    description: "Des voyageurs marocains rapportent des incidents déplaisants en Tunisie. SiyahaMag.ma explore l'impact sur le tourisme et les alternatives pour les citoyen",
    type: "article",
    publishedTime: "2026-10-04T10:20:25.000Z",
  },
}

const ARTICLE = {
  "title": "Touristes Marocains en Tunisie : Dénonciations et Perspectives Voyage",
  "metaDescription": "Des voyageurs marocains rapportent des incidents déplaisants en Tunisie. SiyahaMag.ma explore l'impact sur le tourisme et les alternatives pour les citoyen",
  "intro": "Récemment, des témoignages préoccupants ont émergé concernant le traitement de citoyens marocains à l'aéroport de Carthage en Tunisie. Ces incidents soulèvent des questions importantes sur l'expérience de voyage des Marocains à l'étranger et la nécessité d'assurer un accueil respectueux et des conditions de transit dignes. Pour le secteur touristique marocain, ces situations incitent à une réflexion sur la promotion de destinations alternatives et la valorisation de l'offre nationale.",
  "sections": [
    {
      "heading": "Des Expériences Déplaisantes pour les Voyageurs Marocains en Tunisie",
      "paragraphs": [
        "Plusieurs ressortissants marocains se sont récemment exprimés, faisant état de difficultés rencontrées lors de leur passage à l'aéroport international de Carthage en Tunisie. Les récits convergents décrivent des périodes d'attente prolongées, parfois sans accès aux commodités essentielles, et des procédures de contrôle jugées excessivement restrictives. Ces conditions, perçues comme portant atteinte à la dignité des voyageurs, ont généré un sentiment d'inconfort et de frustration parmi les personnes concernées. Ces dénonciations, relayées par divers canaux, mettent en lumière des situations où des citoyens marocains se sont sentis traités de manière inéquitable ou peu respectueuse, éloignée des standards d'hospitalité généralement attendus dans le cadre d'un voyage international.",
        "Ces incidents, bien que spécifiques à une destination, résonnent avec la sensibilité des voyageurs marocains quant à la fluidité et au respect de leur parcours. L'expérience aéroportuaire constitue souvent la première et la dernière impression d'un pays, et toute entrave ou traitement jugé disproportionné peut ternir significativement l'image de la destination. Pour les touristes, le voyage est synonyme de détente et de découverte, et toute situation stressante ou humiliante dès l'arrivée ou avant le départ peut altérer profondément leur perception et leurs choix futurs de destinations. La récurrence de ces témoignages invite à une vigilance accrue et à une évaluation des conditions d'accueil pour tous les voyageurs, quelle que soit leur nationalité."
      ]
    },
    {
      "heading": "L'Impact sur les Choix de Destinations des Touristes Marocains",
      "paragraphs": [
        "De telles expériences négatives ont inévitablement un impact sur les décisions de voyage des Marocains. Face à des récits de traitements jugés indésirables, les voyageurs sont naturellement enclins à réévaluer leurs options, privilégiant des destinations où l'accueil est perçu comme plus chaleureux, les procédures plus fluides et le respect des individus garanti. Cette dynamique peut potentiellement réorienter une partie du flux touristique marocain vers d'autres pays ou, de manière significative, renforcer l'attrait pour le tourisme interne. Le Maroc, avec sa diversité de paysages et de cultures, offre une multitude d'expériences qui peuvent rivaliser avec les destinations étrangères, d'autant plus si les voyages à l'étranger sont perçus comme complexes ou risqués.",
        "L'Office National Marocain du Tourisme (ONMT) et les acteurs du secteur s'efforcent continuellement de promouvoir le Royaume comme une destination de choix, tant pour les visiteurs internationaux que pour les citoyens marocains. Des campagnes de sensibilisation au tourisme local et des offres attractives sont régulièrement lancées pour encourager la découverte des richesses du pays. Les villes impériales, les plages atlantiques, les montagnes de l'Atlas et le désert du Sahara représentent autant de trésors qui peuvent offrir des expériences mémorables et sans les tracas potentiels rencontrés ailleurs. L'investissement dans l'amélioration des infrastructures hôtelières et de transport au Maroc contribue également à rendre le tourisme intérieur plus accessible et plus attrayant pour tous."
      ]
    },
    {
      "heading": "Protection des Citoyens à l'Étranger et Rôle des Instances Officielles",
      "paragraphs": [
        "La protection et l'assistance des citoyens marocains à l'étranger relèvent de la compétence des représentations diplomatiques et consulaires du Royaume. En cas de difficultés, comme celles rapportées, les voyageurs sont encouragés à contacter les ambassades ou consulats marocains dans le pays concerné. Ces institutions ont pour mission d'apporter aide et conseil, d'assurer le respect des droits de leurs ressortissants et, le cas échéant, d'intervenir auprès des autorités locales pour clarifier ou résoudre des situations problématiques. La connaissance de ces recours est essentielle pour tout voyageur se trouvant dans une situation délicate à l'étranger. La diplomatie marocaine veille traditionnellement à la dignité et au bien-être de ses citoyens où qu'ils se trouvent.",
        "Ces incidents soulignent également l'importance d'une communication claire et transparente entre les autorités des pays d'accueil et les voyageurs. Des informations précises sur les exigences d'entrée, les procédures douanières et les attentes en matière de comportement sont cruciales pour éviter les malentendus et les situations désagréables. Pour le Maroc, qui se positionne comme un hub touristique majeur, l'expérience positive de ses propres citoyens lorsqu'ils voyagent est un miroir de l'accueil qu'il souhaite offrir au monde. Le développement harmonieux du tourisme international repose sur la réciprocité du respect et la facilitation des échanges entre les peuples."
      ]
    },
    {
      "heading": "Le Maroc, une Alternative de Voyage Sécurisée et Accueillante",
      "paragraphs": [
        "Dans ce contexte de préoccupations pour les voyageurs marocains, le Royaume du Maroc se positionne comme une destination de plus en plus attrayante et sécurisée pour ses propres citoyens. Le gouvernement et les acteurs du tourisme marocain ont mis en œuvre des stratégies ambitieuses pour développer l'offre touristique nationale, la rendre plus accessible et diversifiée. Des régions comme le Sud, le littoral atlantique, les villes historiques de Fès et Marrakech, ou encore les stations de montagne de l'Atlas, offrent des expériences variées qui répondent aux attentes des familles, des aventuriers et des amateurs de culture. L'objectif est de consolider le tourisme interne comme un pilier essentiel de l'économie, créateur d'emplois et vecteur de développement régional.",
        "Avec l'organisation conjointe de la Coupe du Monde 2030, le Maroc s'engage dans une phase d'investissement et de modernisation sans précédent. Les infrastructures hôtelières, les aéroports et les réseaux de transport sont en pleine expansion pour accueillir des millions de visiteurs. Cette dynamique bénéficiera directement aux touristes marocains, qui trouveront un pays doté d'installations de pointe et de services de qualité supérieure. L'accent est mis sur l'hospitalité légendaire marocaine, garantissant à chaque visiteur, qu'il soit local ou international, une expérience mémorable et sans encombre. Ces efforts renforcent l'image du Maroc comme une destination de confiance, où le bien-être et la dignité des voyageurs sont une priorité absolue, encourageant ainsi les Marocains à explorer les richesses de leur propre pays."
      ]
    }
  ],
  "faq": [
    {
      "question": "Que doivent faire les touristes marocains en cas de problème à l'étranger ?",
      "answer": "En cas de difficultés à l'étranger, il est conseillé de contacter immédiatement l'ambassade ou le consulat du Maroc le plus proche. Ces représentations diplomatiques sont là pour assister les citoyens marocains, les conseiller et intervenir si nécessaire auprès des autorités locales pour assurer le respect de leurs droits."
    },
    {
      "question": "Le Maroc offre-t-il des alternatives de voyage attrayantes pour ses citoyens ?",
      "answer": "Absolument. Le Maroc regorge de destinations variées et attrayantes, allant des plages ensoleillées aux montagnes majestueuses, en passant par les villes impériales historiques et les paysages désertiques. L'ONMT et les acteurs locaux développent constamment des offres pour le tourisme interne, encourageant les Marocains à découvrir la richesse culturelle et naturelle de leur propre pays, avec des infrastructures en constante amélioration."
    },
    {
      "question": "Comment le tourisme interne peut-il bénéficier des incidents à l'étranger ?",
      "answer": "Les incidents de voyage à l'étranger peuvent inciter les citoyens à privilégier des destinations plus proches et perçues comme plus sûres et accueillantes, renforçant ainsi le tourisme interne. Cela stimule l'économie locale, crée des emplois dans l'hôtellerie-restauration et l'artisanat, et contribue au développement des régions marocaines, notamment en vue d'événements majeurs comme la Coupe du Monde 2030."
    }
  ],
  "tags": [
    "Tourisme Marocain",
    "Voyageurs Marocains",
    "Expérience Voyage",
    "Tourisme Interne",
    "ONMT",
    "Droits des Voyageurs"
  ],
  "source": "Hespress Fr",
  "sourceUrl": "https://fr.hespress.com/491033-tunisie-des-touristes-marocains-denoncent-des-restrictions-et-des-traitements-humiliants-a-laeroport.html",
  "dateIso": "2026-10-04T10:20:25.000Z",
  "dateFr": "4 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-04-tunisie-des-touristes-marocains-denoncent-des-restrictions-et-des-traitements-hu" },
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
