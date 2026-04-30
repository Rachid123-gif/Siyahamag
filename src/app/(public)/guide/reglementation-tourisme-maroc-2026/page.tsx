import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { JsonLd } from "@/components/seo/JsonLd"

// ── SEO Metadata ─────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Réglementation Tourisme Maroc 2026 : Lois, Normes & Classification | SiyahaMag",
  description:
    "Tout sur la réglementation du tourisme au Maroc en 2026 : classification des hôtels, licence d'agence de voyages, normes ISTA, fiscalité et nouvelles lois pour la Coupe du Monde 2030.",
  alternates: {
    canonical: "/guide/reglementation-tourisme-maroc-2026",
  },
  openGraph: {
    title: "Réglementation Tourisme Maroc 2026 : Lois, Normes & Classification",
    description:
      "Guide complet de la réglementation touristique marocaine en 2026 : classification hôtelière, licences, normes environnementales et mesures Coupe du Monde 2030.",
    type: "article",
    images: [
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop",
    ],
  },
  keywords: [
    "réglementation tourisme maroc 2026",
    "loi tourisme maroc",
    "classification hotels maroc",
    "licence agence voyages maroc",
    "normes hotellerie maroc",
    "code tourisme maroc",
    "ISTA maroc tourisme",
    "fiscalité tourisme maroc",
    "norme étoile hotel maroc",
    "ministère tourisme maroc réglementation",
  ],
}

// ── JSON-LD Data ──────────────────────────────────────────────────────

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Réglementation Tourisme Maroc 2026 : Lois, Normes & Classification Complètes",
  description:
    "Guide complet de la réglementation touristique marocaine en 2026 : classification hôtelière, licences et nouvelles lois.",
  author: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  publisher: {
    "@type": "Organization",
    name: "SiyahaMag",
    url: "https://siyahamag.ma",
  },
  datePublished: "2026-04-30",
  dateModified: "2026-04-30",
  mainEntityOfPage:
    "https://siyahamag.ma/guide/reglementation-tourisme-maroc-2026",
  image:
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle loi régit le tourisme au Maroc en 2026 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le secteur touristique marocain est principalement régi par la Loi n° 61-00 portant statut des établissements touristiques et la Loi n° 31-96 relative aux agences de voyages, complétées par plusieurs décrets d'application. Le Ministère du Tourisme, de l'Artisanat et de l'Économie Sociale et Solidaire est l'autorité de tutelle. Des amendements ont été apportés en 2024-2025 dans le cadre de la préparation à la Coupe du Monde 2030.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir la classification étoile pour un hôtel au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La classification est accordée par la Commission de Classement des Établissements Touristiques, rattachée au Ministère du Tourisme. Elle évalue 200+ critères : superficie des chambres, équipements, services offerts, qualification du personnel et normes de sécurité. La demande se fait via le portail e-tourisme du Ministère. La procédure prend 3 à 6 mois. Une révision périodique tous les 5 ans est obligatoire.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les conditions pour ouvrir une agence de voyages au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pour obtenir la licence d'agence de voyages au Maroc, il faut : un local commercial d'au moins 20 m², un gérant titulaire du Brevet de Technicien Supérieur en Tourisme ou équivalent, un cautionnement bancaire de 200 000 MAD, une assurance responsabilité civile professionnelle et l'inscription au registre de commerce. La procédure est instruite par la Direction des Établissements Touristiques.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les normes environnementales pour les hôtels au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depuis 2024, les hôtels 4 et 5 étoiles doivent respecter les normes de la Charte Nationale de l'Environnement et obtenir le label Clé Verte (Green Key) ou son équivalent pour les nouvelles ouvertures. Les exigences portent sur la gestion de l'eau, l'énergie renouvelable, la gestion des déchets et l'utilisation de produits locaux. Ces normes seront étendues à toutes les catégories avant 2030.",
      },
    },
    {
      "@type": "Question",
      name: "Quels avantages fiscaux pour investir dans l'hôtellerie au Maroc ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le Maroc offre plusieurs incitations fiscales pour l'hôtellerie : exonération d'IS pendant 5 ans pour les nouveaux établissements touristiques, TVA à taux réduit (10%) sur les nuitées, exonération des droits de douane sur les équipements hôteliers, et accès aux aides de l'AMDI (Agence Marocaine de Développement des Investissements) pour les projets supérieurs à 200 millions MAD.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://siyahamag.ma",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: "https://siyahamag.ma/guide/emploi-tourisme-maroc",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Réglementation Tourisme Maroc 2026",
      item: "https://siyahamag.ma/guide/reglementation-tourisme-maroc-2026",
    },
  ],
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GuideReglementationTourismePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD */}
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        segments={[
          { label: "Guides", href: "/guide/emploi-tourisme-maroc" },
          { label: "Réglementation tourisme Maroc 2026" },
        ]}
      />

      {/* Hero */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <span>Guide réglementation</span>
          <span>/</span>
          <span>Publié le 30 avril 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Réglementation Tourisme Maroc 2026 : Guide Complet
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          La réglementation du secteur touristique marocain évolue rapidement, portée par les
          ambitions de la Vision 2030 et la préparation à la Coupe du Monde. Classification
          hôtelière, licences d&apos;agences de voyages, normes environnementales, fiscalité
          avantageuse — ce guide fait le point complet sur le cadre légal en vigueur en 2026
          pour les professionnels du tourisme au Maroc.
        </p>
      </header>

      {/* Hero image */}
      <figure className="mb-10 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=500&fit=crop"
          alt="Documents réglementaires et cadre légal du tourisme marocain"
          className="w-full h-64 sm:h-80 object-cover"
          width={1200}
          height={500}
        />
        <figcaption className="text-xs text-muted-foreground mt-2 text-center">
          Le cadre réglementaire du tourisme marocain se modernise pour la Vision 2030
        </figcaption>
      </figure>

      {/* Table des matières */}
      <nav className="bg-muted/50 rounded-xl p-6 mb-10" aria-label="Table des matières">
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sommaire</h2>
        <ol className="space-y-1.5 text-sm">
          {[
            ["#cadre-legal", "Le cadre légal du tourisme marocain"],
            ["#classification", "Classification des établissements hôteliers"],
            ["#agences-voyages", "Licence d'agence de voyages"],
            ["#normes-environnementales", "Normes environnementales 2024-2026"],
            ["#emploi-formation", "Réglementation emploi et formation"],
            ["#fiscalite", "Fiscalité et incitations à l'investissement"],
            ["#cdm-2030", "Nouvelles exigences Coupe du Monde 2030"],
            ["#sanctions", "Sanctions et contrôles"],
            ["#faq", "Questions fréquentes"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="text-primary hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Chiffres clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: "61-00", label: "Loi principale établissements", color: "bg-slate-50 border-slate-200" },
          { value: "4 630", label: "Établissements classifiés", color: "bg-blue-50 border-blue-200" },
          { value: "200+", label: "Critères de classement", color: "bg-amber-50 border-amber-200" },
          { value: "2030", label: "Échéance Vision Maroc", color: "bg-emerald-50 border-emerald-200" },
        ].map(({ value, label, color }) => (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Article content */}
      <article className="prose prose-slate max-w-none">

        <h2 id="cadre-legal">Le cadre légal du tourisme marocain</h2>
        <p>
          Le tourisme au Maroc est encadré par un ensemble de textes législatifs et réglementaires
          qui définissent les obligations des opérateurs et les droits des touristes. Les
          textes fondamentaux sont :
        </p>
        <ul>
          <li>
            <strong>Loi n° 61-00 :</strong> Statut des établissements touristiques — classification,
            conditions d&apos;ouverture, obligations des exploitants
          </li>
          <li>
            <strong>Loi n° 31-96 :</strong> Statut des agences de voyages — licence,
            cautionnement, responsabilités
          </li>
          <li>
            <strong>Loi n° 80-14 :</strong> Relative aux établissements d&apos;animation
            touristique (parcs, centres de loisirs, golf)
          </li>
          <li>
            <strong>Décret n° 2-12-622 :</strong> Modalités d&apos;application de la classification
            hôtelière (critères détaillés)
          </li>
          <li>
            <strong>Circulaire du Ministère du Tourisme 2024 :</strong> Nouvelles exigences
            relatives aux établissements touristiques dans le cadre de la Coupe du Monde 2030
          </li>
        </ul>
        <p>
          L&apos;autorité de tutelle est le <strong>Ministère du Tourisme, de l&apos;Artisanat
          et de l&apos;Économie Sociale et Solidaire</strong>, avec en première ligne la Direction
          des Établissements Touristiques (DET) qui instruit les dossiers de classement et de
          licence.
        </p>

        <h2 id="classification">Classification des établissements hôteliers</h2>
        <p>
          La classification hôtelière marocaine distingue plusieurs catégories d&apos;établissements,
          chacune soumise à des critères précis d&apos;infrastructure, de service et de personnel :
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Superficie chambre min.</th>
                <th>Équipements obligatoires</th>
                <th>Personnel qualifié requis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>★ (1 étoile)</strong></td>
                <td>10 m²</td>
                <td>Salle de bain privée, télévision</td>
                <td>Réceptionniste niveau BTP</td>
              </tr>
              <tr>
                <td><strong>★★ (2 étoiles)</strong></td>
                <td>12 m²</td>
                <td>Restauration, Wi-Fi, climatisation</td>
                <td>Chef de réception BTS</td>
              </tr>
              <tr>
                <td><strong>★★★ (3 étoiles)</strong></td>
                <td>14 m²</td>
                <td>Room service, parking, salle réunion</td>
                <td>30% personnel diplômé hôtellerie</td>
              </tr>
              <tr>
                <td><strong>★★★★ (4 étoiles)</strong></td>
                <td>18 m²</td>
                <td>Piscine, fitness, spa basique, conciergerie</td>
                <td>50% personnel diplômé, bilingue</td>
              </tr>
              <tr>
                <td><strong>★★★★★ (5 étoiles)</strong></td>
                <td>28 m²</td>
                <td>Spa complet, plusieurs restaurants, butler</td>
                <td>70% personnel diplômé, trilingue</td>
              </tr>
              <tr>
                <td><strong>5★ Luxe</strong></td>
                <td>40 m²</td>
                <td>Tout inclus premium, chef étoilé requis</td>
                <td>Profils internationaux, formations continues</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Procédure de classement</h3>
        <p>
          La demande de classement se dépose auprès de la Direction Régionale du Tourisme de
          la wilaya concernée ou en ligne sur le portail <strong>e-tourisme.gov.ma</strong>.
          Une commission mixte (Ministère + Conseil Régional du Tourisme) effectue une visite
          de vérification dans un délai de 45 jours ouvrables. La décision est rendue sous
          3 à 6 mois. Le classement est valable <strong>5 ans</strong>, renouvelable après
          audit de conformité.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2 text-amber-800">
            Nouveau : Classement accéléré Coupe du Monde 2030
          </h3>
          <p className="text-sm text-amber-700">
            Pour les établissements situés dans les 6 villes hôtes (Casablanca, Rabat, Marrakech,
            Fès, Tanger, Agadir), la procédure de classement ou de reclassement est instruite
            en <strong>priorité dans un délai de 60 jours</strong> selon la circulaire
            ministérielle de janvier 2025. Un accompagnement technique gratuit est proposé
            par la DET.
          </p>
        </div>

        <h2 id="agences-voyages">Licence d&apos;agence de voyages</h2>
        <p>
          L&apos;exercice de l&apos;activité d&apos;agence de voyages est soumis à l&apos;obtention
          préalable d&apos;une licence délivrée par le Ministère du Tourisme. Les conditions
          requises sont les suivantes :
        </p>
        <ul>
          <li>
            <strong>Local commercial :</strong> Minimum 20 m² en rez-de-chaussée ou à un
            étage accessible, avec enseigne et accueil distinct
          </li>
          <li>
            <strong>Qualification du dirigeant :</strong> BTS Tourisme, Licence en tourisme
            ou expérience professionnelle de 5 ans attestée dans le secteur
          </li>
          <li>
            <strong>Cautionnement bancaire :</strong> 200 000 MAD pour les agences de catégorie
            A (voyages internationaux) ; 100 000 MAD pour les agences de catégorie B
            (voyages nationaux uniquement)
          </li>
          <li>
            <strong>Assurance RC professionnelle :</strong> Couvrant la responsabilité civile
            envers les clients pour un minimum de 2 millions MAD
          </li>
          <li>
            <strong>Inscription au registre de commerce</strong> et affiliation à la CNSS
          </li>
        </ul>
        <p>
          La licence est personnelle et incessible. Toute cession d&apos;agence nécessite une
          nouvelle instruction du dossier. Les agences opérant sans licence s&apos;exposent
          à des amendes pouvant atteindre <strong>500 000 MAD</strong> et à la fermeture
          administrative immédiate.
        </p>

        <h3>Obligations annuelles des agences</h3>
        <ul>
          <li>Renouvellement annuel de l&apos;assurance RC et du cautionnement</li>
          <li>Déclaration annuelle d&apos;activité auprès de la DET</li>
          <li>Affichage obligatoire des prix et conditions de vente</li>
          <li>Tenue d&apos;un registre des voyages organisés</li>
          <li>Formation continue du personnel (minimum 3 jours/an depuis 2024)</li>
        </ul>

        <figure className="not-prose my-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=400&fit=crop"
            alt="Bureau professionnel agence de voyages Maroc"
            className="w-full h-56 object-cover"
            width={900}
            height={400}
          />
          <figcaption className="text-xs text-muted-foreground mt-2 text-center">
            L&apos;exercice légal de l&apos;activité d&apos;agence de voyages nécessite une licence ministérielle
          </figcaption>
        </figure>

        <h2 id="normes-environnementales">Normes environnementales 2024-2026</h2>
        <p>
          Le Maroc a considérablement renforcé ses exigences environnementales pour le secteur
          touristique dans le cadre de la Stratégie Nationale de Développement Durable (SNDD)
          et de l&apos;Agenda 2030. En 2026, les obligations sont les suivantes :
        </p>

        <h3>Gestion de l&apos;eau</h3>
        <ul>
          <li>Installation de récupérateurs d&apos;eau de pluie obligatoire pour les hôtels 4-5 étoiles
            en zone de stress hydrique (Marrakech, Agadir, Fès)</li>
          <li>Robinetteries et chasses d&apos;eau économiques certifiées obligatoires</li>
          <li>Piscines : systèmes de recirculation et traitement à l&apos;ozone autorisés
            (chlore limité)</li>
          <li>Rapport annuel de consommation d&apos;eau à transmettre à l&apos;ONEE</li>
        </ul>

        <h3>Énergie et émissions</h3>
        <ul>
          <li>Panneaux solaires thermiques obligatoires pour la production d&apos;eau chaude
            (hôtels de plus de 50 chambres, depuis janvier 2025)</li>
          <li>Diagnostic énergétique obligatoire tous les 3 ans</li>
          <li>Objectif : réduction de 20 % de la consommation énergétique d&apos;ici 2028</li>
          <li>Incitation fiscale : déduction de 100 % des investissements en énergies
            renouvelables la première année</li>
        </ul>

        <h3>Label Clé Verte (Green Key)</h3>
        <p>
          Le label international Clé Verte est désormais recommandé (et encouragé fiscalement)
          pour les hôtels 4-5 étoiles. Il deviendra obligatoire pour les nouvelles demandes
          de classement 5 étoiles à partir de janvier 2027. Les hôtels labellisés bénéficient
          d&apos;une réduction de 15 % sur la Taxe de Séjour.
        </p>

        <h2 id="emploi-formation">Réglementation emploi et formation</h2>
        <p>
          Le secteur touristique est soumis aux dispositions générales du Code du Travail
          marocain (Loi n° 65-99), avec des spécificités sectorielles :
        </p>

        <h3>Qualification du personnel</h3>
        <p>
          La Loi n° 61-00 impose des taux minimum de personnel qualifié selon la catégorie
          de l&apos;établissement (voir tableau ci-dessus). Le contrôle est effectué lors
          des inspections annuelles du Ministère du Travail et lors des renouvellements
          de classement.
        </p>

        <h3>ISTA — Formation professionnelle</h3>
        <p>
          L&apos;Office de la Formation Professionnelle et de la Promotion du Travail (OFPPT)
          gère les <strong>Instituts Spécialisés de Technologie Appliquée (ISTA)</strong>
          dédiés à l&apos;hôtellerie et au tourisme. En 2026, 24 ISTA Hôtellerie-Tourisme
          opèrent à travers le Maroc. Les établissements hôteliers peuvent bénéficier de
          conventions de formation subventionnées par l&apos;OFPPT.
        </p>

        <h3>Contrats saisonniers</h3>
        <p>
          Les établissements touristiques peuvent recourir aux <strong>contrats à durée
          déterminée saisonniers</strong> pour les périodes de haute activité. Ces contrats
          peuvent être renouvelés sans limite dans le secteur touristique, à condition
          que la saisonnalité soit justifiée. La durée maximale d&apos;un CDD saisonnier
          est de 6 mois, renouvelable une fois.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">
            Rappel : Obligations sociales des employeurs hôteliers
          </h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Affiliation CNSS obligatoire dès le premier employé</li>
            <li>Déclaration mensuelle des salaires avant le 10 du mois suivant</li>
            <li>Visite médicale annuelle obligatoire pour tout le personnel</li>
            <li>Formation incendie et premiers secours : 1 session/an minimum</li>
            <li>Registre d&apos;employeur tenu à jour et disponible pour inspection</li>
          </ul>
        </div>

        <h2 id="fiscalite">Fiscalité et incitations à l&apos;investissement hôtelier</h2>
        <p>
          Le Maroc offre un cadre fiscal attractif pour les investissements dans l&apos;hôtellerie,
          renforcé par la Loi de Finances 2026 :
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Avantage fiscal</th>
                <th>Conditions</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Exonération d&apos;IS (Impôt sur les Sociétés)</td>
                <td>Nouveaux établissements touristiques</td>
                <td>5 ans</td>
              </tr>
              <tr>
                <td>IS au taux réduit (17,5 %)</td>
                <td>Exercices 6 à 10 après ouverture</td>
                <td>5 ans</td>
              </tr>
              <tr>
                <td>TVA réduite (10 %)</td>
                <td>Nuitées hôtelières et restauration rattachée</td>
                <td>Permanent</td>
              </tr>
              <tr>
                <td>Exonération droits de douane</td>
                <td>Matériaux de construction et équipements hôteliers</td>
                <td>Phase de construction</td>
              </tr>
              <tr>
                <td>Prime d&apos;investissement AMDI</td>
                <td>Projets &gt; 200 M MAD et création de 50+ emplois</td>
                <td>Selon convention</td>
              </tr>
              <tr>
                <td>Crédit d&apos;impôt énergies renouvelables</td>
                <td>Installation panneau solaire, éolien</td>
                <td>100 % l&apos;année 1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Taxe de séjour</h3>
        <p>
          La taxe de séjour est collectée par les hébergements touristiques pour le compte
          des communes. En 2026, les taux varient selon la catégorie :
        </p>
        <ul>
          <li>5 étoiles luxe : 30 MAD/nuitée/personne</li>
          <li>5 étoiles : 20 MAD/nuitée/personne</li>
          <li>4 étoiles : 15 MAD/nuitée/personne</li>
          <li>3 étoiles : 10 MAD/nuitée/personne</li>
          <li>1-2 étoiles et non classé : 5 MAD/nuitée/personne</li>
        </ul>
        <p>
          La taxe doit être reversée trimestriellement à la commune. Les établissements labellisés
          Clé Verte bénéficient d&apos;une réduction de 15 % sur ce montant.
        </p>

        <h2 id="cdm-2030">Nouvelles exigences Coupe du Monde 2030</h2>
        <p>
          Dans le cadre de la préparation au Mondial 2030, le gouvernement marocain a lancé
          le <strong>Programme Hôtelier Coupe du Monde (PHCM)</strong>, qui impose des
          standards supplémentaires aux établissements des 6 villes hôtes :
        </p>

        <ul>
          <li>
            <strong>Capacité d&apos;accueil minimale :</strong> Les hôtels participant au
            programme officiel FIFA doivent disposer d&apos;au moins 100 chambres en bloc
            réservé équipes/délégations
          </li>
          <li>
            <strong>Connectivité :</strong> Wi-Fi fibre optique avec débit minimum de 1 Gbps
            dans toutes les chambres et espaces communs
          </li>
          <li>
            <strong>Accessibilité PMR :</strong> 10 % des chambres adaptées aux personnes
            à mobilité réduite, ascenseurs et rampes conformes aux normes ADA
          </li>
          <li>
            <strong>Sécurité :</strong> Système de vidéosurveillance certifié, coffres-forts
            en chambre obligatoires, protocole anti-incendie NFPA compliant
          </li>
          <li>
            <strong>Personnel linguistique :</strong> Minimum 30 % du personnel en contact
            client maîtrisant l&apos;anglais, l&apos;arabe et une troisième langue
          </li>
          <li>
            <strong>Certifications alimentaires :</strong> HACCP norme ISO 22000 pour les
            cuisines participant au programme officiel
          </li>
        </ul>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
          <h3 className="text-lg font-semibold mb-2">Calendrier des mises en conformité</h3>
          <ul className="text-sm space-y-2">
            <li><strong>Juillet 2026 :</strong> Dépôt des dossiers d&apos;adhésion au PHCM</li>
            <li><strong>Décembre 2026 :</strong> Audit de pré-conformité par la commission FIFA/Ministère</li>
            <li><strong>Juin 2028 :</strong> Certification finale obligatoire pour les hôtels officiels</li>
            <li><strong>Janvier 2030 :</strong> Ouverture de la période de réservation des blocs équipes</li>
          </ul>
        </div>

        <h2 id="sanctions">Sanctions et contrôles</h2>
        <p>
          Les infractions à la réglementation touristique sont sanctionnées par la Loi n° 61-00
          et ses décrets d&apos;application. Les principales sanctions sont :
        </p>
        <ul>
          <li>
            <strong>Exploitation sans classement :</strong> Amende de 50 000 à 200 000 MAD,
            fermeture administrative possible
          </li>
          <li>
            <strong>Agence de voyages sans licence :</strong> Amende de 100 000 à 500 000 MAD,
            saisie du matériel, poursuite pénale du dirigeant
          </li>
          <li>
            <strong>Non-conformité aux normes de sécurité :</strong> Fermeture d&apos;urgence
            sans délai par les autorités locales
          </li>
          <li>
            <strong>Défaut d&apos;affiliation CNSS :</strong> Majorations et pénalités de
            retard cumulatives + solidarité du propriétaire des murs
          </li>
        </ul>
        <p>
          Les inspections sont conduites conjointement par la Direction des Établissements
          Touristiques, l&apos;Inspection du Travail et les services communaux. En 2025,
          <strong>423 établissements</strong> ont été mis en demeure et <strong>87
          fermetures administratives</strong> prononcées sur l&apos;ensemble du territoire.
        </p>

        <p>
          Pour approfondir votre compréhension du secteur, consultez nos guides sur
          l&apos;{" "}
          <Link href="/guide/investissement-hotelier-marrakech-2026" className="text-primary hover:underline">
            investissement hôtelier à Marrakech
          </Link>
          {" "}ou le{" "}
          <Link href="/guide/coupe-du-monde-2030-tourisme" className="text-primary hover:underline">
            tourisme et la Coupe du Monde 2030
          </Link>
          .
        </p>

        {/* FAQ */}
        <h2 id="faq">Questions fréquentes — Réglementation tourisme Maroc</h2>

        <div className="space-y-6 not-prose">
          {[
            {
              q: "Quelle loi régit le tourisme au Maroc en 2026 ?",
              a: "Le secteur est principalement régi par la Loi n° 61-00 (établissements touristiques) et la Loi n° 31-96 (agences de voyages), complétées par des décrets d'application et la circulaire de 2024 relative aux exigences Coupe du Monde 2030. L'autorité de tutelle est le Ministère du Tourisme.",
            },
            {
              q: "Comment obtenir la classification étoile pour un hôtel au Maroc ?",
              a: "Déposer une demande auprès de la Direction Régionale du Tourisme ou via e-tourisme.gov.ma. Une commission mixte effectue une visite d'évaluation sur 200+ critères. La procédure prend 3 à 6 mois. Le classement est valable 5 ans.",
            },
            {
              q: "Quelles sont les conditions pour ouvrir une agence de voyages au Maroc ?",
              a: "Local de 20 m² minimum, dirigeant titulaire d'un BTS Tourisme ou 5 ans d'expérience, cautionnement de 200 000 MAD (catégorie A) ou 100 000 MAD (catégorie B), assurance RC professionnelle et inscription au registre de commerce.",
            },
            {
              q: "Quelles sont les normes environnementales pour les hôtels au Maroc ?",
              a: "Depuis 2024, les hôtels 4-5 étoiles doivent installer des panneaux solaires thermiques, réaliser un diagnostic énergétique triennal et viser le label Clé Verte (obligatoire pour les 5 étoiles dès 2027). Des incitations fiscales compensent ces investissements.",
            },
            {
              q: "Quels avantages fiscaux pour investir dans l'hôtellerie au Maroc ?",
              a: "Exonération d'IS pendant 5 ans, taux réduit 17,5 % de l'année 6 à 10, TVA à 10 % sur les nuitées, exonération des droits de douane sur les équipements et primes AMDI pour les grands projets. Crédit d'impôt de 100 % pour les installations solaires.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border rounded-xl p-5">
              <h3 className="font-semibold mb-2">{q}</h3>
              <p className="text-muted-foreground text-sm">{a}</p>
            </div>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Recrutez des professionnels du tourisme qualifiés
        </h2>
        <p className="mb-6 opacity-90">
          SiyahaMag connecte les établissements touristiques marocains avec les meilleurs
          candidats du secteur. Publiez vos offres d&apos;emploi gratuitement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inscription"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition"
          >
            Créer un compte employeur
          </Link>
          <Link
            href="/investissement"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition"
          >
            Opportunités d&apos;investissement
          </Link>
        </div>
      </div>
    </div>
  )
}
