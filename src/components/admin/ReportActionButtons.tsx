"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface ReportActionButtonsProps {
  reportId: string
  currentStatus: string
}

export function ReportActionButtons({
  reportId,
  currentStatus,
}: ReportActionButtonsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  if (currentStatus !== "PENDING") {
    return null
  }

  async function handleAction(action: "RESOLVE" | "DISMISS") {
    setLoading(action)
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Une erreur est survenue.")
        return
      }

      toast.success(data.message)
      router.refresh()
    } catch {
      toast.error("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleAction("RESOLVE")}
        disabled={loading !== null}
        className="gap-1 text-[#059669] hover:text-[#059669]"
      >
        {loading === "RESOLVE" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <CheckCircle2 className="h-3.5 w-3.5" />
        )}
        Resoudre
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleAction("DISMISS")}
        disabled={loading !== null}
        className="gap-1 text-destructive hover:text-destructive"
      >
        {loading === "DISMISS" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <XCircle className="h-3.5 w-3.5" />
        )}
        Rejeter
      </Button>
    </div>
  )
}
