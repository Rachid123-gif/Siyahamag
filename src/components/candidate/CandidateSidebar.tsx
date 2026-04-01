"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  FileText,
  Bell,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    href: "/candidat",
    icon: LayoutDashboard,
  },
  {
    label: "Mon profil",
    href: "/candidat/profil",
    icon: User,
  },
  {
    label: "Mes candidatures",
    href: "/candidat/candidatures",
    icon: FileText,
  },
  {
    label: "Alertes emploi",
    href: "/candidat/alertes",
    icon: Bell,
  },
]

export function CandidateSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/candidat") return pathname === "/candidat"
    return pathname.startsWith(href)
  }

  const navContent = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-card transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/candidat"
            className="text-lg font-bold tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            SiyahaMag{" "}
            <span className="text-muted-foreground font-normal text-sm">
              Candidat
            </span>
          </Link>
        </div>
        {navContent}
      </aside>
    </>
  )
}
