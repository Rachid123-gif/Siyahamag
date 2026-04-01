import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string().min(1, 'Le titre du poste est requis').max(200),
  jobCategory: z.enum(['RECEPTION', 'CUISINE', 'SERVICE', 'ANIMATION', 'GUIDE', 'BIEN_ETRE', 'MANAGEMENT', 'MICE', 'TRANSPORT', 'ENTRETIEN'], {
    message: 'La catégorie du métier est requise',
  }),
  contractType: z.enum(['CDI', 'CDD', 'SAISONNIER', 'STAGE', 'FREELANCE'], {
    message: 'Le type de contrat est requis',
  }),
  city: z.string().min(1, 'La ville est requise'),
  region: z.enum(['MARRAKECH_SAFI', 'SOUSS_MASSA', 'TANGER_TETOUAN_AL_HOCEIMA', 'FES_MEKNES', 'RABAT_SALE_KENITRA', 'CASABLANCA_SETTAT', 'ORIENTAL', 'BENI_MELLAL_KHENIFRA', 'DRAA_TAFILALET', 'GUELMIM_OUED_NOUN', 'LAAYOUNE_SAKIA_EL_HAMRA', 'DAKHLA_OUED_ED_DAHAB']).optional().nullable(),
  description: z.any(),
  skills: z.array(z.string()).min(1, 'Au moins une compétence est requise'),
  experience: z.string().optional(),
  salary: z.string().optional(),
  deadline: z.string().datetime().optional().nullable(),
})

export const updateJobSchema = createJobSchema.partial()

export const applyToJobSchema = z.object({
  candidateName: z.string().min(1, 'Le nom est requis'),
  candidateEmail: z.string().email("L'email n'est pas valide"),
  message: z.string().max(2000, 'Le message ne doit pas dépasser 2000 caractères').optional(),
  cvUrl: z.string().min(1, 'Le CV est requis'),
})

export type CreateJobInput = z.infer<typeof createJobSchema>
export type UpdateJobInput = z.infer<typeof updateJobSchema>
export type ApplyToJobInput = z.infer<typeof applyToJobSchema>
