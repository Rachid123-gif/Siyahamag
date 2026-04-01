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
  title: {
    default: "SiyahaMag — Tourisme, Emploi & Investissement au Maroc",
    template: "%s | SiyahaMag",
  },
  description:
    "La première plateforme marocaine combinant actualités touristiques, emploi spécialisé, statistiques et investissement dans le secteur du tourisme.",
  openGraph: {
    title: "SiyahaMag — Tourisme, Emploi & Investissement au Maroc",
    description:
      "Actualités, offres d'emploi, statistiques et opportunités d'investissement dans le tourisme marocain.",
    url: "https://siyahamag.com",
    siteName: "SiyahaMag",
    locale: "fr_MA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
