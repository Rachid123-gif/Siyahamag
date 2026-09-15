import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Koy Group Investit à Dakhla : Un Nouvel Impuls pour le Tourisme Régional | SiyahaMag",
  description: "Découvrez comment Koy Group, via sa nouvelle filiale hôtelière, renforce l'attractivité de Dakhla-Oued Eddahab, une destination clé du tourisme marocain.",
  keywords: ["Dakhla","Tourisme Maroc","Investissement Hôtelier","Koy Group","Développement Régional","Emploi Tourisme"],
  alternates: { canonical: "/news/2026-09-15-koy-group-de-yanja-el-khattat-cree-une-filiale-dediee-au-tourisme-a-dakhla" },
  openGraph: {
    title: "Koy Group Investit à Dakhla : Un Nouvel Impuls pour le Tourisme Régional",
    description: "Découvrez comment Koy Group, via sa nouvelle filiale hôtelière, renforce l'attractivité de Dakhla-Oued Eddahab, une destination clé du tourisme marocain.",
    type: "article",
    publishedTime: "2026-09-15T10:30:55.000Z",
  },
}

const ARTICLE = {
  "title": "Koy Group Investit à Dakhla : Un Nouvel Impuls pour le Tourisme Régional",
  "metaDescription": "Découvrez comment Koy Group, via sa nouvelle filiale hôtelière, renforce l'attractivité de Dakhla-Oued Eddahab, une destination clé du tourisme marocain.",
  "intro": "Le secteur touristique marocain est en constante effervescence, et la région de Dakhla-Oued Eddahab en est un exemple frappant. Récemment, le Koy Group, acteur économique majeur, a annoncé la création d'une nouvelle filiale entièrement dédiée à l'hôtellerie et au tourisme dans cette perle du Sud. Cette initiative marque un tournant significatif pour le développement de l'offre touristique locale et confirme l'attractivité croissante de Dakhla pour les investisseurs privés.",
  "sections": [
    {
      "heading": "Koy Group et l'Expansion Stratégique à Dakhla : Un Signal Fort pour l'Investissement",
      "paragraphs": [
        "Le Koy Group, connu pour ses diverses activités économiques, vient de franchir une étape importante en créant une entité spécifiquement orientée vers le tourisme et l'hôtellerie à Dakhla. Cette nouvelle filiale, dirigée par des membres de la famille Yanja, témoigne d'une volonté claire de capitaliser sur le potentiel exceptionnel de la région. L'engagement d'un groupe de cette envergure envoie un signal positif aux autres investisseurs, soulignant la confiance dans la viabilité et la rentabilité des projets touristiques dans le Sud marocain. C'est une démarche qui s'aligne parfaitement avec les orientations nationales visant à diversifier l'économie régionale et à renforcer son attractivité.",
        "L'investissement dans l'hôtellerie est crucial pour Dakhla, une ville qui, malgré sa popularité grandissante, nécessite un renforcement de ses infrastructures d'accueil pour répondre à une demande touristique en constante augmentation. La création de nouvelles structures d'hébergement de qualité, allant des hôtels aux complexes touristiques, est essentielle pour consolider la position de Dakhla comme destination de choix, capable d'accueillir une clientèle variée, des amateurs de sports nautiques aux voyageurs en quête de tranquillité et d'authenticité."
      ]
    },
    {
      "heading": "Dakhla : Un Joyau du Tourisme Marocain en Pleine Ascension",
      "paragraphs": [
        "Dakhla-Oued Eddahab se distingue comme une destination unique au Maroc, offrant un mélange harmonieux de désert, de lagune et d'océan. Sa lagune, réputée mondialement pour ses conditions idéales de kitesurf et de windsurf, attire une clientèle internationale de passionnés de glisse. Au-delà des sports nautiques, la région propose une expérience touristique riche et diversifiée, incluant l'écotourisme, la découverte de la culture sahraouie, les excursions dans le désert et la dégustation de produits de la mer frais et locaux. Cette diversité fait de Dakhla un pôle d'attraction majeur, contribuant à la diversification de l'offre touristique marocaine au-delà des destinations traditionnelles comme Marrakech, Fès ou Agadir.",
        "La stratégie de l'Office National Marocain du Tourisme (ONMT) et du Ministère du Tourisme a toujours mis l'accent sur le développement des régions émergentes. Dakhla bénéficie d'une attention particulière dans ce cadre, avec des efforts constants pour améliorer la connectivité aérienne, promouvoir la destination à l'international et encourager les investissements structurants. L'engagement de groupes comme Koy Group vient compléter ces efforts publics, créant une synergie essentielle pour le développement durable du tourisme local."
      ]
    },
    {
      "heading": "L'Impact de l'Investissement Privé sur le Développement Socio-Économique Régional",
      "paragraphs": [
        "L'arrivée et l'expansion de groupes privés majeurs dans le secteur touristique de Dakhla ont des répercussions positives considérables sur l'économie locale. Au-delà de la création d'infrastructures hôtelières, ces investissements génèrent un nombre significatif d'emplois directs et indirects. Les besoins en personnel qualifié pour la gestion hôtelière, la restauration, les services d'accueil, les activités de loisirs et la maintenance créent des opportunités pour la population locale, favorisant ainsi l'insertion professionnelle et la formation. Cela contribue également à retenir les jeunes talents dans la région, évitant l'exode rural et renforçant le tissu social.",
        "De plus, l'essor du tourisme stimule d'autres secteurs d'activité. Les fournisseurs locaux de produits alimentaires, d'artisanat, de services de transport et d'excursions bénéficient directement de l'augmentation du nombre de visiteurs. Cette dynamique économique vertueuse favorise l'émergence de petites et moyennes entreprises, renforçant l'écosystème entrepreneurial de Dakhla. L'investissement de Koy Group s'inscrit donc dans une vision globale de développement durable, où le tourisme n'est pas seulement un moteur de croissance économique, mais aussi un levier d'amélioration des conditions de vie des habitants."
      ]
    },
    {
      "heading": "Dakhla dans la Vision Stratégique du Tourisme Marocain : Vers un Avenir Prometteur",
      "paragraphs": [
        "Le Maroc a des ambitions fortes pour son secteur touristique, notamment avec la perspective de la Coupe du Monde 2030, qui représente une opportunité sans précédent pour l'ensemble du territoire. Bien que les villes hôtes principales soient au centre de l'attention, l'événement aura un effet d'entraînement sur toutes les destinations du Royaume, y compris Dakhla. La ville est appelée à jouer un rôle croissant dans la stratégie nationale de diversification et de montée en gamme de l'offre touristique. En développant des infrastructures modernes et des services de qualité, Dakhla se positionne comme une destination capable de répondre aux attentes d'une clientèle exigeante, à la recherche d'expériences authentiques et respectueuses de l'environnement.",
        "L'investissement de Koy Group dans l'hôtellerie de Dakhla est un exemple concret de la concrétisation de cette vision. Il illustre la collaboration fructueuse entre les initiatives privées et les objectifs stratégiques publics pour faire du tourisme un pilier encore plus solide de l'économie marocaine. Le développement de Dakhla, avec son potentiel unique et ses atouts naturels, contribue à la notoriété globale du Maroc en tant que destination touristique mondiale, capable d'offrir une palette d'expériences allant des cités impériales aux plages atlantiques, en passant par les déserts du Sud."
      ]
    }
  ],
  "faq": [
    {
      "question": "Pourquoi Dakhla attire-t-elle autant l'investissement touristique ?",
      "answer": "Dakhla séduit les investisseurs grâce à ses atouts naturels exceptionnels : une lagune mondialement reconnue pour les sports nautiques, un climat agréable toute l'année, des paysages désertiques uniques et une culture locale riche. La vision stratégique du Maroc pour le développement des régions du Sud et les incitations à l'investissement contribuent également à cette attractivité."
    },
    {
      "question": "Quel est l'impact de ce type d'investissement sur l'emploi local à Dakhla ?",
      "answer": "Les investissements hôteliers comme celui du Koy Group sont des créateurs d'emplois majeurs. Ils génèrent des postes directs dans l'hôtellerie, la restauration, les services et les loisirs, ainsi que des emplois indirects chez les fournisseurs locaux, les artisans et les prestataires de services, contribuant ainsi au dynamisme économique et à l'insertion professionnelle des habitants de Dakhla."
    },
    {
      "question": "Comment le Maroc soutient-il le développement touristique des régions du Sud ?",
      "answer": "Le Maroc soutient activement le développement touristique des régions du Sud par des politiques de promotion de l'ONMT, des investissements dans les infrastructures (aéroports, routes), des incitations fiscales pour les investisseurs privés et des programmes de formation professionnelle. L'objectif est de diversifier l'offre touristique nationale et de valoriser le potentiel unique de ces régions."
    },
    {
      "question": "Quels types d'expériences touristiques peut-on trouver à Dakhla ?",
      "answer": "Dakhla offre une large gamme d'expériences touristiques : sports nautiques (kitesurf, windsurf) dans sa lagune, excursions dans le désert, découverte de la culture sahraouie, observation des oiseaux, pêche sportive, détente sur des plages isolées et dégustation de fruits de mer frais."
    }
  ],
  "tags": [
    "Dakhla",
    "Tourisme Maroc",
    "Investissement Hôtelier",
    "Koy Group",
    "Développement Régional",
    "Emploi Tourisme"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/2026/09/15/koy-group-de-yanja-el-khattat-cree-une-filiale-dediee-au-tourisme-a-dakhla_2007487",
  "dateIso": "2026-09-15T10:30:55.000Z",
  "dateFr": "15 septembre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-09-15-koy-group-de-yanja-el-khattat-cree-une-filiale-dediee-au-tourisme-a-dakhla" },
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
