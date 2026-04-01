"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STATISTIC_INDICATORS, MOROCCO_REGIONS } from "@/lib/constants"
import { createStatisticSchema } from "@/lib/validations/statistic"
import { toast } from "sonner"
import { Plus, Pencil } from "lucide-react"
import type { TourismStatistic, StatisticIndicator, MoroccoRegion } from "@/types"

const INDICATOR_KEYS = Object.keys(STATISTIC_INDICATORS) as StatisticIndicator[]
const REGION_KEYS = Object.keys(MOROCCO_REGIONS) as MoroccoRegion[]

interface StatisticFormModalProps {
  statistic?: TourismStatistic | null
}

export function StatisticFormModal({
  statistic,
}: StatisticFormModalProps) {
  const router = useRouter()
  const isEditing = !!statistic
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [indicator, setIndicator] = useState<StatisticIndicator>("TOURISTS")
  const [value, setValue] = useState("")
  const [year, setYear] = useState("")
  const [region, setRegion] = useState<string>("")
  const [source, setSource] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Populate form when editing
  useEffect(() => {
    if (statistic && open) {
      setIndicator(statistic.indicator as StatisticIndicator)
      setValue(String(statistic.value))
      setYear(String(statistic.year))
      setRegion(statistic.region ?? "")
      setSource(statistic.source)
      setErrors({})
    } else if (!statistic && open) {
      setIndicator("TOURISTS")
      setValue("")
      setYear("")
      setRegion("")
      setSource("")
      setErrors({})
    }
  }, [statistic, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const payload = {
      indicator,
      value: parseFloat(value),
      year: parseInt(year, 10),
      region: region || null,
      source: source.trim(),
    }

    // Client-side validation
    const parsed = createStatisticSchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    // Additional validation for occupancy rate
    if (indicator === "OCCUPANCY_RATE" && parseFloat(value) > 100) {
      setErrors({ value: "Le taux d'occupation ne peut pas depasser 100%" })
      return
    }

    setIsSubmitting(true)
    try {
      const url = isEditing
        ? `/api/admin/statistics/${statistic.id}`
        : "/api/admin/statistics"
      const method = isEditing ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'enregistrement")
      }

      toast.success(
        isEditing
          ? "Statistique mise a jour avec succes"
          : "Statistique creee avec succes"
      )
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'enregistrement"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const defaultTrigger = isEditing ? (
    <Button variant="ghost" size="icon">
      <Pencil className="h-4 w-4" />
      <span className="sr-only">Modifier</span>
    </Button>
  ) : (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Ajouter une donnee
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={defaultTrigger} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier la statistique" : "Ajouter une statistique"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Indicator */}
          <div className="space-y-1.5">
            <Label htmlFor="stat-indicator">Indicateur</Label>
            <select
              id="stat-indicator"
              value={indicator}
              onChange={(e) =>
                setIndicator(e.target.value as StatisticIndicator)
              }
              className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {INDICATOR_KEYS.map((key) => (
                <option key={key} value={key}>
                  {STATISTIC_INDICATORS[key]}
                </option>
              ))}
            </select>
            {errors.indicator && (
              <p className="text-xs text-destructive">{errors.indicator}</p>
            )}
          </div>

          {/* Value */}
          <div className="space-y-1.5">
            <Label htmlFor="stat-value">Valeur</Label>
            <Input
              id="stat-value"
              type="number"
              step="any"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                indicator === "OCCUPANCY_RATE"
                  ? "Ex: 65.5"
                  : "Ex: 14200000"
              }
            />
            {errors.value && (
              <p className="text-xs text-destructive">{errors.value}</p>
            )}
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <Label htmlFor="stat-year">Annee</Label>
            <Input
              id="stat-year"
              type="number"
              min="2000"
              max="2030"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 2024"
            />
            {errors.year && (
              <p className="text-xs text-destructive">{errors.year}</p>
            )}
          </div>

          {/* Region (optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="stat-region">
              Region{" "}
              <span className="font-normal text-muted-foreground">
                (optionnel - vide = national)
              </span>
            </Label>
            <select
              id="stat-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">National</option>
              {REGION_KEYS.map((key) => (
                <option key={key} value={key}>
                  {MOROCCO_REGIONS[key]}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-xs text-destructive">{errors.region}</p>
            )}
          </div>

          {/* Source */}
          <div className="space-y-1.5">
            <Label htmlFor="stat-source">Source</Label>
            <Input
              id="stat-source"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Ex: Ministere du Tourisme"
            />
            {errors.source && (
              <p className="text-xs text-destructive">{errors.source}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Enregistrement..."
                : isEditing
                  ? "Mettre a jour"
                  : "Creer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
