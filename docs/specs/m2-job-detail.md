# Feature Spec: Job Detail Page

**Module:** 2B -- Candidate Side
**Feature:** Page de detail d'une offre d'emploi
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Present the full details of a job listing to a candidate in a clear, structured layout that enables informed decision-making and easy application. The page also serves as a gateway to the company profile, similar job discovery, and a reporting mechanism for suspicious listings. The page must be SEO-optimized with structured data (JSON-LD) for search engine indexing.

---

## 2. User Stories Covered

| ID | Story | Priority |
|----|-------|----------|
| US-2.12 | En tant que candidat, je peux consulter le detail complet d'une offre d'emploi (description, competences, salaire, informations sur l'entreprise) afin de decider si je souhaite postuler. | Must |
| US-2.18 | En tant que candidat, je peux voir le profil verifie de l'entreprise qui publie l'offre afin de m'assurer de sa legitimite. | Should |
| US-2.19 | En tant que candidat, je peux signaler une offre suspecte afin de contribuer a la qualite de la plateforme. | Should |

---

## 3. System Flow

### 3.1 Page Load

1. Candidate navigates to `/offres/:slug` (e.g., `/offres/receptionniste-hotel-marrakech-abc123`).
2. The frontend (Next.js) performs server-side rendering:
   a. Calls `GET /api/jobs/:slug` to fetch job data.
   b. Calls `GET /api/jobs/:id/similar` to fetch similar jobs.
3. The page renders with full job details, company info sidebar, and similar jobs section.
4. JSON-LD structured data (`JobPosting` schema) is injected into the `<head>`.
5. Meta tags (`og:title`, `og:description`, `og:image`) are set for social sharing.

### 3.2 Viewing Job Details

1. The main content area displays:
   - Job title (h1)
   - Company name with verified badge (if applicable), linked to company profile
   - Location (city + region)
   - Contract type badge
   - Publication date (absolute: "Publiee le 28 mars 2026" + relative: "il y a 4 jours")
   - Salary range (if provided; otherwise "Non communique")
   - Full job description (rich text / markdown rendered as HTML)
   - Required skills (tag list)
   - Required experience level
   - Required languages
   - Benefits / advantages (if provided)

### 3.3 Company Info Sidebar

1. A sidebar panel (or card on mobile) displays:
   - Company logo
   - Company name
   - Verified badge with tooltip: "Cette entreprise a ete verifiee par SiyahaMag"
   - Short company description (first 200 characters)
   - City / location
   - Number of active job listings from this company
   - Link: "Voir le profil de l'entreprise" -> `/entreprises/:slug`

### 3.4 Apply Action

1. A prominent "Postuler" button is displayed:
   - On desktop: sticky in the sidebar, always visible.
   - On mobile: fixed at the bottom of the viewport.
2. Clicking "Postuler" navigates to the application flow (see `m2-application-flow.md`).
3. If the candidate has already applied to this job, the button changes to "Deja postule" (disabled, gray).

### 3.5 Similar Jobs Section

1. Below the main content, a section titled "Offres similaires" displays up to 6 related jobs.
2. Matching criteria (in priority order):
   a. Same `jobCategory` AND same `city` (best match)
   b. Same `jobCategory` in any city
   c. Same `city` in any category
3. Each similar job is displayed as a compact card (title, company, city, contract type).
4. If no similar jobs exist, the section is hidden.

### 3.6 Report Suspicious Listing

1. A "Signaler cette offre" link (with flag icon) is displayed below the job description.
2. Clicking opens a modal with:
   - Reason selection (radio buttons):
     - "Offre frauduleuse ou arnaque"
     - "Contenu inapproprie ou discriminatoire"
     - "Informations incorrectes ou trompeuses"
     - "Offre en double"
     - "Autre"
   - Optional comment textarea (max 500 characters)
   - "Envoyer le signalement" button
3. On submission, a `POST /api/reports` request is sent.
4. Confirmation message: "Merci pour votre signalement. Notre equipe va examiner cette offre."
5. The report is stored in the `reports` table for admin review (Module 3).

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| S1 | Candidate navigates to a valid job detail page | Full job details, company info, and similar jobs render correctly. JSON-LD is present in the page source. |
| S2 | Candidate clicks "Postuler" | Redirected to `/offres/:slug/postuler` application flow. |
| S3 | Candidate clicks "Voir le profil de l'entreprise" | Navigates to the company profile page `/entreprises/:slug`. |
| S4 | Candidate submits a report with reason "Offre frauduleuse" | Report is saved. Success toast displayed. "Signaler" link changes to "Signalement envoye". |
| S5 | Candidate who already applied visits the page | "Postuler" button shows "Deja postule" and is disabled. |
| S6 | Search engine crawls the page | JSON-LD `JobPosting` schema is parsed. OG meta tags provide preview content. |
| S7 | Candidate shares the URL on social media | Preview shows job title, company, and description excerpt via OG tags. |

### 4.2 Failure / Edge Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| F1 | Job slug does not exist | `404` page: "Cette offre n'existe plus ou a ete supprimee." with link back to search. |
| F2 | Job exists but has been deactivated/expired | `410 Gone` page: "Cette offre n'est plus disponible." with "Offres similaires" suggestions. |
| F3 | Company has no logo | Default placeholder avatar is displayed. |
| F4 | Salary is not provided | Display "Salaire : Non communique" instead of blank. |
| F5 | Candidate submits report without selecting a reason | Inline validation: "Veuillez selectionner un motif de signalement." |
| F6 | Candidate tries to report same job twice | API returns 409. Message: "Vous avez deja signale cette offre." |
| F7 | API call fails during page load | Server returns a generic error page with retry option. |

---

## 5. Data

### 5.1 Input (Page Request)

| Parameter | Type | Source | Description |
|-----------|------|--------|-------------|
| `slug` | string | URL path | Unique job listing slug |

### 5.2 Output (Job Detail Response)

```json
{
  "id": "uuid",
  "slug": "receptionniste-hotel-marrakech-abc123",
  "title": "Receptionniste Hotel 5 etoiles",
  "description": "<p>Nous recherchons un(e) receptionniste experimente(e)...</p>",
  "jobCategory": "reception",
  "contractType": "CDI",
  "city": "Marrakech",
  "region": "Marrakech-Safi",
  "salaryMin": 5000,
  "salaryMax": 7000,
  "salaryCurrency": "MAD",
  "salaryPeriod": "month",
  "skills": ["Accueil client", "Opera PMS", "Anglais courant", "Francais courant"],
  "experienceLevel": "2-5 ans",
  "languages": ["Francais", "Anglais", "Arabe"],
  "benefits": ["Logement fourni", "Repas inclus", "Assurance maladie"],
  "publishedAt": "2026-03-28T10:30:00Z",
  "expiresAt": "2026-04-28T10:30:00Z",
  "isActive": true,
  "company": {
    "id": "uuid",
    "slug": "hotel-atlas-prestige",
    "name": "Hotel Atlas Prestige",
    "logoUrl": "https://storage.siyahamag.com/logos/hotel-atlas.webp",
    "isVerified": true,
    "description": "Hotel 5 etoiles situe au coeur de Marrakech, offrant une experience de luxe...",
    "city": "Marrakech",
    "activeJobCount": 3
  },
  "hasApplied": false,
  "similarJobs": [
    {
      "id": "uuid",
      "slug": "receptionniste-riad-marrakech-def456",
      "title": "Receptionniste Riad de charme",
      "company": {
        "name": "Riad Jardin Secret",
        "isVerified": false
      },
      "city": "Marrakech",
      "contractType": "CDD",
      "publishedAt": "2026-03-25T08:00:00Z"
    }
  ]
}
```

### 5.3 Report Input

```json
{
  "jobId": "uuid",
  "reason": "fraudulent",
  "comment": "Le numero de telephone renvoie vers un service payant."
}
```

**Reason enum values:**
- `fraudulent` -- "Offre frauduleuse ou arnaque"
- `inappropriate` -- "Contenu inapproprie ou discriminatoire"
- `misleading` -- "Informations incorrectes ou trompeuses"
- `duplicate` -- "Offre en double"
- `other` -- "Autre"

### 5.4 Database Tables (Relevant)

```sql
-- reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  reporter_email VARCHAR(255),
  reporter_user_id UUID REFERENCES users(id),
  reason VARCHAR(50) NOT NULL CHECK (reason IN ('fraudulent','inappropriate','misleading','duplicate','other')),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed','action_taken')),
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  UNIQUE(job_id, reporter_email),
  UNIQUE(job_id, reporter_user_id)
);
```

---

## 6. UI Components

### 6.1 Component Tree

```
JobDetailPage
├── BreadcrumbNav                -- Accueil > Offres > {title}
├── JobHeader
│   ├── JobTitle                 -- h1
│   ├── CompanyLink              -- Company name + verified badge
│   ├── MetaBadges
│   │   ├── LocationBadge        -- City, Region
│   │   ├── ContractBadge        -- Color-coded pill
│   │   └── DateLabel            -- "Publiee le..." + relative
│   └── SalaryDisplay            -- Range or "Non communique"
├── MainContent (two-column on desktop)
│   ├── LeftColumn
│   │   ├── JobDescription       -- Rich text rendered HTML
│   │   ├── SkillsTags           -- Tag pills
│   │   ├── ExperienceLevel      -- Text
│   │   ├── LanguagesList        -- Text list
│   │   ├── BenefitsList         -- Bullet list
│   │   └── ReportLink           -- "Signaler cette offre"
│   └── RightColumn (sidebar)
│       ├── ApplyButton          -- "Postuler" (sticky)
│       └── CompanyCard
│           ├── CompanyLogo
│           ├── CompanyName      -- + verified badge
│           ├── CompanyDescription
│           ├── CompanyLocation
│           ├── ActiveJobCount
│           └── CompanyProfileLink
├── SimilarJobsSection
│   ├── SectionTitle             -- "Offres similaires"
│   └── SimilarJobCard (x6 max)
│       ├── JobTitle
│       ├── CompanyName
│       ├── CityLabel
│       └── ContractBadge
└── ReportModal (hidden by default)
    ├── ModalTitle               -- "Signaler cette offre"
    ├── ReasonRadioGroup
    ├── CommentTextarea
    ├── SubmitButton             -- "Envoyer le signalement"
    └── CancelButton             -- "Annuler"
```

### 6.2 Key UI Labels (French)

| Element | Text |
|---------|------|
| Breadcrumb home | "Accueil" |
| Breadcrumb jobs | "Offres" |
| Salary label | "Salaire" |
| Salary unknown | "Non communique" |
| Salary format | "{min} - {max} MAD / mois" |
| Skills heading | "Competences requises" |
| Experience heading | "Experience" |
| Languages heading | "Langues" |
| Benefits heading | "Avantages" |
| Apply button | "Postuler" |
| Already applied | "Deja postule" |
| Company card heading | "A propos de l'entreprise" |
| Company profile link | "Voir le profil de l'entreprise" |
| Active jobs count | "{count} offre(s) active(s)" |
| Similar jobs heading | "Offres similaires" |
| Report link | "Signaler cette offre" |
| Report modal title | "Signaler cette offre" |
| Report submit | "Envoyer le signalement" |
| Report cancel | "Annuler" |
| Report success | "Merci pour votre signalement. Notre equipe va examiner cette offre." |
| Verified tooltip | "Cette entreprise a ete verifiee par SiyahaMag" |
| Expired notice | "Cette offre n'est plus disponible." |

### 6.3 Responsive Behavior

- **Desktop (>=1024px):** Two-column layout. Left column: job details. Right column: sticky sidebar with apply button and company card.
- **Tablet (768px-1023px):** Single column. Company card moves below the job description. Apply button remains sticky at top.
- **Mobile (<768px):** Single column. Apply button fixed at viewport bottom (floating bar). Similar jobs displayed as horizontal scroll cards.

---

## 7. API Endpoints

### 7.1 Get Job Detail

```
GET /api/jobs/:slug
```

**Authentication:** None required (public endpoint). If an authenticated user makes the request, `hasApplied` is populated based on their application history.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Unique job listing slug |

**Response:** `200 OK` with body as described in Section 5.2.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 404 | Job slug not found | `{ "error": "NOT_FOUND", "message": "Cette offre n'existe pas." }` |
| 410 | Job exists but is deactivated/expired | `{ "error": "GONE", "message": "Cette offre n'est plus disponible.", "similarJobs": [...] }` |

**Caching:** CDN-cached for 5 minutes. Cache is invalidated when the job is updated or deactivated.

### 7.2 Get Similar Jobs

```
GET /api/jobs/:id/similar
```

**Authentication:** None required.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | `6` | Max similar jobs to return |

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "uuid",
      "slug": "receptionniste-riad-marrakech-def456",
      "title": "Receptionniste Riad de charme",
      "company": {
        "name": "Riad Jardin Secret",
        "isVerified": false
      },
      "city": "Marrakech",
      "contractType": "CDD",
      "publishedAt": "2026-03-25T08:00:00Z"
    }
  ]
}
```

**Matching Logic (SQL):**

```sql
SELECT j.* FROM jobs j
WHERE j.id != :currentJobId
  AND j.is_active = true
  AND j.expires_at > now()
ORDER BY
  CASE
    WHEN j.job_category = :currentCategory AND j.city = :currentCity THEN 1
    WHEN j.job_category = :currentCategory THEN 2
    WHEN j.city = :currentCity THEN 3
    ELSE 4
  END,
  j.published_at DESC
LIMIT :limit;
```

### 7.3 Report a Job Listing

```
POST /api/reports
```

**Authentication:** Optional. If authenticated, `reporter_user_id` is set. If anonymous, `reporter_email` must be provided.

**Request Body:**

```json
{
  "jobId": "uuid",
  "reason": "fraudulent",
  "comment": "Optional additional details",
  "reporterEmail": "user@example.com"
}
```

**Validation Rules:**

| Field | Rule |
|-------|------|
| `jobId` | Required. Must reference an existing job. |
| `reason` | Required. Must be one of: `fraudulent`, `inappropriate`, `misleading`, `duplicate`, `other`. |
| `comment` | Optional. Max 500 characters. |
| `reporterEmail` | Required if user is not authenticated. Valid email format. |

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "message": "Signalement enregistre avec succes."
}
```

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Missing or invalid fields | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 404 | Job not found | `{ "error": "NOT_FOUND", "message": "L'offre n'existe pas." }` |
| 409 | User already reported this job | `{ "error": "ALREADY_REPORTED", "message": "Vous avez deja signale cette offre." }` |

**Rate Limiting:** 5 reports per hour per IP (to prevent abuse).

---

## 8. SEO: JSON-LD Structured Data

The following JSON-LD schema is injected into the page `<head>` for each job detail page:

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Receptionniste Hotel 5 etoiles",
  "description": "Nous recherchons un(e) receptionniste experimente(e)...",
  "datePosted": "2026-03-28",
  "validThrough": "2026-04-28",
  "employmentType": "FULL_TIME",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "Hotel Atlas Prestige",
    "sameAs": "https://siyahamag.com/entreprises/hotel-atlas-prestige",
    "logo": "https://storage.siyahamag.com/logos/hotel-atlas.webp"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Marrakech",
      "addressRegion": "Marrakech-Safi",
      "addressCountry": "MA"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "MAD",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 5000,
      "maxValue": 7000,
      "unitText": "MONTH"
    }
  },
  "industry": "Tourism & Hospitality",
  "skills": "Accueil client, Opera PMS, Anglais courant"
}
```

**Contract type to `employmentType` mapping:**

| Contract Type | Schema.org Value |
|--------------|------------------|
| CDI | `FULL_TIME` |
| CDD | `TEMPORARY` |
| Saisonnier | `TEMPORARY` + custom note |
| Stage | `INTERN` |
| Freelance | `CONTRACTOR` |

---

## 9. Technical Notes

- **Server-Side Rendering:** The job detail page must be SSR'd for SEO. Use Next.js `getServerSideProps` (or App Router equivalent) to fetch data on the server.
- **Slug generation:** Slugs are generated on job creation: `slugify(title) + '-' + shortId`. They are immutable once created.
- **Markdown rendering:** Job descriptions are stored as Markdown in the database and rendered to HTML on the frontend using a sanitized renderer (DOMPurify) to prevent XSS.
- **Image optimization:** Company logos are served via Supabase Storage with automatic WebP conversion and responsive sizing.
- **`hasApplied` check:** When an authenticated user loads the page, the backend checks the `applications` table for an existing record with the user's ID and the job ID.
