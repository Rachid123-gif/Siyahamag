import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

/**
 * Verify that the current request comes from an authenticated admin user.
 * Returns the Prisma User record when valid, or null otherwise.
 */
export async function getAuthenticatedAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser || dbUser.role !== "ADMIN") return null

  return dbUser
}

/**
 * Verify that the current request comes from any authenticated user.
 * Returns the Prisma User record when valid, or null otherwise.
 */
export async function getAuthenticatedUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
  })

  if (!dbUser) return null

  return dbUser
}

/**
 * Verify that the current request comes from an authenticated candidate.
 * Returns the User record with their CandidateProfile, or null.
 */
export async function getAuthenticatedCandidate() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { candidateProfile: true },
  })

  if (!dbUser || dbUser.role !== "CANDIDATE") return null

  return dbUser
}

/**
 * Verify that the current request comes from an authenticated employer
 * who owns a company. Returns the User record and their Company, or null.
 */
export async function getAuthenticatedEmployer() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { company: true },
  })

  if (!dbUser || dbUser.role !== "EMPLOYER" || !dbUser.company) return null

  return { user: dbUser, company: dbUser.company }
}
