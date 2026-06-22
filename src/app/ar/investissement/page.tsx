import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "الاستثمار السياحي في المغرب — رياض، فنادق، أراضٍ | سياحة ماغ",
  description:
    "اكتشف فرص الاستثمار في القطاع السياحي المغربي: رياضات، فنادق، مطاعم، أراضٍ في المناطق السياحية ومشاريع منتجعات في مراكش وأكادير وطنجة والداخلة.",
  alternates: {
    canonical: "https://siyahamag.ma/ar/investissement",
    languages: {
      "ar-MA": "https://siyahamag.ma/ar/investissement",
      "fr-MA": "https://siyahamag.ma/investissement",
      "x-default": "https://siyahamag.ma/investissement",
    },
  },
  openGraph: { title: "الاستثمار السياحي في المغرب", type: "website", locale: "ar_MA" },
}

const faq = [
  { q: "هل الاستثمار في رياض بمراكش مربح؟", a: "نعم، تحويل الرياض إلى دار ضيافة يوفّر مردودية جيدة بفضل الطلب السياحي المرتفع على الإقامات الأصيلة في المدينة العتيقة." },
  { q: "ما هي أفضل المدن للاستثمار السياحي؟", a: "مراكش وأكادير وطنجة والصويرة والداخلة من أبرز الوجهات، مع تنامي فرص السياحة البيئية في الجنوب." },
]

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default function ArInvestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd data={faqLd} />
      <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
        الاستثمار السياحي في المغرب
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
        <p>
          يشهد القطاع السياحي المغربي دينامية استثمارية قوية مدعومة بخارطة الطريق 2023-2026 وآفاق كأس العالم 2030.
          تتنوّع الفرص بين شراء الرياضات وتحويلها إلى دور ضيافة، وبناء الفنادق، واقتناء الأراضي في المناطق السياحية.
        </p>
        <p>
          تعرض منصة سياحة ماغ فرص استثمار حقيقية عبر المغرب: رياضات في مراكش وشفشاون، أراضٍ في خليج أكادير،
          فنادق على واجهة طنجة، ومشاريع منتجعات بيئية في الداخلة.
        </p>
        <h2 className="text-2xl font-bold text-foreground pt-4">أنواع الفرص المتاحة</h2>
        <ul className="list-disc pr-6 space-y-1">
          <li>رياضات ودور ضيافة (Riad)</li>
          <li>فنادق (Hôtel)</li>
          <li>مطاعم (Restaurant)</li>
          <li>أراضٍ في مناطق سياحية (Terrain)</li>
          <li>مشاريع منتجعات (Projet)</li>
        </ul>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">أسئلة شائعة</h2>
        <div className="space-y-4">
          {faq.map((f) => (
            <details key={f.q} className="rounded-lg border border-border p-4">
              <summary className="font-semibold cursor-pointer text-foreground">{f.q}</summary>
              <p className="mt-2 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-xl border border-ocean/20 bg-ocean-50 p-6 text-center">
        <Link href="/investissement" className="inline-block rounded-lg bg-ocean px-6 py-2 text-white hover:bg-ocean/90">
          تصفّح فرص الاستثمار (الموقع بالفرنسية)
        </Link>
      </div>
    </div>
  )
}
