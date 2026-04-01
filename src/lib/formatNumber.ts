/**
 * Format a statistic value for display based on its indicator type.
 * - OCCUPANCY_RATE: percentage with one decimal
 * - Large numbers: abbreviated with M (millions), Mrd (milliards), K (milliers)
 * - Otherwise: French locale formatting
 */
export function formatStatValue(value: number, indicator: string): string {
  if (indicator === "OCCUPANCY_RATE") return `${value.toFixed(1)}%`
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} Mrd`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)} K`
  return value.toLocaleString("fr-FR")
}
