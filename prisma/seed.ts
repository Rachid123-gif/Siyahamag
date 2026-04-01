import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user (must match a Supabase Auth user)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@siyahamag.com' },
    update: {},
    create: {
      email: 'admin@siyahamag.com',
      name: 'Admin SiyahaMag',
      role: 'ADMIN',
      supabaseId: 'admin-supabase-id-placeholder',
      city: 'Casablanca',
    },
  })

  console.log('Admin user created:', admin.email)

  // Create sample tourism statistics
  const statisticsData = [
    // National data
    { indicator: 'TOURISTS' as const, value: 15500000, year: 2023, source: 'ONMT', region: null },
    { indicator: 'TOURISTS' as const, value: 17400000, year: 2024, source: 'ONMT', region: null },
    { indicator: 'TOURISTS' as const, value: 20000000, year: 2025, source: 'ONMT', region: null },
    { indicator: 'REVENUE' as const, value: 105300000000, year: 2024, source: 'Bank Al-Maghrib', region: null },
    { indicator: 'NIGHTS' as const, value: 27800000, year: 2024, source: 'Ministère du Tourisme', region: null },
    { indicator: 'OCCUPANCY_RATE' as const, value: 52, year: 2024, source: 'Ministère du Tourisme', region: null },
    // Regional data 2024
    { indicator: 'TOURISTS' as const, value: 4200000, year: 2024, source: 'ONMT', region: 'MARRAKECH_SAFI' as const },
    { indicator: 'TOURISTS' as const, value: 3100000, year: 2024, source: 'ONMT', region: 'SOUSS_MASSA' as const },
    { indicator: 'TOURISTS' as const, value: 2800000, year: 2024, source: 'ONMT', region: 'TANGER_TETOUAN_AL_HOCEIMA' as const },
    { indicator: 'TOURISTS' as const, value: 1900000, year: 2024, source: 'ONMT', region: 'FES_MEKNES' as const },
    { indicator: 'TOURISTS' as const, value: 1500000, year: 2024, source: 'ONMT', region: 'RABAT_SALE_KENITRA' as const },
    { indicator: 'TOURISTS' as const, value: 800000, year: 2024, source: 'ONMT', region: 'DAKHLA_OUED_ED_DAHAB' as const },
  ]

  for (const stat of statisticsData) {
    await prisma.tourismStatistic.create({
      data: {
        ...stat,
        updatedByUserId: admin.id,
      },
    })
  }

  console.log(`${statisticsData.length} statistics created`)

  // Create sample articles
  const articles = [
    {
      title: 'Le Maroc dépasse les 20 millions de touristes en 2025',
      slug: 'maroc-20-millions-touristes-2025',
      summary: 'Le Maroc a franchi le cap historique des 20 millions de touristes en 2025, confirmant sa position de première destination touristique en Afrique.',
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Le secteur touristique marocain continue sa dynamique exceptionnelle...' }] }] },
      category: 'DEVELOPPEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-12-15'),
    },
    {
      title: 'Coupe du Monde 2030 : les hôtels recrutent massivement',
      slug: 'coupe-du-monde-2030-hotels-recrutement',
      summary: "À l'approche de la Coupe du Monde 2030, les chaînes hôtelières marocaines lancent des campagnes de recrutement massives.",
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "La préparation de la Coupe du Monde 2030 s'accélère dans le secteur hôtelier..." }] }] },
      category: 'HEBERGEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-01-10'),
    },
    {
      title: 'Nouvelles liaisons aériennes vers Dakhla et Essaouira',
      slug: 'nouvelles-liaisons-aeriennes-dakhla-essaouira',
      summary: "Royal Air Maroc et Ryanair annoncent l'ouverture de nouvelles liaisons directes vers Dakhla et Essaouira depuis l'Europe.",
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "La connectivité aérienne du Maroc s'améliore avec de nouvelles routes..." }] }] },
      category: 'AERIEN' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2026-02-20'),
    },
  ]

  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        authorId: admin.id,
      },
    })
  }

  console.log(`${articles.length} articles created`)

  console.log('Seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
