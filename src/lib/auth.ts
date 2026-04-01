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
