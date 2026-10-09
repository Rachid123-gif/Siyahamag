import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "RAM & Boeing: Un Lifting Intérieur Stratégique pour le Mondial 2030 | SiyahaMag",
  description: "Royal Air Maroc investit dans la modernisation de sept Boeing pour optimiser l'expérience passager, se préparant ainsi à l'afflux touristique du Mondial 20",
  keywords: ["Royal Air Maroc","Boeing","Mondial 2030","Tourisme Maroc","Investissement Aérien","Expérience Passager"],
  alternates: { canonical: "/news/2026-10-08-royal-air-maroc-sept-boeing-vont-beneficier-dun-lifting-interieur-a-lapproche-du" },
  openGraph: {
    title: "RAM & Boeing: Un Lifting Intérieur Stratégique pour le Mondial 2030",
    description: "Royal Air Maroc investit dans la modernisation de sept Boeing pour optimiser l'expérience passager, se préparant ainsi à l'afflux touristique du Mondial 20",
    type: "article",
    publishedTime: "2026-10-08T15:00:46.000Z",
  },
}

const ARTICLE = {
  "title": "RAM & Boeing: Un Lifting Intérieur Stratégique pour le Mondial 2030",
  "metaDescription": "Royal Air Maroc investit dans la modernisation de sept Boeing pour optimiser l'expérience passager, se préparant ainsi à l'afflux touristique du Mondial 20",
  "intro": "Dans une démarche proactive visant à renforcer son positionnement et à améliorer significativement l'expérience de ses passagers, Royal Air Maroc (RAM) a scellé un partenariat stratégique avec le géant aéronautique américain Boeing. Cette collaboration, officialisée en marge de la 8e édition du Marrakech Airshow, marque le début d'un vaste programme de rénovation intérieure pour sept appareils de la flotte Boeing de la compagnie nationale. Cet investissement majeur s'inscrit pleinement dans la vision du Maroc d'accueillir le Mondial 2030 dans des conditions optimales, offrant aux visiteurs une première impression d'excellence dès leur arrivée sur le territoire.",
  "sections": [
    {
      "heading": "Un Partenariat Solide pour une Expérience de Vol Renouvelée",
      "paragraphs": [
        "La signature d'une convention de partenariat entre Royal Air Maroc et Boeing, lors du prestigieux Marrakech Airshow, symbolise une étape clé dans l'engagement de la compagnie marocaine envers la modernisation et l'innovation. Cet accord ne se limite pas à une simple transaction commerciale; il représente une alliance stratégique destinée à élever les standards de confort et de service à bord. Le programme de 'lifting intérieur' des sept Boeing concernés vise à transformer radicalement les cabines, en y intégrant les dernières avancées en matière de design, d'ergonomie et de technologie.",
        "Concrètement, cette rénovation touchera plusieurs aspects essentiels de l'habitacle. Les passagers pourront s'attendre à découvrir de nouveaux sièges offrant un confort accru, potentiellement dotés de systèmes de divertissement à la demande de dernière génération, des écrans tactiles plus larges et des options de connectivité améliorées. L'éclairage de la cabine sera également repensé, avec l'intégration de LED pour créer des ambiances lumineuses adaptées aux différentes phases de vol, contribuant ainsi à réduire la fatigue et à améliorer le bien-être général. L'ensemble de l'aménagement intérieur, des moquettes aux panneaux muraux, sera modernisé pour offrir une esthétique contemporaine et accueillante, reflétant l'hospitalité marocaine dès l'embarquement."
      ]
    },
    {
      "heading": "Le Mondial 2030: Un Catalyseur d'Investissements pour le Tourisme Marocain",
      "paragraphs": [
        "L'horizon 2030, avec l'organisation conjointe de la Coupe du Monde de Football par le Maroc, l'Espagne et le Portugal, est un moteur puissant pour l'ensemble du secteur touristique national. Cet événement planétaire représente une opportunité sans précédent pour le Royaume d'accueillir des millions de visiteurs et de projeter une image de modernité et d'excellence. Dans ce contexte, l'investissement de Royal Air Maroc dans la rénovation de sa flotte est loin d'être anodin; il s'agit d'une composante essentielle de la stratégie globale du pays pour se préparer à cet afflux massif. L'Office National Marocain du Tourisme (ONMT) travaille activement à promouvoir la destination Maroc, et une compagnie aérienne nationale de premier plan, offrant une expérience de vol irréprochable, est un atout marketing inestimable.",
        "Le confort et la qualité des services aériens jouent un rôle crucial dans la perception globale de la destination. Pour de nombreux voyageurs internationaux, le vol est le premier contact avec le pays d'accueil. Offrir des cabines modernes et confortables, c'est garantir une première impression positive, essentielle pour des villes hôtes comme Casablanca, Rabat, Marrakech ou Tanger qui verront transiter des milliers de fans et de touristes. Cet engagement de RAM s'inscrit dans une dynamique plus large d'amélioration des infrastructures touristiques, incluant les aéroports, les hôtels et les services au sol, tous mobilisés pour faire du Mondial 2030 un succès retentissant pour le Maroc."
      ]
    },
    {
      "heading": "Contribution à l'Attractivité et à la Compétitivité du Maroc",
      "paragraphs": [
        "La modernisation des appareils de Royal Air Maroc est un facteur clé pour renforcer l'attractivité et la compétitivité du Maroc en tant que destination touristique de premier plan. Dans un marché aérien mondial de plus en plus concurrentiel, les compagnies qui investissent dans le confort et la technologie à bord se distinguent. En garantissant une expérience de voyage agréable et moderne, RAM contribue directement à la fidélisation de sa clientèle et à l'attraction de nouveaux visiteurs, qu'ils soient touristes d'agrément, voyageurs d'affaires ou pèlerins.",
        "Cet investissement s'aligne également avec les objectifs du Plan d'Action National pour le Tourisme, qui vise à positionner le Maroc parmi les 20 premières destinations mondiales. En améliorant la qualité de son offre aérienne, le Royaume renforce sa connectivité et sa capacité à accueillir un nombre croissant de voyageurs, soutenant ainsi la croissance de l'emploi dans l'hôtellerie, la restauration et les services touristiques. C'est une démarche holistique où chaque maillon de la chaîne touristique, de l'avion à l'hôtel, est renforcé pour offrir une expérience cohérente et de haute qualité."
      ]
    },
    {
      "heading": "Un Impact Économique et Social au Service du Développement Durable",
      "paragraphs": [
        "Au-delà des bénéfices pour les passagers, le partenariat entre RAM et Boeing génère des retombées économiques et sociales significatives pour le Maroc. L'investissement dans la modernisation de la flotte implique des contrats de maintenance, d'approvisionnement en pièces et en services, qui peuvent bénéficier à l'écosystème industriel et de services local. Bien que l'accord principal soit avec Boeing, des opportunités peuvent émerger pour les entreprises marocaines dans les domaines de la logistique, de l'aménagement intérieur ou de la formation du personnel. Cet élan contribue à la création d'emplois qualifiés et au transfert de savoir-faire, renforçant ainsi les compétences nationales dans le secteur aéronautique et touristique.",
        "La vision à long terme de Royal Air Maroc, soutenue par des investissements stratégiques, est cruciale pour le développement durable du tourisme marocain. En offrant une flotte moderne et un service de qualité, RAM assure la pérennité de ses opérations et sa capacité à répondre aux futures demandes du marché. Cette stratégie contribue à positionner le Maroc non seulement comme une destination touristique attractive, mais aussi comme un acteur majeur dans l'aviation régionale, capable de relier l'Afrique à l'Europe et au reste du monde avec des standards internationaux, consolidant ainsi son rôle de hub aérien et de porte d'entrée vers le continent africain."
      ]
    }
  ],
  "faq": [
    {
      "question": "Pourquoi Royal Air Maroc investit-elle dans la rénovation de ses avions maintenant ?",
      "answer": "RAM investit stratégiquement dans la modernisation de sa flotte en prévision de la Coupe du Monde 2030, co-organisée par le Maroc. Cette initiative vise à offrir une expérience passager de qualité supérieure, à renforcer l'attractivité de la destination Maroc et à gérer l'afflux attendu de millions de visiteurs dans les meilleures conditions."
    },
    {
      "question": "Quels types d'améliorations les passagers peuvent-ils attendre à l'intérieur des Boeing rénovés ?",
      "answer": "Les passagers peuvent s'attendre à des sièges plus confortables, de nouveaux systèmes de divertissement à la demande, des écrans tactiles modernes, une connectivité améliorée et un éclairage de cabine repensé. L'ensemble de l'aménagement intérieur sera modernisé pour offrir une esthétique contemporaine et un confort optimisé."
    },
    {
      "question": "Comment cette modernisation de la flotte RAM soutient-elle les objectifs touristiques du Maroc ?",
      "answer": "En améliorant l'expérience de vol, RAM contribue directement à l'image de marque du Maroc comme destination touristique de premier choix. Une première impression positive en vol est essentielle pour attirer et fidéliser les visiteurs, soutenant ainsi les efforts de l'ONMT et les objectifs nationaux de positionnement parmi les meilleures destinations mondiales, notamment en vue du Mondial 2030."
    },
    {
      "question": "Quel est l'impact de ce partenariat sur l'emploi et l'économie marocaine ?",
      "answer": "Bien que l'accord principal soit avec Boeing, cet investissement peut générer des retombées économiques indirectes au Maroc, notamment par la création d'opportunités dans les services de maintenance, la logistique et d'autres secteurs connexes. Il renforce également la compétitivité de RAM, contribuant à la croissance du tourisme et, par extension, à la création d'emplois dans l'hôtellerie, la restauration et les services touristiques."
    }
  ],
  "tags": [
    "Royal Air Maroc",
    "Boeing",
    "Mondial 2030",
    "Tourisme Maroc",
    "Investissement Aérien",
    "Expérience Passager"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/10/08/royal-air-maroc-sept-boeing-vont-beneficier-dun-lifting-a-lapproche-du-mondial-2030_2012076/",
  "dateIso": "2026-10-08T15:00:46.000Z",
  "dateFr": "8 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-08-royal-air-maroc-sept-boeing-vont-beneficier-dun-lifting-interieur-a-lapproche-du" },
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
