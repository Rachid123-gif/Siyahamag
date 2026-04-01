import { z } from 'zod'

// --- Job creation / update ---

export const createJobSchema = z.object({
  title: z
    .string()
    .min(10, 'Le titre doit contenir au moins 10 caractères')
    .max(120, 'Le titre ne doit pas dépasser 120 caractères'),
  jobCategory: z.enum(
    [
      'RECEPTION',
      'CUISINE',
      'SERVICE',
      'ANIMATION',
      'GUIDE',
      'BIEN_ETRE',
      'MANAGEMENT',
      'MICE',
      'TRANSPORT',
      'ENTRETIEN',
    ],
    { message: 'La catégorie du métier est requise' }
  ),
  contractType: z.enum(['CDI', 'CDD', 'SAISONNIER', 'STAGE', 'FREELANCE'], {
    message: 'Le type de contrat est requis',
  }),
  city: z.string().min(1, 'La ville est requise'),
  region: z
    .enum([
      'MARRAKECH_SAFI',
      'SOUSS_MASSA',
      'TANGER_TETOUAN_AL_HOCEIMA',
      'FES_MEKNES',
      'RABAT_SALE_KENITRA',
      'CASABLANCA_SETTAT',
      'ORIENTAL',
      'BENI_MELLAL_KHENIFRA',
      'DRAA_TAFILALET',
      'GUELMIM_OUED_NOUN',
      'LAAYOUNE_SAKIA_EL_HAMRA',
      'DAKHLA_OUED_ED_DAHAB',
    ])
    .optional()
    .nullable(),
  description: z.any(), // Tiptap JSON
  skills: z.array(z.string()).min(1, 'Au moins une compétence est requise'),
  experience: z.string().optional(),
  salary: z.string().optional(),
  deadline: z.string().datetime().optional().nullable(),
  submit: z.boolean().optional(), // true = submit for moderation (PENDING), false/absent = DRAFT
})

export const updateJobSchema = createJobSchema.partial()

// --- Application ---

export const applyToJobSchema = z.object({
  candidateName: z.string().min(1, 'Le nom est requis'),
  candidateEmail: z.string().email("L'email n'est pas valide"),
  message: z
    .string()
    .max(2000, 'Le message ne doit pas dépasser 2000 caractères')
    .optional(),
  cvUrl: z.string().min(1, 'Le CV est requis'),
})

// --- Company profile update ---

export const updateCompanySchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères')
    .max(200)
    .optional(),
  description: z.string().max(2000).optional().nullable(),
  logo: z.string().url('L\'URL du logo est invalide').optional().nullable(),
  city: z.string().min(1).optional(),
  sector: z.string().min(1).optional(),
  website: z.string().url('L\'URL du site web est invalide').optional(),
  email: z.string().email('L\'email est invalide').optional(),
})

// --- Admin moderation ---

export const moderateJobSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT'], {
    message: "L'action doit être APPROVE ou REJECT",
  }),
  reason: z.string().max(1000).optional(),
})

export const moderateCompanySchema = z.object({
  action: z.enum(['VERIFY', 'REJECT'], {
    message: "L'action doit être VERIFY ou REJECT",
  }),
  reason: z.string().max(1000).optional(),
})

// --- Inferred types ---

export type CreateJobInput = z.infer<typeof createJobSchema>
export type UpdateJobInput = z.infer<typeof updateJobSchema>
export type ApplyToJobInput = z.infer<typeof applyToJobSchema>
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>
export type ModerateJobInput = z.infer<typeof moderateJobSchema>
export type ModerateCompanyInput = z.infer<typeof moderateCompanySchema>
