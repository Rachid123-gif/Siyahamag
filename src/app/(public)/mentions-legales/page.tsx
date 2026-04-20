import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Mentions légales | SiyahaMag",
  description: "Mentions légales du site SiyahaMag.ma — éditeur, hébergement, propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs segments={[{ label: "Mentions légales" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-ocean mt-6">Mentions légales</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
      </p>

      <div className="prose prose-lg max-w-none mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-ocean">1. Éditeur du site</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le site <strong>SiyahaMag.ma</strong> est édité par SiyahaMag, plateforme marocaine dédiée
            au tourisme, à l&apos;emploi touristique, aux statistiques du secteur et à
            l&apos;investissement touristique au Maroc.
          </p>
          <ul className="text-muted-foreground">
            <li><strong>Nom commercial :</strong> SiyahaMag</li>
            <li><strong>Domaine :</strong> siyahamag.ma</li>
            <li><strong>Email de contact :</strong> contact@siyahamag.ma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">2. Hébergement</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le site est hébergé par <strong>Netlify, Inc.</strong> — 44 Montgomery Street, Suite 300,
            San Francisco, California 94104, USA. Les données utilisateurs sont stockées sur les serveurs
            de <strong>Supabase</strong>, région Europe (Irlande).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">3. Propriété intellectuelle</h2>
          <p className="text-muted-foreground leading-relaxed">
            L&apos;ensemble des contenus présents sur SiyahaMag.ma (textes, images, logos, graphismes,
            mises en page) sont la propriété exclusive de SiyahaMag ou de leurs auteurs respectifs, et
            sont protégés par les lois marocaines et internationales relatives à la propriété
            intellectuelle. Toute reproduction totale ou partielle sans autorisation est interdite.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Les articles d&apos;actualité reprennent partiellement le contenu de sources externes avec
            mention et lien vers la source originale, conformément au droit de citation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">4. Données personnelles</h2>
          <p className="text-muted-foreground leading-relaxed">
            Les informations personnelles collectées (nom, email, téléphone, CV) sont utilisées
            uniquement dans le cadre du fonctionnement de la plateforme. Voir notre{" "}
            <a href="/confidentialite" className="text-ocean underline">politique de confidentialité</a>{" "}
            pour plus de détails.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">5. Responsabilité</h2>
          <p className="text-muted-foreground leading-relaxed">
            SiyahaMag agit en tant qu&apos;intermédiaire entre les employeurs du secteur touristique
            et les candidats. Les offres d&apos;emploi publiées sont vérifiées mais SiyahaMag ne peut
            être tenu responsable du contenu des offres ni des relations contractuelles qui en découlent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ocean">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pour toute question, utilisez notre <a href="/contact" className="text-ocean underline">formulaire de contact</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
