import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAuthenticatedUser } from "@/lib/auth"

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const bucket = formData.get("bucket") as string | null
    const path = formData.get("path") as string | null

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: "Le fichier est requis" },
        { status: 400 }
      )
    }

    if (!bucket) {
      return NextResponse.json(
        { error: "Le bucket est requis" },
        { status: 400 }
      )
    }

    if (!path) {
      return NextResponse.json(
        { error: "Le chemin est requis" },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Type de fichier non autorise. Formats acceptes : JPEG, PNG, WebP",
        },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Le fichier ne doit pas depasser 5 Mo" },
        { status: 400 }
      )
    }

    // Generate a unique file path to avoid collisions
    const extension = file.name.split(".").pop() || "jpg"
    const timestamp = Date.now()
    const fullPath = `${path}/${timestamp}.${extension}`

    // Upload to Supabase Storage
    const supabase = await createClient()
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error("Supabase storage upload error:", error)
      return NextResponse.json(
        { error: "Echec de l'upload du fichier" },
        { status: 500 }
      )
    }

    // Build the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return NextResponse.json({
      data: {
        url: publicUrl,
        path: data.path,
        size: file.size,
        mimeType: file.type,
      },
      message: "Fichier uploade avec succes",
    })
  } catch (error) {
    console.error("POST /api/upload error:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}
