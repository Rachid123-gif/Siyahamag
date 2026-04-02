"use client"

import { useState } from "react"
import { Loader2, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.includes("@")) {
      setError("Veuillez entrer un email valide.")
      return
    }

    setLoading(true)

    // Simulate subscription (replace with actual API call later)
    await new Promise((r) => setTimeout(r, 1000))
    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <Card className="border-oasis/30 bg-emerald-50">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-12 w-12 text-oasis mx-auto" />
          <h3 className="mt-4 text-lg font-semibold text-oasis">
            Inscription réussie !
          </h3>
          <p className="mt-2 text-muted-foreground">
            Merci {name ? name : ""} ! Vous recevrez notre prochaine newsletter
            à <strong>{email}</strong>.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="newsletter-name">Prénom</Label>
            <Input
              id="newsletter-name"
              placeholder="Ex: Ahmed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="newsletter-email">Email *</Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-ocean hover:bg-ocean/90"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            S&apos;inscrire à la newsletter
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            En vous inscrivant, vous acceptez de recevoir nos emails.
            Désabonnement possible à tout moment.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
