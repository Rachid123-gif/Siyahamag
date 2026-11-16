import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tourisme Marocain : 34,8 Millions de Nuitées, une Croissance Solide | SiyahaMag",
  description: "Le Maroc enregistre 34,8 millions de nuitées en EHTC à fin septembre, marquant une hausse de 7%. Analyse de cette performance et des perspectives du touris",
  keywords: ["Tourisme Maroc","Nuitées Hôtelières","Observatoire du Tourisme","Investissement Tourisme","ONMT","Hôtellerie Maroc","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-11-16-maroc-les-etablissements-touristiques-classes-enregistrent-348-millions-de-nuite" },
  openGraph: {
    title: "Tourisme Marocain : 34,8 Millions de Nuitées, une Croissance Solide",
    description: "Le Maroc enregistre 34,8 millions de nuitées en EHTC à fin septembre, marquant une hausse de 7%. Analyse de cette performance et des perspectives du touris",
    type: "article",
    publishedTime: "2026-11-16T13:30:36.000Z",
  },
}

const ARTICLE = {
  "title": "Tourisme Marocain : 34,8 Millions de Nuitées, une Croissance Solide",
  "metaDescription": "Le Maroc enregistre 34,8 millions de nuitées en EHTC à fin septembre, marquant une hausse de 7%. Analyse de cette performance et des perspectives du touris",
  "intro": "Le secteur touristique marocain continue de démontrer une résilience et une vitalité remarquables. Les dernières statistiques de l'Observatoire du Tourisme, couvrant la période jusqu'à fin septembre, révèlent une performance impressionnante pour les établissements d'hébergement touristique classés (EHTC). Avec plus de 34,8 millions de nuitées enregistrées, le Royaume confirme sa trajectoire de croissance et son attractivité croissante sur la scène internationale.",
  "sections": [
    {
      "heading": "Une Performance Remarquable des Établissements Classés",
      "paragraphs": [
        "Les chiffres récents de l'Observatoire du Tourisme mettent en lumière une dynamique très positive pour le secteur hôtelier marocain. Plus de 34,8 millions de nuitées ont été comptabilisées dans les établissements d'hébergement touristique classés sur l'ensemble du territoire national jusqu'à fin septembre. Cette performance représente une augmentation significative de 7% par rapport à la même période de l'année précédente, témoignant d'une reprise robuste et d'une confiance renouvelée des voyageurs envers la destination Maroc. Cette progression s'accompagne également d'une amélioration notable du taux d'occupation, un indicateur clé de la bonne santé du secteur.",
        "Ces données sont d'autant plus encourageantes qu'elles confirment la capacité du Maroc à attirer un flux constant de touristes, à la fois nationaux et internationaux. La diversification de l'offre touristique, allant des villes impériales aux stations balnéaires en passant par le désert et les montagnes, contribue à cette attractivité. Les efforts conjoints des professionnels du tourisme, des autorités locales et de l'Office National Marocain du Tourisme (ONMT) portent leurs fruits, positionnant le Royaume comme une destination de choix dans un environnement concurrentiel."
      ]
    },
    {
      "heading": "Les Moteurs de la Croissance Touristique Marocaine",
      "paragraphs": [
        "Plusieurs facteurs expliquent cette croissance soutenue. L'ONMT, sous la bannière de sa stratégie « Light in Action », a intensifié ses campagnes de promotion ciblées sur les marchés émetteurs prioritaires, renforçant l'image du Maroc comme une destination sûre, authentique et diversifiée. La connectivité aérienne a également joué un rôle crucial, avec l'ouverture de nouvelles lignes et l'augmentation des fréquences vers les principales villes marocaines, facilitant l'accès pour les visiteurs. Des villes comme Marrakech, Agadir, Fès, Casablanca et Tanger continuent d'être les locomotives de cette croissance, chacune offrant une expérience unique qui séduit différents segments de voyageurs.",
        "L'investissement continu dans les infrastructures touristiques, notamment l'amélioration des capacités hôtelières et le développement de nouveaux concepts d'hébergement, a également contribué à cette dynamique. Le Maroc a su capitaliser sur son patrimoine culturel riche, ses paysages variés et son hospitalité légendaire pour offrir une expérience touristique de qualité. De plus, l'organisation d'événements internationaux et de conférences a stimulé le tourisme d'affaires et de congrès (MICE), diversifiant ainsi les sources de revenus pour le secteur."
      ]
    },
    {
      "heading": "Impact Économique et Perspectives d'Emploi",
      "paragraphs": [
        "La croissance du nombre de nuitées et l'augmentation du taux d'occupation des EHTC ont des répercussions économiques directes et indirectes significatives. Le tourisme est un pilier essentiel de l'économie marocaine, contribuant de manière substantielle au Produit Intérieur Brut (PIB) et générant un nombre considérable d'emplois. Cette dynamique positive crée de nouvelles opportunités d'emploi dans l'hôtellerie, la restauration, les transports, l'artisanat et de nombreux autres services connexes. L'investissement dans le capital humain, à travers la formation professionnelle, est d'ailleurs une priorité pour garantir la qualité de service et répondre aux exigences d'un secteur en pleine expansion.",
        "Le Maroc, en se positionnant comme co-organisateur de la Coupe du Monde de la FIFA 2030, anticipe une accélération sans précédent de ces investissements et une augmentation massive des flux touristiques. Cet événement planétaire représente une formidable opportunité de moderniser davantage les infrastructures, de développer de nouvelles capacités d'accueil et de renforcer la visibilité internationale du Royaume. Les professionnels du secteur sont déjà à pied d'œuvre pour préparer cet événement, qui promet de transformer durablement le paysage touristique et économique du pays."
      ]
    },
    {
      "heading": "Vers une Vision 2030 Ambitieuse et Durable",
      "paragraphs": [
        "Les performances actuelles s'inscrivent parfaitement dans les objectifs ambitieux de la Vision 2030 du tourisme marocain, qui vise à positionner le Royaume parmi les 10 premières destinations touristiques mondiales. Cette stratégie met l'accent sur la durabilité, l'innovation et la diversification de l'offre. Le développement d'un tourisme plus responsable, respectueux de l'environnement et des cultures locales, est au cœur des préoccupations. Des initiatives sont prises pour promouvoir des pratiques éco-responsables au sein des établissements hôteliers et des destinations, répondant ainsi aux attentes croissantes des voyageurs pour un tourisme plus éthique.",
        "L'intégration des technologies numériques et la personnalisation des expériences clients sont également des axes majeurs de développement. Le Maroc aspire à offrir des séjours sur mesure, enrichis par des technologies innovantes, pour attirer une clientèle toujours plus exigeante. En consolidant ses acquis et en relevant les défis futurs, le secteur touristique marocain est bien parti pour atteindre ses objectifs et continuer à être un moteur puissant de développement économique et social pour le Royaume."
      ]
    }
  ],
  "faq": [
    {
      "question": "Quels chiffres clés démontrent la croissance du tourisme marocain à fin septembre ?",
      "answer": "À fin septembre, les établissements d'hébergement touristique classés au Maroc ont enregistré plus de 34,8 millions de nuitées, soit une augmentation de 7% par rapport à la même période de l'année précédente. Cette progression est également accompagnée d'une amélioration du taux d'occupation."
    },
    {
      "question": "Quelles sont les principales villes touristiques qui contribuent à cette croissance ?",
      "answer": "Les villes qui contribuent le plus à cette croissance sont principalement Marrakech, Agadir, Fès, Casablanca, Tanger et Rabat. Chacune offre une expérience touristique distincte, allant du culturel au balnéaire en passant par le tourisme d'affaires."
    },
    {
      "question": "Quel rôle joue l'ONMT dans cette performance ?",
      "answer": "L'Office National Marocain du Tourisme (ONMT) joue un rôle central à travers ses campagnes de promotion ciblées et sa stratégie « Light in Action ». Ces efforts visent à renforcer l'image du Maroc et à attirer davantage de visiteurs des marchés émetteurs prioritaires, contribuant ainsi directement à l'augmentation des nuitées."
    },
    {
      "question": "Comment la Coupe du Monde 2030 va-t-elle impacter le tourisme marocain ?",
      "answer": "L'organisation de la Coupe du Monde 2030 est perçue comme un catalyseur majeur pour le tourisme marocain. Elle devrait entraîner des investissements massifs dans les infrastructures hôtelières et de transport, augmenter la capacité d'accueil et offrir une visibilité internationale sans précédent, stimulant significativement les flux touristiques et l'emploi dans le secteur."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "Nuitées Hôtelières",
    "Observatoire du Tourisme",
    "Investissement Tourisme",
    "ONMT",
    "Hôtellerie Maroc",
    "Coupe du Monde 2030"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/11/16/maroc-les-etablissements-touristiques-classes-enregistrent-348-millions-de-nuitees-a-fin-septembre_2018371/",
  "dateIso": "2026-11-16T13:30:36.000Z",
  "dateFr": "16 novembre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-11-16-maroc-les-etablissements-touristiques-classes-enregistrent-348-millions-de-nuite" },
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
