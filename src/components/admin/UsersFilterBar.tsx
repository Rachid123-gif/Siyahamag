"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface UsersFilterBarProps {
  currentRole: string
  currentStatus: string
  currentQuery: string
}

const ROLE_OPTIONS = [
  { value: "", label: "Tous les roles" },
  { value: "CANDIDATE", label: "Candidats" },
  { value: "EMPLOYER", label: "Employeurs" },
  { value: "INVESTOR", label: "Investisseurs" },
  { value: "ADMIN", label: "Admins" },
]

const STATUS_OPTIONS = [
  { value: "all", label: "Tous" },
  { value: "active", label: "Actifs" },
  { value: "suspended", label: "Suspendus" },
]

export function UsersFilterBar({
  currentRole,
  currentStatus,
  currentQuery,
}: UsersFilterBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(currentQuery)

  const buildUrl = useCallback(
    (role: string, status: string, q: string) => {
      const params = new URLSearchParams()
      if (role) params.set("role", role)
      if (status && status !== "all") params.set("status", status)
      if (q.trim()) params.set("q", q.trim())
      const qs = params.toString()
      return `/admin/utilisateurs${qs ? `?${qs}` : ""}`
    },
    []
  )

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(buildUrl(e.target.value, currentStatus, query))
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(buildUrl(currentRole, e.target.value, query))
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(buildUrl(currentRole, currentStatus, query))
  }

  function handleClearSearch() {
    setQuery("")
    router.push(buildUrl(currentRole, currentStatus, ""))
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <select
        value={currentRole}
        onChange={handleRoleChange}
        className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Filtrer par role"
      >
        {ROLE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Filtrer par statut"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Rechercher un utilisateur"
          />
          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">
          Rechercher
        </Button>
      </form>
    </div>
  )
}
