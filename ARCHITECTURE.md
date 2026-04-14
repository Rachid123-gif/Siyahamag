# SiyahaMag.com — Architecture du Projet

> Document de reference pour l'architecture technique de la plateforme.

---

## 1. Vue d'ensemble

SiyahaMag.com est une plateforme web **Next.js 16** (App Router) combinant :
- **Media touristique** (articles, actualites)
- **Emploi specialise** (offres, candidatures)
- **Statistiques** du tourisme marocain
- **Investissement** touristique

### Stack technique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | Next.js (App Router, RSC) | 16.2.2 |
| Runtime | React | 19.2.4 |
| Langage | TypeScript | 5.x |
| Base de donnees | Supabase (PostgreSQL) | - |
| ORM | Prisma | 7.6.0 |
| Auth | Supabase Auth | SSR cookies |
| Storage | Supabase Storage | Buckets |
| Styling | Tailwind CSS 4 + shadcn/ui | 4.x |
| Rich Text | Tiptap | 3.22.0 |
| Graphiques | Recharts | 3.8.1 |
| Validation | Zod | 4.3.6 |
| Emails | Resend | 6.10.0 |
| Hebergement | Vercel + Supabase | - |

---

## 2. Structure des dossiers

```
siyahamag/
|-- prisma/
|   |-- schema.prisma          # Schema DB complet (13 modeles, 16 enums)
|   |-- seed.ts                # Donnees de test
|   +-- migrations/            # Migrations Prisma
|
|-- src/
|   |-- app/
|   |   |-- page.tsx           # Homepage
|   |   |-- layout.tsx         # Root layout (Header + Footer + Toaster)
|   |   |-- globals.css        # Theme SiyahaMag (palette, typo)
|   |   |
|   |   |-- (public)/          # Pages publiques (visiteurs)
|   |   |   |-- actualites/    # Articles & sous-categories
|   |   |   |-- emplois/       # Recherche + detail offres
|   |   |   |-- statistiques/  # Chiffres du tourisme
|   |   |   |-- investissement/# Opportunites
|   |   |   |-- thematiques/   # Pages thematiques
|   |   |   |-- newsletter/    # Inscription newsletter
|   |   |   |-- entreprise/    # Profil public entreprise
|   |   |   |-- connexion/     # Login
|   |   |   +-- inscription/   # Signup (candidat + employeur)
|   |   |
|   |   |-- (dashboard)/       # Pages protegees (authentifies)
|   |   |   |-- admin/         # Dashboard admin
|   |   |   |   |-- articles/  # CRUD articles
|   |   |   |   |-- statistiques/ # CRUD stats
|   |   |   |   |-- moderation/   # Files moderation
|   |   |   |   |-- utilisateurs/ # Gestion users
|   |   |   |   +-- signalements/ # Reports
|   |   |   |
|   |   |   |-- employeur/     # Dashboard employeur
|   |   |   |   |-- offres/    # CRUD offres
|   |   |   |   |-- profil/    # Profil entreprise
|   |   |   |   +-- verification/ # Statut verification
|   |   |   |
|   |   |   |-- candidat/      # Dashboard candidat
|   |   |   |   |-- profil/    # Profil + CV
|   |   |   |   |-- candidatures/ # Suivi
|   |   |   |   +-- alertes/   # Alertes emploi
|   |   |   |
|   |   |   +-- mes-investissements/ # Dashboard vendeur
|   |   |
|   |   +-- api/               # API Routes (39 routes)
|   |       |-- auth/          # Callback Supabase
|   |       |-- articles/      # CRUD articles public
|   |       |-- jobs/           # Recherche offres public
|   |       |-- investments/   # Investissements public
|   |       |-- statistics/    # Stats public
|   |       |-- applications/  # Candidatures
|   |       |-- reports/       # Signalements
|   |       |-- upload/        # Upload fichiers
|   |       |-- employer/      # API employeur
|   |       |-- candidate/     # API candidat
|   |       |-- seller/        # API vendeur
|   |       |-- companies/     # Profil entreprise public
|   |       +-- admin/         # API admin (articles, moderation, users, stats, reports, dashboard)
|   |
|   |-- components/
|   |   |-- ui/                # shadcn/ui (25+ composants)
|   |   |-- layout/            # Header, Footer, UserNav
|   |   |-- articles/          # ArticleCard, CategoryFilterBar, ShareButtons, RichTextRenderer
|   |   |-- jobs/              # JobCard, JobSearchBar, JobSearchFilters, ApplicationForm, ReportJobDialog
|   |   |-- investments/       # InvestmentCard, InvestmentFilters, PhotoGallery, ContactSellerDialog
|   |   |-- statistics/        # KpiCard, StatisticsCharts
|   |   |-- candidate/         # CandidateSidebar, CandidateProfileForm, AlertsList, ApplicationStatusBadge
|   |   |-- employer/          # EmployerSidebar, JobPostingForm, CompanyProfileForm, JobStatusBadge
|   |   |-- admin/             # AdminSidebar, ArticleForm, TiptapEditor, ModerationActions
|   |   |-- newsletter/        # NewsletterForm
|   |   +-- seo/               # JsonLd
|   |
|   |-- lib/
|   |   |-- prisma.ts          # Client Prisma singleton
|   |   |-- auth.ts            # Helpers auth (admin, employer, candidate)
|   |   |-- constants.ts       # Labels FR, categories, enums
|   |   |-- demoData.ts        # Donnees demo statiques
|   |   |-- formatDate.ts      # Formatage dates FR
|   |   |-- formatNumber.ts    # Formatage nombres FR
|   |   |-- utils.ts           # cn() utility
|   |   |-- supabase/
|   |   |   |-- client.ts      # Supabase browser client
|   |   |   +-- server.ts      # Supabase server client
|   |   +-- validations/       # Schemas Zod
|   |       |-- auth.ts
|   |       |-- article.ts
|   |       |-- job.ts
|   |       |-- investment.ts
|   |       |-- application.ts
|   |       |-- report.ts
|   |       +-- statistic.ts
|   |
|   +-- types/
|       +-- index.ts           # Types TypeScript globaux
|
|-- docs/                      # Documentation
|   |-- PRODUCT.md             # Cahier des fonctionnalites
|   |-- TECHNICAL.md           # Decisions techniques
|   |-- UI.md                  # Guidelines UI/UX
|   +-- specs/                 # Feature specs (15 fichiers)
|
|-- public/                    # Assets statiques
+-- .claude/                   # Config Claude Code
```

---

## 3. Architecture des donnees

### Modeles Prisma (13)

```
User ──────────── CandidateProfile
  |                     |
  |──── Company ──── JobListing ──── Application
  |                     |
  |──── Article         |
  |                     |
  |──── Investment ── ContactMessage
  |
  |──── JobAlert
  |
  |──── TourismStatistic
  |
  +──── ModerationLog
  
Report (standalone)
```

### Enums (16)

| Enum | Valeurs |
|------|---------|
| Role | ADMIN, CANDIDATE, EMPLOYER, INVESTOR |
| ArticleStatus | DRAFT, PUBLISHED, SCHEDULED |
| ArticleCategory | HEBERGEMENT, TRANSPORT, AERIEN, GASTRONOMIE, EVENEMENTS, DEVELOPPEMENT, MICE |
| JobCategory | RECEPTION, CUISINE, SERVICE, ANIMATION, GUIDE, BIEN_ETRE, MANAGEMENT, MICE, TRANSPORT, ENTRETIEN |
| ContractType | CDI, CDD, SAISONNIER, STAGE, FREELANCE |
| JobStatus | PENDING, APPROVED, REJECTED, EXPIRED, DISABLED |
| ApplicationStatus | UNREAD, VIEWED, SHORTLISTED, REJECTED |
| CompanyVerification | PENDING, VERIFIED, REJECTED |
| Availability | IMMEDIATE, ONE_MONTH, THREE_MONTHS |
| InvestmentType | TERRAIN, HOTEL, RIAD, RESTAURANT, PROJET, AUTRE |
| PropertyCondition | NEUF, A_RENOVER, EN_ACTIVITE |
| InvestmentStatus | PENDING, APPROVED, REJECTED, SOLD |
| ReportStatus | PENDING, RESOLVED, DISMISSED |
| ReportTargetType | JOB_LISTING, INVESTMENT |
| StatisticIndicator | TOURISTS, REVENUE, NIGHTS, OCCUPANCY_RATE |
| MoroccoRegion | 12 regions du Maroc |

---

## 4. Architecture des routes

### Pages publiques (53 pages)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage |
| `/actualites` | Static | Liste articles |
| `/actualites/[slug]` | Dynamic | Detail article |
| `/actualites/{sous-cat}` | Static x7 | Sous-categories |
| `/emplois` | Static | Recherche offres |
| `/emplois/[slug]` | Dynamic | Detail offre |
| `/emplois/[slug]/postuler` | Dynamic | Candidature |
| `/statistiques` | Static | Chiffres tourisme |
| `/investissement` | Static | Liste opportunites |
| `/investissement/[slug]` | Dynamic | Detail opportunite |
| `/investissement/publier` | Dynamic | Publication |
| `/thematiques` | Static | Hub thematiques |
| `/thematiques/{theme}` | Static x4 | Pages thematiques |
| `/newsletter` | Static | Inscription |
| `/entreprise/[id]` | Dynamic | Profil entreprise |
| `/connexion` | Static | Login |
| `/inscription` | Static | Signup candidat |
| `/inscription/employeur` | Static | Signup employeur |

### Dashboards proteges

| Route | Role | Description |
|-------|------|-------------|
| `/admin/*` | ADMIN | Dashboard admin (8 pages) |
| `/employeur/*` | EMPLOYER | Dashboard employeur (6 pages) |
| `/candidat/*` | CANDIDATE | Dashboard candidat (4 pages) |
| `/mes-investissements` | AUTH | Dashboard vendeur |
| `/tableau-de-bord` | AUTH | Dashboard generique |

### API Routes (39 endpoints)

| Categorie | Endpoints | Auth |
|-----------|-----------|------|
| Articles | 5 | Public + Admin |
| Jobs | 5 | Public + Employer |
| Applications | 4 | Mixed |
| Investments | 6 | Public + Auth + Admin |
| Statistics | 4 | Public + Admin |
| Companies | 1 | Public |
| Candidate | 4 | Candidate |
| Employer | 3 | Employer |
| Admin | 11 | Admin |
| Auth | 1 | Public |
| Upload | 1 | Auth |

---

## 5. Securite

### Authentification
- **Supabase Auth** avec cookies HTTP-only
- **proxy.ts** (middleware Next.js 16) protege les routes
- Session rafraichie automatiquement

### Autorisation
- 4 roles : ADMIN, EMPLOYER, CANDIDATE, INVESTOR
- Verification role dans chaque API route
- Helpers : `getAuthenticatedAdmin()`, `getAuthenticatedEmployer()`, `getAuthenticatedCandidate()`

### Validation
- **Zod** sur chaque input (client + serveur)
- Schemas partages entre front et back
- Messages d'erreur en francais

### Protection des donnees
- Email vendeur jamais expose publiquement
- Soft delete pour donnees sensibles
- Moderation avant publication (offres, investissements, entreprises)

---

## 6. Patterns de design

### Server Components par defaut
Toutes les pages sont des Server Components sauf quand l'interactivite est necessaire (`"use client"`).

### Route Groups
- `(public)` : pages accessibles a tous
- `(dashboard)` : pages protegees par auth

### Validation
```
Client (react-hook-form + zodResolver) 
  -> API Route (Zod validation)
    -> Prisma (DB constraints)
```

### Composants UI
1. shadcn/ui d'abord
2. Composant custom si besoin
3. Props typees avec TypeScript interfaces

### SEO
- `metadata` / `generateMetadata` sur chaque page publique
- JSON-LD (Article, JobPosting)
- Open Graph tags
- Canonical URLs

---

## 7. Deploiement

### Vercel
- Deploiement automatique depuis GitHub (`main` branch)
- Build : `npm run build`
- Runtime : Node.js serverless

### Supabase
- PostgreSQL heberge
- Auth, Storage, Realtime
- Connection via Prisma adapter (`@prisma/adapter-pg`)

### Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cle anonyme Supabase |
| `DATABASE_URL` | Connection string PostgreSQL |
| `RESEND_API_KEY` | Cle API Resend (emails) |
| `NEXT_PUBLIC_APP_URL` | URL de l'application |
