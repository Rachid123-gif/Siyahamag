import { Badge } from "@/components/ui/badge"
import type { ArticleStatus } from "@/types"

interface StatusBadgeProps {
  status: ArticleStatus
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  DRAFT: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-700 border-0",
  },
  PUBLISHED: {
    label: "Publi\u00e9",
    className: "bg-green-100 text-green-700 border-0",
  },
  SCHEDULED: {
    label: "Programm\u00e9",
    className: "bg-orange-100 text-orange-700 border-0",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700 border-0",
  }

  return <Badge className={config.className}>{config.label}</Badge>
}
