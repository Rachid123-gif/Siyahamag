import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Mail, MessageSquare, Building2, Briefcase, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact | SiyahaMag",
  description:
    "Contactez l'équipe SiyahaMag pour toute question sur le tourisme marocain, l'emploi dans le secteur, ou pour un partenariat.",
  alternates: { canonical: "/contact" },
}

// All routing currently funneled to a single inbox until per-team aliases
// are wired up via ImprovMX. The form on this page is the recommended path
// (it goes straight into the Netlify Forms inbox + email notification).
const FALLBACK_EMAIL = "ra.idrissi@gmail.com"

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email général",
    description: "Pour toute question générale",
    topic: "general",
  },
  {
    icon: Briefcase,
    title: "Espace employeurs",
    description: "Pour publier une offre ou vérifier un compte",
    topic: "employeurs",
  },
  {
    icon: Building2,
    title: "Partenariats",
    description: "Médias, institutions, fédérations",
    topic: "partenariats",
  },
  {
    icon: MessageSquare,
    title: "Support candidats",
    description: "Aide sur votre compte ou candidature",
    topic: "support",
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs segments={[{ label: "Contact" }]} />

      <div className="text-center mt-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-ocean">
          Nous contacter
        </h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          L&apos;équipe SiyahaMag est à votre écoute. Choisissez le canal le
          plus adapté à votre demande.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column: contact form (primary CTA) */}
        <div>
          <ContactForm />
        </div>

        {/* Right column: contact methods overview */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_METHODS.map((method) => (
              <Card key={method.title} className="h-full">
                <CardContent className="pt-6">
                  <div className="inline-flex p-2.5 rounded-lg bg-ocean-50 text-ocean">
                    <method.icon className="h-4 w-4" />
                  </div>
                  <h2 className="mt-3 text-base font-semibold">
                    {method.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {method.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Sélectionnez ce sujet dans le formulaire à gauche.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-ocean-50/60 border-ocean-100">
            <CardContent className="flex items-start gap-3 py-5">
              <Info className="h-5 w-5 shrink-0 text-ocean mt-0.5" />
              <div className="text-sm text-foreground">
                <p>
                  <span className="font-semibold">Email direct :</span>{" "}
                  <a
                    href={`mailto:${FALLBACK_EMAIL}`}
                    className="text-ocean font-medium hover:underline"
                  >
                    {FALLBACK_EMAIL}
                  </a>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Le formulaire reste le moyen le plus rapide d&apos;obtenir
                  une réponse — il dépose votre message directement dans notre
                  boîte de réception.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-ocean text-white border-0">
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-bold">Rejoignez SiyahaMag</h2>
              <p className="mt-2 text-white/80 text-sm">
                Suivez l&apos;actualité du tourisme marocain et ne ratez aucune
                offre d&apos;emploi.
              </p>
              <a
                href="/newsletter"
                className="inline-block mt-4 px-5 py-2.5 bg-sahara text-white rounded-lg font-medium text-sm hover:bg-sahara/90"
              >
                S&apos;inscrire à la newsletter
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
