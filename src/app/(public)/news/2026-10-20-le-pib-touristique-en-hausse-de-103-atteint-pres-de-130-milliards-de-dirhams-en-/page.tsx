import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Tourisme Marocain: Le PIB Prévu à 129,7 MMDH en 2025, Croissance Robuste | SiyahaMag",
  description: "Le Haut-Commissariat au Plan anticipe une hausse de 11,7% du PIB touristique marocain en 2025, atteignant 129,7 MMDH. Découvrez les moteurs de cette croiss",
  keywords: ["Tourisme Maroc","PIB Tourisme","Économie Marocaine","Investissement Tourisme","Emploi Tourisme","HCP"],
  alternates: { canonical: "/news/2026-10-20-le-pib-touristique-en-hausse-de-103-atteint-pres-de-130-milliards-de-dirhams-en-" },
  openGraph: {
    title: "Tourisme Marocain: Le PIB Prévu à 129,7 MMDH en 2025, Croissance Robuste",
    description: "Le Haut-Commissariat au Plan anticipe une hausse de 11,7% du PIB touristique marocain en 2025, atteignant 129,7 MMDH. Découvrez les moteurs de cette croiss",
    type: "article",
    publishedTime: "2026-10-20T10:30:53.000Z",
  },
}

const ARTICLE = {
  "title": "Tourisme Marocain: Le PIB Prévu à 129,7 MMDH en 2025, Croissance Robuste",
  "metaDescription": "Le Haut-Commissariat au Plan anticipe une hausse de 11,7% du PIB touristique marocain en 2025, atteignant 129,7 MMDH. Découvrez les moteurs de cette croiss",
  "intro": "Le secteur touristique marocain continue d'afficher une dynamique impressionnante, avec des projections économiques particulièrement optimistes pour l'année 2025. Selon les récentes données du Haut-Commissariat au Plan (HCP), le Produit Intérieur Brut (PIB) touristique devrait franchir un cap significatif, confirmant le rôle pivot de cette industrie dans l'économie nationale. Cette progression témoigne de la résilience et du potentiel de développement du Royaume en tant que destination touristique de premier plan.",
  "sections": [
    {
      "heading": "Analyse des Projections Économiques : Un Secteur en Pleine Expansion",
      "paragraphs": [
        "Les chiffres du Compte Satellite du Tourisme (CST) pour 2025, rendus publics par le HCP, prévoient une amélioration notable du PIB touristique. Ce dernier est estimé à 129,7 milliards de dirhams (MMDH), marquant une croissance de 11,7% par rapport à l'année précédente, 2024. Cette performance est d'autant plus remarquable qu'elle inclut une augmentation de 16% des impôts nets des subventions sur les produits touristiques, soulignant l'accroissement de la valeur ajoutée générée par l'ensemble de la chaîne de valeur touristique marocaine.",
        "Le Compte Satellite du Tourisme est un outil statistique essentiel, développé en accord avec les normes internationales, qui permet de mesurer de manière exhaustive la contribution économique du tourisme. Il ne se limite pas aux seules activités hôtelières et de restauration, mais englobe également tous les secteurs indirectement liés, tels que le transport, les activités culturelles, sportives et de loisirs, ainsi que les services d'agences de voyages. L'analyse de ces données prévisionnelles pour 2025 offre une vision claire de la trajectoire ascendante du secteur, portée par une demande soutenue et des investissements stratégiques.",
        "Cette croissance robuste du PIB touristique est un indicateur clé de la bonne santé du secteur et de sa capacité à générer de la richesse. Elle reflète l'attractivité croissante du Maroc auprès des voyageurs internationaux et nationaux, ainsi que l'efficacité des politiques publiques mises en œuvre pour soutenir cette industrie. Le seuil de près de 130 MMDH en 2025 positionne le tourisme comme un moteur économique majeur, capable de rivaliser avec d'autres secteurs traditionnels."
      ]
    },
    {
      "heading": "Facteurs de Croissance et Stratégies Nationales : Une Vision Ambitieuse",
      "paragraphs": [
        "Plusieurs facteurs convergent pour expliquer cette dynamique positive. L'Office National Marocain du Tourisme (ONMT) joue un rôle crucial à travers ses campagnes de promotion ciblées et sa stratégie marketing innovante, notamment via le plan 'Light in Action'. Ces initiatives visent à diversifier les marchés émetteurs, à renforcer la notoriété de la destination Maroc et à mettre en avant la richesse culturelle, naturelle et expérientielle du Royaume. L'augmentation des liaisons aériennes directes avec les principales villes européennes et mondiales, ainsi que le développement des infrastructures aéroportuaires, contribuent également à faciliter l'accès au pays pour un nombre croissant de visiteurs.",
        "Parallèlement, les investissements massifs dans l'infrastructure touristique, incluant la construction de nouveaux hôtels, resorts et complexes de loisirs, ainsi que la modernisation des établissements existants, améliorent constamment l'offre et la qualité des services. Les grandes villes touristiques comme Marrakech, Agadir, Fès et Rabat continuent d'attirer les visiteurs, tandis que de nouvelles régions et niches touristiques, telles que le tourisme durable, l'écotourisme et le tourisme d'aventure, gagnent en popularité. La Vision 2030 du tourisme, ainsi que l'organisation conjointe de la Coupe du Monde de football en 2030 avec l'Espagne et le Portugal, représentent des catalyseurs majeurs pour le développement futur du secteur, promettant une visibilité internationale sans précédent et des opportunités d'investissement colossales.",
        "Le gouvernement marocain, conscient du potentiel du tourisme, a mis en place des mesures incitatives pour l'investissement et le développement des compétences. Ces politiques visent à soutenir les entreprises du secteur, à encourager l'innovation et à garantir une formation adéquate pour la main-d'œuvre. L'objectif est de créer un écosystème touristique résilient, compétitif et respectueux de l'environnement, capable de générer des retombées économiques et sociales durables pour l'ensemble du pays."
      ]
    },
    {
      "heading": "Impact sur l'Emploi et l'Investissement : Des Perspectives Favorable",
      "paragraphs": [
        "La croissance du PIB touristique s'accompagne inévitablement d'un impact positif sur le marché de l'emploi. Le secteur est un pourvoyeur majeur de postes, tant directs qu'indirects, dans une multitude de domaines : hôtellerie, restauration, transport, artisanat, commerce, services guidés, et bien d'autres. Cette expansion se traduit par la création de nouvelles opportunités pour les jeunes marocains, contribuant ainsi à la réduction du chômage et au développement des compétences locales. La demande croissante de professionnels qualifiés encourage les établissements de formation à adapter leurs programmes pour répondre aux besoins spécifiques de l'industrie touristique.",
        "Sur le plan de l'investissement, les perspectives sont également très encourageantes. L'attractivité du secteur, soutenue par les chiffres de croissance et la stabilité politique du Royaume, attire les investisseurs nationaux et étrangers. Ces capitaux sont dirigés vers la construction de nouvelles infrastructures hôtelières, le développement de complexes touristiques intégrés, l'amélioration des services digitaux pour les voyageurs, et la diversification de l'offre touristique. L'engagement du Maroc à accueillir des événements d'envergure mondiale, comme la Coupe du Monde 2030, renforce encore la confiance des investisseurs et stimule les projets de grande envergure, préparant le terrain pour une transformation profonde du paysage touristique national.",
        "L'investissement ne se limite pas aux grandes infrastructures; il touche également les petites et moyennes entreprises (PME) qui constituent l'épine dorsale du tourisme local. Le développement de l'agritourisme, du tourisme rural et des hébergements alternatifs ouvre de nouvelles voies pour l'entrepreneuriat et l'investissement à l'échelle régionale, favorisant une répartition plus équitable des bénéfices du tourisme et contribuant au développement économique des zones moins urbanisées. C'est une stratégie gagnant-gagnant pour l'économie marocaine et ses citoyens."
      ]
    },
    {
      "heading": "Le Tourisme Marocain : Un Pilier Stratégique pour l'Avenir du Royaume",
      "paragraphs": [
        "En conclusion, les projections du HCP pour le PIB touristique en 2025 confirment le statut du tourisme comme un pilier essentiel de l'économie marocaine. Le secteur démontre une résilience remarquable face aux défis mondiaux et une capacité constante à innover et à se réinventer. Cette croissance n'est pas seulement quantitative; elle s'accompagne d'une amélioration qualitative de l'offre, d'une diversification des produits et d'une prise de conscience accrue des enjeux de développement durable.",
        "Le Maroc se positionne stratégiquement pour capitaliser sur cette dynamique, en tirant parti de ses atouts naturels, culturels et de son hospitalité légendaire. Les efforts concertés des acteurs publics et privés, sous l'impulsion de l'ONMT et d'autres institutions, sont déterminants pour maintenir cette trajectoire ascendante. L'ambition est claire : faire du Maroc une destination touristique de référence mondiale, reconnue pour son authenticité, sa diversité et son engagement envers un tourisme responsable et inclusif.",
        "Alors que le Royaume se prépare à accueillir des événements majeurs et à concrétiser les objectifs de la Vision 2030, le secteur touristique est appelé à jouer un rôle encore plus prépondérant dans la création de richesse, la génération d'emplois et le rayonnement international du Maroc. Ces chiffres optimistes pour 2025 ne sont qu'une étape dans une feuille de route ambitieuse, promettant un avenir prospère pour le tourisme marocain."
      ]
    }
  ],
  "faq": [
    {
      "question": "Qu'est-ce que le Compte Satellite du Tourisme (CST) et pourquoi est-il important ?",
      "answer": "Le Compte Satellite du Tourisme (CST) est un cadre statistique international qui permet de mesurer de manière détaillée et exhaustive la contribution économique du tourisme. Il est crucial car il offre une vision complète, au-delà des activités directes, en intégrant les impacts indirects sur d'autres secteurs. Pour le Maroc, le CST fournit des données fiables pour évaluer la performance du secteur, orienter les politiques publiques et attirer les investissements."
    },
    {
      "question": "Comment le tourisme contribue-t-il à la croissance du PIB marocain ?",
      "answer": "Le tourisme contribue significativement au PIB marocain en générant des revenus directs (hôtellerie, restauration, transport, loisirs) et indirects (approvisionnement en biens et services, investissements). Il est également une source majeure de devises étrangères et un moteur de développement régional, stimulant l'emploi et l'entrepreneuriat dans diverses provinces du Royaume, bien au-delà des grandes villes."
    },
    {
      "question": "Quels sont les principaux facteurs qui stimulent la croissance du tourisme au Maroc ?",
      "answer": "Plusieurs facteurs clés stimulent la croissance : les campagnes de promotion de l'ONMT, l'amélioration de la connectivité aérienne, les investissements dans les infrastructures hôtelières et de loisirs, la stabilité politique du pays, la richesse de son patrimoine culturel et naturel, et l'organisation d'événements d'envergure mondiale comme la Coupe du Monde 2030, qui offriront une visibilité inédite."
    },
    {
      "question": "Quelles sont les perspectives d'emploi dans le secteur touristique marocain avec cette croissance ?",
      "answer": "Les perspectives d'emploi sont très positives. Une croissance de 11,7% du PIB touristique en 2025 se traduira par une création significative d'emplois directs et indirects dans l'hôtellerie, la restauration, le transport, l'artisanat et les services. L'expansion du secteur et les grands projets liés à la Coupe du Monde 2030 nécessiteront une main-d'œuvre qualifiée, offrant de nombreuses opportunités pour les jeunes marocains et encourageant la formation professionnelle."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "PIB Tourisme",
    "Économie Marocaine",
    "Investissement Tourisme",
    "Emploi Tourisme",
    "HCP"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/10/20/le-pib-touristique-en-hausse-de-103-atteint-pres-de-130-milliards-de-dirhams-en-2025_2013891/",
  "dateIso": "2026-10-20T10:30:53.000Z",
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-20-le-pib-touristique-en-hausse-de-103-atteint-pres-de-130-milliards-de-dirhams-en-" },
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
