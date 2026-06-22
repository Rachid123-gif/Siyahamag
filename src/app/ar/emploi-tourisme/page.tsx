import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd } from "@/components/seo/JsonLd"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "وظائف السياحة والفندقة في المغرب — عروض شغل | سياحة ماغ",
  description:
    "ابحث عن وظائف في قطاع السياحة والفندقة والمطاعم بالمغرب: استقبال، طبخ، خدمة، إرشاد سياحي، تنشيط وإدارة في مراكش وأكادير وطنجة والدار البيضاء وفاس.",
  alternates: {
    canonical: "https://siyahamag.ma/ar/emploi-tourisme",
    languages: {
      "ar-MA": "https://siyahamag.ma/ar/emploi-tourisme",
      "fr-MA": "https://siyahamag.ma/emplois",
      "x-default": "https://siyahamag.ma/emplois",
    },
  },
  openGraph: { title: "وظائف السياحة والفندقة في المغرب", type: "website", locale: "ar_MA" },
}

const faq = [
  { q: "ما هي أكثر الوظائف طلباً في السياحة بالمغرب؟", a: "موظفو الاستقبال، الطهاة، عمّال الخدمة، المرشدون السياحيون، ومنشّطو النوادي، خصوصاً في مراكش وأكادير وطنجة." },
  { q: "هل تتطلب وظائف الفندقة شهادات؟", a: "بعض المناصب تتطلب تكويناً متخصصاً (طبخ، إدارة فندقية)، لكن مناصب الخدمة والتنشيط تقبل المبتدئين مع إتقان اللغات." },
  { q: "كيف يساعد كأس العالم 2030 في التشغيل؟", a: "يَعِد مونديال 2030 بآلاف فرص الشغل في الفندقة والمطاعم والنقل السياحي عبر المدن المغربية المستضيفة." },
]

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default function ArEmploiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd data={faqLd} />
      <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
        وظائف السياحة والفندقة في المغرب
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
        <p>
          يوفّر القطاع السياحي المغربي آلاف فرص الشغل سنوياً في الفنادق والمطاعم ووكالات الأسفار.
          مع اقتراب كأس العالم 2030، تتزايد حاجة المهنيين إلى كفاءات في الاستقبال والطبخ والخدمة والإرشاد السياحي.
        </p>
        <p>
          تجمع منصة سياحة ماغ عروض الشغل في مختلف المدن المغربية: مراكش، أكادير، طنجة، الدار البيضاء، فاس والصويرة.
          تصفّح العروض حسب المدينة أو التخصص، وقدّم ترشيحك بسهولة.
        </p>
        <h2 className="text-2xl font-bold text-foreground pt-4">المهن الأكثر طلباً</h2>
        <ul className="list-disc pr-6 space-y-1">
          <li>موظف/ة استقبال (Réception)</li>
          <li>طاهٍ / مساعد طبخ (Cuisine)</li>
          <li>عامل/ة خدمة في المطاعم (Service)</li>
          <li>مرشد سياحي (Guide)</li>
          <li>منشّط/ة نوادي العطلات (Animation)</li>
          <li>أخصائي/ة سبا وعافية (Bien-être)</li>
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
        <p className="text-foreground">تصفّح جميع عروض الشغل المتاحة الآن</p>
        <Link href="/emplois" className="mt-3 inline-block rounded-lg bg-ocean px-6 py-2 text-white hover:bg-ocean/90">
          عروض الشغل (الموقع بالفرنسية)
        </Link>
      </div>
    </div>
  )
}
