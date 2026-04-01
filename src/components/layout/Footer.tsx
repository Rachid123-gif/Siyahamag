import Link from "next/link"
import { Newspaper, Briefcase, BarChart3, Building2 } from "lucide-react"

const FOOTER_LINKS = {
  navigation: [
    { href: "/actualites", label: "Actualités", icon: Newspaper },
    { href: "/emplois", label: "SiyahaJobs", icon: Briefcase },
    { href: "/statistiques", label: "Statistiques", icon: BarChart3 },
    { href: "/investissement", label: "Investissement", icon: Building2 },
  ],
  platform: [
    { href: "/inscription", label: "Créer un compte" },
    { href: "/inscription/employeur", label: "Espace employeur" },
    { href: "/connexion", label: "Se connecter" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Politique de confidentialité" },
    { href: "/contact", label: "Contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ocean text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold">
              Siyaha<span className="text-sahara-light">Mag</span>
            </Link>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              La première plateforme marocaine dédiée au tourisme : actualités,
              emploi, statistiques et investissement.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Plateforme
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Informations
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} SiyahaMag. Tous droits réservés.
          </p>
          <p className="text-sm text-white/60">
            Fait avec passion pour le tourisme marocain 🇲🇦
          </p>
        </div>
      </div>
    </footer>
  )
}
