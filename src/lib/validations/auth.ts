import { z } from 'zod'

export const signupCandidateSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  city: z.string().optional(),
  phone: z.string().optional(),
})

export const signupEmployerSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  companyName: z.string().min(1, "Le nom de l'entreprise est requis"),
  companyEmail: z.string().email("L'email professionnel n'est pas valide"),
  ice: z.string().optional().or(z.literal('')),
  website: z.string().url("L'URL doit être valide (ex: https://...)").optional().or(z.literal('')),
  city: z.string().min(1, 'La ville est requise'),
  sector: z.string().min(1, 'Le secteur est requis'),
})

export const loginSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

export type SignupCandidateInput = z.infer<typeof signupCandidateSchema>
export type SignupEmployerInput = z.infer<typeof signupEmployerSchema>
export type LoginInput = z.infer<typeof loginSchema>
