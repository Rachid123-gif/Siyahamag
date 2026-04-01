"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ARTICLE_CATEGORIES } from "@/lib/constants"

interface CategoryFilterBarProps {
  currentCategory: string | null
  basePath?: string
}

export function CategoryFilterBar({
  currentCategory,
  basePath = "/actualites",
}: CategoryFilterBarProps) {
  const router = useRouter()

  function handleClick(categoryKey: string | null) {
    if (categoryKey === null) {
      router.push(basePath)
    } else {
      router.push(`${basePath}?category=${categoryKey}`)
    }
  }

  const isActive = (key: string | null) =>
    currentCategory === key || (key === null && !currentCategory)

  return (
    <nav
      aria-label="Filtrer par catégorie"
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
    >
      {/* "Toutes" chip */}
      <button
        onClick={() => handleClick(null)}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          isActive(null)
            ? "bg-ocean text-white"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
        )}
      >
        Toutes
      </button>

      {/* Category chips */}
      {Object.entries(ARTICLE_CATEGORIES).map(([key, label]) => (
        <button
          key={key}
          onClick={() => handleClick(key)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            isActive(key)
              ? "bg-ocean text-white"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          )}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
