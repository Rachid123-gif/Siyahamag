# SiyahaMag.com — Décisions Techniques

> Source de vérité pour **comment** construire.

---

## Stack technique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Framework | Next.js 14+ (App Router) | SSR, SEO, Server Components |
| Base de données | Supabase (PostgreSQL) | Auth intégrée, Storage, temps réel |
| ORM | Prisma | Type-safe, migrations, seed |
| Auth | Supabase Auth | Email/password, session cookies |
| Storage | Supabase Storage | Fichiers utilisateurs (CV, images) |
| Styling | Tailwind CSS + shadcn/ui | Rapid prototyping, composants accessibles |
| Rich Text | Tiptap | Éditeur extensible, stockage JSON |
| Charts | Recharts | Graphiques React, léger |
| Emails | Resend | API simple, templates React |
| Validation | Zod | Schémas partagés client/serveur |
| Hébergement | Vercel + Supabase | Déploiement automatique |

---

## Schéma de base de données

### Enums

```
Role: ADMIN, CANDIDATE, EMPLOYER, INVESTOR
ArticleStatus: DRAFT, PUBLISHED, SCHEDULED
ArticleCategory: HEBERGEMENT, TRANSPORT, AERIEN, GASTRONOMIE, EVENEMENTS, DEVELOPPEMENT, MICE
JobCategory: RECEPTION, CUISINE, SERVICE, ANIMATION, GUIDE, BIEN_ETRE, MANAGEMENT, MICE, TRANSPORT, ENTRETIEN
ContractType: CDI, CDD, SAISONNIER, STAGE, FREELANCE
JobStatus: PENDING, APPROVED, REJECTED, EXPIRED, DISABLED
ApplicationStatus: UNREAD, VIEWED, SHORTLISTED, REJECTED
CompanyVerification: PENDING, VERIFIED, REJECTED
Availability: IMMEDIATE, ONE_MONTH, THREE_MONTHS
InvestmentType: TERRAIN, HOTEL, RIAD, RESTAURANT, PROJET, AUTRE
PropertyCondition: NEUF, A_RENOVER, EN_ACTIVITE
InvestmentStatus: PENDING, APPROVED, REJECTED, SOLD
ReportStatus: PENDING, RESOLVED, DISMISSED
ReportTargetType: JOB_LISTING, INVESTMENT
StatisticIndicator: TOURISTS, REVENUE, NIGHTS, OCCUPANCY_RATE
MoroccoRegion: MARRAKECH_SAFI, SOUSS_MASSA, TANGER_TETOUAN_AL_HOCEIMA, FES_MEKNES, RABAT_SALE_KENITRA, CASABLANCA_SETTAT, ORIENTAL, BENI_MELLAL_KHENIFRA, DRAA_TAFILALET, GUELMIM_OUED_NOUN, LAAYOUNE_SAKIA_EL_HAMRA, DAKHLA_OUED_ED_DAHAB
```

### Tables

#### User
```
id            String    @id @default(uuid())
email         String    @unique
name          String
role          Role      @default(CANDIDATE)
phone         String?
city          String?
avatarUrl     String?
isSuspended   Boolean   @default(false)
supabaseId    String    @unique  // Lien avec Supabase Auth
createdAt     DateTime  @default(now())
updatedAt     DateTime  @updatedAt
```

#### Article
```
id            String          @id @default(uuid())
title         String
slug          String          @unique
summary       String?
content       Json            // Tiptap JSON
coverImage    String?
category      ArticleCategory
status        ArticleStatus   @default(DRAFT)
publishedAt   DateTime?
scheduledAt   DateTime?
authorId      String          // -> User
viewCount     Int             @default(0)
createdAt     DateTime        @default(now())
updatedAt     DateTime        @updatedAt
```

#### Company
```
id                String              @id @default(uuid())
userId            String              @unique // -> User (employer)
name              String
description       String?
logo              String?
city              String
sector            String
website           String
ice               String              // Identifiant Commun de l'Entreprise
email             String
verificationStatus CompanyVerification @default(PENDING)
rejectionReason   String?
verifiedAt        DateTime?
createdAt         DateTime            @default(now())
updatedAt         DateTime            @updatedAt
```

#### JobListing
```
id              String        @id @default(uuid())
title           String
slug            String        @unique
description     Json          // Tiptap JSON
jobCategory     JobCategory
contractType    ContractType
city            String
region          MoroccoRegion?
skills          String[]
experience      String?
salary          String?       // Optionnel, texte libre
deadline        DateTime?
status          JobStatus     @default(PENDING)
rejectionReason String?
viewCount       Int           @default(0)
companyId       String        // -> Company
approvedAt      DateTime?
createdAt       DateTime      @default(now())
updatedAt       DateTime      @updatedAt
```

#### CandidateProfile
```
id              String        @id @default(uuid())
userId          String        @unique // -> User
cvUrl           String?
experiences     Json?         // Array of experience objects
skills          String[]
education       String?
desiredCity     String?
availability    Availability  @default(IMMEDIATE)
createdAt       DateTime      @default(now())
updatedAt       DateTime      @updatedAt
```

#### Application
```
id              String            @id @default(uuid())
jobListingId    String            // -> JobListing
candidateEmail  String
candidateName   String
cvUrl           String
message         String?
status          ApplicationStatus @default(UNREAD)
userId          String?           // -> User (null si candidature sans compte)
createdAt       DateTime          @default(now())
updatedAt       DateTime          @updatedAt
```

#### JobAlert
```
id              String        @id @default(uuid())
userId          String        // -> User
city            String?
region          MoroccoRegion?
jobCategory     JobCategory?
contractType    ContractType?
isActive        Boolean       @default(true)
lastSentAt      DateTime?
createdAt       DateTime      @default(now())
updatedAt       DateTime      @updatedAt
```

#### Investment
```
id              String            @id @default(uuid())
title           String
slug            String            @unique
description     Json              // Tiptap JSON
investmentType  InvestmentType
city            String
region          MoroccoRegion?
price           Float?
surface         Float?
rooms           Int?
condition       PropertyCondition?
images          String[]          // URLs
status          InvestmentStatus  @default(PENDING)
rejectionReason String?
contactName     String
contactCompany  String?
contactEmail    String            // Jamais affiché publiquement
userId          String            // -> User
viewCount       Int               @default(0)
approvedAt      DateTime?
createdAt       DateTime          @default(now())
updatedAt       DateTime          @updatedAt
```

#### TourismStatistic
```
id              String              @id @default(uuid())
indicator       StatisticIndicator
value           Float
year            Int
region          MoroccoRegion?      // null = national
source          String
updatedByUserId String              // -> User (admin)
createdAt       DateTime            @default(now())
updatedAt       DateTime            @updatedAt
```

#### Report
```
id              String          @id @default(uuid())
targetType      ReportTargetType
targetId        String          // ID du JobListing ou Investment
reason          String
reporterEmail   String
status          ReportStatus    @default(PENDING)
resolvedByUserId String?        // -> User (admin)
resolvedAt      DateTime?
createdAt       DateTime        @default(now())
```

#### ModerationLog
```
id              String    @id @default(uuid())
action          String    // APPROVE, REJECT, SUSPEND, etc.
targetType      String    // COMPANY, JOB_LISTING, INVESTMENT, USER
targetId        String
reason          String?
adminId         String    // -> User
createdAt       DateTime  @default(now())
```

#### ContactMessage
```
id              String    @id @default(uuid())
investmentId    String    // -> Investment
senderName      String
senderEmail     String
message         String
createdAt       DateTime  @default(now())
```

---

## Architecture API

### Module 1 — Articles

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/api/articles` | Non | Liste paginée, filtres catégorie/recherche |
| GET | `/api/articles/[slug]` | Non | Détail d'un article |
| POST | `/api/articles` | Admin | Créer un article |
| PATCH | `/api/articles/[id]` | Admin | Modifier un article |
| DELETE | `/api/articles/[id]` | Admin | Supprimer un article |

### Module 2 — Emploi

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/api/jobs` | Non | Recherche d'offres (filtres, pagination) |
| GET | `/api/jobs/[slug]` | Non | Détail d'une offre |
| POST | `/api/jobs` | Employer | Créer une offre |
| PATCH | `/api/jobs/[id]` | Employer | Modifier une offre |
| DELETE | `/api/jobs/[id]` | Employer | Supprimer une offre |
| POST | `/api/jobs/[id]/apply` | Non* | Postuler (*compte optionnel) |
| GET | `/api/jobs/[id]/applications` | Employer | Candidatures pour une offre |
| PATCH | `/api/applications/[id]` | Employer | Changer statut candidature |
| POST | `/api/companies` | Employer | Créer profil entreprise |
| PATCH | `/api/companies/[id]` | Employer | Modifier profil entreprise |
| GET | `/api/companies/[slug]` | Non | Profil public entreprise |
| GET | `/api/candidates/me` | Candidate | Mon profil candidat |
| PATCH | `/api/candidates/me` | Candidate | Modifier mon profil |
| GET | `/api/candidates/me/applications` | Candidate | Mes candidatures |
| POST | `/api/job-alerts` | Candidate | Créer une alerte |
| DELETE | `/api/job-alerts/[id]` | Candidate | Supprimer une alerte |
| POST | `/api/reports` | Non | Signaler une offre/annonce |

### Module 3 — Statistiques

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/api/statistics` | Non | Toutes les statistiques (filtres année/région) |
| POST | `/api/statistics` | Admin | Ajouter une donnée |
| PATCH | `/api/statistics/[id]` | Admin | Modifier une donnée |
| DELETE | `/api/statistics/[id]` | Admin | Supprimer une donnée |

### Module 4 — Investissement

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/api/investments` | Non | Liste (filtres type/ville/prix) |
| GET | `/api/investments/[slug]` | Non | Détail |
| POST | `/api/investments` | User | Publier une opportunité |
| PATCH | `/api/investments/[id]` | Owner | Modifier |
| DELETE | `/api/investments/[id]` | Owner | Supprimer |
| POST | `/api/investments/[id]/contact` | Non | Contacter le vendeur |

### Module 5 — Admin

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| GET | `/api/admin/dashboard` | Admin | Métriques globales |
| GET | `/api/admin/moderation/jobs` | Admin | Offres en attente |
| PATCH | `/api/admin/moderation/jobs/[id]` | Admin | Approuver/rejeter |
| GET | `/api/admin/moderation/companies` | Admin | Entreprises en attente |
| PATCH | `/api/admin/moderation/companies/[id]` | Admin | Vérifier/rejeter |
| GET | `/api/admin/moderation/investments` | Admin | Investissements en attente |
| PATCH | `/api/admin/moderation/investments/[id]` | Admin | Approuver/rejeter |
| GET | `/api/admin/reports` | Admin | Signalements |
| PATCH | `/api/admin/reports/[id]` | Admin | Traiter signalement |
| GET | `/api/admin/users` | Admin | Liste utilisateurs |
| PATCH | `/api/admin/users/[id]` | Admin | Suspendre/activer |

### Auth

| Méthode | Endpoint | Auth | Description |
|---------|----------|------|-------------|
| POST | `/api/auth/signup` | Non | Inscription (candidat ou employeur) |
| POST | `/api/auth/login` | Non | Connexion |
| POST | `/api/auth/logout` | Oui | Déconnexion |
| GET | `/api/auth/me` | Oui | Utilisateur courant |

---

## Auth — Supabase Auth

### Stratégie

1. **Supabase Auth** gère l'authentification (email/password)
2. Un trigger `on_auth_user_created` crée automatiquement un enregistrement dans la table `User` de Prisma
3. Le champ `supabaseId` dans `User` fait le lien
4. Les sessions sont gérées par cookies (middleware Next.js)

### Rôles et permissions

| Rôle | Accès |
|------|-------|
| ADMIN | Tout |
| EMPLOYER | Dashboard employeur, publier des offres, gérer candidatures |
| CANDIDATE | Profil, postuler, alertes, suivi candidatures |
| INVESTOR | Publier/gérer des opportunités d'investissement |

### Middleware de protection

```
/admin/*           → ADMIN uniquement
/dashboard/*       → Authentifié (redirige vers /connexion)
/employeur/*       → EMPLOYER vérifié
/candidat/*        → CANDIDATE
/api/admin/*       → ADMIN uniquement
/api/jobs (POST)   → EMPLOYER vérifié
/api/investments (POST) → Authentifié
```

---

## Storage — Supabase Storage

### Buckets

| Bucket | Usage | Taille max | Types |
|--------|-------|-----------|-------|
| `avatars` | Photos de profil | 2 MB | jpg, png, webp |
| `cvs` | CV des candidats | 5 MB | pdf |
| `content` | Images articles + investissements | 5 MB | jpg, png, webp |

### Organisation des fichiers

```
avatars/{userId}/avatar.{ext}
cvs/{userId}/cv.pdf
content/articles/{articleId}/{filename}
content/investments/{investmentId}/{filename}
```

---

## Emails — Resend API

### Types d'emails (9)

| Email | Destinataire | Déclencheur |
|-------|-------------|-------------|
| Bienvenue | Candidat/Employeur | Inscription |
| Vérification en cours | Employeur | Après soumission documents |
| Compte vérifié | Employeur | Admin approuve |
| Compte rejeté | Employeur | Admin rejette (avec motif) |
| Offre approuvée | Employeur | Admin approuve l'offre |
| Offre rejetée | Employeur | Admin rejette l'offre (avec motif) |
| Candidature envoyée | Candidat | Après candidature |
| Statut candidature | Candidat | Employeur change le statut |
| Alerte emploi | Candidat | Nouvelle offre correspondant aux critères |

### Template

Tous les emails en français, avec le logo SiyahaMag, responsive, expéditeur : `SiyahaMag <noreply@siyahamag.com>`

---

## Rich Text — Tiptap

- **Éditeur :** Tiptap avec extensions StarterKit + Image + Link + Placeholder
- **Stockage :** JSON dans PostgreSQL (champ `Json` Prisma)
- **Rendu :** Composant `RichTextRenderer` qui convertit le JSON Tiptap en HTML côté serveur
- **Pourquoi JSON :** Flexible, queryable, pas de risque XSS vs HTML brut

---

## Recherche — PostgreSQL Full-Text Search

- Utiliser `@@@` (Prisma full-text search) sur les champs `title` et `content` pour les articles
- Pour les offres : recherche sur `title`, `description`, `city`, `skills`
- Index GIN sur les colonnes searchables
- Pas besoin d'Algolia/Elasticsearch pour le MVP

---

## Charts — Recharts

- **Line charts** pour l'évolution annuelle (touristes, recettes, nuitées)
- **Bar charts** pour la comparaison par région
- **Stats cards** pour les chiffres clés en haut de page
- Composant client (`"use client"`) avec chargement lazy

---

## SEO

### Next.js Metadata API

Chaque page publique doit exporter `metadata` ou `generateMetadata()` :
- `title` — Descriptif, inclure « SiyahaMag » et des mots-clés pertinents
- `description` — 150-160 caractères
- `openGraph` — Image, titre, description pour les partages sociaux
- `alternates.canonical` — URL canonique

### JSON-LD

- **Article** : Schema.org `Article` sur chaque page d'article
- **JobPosting** : Schema.org `JobPosting` sur chaque offre d'emploi
- Injection via `<script type="application/ld+json">` dans le layout

---

## Responsive — Mobile-First

### Breakpoints Tailwind

| Breakpoint | Taille | Usage |
|-----------|--------|-------|
| default | < 640px | Mobile |
| `sm` | >= 640px | Mobile large |
| `md` | >= 768px | Tablette |
| `lg` | >= 1024px | Desktop |
| `xl` | >= 1280px | Desktop large |

### Règles

- Écrire le CSS mobile d'abord, puis ajouter les breakpoints
- Grilles : 1 colonne mobile → 2 colonnes tablette → 3-4 colonnes desktop
- Navigation : menu hamburger sur mobile, barre horizontale sur desktop
- Formulaires : pleine largeur sur mobile, max-width sur desktop

---

## Phases de développement

### Phase 1 — Fondations (Auth + Layout)

- Supabase Auth (inscription, connexion, déconnexion)
- Sync User avec Prisma
- Layout principal (header, footer, navigation)
- Middleware de protection des routes
- Page d'accueil (structure sans contenu dynamique)

### Phase 2 — Module 1 : Articles

- CRUD articles (admin)
- Éditeur Tiptap
- Liste articles avec filtres et pagination
- Page article avec partage social et articles similaires
- SEO (metadata + JSON-LD Article)

### Phase 3 — Module 2A : Employeurs

- Inscription employeur + vérification
- CRUD offres d'emploi
- Dashboard employeur
- Profil entreprise public
- Modération offres (admin)

### Phase 4 — Module 2B : Candidats

- Profil candidat + upload CV
- Recherche d'offres avec filtres
- Page détail offre
- Flow de candidature (avec/sans compte)
- Suivi candidatures
- Alertes emploi
- SEO (JSON-LD JobPosting)

### Phase 5 — Module 3 : Statistiques

- Page statistiques avec charts Recharts
- CRUD données (admin)
- Filtres année/région

### Phase 6 — Module 4 : Investissement

- CRUD opportunités
- Galerie photos
- Formulaire de contact sécurisé
- Modération (admin)

### Phase 7 — Module 5 : Admin Dashboard

- Tableau de bord avec métriques
- Files de modération centralisées
- Gestion utilisateurs
- Gestion signalements
