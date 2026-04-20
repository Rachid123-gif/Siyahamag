import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://siyahamag.ma"),
  title: {
    default: "Tourisme Maroc — Actualités, Emploi & Investissement | SiyahaMag",
    template: "%s | SiyahaMag",
  },
  description:
    "La première plateforme marocaine combinant actualités touristiques, emploi spécialisé, statistiques et investissement dans le secteur du tourisme.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tourisme Maroc — Actualités, Emploi & Investissement | SiyahaMag",
    description:
      "Actualités, offres d'emploi, statistiques et opportunités d'investissement dans le tourisme marocain.",
    url: "https://siyahamag.ma",
    siteName: "SiyahaMag",
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiyahaMag — Tourisme, Emploi & Investissement au Maroc",
    description:
      "Actualités, offres d'emploi, statistiques et opportunités d'investissement dans le tourisme marocain.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "rthJ0IMkfnPfMnH0BvwvQ8-qokT1fTkhR5DN-ENp_H0",
  },
  other: {
    "content-language": "fr-MA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0C4A6E" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
