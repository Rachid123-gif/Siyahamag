import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string
  year: number
  source: string
  icon: LucideIcon
  color: string
}

export function KpiCard({
  title,
  value,
  year,
  source,
  icon: Icon,
  color,
}: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 pt-2">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
            color
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {year} &middot; {source}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
