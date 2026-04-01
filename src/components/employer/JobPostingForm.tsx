"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TiptapEditor } from "@/components/admin/TiptapEditor"
import { JOB_CATEGORIES, CONTRACT_TYPES, MAJOR_CITIES } from "@/lib/constants"
import { X, Loader2 } from "lucide-react"

interface JobFormData {
  id?: string
  title: string
  jobCategory: string
  contractType: string
  city: string
  description: unknown
  skills: string[]
  experience: string
  salary: string
  deadline: string
  status?: string
}

interface JobPostingFormProps {
  mode: "create" | "edit"
  initialData?: JobFormData
}

export function JobPostingForm({ mode, initialData }: JobPostingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState(initialData?.title ?? "")
  const [jobCategory, setJobCategory] = useState(initialData?.jobCategory ?? "")
  const [contractType, setContractType] = useState(initialData?.contractType ?? "")
  const [city, setCity] = useState(initialData?.city ?? "")
  const [description, setDescription] = useState<unknown>(
    initialData?.description ?? null
  )
  const [skills, setSkills] = useState<string[]>(initialData?.skills ?? [])
  const [skillInput, setSkillInput] = useState("")
  const [experience, setExperience] = useState(initialData?.experience ?? "")
  const [salary, setSalary] = useState(initialData?.salary ?? "")
  const [deadline, setDeadline] = useState(initialData?.deadline ?? "")

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = async (submit: boolean) => {
    setLoading(true)

    try {
      const body = {
        title,
        jobCategory,
        contractType,
        city,
        description,
        skills,
        experience: experience || undefined,
        salary: salary || undefined,
        deadline: deadline ? new Date(deadline).toISOString() : undefined,
        submit,
      }

      const url =
        mode === "edit"
          ? `/api/employer/jobs/${initialData?.id}`
          : "/api/employer/jobs"

      const method = mode === "edit" ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || "Une erreur est survenue")
        return
      }

      toast.success(
        submit
          ? "Offre soumise pour modération"
          : "Brouillon enregistré avec succès"
      )

      router.push("/employeur/offres")
      router.refresh()
    } catch {
      toast.error("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const isDraft = !initialData?.status || initialData.status === "DISABLED"

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Créer une offre" : "Modifier l'offre"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre de l&apos;offre <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Réceptionniste bilingue"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Category & Contract type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="jobCategory" className="text-sm font-medium">
                Catégorie <span className="text-destructive">*</span>
              </label>
              <select
                id="jobCategory"
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Sélectionner une catégorie</option>
                {Object.entries(JOB_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="contractType" className="text-sm font-medium">
                Type de contrat <span className="text-destructive">*</span>
              </label>
              <select
                id="contractType"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Sélectionner un type de contrat</option>
                {Object.entries(CONTRACT_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* City */}
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              Ville <span className="text-destructive">*</span>
            </label>
            <input
              id="city"
              type="text"
              list="cities-list"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Marrakech"
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <datalist id="cities-list">
              {MAJOR_CITIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </label>
            <TiptapEditor content={description} onChange={setDescription} />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Compétences requises <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="skills"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Tapez une compétence puis Entrée"
                className="flex h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Ajouter
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="rounded-full p-0.5 hover:bg-primary/20"
                      aria-label={`Supprimer ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Experience & Salary */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium">
                Expérience requise
              </label>
              <input
                id="experience"
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Ex: 2-3 ans"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="salary" className="text-sm font-medium">
                Salaire
              </label>
              <input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Ex: 6000-8000 MAD"
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <label htmlFor="deadline" className="text-sm font-medium">
              Date limite de candidature
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
            {isDraft && (
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => handleSubmit(false)}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Enregistrer comme brouillon
              </Button>
            )}
            <Button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit(true)}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDraft ? "Soumettre pour modération" : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
