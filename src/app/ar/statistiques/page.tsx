import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "إحصائيات السياحة في المغرب 2026 — أرقام رسمية | سياحة ماغ",
  description:
    "أرقام رسمية حول السياحة في المغرب: عدد السياح، المداخيل السياحية، ليالي المبيت، نسبة الإشغال والمعطيات الجهوية لسنة 2026.",
  alternates: {
    canonical: "https://siyahamag.ma/ar/statistiques",
    languages: {
      "ar-MA": "https://siyahamag.ma/ar/statistiques",
      "fr-MA": "https://siyahamag.ma/statistiques",
      "x-default": "https://siyahamag.ma/statistiques",
    },
  },
  openGraph: { title: "إحصائيات السياحة في المغرب", type: "website", locale: "ar_MA" },
}

const figures = [
  { label: "عدد السياح (2025)", value: "20 مليون" },
  { label: "المداخيل السياحية (2024)", value: "105.3 مليار درهم" },
  { label: "ليالي المبيت (2024)", value: "27.8 مليون" },
  { label: "نسبة الإشغال (2024)", value: "52٪" },
]

const ld = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "إحصائيات السياحة في المغرب",
  description: "مؤشرات السياحة المغربية: عدد السياح، المداخيل، ليالي المبيت ونسبة الإشغال.",
  creator: { "@type": "Organization", name: "SiyahaMag" },
  inLanguage: "ar",
  isAccessibleForFree: true,
}

export default function ArStatsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd data={ld} />
      <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
        إحصائيات السياحة في المغرب 2026
      </h1>
      <p className="mt-4 leading-relaxed text-foreground/90">
        تجمع سياحة ماغ المؤشرات الرئيسية للسياحة المغربية من مصادر رسمية (المكتب الوطني المغربي للسياحة،
        مكتب الصرف، مرصد السياحة). هذه الأرقام متاحة للاقتباس مع ذكر المصدر.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {figures.map((f) => (
          <div key={f.label} className="rounded-xl border border-border p-6">
            <p className="text-sm text-muted-foreground">{f.label}</p>
            <p className="mt-1 text-3xl font-bold text-ocean">{f.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/statistiques" className="inline-block rounded-lg bg-ocean px-6 py-2 text-white hover:bg-ocean/90">
          الإحصائيات المفصّلة (الموقع بالفرنسية)
        </Link>
      </div>
    </div>
  )
}
