# Feature Spec: Job Posting (Module 2A)

**Module:** 2A - Employer Side
**Feature:** Job Posting / Publication d'offre d'emploi
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Enable verified employers to create, edit, and manage job listings on SiyahaMag.com. Job postings go through a moderation queue before being published, ensuring quality and preventing abuse. The form is tailored specifically to the Moroccan tourism sector with industry-specific categories, contract types, and required fields. Employers can manage the lifecycle of their listings — from draft to published to closed.

---

## 2. User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|-------------------|
| US-2.3 | En tant qu'employeur vérifié, je veux publier une offre d'emploi avec un formulaire détaillé afin d'attirer les meilleurs candidats du secteur touristique. | Job form has all required tourism-specific fields. Rich text editor for description. Job submitted to moderation queue (PENDING). Employer sees job status. Email notification on approval/rejection. |
| US-2.8 | En tant qu'employeur, je veux modifier ou désactiver une offre publiée afin de garder mes annonces à jour. | Employer can edit published jobs (edit triggers re-moderation for significant changes). Employer can deactivate/close a listing at any time. Closed jobs no longer appear in search results. |

---

## 3. System Flow

### 3.1 Job Creation Flow

```
1. Employer navigates to /employeur/offres/nouvelle
2. System checks employer status:
   a. Company.status must be ACTIVE
   b. Company.isVerified must be true
   c. If not → redirect to /employeur/verification-en-attente
3. System renders the job posting form
4. Employer fills in all fields:
   a. Title (Titre du poste)
   b. Job category (Catégorie du poste)
   c. Contract type (Type de contrat)
   d. City (Ville)
   e. Description (rich text via Tiptap editor)
   f. Required skills (Compétences requises)
   g. Required experience (Expérience requise)
   h. Salary range (Fourchette salariale) — optional
   i. Application deadline (Date limite de candidature)
   j. Languages required (Langues requises) — optional
   k. Start date (Date de début souhaitée) — optional
   l. Number of positions (Nombre de postes) — default 1
5. Employer can:
   a. "Enregistrer en brouillon" → saves as DRAFT (not submitted for moderation)
   b. "Soumettre pour publication" → saves as PENDING (sent to moderation)
6. Client-side validation runs:
   a. All required fields present
   b. Title length: 10-120 characters
   c. Description minimum: 100 characters
   d. Deadline is in the future (at least 7 days from now)
   e. If salary provided: min <= max, values > 0
7. If validation passes → POST /api/employer/jobs
8. Server-side validation (mirrors client + additional):
   a. Employer is verified and active
   b. Content screening for prohibited terms
   c. Description sanitization (XSS prevention)
   d. Rate limit: max 10 job posts per day per employer
9. Job record created in database
10. If PENDING:
    a. Added to moderation queue
    b. Admin notified
    c. Employer shown: "Votre offre a été soumise et sera publiée après validation"
11. If DRAFT:
    a. Saved but not visible
    b. Employer can edit and submit later
```

### 3.2 Job Edit Flow

```
1. Employer navigates to /employeur/offres/[id]/modifier
2. System loads current job data
3. System checks:
   a. Employer owns this job
   b. Job is in editable state (DRAFT, PENDING, PUBLISHED, REJECTED)
   c. If job is CLOSED → cannot edit
4. Employer modifies fields
5. Employer clicks "Mettre à jour":
   a. If job was DRAFT → stays DRAFT (unless "Soumettre" clicked)
   b. If job was PUBLISHED and changes are minor (typo fix) → stays PUBLISHED
   c. If job was PUBLISHED and changes are significant (title, salary, description) → set to PENDING for re-moderation
   d. If job was REJECTED → can edit and resubmit (set to PENDING)
   e. If job was PENDING → update in place, stays PENDING
6. "Significant change" is determined by:
   a. Title changed
   b. Description changed by more than 20%
   c. Salary range changed
   d. Contract type changed
   e. Category changed
   f. Minor changes (skills list, small description edits) do NOT trigger re-moderation
```

### 3.3 Job Deactivation / Closing Flow

```
1. Employer clicks "Clôturer l'offre" on a published job
2. Confirmation dialog: "Êtes-vous sûr de vouloir clôturer cette offre ? Elle ne sera plus visible par les candidats."
3. Employer confirms
4. System:
   a. Sets job status to CLOSED
   b. Job removed from search results
   c. Existing applications remain accessible
   d. Job still visible in employer's dashboard (greyed out)
5. Employer can "Réactiver" a closed job:
   a. Job goes back to PENDING for re-moderation
   b. Deadline must be updated if expired
```

### 3.4 Job Status State Machine

```
                   ┌─────────┐
         create    │  DRAFT  │ ──── submit ────→ ┌─────────┐
         (save) ──→│         │                    │ PENDING │
                   └─────────┘                    └─────────┘
                        │                              │
                        │                    ┌─────────┤
                        │               admin│    admin│
                        │             approves│   rejects│
                        │                    ▼         ▼
                        │             ┌───────────┐ ┌──────────┐
                        │             │ PUBLISHED │ │ REJECTED │
                        │             └───────────┘ └──────────┘
                        │                  │              │
                        │        employer  │    edit +    │
                        │        closes    │   resubmit   │
                        │                  ▼              │
                        │             ┌────────┐          │
                        │             │ CLOSED │          │
                        │             └────────┘          │
                        │                  │              │
                        │        employer  │              │
                        │       reactivates│              │
                        │                  ▼              │
                        │             ┌─────────┐        │
                        └─────────────│ PENDING │←───────┘
                         (submit)     └─────────┘
```

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| S1 | Create and submit job | Employer is ACTIVE + VERIFIED | Fills form, clicks "Soumettre" | Job created (PENDING), admin notified, success message shown |
| S2 | Save as draft | Employer is ACTIVE + VERIFIED | Fills partial form, clicks "Enregistrer en brouillon" | Job saved (DRAFT), no moderation triggered, can edit later |
| S3 | Submit draft job | Employer has a DRAFT job | Opens draft, completes fields, clicks "Soumettre" | Job status changes to PENDING, enters moderation queue |
| S4 | Edit published job (minor) | Job is PUBLISHED | Fixes a typo in skills | Job stays PUBLISHED, no re-moderation |
| S5 | Edit published job (significant) | Job is PUBLISHED | Changes title and salary | Job set to PENDING for re-moderation, temporarily hidden from search |
| S6 | Edit rejected job and resubmit | Job is REJECTED | Employer fixes issues, resubmits | Job status changes to PENDING, re-enters moderation queue |
| S7 | Close a published job | Job is PUBLISHED | Clicks "Clôturer", confirms | Job status → CLOSED, removed from search, applications preserved |
| S8 | Reactivate a closed job | Job is CLOSED, deadline not expired | Clicks "Réactiver" | Job status → PENDING for re-moderation |
| S9 | Job with optional salary hidden | Employer does not fill salary | Submits without salary | Job published with "Salaire : À discuter" displayed to candidates |
| S10 | Job with all languages specified | Employer selects FR + EN + AR | Fills language requirements | Languages displayed on job listing |

### 4.2 Failure Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| F1 | Unverified employer tries to post | Company.isVerified = false | Navigates to /employeur/offres/nouvelle | Redirected to /employeur/verification-en-attente |
| F2 | Inactive employer tries to post | Company.status = INACTIVE | POST /api/employer/jobs | 403: "Votre compte doit être vérifié avant de publier des offres." |
| F3 | Title too short | Employer enters "Chef" | Submits | Error: "Le titre doit contenir entre 10 et 120 caractères." |
| F4 | Description too short | Employer writes 50 chars | Submits | Error: "La description doit contenir au moins 100 caractères." |
| F5 | Deadline in the past | Employer selects yesterday | Submits | Error: "La date limite doit être dans le futur (au moins 7 jours)." |
| F6 | Salary min > max | Employer enters 10000-5000 | Submits | Error: "Le salaire minimum ne peut pas dépasser le salaire maximum." |
| F7 | Edit someone else's job | Employer A tries to edit Employer B's job | PUT /api/employer/jobs/[id] | 403: "Vous n'avez pas accès à cette offre." |
| F8 | Edit a closed job | Job is CLOSED | PUT /api/employer/jobs/[id] | 403: "Cette offre est clôturée. Vous pouvez la réactiver pour la modifier." |
| F9 | Rate limit exceeded | 10+ jobs posted today | POST /api/employer/jobs | 429: "Vous avez atteint la limite de publications quotidiennes (10). Réessayez demain." |
| F10 | XSS in description | Employer injects `<script>` tags | Submits | Script tags stripped. Sanitized HTML saved. |
| F11 | Reactivate with expired deadline | Job CLOSED, deadline passed | Clicks "Réactiver" | Must update deadline before reactivation: "Veuillez mettre à jour la date limite avant de réactiver." |
| F12 | Submit draft with missing required fields | Draft has missing fields | Clicks "Soumettre" | Validation errors shown for missing fields |
| F13 | Description contains prohibited content | Description asks candidate to pay | Content screening flags it | Job still submitted as PENDING, but flagged for moderator attention with warning |

---

## 5. Data

### 5.1 Input — Job Posting Form Fields

| Field | Label (FR) | Type | Required | Validation Rules |
|-------|-----------|------|----------|-----------------|
| title | Titre du poste | string | Yes | Min 10, max 120 chars |
| jobCategory | Catégorie du poste | enum (select) | Yes | One of predefined categories |
| contractType | Type de contrat | enum (select) | Yes | One of predefined types |
| city | Ville | enum (select) | Yes | One of predefined Moroccan cities |
| description | Description du poste | string (rich text / HTML) | Yes | Min 100 chars (text content, not HTML). Tiptap editor. Allowed tags: p, h2, h3, strong, em, ul, ol, li, br |
| skills | Compétences requises | string[] (tag input) | Yes | At least 1 skill, max 15 skills, each max 50 chars |
| experienceLevel | Expérience requise | enum (select) | Yes | One of predefined levels |
| salaryMin | Salaire minimum (MAD/mois) | number | No | If provided: > 0, integer |
| salaryMax | Salaire maximum (MAD/mois) | number | No | If provided: >= salaryMin, integer |
| salaryType | Type de rémunération | enum | No | MONTHLY, DAILY, HOURLY (default: MONTHLY) |
| deadline | Date limite de candidature | date | Yes | Must be >= today + 7 days, max 90 days from now |
| languages | Langues requises | string[] (multi-select) | No | From: Français, Arabe, Anglais, Espagnol, Allemand, Italien, Chinois, Japonais, Russe, Portugais, Néerlandais |
| startDate | Date de début souhaitée | date | No | If provided: must be >= today |
| numberOfPositions | Nombre de postes | number | No | Default 1, min 1, max 100 |
| isRemote | Télétravail possible | boolean | No | Default false |
| benefits | Avantages | string[] (tag input) | No | Max 10 items, each max 100 chars. Examples: "Logement fourni", "Transport", "Repas" |

### 5.2 Enums

```prisma
enum JobCategory {
  RECEPTION          // Réception
  CUISINE            // Cuisine
  SERVICE            // Service en salle
  ANIMATION          // Animation
  GUIDE              // Guide touristique
  BIEN_ETRE          // Bien-être / Spa
  MANAGEMENT         // Management hôtelier
  MICE               // MICE / Événementiel
  TRANSPORT          // Transport touristique
  ENTRETIEN          // Entretien / Housekeeping
  COMMERCIAL         // Commercial / Ventes
  MARKETING          // Marketing / Communication
  ADMINISTRATIF      // Administratif
  SECURITE           // Sécurité
  AUTRE              // Autre
}

enum ContractType {
  CDI                // Contrat à durée indéterminée
  CDD                // Contrat à durée déterminée
  SAISONNIER         // Contrat saisonnier
  STAGE              // Stage
  FREELANCE          // Freelance / Mission
  ALTERNANCE         // Alternance
}

enum ExperienceLevel {
  DEBUTANT           // Débutant (0-1 an)
  JUNIOR             // Junior (1-3 ans)
  INTERMEDIAIRE      // Intermédiaire (3-5 ans)
  SENIOR             // Senior (5-10 ans)
  EXPERT             // Expert (10+ ans)
  NON_SPECIFIE       // Non spécifié
}

enum JobStatus {
  DRAFT              // Brouillon
  PENDING            // En attente de modération
  PUBLISHED          // Publiée
  REJECTED           // Rejetée
  CLOSED             // Clôturée
}

enum SalaryType {
  MONTHLY            // Par mois
  DAILY              // Par jour
  HOURLY             // Par heure
}
```

### 5.3 Output — Job Record (Prisma Model)

```typescript
{
  id: string;                     // cuid
  companyId: string;              // FK to Company
  title: string;
  slug: string;                   // Auto-generated from title + id prefix for URL
  jobCategory: JobCategory;
  contractType: ContractType;
  city: City;
  description: string;            // Sanitized HTML from Tiptap
  descriptionText: string;        // Plain text version for search indexing
  skills: string[];               // Array of skill strings
  experienceLevel: ExperienceLevel;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryType: SalaryType;         // Default MONTHLY
  deadline: DateTime;
  languages: string[];
  startDate: DateTime | null;
  numberOfPositions: number;      // Default 1
  isRemote: boolean;              // Default false
  benefits: string[];
  status: JobStatus;              // Default DRAFT or PENDING
  publishedAt: DateTime | null;   // Set when admin approves
  closedAt: DateTime | null;      // Set when employer closes
  viewCount: number;              // Default 0
  applicationCount: number;       // Default 0, denormalized counter
  moderationNote: string | null;  // Rejection reason from admin
  isFlagged: boolean;             // Default false, set by content screening
  flagReason: string | null;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 5.4 Email Templates

| Email | Recipient | Subject (FR) | Trigger |
|-------|-----------|-------------|---------|
| job-submitted | Employer | Votre offre "{title}" a été soumise pour validation | Job submitted (PENDING) |
| job-approved | Employer | Votre offre "{title}" est maintenant publiée | Admin approves job |
| job-rejected | Employer | Votre offre "{title}" nécessite des modifications | Admin rejects job |
| job-resubmitted | Employer | Votre offre "{title}" a été resoumise pour validation | Edited + resubmitted |
| admin-new-job | Admin | Nouvelle offre à modérer : "{title}" par {companyName} | Job submitted for moderation |

---

## 6. UI Components

### 6.1 Page: Job Creation Form — `/employeur/offres/nouvelle`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Retour au tableau de bord                                 │
│                                                               │
│  Publier une nouvelle offre d'emploi                         │
│                                                               │
│  ┌─── Informations principales ────────────────────────┐    │
│  │                                                       │    │
│  │  Titre du poste *                                    │    │
│  │  [Réceptionniste bilingue FR/EN________________]     │    │
│  │  (10-120 caractères)                                  │    │
│  │                                                       │    │
│  │  Catégorie du poste *                                │    │
│  │  [▼ Réception_____________________________]          │    │
│  │                                                       │    │
│  │  Type de contrat *                                   │    │
│  │  [▼ CDI________________________________]             │    │
│  │                                                       │    │
│  │  Ville *                                             │    │
│  │  [▼ Marrakech___________________________]            │    │
│  │                                                       │    │
│  │  Nombre de postes                                    │    │
│  │  [1_____]                                            │    │
│  │                                                       │    │
│  │  ☐ Télétravail possible                              │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Description du poste * ──────────────────────────┐    │
│  │  ┌────────────────────────────────────────────────┐  │    │
│  │  │ B  I  H2  H3  •  1.  ─                        │  │    │
│  │  ├────────────────────────────────────────────────┤  │    │
│  │  │                                                 │  │    │
│  │  │ Nous recherchons un(e) réceptionniste           │  │    │
│  │  │ bilingue pour notre riad situé en plein         │  │    │
│  │  │ coeur de la médina de Marrakech.                │  │    │
│  │  │                                                 │  │    │
│  │  │ Missions principales :                          │  │    │
│  │  │ • Accueil des clients internationaux            │  │    │
│  │  │ • Gestion des réservations                      │  │    │
│  │  │ • ...                                           │  │    │
│  │  │                                                 │  │    │
│  │  └────────────────────────────────────────────────┘  │    │
│  │  (minimum 100 caractères)                             │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Profil recherché ────────────────────────────────┐    │
│  │                                                       │    │
│  │  Compétences requises *                              │    │
│  │  [Accueil client ×] [Réservation ×] [+ Ajouter]    │    │
│  │                                                       │    │
│  │  Expérience requise *                                │    │
│  │  [▼ Junior (1-3 ans)______________________]         │    │
│  │                                                       │    │
│  │  Langues requises                                    │    │
│  │  [☑ Français] [☑ Anglais] [☐ Arabe]                │    │
│  │  [☐ Espagnol] [☐ Allemand] [☐ Italien] ...         │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Rémunération et avantages ──────────────────────┐    │
│  │                                                       │    │
│  │  Fourchette salariale (optionnel)                    │    │
│  │  Type : [▼ Par mois (MAD)]                          │    │
│  │  De [5000____] à [7000____] MAD                     │    │
│  │                                                       │    │
│  │  Avantages (optionnel)                               │    │
│  │  [Logement fourni ×] [Repas ×] [+ Ajouter]         │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Dates ───────────────────────────────────────────┐    │
│  │                                                       │    │
│  │  Date limite de candidature *                        │    │
│  │  [📅 30/04/2026_________________________]           │    │
│  │  (7 à 90 jours à partir d'aujourd'hui)               │    │
│  │                                                       │    │
│  │  Date de début souhaitée (optionnel)                 │    │
│  │  [📅 15/05/2026_________________________]           │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Aperçu ──────────────────────────────────────────┐    │
│  │  [  Voir l'aperçu de l'offre  ]                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  [ Enregistrer en brouillon ]  [ Soumettre pour publication ]│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Page: Job Edit Form — `/employeur/offres/[id]/modifier`

Same layout as creation form, pre-filled with existing data. Additional elements:

```
┌──────────────────────────────────────────────────────────┐
│  ⚠ Modifier une offre publiée                            │
│  Les modifications significatives (titre, description,    │
│  salaire) entraîneront une re-modération de l'offre.     │
│  L'offre sera temporairement masquée pendant la revue.   │
└──────────────────────────────────────────────────────────┘
```

If job was REJECTED:
```
┌──────────────────────────────────────────────────────────┐
│  ❌ Offre rejetée - Motif :                              │
│  "La description du poste ne contient pas assez de       │
│   détails sur les missions et responsabilités."          │
│                                                           │
│  Veuillez corriger les points mentionnés et resoumettre. │
└──────────────────────────────────────────────────────────┘
```

### 6.3 Component: Job Preview Modal

```
┌─────────────────────────────────────────────────────────────┐
│  Aperçu de votre offre (telle que vue par les candidats)     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🏢 Riad Atlas Marrakech  ✓ Entreprise vérifiée     │    │
│  │  Hôtellerie | Marrakech                              │    │
│  │                                                       │    │
│  │  Réceptionniste bilingue FR/EN                       │    │
│  │  CDI | Marrakech | Publié le 01/04/2026              │    │
│  │                                                       │    │
│  │  5 000 - 7 000 MAD / mois                            │    │
│  │                                                       │    │
│  │  Nous recherchons un(e) réceptionniste bilingue...   │    │
│  │                                                       │    │
│  │  Compétences : Accueil client, Réservation           │    │
│  │  Expérience : Junior (1-3 ans)                       │    │
│  │  Langues : Français, Anglais                         │    │
│  │  Avantages : Logement fourni, Repas                  │    │
│  │                                                       │    │
│  │  Date limite : 30/04/2026                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  [  Fermer l'aperçu  ]                                       │
└─────────────────────────────────────────────────────────────┘
```

### 6.4 Component Tree

```
JobPostingPage (app/employeur/offres/nouvelle/page.tsx)
├── PageHeader ("Publier une nouvelle offre d'emploi")
├── JobPostingForm (components/employer/job-posting-form.tsx)
│   ├── SectionCard ("Informations principales")
│   │   ├── FormField (title) — TextInput with char counter
│   │   ├── FormField (jobCategory) — Select
│   │   ├── FormField (contractType) — Select
│   │   ├── FormField (city) — Select
│   │   ├── FormField (numberOfPositions) — NumberInput
│   │   └── FormField (isRemote) — Checkbox
│   ├── SectionCard ("Description du poste")
│   │   └── TiptapEditor (description)
│   │       ├── Toolbar (Bold, Italic, H2, H3, BulletList, OrderedList, HorizontalRule)
│   │       └── EditorContent
│   ├── SectionCard ("Profil recherché")
│   │   ├── FormField (skills) — TagInput
│   │   ├── FormField (experienceLevel) — Select
│   │   └── FormField (languages) — MultiCheckbox
│   ├── SectionCard ("Rémunération et avantages")
│   │   ├── FormField (salaryType) — Select
│   │   ├── FormField (salaryMin) — NumberInput
│   │   ├── FormField (salaryMax) — NumberInput
│   │   └── FormField (benefits) — TagInput
│   ├── SectionCard ("Dates")
│   │   ├── FormField (deadline) — DatePicker
│   │   └── FormField (startDate) — DatePicker
│   ├── PreviewButton → opens JobPreviewModal
│   └── ActionButtons
│       ├── SaveDraftButton ("Enregistrer en brouillon")
│       └── SubmitButton ("Soumettre pour publication")
├── JobPreviewModal
│   ├── CompanyHeader (with VerifiedBadge)
│   ├── JobTitle
│   ├── JobMetadata (contract, city, date)
│   ├── SalaryDisplay
│   ├── DescriptionContent (rendered HTML)
│   ├── SkillsList
│   ├── ExperienceDisplay
│   ├── LanguagesList
│   ├── BenefitsList
│   └── DeadlineDisplay
├── RejectionBanner (if editing a REJECTED job)
├── ResubmissionWarningBanner (if editing a PUBLISHED job)
└── LoadingOverlay
```

---

## 7. API Endpoints

### 7.1 POST `/api/employer/jobs`

**Description:** Create a new job listing.

**Auth:** Requires Supabase session with role EMPLOYER. Company must be ACTIVE and verified.

**Request Body:**
```typescript
interface CreateJobRequest {
  title: string;
  jobCategory: JobCategory;
  contractType: ContractType;
  city: City;
  description: string;             // HTML from Tiptap
  skills: string[];
  experienceLevel: ExperienceLevel;
  salaryMin?: number;
  salaryMax?: number;
  salaryType?: SalaryType;         // Default MONTHLY
  deadline: string;                // ISO date
  languages?: string[];
  startDate?: string;              // ISO date
  numberOfPositions?: number;      // Default 1
  isRemote?: boolean;              // Default false
  benefits?: string[];
  status: "DRAFT" | "PENDING";    // Employer chooses save or submit
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "message": "Votre offre a été soumise pour validation.",
  "data": {
    "jobId": "clxyz...",
    "slug": "receptionniste-bilingue-fr-en-clxyz",
    "status": "PENDING",
    "createdAt": "2026-04-01T10:00:00Z"
  }
}
```

**Response — 403 Forbidden:**
```json
{
  "success": false,
  "message": "Votre compte doit être vérifié avant de publier des offres."
}
```

**Response — 422 Unprocessable Entity:**
```json
{
  "success": false,
  "message": "Erreurs de validation.",
  "errors": {
    "title": "Le titre doit contenir entre 10 et 120 caractères.",
    "description": "La description doit contenir au moins 100 caractères.",
    "deadline": "La date limite doit être dans le futur (au moins 7 jours)."
  }
}
```

**Response — 429 Too Many Requests:**
```json
{
  "success": false,
  "message": "Vous avez atteint la limite de publications quotidiennes (10). Réessayez demain."
}
```

**Server-side Logic:**
```
function createJob(body, employerUser):
  // 1. Check employer status
  company = await getCompanyByUserId(employerUser.id)
  if !company || company.status !== "ACTIVE" || !company.isVerified:
    throw 403

  // 2. Check daily rate limit
  todayJobCount = await prisma.job.count({
    where: { companyId: company.id, createdAt: { gte: startOfDay() } }
  })
  if todayJobCount >= 10: throw 429

  // 3. Validate fields
  validate(body) → throw 422 on failure

  // 4. Sanitize description HTML
  sanitizedDescription = sanitizeHtml(body.description, {
    allowedTags: ['p', 'h2', 'h3', 'strong', 'em', 'ul', 'ol', 'li', 'br']
  })
  plainTextDescription = stripHtml(sanitizedDescription)

  // 5. Content screening
  isFlagged = await screenContent(body.title, plainTextDescription)

  // 6. Generate slug
  slug = slugify(body.title) + '-' + generateShortId()

  // 7. Create job record
  job = await prisma.job.create({
    data: {
      companyId: company.id,
      title: body.title,
      slug: slug,
      jobCategory: body.jobCategory,
      contractType: body.contractType,
      city: body.city,
      description: sanitizedDescription,
      descriptionText: plainTextDescription,
      skills: body.skills,
      experienceLevel: body.experienceLevel,
      salaryMin: body.salaryMin || null,
      salaryMax: body.salaryMax || null,
      salaryType: body.salaryType || "MONTHLY",
      deadline: new Date(body.deadline),
      languages: body.languages || [],
      startDate: body.startDate ? new Date(body.startDate) : null,
      numberOfPositions: body.numberOfPositions || 1,
      isRemote: body.isRemote || false,
      benefits: body.benefits || [],
      status: body.status,
      isFlagged: isFlagged,
      flagReason: isFlagged ? "Contenu potentiellement problématique détecté" : null
    }
  })

  // 8. Notifications (only if PENDING)
  if body.status === "PENDING":
    await sendEmail("job-submitted", company.email, { title: body.title })
    await sendEmail("admin-new-job", ADMIN_EMAIL, {
      title: body.title,
      companyName: company.companyName,
      isFlagged: isFlagged
    })

  return 201
```

### 7.2 PUT `/api/employer/jobs/[id]`

**Description:** Update an existing job listing.

**Auth:** Requires Supabase session with role EMPLOYER. Must own the job.

**Request Body:** Same as CreateJobRequest (all fields optional, only changed fields sent).

**Response — 200 OK:**
```json
{
  "success": true,
  "message": "Offre mise à jour avec succès.",
  "data": {
    "jobId": "clxyz...",
    "status": "PENDING",
    "requiresRemoderation": true,
    "message": "Les modifications significatives entraînent une re-modération."
  }
}
```

**Significant Change Detection Logic:**
```
function isSignificantChange(oldJob, newFields):
  if newFields.title && newFields.title !== oldJob.title: return true
  if newFields.salaryMin !== undefined && newFields.salaryMin !== oldJob.salaryMin: return true
  if newFields.salaryMax !== undefined && newFields.salaryMax !== oldJob.salaryMax: return true
  if newFields.contractType && newFields.contractType !== oldJob.contractType: return true
  if newFields.jobCategory && newFields.jobCategory !== oldJob.jobCategory: return true
  if newFields.description:
    similarity = calculateTextSimilarity(stripHtml(oldJob.description), stripHtml(newFields.description))
    if similarity < 0.8: return true  // More than 20% changed
  return false
```

### 7.3 GET `/api/employer/jobs`

**Description:** List all jobs for the authenticated employer.

**Auth:** Requires Supabase session with role EMPLOYER.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| status | string | "ALL" | Filter: DRAFT, PENDING, PUBLISHED, REJECTED, CLOSED, ALL |
| page | number | 1 | Page number |
| limit | number | 20 | Items per page |
| sort | string | "createdAt" | Sort field: createdAt, deadline, applicationCount |
| order | string | "desc" | Sort order |

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "clxyz...",
        "title": "Réceptionniste bilingue FR/EN",
        "slug": "receptionniste-bilingue-fr-en-clxyz",
        "jobCategory": "RECEPTION",
        "contractType": "CDI",
        "city": "MARRAKECH",
        "status": "PUBLISHED",
        "publishedAt": "2026-04-01T12:00:00Z",
        "deadline": "2026-04-30T23:59:59Z",
        "viewCount": 145,
        "applicationCount": 12,
        "createdAt": "2026-04-01T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

### 7.4 PATCH `/api/employer/jobs/[id]/status`

**Description:** Change job status (close, reactivate).

**Auth:** Requires Supabase session with role EMPLOYER. Must own the job.

**Request Body:**
```typescript
{
  action: "CLOSE" | "REACTIVATE";
  newDeadline?: string;   // Required for REACTIVATE if deadline expired
}
```

**Response — 200 OK:**
```json
{
  "success": true,
  "message": "L'offre a été clôturée avec succès.",
  "data": {
    "jobId": "clxyz...",
    "status": "CLOSED"
  }
}
```

### 7.5 GET `/api/employer/jobs/[id]`

**Description:** Get full details of a specific job (for editing or viewing).

**Auth:** Requires Supabase session with role EMPLOYER. Must own the job.

**Response — 200 OK:** Full job object with all fields.

---

## 8. Edge Cases & Technical Notes

1. **Tiptap editor sanitization:** All HTML from Tiptap must be sanitized server-side using a strict allowlist of tags. Never trust client-submitted HTML. Store both the sanitized HTML (for display) and a plain text version (for search indexing and content screening).

2. **Slug uniqueness:** The slug is generated from the title + a short unique ID suffix. If a slug collision somehow occurs, append an incrementing number.

3. **Deadline auto-closing:** Implement a scheduled job (cron or Supabase Edge Function) that runs daily to automatically close jobs whose deadline has passed. Set status to CLOSED and `closedAt` to the deadline date.

4. **Re-moderation during edit:** When a published job is edited with significant changes, it should be temporarily hidden from search results (status PENDING). Communicate this clearly to the employer before they submit the edit.

5. **Draft expiration:** Consider expiring drafts after 30 days of inactivity. Send a reminder email at 25 days.

6. **Content screening keywords:** Maintain a list of red-flag phrases (in French and Arabic) such as: "frais de dossier", "payer pour postuler", "envoyer de l'argent", "avance de frais". These flag the job for priority moderator attention but do not block submission.

7. **Image uploads in description:** The Tiptap editor should NOT allow image uploads in the job description to prevent misuse. Only text formatting is permitted.

8. **Concurrent edit handling:** If the employer has the edit form open in multiple tabs, use optimistic locking (check `updatedAt` on save). If the job was modified since the form was loaded, show a conflict message.

9. **SEO considerations:** Published jobs should have proper meta tags, structured data (JobPosting schema.org), and clean URLs using the slug.

10. **Salary display logic:** If only salaryMin is provided, show "A partir de X MAD/mois". If only salaryMax, show "Jusqu'a X MAD/mois". If both, show "X - Y MAD/mois". If neither, show "Salaire : A discuter".
