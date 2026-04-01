"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Newspaper,
  Briefcase,
  BarChart3,
  Building2,
  Menu,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { UserNav } from "@/components/layout/UserNav"

const NAV_ITEMS = [
  { href: "/actualites", label: "Actualités", icon: Newspaper },
  { href: "/emplois", label: "SiyahaJobs", icon: Briefcase },
  { href: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { href: "/investissement", label: "Investissement", icon: Building2 },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-ocean">
              Siyaha<span className="text-sahara">Mag</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-ocean-50 text-ocean"
                      : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <UserNav />
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-left">
                <span className="text-xl font-bold text-ocean">
                  Siyaha<span className="text-sahara">Mag</span>
                </span>
              </SheetTitle>
              <nav className="flex flex-col gap-1 mt-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-ocean-50 text-ocean"
                          : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="border-t border-border mt-6 pt-6 flex flex-col gap-2">
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link href="/connexion" onClick={() => setMobileOpen(false)}>
                    <LogIn className="h-4 w-4" />
                    Se connecter
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start gap-2 bg-ocean hover:bg-ocean/90">
                  <Link href="/inscription" onClick={() => setMobileOpen(false)}>
                    <UserPlus className="h-4 w-4" />
                    Créer un compte
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
