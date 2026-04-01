import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

/**
 * Format a date in French long format: "1 avril 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return format(d, "d MMMM yyyy", { locale: fr })
}

/**
 * Format a date as relative time in French: "il y a 2h", "il y a 3j"
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true, locale: fr })
}

/**
 * Calculate reading time from Tiptap JSON content.
 * Assumes average reading speed of 200 words per minute (French).
 */
export function calculateReadingTime(content: unknown): number {
  const text = extractTextFromTiptap(content)
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(wordCount / 200)
  return Math.max(1, minutes)
}

/**
 * Recursively extract plain text from a Tiptap JSON document.
 */
function extractTextFromTiptap(node: unknown): string {
  if (!node || typeof node !== "object") return ""

  const n = node as Record<string, unknown>

  // Text node
  if (n.type === "text" && typeof n.text === "string") {
    return n.text
  }

  // Node with children
  if (Array.isArray(n.content)) {
    return (n.content as unknown[]).map(extractTextFromTiptap).join(" ")
  }

  return ""
}
