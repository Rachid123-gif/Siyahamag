"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn, UserPlus, LogOut, User, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function UserNav() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/connexion" className="gap-2">
            <LogIn className="h-4 w-4" />
            Se connecter
          </Link>
        </Button>
        <Button asChild size="sm" className="bg-ocean hover:bg-ocean/90">
          <Link href="/inscription" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Créer un compte
          </Link>
        </Button>
      </div>
    )
  }

  const initials = user.user_metadata?.name
    ? user.user_metadata.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? "U"

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center h-9 w-9 rounded-full bg-ocean text-white text-sm font-medium hover:bg-ocean/90 transition-colors"
      >
        {initials}
      </button>

      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-white shadow-lg z-50">
            <div className="p-3 border-b border-border">
              {user.user_metadata?.name && (
                <p className="font-medium text-sm">{user.user_metadata.name}</p>
              )}
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="p-1">
              <Link
                href="/tableau-de-bord"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Tableau de bord
              </Link>
              <Link
                href="/profil"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <User className="h-4 w-4" />
                Mon profil
              </Link>
            </div>
            <div className="border-t border-border p-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors text-destructive w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
