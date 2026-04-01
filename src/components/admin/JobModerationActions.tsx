"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

interface JobModerationActionsProps {
  jobId: string
  currentStatus: string
}

export function JobModerationActions({
  jobId,
  currentStatus,
}: JobModerationActionsProps) {
  const router = useRouter()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  if (currentStatus !== "PENDING") {
    return null
  }

  const handleApprove = async () => {
    setIsApproving(true)
    try {
      const response = await fetch(`/api/admin/moderation/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "APPROVE" }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors de l'approbation")
      }

      toast.success("Offre d'emploi approuvee avec succes")
      router.push("/admin/moderation/offres")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'approbation de l'offre"
      )
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Veuillez indiquer un motif de rejet")
      return
    }

    setIsRejecting(true)
    try {
      const response = await fetch(`/api/admin/moderation/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REJECT",
          reason: rejectionReason.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors du rejet")
      }

      toast.success("Offre d'emploi rejetee")
      setDialogOpen(false)
      router.push("/admin/moderation/offres")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors du rejet de l'offre"
      )
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleApprove}
        disabled={isApproving}
        className="gap-2 bg-emerald-600 hover:bg-emerald-700"
      >
        <CheckCircle2 className="h-4 w-4" />
        {isApproving ? "Approbation..." : "Approuver"}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          render={
            <Button variant="destructive" className="gap-2">
              <XCircle className="h-4 w-4" />
              Rejeter
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeter cette offre</DialogTitle>
            <DialogDescription>
              Indiquez le motif du rejet. L&apos;employeur sera notifie.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Textarea
              placeholder="Motif du rejet..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline" />}
            >
              Annuler
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isRejecting || !rejectionReason.trim()}
            >
              {isRejecting ? "Rejet en cours..." : "Confirmer le rejet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
