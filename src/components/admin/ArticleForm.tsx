"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import slugify from "slugify"
import { toast } from "sonner"
import { ARTICLE_CATEGORIES } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StatusBadge } from "@/components/articles/StatusBadge"
import { TiptapEditor } from "@/components/admin/TiptapEditor"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ArticleStatus, ArticleCategory } from "@/types"

// Client-side validation schema
const articleFormSchema = z.object({
  title: z
    .string()
    .min(5, "Le titre doit contenir au moins 5 caracteres")
    .max(200, "Le titre ne doit pas depasser 200 caracteres"),
  slug: z.string().max(250).optional(),
  category: z.enum(
    [
      "HEBERGEMENT",
      "TRANSPORT",
      "AERIEN",
      "GASTRONOMIE",
      "EVENEMENTS",
      "DEVELOPPEMENT",
      "MICE",
    ],
    { message: "La categorie est requise" }
  ),
  summary: z
    .string()
    .max(300, "Le resume ne doit pas depasser 300 caracteres")
    .optional(),
  coverImage: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED"]).default("DRAFT"),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

interface ArticleData {
  id: string
  title: string
  slug: string
  summary: string
  content: unknown
  coverImage: string
  category: string
  status: string
  publishedAt: string | null
  scheduledAt: string | null
}

interface ArticleFormProps {
  mode: "create" | "edit"
  article?: ArticleData
}

export function ArticleForm({ mode, article }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editorContent, setEditorContent] = useState<unknown>(
    article?.content ?? null
  )
  const [coverImageUrl, setCoverImageUrl] = useState(
    article?.coverImage ?? ""
  )
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    defaultValues: {
      title: article?.title ?? "",
      slug: article?.slug ?? "",
      category: (article?.category as ArticleFormValues["category"]) ?? undefined,
      summary: article?.summary ?? "",
      coverImage: article?.coverImage ?? "",
      status: (article?.status as ArticleFormValues["status"]) ?? "DRAFT",
    },
  })

  const title = watch("title")
  const summary = watch("summary") ?? ""
  const currentStatus = watch("status")

  // Auto-generate slug from title (only in create mode or if slug was not manually edited)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (mode === "create" && !slugManuallyEdited && title) {
      const generatedSlug = slugify(title, { lower: true, strict: true })
      setValue("slug", generatedSlug)
    }
  }, [title, mode, slugManuallyEdited, setValue])

  const handleSlugChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSlugManuallyEdited(true)
      setValue("slug", e.target.value)
    },
    [setValue]
  )

  // Handle cover image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", "content")
      formData.append("path", "articles/covers")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'upload")
      }

      setCoverImageUrl(result.data.url)
      setValue("coverImage", result.data.url)
      toast.success("Image uploadee avec succes")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'upload de l'image"
      )
    } finally {
      setIsUploadingImage(false)
      // Reset file input
      e.target.value = ""
    }
  }

  const removeCoverImage = () => {
    setCoverImageUrl("")
    setValue("coverImage", "")
  }

  // Submit handler
  const onSubmit = async (
    data: ArticleFormValues,
    targetStatus?: ArticleStatus
  ) => {
    setIsSubmitting(true)

    try {
      const status = targetStatus ?? data.status

      const payload = {
        title: data.title,
        slug: data.slug || undefined,
        category: data.category,
        summary: data.summary || undefined,
        coverImage: coverImageUrl || undefined,
        content: editorContent ?? { type: "doc", content: [] },
        status,
      }

      const url =
        mode === "create"
          ? "/api/admin/articles"
          : `/api/admin/articles/${article!.id}`

      const method = mode === "create" ? "POST" : "PATCH"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de la sauvegarde")
      }

      toast.success(
        mode === "create"
          ? "Article cree avec succes"
          : "Article mis a jour avec succes"
      )

      if (mode === "create" && result.data?.id) {
        router.push(`/admin/articles/${result.data.id}/edit`)
      } else {
        router.refresh()
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de la sauvegarde de l'article"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = handleSubmit((data) => onSubmit(data, "DRAFT"))
  const handlePublish = handleSubmit((data) => onSubmit(data, "PUBLISHED"))
  const handleUpdate = handleSubmit((data) => onSubmit(data))

  return (
    <div>
      {/* Back link */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-6 lg:grid-cols-[1fr_380px]"
      >
        {/* Left column - Main content */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre de l'article"
              className="h-12 text-lg"
              {...register("title")}
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              placeholder="titre-de-l-article"
              {...register("slug")}
              onChange={handleSlugChange}
              aria-invalid={!!errors.slug}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">
                {errors.slug.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Genere automatiquement depuis le titre. Modifiable si besoin.
            </p>
          </div>

          {/* Tiptap Editor */}
          <div className="space-y-2">
            <Label>Contenu</Label>
            <TiptapEditor
              content={editorContent}
              onChange={setEditorContent}
            />
          </div>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Publication panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Publication
                {mode === "edit" && article && (
                  <StatusBadge
                    status={currentStatus as ArticleStatus}
                  />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mode === "create" || currentStatus === "DRAFT" ? (
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Publier maintenant
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Enregistrer le brouillon
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Mettre a jour
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Categorie</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                {...register("category")}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-invalid={!!errors.category}
              >
                <option value="">Selectionner une categorie</option>
                {Object.entries(ARTICLE_CATEGORIES).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Cover image */}
          <Card>
            <CardHeader>
              <CardTitle>Image de couverture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {coverImageUrl ? (
                <div className="relative">
                  <div className="relative aspect-video overflow-hidden rounded-lg border">
                    <Image
                      src={coverImageUrl}
                      alt="Image de couverture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-7 w-7"
                    onClick={removeCoverImage}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Supprimer l&apos;image</span>
                  </Button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors hover:bg-muted/50">
                  {isUploadingImage ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isUploadingImage
                      ? "Upload en cours..."
                      : "Cliquez pour uploader une image"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    JPEG, PNG ou WebP (max. 5 Mo)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Resume de l'article (optionnel)"
                maxLength={300}
                {...register("summary")}
                aria-invalid={!!errors.summary}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {errors.summary ? (
                  <span className="text-destructive">
                    {errors.summary.message}
                  </span>
                ) : (
                  <span>Maximum 300 caracteres</span>
                )}
                <span>{summary.length}/300</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
