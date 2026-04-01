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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

interface ContactSellerDialogProps {
  investmentSlug: string
}

export function ContactSellerDialog({ investmentSlug }: ContactSellerDialogProps) {
  const [open, setOpen] = useState(false)
  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!senderName.trim()) {
      toast.error("Veuillez saisir votre nom.")
      return
    }

    if (!senderEmail.trim()) {
      toast.error("Veuillez saisir votre adresse email.")
      return
    }

    if (message.trim().length < 20) {
      toast.error("Le message doit contenir au moins 20 caracteres.")
      return
    }

    if (message.trim().length > 2000) {
      toast.error("Le message ne doit pas depasser 2000 caracteres.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch(`/api/investments/${investmentSlug}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          message: message.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de l'envoi du message.")
        return
      }

      toast.success("Votre message a ete envoye au vendeur.")
      setSenderName("")
      setSenderEmail("")
      setMessage("")
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
          <Button className="w-full gap-2" size="lg" />
        }
      >
        <Mail className="size-4" />
        Contacter le vendeur
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Contacter le vendeur</DialogTitle>
            <DialogDescription>
              Envoyez un message au vendeur pour obtenir plus d&apos;informations
              sur cette opportunite d&apos;investissement.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Votre nom</Label>
              <Input
                id="contact-name"
                placeholder="Votre nom complet"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Votre email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="votre@email.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Decrivez votre interet pour cette opportunite..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={20}
                maxLength={2000}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                {message.length}/2000 caracteres (minimum 20)
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline" />}>
              Annuler
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
