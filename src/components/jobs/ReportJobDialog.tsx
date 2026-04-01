"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flag } from "lucide-react"

interface ReportJobDialogProps {
  jobId: string
}

export function ReportJobDialog({ jobId }: ReportJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (reason.length < 10) {
      toast.error("Veuillez decrire la raison (minimum 10 caracteres).")
      return
    }

    if (!email) {
      toast.error("Veuillez saisir votre adresse email.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: "JOB_LISTING",
          targetId: jobId,
          reason,
          reporterEmail: email,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors du signalement.")
        return
      }

      toast.success("Signalement envoye. Merci pour votre vigilance.")
      setReason("")
      setEmail("")
      setOpen(false)
    } catch {
      toast.error("Erreur de connexion. Veuillez reessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm" className="text-muted-foreground" />
        }
      >
        <Flag className="mr-1.5 size-4" />
        Signaler cette offre
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Signaler cette offre</DialogTitle>
            <DialogDescription>
              Si vous pensez que cette offre est frauduleuse ou inappropriee,
              veuillez nous le signaler.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-reason">
                Raison du signalement
              </Label>
              <Textarea
                id="report-reason"
                placeholder="Decrivez pourquoi cette offre vous semble suspecte..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                minLength={10}
                maxLength={1000}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-email">Votre email</Label>
              <Input
                id="report-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Envoi..." : "Envoyer le signalement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
