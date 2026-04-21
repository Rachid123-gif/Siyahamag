/**
 * Centralized articles data — one source of truth for all subcategory pages + detail pages.
 * Adding a new article here makes it appear automatically on:
 *  - the category page
 *  - a dedicated detail page at /actualites/article/[slug]
 *  - the sitemap
 */

export type Category =
  | "INVEST"
  | "GOUVERNEMENT"
  | "MARCHES"
  | "PROJETS"
  | "EVENEMENTS"
  | "GASTRONOMIE"
  | "CULTURE"
  | "TECH"
  | "REGLEMENTATION"
  | "TABLEAUX"
  | "ACADEMIQUES"

export interface Article {
  slug: string
  title: string
  summary: string
  content: string // Full markdown-like text (paragraphs separated by \n\n)
  image: string
  date: string // "10 avril 2026"
  datePublished: string // ISO 8601
  author: string
  tag: string
  category: Category
  categoryLabel: string
  categoryPath: string // "/actualites/invest" etc.
  color: string // "bg-emerald-100 text-emerald-800"
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

// ── All articles ─────────────────────────────────────────────────────
// Each article automatically gets a detail page at /actualites/article/{slug}

const RAW: Array<Omit<Article, "slug">> = [
  // INVEST
  {
    title: "Marriott annonce trois nouveaux hôtels au Maroc pour 2027",
    summary: "Le groupe américain prévoit d'investir 1,2 milliard MAD dans des établissements à Tanger, Essaouira et Dakhla, créant plus de 800 emplois directs.",
    content: `Le groupe Marriott International a officialisé l'implantation de trois nouveaux établissements au Maroc, représentant un investissement cumulé de 1,2 milliard de dirhams. Les hôtels ouvriront leurs portes d'ici fin 2027 à Tanger, Essaouira et Dakhla, trois destinations en pleine expansion.

À Tanger, le futur Marriott Marquis de 250 chambres s'inscrira dans la dynamique de la nouvelle marina. Essaouira accueillera un JW Marriott Resort & Spa de 180 chambres face à l'Atlantique, tandis que Dakhla verra l'implantation d'un W Hotel, première marque lifestyle du groupe en Afrique du Nord.

Ces trois projets généreront plus de 800 emplois directs et près de 2 500 emplois indirects selon les estimations du Ministère du Tourisme. Cet investissement s'inscrit dans la stratégie Vision 2030 du Royaume, qui vise à doubler la capacité hôtelière nationale pour accueillir 26 millions de touristes à horizon 2030.

Pour les professionnels du secteur, ces ouvertures représentent une opportunité majeure de carrière. SiyahaMag suivra de près les campagnes de recrutement qui seront lancées dès 2026.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "10 avril 2026",
    datePublished: "2026-04-10",
    author: "Rachid El Amrani",
    tag: "Hôtellerie",
    category: "INVEST",
    categoryLabel: "Invest",
    categoryPath: "/actualites/invest",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Le fonds Ithmar Capital investit 500 millions MAD dans le tourisme durable",
    summary: "Un programme ambitieux pour développer des éco-lodges dans les régions de l'Atlas et du Souss-Massa, misant sur le tourisme responsable.",
    content: `Ithmar Capital, le fonds souverain marocain dédié au tourisme, vient d'annoncer un investissement de 500 millions de dirhams dans le tourisme durable. Ce programme s'étalera sur trois ans et financera une dizaine de projets d'éco-lodges dans les régions de l'Atlas et du Souss-Massa.

L'objectif est double : préserver le patrimoine naturel et culturel tout en offrant une nouvelle proposition de valeur aux voyageurs en quête d'authenticité. Chaque éco-lodge sera construit en matériaux locaux (pisé, bois d'argan), alimenté en énergie solaire, et associera les communautés villageoises dans sa gestion.

Ce virage stratégique répond à une demande croissante. Selon Booking.com, 76% des voyageurs internationaux considèrent désormais la durabilité comme un critère important dans leur choix de destination. Pour le Maroc, c'est aussi une opportunité de diversifier l'offre touristique au-delà des grandes villes impériales.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "5 avril 2026",
    datePublished: "2026-04-05",
    author: "Fatima Zahra Bennani",
    tag: "Tourisme durable",
    category: "INVEST",
    categoryLabel: "Invest",
    categoryPath: "/actualites/invest",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Station balnéaire de Taghazout Bay : phase 2 lancée avec 3 milliards MAD",
    summary: "La deuxième phase du mégaprojet intègre un parc aquatique, un centre de congrès et 2000 nouvelles unités d'hébergement.",
    content: `La deuxième phase du projet Taghazout Bay, située à 20 km au nord d'Agadir, vient d'être officiellement lancée. Cet investissement de 3 milliards de dirhams portera la capacité totale de la station à plus de 12 000 lits d'ici 2028.

Au programme de cette nouvelle phase : un parc aquatique de nouvelle génération, un centre de congrès de 3 000 places, deux golfs 18 trous et 2 000 unités d'hébergement supplémentaires réparties entre hôtels 4 et 5 étoiles, résidences touristiques et villas de luxe.

Le projet ambitionne de faire de Taghazout Bay une destination de référence pour le tourisme haut de gamme et le MICE (Meetings, Incentives, Conferences, Exhibitions). Les retombées économiques attendues sont considérables : plus de 6 000 emplois directs à terme, et une contribution significative aux recettes touristiques nationales.`,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
    date: "28 mars 2026",
    datePublished: "2026-03-28",
    author: "Karim Tazi",
    tag: "Mégaprojets",
    category: "INVEST",
    categoryLabel: "Invest",
    categoryPath: "/actualites/invest",
    color: "bg-emerald-100 text-emerald-800",
  },

  // GOUVERNEMENT
  {
    title: "Le Gouvernement dévoile la feuille de route touristique 2026-2030",
    summary: "Le nouveau plan stratégique vise à attirer 26 millions de touristes d'ici 2030, avec des investissements massifs dans les infrastructures.",
    content: `Le Ministère du Tourisme a officiellement présenté la feuille de route 2026-2030, un plan stratégique ambitieux visant à transformer le Maroc en destination touristique de classe mondiale.

Les objectifs chiffrés sont clairs : atteindre 26 millions de touristes annuels d'ici 2030, soit près du double des 14,5 millions enregistrés en 2025. Les recettes en devises devraient dépasser les 180 milliards de dirhams, contre 105 milliards actuellement.

Pour y parvenir, le plan repose sur cinq piliers : diversification de l'offre, développement des infrastructures, formation des professionnels, transition digitale et durabilité. Un budget global de 30 milliards de dirhams sera mobilisé, combinant financements publics et partenariats privés.

La Coupe du Monde 2030, co-organisée avec l'Espagne et le Portugal, est identifiée comme un levier majeur. Les investissements dans les aéroports, le réseau ferroviaire à grande vitesse et les nouvelles capacités hôtelières permettront au Royaume d'accueillir des millions de visiteurs dans des conditions optimales.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "25 mars 2026",
    datePublished: "2026-03-25",
    author: "Karim Bennis",
    tag: "Stratégie nationale",
    category: "GOUVERNEMENT",
    categoryLabel: "Gouvernement",
    categoryPath: "/actualites/gouvernement",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    title: "Tourisme durable : le Maroc adopte une charte nationale",
    summary: "Une charte du tourisme durable est officiellement signée par l'ensemble des acteurs du secteur pour encadrer les pratiques.",
    content: `Sous l'impulsion du Ministère du Tourisme, l'ensemble des acteurs institutionnels et privés du secteur ont signé une charte nationale du tourisme durable. Ce document-cadre engage les signataires sur 12 principes fondamentaux : préservation du patrimoine, gestion responsable de l'eau, réduction des déchets, respect des communautés locales, et promotion des circuits courts.

Les hôtels classés devront désormais obtenir un label écologique dans les trois ans. Un Observatoire national du tourisme durable sera créé pour suivre les indicateurs de performance et accompagner la transition.

Cette démarche s'inscrit dans la Vision 2030 qui fait de la durabilité un pilier stratégique. Pour les professionnels, c'est aussi une opportunité de se positionner sur un segment de marché en forte croissance : les voyageurs éco-responsables représentent désormais 40% de la clientèle européenne du Maroc.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "18 mars 2026",
    datePublished: "2026-03-18",
    author: "Nadia Alaoui",
    tag: "Durabilité",
    category: "GOUVERNEMENT",
    categoryLabel: "Gouvernement",
    categoryPath: "/actualites/gouvernement",
    color: "bg-indigo-100 text-indigo-800",
  },

  // MARCHES
  {
    title: "Marrakech : taux d'occupation hôtelière record de 92% pour la saison printemps",
    summary: "Les riads et hôtels de la médina affichent complet. Le secteur crée 12 000 emplois saisonniers supplémentaires.",
    content: `La ville ocre confirme son statut de première destination touristique du Royaume. Pour la saison printemps 2026, le taux d'occupation hôtelière atteint 92%, un niveau jamais observé depuis la pandémie.

Les établissements de la médina affichent complet dans les catégories 4 et 5 étoiles, avec des réservations confirmées plusieurs mois à l'avance. Les riads de charme enregistrent une hausse de 28% de leur chiffre d'affaires par rapport à la même période de 2025.

Cette dynamique positive stimule l'emploi. Le Conseil Régional du Tourisme estime que 12 000 postes saisonniers supplémentaires ont été créés dans l'hôtellerie, la restauration et les services associés (guides, transport, artisanat).

Marrakech bénéficie de plusieurs facteurs : nouvelle liaison aérienne directe avec New York, retour des touristes asiatiques, et campagnes de promotion ciblées de l'ONMT sur les marchés européens. Le secteur se prépare déjà à une saison estivale record.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "12 mars 2026",
    datePublished: "2026-03-12",
    author: "Yasmine El Amrani",
    tag: "Marché",
    category: "MARCHES",
    categoryLabel: "Marchés",
    categoryPath: "/actualites/marches",
    color: "bg-cyan-100 text-cyan-800",
  },

  // PROJETS
  {
    title: "Coupe du Monde 2030 : le Maroc accélère la construction des stades",
    summary: "Les chantiers des six stades marocains avancent à grand rythme. Le Grand Stade de Casablanca sera le plus grand d'Afrique avec 115 000 places.",
    content: `À quatre ans de l'événement, le Maroc accélère significativement la construction des infrastructures sportives pour la Coupe du Monde 2030. Six stades, répartis sur l'ensemble du territoire, doivent être prêts à temps.

Le Grand Stade Hassan II de Casablanca sera le navire amiral avec 115 000 places, devenant le plus grand stade d'Afrique. Conçu par une équipe franco-marocaine, il intégrera les dernières innovations en matière de confort des spectateurs et de durabilité énergétique.

Les cinq autres stades concernés se trouvent à Rabat, Marrakech, Fès, Tanger et Agadir. Chacun fera l'objet de rénovations ou de constructions neuves, pour une capacité totale combinée de plus de 450 000 places.

Au-delà des stades, 15 milliards de dirhams sont consacrés aux infrastructures d'accueil : extension d'aéroports, nouveau TGV reliant les villes hôtes, construction de 200 000 chambres d'hôtel supplémentaires. Un boom d'emplois attendu dans la construction, l'hôtellerie et la restauration.`,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "20 mars 2026",
    datePublished: "2026-03-20",
    author: "Omar Tazi",
    tag: "Coupe du Monde 2030",
    category: "PROJETS",
    categoryLabel: "Projets & Fédérations",
    categoryPath: "/actualites/projets",
    color: "bg-purple-100 text-purple-800",
  },

  // EVENEMENTS
  {
    title: "Record de touristes à Essaouira pendant le festival Gnaoua",
    summary: "La 30e édition du festival Gnaoua a attiré un nombre record de visiteurs, confirmant le rayonnement culturel de la ville.",
    content: `La 30e édition du festival Gnaoua et musiques du monde d'Essaouira restera dans les annales. Avec plus de 400 000 visiteurs sur quatre jours, le festival bat tous ses records historiques de fréquentation.

La programmation exceptionnelle a attiré des mélomanes du monde entier : des maîtres gnaoua marocains aux artistes internationaux en passant par les nouvelles scènes afro-électroniques. Plus de 50 concerts gratuits ont animé les places et ruelles de la médina, classée au patrimoine mondial de l'UNESCO.

Au-delà de la dimension artistique, l'impact économique est considérable. Les hôtels, riads et maisons d'hôtes affichaient complet dans un rayon de 50 km. Les restaurateurs, commerçants et artisans rapportent des chiffres d'affaires en hausse de 35% par rapport à l'édition précédente.

Essaouira confirme ainsi son positionnement unique : une destination culturelle à dimension internationale, qui sait marier authenticité berbère et ouverture au monde. La ville prépare déjà l'édition 2027 avec l'ambition de devenir un rendez-vous incontournable de l'agenda culturel mondial.`,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=500&fit=crop",
    date: "15 mars 2026",
    datePublished: "2026-03-15",
    author: "Salma Bennani",
    tag: "Festival",
    category: "EVENEMENTS",
    categoryLabel: "Événements",
    categoryPath: "/actualites/evenements",
    color: "bg-purple-100 text-purple-800",
  },

  // GASTRONOMIE
  {
    title: "La gastronomie marocaine inscrite au patrimoine mondial de l'UNESCO",
    summary: "Le couscous, le tajine et les pâtisseries traditionnelles marocaines obtiennent une reconnaissance internationale méritée.",
    content: `C'est un jour historique pour la culture marocaine. L'UNESCO vient officiellement d'inscrire la gastronomie marocaine au patrimoine culturel immatériel de l'humanité. Cette reconnaissance salue un art culinaire transmis de génération en génération, à la croisée des influences berbères, arabes, africaines et méditerranéennes.

Trois éléments ont été particulièrement distingués dans le dossier : le couscous du vendredi (repas rituel familial), les tajines et leur diversité régionale, ainsi que la tradition pâtissière marocaine (cornes de gazelle, chebakia, briouates).

Cette inscription représente un levier touristique majeur. Le tourisme gastronomique est l'un des segments en plus forte croissance au niveau mondial, avec des dépenses moyennes par voyageur 30% supérieures à la moyenne. Le Maroc dispose maintenant d'un atout internationalement reconnu pour attirer cette clientèle exigeante.

Le Ministère de l'Artisanat et de l'Économie sociale annonce le lancement d'un programme de labellisation des restaurants traditionnels, ainsi qu'un soutien renforcé aux écoles de cuisine marocaines pour préserver et transmettre ce savoir-faire unique.`,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop",
    date: "22 mars 2026",
    datePublished: "2026-03-22",
    author: "Fatima Zahra Idrissi",
    tag: "UNESCO",
    category: "GASTRONOMIE",
    categoryLabel: "Gastronomie",
    categoryPath: "/actualites/gastronomie",
    color: "bg-rose-100 text-rose-800",
  },

  // CULTURE
  {
    title: "Chefchaouen bat son record de fréquentation touristique en 2025",
    summary: "La ville bleue du Rif a accueilli plus de 500 000 visiteurs, portée par les réseaux sociaux.",
    content: `Chefchaouen, la perle bleue du Rif, vit une année exceptionnelle. Avec 500 000 visiteurs enregistrés en 2025, la ville double sa fréquentation par rapport à 2023 et confirme son statut de destination Instagram.

Ce phénomène s'explique par plusieurs facteurs. D'abord, les réseaux sociaux : les ruelles bleues, les portes en fer forgé et les vues sur les montagnes du Rif sont devenues virales sur TikTok et Instagram. Ensuite, l'amélioration des infrastructures : nouvelles routes, parkings aménagés, office du tourisme digitalisé.

Mais cette popularité soudaine pose aussi des défis. Les autorités locales mettent en place un plan de gestion des flux pour préserver l'authenticité de la médina. Quotas journaliers, aménagement de parcours alternatifs et sensibilisation au respect des habitants sont au programme.

Pour les investisseurs, Chefchaouen représente une opportunité attractive. Les maisons d'hôtes sont en forte demande, avec un retour sur investissement moyen de 8 ans selon les agences locales. Le secteur crée aussi de nombreux emplois : guides, restaurateurs, artisans d'art.`,
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=500&fit=crop",
    date: "7 mars 2026",
    datePublished: "2026-03-07",
    author: "Amina Kettani",
    tag: "Destination",
    category: "CULTURE",
    categoryLabel: "Culture & Patrimoine",
    categoryPath: "/actualites/culture",
    color: "bg-pink-100 text-pink-800",
  },

  // TECH
  {
    title: "L'intelligence artificielle transforme l'expérience client dans les hôtels marocains",
    summary: "Chatbots, conciergerie virtuelle et recommandations personnalisées : les grands hôtels du Maroc adoptent l'IA.",
    content: `L'intelligence artificielle n'est plus de la science-fiction dans les palaces marocains. De Marrakech à Tanger, les grands hôtels déploient massivement des solutions IA pour personnaliser l'expérience client et optimiser leurs opérations.

Les chatbots multilingues traitent désormais 70% des demandes courantes : réservations de restaurant, informations sur les activités, demandes de service de chambre. Cette automatisation libère les équipes pour des interactions à plus forte valeur ajoutée.

Plus impressionnant encore : les systèmes de conciergerie virtuelle anticipent les besoins des clients. En analysant l'historique de séjour, les préférences alimentaires et les avis laissés sur les plateformes, l'IA suggère des expériences sur mesure : excursion spécifique, menu adapté, ambiance de chambre personnalisée.

Cette transformation digitale n'élimine pas les emplois mais les fait évoluer. Les réceptionnistes deviennent des "digital concierges", les équipes marketing utilisent des outils prédictifs pour cibler les campagnes. De nouveaux métiers émergent : data scientist hôtelier, spécialiste en expérience client augmentée.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "15 mars 2026",
    datePublished: "2026-03-15",
    author: "Hassan Chraibi",
    tag: "Intelligence artificielle",
    category: "TECH",
    categoryLabel: "Tech & Innovation",
    categoryPath: "/thematiques/tech",
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "Les startups marocaines du tourisme lèvent 120 millions MAD en 2025",
    summary: "L'écosystème TravelTech marocain attire de plus en plus d'investisseurs, avec des solutions innovantes pour la réservation, le transport et l'hébergement.",
    content: `L'écosystème TravelTech marocain confirme sa maturité. En 2025, les startups du secteur ont levé un total de 120 millions de dirhams, soit une hausse de 65% par rapport à 2024. Un signal fort envoyé aux investisseurs internationaux qui repèrent le potentiel du Maroc.

Parmi les levées notables : Bookiner (plateforme de réservation de riads authentiques) a levé 35 millions, Tour.ma (marketplace de guides touristiques) a bouclé un tour de 20 millions, et BerberStay (startup d'hébergement chez l'habitant dans l'Atlas) a obtenu 15 millions.

Les investisseurs viennent autant du Maroc que de l'étranger : family offices du Golfe, VC européens spécialisés travel, et le nouveau fonds 212 Capital dédié aux startups marocaines. Cette diversification sécurise l'écosystème à long terme.

Pour les talents, c'est une opportunité unique. Les postes de product managers, développeurs, UX designers spécialisés dans le travel se multiplient avec des rémunérations supérieures à la moyenne du marché tech marocain.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "1 mars 2026",
    datePublished: "2026-03-01",
    author: "Omar Bennani",
    tag: "TravelTech",
    category: "TECH",
    categoryLabel: "Tech & Innovation",
    categoryPath: "/thematiques/tech",
    color: "bg-blue-100 text-blue-800",
  },

  // REGLEMENTATION
  {
    title: "Nouvelle loi sur les locations touristiques : ce qui change en 2026",
    summary: "Le cadre juridique des locations saisonnières et des plateformes en ligne est renforcé avec de nouvelles obligations.",
    content: `La loi 78-23 sur les locations touristiques entre en vigueur en 2026 et modifie significativement le paysage pour les propriétaires et gestionnaires. Elle encadre plus strictement les pratiques des plateformes comme Airbnb, Booking ou Vrbo.

Les principales nouveautés : obligation d'enregistrement auprès de la Wilaya, plafond annuel de 120 nuits pour les résidences principales, déclaration fiscale simplifiée via un guichet unique, et obligation de remise d'un document d'information au locataire.

Les plateformes ont 6 mois pour se mettre en conformité. Elles devront vérifier les numéros d'enregistrement avant publication d'annonces, transmettre les données de réservation aux autorités fiscales, et informer leurs utilisateurs des obligations locales.

Pour les propriétaires de riads et maisons d'hôtes, cette loi clarifie enfin un cadre qui restait flou. Elle favorise une concurrence saine entre l'offre professionnelle et les locations occasionnelles, tout en protégeant le tissu urbain contre la gentrification excessive des médinas historiques.`,
    image: "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=800&h=500&fit=crop",
    date: "20 mars 2026",
    datePublished: "2026-03-20",
    author: "Mounia Fassi",
    tag: "Législation",
    category: "REGLEMENTATION",
    categoryLabel: "Réglementation",
    categoryPath: "/thematiques/reglementation",
    color: "bg-amber-100 text-amber-800",
  },
]

export const ALL_ARTICLES: Article[] = RAW.map((a) => ({
  ...a,
  slug: slugify(a.title),
}))

export function getArticleBySlug(slug: string): Article | undefined {
  // Try exact match first
  const exact = ALL_ARTICLES.find((a) => a.slug === slug)
  if (exact) return exact
  // Fallback: partial match (first 30 chars) to handle truncated slugs
  const partial = ALL_ARTICLES.find((a) =>
    a.slug.startsWith(slug.slice(0, 30)) || slug.startsWith(a.slug.slice(0, 30))
  )
  return partial
}

export function getArticlesByCategory(category: Category): Article[] {
  return ALL_ARTICLES.filter((a) => a.category === category)
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return []
  return ALL_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category
  ).slice(0, limit)
}
