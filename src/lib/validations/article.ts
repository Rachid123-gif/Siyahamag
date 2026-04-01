import { z } from 'zod'

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200, 'Le titre ne doit pas dépasser 200 caractères'),
  category: z.enum(['HEBERGEMENT', 'TRANSPORT', 'AERIEN', 'GASTRONOMIE', 'EVENEMENTS', 'DEVELOPPEMENT', 'MICE'], {
    message: 'La catégorie est requise',
  }),
  content: z.any(),
  summary: z.string().max(500, 'Le résumé ne doit pas dépasser 500 caractères').optional(),
  coverImage: z.string().url('URL invalide').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']).default('DRAFT'),
  scheduledAt: z.string().datetime().optional().nullable(),
})

export const updateArticleSchema = createArticleSchema.partial()

export type CreateArticleInput = z.infer<typeof createArticleSchema>
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>
