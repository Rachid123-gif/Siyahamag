import Link from "next/link"
import type { ReactNode } from "react"

// Standalone Arabic (RTL) section for SEO — targets high-volume Arabic queries
// in Morocco. Clean Arabic chrome, no French header. Content language is set on
// the wrapper (lang="ar" dir="rtl"); hreflang is declared per page.
export default function ArLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="ar" dir="rtl" className="min-h-screen bg-background font-sans">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/ar" className="text-xl font-bold text-ocean">
            سياحة ماغ
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/ar/emploi-tourisme" className="text-foreground hover:text-ocean">وظائف السياحة</Link>
            <Link href="/ar/investissement" className="text-foreground hover:text-ocean">الاستثمار</Link>
            <Link href="/ar/statistiques" className="text-foreground hover:text-ocean">الإحصائيات</Link>
            <Link href="/" className="text-muted-foreground hover:text-ocean">FR</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted-foreground">
          <p>سياحة ماغ — أول منصة مغربية للسياحة: أخبار، وظائف، إحصائيات واستثمار.</p>
          <p className="mt-2">
            <Link href="/" className="text-ocean hover:underline">النسخة الفرنسية (Version française)</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
