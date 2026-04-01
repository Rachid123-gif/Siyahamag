"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  INVESTMENT_TYPES,
  PROPERTY_CONDITIONS,
  MOROCCO_REGIONS,
  MAJOR_CITIES,
} from "@/lib/constants"
import { TiptapEditor } from "@/components/admin/TiptapEditor"
import { ImagePlus, X, CheckCircle2 } from "lucide-react"
import Image from "next/image"

type InvestmentTypeKey = keyof typeof INVESTMENT_TYPES
type PropertyConditionKey = keyof typeof PROPERTY_CONDITIONS
type MoroccoRegionKey = keyof typeof MOROCCO_REGIONS

export function InvestmentPublishForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [investmentType, setInvestmentType] = useState("")
  const [city, setCity] = useState("")
  const [region, setRegion] = useState("")
  const [price, setPrice] = useState("")
  const [surface, setSurface] = useState("")
  const [rooms, setRooms] = useState("")
  const [condition, setCondition] = useState("")
  const [description, setDescription] = useState<unknown>({
    type: "doc",
    content: [{ type: "paragraph" }],
  })
  const [images, setImages] = useState<string[]>([])
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactCompany, setContactCompany] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > 10) {
      toast.error("Vous pouvez ajouter au maximum 10 images.")
      return
    }

    setUploading(true)
    const newImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("bucket", "content")
        formData.append("path", "investments/images")

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Erreur lors de l'upload")
        }

        newImages.push(data.data.url)
      }

      setImages((prev) => [...prev, ...newImages])
      toast.success(
        `${newImages.length} image${newImages.length > 1 ? "s" : ""} ajoutee${newImages.length > 1 ? "s" : ""}`
      )
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'upload"
      )
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Le titre est requis.")
      return
    }

    if (!investmentType) {
      toast.error("Le type de bien est requis.")
      return
    }

    if (!city.trim()) {
      toast.error("La ville est requise.")
      return
    }

    if (!contactName.trim()) {
      toast.error("Le nom de contact est requis.")
      return
    }

    if (!contactEmail.trim()) {
      toast.error("L'email de contact est requis.")
      return
    }

    setSubmitting(true)

    try {
      const body = {
        title: title.trim(),
        investmentType,
        city: city.trim(),
        region: region || undefined,
        price: price ? parseFloat(price) : undefined,
        surface: surface ? parseFloat(surface) : undefined,
        rooms: rooms ? parseInt(rooms, 10) : undefined,
        condition: condition || undefined,
        description,
        images,
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim(),
        contactCompany: contactCompany.trim() || undefined,
      }

      const res = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la publication")
      }

      setSuccess(true)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la soumission de l'annonce"
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="py-12 text-center">
          <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
          <h2 className="mt-4 text-xl font-bold">Annonce soumise avec succes</h2>
          <p className="mt-2 text-muted-foreground">
            Votre annonce a ete soumise pour moderation. Vous serez notifie une
            fois qu&apos;elle sera approuvee.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => router.push("/investissement")}>
              Voir les annonces
            </Button>
            <Button onClick={() => router.push("/investissement")}>
              Retour
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations generales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l&apos;annonce *</Label>
            <Input
              id="title"
              placeholder="Ex: Riad a vendre au coeur de la medina de Marrakech"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Type de bien *</Label>
              <Select value={investmentType} onValueChange={(v) => setInvestmentType(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.keys(INVESTMENT_TYPES) as InvestmentTypeKey[]
                  ).map((key) => (
                    <SelectItem key={key} value={key}>
                      {INVESTMENT_TYPES[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Etat du bien</Label>
              <Select value={condition} onValueChange={(v) => setCondition(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir l'etat" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.keys(PROPERTY_CONDITIONS) as PropertyConditionKey[]
                  ).map((key) => (
                    <SelectItem key={key} value={key}>
                      {PROPERTY_CONDITIONS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                placeholder="Ex: Marrakech"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                list="form-cities-list"
              />
              <datalist id="form-cities-list">
                {MAJOR_CITIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={region} onValueChange={(v) => setRegion(v ?? "")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir une region" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.keys(MOROCCO_REGIONS) as MoroccoRegionKey[]
                  ).map((key) => (
                    <SelectItem key={key} value={key}>
                      {MOROCCO_REGIONS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (MAD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="1000"
                placeholder="Ex: 5000000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="surface">Surface (m&sup2;)</Label>
              <Input
                id="surface"
                type="number"
                min="0"
                step="1"
                placeholder="Ex: 200"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms">Nombre de chambres</Label>
              <Input
                id="rooms"
                type="number"
                min="0"
                step="1"
                placeholder="Ex: 8"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <TiptapEditor
            content={description}
            onChange={setDescription}
          />
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>
            Photos ({images.length}/10)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="group relative aspect-video overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={img}
                    alt={`Photo ${index + 1}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Supprimer la photo ${index + 1}`}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {images.length < 10 && (
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="gap-2"
              >
                <ImagePlus className="size-4" />
                {uploading ? "Upload en cours..." : "Ajouter des photos"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Formats acceptes : JPEG, PNG, WebP. Maximum 10 images.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactName">Nom *</Label>
              <Input
                id="contactName"
                placeholder="Votre nom"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="votre@email.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactCompany">Societe (optionnel)</Label>
            <Input
              id="contactCompany"
              placeholder="Nom de votre societe"
              value={contactCompany}
              onChange={(e) => setContactCompany(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
        <Button type="submit" disabled={submitting} size="lg">
          {submitting ? "Publication en cours..." : "Soumettre l'annonce"}
        </Button>
      </div>
    </form>
  )
}
