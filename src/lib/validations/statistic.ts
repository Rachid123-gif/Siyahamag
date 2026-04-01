import { z } from 'zod'

export const createStatisticSchema = z.object({
  indicator: z.enum(['TOURISTS', 'REVENUE', 'NIGHTS', 'OCCUPANCY_RATE'], {
    message: "L'indicateur est requis",
  }),
  value: z.number().positive('La valeur doit être positive'),
  year: z.number().int().min(2000).max(2100, "L'année n'est pas valide"),
  region: z.enum(['MARRAKECH_SAFI', 'SOUSS_MASSA', 'TANGER_TETOUAN_AL_HOCEIMA', 'FES_MEKNES', 'RABAT_SALE_KENITRA', 'CASABLANCA_SETTAT', 'ORIENTAL', 'BENI_MELLAL_KHENIFRA', 'DRAA_TAFILALET', 'GUELMIM_OUED_NOUN', 'LAAYOUNE_SAKIA_EL_HAMRA', 'DAKHLA_OUED_ED_DAHAB']).optional().nullable(),
  source: z.string().min(1, 'La source est requise'),
})

export const updateStatisticSchema = createStatisticSchema.partial()

export type CreateStatisticInput = z.infer<typeof createStatisticSchema>
export type UpdateStatisticInput = z.infer<typeof updateStatisticSchema>
