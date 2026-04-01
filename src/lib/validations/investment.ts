import { z } from 'zod'

export const createInvestmentSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères').max(150, 'Le titre ne peut pas dépasser 150 caractères'),
  investmentType: z.enum(['TERRAIN', 'HOTEL', 'RIAD', 'RESTAURANT', 'PROJET', 'AUTRE'], {
    message: "Le type d'investissement est requis",
  }),
  city: z.string().min(1, 'La ville est requise'),
  region: z.enum([
    'MARRAKECH_SAFI', 'SOUSS_MASSA', 'TANGER_TETOUAN_AL_HOCEIMA', 'FES_MEKNES',
    'RABAT_SALE_KENITRA', 'CASABLANCA_SETTAT', 'ORIENTAL', 'BENI_MELLAL_KHENIFRA',
    'DRAA_TAFILALET', 'GUELMIM_OUED_NOUN', 'LAAYOUNE_SAKIA_EL_HAMRA', 'DAKHLA_OUED_ED_DAHAB',
  ]).optional().nullable(),
  description: z.any(), // Tiptap JSON
  price: z.number().positive('Le prix doit être positif').optional().nullable(),
  surface: z.number().positive('La superficie doit être positive').optional().nullable(),
  rooms: z.number().int().positive('Le nombre de pièces doit être positif').optional().nullable(),
  condition: z.enum(['NEUF', 'A_RENOVER', 'EN_ACTIVITE']).optional().nullable(),
  images: z.array(z.string().url("L'URL de l'image n'est pas valide")).min(1, 'Au moins une image est requise').max(10, 'Maximum 10 images'),
  contactName: z.string().min(1, 'Le nom de contact est requis'),
  contactEmail: z.string().email("L'email de contact n'est pas valide"),
  contactCompany: z.string().optional().nullable(),
})

export const updateInvestmentSchema = createInvestmentSchema.partial()

export const contactSellerSchema = z.object({
  senderName: z.string().min(2, 'Votre nom doit contenir au moins 2 caractères'),
  senderEmail: z.string().email("L'email n'est pas valide"),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères').max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
})

export const moderateInvestmentSchema = z.object({
  action: z.enum(['APPROVE', 'REJECT'], {
    message: "L'action doit être APPROVE ou REJECT",
  }),
  reason: z.string().max(1000).optional().nullable(),
})

export type CreateInvestmentInput = z.infer<typeof createInvestmentSchema>
export type UpdateInvestmentInput = z.infer<typeof updateInvestmentSchema>
export type ContactSellerInput = z.infer<typeof contactSellerSchema>
export type ModerateInvestmentInput = z.infer<typeof moderateInvestmentSchema>
