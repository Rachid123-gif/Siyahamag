import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tourisme au Maroc : 7,5% du PIB, une Croissance Robuste de 11,7% | SiyahaMag",
  description: "Le secteur touristique marocain affiche une croissance de 11,7% en 2025, contribuant à 7,5% du PIB national. Découvrez les facteurs clés de cette performan",
  keywords: ["Tourisme Maroc","PIB touristique","Économie marocaine","Investissement tourisme","ONMT","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-10-20-maroc-le-tourisme-pese-desormais-75-du-pib-en-hausse-de-117-en-2025" },
  openGraph: {
    title: "Tourisme au Maroc : 7,5% du PIB, une Croissance Robuste de 11,7%",
    description: "Le secteur touristique marocain affiche une croissance de 11,7% en 2025, contribuant à 7,5% du PIB national. Découvrez les facteurs clés de cette performan",
    type: "article",
    publishedTime: "2026-10-20T09:45:40.000Z",
  },
}

const ARTICLE = {
  "title": "Tourisme au Maroc : 7,5% du PIB, une Croissance Robuste de 11,7%",
  "metaDescription": "Le secteur touristique marocain affiche une croissance de 11,7% en 2025, contribuant à 7,5% du PIB national. Découvrez les facteurs clés de cette performan",
  "intro": "Le tourisme marocain continue d'affirmer sa position de pilier essentiel de l'économie nationale, avec des chiffres récents témoignant d'une dynamique de croissance impressionnante. Selon les dernières données du Haut-Commissariat au Plan (HCP), la contribution du secteur au Produit Intérieur Brut (PIB) a atteint 7,5% en 2025, marquant une progression notable de 11,7% par rapport à l'année précédente. Cette performance, qui voit le PIB touristique s'établir à 129,7 milliards de dirhams, confirme l'efficacité des stratégies mises en œuvre et l'attractivité croissante du Royaume en tant que destination de choix.",
  "sections": [
    {
      "heading": "Une Contribution Économique en Forte Hausse : Les Chiffres Clés",
      "paragraphs": [
        "Les statistiques dévoilées par le Haut-Commissariat au Plan (HCP) mettent en lumière l'essor significatif du secteur touristique marocain. En 2025, le Produit Intérieur Brut (PIB) touristique a atteint 129,7 milliards de dirhams (MMDH), enregistrant une augmentation de 11,7% par rapport aux 116,2 MMDH de l'année précédente. Cette progression se traduit par une hausse de la part du tourisme dans le PIB national, passant de 7,2% à 7,5%. Ces chiffres ne sont pas de simples indicateurs mais reflètent une réalité économique tangible, où le tourisme génère richesse et dynamisme sur l'ensemble du territoire.",
        "Cette croissance est d'autant plus remarquable qu'elle intervient dans un contexte économique global parfois incertain, démontrant la résilience et le potentiel d'adaptation de l'industrie touristique marocaine. L'augmentation de 0,3 point de pourcentage dans la contribution au PIB, bien que paraissant modeste, représente en réalité des milliards de dirhams supplémentaires injectés dans l'économie, soutenant des milliers d'emplois et stimulant l'investissement dans des infrastructures hôtelières et de loisirs. C'est le résultat d'une synergie entre les initiatives publiques et l'engagement des acteurs privés, tous orientés vers un objectif commun : faire du Maroc une destination touristique de premier plan mondial."
      ]
    },
    {
      "heading": "Les Moteurs de Cette Performance : Stratégies et Attractivité",
      "paragraphs": [
        "Plusieurs facteurs convergent pour expliquer cette croissance robuste du PIB touristique. L'Office National Marocain du Tourisme (ONMT) joue un rôle prépondérant à travers des campagnes de promotion ciblées sur des marchés émetteurs clés, diversifiant l'offre et renforçant l'image de marque du Maroc. Les efforts se concentrent sur la mise en valeur de la richesse culturelle, historique et naturelle du pays, de ses villes impériales comme Marrakech et Fès, à ses stations balnéaires d'Agadir et ses oasis du désert. La connectivité aérienne a également été considérablement améliorée, avec l'ouverture de nouvelles lignes et l'augmentation des fréquences vers les principaux aéroports marocains, facilitant ainsi l'accès pour les visiteurs internationaux.",
        "La vision stratégique du Maroc pour le tourisme, notamment à travers des plans ambitieux comme la Vision 2020 et les préparatifs pour la Vision 2030, a créé un cadre propice à l'investissement et au développement. Ces stratégies intègrent l'amélioration des infrastructures d'accueil, la diversification des produits touristiques (tourisme d'affaires, de bien-être, écologique, sportif) et la formation des ressources humaines. L'investissement dans de nouveaux établissements hôteliers, la rénovation des structures existantes et le développement de complexes touristiques intégrés contribuent directement à l'augmentation de la capacité d'accueil et à l'amélioration de la qualité des services offerts, ce qui se reflète in fine dans les chiffres du PIB touristique."
      ]
    },
    {
      "heading": "Impact sur l'Emploi, l'Investissement et les Préparatifs de la Coupe du Monde 2030",
      "paragraphs": [
        "Au-delà des chiffres macroéconomiques, la croissance du tourisme a un impact direct et significatif sur l'emploi au Maroc. Le secteur est un pourvoyeur majeur de postes, allant de l'hôtellerie-restauration à l'artisanat, en passant par les guides touristiques, les transports et les services annexes. Cette dynamique positive favorise l'insertion professionnelle des jeunes et contribue à la réduction du chômage, notamment dans les régions à fort potentiel touristique. Le développement de compétences spécifiques et la formation continue sont essentiels pour répondre aux exigences d'un marché en constante évolution et garantir une expérience client de qualité.",
        "L'attractivité du secteur se manifeste également par un flux croissant d'investissements, tant nationaux qu'étrangers. Les opportunités sont nombreuses, de la construction de nouveaux hôtels de luxe aux projets d'éco-tourisme, en passant par le développement de centres de congrès et de parcs de loisirs. Cet afflux de capitaux est crucial pour moderniser les infrastructures et diversifier l'offre. Par ailleurs, la perspective d'accueillir la Coupe du Monde de la FIFA 2030, en co-organisation avec l'Espagne et le Portugal, représente un catalyseur extraordinaire. Cet événement planétaire va non seulement générer des investissements massifs dans les infrastructures (stades, transports, hébergements) mais aussi placer le Maroc sous les feux de la rampe internationale, assurant une visibilité touristique sans précédent et un afflux record de visiteurs."
      ]
    },
    {
      "heading": "Perspectives d'Avenir et Défis à Relèver",
      "paragraphs": [
        "Les perspectives pour le tourisme marocain sont prometteuses, avec des objectifs ambitieux pour les années à venir. La stratégie nationale vise à consolider la position du Maroc sur la scène mondiale, en misant sur la durabilité, la digitalisation et la diversification des marchés. Le pays aspire à attirer davantage de touristes à forte valeur ajoutée et à prolonger la durée moyenne des séjours, tout en assurant une répartition équitable des bénéfices du tourisme à travers toutes les régions. L'intégration de pratiques respectueuses de l'environnement et le soutien aux initiatives locales sont au cœur de cette démarche pour un développement touristique responsable.",
        "Cependant, le secteur doit également faire face à des défis importants. La concurrence internationale est féroce, et le Maroc doit constamment innover pour maintenir son attractivité. La gestion des ressources en eau, la préservation du patrimoine culturel et naturel, et l'adaptation aux changements climatiques sont des enjeux majeurs qui nécessitent une planification rigoureuse et des investissements continus. La formation des professionnels du tourisme et l'amélioration continue de la qualité des services restent des priorités pour garantir la satisfaction des visiteurs et fidéliser une clientèle exigeante. En relevant ces défis, le Maroc pourra non seulement maintenir mais aussi accélérer la trajectoire de croissance de son secteur touristique, consolidant ainsi sa contribution au PIB et son rôle de moteur économique."
      ]
    }
  ],
  "faq": [
    {
      "question": "Quelle est la contribution actuelle du tourisme au PIB marocain ?",
      "answer": "Selon les dernières données du Haut-Commissariat au Plan (HCP) pour l'année 2025, le tourisme contribue à hauteur de 7,5% au Produit Intérieur Brut (PIB) du Maroc. Ce chiffre marque une progression significative par rapport à l'année précédente."
    },
    {
      "question": "Quel a été le taux de croissance du PIB touristique en 2025 ?",
      "answer": "Le PIB touristique du Maroc a enregistré une croissance robuste de 11,7% en 2025, passant de 116,2 milliards de dirhams à 129,7 milliards de dirhams. Cette performance souligne la dynamique positive du secteur."
    },
    {
      "question": "Quels sont les principaux facteurs qui expliquent la croissance du tourisme au Maroc ?",
      "answer": "Plusieurs facteurs contribuent à cette croissance, notamment les campagnes de promotion de l'ONMT, l'amélioration de la connectivité aérienne, les investissements dans les infrastructures hôtelières, la diversification de l'offre touristique et les stratégies nationales ambitieuses comme la Vision 2030."
    },
    {
      "question": "Comment la Coupe du Monde 2030 pourrait-elle impacter le tourisme marocain ?",
      "answer": "L'organisation de la Coupe du Monde 2030 représente une opportunité majeure. Elle devrait générer des investissements massifs dans les infrastructures touristiques et sportives, offrir une visibilité internationale sans précédent au Maroc et attirer un nombre record de visiteurs, stimulant ainsi davantage la croissance du secteur."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "PIB touristique",
    "Économie marocaine",
    "Investissement tourisme",
    "ONMT",
    "Coupe du Monde 2030"
  ],
  "source": "Hespress Fr",
  "sourceUrl": "https://fr.hespress.com/493199-maroc-le-tourisme-pese-desormais-75-du-pib-en-hausse-de-117-en-2025.html",
  "dateIso": "2026-10-20T09:45:40.000Z",
  "dateFr": "20 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-20-maroc-le-tourisme-pese-desormais-75-du-pib-en-hausse-de-117-en-2025" },
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
