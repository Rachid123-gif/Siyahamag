import { z } from 'zod'

export const createInvestmentSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200),
  investmentType: z.enum(['TERRAIN', 'HOTEL', 'RIAD', 'RESTAURANT', 'PROJET', 'AUTRE'], {
    message: "Le type d'investissement est requis",
  }),
  city: z.string().min(1, 'La ville est requise'),
  region: z.enum(['MARRAKECH_SAFI', 'SOUSS_MASSA', 'TANGER_TETOUAN_AL_HOCEIMA', 'FES_MEKNES', 'RABAT_SALE_KENITRA', 'CASABLANCA_SETTAT', 'ORIENTAL', 'BENI_MELLAL_KHENIFRA', 'DRAA_TAFILALET', 'GUELMIM_OUED_NOUN', 'LAAYOUNE_SAKIA_EL_HAMRA', 'DAKHLA_OUED_ED_DAHAB']).optional().nullable(),
  price: z.number().positive('Le prix doit être positif').optional().nullable(),
  surface: z.number().positive('La superficie doit être positive').optional().nullable(),
  rooms: z.number().int().positive().optional().nullable(),
  condition: z.enum(['NEUF', 'A_RENOVER', 'EN_ACTIVITE']).optional().nullable(),
  description: z.any(),
  images: z.array(z.string().url()).max(10, 'Maximum 10 images'),
  contactName: z.string().min(1, 'Le nom de contact est requis'),
  contactCompany: z.string().optional(),
  contactEmail: z.string().email("L'email de contact n'est pas valide"),
})

export const updateInvestmentSchema = createInvestmentSchema.partial()

export const contactSellerSchema = z.object({
  senderName: z.string().min(1, 'Votre nom est requis'),
  senderEmail: z.string().email("L'email n'est pas valide"),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
})

export type CreateInvestmentInput = z.infer<typeof createInvestmentSchema>
export type UpdateInvestmentInput = z.infer<typeof updateInvestmentSchema>
export type ContactSellerInput = z.infer<typeof contactSellerSchema>
