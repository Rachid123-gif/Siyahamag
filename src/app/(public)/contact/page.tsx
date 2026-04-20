import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { Mail, MessageSquare, Building2, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact | SiyahaMag",
  description: "Contactez l'équipe SiyahaMag pour toute question sur le tourisme marocain, l'emploi dans le secteur, ou pour un partenariat.",
  alternates: { canonical: "/contact" },
}

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "Email général",
    value: "contact@siyahamag.ma",
    description: "Pour toute question générale",
    href: "mailto:contact@siyahamag.ma",
  },
  {
    icon: Briefcase,
    title: "Espace employeurs",
    value: "employeurs@siyahamag.ma",
    description: "Pour publier une offre ou vérifier un compte",
    href: "mailto:employeurs@siyahamag.ma",
  },
  {
    icon: Building2,
    title: "Partenariats",
    value: "partenariats@siyahamag.ma",
    description: "Médias, institutions, fédérations",
    href: "mailto:partenariats@siyahamag.ma",
  },
  {
    icon: MessageSquare,
    title: "Support candidats",
    value: "support@siyahamag.ma",
    description: "Aide sur votre compte ou candidature",
    href: "mailto:support@siyahamag.ma",
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs segments={[{ label: "Contact" }]} />

      <div className="text-center mt-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-ocean">Nous contacter</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          L&apos;équipe SiyahaMag est à votre écoute. Choisissez le canal le plus adapté à votre demande.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONTACT_METHODS.map((method) => (
          <a key={method.title} href={method.href} className="group">
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="inline-flex p-3 rounded-lg bg-ocean-50 text-ocean">
                  <method.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold group-hover:text-ocean transition-colors">
                  {method.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                <p className="mt-2 font-medium text-ocean">{method.value}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <Card className="mt-10 bg-ocean text-white border-0">
        <CardContent className="text-center py-10">
          <h2 className="text-2xl font-bold">Rejoignez SiyahaMag</h2>
          <p className="mt-2 text-white/80 max-w-xl mx-auto">
            Suivez l&apos;actualité du tourisme marocain et ne ratez aucune offre d&apos;emploi.
          </p>
          <a
            href="/newsletter"
            className="inline-block mt-5 px-6 py-3 bg-sahara text-white rounded-lg font-medium hover:bg-sahara/90"
          >
            S&apos;inscrire à la newsletter
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
