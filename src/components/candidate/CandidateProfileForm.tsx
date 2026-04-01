"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MAJOR_CITIES, AVAILABILITY_OPTIONS } from "@/lib/constants"
import { Loader2, Upload, FileText, X } from "lucide-react"
import type { Availability } from "@/types"

interface CandidateProfileFormProps {
  initialUser: {
    name: string
    email: string
    phone: string
    city: string
  }
  initialProfile: {
    cvUrl: string
    skills: string[]
    education: string
    experiences: string
    availability: string
    desiredCity: string
  } | null
}

export function CandidateProfileForm({
  initialUser,
  initialProfile,
}: CandidateProfileFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // User fields (read-only name/email)
  const [phone, setPhone] = useState(initialUser.phone)
  const [city, setCity] = useState(initialUser.city)

  // Profile fields
  const [cvUrl, setCvUrl] = useState(initialProfile?.cvUrl ?? "")
  const [skills, setSkills] = useState<string[]>(initialProfile?.skills ?? [])
  const [skillInput, setSkillInput] = useState("")
  const [education, setEducation] = useState(initialProfile?.education ?? "")
  const [experiences, setExperiences] = useState(
    initialProfile?.experiences ?? ""
  )
  const [availability, setAvailability] = useState<string>(
    initialProfile?.availability ?? "IMMEDIATE"
  )
  const [desiredCity, setDesiredCity] = useState(
    initialProfile?.desiredCity ?? ""
  )

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Handle CV upload
  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Format non accepte. Veuillez utiliser un fichier PDF ou Word."
      )
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Le fichier ne doit pas depasser 5 Mo.")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", "cvs")
      formData.append("path", "candidates")

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
      toast.error("Erreur lors de l'upload du CV.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  // Handle skills input (comma-separated)
  function handleSkillKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addSkill()
    }
  }

  function addSkill() {
    const trimmed = skillInput.trim().replace(/,/g, "")
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
    }
    setSkillInput("")
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill))
  }

  // Save profile
  async function handleSave() {
    setSaving(true)
    try {
      // Parse experiences as JSON if provided
      let parsedExperiences = undefined
      if (experiences.trim()) {
        try {
          parsedExperiences = JSON.parse(experiences)
        } catch {
          // If not valid JSON, store as a simple string object
          parsedExperiences = { text: experiences }
        }
      }

      const res = await fetch("/api/candidate/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvUrl: cvUrl || null,
          skills,
          education: education || null,
          experiences: parsedExperiences,
          availability: availability as Availability,
          desiredCity: desiredCity || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Erreur lors de la mise a jour du profil.")
        return
      }

      toast.success("Profil mis a jour avec succes.")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la mise a jour du profil.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={initialUser.name}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={initialUser.email}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telephone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+212 6XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="">Selectionnez une ville</option>
                {MAJOR_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CV */}
      <Card>
        <CardHeader>
          <CardTitle>CV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvUrl && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
              <FileText className="h-5 w-5 text-primary" />
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm text-primary hover:underline"
              >
                {cvUrl.split("/").pop() || "Mon CV"}
              </a>
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvUpload}
              className="hidden"
              id="cv-upload"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  {cvUrl ? "Remplacer le CV" : "Telecharger un CV"}
                </>
              )}
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              Formats acceptes : PDF, Word. Taille max : 5 Mo.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Competences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">
              Ajoutez vos competences (appuyez sur Entree ou virgule)
            </Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="Ex: Reception, Anglais, Management..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addSkill}
                disabled={!skillInput.trim()}
              >
                Ajouter
              </Button>
            </div>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
                    aria-label={`Supprimer ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Formation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="education">Parcours de formation</Label>
            <Textarea
              id="education"
              placeholder="Decrivez votre parcours de formation (diplomes, etablissements, annees)..."
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experiences */}
      <Card>
        <CardHeader>
          <CardTitle>Experiences professionnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="experiences">Experiences</Label>
            <Textarea
              id="experiences"
              placeholder="Decrivez vos experiences professionnelles (postes, entreprises, durees)..."
              value={experiences}
              onChange={(e) => setExperiences(e.target.value)}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Vous pouvez utiliser du texte libre ou du format JSON structure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Availability & Desired City */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilite et preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Disponibilite</Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {(
                Object.entries(AVAILABILITY_OPTIONS) as [string, string][]
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="availability"
                    value={value}
                    checked={availability === value}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="h-4 w-4 text-primary accent-primary"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredCity">Ville souhaitee</Label>
            <Input
              id="desiredCity"
              placeholder="Ex: Marrakech, Casablanca..."
              value={desiredCity}
              onChange={(e) => setDesiredCity(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer le profil"
          )}
        </Button>
      </div>
    </div>
  )
}
