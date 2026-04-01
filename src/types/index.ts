// Re-export all Prisma types for convenience
export type {
  User,
  Article,
  Company,
  JobListing,
  CandidateProfile,
  Application,
  JobAlert,
  Investment,
  TourismStatistic,
  Report,
  ModerationLog,
  ContactMessage,
} from '@/generated/prisma/client'

export type {
  Role,
  ArticleStatus,
  ArticleCategory,
  JobCategory,
  ContractType,
  JobStatus,
  ApplicationStatus,
  CompanyVerification,
  Availability,
  InvestmentType,
  PropertyCondition,
  InvestmentStatus,
  ReportStatus,
  ReportTargetType,
  StatisticIndicator,
  MoroccoRegion,
} from '@/generated/prisma/client'

// API response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Search params
export interface ArticleSearchParams {
  category?: string
  search?: string
  page?: number
}

export interface JobSearchParams {
  search?: string
  city?: string
  region?: string
  jobCategory?: string
  contractType?: string
  dateRange?: 'week' | 'month' | 'all'
  sort?: 'date' | 'relevance'
  page?: number
}

export interface InvestmentSearchParams {
  investmentType?: string
  city?: string
  region?: string
  priceMin?: number
  priceMax?: number
  sort?: 'date' | 'price_asc' | 'price_desc'
  page?: number
}

export interface StatisticSearchParams {
  year?: number
  region?: string
  indicator?: string
}
