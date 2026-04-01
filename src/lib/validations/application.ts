import { z } from 'zod'

// --- Authenticated candidate application ---

export const createApplicationSchema = z.object({
  jobListingId: z.string().uuid("L'identifiant de l'offre est invalide"),
  message: z
    .string()
    .max(2000, 'Le message ne doit pas dépasser 2000 caractères')
    .optional(),
  cvUrl: z.string().url("L'URL du CV est invalide").optional(),
})

// --- Guest application (no account) ---

export const createGuestApplicationSchema = z.object({
  jobListingId: z.string().uuid("L'identifiant de l'offre est invalide"),
  candidateName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  candidateEmail: z.string().email("L'email n'est pas valide"),
  cvUrl: z.string().url("L'URL du CV est invalide"),
  message: z
    .string()
    .max(2000, 'Le message ne doit pas dépasser 2000 caractères')
    .optional(),
})

// --- Update application status (employer) ---

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['VIEWED', 'SHORTLISTED', 'REJECTED'], {
    message: "Le statut doit être VIEWED, SHORTLISTED ou REJECTED",
  }),
})

// --- Job alert ---

export const createAlertSchema = z.object({
  city: z.string().optional(),
  region: z.string().optional(),
  jobCategory: z.string().optional(),
  contractType: z.string().optional(),
})

// --- Toggle alert ---

export const toggleAlertSchema = z.object({
  isActive: z.boolean(),
})

// --- Candidate profile update ---

export const updateCandidateProfileSchema = z.object({
  cvUrl: z.string().url("L'URL du CV est invalide").optional().nullable(),
  experiences: z.any().optional(),
  skills: z.array(z.string()).optional(),
  education: z.string().optional().nullable(),
  desiredCity: z.string().optional().nullable(),
  availability: z.enum(['IMMEDIATE', 'ONE_MONTH', 'THREE_MONTHS'], {
    message: "La disponibilité doit être IMMEDIATE, ONE_MONTH ou THREE_MONTHS",
  }).optional(),
})

// --- Inferred types ---

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>
export type CreateGuestApplicationInput = z.infer<typeof createGuestApplicationSchema>
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>
export type CreateAlertInput = z.infer<typeof createAlertSchema>
export type ToggleAlertInput = z.infer<typeof toggleAlertSchema>
export type UpdateCandidateProfileInput = z.infer<typeof updateCandidateProfileSchema>
