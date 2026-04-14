"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import {
  Newspaper,
  Briefcase,
  Mail,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronRight,
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
import { UserNav } from "@/components/layout/UserNav"

// ── Sub-menu data ────────────────────────────────────────────────────

const ACTUALITES_ITEMS = [
  { href: "/actualites/invest", label: "Invest", icon: TrendingUp },
  { href: "/actualites/gouvernement", label: "Gouvernement", icon: Landmark },
  { href: "/actualites/marches", label: "Marchés", icon: ShoppingCart },
  { href: "/actualites/projets", label: "Projets & Fédérations", icon: FolderKanban },
  { href: "/actualites/evenements", label: "Événements", icon: CalendarDays },
  { href: "/actualites/gastronomie", label: "Gastronomie", icon: UtensilsCrossed },
  { href: "/actualites/culture", label: "Culture & Patrimoine", icon: Palette },
]

const THEMATIQUES_ITEMS = [
  { href: "/thematiques/tech", label: "Tech", icon: Cpu },
  { href: "/thematiques/reglementation", label: "Réglementation", icon: Scale },
  { href: "/thematiques/tableaux-de-bord", label: "Tableaux de bord", icon: BarChart3 },
  { href: "/thematiques/academiques", label: "Académiques", icon: GraduationCap },
]

// ── Desktop dropdown ─────────────────────────────────────────────────

function DesktopDropdown({
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
  const router = useRouter()

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
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
          isActive
            ? "bg-ocean-50 text-ocean"
            : "text-muted-foreground hover:bg-ocean-50 hover:text-ocean"
        }`}
      >
        <Icon className="h-4 w-4" />
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-60 rounded-lg border border-border bg-white shadow-xl z-[100] py-1 animate-in fade-in-0 zoom-in-95 duration-150">
          <button
            type="button"
            onClick={() => { setOpen(false); router.push(mainHref) }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-ocean hover:bg-ocean-50 w-full text-left border-b border-border mb-1"
          >
            Tout voir
            <ChevronRight className="h-3.5 w-3.5 ml-auto" />
          </button>
          {items.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => { setOpen(false); router.push(item.href) }}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean transition-colors w-full text-left"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Header ───────────────────────────────────────────────────────────

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileActuOpen, setMobileActuOpen] = useState(false)
  const [mobileThemaOpen, setMobileThemaOpen] = useState(false)

  function navigateMobile(href: string) {
    setMobileOpen(false)
    setMobileActuOpen(false)
    setMobileThemaOpen(false)
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl font-bold text-ocean">
              Siyaha<span className="text-sahara">Mag</span>
            </span>
          </Link>

          {/* Desktop navigation — visible from md (768px) */}
          <nav className="hidden md:flex items-center gap-0.5">
            <DesktopDropdown
              label="Actualités"
              icon={Newspaper}
              items={ACTUALITES_ITEMS}
              isActive={pathname.startsWith("/actualites")}
              mainHref="/actualites"
            />
            <DesktopDropdown
              label="Thématiques"
              icon={BookOpen}
              items={THEMATIQUES_ITEMS}
              isActive={pathname.startsWith("/thematiques")}
              mainHref="/thematiques"
            />
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

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            <UserNav />
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — simple div overlay, no Sheet/Dialog */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 space-y-1">
            {/* Actualités accordion */}
            <button
              type="button"
              onClick={() => setMobileActuOpen(!mobileActuOpen)}
              className="flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-ocean-50"
            >
              <span className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-ocean" />
                Actualités
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${mobileActuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileActuOpen && (
              <div className="ml-4 pl-4 border-l-2 border-ocean-100 space-y-0.5">
                <button
                  type="button"
                  onClick={() => navigateMobile("/actualites")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-ocean hover:bg-ocean-50 w-full text-left"
                >
                  Toutes les actualités
                </button>
                {ACTUALITES_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateMobile(item.href)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean w-full text-left"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Thématiques accordion */}
            <button
              type="button"
              onClick={() => setMobileThemaOpen(!mobileThemaOpen)}
              className="flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-ocean-50"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-ocean" />
                Thématiques
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${mobileThemaOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileThemaOpen && (
              <div className="ml-4 pl-4 border-l-2 border-ocean-100 space-y-0.5">
                <button
                  type="button"
                  onClick={() => navigateMobile("/thematiques")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-ocean hover:bg-ocean-50 w-full text-left"
                >
                  Toutes les thématiques
                </button>
                {THEMATIQUES_ITEMS.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateMobile(item.href)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-ocean-50 hover:text-ocean w-full text-left"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Direct links */}
            <div className="border-t border-border pt-2 mt-2 space-y-0.5">
              <button
                type="button"
                onClick={() => navigateMobile("/emplois")}
                className="flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-ocean-50 w-full text-left"
              >
                <Briefcase className="h-5 w-5 text-ocean" />
                Offres d&apos;Emploi
              </button>
              <button
                type="button"
                onClick={() => navigateMobile("/newsletter")}
                className="flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-ocean-50 w-full text-left"
              >
                <Mail className="h-5 w-5 text-ocean" />
                Newsletter
              </button>
            </div>

            {/* Auth buttons */}
            <div className="border-t border-border pt-3 mt-3 space-y-2">
              <button
                type="button"
                onClick={() => navigateMobile("/connexion")}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted w-full"
              >
                <LogIn className="h-4 w-4" />
                Se connecter
              </button>
              <button
                type="button"
                onClick={() => navigateMobile("/inscription")}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-ocean text-white hover:bg-ocean/90 w-full"
              >
                <UserPlus className="h-4 w-4" />
                Créer un compte
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
