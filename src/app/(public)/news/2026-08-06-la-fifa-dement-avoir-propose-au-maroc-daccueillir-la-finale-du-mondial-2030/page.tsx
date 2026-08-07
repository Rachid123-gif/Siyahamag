import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Mondial 2030: La FIFA clarifie les rumeurs sur la finale au Maroc | SiyahaMag",
  description: "La FIFA dément l'attribution de la finale du Mondial 2030 au Maroc. SiyahaMag analyse l'impact du co-hosting sur le tourisme et l'investissement marocain.",
  keywords: ["Maroc","Coupe du Monde 2030","Tourisme","Hôtellerie","Investissement","FIFA","ONMT"],
  alternates: { canonical: "/news/2026-08-06-la-fifa-dement-avoir-propose-au-maroc-daccueillir-la-finale-du-mondial-2030" },
  openGraph: {
    title: "Mondial 2030: La FIFA clarifie les rumeurs sur la finale au Maroc",
    description: "La FIFA dément l'attribution de la finale du Mondial 2030 au Maroc. SiyahaMag analyse l'impact du co-hosting sur le tourisme et l'investissement marocain.",
    type: "article",
    publishedTime: "2026-08-06T09:45:56.000Z",
  },
}

const ARTICLE = {
  "title": "Mondial 2030: La FIFA clarifie les rumeurs sur la finale au Maroc",
  "metaDescription": "La FIFA dément l'attribution de la finale du Mondial 2030 au Maroc. SiyahaMag analyse l'impact du co-hosting sur le tourisme et l'investissement marocain.",
  "intro": "Suite à une réunion de la FIFA tenue récemment à Rabat, des rumeurs persistantes concernant l'organisation de la finale de la Coupe du Monde 2030 au Maroc ont circulé. L'instance mondiale du football, par l'intermédiaire de son président Gianni Infantino, a rapidement réagi pour démentir ces informations. Cette clarification met fin aux spéculations tout en réaffirmant l'importance du rôle du Maroc en tant que co-organisateur de cet événement planétaire, une opportunité sans précédent pour le secteur touristique du Royaume.",
  "sections": [
    {
      "heading": "La FIFA met fin aux spéculations sur la finale du Mondial 2030",
      "paragraphs": [
        "La capitale marocaine, Rabat, a été le théâtre d'une rencontre de haut niveau de la Fédération Internationale de Football Association (FIFA), à laquelle a pris part son président, Gianni Infantino. Cette réunion, bien que cruciale pour les discussions autour du football mondial, a été suivie par une vague de rumeurs suggérant que le Maroc se serait vu promettre l'organisation de la finale de la Coupe du Monde 2030 en échange de son soutien. Cette information, relayée par divers canaux, a rapidement été contredite par la FIFA elle-même. Une agence de presse espagnole a notamment rapporté le démenti officiel de l'instance, précisant qu'aucune décision de ce type n'avait été prise ni communiquée.",
        "Il est essentiel de comprendre que la désignation des villes hôtes et, a fortiori, du lieu de la finale d'un événement d'une telle envergure, est un processus complexe et rigoureux. Elle implique des critères techniques stricts, des évaluations d'infrastructures et des négociations approfondies bien avant toute annonce officielle. La clarification de la FIFA souligne la nécessité de s'en tenir aux communications officielles pour éviter la désinformation, particulièrement sur un sujet qui captive l'attention mondiale et suscite un enthousiasme considérable au Maroc."
      ]
    },
    {
      "heading": "Le Maroc, Co-Organisateur de la Coupe du Monde 2030 : Un Catalyseur pour le Tourisme",
      "paragraphs": [
        "Indépendamment du lieu de la finale, l'attribution de la co-organisation de la Coupe du Monde 2030 au Maroc, en collaboration avec l'Espagne et le Portugal, représente une consécration historique et une opportunité sans précédent pour le Royaume. C'est la première fois qu'un pays africain et arabe co-accueillera cet événement planétaire, offrant une visibilité et un rayonnement international inestimables. Pour le secteur touristique marocain, cela signifie une afflux massif de visiteurs internationaux, de supporters, de médias et de délégations officielles, bien au-delà des chiffres habituels.",
        "L'Office National Marocain du Tourisme (ONMT) et les acteurs du secteur se préparent déjà à capitaliser sur cette exposition mondiale. L'événement servira de vitrine exceptionnelle pour promouvoir la richesse culturelle, la diversité des paysages, l'hospitalité légendaire et la modernité des infrastructures du Maroc. C'est une occasion unique de positionner le Royaume comme une destination touristique de premier plan, capable d'accueillir des événements de grande envergure tout en offrant une expérience authentique et mémorable à ses visiteurs. L'impact sur la notoriété de la marque Maroc à l'échelle internationale sera considérable et durable."
      ]
    },
    {
      "heading": "Modernisation des Infrastructures et Dynamisation du Secteur Hôtelier",
      "paragraphs": [
        "L'organisation d'une Coupe du Monde exige des investissements colossaux en matière d'infrastructures. Le Maroc s'est déjà engagé dans une vaste stratégie de développement, notamment pour la construction ou la rénovation de stades aux normes internationales, mais aussi pour l'amélioration de ses réseaux de transport. Les aéroports seront modernisés et agrandis, les infrastructures routières renforcées, et le réseau ferroviaire à grande vitesse (LGV) pourrait être étendu pour relier les villes hôtes. Ces projets ne bénéficieront pas uniquement à l'événement sportif, mais laisseront un héritage durable pour le développement économique et touristique du pays.",
        "Le secteur hôtelier est au cœur de cette dynamique. L'accueil de millions de visiteurs nécessitera une augmentation significative de la capacité d'hébergement. Cela se traduira par la construction de nouveaux hôtels de toutes catégories, l'extension et la modernisation des établissements existants, ainsi que le développement de solutions d'hébergement alternatives. Cet élan générera des milliers d'emplois directs et indirects, de la construction à la gestion hôtelière, en passant par la restauration, les services et le divertissement. Les villes potentielles hôtes comme Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir verront leurs parcs hôteliers se transformer, offrant de nouvelles opportunités d'investissement et de carrière."
      ]
    },
    {
      "heading": "Opportunités d'Investissement et Vision Stratégique pour le Tourisme Marocain",
      "paragraphs": [
        "La perspective du Mondial 2030 agit comme un puissant aimant pour les investissements nationaux et étrangers dans le secteur touristique. Au-delà de l'hôtellerie et des infrastructures sportives, de nombreux autres domaines sont concernés : parcs de loisirs, centres commerciaux, services de restauration et de divertissement, agences de voyage spécialisées, et entreprises de logistique événementielle. C'est une période propice pour les entrepreneurs et les investisseurs qui cherchent à se positionner sur un marché en pleine expansion, soutenu par une vision gouvernementale claire et ambitieuse pour le développement durable du tourisme.",
        "Cet événement s'inscrit parfaitement dans la stratégie touristique à long terme du Maroc, notamment la \"Vision 2030\" qui vise à faire du Royaume une destination d'excellence. La Coupe du Monde sera un accélérateur pour atteindre les objectifs de cette vision, en termes de nombre d'arrivées, de recettes touristiques, de création d'emplois qualifiés et de positionnement sur l'échiquier mondial. Elle permettra de renforcer l'attractivité du Maroc bien au-delà du football, en mettant en lumière son patrimoine, sa culture, sa gastronomie et son potentiel économique global, assurant ainsi un héritage positif pour les décennies à venir."
      ]
    }
  ],
  "faq": [
    {
      "question": "Le Maroc accueillera-t-il des matchs de la Coupe du Monde 2030 malgré le démenti sur la finale ?",
      "answer": "Oui, le Maroc est officiellement co-organisateur de la Coupe du Monde 2030 avec l'Espagne et le Portugal. Le démenti concerne uniquement l'attribution de la finale, mais le Royaume accueillera bien des matchs de la compétition sur son territoire."
    },
    {
      "question": "Quels sont les principaux avantages du Mondial 2030 pour le tourisme marocain ?",
      "answer": "Les avantages sont multiples : une visibilité internationale sans précédent, un afflux massif de touristes, d'importants investissements dans les infrastructures (aéroports, routes, stades) et l'hôtellerie, la création de nombreux emplois, et un renforcement de l'image du Maroc comme destination touristique majeure et moderne."
    },
    {
      "question": "Quelles villes marocaines sont susceptibles d'accueillir des matchs du Mondial 2030 ?",
      "answer": "Plusieurs grandes villes marocaines sont pressenties pour accueillir des matchs, notamment Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir. Ces villes disposent déjà d'infrastructures ou sont en cours de développement pour répondre aux normes de la FIFA."
    },
    {
      "question": "Comment l'industrie hôtelière marocaine se prépare-t-elle à cet événement ?",
      "answer": "L'industrie hôtelière marocaine est en pleine effervescence. Des projets de construction de nouveaux hôtels sont lancés, des établissements existants sont rénovés et modernisés, et des programmes de formation du personnel sont mis en place pour garantir un service de qualité supérieure et une capacité d'accueil suffisante pour les millions de visiteurs attendus."
    }
  ],
  "tags": [
    "Maroc",
    "Coupe du Monde 2030",
    "Tourisme",
    "Hôtellerie",
    "Investissement",
    "FIFA",
    "ONMT"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/08/06/la-fifa-dement-avoir-propose-au-maroc-daccueillir-la-finale-du-mondial-2030_2002417/",
  "dateIso": "2026-08-06T09:45:56.000Z",
  "dateFr": "6 août 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-08-06-la-fifa-dement-avoir-propose-au-maroc-daccueillir-la-finale-du-mondial-2030" },
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
