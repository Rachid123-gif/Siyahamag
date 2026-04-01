"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Upload, FileText, Loader2 } from "lucide-react"
import Link from "next/link"

interface ApplicationFormProps {
  job: {
    id: string
    title: string
    company: string
  }
  user: {
    id: string
    name: string
    email: string
    cvUrl: string | null
  } | null
}

export function ApplicationForm({ job, user }: ApplicationFormProps) {
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [message, setMessage] = useState("")
  const [cvUrl, setCvUrl] = useState(user?.cvUrl ?? "")
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isAuthenticated = !!user

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non accepte. Veuillez utiliser un fichier PDF ou Word.")
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier ne doit pas depasser 5 Mo.")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", "cvs")
      formData.append("path", user ? `candidates/${user.id}` : "guests")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de l'upload du CV.")
        return
      }

      setCvUrl(data.data.url)
      toast.success("CV uploade avec succes.")
    } catch {
      toast.error("Erreur de connexion lors de l'upload.")
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isAuthenticated && !cvUrl) {
      toast.error("Veuillez joindre votre CV.")
      return
    }

    setSubmitting(true)

    try {
      const endpoint = isAuthenticated
        ? "/api/applications"
        : "/api/applications/guest"

      const body = isAuthenticated
        ? {
            jobListingId: job.id,
            message: message || undefined,
            cvUrl: cvUrl || undefined,
          }
        : {
            jobListingId: job.id,
            candidateName: name,
            candidateEmail: email,
            cvUrl,
            message: message || undefined,
          }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de l'envoi de la candidature.")
        return
      }

      setSuccess(true)
    } catch {
      toast.error("Erreur de connexion. Veuillez reessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="mx-auto size-16 text-green-500" />
          <h2 className="mt-4 text-xl font-semibold">
            Votre candidature a ete envoyee avec succes !
          </h2>
          <p className="mt-2 text-muted-foreground">
            L&apos;entreprise {job.company} examinera votre profil et vous
            contactera si votre candidature est retenue.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={`/emplois`}>Voir d&apos;autres offres</Link>
            </Button>
            {isAuthenticated && (
              <Button asChild>
                <Link href="/candidat/candidatures">Mes candidatures</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Postuler : {job.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chez {job.company}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="candidate-name">Nom complet</Label>
            <Input
              id="candidate-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isAuthenticated}
              required
              placeholder="Votre nom complet"
              className={isAuthenticated ? "bg-muted" : ""}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="candidate-email">Adresse email</Label>
            <Input
              id="candidate-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={isAuthenticated}
              required
              placeholder="votre@email.com"
              className={isAuthenticated ? "bg-muted" : ""}
            />
          </div>

          {/* CV */}
          <div className="space-y-2">
            <Label>CV</Label>

            {cvUrl && (
              <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 text-sm">
                <FileText className="size-4 text-primary" />
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-primary underline underline-offset-2"
                >
                  Voir le CV actuel
                </a>
              </div>
            )}

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 size-4" />
                    {cvUrl ? "Changer le CV" : "Joindre un CV"}
                  </>
                )}
              </Button>
              <p className="mt-1 text-xs text-muted-foreground">
                PDF ou Word, 5 Mo maximum
              </p>
            </div>

            {!isAuthenticated && !cvUrl && (
              <p className="text-xs text-destructive">
                Le CV est obligatoire pour postuler sans compte.
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="candidate-message">
              Message (optionnel)
            </Label>
            <Textarea
              id="candidate-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Presentez-vous brievement et expliquez votre motivation..."
              maxLength={2000}
              rows={5}
            />
            <p className="text-right text-xs text-muted-foreground">
              {message.length}/2000
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={submitting || uploading}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma candidature"
            )}
          </Button>

          {!isAuthenticated && (
            <p className="text-center text-sm text-muted-foreground">
              Vous avez un compte ?{" "}
              <Link
                href="/connexion"
                className="text-primary underline underline-offset-2"
              >
                Connectez-vous
              </Link>{" "}
              pour postuler plus facilement.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
