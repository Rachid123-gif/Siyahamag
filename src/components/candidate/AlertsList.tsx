"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  JOB_CATEGORIES,
  CONTRACT_TYPES,
  MOROCCO_REGIONS,
  MAJOR_CITIES,
} from "@/lib/constants"
import {
  Bell,
  Plus,
  Trash2,
  Loader2,
  MapPin,
  Briefcase,
  FileText,
  Map,
} from "lucide-react"
import type {
  JobAlert,
  JobCategory,
  ContractType,
  MoroccoRegion,
} from "@/types"

interface AlertsListProps {
  initialAlerts: JobAlert[]
}

const MAX_ALERTS = 10

export function AlertsList({ initialAlerts }: AlertsListProps) {
  const router = useRouter()
  const [alerts, setAlerts] = useState<JobAlert[]>(initialAlerts)
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Form state
  const [formCity, setFormCity] = useState("")
  const [formRegion, setFormRegion] = useState("")
  const [formCategory, setFormCategory] = useState("")
  const [formContract, setFormContract] = useState("")

  function resetForm() {
    setFormCity("")
    setFormRegion("")
    setFormCategory("")
    setFormContract("")
  }

  // Create alert
  async function handleCreate() {
    if (!formCity && !formRegion && !formCategory && !formContract) {
      toast.error("Veuillez specifier au moins un critere.")
      return
    }

    setCreating(true)
    try {
      const res = await fetch("/api/candidate/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: formCity || undefined,
          region: formRegion || undefined,
          jobCategory: formCategory || undefined,
          contractType: formContract || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la creation de l'alerte.")
        return
      }

      setAlerts([data.data, ...alerts])
      resetForm()
      setShowForm(false)
      toast.success("Alerte creee avec succes.")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la creation de l'alerte.")
    } finally {
      setCreating(false)
    }
  }

  // Toggle alert
  async function handleToggle(id: string, currentActive: boolean) {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/candidate/alerts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la mise a jour de l'alerte.")
        return
      }

      setAlerts(
        alerts.map((a) => (a.id === id ? { ...a, isActive: !currentActive } : a))
      )
      toast.success(currentActive ? "Alerte desactivee." : "Alerte activee.")
    } catch {
      toast.error("Erreur lors de la mise a jour de l'alerte.")
    } finally {
      setTogglingId(null)
    }
  }

  // Delete alert
  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/candidate/alerts/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la suppression de l'alerte.")
        return
      }

      setAlerts(alerts.filter((a) => a.id !== id))
      toast.success("Alerte supprimee.")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la suppression de l'alerte.")
    } finally {
      setDeletingId(null)
    }
  }

  // Build criteria summary for display
  function buildCriteriaSummary(alert: JobAlert): string[] {
    const parts: string[] = []
    if (alert.city) {
      parts.push(alert.city)
    }
    if (alert.region) {
      parts.push(
        MOROCCO_REGIONS[alert.region as MoroccoRegion] ?? alert.region
      )
    }
    if (alert.jobCategory) {
      parts.push(
        JOB_CATEGORIES[alert.jobCategory as JobCategory] ?? alert.jobCategory
      )
    }
    if (alert.contractType) {
      parts.push(
        CONTRACT_TYPES[alert.contractType as ContractType] ?? alert.contractType
      )
    }
    return parts
  }

  return (
    <div className="space-y-4">
      {/* New alert button or max alerts message */}
      {alerts.length >= MAX_ALERTS ? (
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300">
          Vous avez atteint la limite de {MAX_ALERTS} alertes. Supprimez une
          alerte existante pour en creer une nouvelle.
        </div>
      ) : (
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
        >
          {showForm ? (
            "Annuler"
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Nouvelle alerte
            </>
          )}
        </Button>
      )}

      {/* Inline create form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle alerte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="alert-city">Ville</Label>
                <select
                  id="alert-city"
                  value={formCity}
                  onChange={(e) => setFormCity(e.target.value)}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Toutes les villes</option>
                  {MAJOR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-region">Region</Label>
                <select
                  id="alert-region"
                  value={formRegion}
                  onChange={(e) => setFormRegion(e.target.value)}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Toutes les regions</option>
                  {Object.entries(MOROCCO_REGIONS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-category">Categorie</Label>
                <select
                  id="alert-category"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Toutes les categories</option>
                  {Object.entries(JOB_CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-contract">Type de contrat</Label>
                <select
                  id="alert-contract"
                  value={formContract}
                  onChange={(e) => setFormContract(e.target.value)}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Tous les contrats</option>
                  {Object.entries(CONTRACT_TYPES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creation...
                  </>
                ) : (
                  "Creer l'alerte"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts list */}
      {alerts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">
              Aucune alerte configuree.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Creez une alerte pour etre notifie des nouvelles offres
              correspondant a vos criteres.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const criteria = buildCriteriaSummary(alert)
            return (
              <Card key={alert.id}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          alert.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {alert.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {alert.city && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {alert.city}
                        </span>
                      )}
                      {alert.region && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Map className="h-3.5 w-3.5" />
                          {MOROCCO_REGIONS[alert.region as MoroccoRegion] ??
                            alert.region}
                        </span>
                      )}
                      {alert.jobCategory && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5" />
                          {JOB_CATEGORIES[
                            alert.jobCategory as JobCategory
                          ] ?? alert.jobCategory}
                        </span>
                      )}
                      {alert.contractType && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <FileText className="h-3.5 w-3.5" />
                          {CONTRACT_TYPES[
                            alert.contractType as ContractType
                          ] ?? alert.contractType}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggle(alert.id, alert.isActive)}
                      disabled={togglingId === alert.id}
                    >
                      {togglingId === alert.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : alert.isActive ? (
                        "Desactiver"
                      ) : (
                        "Activer"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(alert.id)}
                      disabled={deletingId === alert.id}
                      className="text-destructive hover:text-destructive"
                    >
                      {deletingId === alert.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
