/**
 * Seed real tourism content into Supabase (articles, jobs, statistics).
 * Idempotent: upserts by unique slug/email; stats only inserted if empty.
 *
 * Run: npx tsx prisma/seed-content.ts   (reads DATABASE_URL from .env)
 */
import fs from "node:fs"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// load .env
if (fs.existsSync(".env")) {
  for (const line of fs.readFileSync(".env", "utf8").split("\n")) {
    const i = line.indexOf("=")
    if (i > 0) process.env[line.slice(0, i)] = line.slice(i + 1)
  }
}

const prisma = new PrismaClient({ adapter: new PrismaPg(process.env.DATABASE_URL!) })

const doc = (...paras: string[]) => ({
  type: "doc",
  content: paras.map((t) => ({ type: "paragraph", content: [{ type: "text", text: t }] })),
})

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=1200&h=630&fit=crop`

async function main() {
  console.log("Seeding real content...")

  const admin = await prisma.user.upsert({
    where: { email: "redaction@siyahamag.ma" },
    update: { name: "Rédaction SiyahaMag", role: "ADMIN" },
    create: {
      email: "redaction@siyahamag.ma",
      name: "Rédaction SiyahaMag",
      role: "ADMIN",
      city: "Casablanca",
      supabaseId: "seed-redaction-siyahamag",
    },
  })

  const employerUser = await prisma.user.upsert({
    where: { email: "recrutement@atlas-hospitality.ma" },
    update: {},
    create: {
      email: "recrutement@atlas-hospitality.ma",
      name: "Atlas Hospitality Group",
      role: "EMPLOYER",
      city: "Marrakech",
      supabaseId: "seed-atlas-hospitality",
    },
  })

  const company = await prisma.company.upsert({
    where: { userId: employerUser.id },
    update: { verificationStatus: "VERIFIED", verifiedAt: new Date() },
    create: {
      userId: employerUser.id,
      name: "Atlas Hospitality Group",
      description: "Groupe hôtelier marocain présent à Marrakech, Agadir, Tanger et Casablanca.",
      city: "Marrakech",
      sector: "Hôtellerie",
      website: "https://atlas-hospitality.ma",
      ice: "001234567890123",
      email: "recrutement@atlas-hospitality.ma",
      verificationStatus: "VERIFIED",
      verifiedAt: new Date(),
    },
  })

  // ── Articles ────────────────────────────────────────────────────────
  const articles = [
    { title: "Le Maroc franchit 17,4 millions de touristes en 2024, un record historique", slug: "maroc-17-4-millions-touristes-2024", category: "DEVELOPPEMENT", img: "photo-1539020140153-e479b8c22e70",
      summary: "Avec 17,4 millions d'arrivées en 2024, le Maroc consolide sa place de première destination touristique d'Afrique et vise 26 millions d'ici 2030.",
      paras: ["Le secteur touristique marocain a enregistré une année 2024 exceptionnelle avec 17,4 millions de touristes, en hausse de plus de 20 % par rapport à 2023.", "Cette dynamique est portée par la diversification de l'offre, l'amélioration de la connectivité aérienne et une stratégie de promotion renforcée de l'ONMT sur les marchés européens et du Golfe.", "Le Royaume s'est fixé un objectif ambitieux de 26 millions de touristes à l'horizon 2030, année où il coorganisera la Coupe du Monde de football."] },
    { title: "Coupe du Monde 2030 : l'hôtellerie marocaine accélère ses recrutements", slug: "coupe-du-monde-2030-hotellerie-recrutement", category: "HEBERGEMENT", img: "photo-1566073771259-6a8506099945",
      summary: "À l'approche du Mondial 2030, les groupes hôteliers lancent de vastes campagnes de recrutement et de formation dans les métiers de l'accueil.",
      paras: ["La perspective de la Coupe du Monde 2030 bouleverse le marché de l'emploi touristique. Les chaînes hôtelières anticipent des dizaines de milliers de recrutements.", "Réceptionnistes, cuisiniers, gouvernantes, agents d'accueil : tous les métiers de l'hôtellerie-restauration sont concernés par cette montée en charge.", "Des programmes de formation comme Kafaa visent à certifier des milliers de professionnels pour répondre aux standards internationaux attendus."] },
    { title: "Nouvelles liaisons aériennes directes vers Agadir et Dakhla", slug: "nouvelles-liaisons-aeriennes-agadir-dakhla", category: "AERIEN", img: "photo-1436491865332-7a61a109cc05",
      summary: "Plusieurs compagnies ouvrent des lignes directes vers Agadir et Dakhla, renforçant l'attractivité des destinations balnéaires du sud marocain.",
      paras: ["La connectivité aérienne du Maroc poursuit son expansion avec l'annonce de nouvelles liaisons directes depuis l'Europe vers Agadir et Dakhla.", "Ces routes ouvrent les destinations du sud à une clientèle internationale en quête de soleil, de surf et de tourisme désertique.", "Royal Air Maroc et plusieurs compagnies low-cost renforcent ainsi leurs programmes sur la saison à venir."] },
    { title: "Marrakech, capitale du tourisme de luxe et des riads d'exception", slug: "marrakech-tourisme-luxe-riads", category: "HEBERGEMENT", img: "photo-1597212618440-806262de4f6b",
      summary: "La ville ocre confirme son statut de destination phare du tourisme haut de gamme, portée par ses riads, palaces et son offre culturelle.",
      paras: ["Marrakech demeure la locomotive du tourisme marocain avec plus de 4 millions de visiteurs par an.", "Le marché des riads de charme dans la médina attire investisseurs nationaux et étrangers, séduits par la rentabilité de la maison d'hôtes.", "L'offre se structure autour du luxe, du bien-être et d'expériences culturelles authentiques."] },
    { title: "Gastronomie marocaine : un levier d'attractivité touristique", slug: "gastronomie-marocaine-levier-touristique", category: "GASTRONOMIE", img: "photo-1541518763669-27fef04b14ea",
      summary: "Tajine, couscous, street food : la cuisine marocaine s'impose comme une motivation de voyage à part entière.",
      paras: ["La gastronomie figure désormais parmi les premières motivations de séjour au Maroc.", "Des ateliers de cuisine aux tables gastronomiques étoilées, l'offre culinaire se professionnalise et crée de l'emploi dans la restauration.", "Les villes impériales et les destinations balnéaires développent des circuits gastronomiques dédiés."] },
    { title: "Tourisme durable : le Maroc mise sur l'éco-lodge et le désert", slug: "tourisme-durable-eco-lodge-desert", category: "DEVELOPPEMENT", img: "photo-1542401886-65d6c61db217",
      summary: "Éco-lodges, glamping et tourisme désertique responsable : un segment en forte croissance porté par une demande internationale.",
      paras: ["Le tourisme durable s'affirme comme un axe stratégique du développement touristique marocain.", "Les régions désertiques de Merzouga, Zagora et Dakhla voient fleurir éco-lodges et campements écoresponsables.", "Ce segment répond à une clientèle soucieuse de son impact environnemental et avide d'authenticité."] },
    { title: "MICE : le Maroc se positionne sur le tourisme d'affaires et de congrès", slug: "mice-tourisme-affaires-congres-maroc", category: "MICE", img: "photo-1505373877841-8d25f7d46678",
      summary: "Casablanca, Marrakech et Rabat développent une offre MICE compétitive pour capter le marché lucratif du tourisme d'affaires.",
      paras: ["Le segment MICE (réunions, incentives, congrès, événements) représente un relais de croissance à forte valeur ajoutée.", "Les grandes villes investissent dans des centres de congrès modernes et des infrastructures hôtelières adaptées.", "Le tourisme d'affaires permet de lisser la saisonnalité et d'augmenter la dépense moyenne par visiteur."] },
    { title: "Tanger, quatrième destination touristique du Royaume", slug: "tanger-quatrieme-destination-touristique", category: "DEVELOPPEMENT", img: "photo-1553913861-c0fddf2619ee",
      summary: "Portée par sa baie, son port et ses projets urbains, Tanger grimpe dans le classement des destinations marocaines.",
      paras: ["Tanger confirme sa montée en puissance touristique, soutenue par d'importants projets d'aménagement.", "La ville du détroit séduit par son patrimoine, sa baie réaménagée et sa position de porte d'entrée vers l'Europe.", "L'hôtellerie et la restauration y connaissent une dynamique d'investissement soutenue."] },
  ] as const

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { status: "PUBLISHED" },
      create: {
        title: a.title, slug: a.slug, summary: a.summary, content: doc(...a.paras),
        coverImage: IMG(a.img), category: a.category, status: "PUBLISHED",
        publishedAt: new Date(), authorId: admin.id,
      },
    })
  }
  console.log(`${articles.length} articles upserted`)

  // ── Job listings ────────────────────────────────────────────────────
  const jobs = [
    { title: "Réceptionniste bilingue (H/F) - Hôtel 5*", slug: "receptionniste-bilingue-marrakech-atlas", jobCategory: "RECEPTION", contractType: "CDI", city: "Marrakech", region: "MARRAKECH_SAFI", skills: ["Accueil", "Français", "Anglais", "Opera PMS"], experience: "2 ans", salary: "6 000 - 8 000 MAD",
      desc: ["Nous recherchons un(e) réceptionniste bilingue pour notre établissement 5 étoiles à Marrakech.", "Vous assurez l'accueil des clients, le check-in/check-out et la gestion des réservations."] },
    { title: "Chef de cuisine - Restaurant gastronomique", slug: "chef-cuisine-restaurant-agadir-atlas", jobCategory: "CUISINE", contractType: "CDI", city: "Agadir", region: "SOUSS_MASSA", skills: ["Cuisine marocaine", "Management d'équipe", "HACCP"], experience: "5 ans", salary: "12 000 - 18 000 MAD",
      desc: ["Restaurant gastronomique à Agadir recherche un chef de cuisine expérimenté.", "Vous dirigez la brigade, élaborez les menus et garantissez la qualité et l'hygiène."] },
    { title: "Guide touristique francophone (H/F)", slug: "guide-touristique-francophone-fes-atlas", jobCategory: "GUIDE", contractType: "SAISONNIER", city: "Fès", region: "FES_MEKNES", skills: ["Histoire du Maroc", "Français", "Espagnol"], experience: "1 an", salary: "Selon profil",
      desc: ["Accompagnez nos visiteurs à la découverte de la médina de Fès et de son patrimoine.", "Maîtrise de l'histoire locale et excellent relationnel exigés."] },
    { title: "Spa praticien(ne) - Centre de bien-être", slug: "spa-praticien-bien-etre-marrakech-atlas", jobCategory: "BIEN_ETRE", contractType: "CDI", city: "Marrakech", region: "MARRAKECH_SAFI", skills: ["Massage", "Soins du corps", "Accueil"], experience: "2 ans", salary: "5 000 - 7 000 MAD",
      desc: ["Centre de bien-être haut de gamme recherche un(e) praticien(ne) spa qualifié(e).", "Vous réalisez les soins et conseillez la clientèle sur les protocoles bien-être."] },
    { title: "Serveur(se) en restauration - Resort balnéaire", slug: "serveur-restauration-tanger-atlas", jobCategory: "SERVICE", contractType: "SAISONNIER", city: "Tanger", region: "TANGER_TETOUAN_AL_HOCEIMA", skills: ["Service en salle", "Français", "Travail en équipe"], experience: "Débutant accepté", salary: "4 500 - 6 000 MAD",
      desc: ["Resort balnéaire à Tanger recrute des serveurs(ses) pour la saison estivale.", "Sens du service, dynamisme et présentation soignée requis."] },
    { title: "Animateur(trice) club vacances", slug: "animateur-club-vacances-agadir-atlas", jobCategory: "ANIMATION", contractType: "SAISONNIER", city: "Agadir", region: "SOUSS_MASSA", skills: ["Animation", "Sport", "Spectacle"], experience: "1 an", salary: "5 000 MAD + logement",
      desc: ["Rejoignez notre équipe d'animation pour la saison à Agadir.", "Activités sportives, soirées et animation enfants au programme."] },
    { title: "Directeur(trice) d'hôtel adjoint(e)", slug: "directeur-hotel-adjoint-casablanca-atlas", jobCategory: "MANAGEMENT", contractType: "CDI", city: "Casablanca", region: "CASABLANCA_SETTAT", skills: ["Gestion hôtelière", "Management", "Revenue management"], experience: "8 ans", salary: "20 000 - 30 000 MAD",
      desc: ["Hôtel d'affaires à Casablanca recherche un directeur adjoint expérimenté.", "Pilotage opérationnel, gestion des équipes et optimisation des performances."] },
    { title: "Gouvernant(e) d'étage", slug: "gouvernante-etage-marrakech-atlas", jobCategory: "ENTRETIEN", contractType: "CDD", city: "Marrakech", region: "MARRAKECH_SAFI", skills: ["Hygiène", "Organisation", "Management"], experience: "3 ans", salary: "6 000 - 8 000 MAD",
      desc: ["Supervisez les équipes d'étage de notre établissement à Marrakech.", "Contrôle qualité des chambres et gestion des stocks."] },
  ] as const

  for (const j of jobs) {
    await prisma.jobListing.upsert({
      where: { slug: j.slug },
      update: { status: "APPROVED" },
      create: {
        title: j.title, slug: j.slug, description: doc(...j.desc), jobCategory: j.jobCategory,
        contractType: j.contractType, city: j.city, region: j.region, skills: [...j.skills],
        experience: j.experience, salary: j.salary, status: "APPROVED", approvedAt: new Date(),
        deadline: new Date(Date.now() + 60 * 864e5), companyId: company.id,
      },
    })
  }
  console.log(`${jobs.length} job listings upserted`)

  // ── Statistics (only if empty) ──────────────────────────────────────
  const statCount = await prisma.tourismStatistic.count()
  if (statCount === 0) {
    const stats = [
      { indicator: "TOURISTS", value: 15500000, year: 2023, source: "ONMT", region: null },
      { indicator: "TOURISTS", value: 17400000, year: 2024, source: "ONMT", region: null },
      { indicator: "TOURISTS", value: 20000000, year: 2025, source: "ONMT", region: null },
      { indicator: "REVENUE", value: 105300000000, year: 2024, source: "Bank Al-Maghrib", region: null },
      { indicator: "NIGHTS", value: 27800000, year: 2024, source: "Ministère du Tourisme", region: null },
      { indicator: "OCCUPANCY_RATE", value: 52, year: 2024, source: "Ministère du Tourisme", region: null },
      { indicator: "TOURISTS", value: 4200000, year: 2024, source: "ONMT", region: "MARRAKECH_SAFI" },
      { indicator: "TOURISTS", value: 3100000, year: 2024, source: "ONMT", region: "SOUSS_MASSA" },
      { indicator: "TOURISTS", value: 2800000, year: 2024, source: "ONMT", region: "TANGER_TETOUAN_AL_HOCEIMA" },
      { indicator: "TOURISTS", value: 1900000, year: 2024, source: "ONMT", region: "FES_MEKNES" },
      { indicator: "TOURISTS", value: 1500000, year: 2024, source: "ONMT", region: "RABAT_SALE_KENITRA" },
      { indicator: "TOURISTS", value: 800000, year: 2024, source: "ONMT", region: "DAKHLA_OUED_ED_DAHAB" },
    ] as const
    for (const s of stats) {
      await prisma.tourismStatistic.create({ data: { ...s, updatedByUserId: admin.id } })
    }
    console.log(`${stats.length} statistics created`)
  } else {
    console.log(`statistics already present (${statCount}) — skipped`)
  }

  console.log("✅ Seed complete.")
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
