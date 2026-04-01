"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface PhotoGalleryProps {
  images: string[]
  alt?: string
}

export function PhotoGallery({ images, alt = "Photo" }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-muted">
        <div className="text-center text-muted-foreground">
          <ImageIcon className="mx-auto size-12" />
          <p className="mt-2 text-sm">Aucune photo disponible</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - Photo ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                index === selectedIndex
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              aria-label={`Voir la photo ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} - Miniature ${index + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
