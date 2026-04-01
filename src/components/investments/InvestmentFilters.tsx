"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { INVESTMENT_TYPES, MAJOR_CITIES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { X, Search } from "lucide-react"

type InvestmentTypeKey = keyof typeof INVESTMENT_TYPES

export function InvestmentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeType = searchParams.get("investmentType") ?? ""
  const activeCity = searchParams.get("city") ?? ""
  const activePriceMin = searchParams.get("priceMin") ?? ""
  const activePriceMax = searchParams.get("priceMax") ?? ""

  const [city, setCity] = useState(activeCity)
  const [priceMin, setPriceMin] = useState(activePriceMin)
  const [priceMax, setPriceMax] = useState(activePriceMax)

  const hasFilters = activeType || activeCity || activePriceMin || activePriceMax

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      params.delete("page")
      router.push(`/investissement?${params.toString()}`)
    },
    [router, searchParams]
  )

  function handleTypeClick(key: string) {
    updateParams({ investmentType: activeType === key ? "" : key })
  }

  function handleCitySearch() {
    updateParams({ city: city.trim() })
  }

  function handlePriceSearch() {
    updateParams({
      priceMin: priceMin.trim(),
      priceMax: priceMax.trim(),
    })
  }

  function handleReset() {
    setCity("")
    setPriceMin("")
    setPriceMax("")
    router.push("/investissement")
  }

  return (
    <div className="space-y-4">
      {/* Investment type chips */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Type de bien
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(INVESTMENT_TYPES) as InvestmentTypeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => handleTypeClick(key)}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                activeType === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {INVESTMENT_TYPES[key]}
            </button>
          ))}
        </div>
      </div>

      {/* City + Price range */}
      <div className="flex flex-wrap items-end gap-3">
        {/* City */}
        <div className="w-full sm:w-auto">
          <label
            htmlFor="filter-city"
            className="mb-1.5 block text-sm font-medium text-muted-foreground"
          >
            Ville
          </label>
          <div className="flex gap-1.5">
            <Input
              id="filter-city"
              placeholder="Ex: Marrakech"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
              list="cities-list"
              className="w-40"
            />
            <datalist id="cities-list">
              {MAJOR_CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCitySearch}
              aria-label="Rechercher par ville"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </div>

        {/* Price range */}
        <div className="w-full sm:w-auto">
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Fourchette de prix (MAD)
          </label>
          <div className="flex items-center gap-1.5">
            <Input
              placeholder="Min"
              type="number"
              min="0"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePriceSearch()}
              className="w-28"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              placeholder="Max"
              type="number"
              min="0"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePriceSearch()}
              className="w-28"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handlePriceSearch}
              aria-label="Rechercher par prix"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Reset */}
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
