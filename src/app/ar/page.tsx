import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "السياحة في المغرب — أخبار ووظائف واستثمار | سياحة ماغ",
  description:
    "أول منصة مغربية متخصصة في السياحة: آخر الأخبار، عروض الشغل في الفندقة والمطاعم، الإحصائيات، وفرص الاستثمار السياحي في المغرب.",
  alternates: {
    canonical: "https://siyahamag.ma/ar",
    languages: {
      "ar-MA": "https://siyahamag.ma/ar",
      "fr-MA": "https://siyahamag.ma/",
      "x-default": "https://siyahamag.ma/",
    },
  },
  openGraph: {
    title: "السياحة في المغرب — سياحة ماغ",
    description: "أخبار ووظائف وإحصائيات واستثمار في القطاع السياحي المغربي.",
    type: "website",
    locale: "ar_MA",
  },
}

const ld = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "سياحة ماغ",
  url: "https://siyahamag.ma/ar",
  inLanguage: "ar",
}

const cards = [
  { href: "/ar/emploi-tourisme", title: "وظائف السياحة والفندقة", desc: "عروض شغل في الفنادق والمطاعم والسياحة عبر مدن المغرب." },
  { href: "/ar/investissement", title: "الاستثمار السياحي", desc: "فرص استثمارية: رياض، فنادق، أراضٍ ومشاريع سياحية." },
  { href: "/ar/statistiques", title: "إحصائيات السياحة", desc: "أرقام رسمية: عدد السياح، المداخيل، ليالي المبيت ونسبة الإشغال." },
]

export default function ArHomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd data={ld} />

      <section className="rounded-2xl bg-gradient-to-l from-ocean to-ocean/80 px-6 py-14 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">السياحة في المغرب</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          أول منصة مغربية تجمع أخبار السياحة، عروض الشغل في الفندقة والمطاعم، الإحصائيات الرسمية،
          وفرص الاستثمار السياحي في مكان واحد.
        </p>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold text-foreground">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 space-y-4 leading-relaxed text-foreground/90">
        <h2 className="text-2xl font-bold text-foreground">لماذا سياحة ماغ؟</h2>
        <p>
          يُعدّ القطاع السياحي من أهم محرّكات الاقتصاد المغربي، إذ تجاوز عدد السياح 17 مليون زائر سنة 2024،
          مع هدف الوصول إلى 26 مليون سائح في أفق 2030، السنة التي يحتضن فيها المغرب كأس العالم لكرة القدم.
        </p>
        <p>
          توفّر منصة سياحة ماغ معلومات محيّنة حول فرص الشغل في الفندقة والمطاعم، ومعطيات حول الاستثمار
          السياحي، إضافة إلى إحصائيات رسمية تساعد المهنيين والباحثين عن عمل والمستثمرين على اتخاذ قرارات أفضل.
        </p>
      </section>
    </div>
  )
}
