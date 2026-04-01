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
import { ShieldCheck, XCircle } from "lucide-react"
import { toast } from "sonner"

interface CompanyModerationActionsProps {
  companyId: string
  currentStatus: string
}

export function CompanyModerationActions({
  companyId,
  currentStatus,
}: CompanyModerationActionsProps) {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  if (currentStatus !== "PENDING") {
    return null
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    try {
      const response = await fetch(
        `/api/admin/moderation/companies/${companyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "VERIFY" }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors de la verification")
      }

      toast.success("Entreprise verifiee avec succes")
      router.push("/admin/moderation/entreprises")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la verification de l'entreprise"
      )
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Veuillez indiquer un motif de rejet")
      return
    }

    setIsRejecting(true)
    try {
      const response = await fetch(
        `/api/admin/moderation/companies/${companyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "REJECT",
            reason: rejectionReason.trim(),
          }),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors du rejet")
      }

      toast.success("Entreprise rejetee")
      setDialogOpen(false)
      router.push("/admin/moderation/entreprises")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors du rejet de l'entreprise"
      )
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleVerify}
        disabled={isVerifying}
        className="gap-2 bg-emerald-600 hover:bg-emerald-700"
      >
        <ShieldCheck className="h-4 w-4" />
        {isVerifying ? "Verification..." : "Verifier"}
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
            <DialogTitle>Rejeter cette entreprise</DialogTitle>
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
