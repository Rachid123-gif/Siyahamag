"use client"

import { useState } from "react"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

/**
 * Netlify Forms-powered contact form.
 *
 * How it works:
 *  - The form name "siyahamag-contact" is registered in /public/__forms.html
 *    at build time (Netlify scans static HTML for forms).
 *  - On submit we POST application/x-www-form-urlencoded to "/__forms.html"
 *    (a static file served from /public). Netlify's CDN intercepts POSTs
 *    to that path and routes them to the Forms processor. The Next.js
 *    function never sees the request.
 *  - Submissions are stored on Netlify and emailed to the configured
 *    notification address (ra.idrissi@gmail.com).
 *  - The hidden `bot-field` (honeypot) catches naive spam bots.
 */

const FORM_NAME = "siyahamag-contact"

const TOPICS = [
  { value: "general", label: "Question générale" },
  { value: "employeurs", label: "Espace employeurs" },
  { value: "partenariats", label: "Partenariats" },
  { value: "support", label: "Support candidats" },
  { value: "presse", label: "Presse / Médias" },
] as const

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&")
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const honeypot = formData.get("bot-field")
    if (honeypot) {
      // bot — silently pretend to succeed
      setState("success")
      return
    }
    setState("submitting")
    setErrorMessage("")
    try {
      const data: Record<string, string> = {}
      formData.forEach((v, k) => {
        data[k] = typeof v === "string" ? v : ""
      })
      data["form-name"] = FORM_NAME
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState("success")
      formEl.reset()
    } catch (err) {
      setState("error")
      setErrorMessage(err instanceof Error ? err.message : "Erreur inconnue")
    }
  }

  if (state === "success") {
    return (
      <Card className="border-emerald-200 bg-emerald-50">
        <CardContent className="flex items-start gap-3 py-6">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
          <div>
            <h3 className="font-semibold text-emerald-900">Message envoyé</h3>
            <p className="text-sm text-emerald-800 mt-1">
              Nous avons bien reçu votre demande et reviendrons vers vous sous
              48 heures ouvrées.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-3 text-sm font-medium text-emerald-700 hover:underline"
            >
              Envoyer un autre message
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-foreground">
          Envoyez-nous un message
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Remplissez le formulaire — nous répondons sous 48h ouvrées.
        </p>

        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="mt-6 space-y-4"
        >
          {/* Required by Netlify Forms */}
          <input type="hidden" name="form-name" value={FORM_NAME} />
          {/* Honeypot — humans should never fill this */}
          <p className="hidden">
            <label>
              Ne pas remplir : <input name="bot-field" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Ex: Ahmed Benali"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.ma"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Sujet *</Label>
            <select
              id="topic"
              name="topic"
              required
              defaultValue=""
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>
                Sélectionnez un sujet
              </option>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Entreprise / Organisation</Label>
            <Input
              id="company"
              name="company"
              placeholder="Optionnel"
              autoComplete="organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              minLength={10}
              maxLength={5000}
              placeholder="Décrivez votre demande..."
              className="flex min-h-[140px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {state === "error" && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
              <div className="text-destructive">
                Une erreur est survenue. {errorMessage} — Vous pouvez réessayer
                ou écrire directement à{" "}
                <a
                  href="mailto:ra.idrissi@gmail.com"
                  className="font-medium underline"
                >
                  ra.idrissi@gmail.com
                </a>
                .
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={state === "submitting"}
            className="w-full bg-ocean hover:bg-ocean/90"
          >
            {state === "submitting" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Envoyer le message
          </Button>

          <p className="text-xs text-muted-foreground">
            En soumettant ce formulaire, vous acceptez que nous traitions vos
            données pour répondre à votre demande, conformément à notre{" "}
            <a href="/confidentialite" className="underline hover:text-ocean">
              politique de confidentialité
            </a>
            .
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
