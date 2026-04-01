import { z } from 'zod'

export const createReportSchema = z.object({
  targetType: z.enum(['JOB_LISTING', 'INVESTMENT'], {
    message: 'Le type de cible est requis',
  }),
  targetId: z.string().uuid(),
  reason: z.string().min(10, 'Veuillez décrire la raison du signalement (minimum 10 caractères)').max(1000),
  reporterEmail: z.string().email("L'email n'est pas valide"),
})

export type CreateReportInput = z.infer<typeof createReportSchema>
