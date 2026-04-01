# Feature Spec: Application Flow

**Module:** 2B -- Candidate Side
**Feature:** Postuler a une offre d'emploi
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Enable candidates to apply to job listings with minimal friction. The platform supports two application paths: authenticated candidates who already have a saved CV, and anonymous candidates who can apply with just an email, a CV upload, and a motivation message. Both paths result in the application being delivered to the employer and a confirmation email sent to the candidate.

---

## 2. User Stories Covered

| ID | Story | Priority |
|----|-------|----------|
| US-2.13 | En tant que candidat connecte, je peux postuler a une offre en utilisant mon CV enregistre et en ajoutant un message de motivation afin de gagner du temps. | Must |
| US-2.14 | En tant que visiteur non inscrit, je peux postuler a une offre en fournissant mon email, un CV au format PDF et un message de motivation afin de ne pas etre oblige de creer un compte. | Must |

---

## 3. System Flow

### 3.1 Entry Point

1. Candidate clicks the "Postuler" button on the job detail page (`/offres/:slug`).
2. The system checks the candidate's authentication state.
3. Two paths diverge:
   - **Path A:** Authenticated candidate -> streamlined form.
   - **Path B:** Anonymous candidate -> full form with email and CV upload.

### 3.2 Path A -- Authenticated Candidate

1. The application form page (`/offres/:slug/postuler`) loads.
2. Pre-filled information is displayed (read-only):
   - Name: from user profile
   - Email: from user profile
   - CV: link to currently saved CV (with option to upload a different one)
3. Editable fields:
   - **Message de motivation** (textarea, required, 50-2000 characters)
   - **CV** (optional replacement upload -- PDF only, max 5MB)
4. Candidate writes the motivation message.
5. Candidate clicks "Envoyer ma candidature".
6. Frontend sends `POST /api/applications` with `{ jobId, message, cvFileId? }`.
7. Backend:
   a. Validates the request.
   b. Creates an `application` record with status `submitted`.
   c. If a new CV was uploaded, links it; otherwise uses the profile CV.
   d. Sends a confirmation email to the candidate via Resend.
   e. Sends a notification email to the employer via Resend.
8. Success page displays: "Votre candidature a ete envoyee avec succes !"
9. Candidate is redirected or shown options: "Retour aux offres" or "Voir mes candidatures".

### 3.3 Path B -- Anonymous Candidate

1. The application form page (`/offres/:slug/postuler`) loads.
2. Form fields:
   - **Nom complet** (text input, required, 2-100 characters)
   - **Adresse email** (email input, required, valid email format)
   - **CV** (file upload, required, PDF only, max 5MB)
   - **Message de motivation** (textarea, required, 50-2000 characters)
3. Candidate fills in all fields and uploads their CV.
4. Candidate clicks "Envoyer ma candidature".
5. Frontend:
   a. Uploads the CV file to Supabase Storage via `POST /api/upload/cv`.
   b. On upload success, sends `POST /api/applications/guest` with `{ jobId, name, email, cvFileId, message }`.
6. Backend:
   a. Validates the request.
   b. Creates an `application` record with status `submitted` and `is_guest = true`.
   c. Sends a confirmation email to the candidate via Resend.
   d. Sends a notification email to the employer via Resend.
   e. Includes in the confirmation email: "Creez votre compte pour suivre vos candidatures" (account creation CTA).
7. Success page displays: "Votre candidature a ete envoyee avec succes !"
8. Below the success message: "Creez un compte pour suivre l'avancement de votre candidature" with link to registration.

### 3.4 CV Upload Process

1. Candidate selects a PDF file via the file input.
2. Frontend validates:
   - File type: `application/pdf` only.
   - File size: max 5MB (5,242,880 bytes).
   - If validation fails, inline error is shown immediately (no API call).
3. On form submission, frontend uploads the file:
   - `POST /api/upload/cv` with `multipart/form-data`.
4. Backend:
   a. Re-validates file type and size server-side.
   b. Generates a unique filename: `cvs/{userId|guestId}/{timestamp}-{randomId}.pdf`.
   c. Uploads to Supabase Storage `cvs` bucket.
   d. Stores the file metadata in the `cv_files` table.
   e. Returns `{ fileId, fileUrl }`.
5. The `fileId` is then included in the application submission request.

### 3.5 Confirmation Email

**To candidate:**
- Subject: "Votre candidature pour {jobTitle} a ete envoyee"
- Body:
  - Greeting with candidate name
  - Confirmation that application was received
  - Job title and company name
  - Date of application
  - For guests: CTA to create an account
  - Footer with SiyahaMag branding

**To employer:**
- Subject: "Nouvelle candidature pour {jobTitle}"
- Body:
  - Notification of new application
  - Candidate name
  - Link to view the application in the employer dashboard
  - Footer with SiyahaMag branding

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| S1 | Authenticated candidate applies with saved CV and message | Application created. Confirmation email sent. "Deja postule" state saved. |
| S2 | Authenticated candidate replaces CV during application | New CV uploaded. Application uses the new CV. Profile CV remains unchanged. |
| S3 | Anonymous candidate applies with email, CV, and message | Application created as guest. Confirmation email includes account creation CTA. |
| S4 | Candidate views success page after applying | Success message displayed. Navigation options provided. |
| S5 | Employer receives notification | Email with candidate info and dashboard link is delivered. |

### 4.2 Failure / Edge Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| F1 | Authenticated candidate has no CV on profile and does not upload one | Inline error: "Veuillez telecharger votre CV pour postuler." |
| F2 | Candidate uploads a non-PDF file (e.g., .docx) | Inline error: "Seuls les fichiers PDF sont acceptes." File is rejected client-side. |
| F3 | Candidate uploads a PDF larger than 5MB | Inline error: "La taille du fichier ne doit pas depasser 5 Mo." File is rejected client-side. |
| F4 | Candidate submits with motivation message under 50 characters | Inline error: "Votre message de motivation doit contenir au moins 50 caracteres." |
| F5 | Candidate submits with motivation message over 2000 characters | Inline error: "Votre message de motivation ne doit pas depasser 2000 caracteres." Character count displayed below textarea. |
| F6 | Anonymous candidate enters invalid email format | Inline error: "Veuillez saisir une adresse email valide." |
| F7 | Authenticated candidate tries to apply to same job twice | API returns 409. Message: "Vous avez deja postule a cette offre." |
| F8 | Anonymous candidate uses same email for same job twice | API returns 409. Message: "Une candidature avec cette adresse email existe deja pour cette offre." |
| F9 | Job has been deactivated between page load and submission | API returns 410. Message: "Cette offre n'est plus disponible." |
| F10 | CV upload fails (Supabase Storage error) | Toast: "Le telechargement du CV a echoue. Veuillez reessayer." Retry button shown. |
| F11 | Email sending fails (Resend API error) | Application is still saved. Email is queued for retry. No error shown to the candidate. |
| F12 | Network error during submission | Toast: "Une erreur reseau est survenue. Veuillez verifier votre connexion et reessayer." |

---

## 5. Data

### 5.1 Input -- Authenticated Application

```json
{
  "jobId": "uuid",
  "message": "Madame, Monsieur, je me permets de vous soumettre ma candidature pour le poste de receptionniste...",
  "cvFileId": "uuid | null"
}
```

### 5.2 Input -- Guest Application

```json
{
  "jobId": "uuid",
  "name": "Ahmed Benali",
  "email": "ahmed.benali@email.com",
  "message": "Madame, Monsieur, je me permets de vous soumettre ma candidature pour le poste de receptionniste...",
  "cvFileId": "uuid"
}
```

### 5.3 Output -- Application Response

```json
{
  "id": "uuid",
  "status": "submitted",
  "jobTitle": "Receptionniste Hotel 5 etoiles",
  "companyName": "Hotel Atlas Prestige",
  "appliedAt": "2026-04-01T14:30:00Z",
  "message": "Votre candidature a ete envoyee avec succes !"
}
```

### 5.4 CV Upload Response

```json
{
  "fileId": "uuid",
  "fileName": "cv-ahmed-benali.pdf",
  "fileUrl": "https://storage.siyahamag.com/cvs/user123/1711979400-abc123.pdf",
  "fileSize": 245760,
  "uploadedAt": "2026-04-01T14:28:00Z"
}
```

### 5.5 Database Tables

```sql
-- applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  guest_name VARCHAR(100),
  guest_email VARCHAR(255),
  is_guest BOOLEAN DEFAULT false,
  cv_file_id UUID NOT NULL REFERENCES cv_files(id),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 50 AND 2000),
  status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted','viewed','shortlisted','interview','rejected','hired')),
  applied_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(job_id, user_id),
  UNIQUE(job_id, guest_email)
);

-- cv_files table
CREATE TABLE cv_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INTEGER NOT NULL CHECK (file_size <= 5242880),
  mime_type VARCHAR(50) NOT NULL CHECK (mime_type = 'application/pdf'),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Index for quick lookup of applications by user
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_guest_email ON applications(guest_email);
```

### 5.6 Supabase Storage Configuration

```
Bucket: cvs
  - Public: false (signed URLs required for access)
  - Max file size: 5MB
  - Allowed MIME types: application/pdf
  - Path pattern: cvs/{userId|guest-uuid}/{timestamp}-{randomId}.pdf
  - RLS policies:
    - Authenticated users can upload to their own folder
    - Employers can read CVs for applications to their jobs
    - Admins have full access
```

---

## 6. UI Components

### 6.1 Component Tree

```
ApplicationPage
├── ApplicationBreadcrumb       -- Accueil > Offres > {title} > Postuler
├── JobSummaryCard              -- Compact reminder of the job
│   ├── JobTitle
│   ├── CompanyName
│   ├── CityLabel
│   └── ContractBadge
├── ApplicationForm
│   ├── AuthenticatedSection (shown if logged in)
│   │   ├── ProfileInfoDisplay  -- Name, email (read-only)
│   │   ├── SavedCVDisplay      -- Link to current CV + "Changer" option
│   │   └── CVUploadField       -- Optional replacement upload
│   ├── GuestSection (shown if not logged in)
│   │   ├── NameInput           -- "Nom complet"
│   │   ├── EmailInput          -- "Adresse email"
│   │   └── CVUploadField       -- Required upload
│   ├── MotivationTextarea      -- "Message de motivation"
│   │   ├── CharacterCount      -- "{count}/2000 caracteres"
│   │   └── MinLengthHint       -- "Minimum 50 caracteres"
│   ├── LoginPrompt (shown if not logged in)
│   │   └── Text: "Vous avez un compte ? Connectez-vous pour postuler plus rapidement."
│   └── SubmitButton            -- "Envoyer ma candidature"
├── UploadProgress              -- Progress bar during CV upload
└── SuccessView (shown after successful submission)
    ├── SuccessIcon
    ├── SuccessMessage          -- "Votre candidature a ete envoyee avec succes !"
    ├── ApplicationSummary      -- Job title, company, date
    ├── GuestAccountCTA (if guest)
    │   └── Text: "Creez un compte pour suivre l'avancement de votre candidature"
    └── NavigationLinks
        ├── BackToSearchLink    -- "Retour aux offres"
        └── MyApplicationsLink  -- "Voir mes candidatures" (if authenticated)
```

### 6.2 Key UI Labels (French)

| Element | Text |
|---------|------|
| Page title | "Postuler a cette offre" |
| Name label | "Nom complet" |
| Name placeholder | "Votre nom et prenom" |
| Email label | "Adresse email" |
| Email placeholder | "votre.email@exemple.com" |
| CV label | "Curriculum Vitae (CV)" |
| CV upload button | "Telecharger un CV (PDF, max 5 Mo)" |
| CV saved display | "CV enregistre : {filename}" |
| CV change link | "Changer de CV" |
| Motivation label | "Message de motivation" |
| Motivation placeholder | "Decrivez en quelques lignes pourquoi ce poste vous interesse et ce que vous pouvez apporter a l'entreprise..." |
| Character count | "{count}/2000 caracteres" |
| Min length hint | "Minimum 50 caracteres" |
| Submit button | "Envoyer ma candidature" |
| Submit loading | "Envoi en cours..." |
| Login prompt | "Vous avez un compte ? Connectez-vous pour postuler plus rapidement." |
| Login link | "Se connecter" |
| Success message | "Votre candidature a ete envoyee avec succes !" |
| Success detail | "L'entreprise {companyName} recevra votre candidature dans les prochaines minutes." |
| Guest CTA | "Creez un compte pour suivre l'avancement de votre candidature" |
| Back to search | "Retour aux offres" |
| My applications | "Voir mes candidatures" |
| File type error | "Seuls les fichiers PDF sont acceptes." |
| File size error | "La taille du fichier ne doit pas depasser 5 Mo." |
| Email error | "Veuillez saisir une adresse email valide." |
| Message too short | "Votre message de motivation doit contenir au moins 50 caracteres." |
| Message too long | "Votre message de motivation ne doit pas depasser 2000 caracteres." |
| Already applied | "Vous avez deja postule a cette offre." |
| Job unavailable | "Cette offre n'est plus disponible." |

### 6.3 Responsive Behavior

- **Desktop (>=1024px):** Form centered in a card layout (max-width 700px). Job summary card appears at top.
- **Tablet (768px-1023px):** Same layout, slightly wider padding.
- **Mobile (<768px):** Full-width form. CV upload button is prominent. Motivation textarea takes full width. Submit button spans full width at bottom.

---

## 7. API Endpoints

### 7.1 Upload CV

```
POST /api/upload/cv
```

**Authentication:** Optional (authenticated or guest).

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File (binary) | Yes | PDF file, max 5MB |

**Validation:**

| Rule | Error |
|------|-------|
| File is present | `{ "error": "FILE_REQUIRED", "message": "Veuillez telecharger un fichier CV." }` |
| MIME type is `application/pdf` | `{ "error": "INVALID_FILE_TYPE", "message": "Seuls les fichiers PDF sont acceptes." }` |
| File size <= 5MB | `{ "error": "FILE_TOO_LARGE", "message": "La taille du fichier ne doit pas depasser 5 Mo." }` |

**Response:** `201 Created` with body as in Section 5.4.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | See validation rules above |
| 413 | File too large (caught at middleware level) | `{ "error": "FILE_TOO_LARGE" }` |
| 500 | Storage upload failed | `{ "error": "UPLOAD_FAILED", "message": "Le telechargement a echoue." }` |

### 7.2 Submit Application (Authenticated)

```
POST /api/applications
```

**Authentication:** Required (Bearer token).

**Request Body:**

```json
{
  "jobId": "uuid",
  "message": "string (50-2000 chars)",
  "cvFileId": "uuid | null"
}
```

**Validation:**

| Field | Rule |
|-------|------|
| `jobId` | Required. Must reference an active, non-expired job. |
| `message` | Required. 50-2000 characters. |
| `cvFileId` | Optional. If null, user must have a CV on their profile. |

**Response:** `201 Created` with body as in Section 5.3.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 401 | Not authenticated | `{ "error": "UNAUTHORIZED" }` |
| 404 | Job not found | `{ "error": "NOT_FOUND", "message": "L'offre n'existe pas." }` |
| 409 | Already applied | `{ "error": "ALREADY_APPLIED", "message": "Vous avez deja postule a cette offre." }` |
| 410 | Job deactivated/expired | `{ "error": "JOB_UNAVAILABLE", "message": "Cette offre n'est plus disponible." }` |

### 7.3 Submit Application (Guest)

```
POST /api/applications/guest
```

**Authentication:** None required.

**Request Body:**

```json
{
  "jobId": "uuid",
  "name": "string (2-100 chars)",
  "email": "string (valid email)",
  "message": "string (50-2000 chars)",
  "cvFileId": "uuid"
}
```

**Validation:**

| Field | Rule |
|-------|------|
| `jobId` | Required. Must reference an active, non-expired job. |
| `name` | Required. 2-100 characters. |
| `email` | Required. Valid email format. |
| `message` | Required. 50-2000 characters. |
| `cvFileId` | Required. Must reference a valid uploaded file. |

**Response:** `201 Created` with body as in Section 5.3.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 404 | Job not found | `{ "error": "NOT_FOUND", "message": "L'offre n'existe pas." }` |
| 409 | Same email already applied to this job | `{ "error": "ALREADY_APPLIED", "message": "Une candidature avec cette adresse email existe deja pour cette offre." }` |
| 410 | Job deactivated/expired | `{ "error": "JOB_UNAVAILABLE", "message": "Cette offre n'est plus disponible." }` |

**Rate Limiting:** 10 guest applications per hour per IP (to prevent spam).

---

## 8. Technical Notes

- **CV storage security:** CVs are stored in a private Supabase Storage bucket. Access requires a signed URL generated server-side. Signed URLs expire after 1 hour.
- **Email delivery:** Confirmation and notification emails are sent asynchronously via Resend. If the Resend API is down, emails are queued in a `email_queue` table and retried with exponential backoff.
- **Duplicate prevention:** The unique constraints on `(job_id, user_id)` and `(job_id, guest_email)` prevent duplicate applications at the database level.
- **Guest-to-user linking:** When a guest creates an account later using the same email, a background job links their guest applications to the new user account by matching `guest_email` to the user's email.
- **File cleanup:** Orphaned CV files (uploaded but never linked to an application within 24 hours) are cleaned up by a daily cron job.
- **Optimistic UI:** The submit button shows a loading spinner immediately on click. The form is disabled during submission to prevent double-submit.
