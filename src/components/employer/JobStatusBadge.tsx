import { Badge } from "@/components/ui/badge"
import type { JobStatus } from "@/types"

interface JobStatusBadgeProps {
  status: JobStatus
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "En attente",
    className: "bg-orange-100 text-orange-700 border-0",
  },
  APPROVED: {
    label: "Active",
    className: "bg-green-100 text-green-700 border-0",
  },
  REJECTED: {
    label: "Rejetée",
    className: "bg-red-100 text-red-700 border-0",
  },
  EXPIRED: {
    label: "Expirée",
    className: "bg-gray-100 text-gray-500 border-0",
  },
  DISABLED: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-700 border-0",
  },
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700 border-0",
  }

  return <Badge className={config.className}>{config.label}</Badge>
}
