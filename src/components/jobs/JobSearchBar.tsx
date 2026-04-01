"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

interface JobSearchBarProps {
  defaultQuery: string
  defaultCity: string
  cities: string[]
}

export function JobSearchBar({
  defaultQuery,
  defaultCity,
}: JobSearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(defaultQuery)
  const [city, setCity] = useState(defaultCity)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (query.trim()) {
      params.set("q", query.trim())
    } else {
      params.delete("q")
    }

    if (city.trim()) {
      params.set("city", city.trim())
    } else {
      params.delete("city")
    }

    // Reset page on new search
    params.delete("page")

    router.push(`/emplois?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:gap-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Poste, mot-cle..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 bg-white pl-10 text-foreground"
        />
      </div>
      <div className="relative flex-1 sm:max-w-[240px]">
        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Ville..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-11 bg-white pl-10 text-foreground"
        />
      </div>
      <Button type="submit" size="lg" className="h-11 shrink-0">
        Rechercher
      </Button>
    </form>
  )
}
