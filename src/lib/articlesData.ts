/**
 * Centralized articles data — ONE SOURCE OF TRUTH for:
 *  - every category page (/actualites/<cat>)
 *  - every thematique page (/thematiques/<theme>)
 *  - the homepage "Dernières actualités" block
 *  - the /actualites listing
 *  - every detail page at /actualites/article/[slug]
 *  - the sitemap
 *
 * Slug is auto-generated from the title via slugify(), so every title
 * referenced anywhere in the app is guaranteed to resolve to a real
 * detail page. Add articles HERE — never hardcode them in a page.
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
  content: string // markdown-like text (paragraphs separated by \n\n)
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

export function slugify(text: string): string {
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

// ── Per-category metadata (label, path, badge color) ─────────────────
const CAT_META: Record<
  Category,
  { label: string; path: string; color: string }
> = {
  INVEST: {
    label: "Invest",
    path: "/actualites/invest",
    color: "bg-emerald-100 text-emerald-800",
  },
  GOUVERNEMENT: {
    label: "Gouvernement",
    path: "/actualites/gouvernement",
    color: "bg-amber-100 text-amber-800",
  },
  MARCHES: {
    label: "Marchés",
    path: "/actualites/marches",
    color: "bg-cyan-100 text-cyan-800",
  },
  PROJETS: {
    label: "Projets & Fédérations",
    path: "/actualites/projets",
    color: "bg-orange-100 text-orange-800",
  },
  EVENEMENTS: {
    label: "Événements",
    path: "/actualites/evenements",
    color: "bg-rose-100 text-rose-800",
  },
  GASTRONOMIE: {
    label: "Gastronomie",
    path: "/actualites/gastronomie",
    color: "bg-yellow-100 text-yellow-800",
  },
  CULTURE: {
    label: "Culture & Patrimoine",
    path: "/actualites/culture",
    color: "bg-indigo-100 text-indigo-800",
  },
  TECH: {
    label: "Tech & Innovation",
    path: "/thematiques/tech",
    color: "bg-blue-100 text-blue-800",
  },
  REGLEMENTATION: {
    label: "Réglementation",
    path: "/thematiques/reglementation",
    color: "bg-amber-100 text-amber-800",
  },
  TABLEAUX: {
    label: "Tableaux de bord",
    path: "/thematiques/tableaux-de-bord",
    color: "bg-emerald-100 text-emerald-800",
  },
  ACADEMIQUES: {
    label: "Académiques",
    path: "/thematiques/academiques",
    color: "bg-purple-100 text-purple-800",
  },
}

type RawArticle = {
  title: string
  summary: string
  content: string
  image: string
  date: string
  datePublished: string
  author: string
  tag: string
  category: Category
}

// ── All articles ─────────────────────────────────────────────────────

const RAW: RawArticle[] = [
  // ── INVEST ────────────────────────────────────────────────────────
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
  },
  {
    title: "Le fonds Ithmar Capital investit 500 millions MAD dans le tourisme durable",
    summary: "Un programme ambitieux pour développer des éco-lodges dans les régions de l'Atlas et du Souss-Massa, misant sur le tourisme responsable.",
    content: `Ithmar Capital, le fonds souverain marocain dédié au tourisme, vient d'annoncer un investissement de 500 millions de dirhams dans le tourisme durable. Ce programme s'étalera sur trois ans et financera une dizaine de projets d'éco-lodges dans les régions de l'Atlas et du Souss-Massa.

L'objectif est double : préserver le patrimoine naturel et culturel tout en offrant une nouvelle proposition de valeur aux voyageurs en quête d'authenticité. Chaque éco-lodge sera construit en matériaux locaux (pisé, bois d'argan), alimenté en énergie solaire, et associera les communautés villageoises dans sa gestion.

Ce virage stratégique répond à une demande croissante. Selon Booking.com, 76% des voyageurs internationaux considèrent désormais la durabilité comme un critère important dans leur choix de destination. Pour le Maroc, c'est aussi une opportunité de diversifier l'offre touristique au-delà des grandes villes impériales.

Les premiers éco-lodges ouvriront en 2027 à Imlil, Ait Bougmez et Tafraout. Le fonds prévoit la création de près de 1 200 emplois locaux directs et indirects sur la durée du programme.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "5 avril 2026",
    datePublished: "2026-04-05",
    author: "Fatima Zahra Bennani",
    tag: "Tourisme durable",
    category: "INVEST",
  },
  {
    title: "Station balnéaire de Taghazout Bay : phase 2 lancée avec 3 milliards MAD",
    summary: "La deuxième phase du mégaprojet intègre un parc aquatique, un centre de congrès et 2000 nouvelles unités d'hébergement.",
    content: `La deuxième phase du projet Taghazout Bay, située à 20 km au nord d'Agadir, vient d'être officiellement lancée. Cet investissement de 3 milliards de dirhams portera la capacité totale de la station à plus de 12 000 lits d'ici 2028.

Au programme de cette nouvelle phase : un parc aquatique de nouvelle génération, un centre de congrès de 3 000 places, deux golfs 18 trous et 2 000 unités d'hébergement supplémentaires réparties entre hôtels 4 et 5 étoiles, résidences touristiques et villas de luxe.

Le projet ambitionne de faire de Taghazout Bay une destination de référence pour le tourisme haut de gamme et le MICE (Meetings, Incentives, Conferences, Exhibitions). Les retombées économiques attendues sont considérables : plus de 6 000 emplois directs à terme, et une contribution significative aux recettes touristiques nationales.

Les premiers équipements de cette seconde phase seront livrés en 2027 pour être opérationnels lors de la Coupe du Monde 2030. La région Souss-Massa prévoit également un plan de mise à niveau du réseau routier et du réseau d'eau potable.`,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
    date: "28 mars 2026",
    datePublished: "2026-03-28",
    author: "Karim Tazi",
    tag: "Mégaprojets",
    category: "INVEST",
  },

  // ── GOUVERNEMENT ──────────────────────────────────────────────────
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
  },
  {
    title: "Tourisme durable : le Maroc adopte une charte nationale",
    summary: "Une charte du tourisme durable est officiellement signée par l'ensemble des acteurs du secteur pour encadrer les pratiques.",
    content: `Sous l'impulsion du Ministère du Tourisme, l'ensemble des acteurs institutionnels et privés du secteur ont signé une charte nationale du tourisme durable. Ce document-cadre engage les signataires sur 12 principes fondamentaux : préservation du patrimoine, gestion responsable de l'eau, réduction des déchets, respect des communautés locales, et promotion des circuits courts.

Les hôtels classés devront désormais obtenir un label écologique dans les trois ans. Un Observatoire national du tourisme durable sera créé pour suivre les indicateurs de performance et accompagner la transition.

Cette démarche s'inscrit dans la Vision 2030 qui fait de la durabilité un pilier stratégique. Pour les professionnels, c'est aussi une opportunité de se positionner sur un segment de marché en forte croissance : les voyageurs éco-responsables représentent désormais 40% de la clientèle européenne du Maroc.

Le Fonds Vert du Tourisme, doté de 500 millions MAD, financera les mises à niveau des établissements. Les premières certifications seront délivrées au printemps 2027.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "18 mars 2026",
    datePublished: "2026-03-18",
    author: "Nadia Alaoui",
    tag: "Durabilité",
    category: "GOUVERNEMENT",
  },
  {
    title: "Vision 2030 : le gouvernement rehausse l'objectif à 26 millions de touristes",
    summary: "La ministre du Tourisme a présenté la feuille de route actualisée qui prévoit un doublement des capacités d'hébergement et une diversification des marchés émetteurs.",
    content: `La ministre du Tourisme a dévoilé cette semaine la version actualisée de la feuille de route Vision 2030. Le nouvel objectif, fixé à 26 millions de touristes annuels, marque une ambition accrue par rapport au palier précédent de 20 millions.

Cette révision s'appuie sur une dynamique de fond : le Maroc a franchi le cap des 15 millions de visiteurs en 2025, avec une croissance à deux chiffres sur la plupart des marchés émetteurs. La Coupe du Monde 2030 doit agir comme accélérateur, mais l'essentiel des gains est attendu sur le tourisme de loisirs et le MICE.

Le plan prévoit un doublement de la capacité hôtelière classée, la création de 200 000 emplois directs supplémentaires et l'ouverture de nouvelles liaisons aériennes long-courrier. Un budget cumulé de 80 milliards MAD sera mobilisé entre investissement public et partenariats privés.

Les régions de Dakhla, Agadir et Essaouira sont identifiées comme axes prioritaires, aux côtés des destinations historiques de Marrakech et Fès. Un comité interministériel se réunira tous les trois mois pour piloter l'exécution.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "12 avril 2026",
    datePublished: "2026-04-12",
    author: "Youssef Amrani",
    tag: "Vision 2030",
    category: "GOUVERNEMENT",
  },
  {
    title: "Simplification des visas : le Maroc ouvre ses portes à 30 nouveaux pays",
    summary: "La nouvelle politique de visa électronique vise à faciliter l'accès au territoire marocain pour les touristes d'Asie et d'Amérique latine, un levier majeur de croissance.",
    content: `Le ministère des Affaires étrangères a annoncé l'élargissement du dispositif de visa électronique à 30 nouveaux pays, couvrant désormais l'essentiel de l'Asie du Sud-Est, une partie de l'Amérique latine et certains pays du Golfe persique non couverts.

La demande se fait désormais entièrement en ligne, avec un traitement sous 72 heures et un coût réduit de 40 %. Les autorités marocaines anticipent une hausse de 20 % des arrivées en provenance de ces marchés dès la première année du dispositif.

Cette mesure s'accompagne d'une stratégie de promotion renforcée de l'ONMT, qui ouvrira six nouvelles antennes à l'étranger. L'objectif est de faire connaître la diversité de l'offre marocaine au-delà des marchés traditionnels européens.

Les professionnels du secteur saluent cette réforme attendue de longue date. Pour les agences de voyage, elle ouvre la voie à la création de nouveaux circuits combinés et de forfaits sur mesure adaptés à ces clientèles émergentes.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "6 avril 2026",
    datePublished: "2026-04-06",
    author: "Leila Berrada",
    tag: "Politique de visa",
    category: "GOUVERNEMENT",
  },
  {
    title: "Budget 2026 : 8 milliards MAD pour les infrastructures touristiques",
    summary: "Le projet de loi de finances consacre une enveloppe record au secteur, avec un focus sur les routes d'accès, les aérogares et la formation professionnelle.",
    content: `Le projet de loi de finances 2026 réserve 8 milliards de dirhams aux infrastructures touristiques, un montant historique qui confirme la priorité accordée au secteur par le gouvernement.

L'enveloppe est répartie entre trois grands postes : 3,5 milliards pour les routes d'accès et les liaisons aériennes, 2,5 milliards pour les aérogares et les gares ferroviaires, et 2 milliards pour la formation professionnelle et la mise à niveau des instituts hôteliers.

Les aéroports de Marrakech-Ménara, d'Agadir-Al Massira et de Tanger-Ibn Battouta bénéficieront de rénovations importantes en prévision de la Coupe du Monde 2030. Cinq nouveaux centres de formation professionnelle aux métiers du tourisme ouvriront également leurs portes dès la rentrée 2026.

Cette rallonge budgétaire est complétée par des lignes de crédit avantageuses proposées par la Caisse de Dépôt et de Gestion aux investisseurs privés. Au total, l'effet de levier devrait générer plus de 25 milliards MAD d'investissements touristiques cumulés.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "1 avril 2026",
    datePublished: "2026-04-01",
    author: "Hassan Ouazzani",
    tag: "Budget",
    category: "GOUVERNEMENT",
  },
  {
    title: "Accord-cadre entre le ministère et les régions pour le tourisme rural",
    summary: "Douze régions signent un partenariat stratégique pour développer le tourisme de nature, les circuits de randonnée et les hébergements chez l'habitant.",
    content: `Les douze régions du Royaume ont signé avec le ministère du Tourisme un accord-cadre structurant pour le développement du tourisme rural. Ce partenariat prévoit la création de cinquante circuits de randonnée labellisés et la mise à niveau de 1 200 hébergements chez l'habitant.

Le dispositif cible les zones montagneuses, les oasis et l'arrière-pays des destinations balnéaires. Chaque région s'engage à cofinancer les aménagements à hauteur de 30 % et à mettre en place une gouvernance locale associant collectivités, professionnels et associations villageoises.

Le tourisme rural représente aujourd'hui moins de 5 % des nuitées touristiques au Maroc, alors qu'il atteint 20 % dans certains pays européens comparables. L'accord fixe un objectif de triplement de cette part à horizon 2030.

Les premiers itinéraires labellisés seront opérationnels dès l'été 2026 dans le Haut Atlas, l'Anti-Atlas et le Rif. Un programme spécifique de formation des accompagnateurs de montagne accompagnera ce déploiement.`,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "25 mars 2026",
    datePublished: "2026-03-25",
    author: "Amina El Fassi",
    tag: "Tourisme rural",
    category: "GOUVERNEMENT",
  },

  // ── MARCHES ───────────────────────────────────────────────────────
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
  },
  {
    title: "Taux d'occupation record de 72% au premier trimestre 2026",
    summary: "Les hôtels classés du Maroc affichent un taux d'occupation en hausse de 5 points, tiré par la reprise des marchés européens et l'essor du tourisme interne.",
    content: `Au premier trimestre 2026, le taux d'occupation moyen des hôtels classés marocains atteint 72 %, soit 5 points de plus qu'à la même période en 2025. L'Observatoire du Tourisme salue une performance inédite depuis la crise sanitaire.

La progression est particulièrement marquée sur les marchés français, britannique et allemand, qui retrouvent leurs niveaux de fréquentation d'avant 2019. Le tourisme intérieur joue également un rôle majeur : les courts séjours marocains ont bondi de 18 % par rapport à 2025.

Les établissements 4 et 5 étoiles tirent la moyenne vers le haut avec un taux d'occupation frôlant les 80 %. Les hôtels économiques affichent une performance plus mesurée mais toujours en hausse, autour de 58 %.

Cette embellie se traduit par une revalorisation des tarifs moyens, un indicateur clé de la rentabilité du secteur. Les professionnels anticipent un maintien de la dynamique sur le second trimestre, porté par les événements de printemps et la Coupe d'Afrique des Nations.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "11 avril 2026",
    datePublished: "2026-04-11",
    author: "Mehdi Alaoui",
    tag: "Occupation hôtelière",
    category: "MARCHES",
  },
  {
    title: "Marrakech : première destination du continent africain selon Euromonitor",
    summary: "Le classement mondial 2026 place Marrakech devant Le Cap et Le Caire, confirmant l'attractivité de la Ville rouge auprès des voyageurs internationaux.",
    content: `Le cabinet Euromonitor a publié son classement annuel des 100 destinations les plus visitées au monde. Marrakech s'impose en tête des villes africaines avec 3,8 millions de visiteurs internationaux en 2025, devançant Le Cap et Le Caire.

La Ville rouge doit cette performance à plusieurs facteurs : une offre d'hébergement diversifiée allant du riad au palace cinq étoiles, une accessibilité aérienne exceptionnelle avec plus de 30 vols directs quotidiens depuis l'Europe, et une offre culturelle renouvelée autour de la médina classée UNESCO.

Marrakech progresse également dans le classement mondial, passant de la 44e à la 37e place en un an. Elle devance désormais des destinations établies comme Vienne ou Prague sur le critère des arrivées internationales.

Les professionnels locaux soulignent toutefois l'importance de maîtriser la croissance pour préserver l'authenticité du patrimoine. Le plan d'action 2026-2028 du Conseil Régional prévoit notamment une régulation des locations touristiques dans la médina.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "4 avril 2026",
    datePublished: "2026-04-04",
    author: "Sara Filali",
    tag: "Classement mondial",
    category: "MARCHES",
  },
  {
    title: "Le marché chinois en forte progression : +45% d'arrivées en 2025",
    summary: "Les touristes chinois découvrent le Maroc en masse, attirés par les vols directs Pékin-Casablanca et les campagnes promotionnelles ciblées de l'ONMT.",
    content: `Les arrivées de touristes chinois au Maroc ont bondi de 45 % en 2025 pour atteindre 280 000 visiteurs. Cette croissance spectaculaire confirme la pertinence de la stratégie d'ouverture aux marchés asiatiques adoptée depuis 2023.

Trois facteurs expliquent cette dynamique : la nouvelle liaison directe Royal Air Maroc entre Pékin et Casablanca, la levée totale de l'obligation de visa pour les ressortissants chinois, et une campagne promotionnelle de l'ONMT ciblée sur les grandes villes chinoises.

Les touristes chinois privilégient les circuits culturels combinant Marrakech, Fès, Chefchaouen et le désert. Leur durée moyenne de séjour est de 9 jours, supérieure à la moyenne nationale, et leur budget par voyageur atteint 18 000 MAD.

Pour 2026, l'ONMT vise 400 000 arrivées chinoises. Une nouvelle campagne en mandarin est en préparation sur les plateformes digitales WeChat et Weibo, et des formations linguistiques sont proposées aux guides et aux réceptionnistes des grands hôtels.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "27 mars 2026",
    datePublished: "2026-03-27",
    author: "Kamal Idrissi",
    tag: "Marchés émetteurs",
    category: "MARCHES",
  },
  {
    title: "Revenus touristiques : le Maroc franchit le cap des 110 milliards MAD",
    summary: "Les recettes touristiques du royaume atteignent un nouveau sommet, soutenues par la montée en gamme de l'offre et l'augmentation du panier moyen des visiteurs.",
    content: `Les recettes touristiques du Maroc ont franchi pour la première fois le cap symbolique des 110 milliards de dirhams en 2025. Ce résultat, annoncé par Bank Al-Maghrib, marque une hausse de 14 % par rapport à l'année précédente.

Cette progression traduit à la fois la hausse du nombre de visiteurs et l'augmentation du panier moyen par touriste. Ce dernier s'établit désormais à 7 400 MAD, soit une croissance de 8 % sur un an.

La montée en gamme de l'offre joue un rôle déterminant. Les nouveaux resorts de Taghazout Bay, de Saïdia et du Bouregreg attirent une clientèle à plus fort pouvoir d'achat, notamment en provenance du Moyen-Orient et des États-Unis.

Les recettes touristiques représentent désormais 11 % du PIB marocain, confirmant la place centrale du secteur dans l'économie nationale. Elles constituent également la première source de devises du pays, devant les transferts des Marocains résidant à l'étranger.`,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=500&fit=crop",
    date: "18 mars 2026",
    datePublished: "2026-03-18",
    author: "Zineb Lahlou",
    tag: "Recettes",
    category: "MARCHES",
  },

  // ── PROJETS ───────────────────────────────────────────────────────
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
  },
  {
    title: "Coupe du Monde 2030 : 14 stades et 200 000 chambres d'hôtel en préparation",
    summary: "Le Maroc accélère la construction des infrastructures pour accueillir le Mondial aux côtés de l'Espagne et du Portugal, un investissement colossal de 52 milliards MAD.",
    content: `Le comité marocain d'organisation a dévoilé le chiffrage définitif des infrastructures prévues pour la Coupe du Monde 2030 : 14 stades rénovés ou construits et 200 000 chambres d'hôtel additionnelles. L'enveloppe totale mobilisée atteint 52 milliards de dirhams.

Six stades accueilleront des matchs officiels de la compétition, tandis que huit autres serviront de centres d'entraînement aux équipes qualifiées. Chacun répond au cahier des charges FIFA avec pelouses chauffées, écrans géants 8K et systèmes d'évacuation modélisés pour évacuer un stade plein en moins de huit minutes.

L'effort hôtelier mobilise l'ensemble des grandes chaînes internationales et des opérateurs marocains. Les régions hôtes s'engagent à livrer 200 000 chambres supplémentaires, dont 30 % seront converties en hébergement saisonnier après la Coupe du Monde.

Parallèlement, la montée en compétence des personnels hôteliers est accélérée. L'Office de la Formation Professionnelle prévoit la formation de 120 000 nouveaux professionnels d'ici 2030 dans les métiers de la réception, de la restauration et de la maintenance.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "13 avril 2026",
    datePublished: "2026-04-13",
    author: "Omar Benjelloun",
    tag: "Mondial 2030",
    category: "PROJETS",
  },
  {
    title: "L'ONMT lance une campagne mondiale Morocco Land of Light",
    summary: "L'Office national marocain du tourisme déploie une campagne sur 5 continents avec un budget de 800 millions MAD pour positionner le Maroc comme destination premium.",
    content: `L'Office National Marocain du Tourisme a officiellement lancé sa nouvelle campagne mondiale baptisée "Morocco, Land of Light". Déployée simultanément sur les cinq continents, elle mobilise un budget record de 800 millions de dirhams sur trois ans.

La campagne joue sur les contrastes lumineux qui caractérisent le Maroc : le bleu de Chefchaouen, l'ocre de Marrakech, le doré des dunes de Merzouga, le blanc d'Essaouira. Elle articule films courts, contenus sociaux immersifs et partenariats avec les grandes plateformes de streaming.

Huit marchés prioritaires sont ciblés : France, Espagne, Royaume-Uni, Allemagne, États-Unis, Chine, Émirats arabes unis et Brésil. Pour chacun, un plan média spécifique est déployé, incluant affichage aéroportuaire, sponsoring sportif et influenceurs locaux.

L'objectif chiffré est d'atteindre 26 millions de touristes en 2030. La nouvelle campagne vient compléter les efforts de développement de l'offre et de montée en gamme menés par le ministère du Tourisme et les opérateurs privés.`,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "7 avril 2026",
    datePublished: "2026-04-07",
    author: "Samira Kettani",
    tag: "ONMT",
    category: "PROJETS",
  },
  {
    title: "LGV Marrakech-Agadir : mise en service prévue pour 2028",
    summary: "La ligne à grande vitesse reliant les deux villes touristiques majeures du sud réduira le temps de trajet à 1h15, ouvrant de nouvelles perspectives pour le tourisme de circuit.",
    content: `La ligne à grande vitesse Marrakech-Agadir entrera en service en 2028, a confirmé l'ONCF lors d'un point d'étape organisé cette semaine. Les travaux progressent selon le calendrier initial, avec 70 % de l'ouvrage déjà réalisé.

Cette LGV de 280 kilomètres réduira le temps de trajet entre les deux pôles touristiques majeurs du sud à seulement 1 h 15, contre plus de 3 heures actuellement en voiture. La fréquence prévue est de huit allers-retours quotidiens en service commercial.

L'ouvrage comprend trois gares intermédiaires situées à Chichaoua, Imintanoute et Oulad Teima. Ces arrêts permettront de desservir l'arrière-pays et de développer de nouveaux circuits touristiques combinant montagne, campagne et littoral.

Pour les professionnels du tourisme, cette LGV est une opportunité majeure. Elle facilitera notamment les séjours combinés Marrakech-Agadir qui figurent en tête des attentes des tour-opérateurs internationaux, et ouvrira de nouvelles possibilités pour les excursions d'une journée entre les deux villes.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "30 mars 2026",
    datePublished: "2026-03-30",
    author: "Youssef Benali",
    tag: "Infrastructure",
    category: "PROJETS",
  },
  {
    title: "Fédération du tourisme : un plan d'urgence pour la formation de 50 000 jeunes",
    summary: "La CNT et les fédérations régionales s'engagent à former massivement les jeunes Marocains aux métiers de l'hôtellerie et de la restauration avant 2030.",
    content: `La Confédération Nationale du Tourisme (CNT) et les douze fédérations régionales ont signé un plan d'urgence pour la formation de 50 000 jeunes Marocains aux métiers de l'hôtellerie et de la restauration d'ici 2030.

Le dispositif mobilise 2 milliards de dirhams, dont la moitié apportée par le secteur privé. Il cible en priorité les jeunes de 18 à 29 ans en décrochage scolaire ou sans emploi, avec des programmes de formation accélérée de 6 à 18 mois.

Les formations couvrent tous les métiers en tension : réception, service en salle, cuisine, housekeeping, animation, management hôtelier. Chaque stagiaire bénéficie d'une bourse mensuelle, d'un tutorat en entreprise et d'une promesse d'embauche à l'issue du parcours.

Dix nouveaux centres de formation seront construits dans les régions de Marrakech, Agadir, Tanger et Dakhla, en plus de la mise à niveau des établissements existants. Les premières promotions entreront en formation dès la rentrée 2026.`,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&h=500&fit=crop",
    date: "22 mars 2026",
    datePublished: "2026-03-22",
    author: "Kenza El Ghali",
    tag: "Formation",
    category: "PROJETS",
  },

  // ── EVENEMENTS ────────────────────────────────────────────────────
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
  },
  {
    title: "FITUR Africa 2026 : Marrakech accueille le plus grand salon du tourisme africain",
    summary: "Plus de 3 000 exposants et 80 pays représentés au Palais des Congrès de Marrakech pour la première édition africaine du salon espagnol de référence.",
    content: `Le Palais des Congrès de Marrakech a inauguré cette semaine la première édition africaine du salon FITUR, référence mondiale du tourisme portée depuis 1981 par l'IFEMA Madrid. L'événement rassemble 3 000 exposants originaires de 80 pays sur quatre jours.

Le Maroc y occupe une place centrale avec un pavillon national de 3 000 mètres carrés mettant en scène les douze régions du Royaume. Les organisations internationales présentes saluent le choix de Marrakech, premier port d'entrée touristique du continent africain.

Au programme : plus de 200 conférences thématiques sur le tourisme durable, les nouvelles technologies appliquées au voyage, la formation aux métiers du tourisme et les nouveaux marchés émetteurs. Des speed-meetings B2B sont également organisés entre professionnels.

L'édition 2026 de FITUR Africa marque la volonté de Marrakech de s'imposer comme capitale africaine du MICE. Le Conseil Régional du Tourisme annonce déjà trois autres événements internationaux pour 2027.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "9 avril 2026",
    datePublished: "2026-04-09",
    author: "Rachida Bouhia",
    tag: "Salon professionnel",
    category: "EVENEMENTS",
  },
  {
    title: "Festival de Fès des musiques sacrées : 30e édition sous le signe de la paix",
    summary: "L'édition anniversaire du célèbre festival réunira des artistes de 25 pays autour du thème du dialogue interreligieux, attirant 100 000 visiteurs attendus.",
    content: `Le Festival de Fès des musiques sacrées du monde célèbrera sa 30e édition en juin 2026 sous le signe du dialogue interreligieux. Créé en 1994, il reste l'un des plus anciens et prestigieux festivals de musique du monde arabe.

L'édition anniversaire rassemblera des artistes de 25 pays, dont plusieurs icônes mondiales de la musique soufie, des chœurs orthodoxes, des maîtres du chant grégorien et des voix juives séfarades. Sept lieux patrimoniaux de la médina accueilleront les concerts.

Le Conseil Régional Fès-Meknès a renforcé ses moyens pour cette édition anniversaire : une campagne de communication internationale est déployée, un partenariat avec Arte pour une diffusion télévisée de plusieurs concerts, et des formations d'accueil dédiées pour les professionnels de la ville.

Plus de 100 000 festivaliers sont attendus, un record pour cet événement historiquement confidentiel. Les retombées économiques estimées pour la région dépassent les 150 millions de dirhams, toutes activités touristiques confondues.`,
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=500&fit=crop",
    date: "3 avril 2026",
    datePublished: "2026-04-03",
    author: "Ahmed Tazi",
    tag: "Festival",
    category: "EVENEMENTS",
  },
  {
    title: "Morocco Tourism Awards : les lauréats 2026 dévoilés",
    summary: "La cérémonie récompense les meilleurs établissements, expériences et initiatives durables du tourisme marocain, avec une catégorie spéciale innovation digitale.",
    content: `La quatrième édition des Morocco Tourism Awards s'est tenue au Palais des Arts de Rabat devant 800 professionnels du secteur. Vingt-deux trophées ont été décernés dans des catégories couvrant l'ensemble de la chaîne de valeur touristique.

Le prix du Meilleur Hôtel 5 étoiles revient cette année au Royal Mansour Marrakech pour sa récente rénovation. Dans la catégorie Riad, le Riad Laaroussa de Fès est distingué pour son engagement en faveur des artisans locaux. Le prix Développement Durable récompense le projet Ecolodge Atlas Kasbah à Agadir.

Une nouvelle catégorie a été créée cette année : Innovation Digitale. Elle est remportée par la startup TourMarocain, qui a développé une application de réalité augmentée pour la visite des médinas. Le prix Espoir va au jeune chef Yassine Kadiri pour sa table "Rahba" à Essaouira.

Les lauréats bénéficient d'une mise en avant dans les supports de l'ONMT et d'un accompagnement au développement international. L'édition 2027 sera organisée à Tanger, première fois au nord du Royaume.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "26 mars 2026",
    datePublished: "2026-03-26",
    author: "Laila Benjelloun",
    tag: "Cérémonie",
    category: "EVENEMENTS",
  },
  {
    title: "Congrès mondial du MICE à Casablanca : le Maroc hub de l'événementiel",
    summary: "Casablanca se positionne comme destination MICE de premier plan en Afrique, avec l'inauguration du nouveau centre de conventions de 50 000 m².",
    content: `Casablanca a accueilli le Congrès mondial du MICE (Meetings, Incentives, Conferences, Exhibitions) dans son nouveau Centre International de Conférences Hassan II. Trois mille professionnels de 60 pays ont participé à cette 25e édition de l'ICCA Africa.

Le nouveau centre de conventions, inauguré en début d'année, s'étend sur 50 000 mètres carrés. Il comprend un auditorium de 3 500 places, vingt salles modulables et un hall d'exposition de 12 000 mètres carrés. Il s'agit du plus grand équipement de ce type en Afrique du Nord.

Les retombées attendues pour l'économie casablancaise sont considérables : plus de 500 millions de dirhams générés sur la seule semaine du congrès. L'effet d'image sur le positionnement MICE de la ville est également majeur.

Casablanca vise à accueillir 200 événements internationaux annuels d'ici 2030. Un bureau des congrès spécialisé a été créé pour démarcher les organisateurs, et plusieurs grandes chaînes hôtelières ont annoncé l'ouverture de nouveaux établissements haut de gamme près du centre-ville.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "15 mars 2026",
    datePublished: "2026-03-15",
    author: "Mourad Cherkaoui",
    tag: "MICE",
    category: "EVENEMENTS",
  },

  // ── GASTRONOMIE ───────────────────────────────────────────────────
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
  },
  {
    title: "La cuisine marocaine inscrite au patrimoine immatériel de l'UNESCO",
    summary: "Après le couscous, c'est l'ensemble de la gastronomie marocaine qui reçoit cette distinction mondiale, reconnaissant des siècles de traditions culinaires uniques.",
    content: `Dans le prolongement de l'inscription historique du couscous en 2020, l'UNESCO consacre désormais l'intégralité de la cuisine marocaine comme patrimoine culturel immatériel de l'humanité. Cette reconnaissance élargie salue un art culinaire pluriel, façonné par des siècles d'échanges.

Le dossier présenté par le Royaume a mis en avant la diversité régionale : la pastilla de Fès, les tajines de l'Atlas, le méchoui du Sud, les poissons grillés de la côte atlantique, les pâtisseries de Salé et de Meknès. Chaque terroir apporte sa pierre à un édifice culinaire vivant.

Le ministère de la Culture et l'Association Marocaine des Arts Culinaires lancent un inventaire numérique exhaustif des recettes régionales, avec enregistrement vidéo des dernières détentrices du savoir. Une charte d'engagement est proposée aux restaurateurs et aux écoles hôtelières pour garantir la transmission authentique.

Cette inscription devrait dynamiser le tourisme gastronomique. L'ONMT prévoit une campagne internationale dédiée et un label "Restaurant d'Art Culinaire Marocain" va être créé pour guider les voyageurs vers les adresses les plus authentiques.`,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop",
    date: "8 avril 2026",
    datePublished: "2026-04-08",
    author: "Fatima Zahra Idrissi",
    tag: "UNESCO",
    category: "GASTRONOMIE",
  },
  {
    title: "Top 10 des restaurants gastronomiques du Maroc en 2026",
    summary: "De Marrakech à Tanger, les tables marocaines se renouvellent en fusionnant tradition et modernité, attirant une clientèle internationale exigeante.",
    content: `La scène gastronomique marocaine vit une période de renouveau remarquable. Dix tables s'imposent en 2026 par leur excellence, leur créativité et leur ancrage dans le patrimoine culinaire national, selon le classement annuel du magazine Gastronomie Maghreb.

En tête, "La Grande Table Marocaine" du Royal Mansour Marrakech confirme son statut de référence absolue, suivie par "Rahba" à Essaouira et "Dar Moha" à Marrakech. "Le Saveurs du Palais" à Fès, "La Sqala" à Casablanca et "Rick's Café" à Casablanca complètent le top 6.

Le classement met en lumière une tendance forte : la fusion entre techniques gastronomiques contemporaines et ingrédients du terroir marocain. Les jeunes chefs misent sur des produits d'exception (huile d'argan bio, safran de Taliouine, amandes d'Essaouira) pour revisiter les classiques.

Cette dynamique attire une clientèle internationale à fort pouvoir d'achat. Les grandes tables affichent des taux de réservation en hausse de 30 % par rapport à 2025, confirmant l'appétence du tourisme gastronomique pour la destination Maroc.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "2 avril 2026",
    datePublished: "2026-04-02",
    author: "Adil Belkadi",
    tag: "Restaurants",
    category: "GASTRONOMIE",
  },
  {
    title: "Tourisme culinaire : les circuits gastronomiques explosent au Maroc",
    summary: "Food tours dans les médinas, cours de cuisine dans les riads, routes des épices : le tourisme gastronomique représente désormais 15% des activités touristiques.",
    content: `Le tourisme culinaire connaît une croissance exponentielle au Maroc. Selon l'ONMT, il représente désormais 15 % des activités touristiques contre 8 % il y a cinq ans, générant plus de 4 milliards de dirhams de chiffre d'affaires annuel.

L'offre se diversifie rapidement : food tours dans les médinas de Fès, Marrakech et Tétouan, cours de cuisine dans les riads, visites d'exploitations agricoles et de coopératives féminines, routes des épices, safranières et vignobles. Chaque région développe sa signature culinaire.

Les opérateurs spécialisés se multiplient. La startup "Tajine Tours" revendique 20 000 participants en 2025 à Marrakech, tandis que "Couscous Experience" propose des immersions culinaires de trois jours dans les villages berbères du Haut Atlas. Des plateformes en ligne facilitent la réservation.

Le Ministère du Tourisme soutient cette dynamique via des appels à projets dédiés et des formations à destination des artisans culinaires. L'objectif est d'atteindre 25 % des activités touristiques d'ici 2030, tout en préservant l'authenticité des traditions culinaires.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "24 mars 2026",
    datePublished: "2026-03-24",
    author: "Nora Alami",
    tag: "Tourisme culinaire",
    category: "GASTRONOMIE",
  },

  // ── CULTURE ───────────────────────────────────────────────────────
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
  },
  {
    title: "Chefchaouen, la perle bleue, classée parmi les 10 plus belles villes du monde",
    summary: "Le magazine Travel + Leisure place la ville bleue du Rif dans son classement annuel, saluant son architecture unique et son authenticité préservée.",
    content: `Le prestigieux magazine Travel + Leisure vient de publier son classement annuel des plus belles villes du monde, et Chefchaouen y figure pour la première fois dans le top 10 mondial, à la 8e position. Une consécration pour la petite cité du Rif.

Le jury de journalistes et professionnels du tourisme souligne l'harmonie unique de son architecture, la préservation de son patrimoine, l'accueil chaleureux de ses habitants et son cadre naturel exceptionnel au pied des montagnes du Rif.

Cette distinction s'inscrit dans une série de reconnaissances internationales dont bénéficie Chefchaouen. National Geographic l'avait déjà désignée comme "une des plus belles petites villes du monde", et la ville apparaît régulièrement dans les listes de destinations Instagram les plus photographiées.

Le Conseil Régional Tanger-Tétouan-Al Hoceima annonce à cette occasion un plan de préservation ambitieux. Il prévoit une régulation renforcée des locations touristiques, la restauration de 150 bâtisses traditionnelles et la création d'un musée du bleu dédié à cette couleur emblématique.`,
    image: "https://images.unsplash.com/photo-1553899017-43a2e746f73a?w=800&h=500&fit=crop",
    date: "11 avril 2026",
    datePublished: "2026-04-11",
    author: "Yasmine Tazi",
    tag: "Patrimoine",
    category: "CULTURE",
  },
  {
    title: "Restauration de la médina de Fès : un projet de 2 milliards MAD",
    summary: "Le programme de réhabilitation de la plus ancienne médina du monde préserve 300 riads historiques et crée un parcours touristique immersif dans l'artisanat traditionnel.",
    content: `Le gouvernement a officiellement lancé un programme de restauration de la médina de Fès d'une ampleur inédite : 2 milliards de dirhams mobilisés sur cinq ans pour réhabiliter le plus ancien tissu urbain continuellement habité au monde, classé UNESCO depuis 1981.

Le programme couvre trois volets. D'abord, la restauration de 300 riads historiques remarquables, dont une partie sera reconvertie en musées ou en maisons d'hôtes classées. Ensuite, la rénovation des infrastructures : pavage, assainissement, éclairage public respectueux du patrimoine.

Troisième volet : la mise en valeur des métiers artisanaux traditionnels. Vingt-cinq fondouks (caravansérails) historiques seront restaurés et confiés à des corporations d'artisans : tanneurs de Chouara, dinandiers, tisserands de brocarts, potiers. Un parcours touristique immersif sera créé.

Ce programme phare devrait créer 8 000 emplois directs pendant les travaux et 4 000 emplois durables dans les métiers culturels et touristiques. Il positionne Fès comme destination culturelle majeure de la région euro-méditerranéenne.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "5 avril 2026",
    datePublished: "2026-04-05",
    author: "Amine Berrada",
    tag: "Médina",
    category: "CULTURE",
  },
  {
    title: "Les riads marocains : un modèle d'hébergement unique au monde",
    summary: "Avec plus de 1 500 riads-maisons d'hôtes répertoriés, le Maroc offre une expérience d'hébergement authentique qui séduit les voyageurs en quête de culture.",
    content: `Le concept de riad-maison d'hôtes est une spécificité marocaine qui ne cesse de séduire les voyageurs internationaux. Selon le dernier recensement, 1 500 riads classés proposent désormais leurs services au Maroc, dont 800 à Marrakech et 300 à Fès.

Né dans les années 1990, ce modèle d'hébergement transforme d'anciennes demeures traditionnelles en lieux d'accueil à taille humaine. Chaque riad dispose typiquement de 4 à 12 chambres organisées autour d'un patio central avec fontaine et végétation luxuriante.

Le succès des riads repose sur leur capacité à offrir une expérience culturelle unique : architecture traditionnelle, gastronomie marocaine, hammam authentique, service personnalisé. Les voyageurs y trouvent un contraste bienvenu avec l'hôtellerie standardisée.

Pour la Fédération Nationale des Maisons d'Hôtes, le défi principal est désormais la professionnalisation. Un référentiel qualité renforcé, soutenu par le ministère du Tourisme, permettra de maintenir l'excellence du service tout en préservant l'âme et l'authenticité des lieux.`,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "28 mars 2026",
    datePublished: "2026-03-28",
    author: "Layla Bennani",
    tag: "Riads",
    category: "CULTURE",
  },
  {
    title: "Essaouira : la cité des alizés mise sur le tourisme culturel",
    summary: "Musées, galeries d'art, ateliers d'artisans et festivals de musique gnaoua : Essaouira se réinvente comme capitale culturelle de la côte atlantique.",
    content: `Essaouira, surnommée la cité des alizés pour ses vents constants, connaît une véritable renaissance culturelle. La ville portuaire mise sur l'art contemporain, les festivals et l'artisanat local pour se démarquer des destinations balnéaires classiques.

Le Musée Sidi Mohamed Ben Abdallah, récemment rénové, accueille désormais 150 000 visiteurs par an. La galerie Damgaard et l'espace Othello défendent l'art contemporain marocain avec des expositions temporaires de haute qualité. Trente ateliers d'artisans et artistes s'étendent dans la médina.

Le festival Gnaoua reste le fer de lance culturel de la ville, mais d'autres événements émergent : le Festival des Andalousies Atlantiques en novembre, le Printemps Musical des Alizés en avril, ou encore le Festival Jazz Sous l'Arganier en septembre. Chaque saison bénéficie désormais d'un rendez-vous culturel.

Essaouira bénéficie également d'un tissu de riads de charme en forte expansion et d'une cuisine locale renommée, axée sur les produits de la mer et les saveurs amazighes. La ville ambitionne de tripler sa fréquentation culturelle d'ici 2030.`,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=500&fit=crop",
    date: "19 mars 2026",
    datePublished: "2026-03-19",
    author: "Hamza Oukacha",
    tag: "Tourisme culturel",
    category: "CULTURE",
  },

  // ── TECH ──────────────────────────────────────────────────────────
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
  },
  {
    title: "Digitalisation des offices de tourisme : le Maroc mise sur le tout-numérique",
    summary: "Bornes interactives, applications mobiles et réalité augmentée : les offices de tourisme se réinventent pour séduire les voyageurs connectés.",
    content: `Les offices de tourisme marocains vivent une révolution numérique sans précédent. L'ONMT et les Conseils Régionaux ont engagé un programme de 350 millions de dirhams pour moderniser les 72 points d'accueil touristique du Royaume.

Les aéroports et gares principales sont équipés de bornes interactives multilingues couvrant douze langues, dont le mandarin et l'arabe moderne. Ces bornes proposent des itinéraires personnalisés, des réservations directes auprès des opérateurs partenaires et des cartes téléchargeables.

L'application mobile "VisitMorocco" a été complètement repensée et intègre désormais des expériences en réalité augmentée. En pointant son téléphone vers un monument, le visiteur obtient instantanément des informations historiques, des reconstitutions 3D et des anecdotes culturelles.

Le programme comprend également la formation de 400 agents d'accueil aux outils numériques et la création d'un centre d'appel international opérationnel 24h/24. L'objectif : offrir une expérience d'accueil digne des plus grandes destinations mondiales.`,
    image: "https://images.unsplash.com/photo-1548018560-c7196e1525ad?w=800&h=500&fit=crop",
    date: "8 mars 2026",
    datePublished: "2026-03-08",
    author: "Khalid Mansouri",
    tag: "Transformation digitale",
    category: "TECH",
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
  },
  {
    title: "Blockchain et tourisme : vers une certification transparente des hébergements",
    summary: "Un projet pilote utilise la blockchain pour certifier la qualité des riads et maisons d'hôtes, renforçant la confiance des voyageurs internationaux.",
    content: `L'Autorité Marocaine de Régulation du Tourisme teste depuis six mois un système novateur de certification par blockchain pour les riads et maisons d'hôtes. Ce projet pilote, mené avec 150 établissements volontaires à Marrakech et Fès, pourrait être généralisé en 2027.

Le dispositif enregistre de manière immuable dans une blockchain publique l'ensemble des critères de qualité : classement officiel, nombre de chambres, équipements, formation du personnel, engagements durables. Un QR code est apposé à l'entrée de chaque établissement.

Pour les voyageurs, le système offre une garantie totale de transparence. En scannant le QR code, ils accèdent instantanément aux informations certifiées, aux certifications environnementales et aux avis non manipulables laissés par les précédents clients.

Ce système renforce également la confiance des plateformes de réservation internationales. Booking.com et Airbnb se sont déjà montrés intéressés par une intégration, qui permettrait de mettre en avant les établissements certifiés dans les résultats de recherche. Un levier de croissance majeur pour les opérateurs marocains.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "22 février 2026",
    datePublished: "2026-02-22",
    author: "Imane Sekkat",
    tag: "Blockchain",
    category: "TECH",
  },

  // ── REGLEMENTATION ────────────────────────────────────────────────
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
  },
  {
    title: "Normes de sécurité hôtelière : mise à jour des exigences 2026",
    summary: "Le Ministère du Tourisme publie les nouvelles normes de sécurité incendie et d'accessibilité obligatoires pour tous les établissements d'hébergement touristique.",
    content: `Le Ministère du Tourisme a publié au Bulletin Officiel les nouvelles normes de sécurité applicables aux établissements d'hébergement touristique. Elles entrent en vigueur progressivement sur deux ans et concernent l'ensemble du parc classé du Royaume.

Les principales évolutions portent sur trois axes : la sécurité incendie (détection automatique, compartimentage, désenfumage), l'accessibilité aux personnes à mobilité réduite (ascenseurs, rampes, salles de bain adaptées dans 5 % au moins des chambres), et la sécurité sanitaire (circuits propres/sales en cuisine, ventilation des espaces communs).

Les établissements ont 12 mois pour se mettre en conformité avec les normes incendie, et 24 mois pour l'accessibilité. Les contrôles seront réalisés par la Direction de la Protection Civile et les commissions régionales de classement.

Un fonds d'accompagnement de 200 millions de dirhams est mis en place pour soutenir les petits établissements dans leurs investissements. La Banque Populaire et la CIH proposent également des lignes de crédit bonifiées. Le non-respect des normes entraîne un déclassement et, à terme, la fermeture administrative.`,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",
    date: "12 mars 2026",
    datePublished: "2026-03-12",
    author: "Driss Bakkali",
    tag: "Normes",
    category: "REGLEMENTATION",
  },
  {
    title: "Guide des autorisations pour ouvrir un riad touristique au Maroc",
    summary: "De la déclaration d'activité au classement en passant par les autorisations sanitaires : le parcours complet pour mettre en activité un riad.",
    content: `Ouvrir un riad-maison d'hôtes au Maroc est un projet entrepreneurial exigeant qui nécessite le respect d'un parcours administratif précis. Ce guide synthétise les étapes incontournables pour mettre en activité un établissement en toute légalité.

Première étape : la création juridique de l'entreprise auprès du Centre Régional d'Investissement (CRI). Le statut SARL est généralement conseillé pour cette activité. L'obtention d'un identifiant fiscal et d'un numéro de Registre du Commerce est simultanée, en moins de deux semaines.

Deuxième étape : la déclaration d'activité touristique auprès de la Délégation Régionale du Tourisme. Le dossier doit comprendre les plans de l'établissement, les documents de propriété et un cahier des charges précisant les services offerts. La délivrance de l'autorisation provisoire prend environ 30 jours.

Troisième étape : le classement officiel. L'établissement doit respecter les normes minimales (taille des chambres, équipements, services) pour obtenir son classement en maison d'hôtes. Le contrôle est réalisé par une commission dédiée. Les autorisations sanitaires sont délivrées par la commune. Compter 3 à 6 mois pour l'ensemble du processus.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "5 mars 2026",
    datePublished: "2026-03-05",
    author: "Mohammed Lahrichi",
    tag: "Guide pratique",
    category: "REGLEMENTATION",
  },
  {
    title: "Fiscalité touristique : les avantages fiscaux pour les investisseurs en 2026",
    summary: "Exonérations de TVA, zones franches et incitations fiscales : panorama complet des dispositifs fiscaux favorables au secteur touristique marocain.",
    content: `Le cadre fiscal applicable aux investissements touristiques au Maroc a été significativement renforcé en 2026. La loi de finances consacre plusieurs dispositifs dédiés pour accompagner les projets structurants du secteur et attirer les investisseurs internationaux.

Premier levier : l'exonération de TVA pendant cinq ans pour les investissements hôteliers supérieurs à 50 millions de dirhams réalisés dans les zones prioritaires (Dakhla, Guelmim, Al Hoceima). Cette exonération peut représenter jusqu'à 20 % du coût total d'un projet.

Deuxième levier : la réduction de l'impôt sur les sociétés à 17,5 % (contre 32 % de droit commun) pour les entreprises du secteur touristique pendant les dix premières années d'activité. Cette mesure vise à améliorer la rentabilité des projets et à encourager le réinvestissement.

Troisième levier : les zones franches touristiques. Créées en 2025, elles offrent une exonération totale d'impôt sur les sociétés pendant cinq ans et une TVA à taux zéro sur les importations d'équipements hôteliers. Trois zones sont déjà opérationnelles à Tanger, Agadir et Dakhla. Les investisseurs intéressés peuvent se rapprocher de l'Agence Marocaine de Développement des Investissements.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "25 février 2026",
    datePublished: "2026-02-25",
    author: "Karima Tazi",
    tag: "Fiscalité",
    category: "REGLEMENTATION",
  },

  // ── TABLEAUX ──────────────────────────────────────────────────────
  {
    title: "Bilan touristique 2025 : le Maroc dépasse les 14 millions de visiteurs",
    summary: "Analyse complète des indicateurs clés de performance du secteur touristique marocain pour l'année 2025, avec comparaisons régionales et internationales.",
    content: `Le Maroc a clôturé l'année 2025 avec 14,5 millions de touristes internationaux, un niveau historique qui dépasse de 12 % les performances de 2024. Ce bilan, publié par l'Observatoire du Tourisme, confirme le retour durable du secteur au-dessus des niveaux pré-pandémiques.

Les arrivées progressent sur l'ensemble des marchés émetteurs. La France reste première source avec 2,8 millions d'arrivées, suivie par l'Espagne (1,9 million) et le Royaume-Uni (1,1 million). Les marchés en forte progression sont la Chine (+45 %), le Brésil (+32 %) et l'Arabie Saoudite (+28 %).

Les nuitées totales atteignent 27,8 millions, avec une durée moyenne de séjour de 5,8 jours. Les recettes touristiques en devises s'établissent à 110 milliards de dirhams, soit 14 % de plus qu'en 2024. Le secteur emploie directement 830 000 personnes.

Par région, Marrakech-Safi conserve sa première place avec 4,2 millions de visiteurs internationaux. Souss-Massa (Agadir) progresse fortement avec 3,1 millions, tandis que Dakhla enregistre la plus forte croissance relative avec +38 % d'arrivées.`,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=500&fit=crop",
    date: "18 mars 2026",
    datePublished: "2026-03-18",
    author: "Observatoire du Tourisme",
    tag: "Bilan annuel",
    category: "TABLEAUX",
  },
  {
    title: "Tableau de bord mensuel : février 2026 en chiffres",
    summary: "Arrivées aux frontières, nuitées hôtelières, recettes en devises : tous les indicateurs mensuels du tourisme marocain pour février 2026.",
    content: `Le mois de février 2026 confirme la dynamique du tourisme marocain avec 1,15 million d'arrivées aux frontières, une progression de 16 % par rapport à février 2025. Les principales portes d'entrée restent les aéroports de Casablanca, Marrakech et Agadir.

Les nuitées dans les hôtels classés atteignent 2,2 millions, en hausse de 14 %. Le taux d'occupation moyen s'établit à 68 %, avec des pics à 82 % pour les établissements 4 et 5 étoiles situés dans les destinations phares de Marrakech et Agadir.

Les recettes en devises issues du tourisme s'élèvent à 9,8 milliards de dirhams pour le mois, un niveau élevé pour une période traditionnellement creuse. La durée moyenne de séjour progresse légèrement à 5,9 jours.

Indicateur marquant : le tourisme d'affaires connaît une embellie notable (+22 % par rapport à février 2025), porté par plusieurs grands salons et congrès organisés à Casablanca et Marrakech. L'Observatoire anticipe une poursuite de cette tendance sur le trimestre.`,
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=500&fit=crop",
    date: "10 mars 2026",
    datePublished: "2026-03-10",
    author: "Observatoire du Tourisme",
    tag: "Mensuel",
    category: "TABLEAUX",
  },
  {
    title: "Comparatif régional : quelle région attire le plus de touristes",
    summary: "Marrakech-Safi domine, mais Dakhla affiche la plus forte croissance. Analyse détaillée des flux touristiques par région du Maroc.",
    content: `La région Marrakech-Safi confirme son leadership incontesté avec 4,2 millions de touristes internationaux en 2025, soit 29 % des arrivées nationales. Elle devance Souss-Massa (3,1 millions) et Tanger-Tétouan-Al Hoceïma (2,8 millions).

Mais l'analyse des taux de croissance révèle une autre dynamique. La région Dakhla-Oued Ed-Dahab enregistre la plus forte progression avec +38 % d'arrivées en un an, tirée par l'ouverture de nouvelles liaisons aériennes directes et le développement des activités de surf et de kitesurf.

Casablanca-Settat, qui concentre les voyages d'affaires, progresse de 22 %, confirmant le positionnement MICE de la capitale économique. L'Oriental (Saïdia) et Béni-Mellal-Khénifra affichent également des performances supérieures à la moyenne nationale.

Cette montée en puissance des "nouvelles" destinations reflète la stratégie de diversification du ministère du Tourisme. L'objectif est de rééquilibrer les flux pour désengorger les destinations historiques et partager les retombées économiques avec l'ensemble du territoire.`,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
    date: "2 mars 2026",
    datePublished: "2026-03-02",
    author: "Observatoire du Tourisme",
    tag: "Analyse régionale",
    category: "TABLEAUX",
  },

  // ── ACADEMIQUES ───────────────────────────────────────────────────
  {
    title: "Impact du tourisme durable sur les communautés rurales du Haut Atlas",
    summary: "Étude de l'Université Cadi Ayyad de Marrakech sur les retombées socio-économiques de l'écotourisme dans les villages berbères du Haut Atlas.",
    content: `Une étude pilotée par le laboratoire Géographie et Aménagement du Territoire de l'Université Cadi Ayyad de Marrakech analyse en profondeur les retombées socio-économiques de l'écotourisme dans les villages berbères du Haut Atlas. Les résultats sont particulièrement riches d'enseignements.

L'étude porte sur 32 villages des vallées d'Imlil, Aït Bougmez et Zat. Elle compare les indicateurs de développement humain entre villages à fort tourisme et villages à faible tourisme. Les écarts sont significatifs : revenu moyen par ménage 2,8 fois plus élevé, taux de scolarisation des filles supérieur de 22 points.

Les retombées ne sont toutefois pas uniformes. Les familles qui possèdent un gîte d'étape ou qui comptent un membre travaillant comme guide ou muletier captent l'essentiel des revenus touristiques. Les chercheurs plaident pour une meilleure distribution via des coopératives villageoises.

L'étude formule dix recommandations à destination des pouvoirs publics, notamment la création d'un label "Village Écotouristique" associant les habitants à la gouvernance, et la mise en place d'un fonds villageois alimenté par une taxe de séjour modérée. Le ministère du Tourisme a déjà annoncé une expérimentation dès 2026.`,
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&h=500&fit=crop",
    date: "12 mars 2026",
    datePublished: "2026-03-12",
    author: "Université Cadi Ayyad",
    tag: "Écotourisme",
    category: "ACADEMIQUES",
  },
  {
    title: "La gastronomie comme levier d'attractivité touristique au Maroc",
    summary: "Publication de l'ISCAE analysant le rôle de la gastronomie marocaine dans la décision de voyage des touristes européens et américains.",
    content: `L'Institut Supérieur de Commerce et d'Administration des Entreprises (ISCAE) Casablanca publie une étude approfondie sur le rôle de la gastronomie dans la décision de voyage à destination du Maroc. L'enquête a porté sur 3 200 voyageurs internationaux interrogés à la sortie du territoire.

Premier enseignement : la gastronomie marocaine figure parmi les trois premiers critères de choix pour 47 % des voyageurs européens et 62 % des voyageurs américains. Elle devance les paysages naturels, le patrimoine historique et l'accueil.

L'étude révèle également que 38 % des voyageurs ont suivi un cours de cuisine ou participé à un food tour pendant leur séjour. Ces activités contribuent fortement à la satisfaction globale et à l'intention de recommandation, avec un taux de 94 %.

Les chercheurs recommandent d'intensifier la promotion culinaire à l'international et de professionnaliser davantage les offres gastronomiques. L'ISCAE propose notamment la création d'un hub culinaire national à Casablanca rassemblant écoles, centres de recherche et restaurants d'application, sur le modèle du Basque Culinary Center à Saint-Sébastien.`,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=500&fit=crop",
    date: "5 mars 2026",
    datePublished: "2026-03-05",
    author: "ISCAE Casablanca",
    tag: "Gastronomie",
    category: "ACADEMIQUES",
  },
  {
    title: "Transformation digitale des PME touristiques marocaines : état des lieux 2025",
    summary: "Rapport de recherche de l'Université Mohammed V sur l'adoption des outils numériques par les petites et moyennes entreprises du secteur touristique.",
    content: `La Faculté des Sciences Juridiques, Économiques et Sociales de l'Université Mohammed V de Rabat a mené une vaste enquête sur l'adoption des outils numériques par les PME du tourisme marocain. L'étude couvre 850 entreprises réparties sur l'ensemble du territoire.

Le diagnostic est contrasté. Si 92 % des établissements utilisent un site web et 78 % sont présents sur les réseaux sociaux, seuls 34 % disposent d'un système de réservation en ligne intégré et 18 % exploitent des outils de CRM (gestion de la relation client). Les retards sont particulièrement marqués pour les maisons d'hôtes en zone rurale.

Les freins identifiés sont multiples : coût perçu comme élevé des solutions, manque de compétences internes, méconnaissance de l'offre technologique. Les établissements les plus avancés sont souvent dirigés par des propriétaires jeunes ou rentrés au Maroc après une expérience à l'international.

Le rapport formule plusieurs recommandations : création de bouquets d'outils mutualisés à faible coût, subventions à la digitalisation dans les zones prioritaires, partenariats renforcés entre écoles de management et PME. Le ministère du Tourisme a annoncé un programme dédié de 100 millions de dirhams pour accompagner cette transition.`,
    image: "https://images.unsplash.com/photo-1531219572328-a0171b4448a7?w=600&h=400&fit=crop",
    date: "20 février 2026",
    datePublished: "2026-02-20",
    author: "Université Mohammed V",
    tag: "Digital",
    category: "ACADEMIQUES",
  },
  {
    title: "Patrimoine architectural et tourisme culturel : le cas de Fès",
    summary: "Thèse de doctorat explorant la relation entre la conservation du patrimoine architectural de la médina de Fès et le développement du tourisme culturel.",
    content: `Soutenue à l'Université Sidi Mohamed Ben Abdellah de Fès, une thèse de doctorat éclaire la relation complexe entre la conservation du patrimoine architectural de la médina et le développement du tourisme culturel. Le travail couvre dix années d'analyse de terrain.

La thèse démontre que les opérations de restauration menées depuis vingt ans ont permis de préserver l'intégrité architecturale de la médina, mais ont également généré des effets sociologiques complexes : hausse des prix du foncier, départ progressif des habitants originels vers la ville nouvelle, transformation des riads en hébergements touristiques.

La chercheuse identifie trois modèles de restauration aux impacts différenciés : la restauration muséale (risque de folklorisation), la restauration mixte (équilibre habitants/touristes à préserver activement), et la restauration communautaire (meilleure conservation sociale mais moyens financiers limités).

Les recommandations plaident pour un troisième modèle renforcé : soutien financier aux habitants pour restaurer leur demeure, quotas limitant la conversion en hébergements touristiques, fonds patrimonial alimenté par une taxe de séjour dédiée. Le Conseil Régional Fès-Meknès étudie actuellement plusieurs de ces propositions.`,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&h=500&fit=crop",
    date: "10 février 2026",
    datePublished: "2026-02-10",
    author: "Université Sidi Mohamed Ben Abdellah",
    tag: "Patrimoine",
    category: "ACADEMIQUES",
  },
]

// ── Build the ALL_ARTICLES array with derived fields ─────────────────

export const ALL_ARTICLES: Article[] = RAW.map((a) => {
  const meta = CAT_META[a.category]
  return {
    ...a,
    slug: slugify(a.title),
    categoryLabel: meta.label,
    categoryPath: meta.path,
    color: meta.color,
  }
})

export function getArticleBySlug(slug: string): Article | undefined {
  const exact = ALL_ARTICLES.find((a) => a.slug === slug)
  if (exact) return exact
  // Fallback: partial match to handle truncated slugs from the UI
  const partial = ALL_ARTICLES.find(
    (a) =>
      a.slug.startsWith(slug.slice(0, 30)) ||
      slug.startsWith(a.slug.slice(0, 30))
  )
  return partial
}

export function getArticlesByCategory(category: Category): Article[] {
  return ALL_ARTICLES.filter((a) => a.category === category).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  )
}

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return []
  return ALL_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category
  ).slice(0, limit)
}

export function getCategoryMeta(category: Category) {
  return CAT_META[category]
}
