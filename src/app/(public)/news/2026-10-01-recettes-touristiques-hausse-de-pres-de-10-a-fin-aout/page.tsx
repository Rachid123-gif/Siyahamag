import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tourisme Marocain: Recettes en Hausse de Près de 10% à Fin Août | SiyahaMag",
  description: "Les recettes touristiques du Maroc atteignent 98 MMDH à fin août, en hausse de 9,7%, selon l'Office des Changes. Analyse de cette croissance et de son impa",
  keywords: ["Tourisme Marocain","Recettes Touristiques","Office des Changes","ONMT","Investissement Tourisme","Emploi Hôtellerie"],
  alternates: { canonical: "/news/2026-10-01-recettes-touristiques-hausse-de-pres-de-10-a-fin-aout" },
  openGraph: {
    title: "Tourisme Marocain: Recettes en Hausse de Près de 10% à Fin Août",
    description: "Les recettes touristiques du Maroc atteignent 98 MMDH à fin août, en hausse de 9,7%, selon l'Office des Changes. Analyse de cette croissance et de son impa",
    type: "article",
    publishedTime: "2026-10-01T10:58:07.000Z",
  },
}

const ARTICLE = {
  "title": "Tourisme Marocain: Recettes en Hausse de Près de 10% à Fin Août",
  "metaDescription": "Les recettes touristiques du Maroc atteignent 98 MMDH à fin août, en hausse de 9,7%, selon l'Office des Changes. Analyse de cette croissance et de son impa",
  "intro": "Le secteur touristique marocain continue d'afficher une dynamique impressionnante, confirmant sa position de pilier essentiel de l'économie nationale. Les derniers indicateurs de l'Office des Changes révèlent une progression notable des recettes touristiques, atteignant près de 98 milliards de dirhams (MMDH) à fin août, marquant une hausse de 9,7% par rapport à la même période de l'année précédente. Cette performance souligne la résilience et l'attractivité croissante du Royaume en tant que destination de choix.",
  "sections": [
    {
      "heading": "Une Croissance Solide des Recettes Touristiques",
      "paragraphs": [
        "Les données mensuelles de l'Office des Changes mettent en lumière une amélioration significative de la balance des voyages pour le Maroc. Sur la période allant de janvier à fin août, les recettes générées par le tourisme ont frôlé les 98 MMDH, enregistrant une augmentation de 9,7%. Cette progression est d'autant plus remarquable qu'elle s'inscrit dans un contexte de reprise post-pandémie, où le Maroc a su se positionner comme une destination sûre et diversifiée, attirant un nombre croissant de visiteurs internationaux. L'afflux de devises étrangères lié à ces recettes est un moteur crucial pour la stabilité macroéconomique du pays, renforçant les réserves de change et soutenant la valeur du dirham.",
        "Parallèlement à cette hausse des recettes, les dépenses de voyages des résidents marocains à l'étranger ont également progressé, affichant une augmentation de 6,6%. Cette dynamique montre une reprise générale de la mobilité et des échanges, mais la hausse plus prononcée des recettes confirme un solde positif et une contribution nette du secteur touristique à la balance des paiements. Ces chiffres témoignent de l'efficacité des stratégies mises en œuvre pour stimuler l'arrivée de touristes, tout en gérant l'équilibre des flux monétaires liés aux voyages."
      ]
    },
    {
      "heading": "Facteurs Clés de l'Attractivité Touristique Marocaine",
      "paragraphs": [
        "Plusieurs facteurs convergent pour expliquer cette performance exceptionnelle du tourisme marocain. L'Office National Marocain du Tourisme (ONMT) a joué un rôle prépondérant à travers des campagnes de promotion ciblées, telles que la stratégie \"Light in Action\", visant à renforcer l'image du Maroc sur les marchés émetteurs traditionnels et à conquérir de nouvelles parts de marché. La diversification de l'offre touristique, incluant le tourisme culturel à Marrakech et Fès, le balnéaire à Agadir et Dakhla, le tourisme d'aventure dans l'Atlas et le désert, ainsi que le développement du tourisme d'affaires, contribue à attirer une clientèle variée.",
        "L'amélioration de la connectivité aérienne est également un pilier essentiel de cette croissance. L'ouverture de nouvelles lignes directes vers des villes clés européennes et au-delà, ainsi que l'augmentation des fréquences des vols existants, facilitent l'accès au Royaume. Les investissements continus dans les infrastructures hôtelières et les services touristiques, avec l'arrivée de grandes enseignes internationales et le développement de concepts d'hébergement innovants, garantissent une expérience de qualité pour les visiteurs. De plus, la stabilité politique et la sécurité du pays demeurent des atouts majeurs, offrant un environnement propice à l'épanouissement du secteur."
      ]
    },
    {
      "heading": "Impact sur l'Emploi et l'Investissement dans le Secteur",
      "paragraphs": [
        "La croissance robuste des recettes touristiques a des répercussions directes et très positives sur l'emploi et l'investissement au Maroc. Le secteur du tourisme est un pourvoyeur majeur d'emplois, qu'il s'agisse de l'hôtellerie, de la restauration, des agences de voyages, des guides touristiques, des artisans ou des transports. Cette dynamique positive encourage la création de nouveaux postes et la professionnalisation des métiers du tourisme, offrant des opportunités significatives pour la jeunesse marocaine et contribuant à la réduction du chômage. Les programmes de formation professionnelle dans le domaine de l'hôtellerie-restauration sont ainsi renforcés pour répondre aux besoins croissants du marché.",
        "L'attractivité du secteur se traduit également par un regain d'intérêt pour l'investissement. Les capitaux nationaux et étrangers sont orientés vers le développement de nouvelles infrastructures touristiques, la rénovation d'établissements existants et la création de projets innovants, notamment dans le tourisme durable et l'écotourisme. Ces investissements sont cruciaux pour moderniser l'offre marocaine et la maintenir compétitive sur la scène internationale. La perspective de l'organisation de la Coupe du Monde de la FIFA 2030, en co-candidature avec l'Espagne et le Portugal, agit comme un catalyseur puissant, stimulant les investissements massifs dans les infrastructures hôtelières, sportives et de transport, et promettant des retombées économiques et touristiques à long terme."
      ]
    },
    {
      "heading": "Perspectives et Défis pour le Tourisme Marocain",
      "paragraphs": [
        "Fort de ces performances, le Maroc se tourne vers l'avenir avec des objectifs ambitieux. La feuille de route stratégique du tourisme vise à atteindre 17,5 millions de touristes d'ici 2026 et 37,5 millions à l'horizon 2030, année de la Coupe du Monde. Pour y parvenir, le Royaume mise sur la digitalisation de l'offre touristique, le renforcement de la compétitivité des destinations régionales et l'intégration de principes de durabilité dans tous les aspects du développement touristique. L'objectif est de créer une valeur ajoutée durable et de garantir une répartition équitable des bénéfices du tourisme à travers toutes les régions.",
        "Cependant, des défis demeurent. La saisonnalité de certaines destinations, la concurrence régionale accrue et la nécessité de préserver les ressources naturelles et culturelles du pays exigent une vigilance constante et une adaptation continue des stratégies. La formation continue du personnel, l'innovation dans les services et l'exploration de nouveaux marchés émetteurs seront essentielles pour maintenir cette trajectoire ascendante. Le Maroc est résolument engagé dans une démarche de transformation de son secteur touristique, visant à en faire un modèle de développement inclusif et respectueux de l'environnement, capable de répondre aux attentes des voyageurs du monde entier."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qu'est-ce que l'amélioration de la balance voyages signifie pour le Maroc?",
      "answer": "L'amélioration de la balance voyages signifie que les recettes générées par les touristes étrangers au Maroc sont nettement supérieures aux dépenses des résidents marocains voyageant à l'étranger. Cela se traduit par un apport net de devises étrangères, renforçant les réserves de change du pays et contribuant positivement à la balance des paiements, ce qui est bénéfique pour la stabilité économique nationale."
    },
    {
      "question": "Comment ces chiffres impactent-ils l'emploi dans le secteur touristique?",
      "answer": "La croissance des recettes touristiques est directement liée à une augmentation de l'activité dans l'hôtellerie, la restauration, les loisirs et les services associés. Cela génère de nouvelles opportunités d'emploi, tant directs qu'indirects, et stimule la demande de compétences dans ces domaines. Le secteur touristique est un moteur essentiel de l'emploi pour de nombreux jeunes Marocains."
    },
    {
      "question": "Le Maroc est-il en bonne voie pour atteindre ses objectifs touristiques à long terme?",
      "answer": "Les chiffres actuels, avec une croissance de près de 10% des recettes à fin août, indiquent que le Maroc est sur une trajectoire positive pour atteindre ses objectifs. La feuille de route stratégique, combinée aux investissements en cours et à l'effet catalyseur de la Coupe du Monde 2030, positionne le Royaume favorablement pour accueillir 17,5 millions de touristes d'ici 2026 et 37,5 millions en 2030."
    },
    {
      "question": "Quelles sont les principales villes marocaines qui bénéficient le plus de cette croissance?",
      "answer": "Historiquement, des villes comme Marrakech, Agadir, Fès et Casablanca sont des pôles touristiques majeurs qui bénéficient grandement de cette croissance. Cependant, la stratégie de diversification vise également à développer des destinations émergentes comme Dakhla pour le tourisme sportif et de nature, ou des régions de l'Atlas pour l'écotourisme, assurant une répartition plus équitable des retombées économiques sur l'ensemble du territoire."
    }
  ],
  "tags": [
    "Tourisme Marocain",
    "Recettes Touristiques",
    "Office des Changes",
    "ONMT",
    "Investissement Tourisme",
    "Emploi Hôtellerie"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/10/01/recettes-touristiques-hausse-de-pres-de-10-a-fin-aout_2010784/",
  "dateIso": "2026-10-01T10:58:07.000Z",
  "dateFr": "1 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-01-recettes-touristiques-hausse-de-pres-de-10-a-fin-aout" },
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
