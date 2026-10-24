import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Mondial 2030 : Le Maroc et la FIFA, un partenariat fiscal stratégique | SiyahaMag",
  description: "Découvrez comment le Projet de Loi de Finances 2027 prévoit un régime fiscal avantageux pour la FIFA et ses partenaires, crucial pour le succès du Mondial ",
  keywords: ["Mondial 2030","Tourisme Maroc","FIFA","PLF 2027","Investissement Hôtelier","Exonération Fiscale"],
  alternates: { canonical: "/news/2026-10-23-mondial-2030-le-plf-2027-accorde-un-regime-fiscal-dexception-a-la-fifa" },
  openGraph: {
    title: "Mondial 2030 : Le Maroc et la FIFA, un partenariat fiscal stratégique",
    description: "Découvrez comment le Projet de Loi de Finances 2027 prévoit un régime fiscal avantageux pour la FIFA et ses partenaires, crucial pour le succès du Mondial ",
    type: "article",
    publishedTime: "2026-10-23T17:32:56.000Z",
  },
}

const ARTICLE = {
  "title": "Mondial 2030 : Le Maroc et la FIFA, un partenariat fiscal stratégique",
  "metaDescription": "Découvrez comment le Projet de Loi de Finances 2027 prévoit un régime fiscal avantageux pour la FIFA et ses partenaires, crucial pour le succès du Mondial ",
  "intro": "L'organisation conjointe de la Coupe du Monde de la FIFA 2030 représente une opportunité historique pour le Maroc, non seulement sur le plan sportif mais aussi économique et touristique. Dans cette optique, le Projet de Loi de Finances (PLF) 2027 prévoit des mesures fiscales exceptionnelles, témoignant de l'engagement du Royaume envers la FIFA et ses partenaires. Ces dispositions stratégiques visent à garantir le succès de l'événement et à maximiser ses retombées positives, notamment pour le secteur touristique marocain.",
  "sections": [
    {
      "heading": "Un Cadre Fiscal Privilégié pour le Mondial 2030 : L'Engagement Marocain",
      "paragraphs": [
        "Le Projet de Loi de Finances 2027 marque une étape décisive dans la préparation du Maroc à accueillir la Coupe du Monde de la FIFA 2030. Conformément aux engagements pris lors de sa candidature réussie, le Royaume a formalisé un régime fiscal d'exception pour la Fédération Internationale de Football Association (FIFA), ses filiales et ses partenaires. Cette initiative s'inscrit dans une logique de facilitation et d'attractivité, essentielle pour l'organisation d'un événement d'une telle envergure mondiale.",
        "Concrètement, ce dispositif prévoit une exonération totale ou partielle de plusieurs impôts et taxes jusqu'en 2032. Parmi les principales mesures figurent l'exonération de l'impôt sur les sociétés (IS), de la taxe sur la valeur ajoutée (TVA), des droits de douane et de la plupart des autres prélèvements fiscaux. Ces avantages fiscaux sont une pratique courante dans l'organisation des grands événements sportifs internationaux, permettant de séduire les instances organisatrices et d'assurer une gestion financière optimale des opérations liées à la compétition. Pour le Maroc, cela représente un investissement stratégique dont les retombées sont attendues bien au-delà de la simple durée de la compétition."
      ]
    },
    {
      "heading": "Impact Stratégique sur l'Investissement et les Infrastructures Touristiques",
      "paragraphs": [
        "Bien que ciblant directement la FIFA et ses entités, ce régime fiscal d'exception a des implications profondes pour l'investissement et le développement des infrastructures touristiques au Maroc. La tenue du Mondial 2030 exige des investissements massifs dans les stades, les réseaux de transport, mais aussi et surtout dans le secteur hôtelier. Les villes hôtes potentielles comme Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir sont appelées à renforcer considérablement leurs capacités d'accueil, tant en termes d'hébergement que de services associés.",
        "L'afflux attendu de millions de visiteurs, de délégations officielles, de médias et de supporteurs générera une demande sans précédent pour les hôtels, riads, maisons d'hôtes et autres établissements touristiques. Cette perspective encourage les investisseurs locaux et internationaux à moderniser les infrastructures existantes et à en créer de nouvelles, répondant aux standards internationaux. Les exonérations fiscales indirectement liées à ce grand projet peuvent aussi inciter les entreprises à investir dans des projets connexes, comme les centres de loisirs, les restaurants de qualité et les services de mobilité touristique, contribuant ainsi à une montée en gamme globale de l'offre touristique marocaine. Le ministère du Tourisme et l'Office National Marocain du Tourisme (ONMT) travaillent en étroite collaboration pour s'assurer que le Royaume soit prêt à capitaliser sur cette visibilité unique."
      ]
    },
    {
      "heading": "Le Mondial 2030 : Un Catalyseur pour la Visibilité et l'Attractivité Touristique du Maroc",
      "paragraphs": [
        "Au-delà des considérations fiscales et infrastructurelles, la Coupe du Monde 2030 représente une opportunité inégalée pour la promotion du Maroc en tant que destination touristique de premier plan. L'exposition médiatique planétaire associée à un événement de cette envergure offrira une visibilité inestimable aux richesses culturelles, naturelles et historiques du Royaume. Des millions de téléspectateurs et de visiteurs découvriront la diversité des paysages marocains, l'hospitalité de sa population et la richesse de sa gastronomie, bien au-delà des matchs de football.",
        "L'ONMT, acteur central de la stratégie de promotion touristique du pays, aura un rôle crucial à jouer. Il devra capitaliser sur cette plateforme mondiale pour renforcer l'image de marque du Maroc, attirer de nouveaux marchés et encourager les visiteurs à prolonger leur séjour ou à revenir explorer d'autres régions. Cet événement servira de tremplin pour atteindre les objectifs ambitieux du Maroc en matière de tourisme, notamment celui d'accueillir un nombre record de touristes et de générer des revenus substantiels pour l'économie nationale. L'effet « legacy » du Mondial 2030 est donc un enjeu majeur pour le développement durable du tourisme marocain, créant des emplois durables et stimulant l'économie locale."
      ]
    },
    {
      "heading": "Défis et Opportunités pour l'Emploi et la Formation dans l'Hôtellerie-Restauration",
      "paragraphs": [
        "L'organisation du Mondial 2030, avec son cortège d'investissements et de visiteurs, mettra naturellement en lumière le besoin croissant de main-d'œuvre qualifiée dans le secteur de l'hôtellerie-restauration. Les établissements devront non seulement augmenter leurs effectifs mais aussi garantir un niveau de service irréprochable, à la hauteur des attentes internationales. Cela représente une formidable opportunité pour la création d'emplois, allant des postes de direction aux métiers de service, en passant par la cuisine, la réception et l'entretien. Les jeunes Marocains, en particulier, pourront trouver des débouchés professionnels prometteurs dans ce secteur en pleine expansion.",
        "Pour répondre à cette demande, une politique proactive de formation et de perfectionnement sera indispensable. Les écoles hôtelières et les centres de formation professionnelle joueront un rôle clé dans la préparation des futurs employés aux exigences spécifiques d'un événement de cette ampleur. L'investissement dans le capital humain est aussi important que l'investissement dans les infrastructures. En développant les compétences locales, le Maroc s'assure non seulement le succès du Mondial 2030, mais aussi une croissance pérenne de son industrie touristique, capable de rivaliser avec les meilleures destinations mondiales sur le long terme."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qu'est-ce que le régime fiscal d'exception accordé à la FIFA pour le Mondial 2030 ?",
      "answer": "Le Projet de Loi de Finances (PLF) 2027 prévoit d'exonérer la FIFA, ses filiales et ses partenaires de l'impôt sur les sociétés (IS), de la TVA, des droits de douane et de la plupart des autres taxes jusqu'en 2032. Cette mesure est un engagement pris par le Maroc lors de sa candidature pour l'organisation de la Coupe du Monde 2030, visant à faciliter la gestion financière de l'événement et à attirer les investissements nécessaires."
    },
    {
      "question": "Comment ces avantages fiscaux vont-ils bénéficier au secteur touristique marocain ?",
      "answer": "Ces avantages fiscaux, bien que directement pour la FIFA, incitent indirectement à des investissements massifs dans les infrastructures, notamment hôtelières et de transport. Cela stimule la construction et la modernisation d'établissements, augmente la capacité d'accueil et la qualité des services touristiques. L'événement générera également une visibilité internationale sans précédent pour le Maroc, attirant des millions de visiteurs et favorisant le développement à long terme de l'industrie touristique et la création d'emplois qualifiés."
    },
    {
      "question": "Quelles villes marocaines sont concernées par l'organisation de la Coupe du Monde 2030 ?",
      "answer": "Les principales villes marocaines pressenties pour accueillir les matchs et les infrastructures du Mondial 2030 sont Casablanca, Rabat, Marrakech, Tanger, Fès et Agadir. Ces villes bénéficieront d'importants investissements en infrastructures sportives, hôtelières et de transport, contribuant à leur développement économique et touristique."
    },
    {
      "question": "Quel est le rôle de l'ONMT dans la promotion du Maroc grâce au Mondial 2030 ?",
      "answer": "L'Office National Marocain du Tourisme (ONMT) jouera un rôle stratégique en capitalisant sur l'exposition médiatique mondiale du Mondial 2030 pour promouvoir le Maroc comme destination touristique. L'ONMT mettra en œuvre des campagnes de communication ciblées pour présenter la richesse culturelle, la beauté des paysages et l'hospitalité marocaine, visant à attirer un nombre record de visiteurs et à assurer un héritage touristique durable pour le pays après l'événement."
    }
  ],
  "tags": [
    "Mondial 2030",
    "Tourisme Maroc",
    "FIFA",
    "PLF 2027",
    "Investissement Hôtelier",
    "Exonération Fiscale"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/10/23/mondial-2030-le-plf-2027-accorde-un-regime-fiscal-dexception-a-la-fifa_2014779/",
  "dateIso": "2026-10-23T17:32:56.000Z",
  "dateFr": "23 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-23-mondial-2030-le-plf-2027-accorde-un-regime-fiscal-dexception-a-la-fifa" },
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
