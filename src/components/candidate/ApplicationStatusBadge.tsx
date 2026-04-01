import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types"

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
}

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  UNREAD: {
    label: "Non lue",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  VIEWED: {
    label: "Vue",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  SHORTLISTED: {
    label: "Retenue",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  REJECTED: {
    label: "Refusee",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.UNREAD

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
