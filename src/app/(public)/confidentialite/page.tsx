import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Politique de confidentialité | SiyahaMag",
  description: "Politique de confidentialité de SiyahaMag — collecte, utilisation et protection de vos données personnelles.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: false },
}

export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs segments={[{ label: "Politique de confidentialité" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-ocean mt-6">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="prose prose-lg max-w-none mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-ocean">1. Données collectées</h2>
          <p className="text-muted-foreground leading-relaxed">
            SiyahaMag collecte les données suivantes lorsque vous utilisez notre plateforme :
          </p>
          <ul className="text-muted-foreground list-disc pl-6">
            <li><strong>Candidats :</strong> nom, email, téléphone, ville, CV, compétences, expériences</li>
            <li><strong>Employeurs :</strong> nom de l&apos;entreprise, ICE, email professionnel, site web, secteur, ville</li>
            <li><strong>Utilisateurs anonymes :</strong> cookies techniques, statistiques de navigation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">2. Finalités</h2>
          <p className="text-muted-foreground leading-relaxed">Vos données sont utilisées pour :</p>
          <ul className="text-muted-foreground list-disc pl-6">
            <li>Créer et gérer votre compte</li>
            <li>Transmettre vos candidatures aux employeurs</li>
            <li>Envoyer des alertes emploi correspondant à vos critères</li>
            <li>Améliorer le service (analyses anonymes)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">3. Conservation</h2>
          <p className="text-muted-foreground leading-relaxed">
            Les données de compte sont conservées tant que votre compte est actif. Elles sont supprimées
            sur demande ou après 3 ans d&apos;inactivité.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">4. Partage des données</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vos données ne sont jamais vendues. Elles sont partagées uniquement avec :
          </p>
          <ul className="text-muted-foreground list-disc pl-6">
            <li>Les employeurs auxquels vous postulez (CV et profil)</li>
            <li>Nos prestataires techniques (Supabase, Netlify, Resend) dans le cadre de leurs services</li>
            <li>Les autorités légales sur demande officielle</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">5. Vos droits</h2>
          <p className="text-muted-foreground leading-relaxed">
            Conformément à la loi marocaine n°09-08 relative à la protection des personnes physiques,
            vous disposez des droits suivants :
          </p>
          <ul className="text-muted-foreground list-disc pl-6">
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Pour exercer ces droits, contactez-nous à <strong>privacy@siyahamag.ma</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">6. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous utilisons uniquement des cookies techniques nécessaires au fonctionnement du site
            (session, authentification). Aucun cookie publicitaire tiers n&apos;est utilisé.
          </p>
        </section>
      </div>
    </div>
  )
}
