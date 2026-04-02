// Article categories with French labels
export const ARTICLE_CATEGORIES = {
  INVEST: 'Invest',
  GOUVERNEMENT: 'Gouvernement',
  MARCHES: 'Marchés',
  PROJETS_FEDERATIONS: 'Projets & Fédérations',
  EVENEMENTS: 'Événements',
  GASTRONOMIE: 'Gastronomie',
  CULTURE_PATRIMOINE: 'Culture & Patrimoine',
  // Legacy categories kept for backward compatibility
  HEBERGEMENT: 'Hébergement',
  TRANSPORT: 'Transport',
  AERIEN: 'Aérien',
  DEVELOPPEMENT: 'Développement',
  MICE: 'MICE',
} as const

// Thématiques categories
export const THEMATIQUE_CATEGORIES = {
  TECH: 'Tech',
  REGLEMENTATION: 'Réglementation',
  TABLEAUX_DE_BORD: 'Tableaux de bord',
  ACADEMIQUES: 'Académiques',
} as const

// Job categories with French labels
export const JOB_CATEGORIES = {
  RECEPTION: 'Réception',
  CUISINE: 'Cuisine',
  SERVICE: 'Service',
  ANIMATION: 'Animation',
  GUIDE: 'Guide',
  BIEN_ETRE: 'Bien-être',
  MANAGEMENT: 'Management',
  MICE: 'MICE',
  TRANSPORT: 'Transport',
  ENTRETIEN: 'Entretien',
} as const

// Contract types with French labels
export const CONTRACT_TYPES = {
  CDI: 'CDI',
  CDD: 'CDD',
  SAISONNIER: 'Saisonnier',
  STAGE: 'Stage',
  FREELANCE: 'Freelance',
} as const

// Morocco regions with French labels
export const MOROCCO_REGIONS = {
  MARRAKECH_SAFI: 'Marrakech-Safi',
  SOUSS_MASSA: 'Souss-Massa',
  TANGER_TETOUAN_AL_HOCEIMA: 'Tanger-Tétouan-Al Hoceïma',
  FES_MEKNES: 'Fès-Meknès',
  RABAT_SALE_KENITRA: 'Rabat-Salé-Kénitra',
  CASABLANCA_SETTAT: 'Casablanca-Settat',
  ORIENTAL: 'Oriental',
  BENI_MELLAL_KHENIFRA: 'Béni Mellal-Khénifra',
  DRAA_TAFILALET: 'Drâa-Tafilalet',
  GUELMIM_OUED_NOUN: 'Guelmim-Oued Noun',
  LAAYOUNE_SAKIA_EL_HAMRA: 'Laâyoune-Sakia El Hamra',
  DAKHLA_OUED_ED_DAHAB: 'Dakhla-Oued Ed-Dahab',
} as const

// Major cities for select dropdowns
export const MAJOR_CITIES = [
  'Marrakech',
  'Casablanca',
  'Rabat',
  'Fès',
  'Tanger',
  'Agadir',
  'Meknès',
  'Essaouira',
  'Ouarzazate',
  'Chefchaouen',
  'Dakhla',
  'El Jadida',
  'Ifrane',
  'Tétouan',
  'Nador',
  'Oujda',
  'Errachidia',
  'Béni Mellal',
  'Kénitra',
  'Mohammedia',
] as const

// Investment types with French labels
export const INVESTMENT_TYPES = {
  TERRAIN: 'Terrain',
  HOTEL: 'Hôtel',
  RIAD: 'Riad',
  RESTAURANT: 'Restaurant',
  PROJET: 'Projet',
  AUTRE: 'Autre',
} as const

// Property conditions with French labels
export const PROPERTY_CONDITIONS = {
  NEUF: 'Neuf',
  A_RENOVER: 'À rénover',
  EN_ACTIVITE: 'En activité',
} as const

// Application statuses with French labels
export const APPLICATION_STATUSES = {
  UNREAD: 'Non lue',
  VIEWED: 'Vue',
  SHORTLISTED: 'Retenue',
  REJECTED: 'Refusée',
} as const

// Job statuses with French labels
export const JOB_STATUSES = {
  PENDING: 'En attente',
  APPROVED: 'Active',
  REJECTED: 'Rejetée',
  EXPIRED: 'Expirée',
  DISABLED: 'Désactivée',
} as const

// Availability with French labels
export const AVAILABILITY_OPTIONS = {
  IMMEDIATE: 'Immédiate',
  ONE_MONTH: '1 mois',
  THREE_MONTHS: '3 mois',
} as const

// Statistic indicators with French labels
export const STATISTIC_INDICATORS = {
  TOURISTS: 'Nombre de touristes',
  REVENUE: 'Recettes touristiques (MAD)',
  NIGHTS: 'Nuitées',
  OCCUPANCY_RATE: "Taux d'occupation (%)",
} as const

// Company sectors
export const COMPANY_SECTORS = [
  'Hôtellerie',
  'Restauration',
  'Agence de voyage',
  'Transport touristique',
  'Animation & Loisirs',
  'Bien-être & Spa',
  'Guide touristique',
  'Office de tourisme',
  'MICE & Événementiel',
  'Autre',
] as const

// Pagination
export const ITEMS_PER_PAGE = 10
export const ARTICLES_PER_PAGE = 10
export const JOBS_PER_PAGE = 10
export const INVESTMENTS_PER_PAGE = 10
export const HOMEPAGE_ARTICLES_COUNT = 6
