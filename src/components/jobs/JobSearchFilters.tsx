"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { JOB_CATEGORIES, CONTRACT_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type JobCategoryKey = keyof typeof JOB_CATEGORIES
type ContractTypeKey = keyof typeof CONTRACT_TYPES

export function JobSearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeCategory = searchParams.get("jobCategory") ?? ""
  const activeContract = searchParams.get("contractType") ?? ""

  const hasFilters = activeCategory || activeContract

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      // Reset to page 1 when changing filters
      params.delete("page")
      router.push(`/emplois?${params.toString()}`)
    },
    [router, searchParams]
  )

  function handleCategoryClick(key: string) {
    updateParams("jobCategory", activeCategory === key ? "" : key)
  }

  function handleContractClick(key: string) {
    updateParams("contractType", activeContract === key ? "" : key)
  }

  function handleReset() {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("jobCategory")
    params.delete("contractType")
    params.delete("page")
    router.push(`/emplois?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {/* Job categories */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Secteur
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(JOB_CATEGORIES) as JobCategoryKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                activeCategory === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {JOB_CATEGORIES[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Contract types */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Type de contrat
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CONTRACT_TYPES) as ContractTypeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleContractClick(key)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                activeContract === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {CONTRACT_TYPES[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Reset button */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground"
        >
          <X className="mr-1 size-4" />
          Reinitialiser les filtres
        </Button>
      )}
    </div>
  )
}
