# Feature Spec: Candidate Profile

**Module:** 2B -- Candidate Side
**Feature:** Profil candidat et suivi des candidatures
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Allow candidates to create and manage a professional profile containing their personal information, work experience, skills, education, and CV. The profile serves as the candidate's identity on the platform and powers the streamlined application flow. Additionally, provide a dashboard where candidates can track the status of all their submitted applications.

---

## 2. User Stories Covered

| ID | Story | Priority |
|----|-------|----------|
| US-2.15 | En tant que candidat, je peux creer un profil avec mes experiences professionnelles et mes competences afin de postuler plus facilement et d'etre visible par les recruteurs. | Must |
| US-2.16 | En tant que candidat, je peux suivre le statut de mes candidatures (envoyee, vue, entretien, refusee) afin de gerer ma recherche d'emploi efficacement. | Must |

---

## 3. System Flow

### 3.1 Registration

1. Candidate navigates to `/inscription`.
2. Registration form collects:
   - **Nom complet** (required)
   - **Adresse email** (required, unique)
   - **Mot de passe** (required, min 8 characters, must contain at least 1 uppercase, 1 lowercase, 1 digit)
   - **Ville** (required, dropdown from cities list)
   - **Numero de telephone** (optional, Moroccan format: `+212 6XX-XXXXXX` or `06XX-XXXXXX`)
3. Candidate submits the form.
4. Backend (Supabase Auth):
   a. Creates the user account.
   b. Sends a verification email: "Confirmez votre adresse email".
   c. Creates a `candidate_profiles` record with default values.
5. Candidate is redirected to `/profil` with a banner: "Un email de verification a ete envoye a {email}."
6. Candidate clicks the verification link in the email -> email is confirmed.

### 3.2 Profile Creation & Editing

1. Candidate navigates to `/profil` (authenticated).
2. The profile page displays sections that can be edited in-place or via modal forms:

   **a. Informations personnelles:**
   - Photo de profil (avatar upload, circular crop, max 2MB, JPG/PNG/WebP)
   - Nom complet
   - Email (read-only, verified indicator)
   - Telephone
   - Ville actuelle
   - Date de naissance (optional)

   **b. CV:**
   - Current CV file display (filename, upload date, download link)
   - Upload/replace CV (PDF only, max 5MB)
   - "Supprimer mon CV" option

   **c. Experiences professionnelles (JSON array):**
   - Each experience entry:
     - Poste (job title, required)
     - Entreprise (company name, required)
     - Ville (city, required)
     - Date de debut (required)
     - Date de fin (optional; if empty, marked as "Poste actuel")
     - Description (optional, max 500 characters)
   - "Ajouter une experience" button
   - Edit/delete existing entries
   - Ordered by most recent first

   **d. Formation (education, JSON array):**
   - Each entry:
     - Diplome / Titre (degree/title, required)
     - Etablissement (school/institution, required)
     - Annee d'obtention (year, required)
   - "Ajouter une formation" button
   - Edit/delete existing entries

   **e. Competences (skills, string array):**
   - Tag input with autocomplete from a predefined skill list
   - Common tourism skills pre-suggested: "Accueil client", "Service en salle", "Gestion hoteliere", "Opera PMS", "Anglais", "Espagnol", etc.
   - Max 20 skills
   - Free-text entry allowed for skills not in the list

   **f. Preferences de recherche:**
   - Ville(s) souhaitee(s) (multi-select, up to 5 cities)
   - Type(s) de contrat souhaite(s) (checkboxes: CDI, CDD, Saisonnier, Stage, Freelance)
   - Disponibilite: radio buttons
     - "Immediate"
     - "Sous 1 mois"
     - "Sous 3 mois"

3. Each section auto-saves on blur/change (debounced at 1 second) or has an explicit "Enregistrer" button.
4. A profile completeness indicator (percentage bar) is displayed, encouraging candidates to fill all sections.

### 3.3 Avatar Upload

1. Candidate clicks on the avatar area or "Changer la photo" link.
2. File picker opens, restricted to image formats (JPG, PNG, WebP).
3. Frontend validates:
   - File type: image/jpeg, image/png, image/webp
   - File size: max 2MB
4. A crop modal appears with a circular crop area.
5. Candidate adjusts the crop and clicks "Valider".
6. Cropped image is uploaded to Supabase Storage `avatars` bucket.
7. Profile is updated with the new avatar URL.

### 3.4 Application Tracking ("Mes candidatures")

1. Candidate navigates to `/mes-candidatures` (authenticated).
2. The page displays a list/table of all submitted applications, sorted by most recent first.
3. Each row shows:
   - Job title (linked to the job detail page)
   - Company name
   - City
   - Date of application
   - **Status badge** (color-coded):
     - `submitted` -> "Envoyee" (blue)
     - `viewed` -> "Vue par l'employeur" (yellow)
     - `shortlisted` -> "Preselectionnee" (green)
     - `interview` -> "Entretien" (purple)
     - `rejected` -> "Refusee" (red)
     - `hired` -> "Retenue" (dark green)
4. Clicking a row expands to show:
   - The motivation message sent
   - The CV file used (download link)
   - Status history timeline
5. If the job has been deactivated, a note appears: "Cette offre n'est plus active."
6. Empty state (no applications): "Vous n'avez pas encore postule. Explorez les offres disponibles !" with link to `/offres`.
7. Pagination: 15 applications per page.

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| S1 | Candidate registers with valid information | Account created. Verification email sent. Profile page accessible. |
| S2 | Candidate uploads a profile photo | Avatar is cropped, uploaded, and displayed on the profile. |
| S3 | Candidate adds 3 professional experiences | Experiences saved as JSON array. Displayed in chronological order (newest first). |
| S4 | Candidate adds skills via autocomplete | Skills saved as array. Tag pills displayed on profile. |
| S5 | Candidate uploads a CV | File uploaded to Supabase Storage. Displayed on profile with download link. |
| S6 | Candidate views application list | All submitted applications listed with current status badges. |
| S7 | Employer views a candidate's application -> status changes to "viewed" | Status badge updates from "Envoyee" to "Vue par l'employeur" on next page load. |
| S8 | Candidate sets availability to "Immediate" | Preference saved. Reflected in profile data used for matching. |
| S9 | Profile completeness reaches 100% | Completeness bar shows full. Congratulatory message: "Votre profil est complet !" |

### 4.2 Failure / Edge Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| F1 | Candidate registers with an email that already exists | Error: "Cette adresse email est deja utilisee." |
| F2 | Candidate enters a weak password (e.g., "12345678") | Error: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre." |
| F3 | Candidate uploads a non-image file as avatar | Error: "Seuls les fichiers JPG, PNG et WebP sont acceptes." |
| F4 | Candidate uploads an avatar larger than 2MB | Error: "La taille de l'image ne doit pas depasser 2 Mo." |
| F5 | Candidate uploads a non-PDF as CV | Error: "Seuls les fichiers PDF sont acceptes." |
| F6 | Candidate tries to add more than 20 skills | UI prevents adding more. Message: "Vous pouvez ajouter jusqu'a 20 competences." |
| F7 | Candidate tries to select more than 5 desired cities | UI prevents adding more. Message: "Vous pouvez selectionner jusqu'a 5 villes." |
| F8 | Candidate adds experience with end date before start date | Error: "La date de fin doit etre posterieure a la date de debut." |
| F9 | Network fails during auto-save | Toast: "La sauvegarde a echoue. Vos modifications seront reessayees automatiquement." Retry on reconnection. |
| F10 | Candidate has no applications | Empty state with CTA to browse jobs. |

---

## 5. Data

### 5.1 Registration Input

```json
{
  "name": "Fatima Zahra El Amrani",
  "email": "fatima.elamrani@email.com",
  "password": "SecurePass1",
  "city": "casablanca",
  "phone": "+212 661-234567"
}
```

### 5.2 Profile Data Model

```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Fatima Zahra El Amrani",
  "email": "fatima.elamrani@email.com",
  "emailVerified": true,
  "phone": "+212 661-234567",
  "city": "Casablanca",
  "dateOfBirth": "1995-03-15",
  "avatarUrl": "https://storage.siyahamag.com/avatars/user123/avatar.webp",
  "cvFileId": "uuid",
  "cvFileName": "cv-fatima-elamrani.pdf",
  "cvFileUrl": "https://storage.siyahamag.com/cvs/user123/cv.pdf",
  "cvUploadedAt": "2026-03-20T09:00:00Z",
  "experiences": [
    {
      "id": "uuid",
      "title": "Receptionniste",
      "company": "Hotel Sofitel Casablanca",
      "city": "Casablanca",
      "startDate": "2022-06-01",
      "endDate": null,
      "isCurrent": true,
      "description": "Accueil des clients VIP, gestion des reservations via Opera PMS, coordination avec les equipes housekeeping."
    },
    {
      "id": "uuid",
      "title": "Stagiaire reception",
      "company": "Riad Fes",
      "city": "Fes",
      "startDate": "2022-01-15",
      "endDate": "2022-05-30",
      "isCurrent": false,
      "description": "Stage de fin d'etudes en gestion hoteliere."
    }
  ],
  "education": [
    {
      "id": "uuid",
      "degree": "Licence en Gestion Hoteliere",
      "institution": "ISIT Tanger",
      "year": 2021
    }
  ],
  "skills": [
    "Accueil client",
    "Opera PMS",
    "Gestion des reservations",
    "Anglais courant",
    "Francais courant",
    "Arabe"
  ],
  "preferences": {
    "desiredCities": ["casablanca", "marrakech", "rabat"],
    "desiredContractTypes": ["cdi", "cdd"],
    "availability": "immediate"
  },
  "profileCompleteness": 85,
  "createdAt": "2026-03-15T10:00:00Z",
  "updatedAt": "2026-04-01T08:30:00Z"
}
```

### 5.3 Application List Item

```json
{
  "id": "uuid",
  "job": {
    "id": "uuid",
    "slug": "receptionniste-hotel-marrakech-abc123",
    "title": "Receptionniste Hotel 5 etoiles",
    "isActive": true
  },
  "company": {
    "name": "Hotel Atlas Prestige",
    "logoUrl": "https://storage.siyahamag.com/logos/hotel-atlas.webp"
  },
  "city": "Marrakech",
  "contractType": "CDI",
  "appliedAt": "2026-03-28T14:30:00Z",
  "status": "viewed",
  "statusHistory": [
    { "status": "submitted", "at": "2026-03-28T14:30:00Z" },
    { "status": "viewed", "at": "2026-03-29T09:15:00Z" }
  ],
  "message": "Madame, Monsieur, je me permets de vous soumettre...",
  "cvFileUrl": "https://storage.siyahamag.com/cvs/user123/cv.pdf"
}
```

### 5.4 Database Tables

```sql
-- candidate_profiles table
CREATE TABLE candidate_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  date_of_birth DATE,
  avatar_url VARCHAR(500),
  cv_file_id UUID REFERENCES cv_files(id),
  experiences JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  skills TEXT[] DEFAULT '{}',
  desired_cities TEXT[] DEFAULT '{}',
  desired_contract_types TEXT[] DEFAULT '{}',
  availability VARCHAR(20) DEFAULT 'immediate' CHECK (availability IN ('immediate','1_month','3_months')),
  profile_completeness INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- application_status_history table
CREATE TABLE application_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT now(),
  changed_by UUID REFERENCES users(id)
);

CREATE INDEX idx_status_history_application ON application_status_history(application_id);

-- Trigger to track status changes
CREATE OR REPLACE FUNCTION track_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO application_status_history (application_id, status, changed_at)
    VALUES (NEW.id, NEW.status, now());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER application_status_change_trigger
  AFTER UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION track_application_status_change();
```

### 5.5 Profile Completeness Calculation

The `profile_completeness` percentage is computed as follows:

| Field | Weight |
|-------|--------|
| Name | 10% |
| Email verified | 10% |
| Phone | 5% |
| City | 5% |
| Avatar photo | 10% |
| CV uploaded | 15% |
| At least 1 experience | 15% |
| At least 1 education entry | 10% |
| At least 3 skills | 10% |
| Desired cities set | 5% |
| Availability set | 5% |

Computed on profile update and stored in `profile_completeness` column.

---

## 6. UI Components

### 6.1 Component Tree -- Profile Page

```
ProfilePage (/profil)
├── ProfileHeader
│   ├── AvatarUpload
│   │   ├── AvatarImage          -- Current photo or placeholder
│   │   ├── UploadButton         -- "Changer la photo"
│   │   └── CropModal            -- Circular crop tool
│   ├── UserName                 -- h1
│   ├── UserCity
│   └── CompletenessBar          -- "{percentage}% complet"
├── PersonalInfoSection
│   ├── SectionTitle             -- "Informations personnelles"
│   ├── NameField
│   ├── EmailField               -- Read-only + verified badge
│   ├── PhoneField
│   ├── CityDropdown
│   └── DateOfBirthPicker
├── CVSection
│   ├── SectionTitle             -- "Curriculum Vitae"
│   ├── CurrentCVDisplay         -- Filename + date + download
│   ├── CVUploadButton           -- "Telecharger un nouveau CV"
│   └── DeleteCVButton           -- "Supprimer mon CV"
├── ExperiencesSection
│   ├── SectionTitle             -- "Experiences professionnelles"
│   ├── ExperienceCard (repeating)
│   │   ├── JobTitle
│   │   ├── CompanyName
│   │   ├── CityName
│   │   ├── DateRange            -- "Juin 2022 - Present"
│   │   ├── Description
│   │   ├── EditButton
│   │   └── DeleteButton
│   ├── AddExperienceButton      -- "Ajouter une experience"
│   └── ExperienceFormModal
│       ├── TitleInput
│       ├── CompanyInput
│       ├── CityInput
│       ├── StartDatePicker
│       ├── EndDatePicker
│       ├── IsCurrentCheckbox    -- "Poste actuel"
│       ├── DescriptionTextarea
│       └── SaveButton
├── EducationSection
│   ├── SectionTitle             -- "Formation"
│   ├── EducationCard (repeating)
│   │   ├── Degree
│   │   ├── Institution
│   │   ├── Year
│   │   ├── EditButton
│   │   └── DeleteButton
│   ├── AddEducationButton       -- "Ajouter une formation"
│   └── EducationFormModal
├── SkillsSection
│   ├── SectionTitle             -- "Competences"
│   ├── SkillTagInput            -- Autocomplete + free text
│   ├── SkillTagList             -- Existing skill pills with remove
│   └── SkillCount               -- "{count}/20"
└── PreferencesSection
    ├── SectionTitle             -- "Preferences de recherche"
    ├── DesiredCitiesMultiSelect
    ├── ContractTypeCheckboxes
    └── AvailabilityRadios
```

### 6.2 Component Tree -- Applications Page

```
ApplicationsPage (/mes-candidatures)
├── PageTitle                    -- "Mes candidatures"
├── ApplicationCount             -- "{count} candidature(s)"
├── ApplicationList
│   └── ApplicationRow (repeating)
│       ├── CompanyLogo
│       ├── JobTitle             -- Link to job detail
│       ├── CompanyName
│       ├── CityLabel
│       ├── AppliedDate          -- "Postule le 28 mars 2026"
│       ├── StatusBadge          -- Color-coded
│       └── ExpandableDetail
│           ├── MotivationMessage
│           ├── CVDownloadLink
│           ├── StatusTimeline
│           │   └── TimelineEntry (repeating)
│           │       ├── StatusLabel
│           │       └── DateLabel
│           └── JobInactiveNote  -- If job is no longer active
├── EmptyState
│   ├── EmptyIcon
│   ├── EmptyMessage             -- "Vous n'avez pas encore postule."
│   └── BrowseJobsLink           -- "Explorez les offres disponibles"
└── Pagination
```

### 6.3 Key UI Labels (French)

| Element | Text |
|---------|------|
| Profile page title | "Mon profil" |
| Completeness label | "{percentage}% complet" |
| Personal info heading | "Informations personnelles" |
| CV heading | "Curriculum Vitae" |
| Upload CV button | "Telecharger un nouveau CV (PDF, max 5 Mo)" |
| Delete CV | "Supprimer mon CV" |
| Experiences heading | "Experiences professionnelles" |
| Add experience | "Ajouter une experience" |
| Current position checkbox | "Poste actuel" |
| Education heading | "Formation" |
| Add education | "Ajouter une formation" |
| Skills heading | "Competences" |
| Skills placeholder | "Ajouter une competence..." |
| Skills max notice | "Maximum 20 competences" |
| Preferences heading | "Preferences de recherche" |
| Desired cities label | "Ville(s) souhaitee(s)" |
| Contract types label | "Type(s) de contrat souhaite(s)" |
| Availability label | "Disponibilite" |
| Availability: immediate | "Immediate" |
| Availability: 1 month | "Sous 1 mois" |
| Availability: 3 months | "Sous 3 mois" |
| Applications page title | "Mes candidatures" |
| Applications count | "{count} candidature(s)" |
| Status: submitted | "Envoyee" |
| Status: viewed | "Vue par l'employeur" |
| Status: shortlisted | "Preselectionnee" |
| Status: interview | "Entretien" |
| Status: rejected | "Refusee" |
| Status: hired | "Retenue" |
| Applied date | "Postule le {date}" |
| Job inactive | "Cette offre n'est plus active." |
| Empty applications | "Vous n'avez pas encore postule. Explorez les offres disponibles !" |
| Registration: name | "Nom complet" |
| Registration: email | "Adresse email" |
| Registration: password | "Mot de passe" |
| Registration: city | "Ville" |
| Registration: phone | "Numero de telephone (optionnel)" |
| Registration: submit | "Creer mon compte" |
| Email verification banner | "Un email de verification a ete envoye a {email}." |

### 6.4 Responsive Behavior

- **Desktop (>=1024px):** Profile sections stacked vertically in a centered card (max-width 800px). Two-column layout for personal info fields.
- **Tablet (768px-1023px):** Single-column layout. Slightly narrower padding.
- **Mobile (<768px):** Full-width. Experience and education cards stack vertically. Skills tag input takes full width. Modals become full-screen bottom sheets.

---

## 7. API Endpoints

### 7.1 Register Candidate

```
POST /api/auth/register
```

**Authentication:** None.

**Request Body:**

```json
{
  "name": "Fatima Zahra El Amrani",
  "email": "fatima.elamrani@email.com",
  "password": "SecurePass1",
  "city": "casablanca",
  "phone": "+212 661-234567"
}
```

**Validation:**

| Field | Rule |
|-------|------|
| `name` | Required. 2-100 characters. |
| `email` | Required. Valid email format. Unique. |
| `password` | Required. Min 8 characters. At least 1 uppercase, 1 lowercase, 1 digit. |
| `city` | Required. Must be a valid city slug. |
| `phone` | Optional. Moroccan phone format. |

**Response:** `201 Created`

```json
{
  "userId": "uuid",
  "message": "Compte cree avec succes. Veuillez verifier votre email."
}
```

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 409 | Email already exists | `{ "error": "EMAIL_EXISTS", "message": "Cette adresse email est deja utilisee." }` |

### 7.2 Get Candidate Profile

```
GET /api/profile
```

**Authentication:** Required (Bearer token).

**Response:** `200 OK` with body as in Section 5.2.

### 7.3 Update Candidate Profile

```
PATCH /api/profile
```

**Authentication:** Required (Bearer token).

**Request Body:** Partial update -- only include fields to change.

```json
{
  "phone": "+212 662-345678",
  "city": "marrakech",
  "skills": ["Accueil client", "Opera PMS", "Anglais courant"],
  "availability": "1_month"
}
```

**Response:** `200 OK` with updated profile data.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 401 | Not authenticated | `{ "error": "UNAUTHORIZED" }` |

### 7.4 Add Experience

```
POST /api/profile/experiences
```

**Authentication:** Required.

**Request Body:**

```json
{
  "title": "Receptionniste",
  "company": "Hotel Sofitel Casablanca",
  "city": "Casablanca",
  "startDate": "2022-06-01",
  "endDate": null,
  "isCurrent": true,
  "description": "Accueil des clients VIP..."
}
```

**Response:** `201 Created` with the new experience object.

### 7.5 Update Experience

```
PUT /api/profile/experiences/:id
```

**Authentication:** Required. Must be the owner.

**Response:** `200 OK` with updated experience object.

### 7.6 Delete Experience

```
DELETE /api/profile/experiences/:id
```

**Authentication:** Required. Must be the owner.

**Response:** `204 No Content`

### 7.7 Add/Update/Delete Education

Follows the same pattern as experiences:

```
POST   /api/profile/education
PUT    /api/profile/education/:id
DELETE /api/profile/education/:id
```

### 7.8 Upload Avatar

```
POST /api/upload/avatar
```

**Authentication:** Required.

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Image file (JPG, PNG, WebP), max 2MB |

**Response:** `201 Created`

```json
{
  "avatarUrl": "https://storage.siyahamag.com/avatars/user123/avatar.webp"
}
```

### 7.9 Get My Applications

```
GET /api/applications/mine
```

**Authentication:** Required.

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `15` | Results per page |
| `status` | string | No | `null` | Filter by status |

**Response:** `200 OK`

```json
{
  "data": [ /* array of application items as in Section 5.3 */ ],
  "meta": {
    "total": 8,
    "page": 1,
    "limit": 15,
    "totalPages": 1
  }
}
```

---

## 8. Technical Notes

- **Supabase Auth:** Registration and authentication are handled by Supabase Auth. The `candidate_profiles` table extends the `auth.users` table with candidate-specific fields.
- **Experiences/Education as JSONB:** Stored as JSONB arrays in the `candidate_profiles` table for simplicity. Each entry has a client-generated UUID for identification. This avoids join overhead for a feature that is always read/written as a complete set.
- **Profile completeness:** Recalculated on every profile update via a database function or computed in the API layer. Cached in the `profile_completeness` column.
- **Avatar processing:** Avatars are cropped client-side before upload (using a library like `react-easy-crop`). The server stores the image as-is in Supabase Storage. WebP conversion is handled by Supabase image transformation if available, or done client-side before upload.
- **Auto-save:** Profile field changes trigger a debounced PATCH request (1 second delay). A small "Sauvegarde..." indicator appears during save, changing to "Sauvegarde" with a checkmark on success.
- **Guest linking:** When a guest registers with an email that matches existing guest applications, a database trigger or backend job updates those application records to link to the new user ID.
- **Status updates:** Application status changes are triggered by employer actions (Module 2A). The candidate sees the updated status on their next page load or refresh. Real-time updates via Supabase Realtime subscriptions can be added in a future iteration.
