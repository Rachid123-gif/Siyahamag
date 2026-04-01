"use client"

import { useState } from "react"
import { Copy, Check, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  url: string
  title: string
}

// Custom SVG icons for Facebook and LinkedIn (Lucide does not ship brand icons)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function openPopup(shareUrl: string) {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400")
  }

  function handleFacebook() {
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
  }

  function handleLinkedin() {
    openPopup(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
    )
  }

  function handleWhatsApp() {
    openPopup(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`)
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: silent fail
    }
  }

  return (
    <div className="flex flex-row gap-2 md:flex-col">
      <Button
        variant="outline"
        size="icon"
        onClick={handleFacebook}
        aria-label="Partager sur Facebook"
        title="Partager sur Facebook"
      >
        <FacebookIcon className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleLinkedin}
        aria-label="Partager sur LinkedIn"
        title="Partager sur LinkedIn"
      >
        <LinkedinIcon className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleWhatsApp}
        aria-label="Partager sur WhatsApp"
        title="Partager sur WhatsApp"
      >
        <MessageCircle className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleCopy}
        aria-label={copied ? "Lien copié !" : "Copier le lien"}
        title={copied ? "Lien copié !" : "Copier le lien"}
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </div>
  )
}
