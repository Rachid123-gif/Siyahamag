"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Newspaper,
  Briefcase,
  Mail,
  Menu,
  LogIn,
  UserPlus,
  ChevronDown,
  BookOpen,
  TrendingUp,
  Landmark,
  ShoppingCart,
  FolderKanban,
  CalendarDays,
  UtensilsCrossed,
  Palette,
  Cpu,
  Scale,
  BarChart3,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { UserNav } from "@/components/layout/UserNav"

// ── Actualités sub-categories ────────────────────────────────────────
const ACTUALITES_ITEMS = [
  { href: "/actualites/invest", label: "Invest", icon: TrendingUp },
  { href: "/actualites/gouvernement", label: "Gouvernement", icon: Landmark },
  { href: "/actualites/marches", label: "Marchés", icon: ShoppingCart },
  { href: "/actualites/projets", label: "Projets & Fédérations", icon: FolderKanban },
  { href: "/actualites/evenements", label: "Événements", icon: CalendarDays },
  { href: "/actualites/gastronomie", label: "Gastronomie", icon: UtensilsCrossed },
  { href: "/actualites/culture", label: "Culture & Patrimoine", icon: Palette },
]

// ── Thématiques sub-categories ───────────────────────────────────────
const THEMATIQUES_ITEMS = [
  { href: "/thematiques/tech", label: "Tech", icon: Cpu },
  { href: "/thematiques/reglementation", label: "Réglementation", icon: Scale },
  { href: "/thematiques/tableaux-de-bord", label: "Tableaux de bord", icon: BarChart3 },
  { href: "/thematiques/academiques", label: "Académiques", icon: GraduationCap },
]

// ── Dropdown component ───────────────────────────────────────────────
function NavDropdown({
  label,
  icon: Icon,
  items,
  isActive,
  mainHref,
}: {
  label: string
  icon: React.ElementType
  items: { href: string; label: string; icon: React.ElementType }[]
  isActive: boolean
  mainHref: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-ocean-50 text-ocean"
            : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 rounded-lg border border-border bg-white shadow-lg z-50 py-1">
          {/* Link to main section */}
          <Link
            href={mainHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-ocean hover:bg-ocean-50 border-b border-border mb-1"
          >
            Tout voir
          </Link>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Header ───────────────────────────────────────────────────────────
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
          <nav className="hidden lg:flex items-center gap-1">
            {/* Actualités dropdown */}
            <NavDropdown
              label="Actualités"
              icon={Newspaper}
              items={ACTUALITES_ITEMS}
              isActive={pathname.startsWith("/actualites")}
              mainHref="/actualites"
            />

            {/* Thématiques dropdown */}
            <NavDropdown
              label="Thématiques"
              icon={BookOpen}
              items={THEMATIQUES_ITEMS}
              isActive={pathname.startsWith("/thematiques")}
              mainHref="/thematiques"
            />

            {/* Offres d'Emploi */}
            <Link
              href="/emplois"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/emplois")
                  ? "bg-ocean-50 text-ocean"
                  : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Offres d&apos;Emploi
            </Link>

            {/* Newsletter */}
            <Link
              href="/newsletter"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/newsletter")
                  ? "bg-ocean-50 text-ocean"
                  : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
              }`}
            >
              <Mail className="h-4 w-4" />
              Newsletter
            </Link>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <UserNav />
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetTitle className="text-left">
                <span className="text-xl font-bold text-ocean">
                  Siyaha<span className="text-sahara">Mag</span>
                </span>
              </SheetTitle>

              <nav className="flex flex-col gap-1 mt-6">
                {/* Actualités section */}
                <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actualités
                </p>
                <Link
                  href="/actualites"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-ocean hover:bg-ocean-50"
                >
                  <Newspaper className="h-4 w-4" />
                  Toutes les actualités
                </Link>
                {ACTUALITES_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 pl-6 py-2 rounded-md text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}

                {/* Thématiques section */}
                <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Thématiques
                </p>
                {THEMATIQUES_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 pl-6 py-2 rounded-md text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}

                {/* Direct links */}
                <div className="border-t border-border mt-3 pt-3">
                  <Link
                    href="/emplois"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      pathname.startsWith("/emplois")
                        ? "bg-ocean-50 text-ocean"
                        : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                    Offres d&apos;Emploi
                  </Link>
                  <Link
                    href="/newsletter"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      pathname.startsWith("/newsletter")
                        ? "bg-ocean-50 text-ocean"
                        : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
                    }`}
                  >
                    <Mail className="h-5 w-5" />
                    Newsletter
                  </Link>
                </div>
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
