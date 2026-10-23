import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"
import { Calendar, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Crise à Sebta: Leçons pour la Résilience du Tourisme Marocain | SiyahaMag",
  description: "Analyse des pertes touristiques de Sebta (75M€, -90%) et des implications pour le Maroc. SiyahaMag.ma explore la résilience du tourisme marocain face aux d",
  keywords: ["Tourisme Maroc","Sebta Crise","Économie Touristique","Tourisme Nord Maroc","ONMT","Coupe du Monde 2030"],
  alternates: { canonical: "/news/2026-10-22-sebta-chiffre-a-75-millions-deuros-les-pertes-liees-a-la-crise-et-a-90-la-chute-" },
  openGraph: {
    title: "Crise à Sebta: Leçons pour la Résilience du Tourisme Marocain",
    description: "Analyse des pertes touristiques de Sebta (75M€, -90%) et des implications pour le Maroc. SiyahaMag.ma explore la résilience du tourisme marocain face aux d",
    type: "article",
    publishedTime: "2026-10-22T17:06:03.000Z",
  },
}

const ARTICLE = {
  "title": "Crise à Sebta: Leçons pour la Résilience du Tourisme Marocain",
  "metaDescription": "Analyse des pertes touristiques de Sebta (75M€, -90%) et des implications pour le Maroc. SiyahaMag.ma explore la résilience du tourisme marocain face aux d",
  "intro": "L'enclave de Sebta a récemment fait face à une crise économique majeure, avec des pertes estimées à 75 millions d'euros et une chute drastique de 90% de son activité touristique. Ces chiffres alarmants, révélés par le gouvernement de la ville, soulignent la fragilité du secteur touristique face aux événements imprévus. Pour SiyahaMag.ma, cette situation offre une occasion d'analyser les dynamiques régionales et de réaffirmer la robustesse et les stratégies de développement du tourisme marocain.",
  "sections": [
    {
      "heading": "Les Lourdes Conséquences Économiques de la Crise à Sebta",
      "paragraphs": [
        "La ville de Sebta a été confrontée à des perturbations significatives qui ont eu un impact direct et sévère sur son économie. Le gouvernement local a chiffré les pertes économiques directes à 75 millions d'euros, un montant considérable pour une économie de cette taille. Cette évaluation met en lumière la vulnérabilité des économies fortement dépendantes des flux transfrontaliers et du tourisme de proximité, qui peuvent être rapidement affectées par des crises inattendues.",
        "Plus précisément, le secteur touristique de Sebta a subi un effondrement spectaculaire, avec une chute estimée à 90% de son activité. Cette donnée est particulièrement préoccupante car le tourisme représente une part non négligeable de l'activité économique et de l'emploi dans l'enclave. Une telle baisse a des répercussions en cascade, affectant non seulement les hôtels et les restaurants, mais aussi le commerce de détail, les services de transport et l'ensemble de la chaîne de valeur touristique, engendrant des incertitudes pour les entreprises et les travailleurs locaux.",
        "Ces chiffres rappellent l'importance cruciale de la stabilité et de la prévisibilité pour le développement et le maintien d'une industrie touristique florissante. La capacité à attirer et à retenir les visiteurs dépend intrinsèquement d'un environnement sûr et accueillant. Les événements récents à Sebta mettent en exergue la nécessité pour les destinations de disposer de plans de contingence robustes et de stratégies de diversification pour atténuer les risques liés aux chocs externes."
      ]
    },
    {
      "heading": "Implications Régionales et Leçons pour le Tourisme Marocain du Nord",
      "paragraphs": [
        "Les événements survenus à Sebta, bien que circonscrites à l'enclave, ne sont pas sans conséquences pour la région frontalière marocaine. Les villes du nord du Maroc, telles que Fnideq, M'diq, Tétouan et Tanger, partagent une dynamique économique et sociale complexe avec Sebta, notamment en termes de commerce transfrontalier et de mouvements de population. Toute perturbation majeure de l'autre côté de la frontière peut potentiellement influencer les flux touristiques et commerciaux dans cette région stratégique du Royaume.",
        "Cependant, le tourisme marocain, notamment dans le nord, a démontré une capacité de résilience remarquable. Contrairement à Sebta, les destinations marocaines bénéficient d'une offre touristique plus diversifiée, allant des plages méditerranéennes et atlantiques aux villes historiques, en passant par les montagnes du Rif. Cette diversification permet au Maroc de mieux absorber les chocs et de rediriger les flux de visiteurs vers d'autres régions ou types de tourisme en cas de besoin. L'Office National Marocain du Tourisme (ONMT) joue un rôle clé dans la promotion de cette diversité et dans le ciblage de nouveaux marchés émetteurs.",
        "La situation à Sebta souligne également l'importance pour le Maroc de continuer à investir dans ses infrastructures touristiques et dans la qualité de ses services. Le développement de nouvelles zones hôtelières, l'amélioration des liaisons de transport et la formation du personnel sont des piliers essentiels pour renforcer l'attractivité et la compétitivité des destinations marocaines. Le projet de la Coupe du Monde 2030, que le Maroc co-organisera, est un catalyseur majeur pour ces investissements, promettant un essor sans précédent pour le secteur touristique sur l'ensemble du territoire, y compris dans le nord."
      ]
    },
    {
      "heading": "La Stratégie Marocaine de Développement Touristique : Diversification et Résilience",
      "paragraphs": [
        "Face aux défis régionaux et mondiaux, le Maroc a mis en place une stratégie ambitieuse pour son secteur touristique, incarnée par la Vision 2030. Cette feuille de route vise à consolider la position du Royaume comme destination touristique de premier plan, en misant sur la diversification de l'offre, la montée en gamme des infrastructures et la promotion active sur les marchés internationaux. L'objectif est de créer un tourisme durable, inclusif et créateur d'emplois, capable de générer des retombées économiques significatives pour la population marocaine.",
        "La diversification de l'offre touristique est au cœur de cette stratégie. Au-delà du tourisme balnéaire et culturel, le Maroc développe activement le tourisme d'aventure, l'écotourisme, le tourisme d'affaires et le tourisme de bien-être. Cette approche permet de toucher une clientèle plus large et de réduire la dépendance à un seul segment de marché. Les investissements se multiplient dans l'hôtellerie, avec l'émergence de concepts innovants et l'extension de grandes chaînes internationales, contribuant à l'amélioration de la qualité de l'accueil et de l'expérience client.",
        "Par ailleurs, la préparation de la Coupe du Monde 2030 représente une opportunité historique pour le Maroc d'accélérer le développement de ses infrastructures et de renforcer sa visibilité à l'échelle mondiale. Les projets d'aménagement urbain, de modernisation des aéroports et des réseaux routiers, ainsi que la construction de nouvelles installations sportives et hôtelières, bénéficieront directement au secteur touristique. Cet événement majeur est attendu pour générer des millions de visiteurs supplémentaires et pour créer des milliers d'emplois directs et indirects, consolidant ainsi la résilience du secteur face à d'éventuelles crises futures."
      ]
    },
    {
      "heading": "Renforcer l'Attractivité et la Sécurité des Destinations Marocaines",
      "paragraphs": [
        "Les événements qui secouent parfois les régions voisines du Maroc rappellent l'importance cruciale de la sécurité et de la stabilité pour l'industrie du voyage. Le Royaume a toujours fait de la sécurité des visiteurs une priorité absolue, un facteur essentiel qui contribue à sa réputation de destination sûre et accueillante. Cette image est un atout majeur, particulièrement dans un contexte international où les voyageurs sont de plus en plus attentifs aux conditions de sécurité des pays qu'ils choisissent de visiter.",
        "Pour maintenir et renforcer cette attractivité, le Maroc continue d'investir dans la promotion de ses atouts uniques. L'ONMT déploie des campagnes marketing ciblées, mettant en avant la richesse culturelle, la diversité des paysages, l'hospitalité légendaire et la gastronomie marocaine. L'objectif est de positionner le Maroc non seulement comme une destination de vacances, mais aussi comme un lieu d'investissement touristique attractif, encourageant les entreprises nationales et internationales à contribuer à son essor.",
        "En définitive, la crise traversée par Sebta, bien que regrettable, met en lumière la force et la pertinence de la stratégie touristique marocaine. En misant sur la diversification, la qualité, la sécurité et l'anticipation d'événements majeurs comme la Coupe du Monde 2030, le Maroc se dote des moyens de naviguer les incertitudes régionales et de continuer sa trajectoire de croissance. La capacité du Royaume à apprendre de ces situations et à renforcer ses propres atouts est la clé de sa résilience et de son succès durable sur la scène touristique mondiale."
      ]
    }
  ],
  "faq": [
    {
      "question": "Comment la crise à Sebta affecte-t-elle le tourisme dans les villes marocaines du nord ?",
      "answer": "La crise à Sebta peut indirectement influencer les dynamiques transfrontalières, mais les villes marocaines du nord comme Fnideq, M'diq ou Tétouan bénéficient d'une offre touristique plus diversifiée et d'une stratégie de promotion distincte. Le tourisme marocain est globalement résilient et moins dépendant des flux spécifiques à Sebta, avec des initiatives de développement propres."
    },
    {
      "question": "Quelles sont les mesures prises par le Maroc pour assurer la résilience de son secteur touristique ?",
      "answer": "Le Maroc mise sur la diversification de son offre (balnéaire, culturel, aventure, affaires), l'amélioration des infrastructures hôtelières et de transport, la promotion internationale via l'ONMT, et la sécurisation des destinations. Des projets majeurs comme la Coupe du Monde 2030 agissent comme des catalyseurs d'investissement et de visibilité."
    },
    {
      "question": "Le Maroc tire-t-il des leçons des difficultés rencontrées par ses voisins pour son propre développement touristique ?",
      "answer": "Absolument. Les situations comme celle de Sebta renforcent la conviction du Maroc quant à l'importance de la stabilité, de la diversification économique et de la qualité des services pour un tourisme durable. Elles incitent à toujours améliorer les stratégies de gestion de crise et à investir dans la sécurité et l'attractivité des destinations marocaines."
    }
  ],
  "tags": [
    "Tourisme Maroc",
    "Sebta Crise",
    "Économie Touristique",
    "Tourisme Nord Maroc",
    "ONMT",
    "Coupe du Monde 2030"
  ],
  "source": "TelQuel",
  "sourceUrl": "https://telquel.ma/instant-t/2026/10/22/sebta-chiffre-a-75-millions-deuros-les-pertes-liees-a-la-crise-et-a-90-la-chute-du-tourisme_2014510/",
  "dateIso": "2026-10-22T17:06:03.000Z",
  "dateFr": "22 octobre 2026"
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
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://siyahamag.ma/news/2026-10-22-sebta-chiffre-a-75-millions-deuros-les-pertes-liees-a-la-crise-et-a-90-la-chute-" },
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
