# Feature Spec: Employer Registration (Module 2A)

**Module:** 2A - Employer Side
**Feature:** Employer Signup / Inscription Employeur
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Allow tourism-sector employers in Morocco to create an account on SiyahaMag.com by providing their company information. The registration flow collects verified business data (company name, ICE, professional email, sector) and creates an **inactive** account that remains dormant until an administrator manually verifies the employer. This ensures only legitimate businesses appear on the platform, protecting job seekers from fraudulent postings.

---

## 2. User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|-------------------|
| US-2.1 | En tant qu'employeur, je veux créer un compte avec les informations de mon entreprise afin de publier des offres d'emploi sur SiyahaMag. | Account is created with status `INACTIVE`. All required fields validated. Professional email enforced. Confirmation email sent. Redirected to a "En attente de vérification" page. |

---

## 3. System Flow

### 3.1 Step-by-Step Flow

```
1. User navigates to /inscription/employeur
2. System renders the multi-section registration form
3. User fills in all required fields:
   a. Company name (Nom de l'entreprise)
   b. Professional email (Email professionnel)
   c. Password + confirmation
   d. ICE number (Identifiant Commun de l'Entreprise)
   e. Website URL (Site web)
   f. City (Ville)
   g. Sector (Secteur d'activité)
   h. Contact phone (Téléphone)
   i. Contact person name (Nom du responsable)
   j. Contact person role (Fonction du responsable)
4. User clicks "Créer mon compte"
5. Client-side validation runs:
   a. All required fields present
   b. Email format valid AND domain not in blocklist
   c. Password meets strength requirements
   d. ICE format valid (15-digit number)
   e. Website URL format valid
   f. Phone format valid (Moroccan format)
6. If client-side validation fails → show inline errors in French
7. If client-side validation passes → POST /api/auth/employer/register
8. Server-side validation runs (mirrors client + additional checks):
   a. Email uniqueness check against database
   b. ICE uniqueness check against database
   c. Email domain blocklist check (server-side)
   d. Rate limiting check (max 3 registrations per IP per hour)
9. If server validation fails → return 422 with field-level errors
10. If server validation passes:
    a. Create user in Supabase Auth with role: EMPLOYER
    b. Create Company record in database (status: INACTIVE)
    c. Create CompanyVerification record (status: PENDING)
    d. Send confirmation email to employer
    e. Send notification email to admin team
    f. Return 201 with redirect URL
11. User sees "Compte créé avec succès" page explaining:
    - Account is under review
    - Estimated verification time (48h)
    - What documents may be requested
    - Link to contact support
12. User cannot log in to post jobs until status changes to ACTIVE
```

### 3.2 Flow Diagram

```
[Landing Page] → [/inscription/employeur]
       ↓
[Fill Registration Form]
       ↓
[Client Validation] → FAIL → [Show Inline Errors] → loop back
       ↓ PASS
[POST /api/auth/employer/register]
       ↓
[Server Validation] → FAIL → [Return 422 + Errors] → show errors
       ↓ PASS
[Create Supabase Auth User]
       ↓
[Create Company (INACTIVE)]
       ↓
[Create CompanyVerification (PENDING)]
       ↓
[Send Emails: employer + admin]
       ↓
[Redirect to /inscription/confirmation]
```

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| S1 | Happy path registration | User has valid company info, professional email | Fills all fields correctly, submits | Account created (INACTIVE), confirmation page shown, emails sent |
| S2 | Registration with optional website | User's company has no website | Leaves website field empty — **wait, website is required.** Fills all fields. | All fields validated, account created |
| S3 | Registration with .ma domain email | User has a Moroccan domain email | Enters email like contact@riad-marrakech.ma | Accepted, account created |
| S4 | User returns after registration | User already registered but not verified | Tries to log in | Shown message: "Votre compte est en attente de vérification" with support contact |

### 4.2 Failure Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| F1 | Gmail email rejected | User enters personal Gmail | Enters user@gmail.com | Error: "Veuillez utiliser une adresse email professionnelle. Les adresses Gmail, Hotmail, Yahoo, etc. ne sont pas acceptées." |
| F2 | Hotmail email rejected | User enters Hotmail address | Enters user@hotmail.com | Same professional email error |
| F3 | Yahoo email rejected | User enters Yahoo address | Enters user@yahoo.fr | Same professional email error |
| F4 | Outlook personal email rejected | User enters outlook.com | Enters user@outlook.com | Same professional email error |
| F5 | Invalid ICE format | User enters wrong ICE | Enters "ABC123" (not 15 digits) | Error: "L'ICE doit contenir exactement 15 chiffres." |
| F6 | Duplicate email | Email already in database | Enters existing email | Error: "Cette adresse email est déjà utilisée." |
| F7 | Duplicate ICE | ICE already registered | Enters existing ICE | Error: "Ce numéro ICE est déjà enregistré sur la plateforme." |
| F8 | Weak password | Password too simple | Enters "123456" | Error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre." |
| F9 | Password mismatch | Confirmation differs | Passwords don't match | Error: "Les mots de passe ne correspondent pas." |
| F10 | Missing required fields | User skips fields | Submits with empty company name | Error: "Ce champ est obligatoire." on each missing field |
| F11 | Invalid website URL | Malformed URL | Enters "not-a-url" | Error: "Veuillez entrer une URL valide (ex: https://www.monentreprise.ma)." |
| F12 | Invalid phone format | Wrong phone number | Enters "12345" | Error: "Veuillez entrer un numéro de téléphone marocain valide (ex: +212 6XX XXX XXX)." |
| F13 | Rate limit exceeded | 3+ registrations from same IP | Submits again | Error: "Trop de tentatives. Veuillez réessayer dans une heure." (HTTP 429) |
| F14 | Supabase Auth failure | Supabase service down | Submits valid form | Error: "Une erreur technique est survenue. Veuillez réessayer ultérieurement." (HTTP 500) |
| F15 | Disposable email domain | User uses temp email service | Enters user@tempmail.com | Error: "Cette adresse email n'est pas acceptée. Veuillez utiliser une adresse email professionnelle." |

---

## 5. Data

### 5.1 Input — Registration Form Fields

| Field | Label (FR) | Type | Required | Validation Rules |
|-------|-----------|------|----------|-----------------|
| companyName | Nom de l'entreprise | string | Yes | Min 2 chars, max 200 chars |
| email | Email professionnel | string (email) | Yes | Valid email format. Domain NOT in blocklist: `gmail.com, googlemail.com, hotmail.com, hotmail.fr, outlook.com, outlook.fr, yahoo.com, yahoo.fr, live.com, live.fr, aol.com, icloud.com, me.com, protonmail.com, mail.com, yandex.com, gmx.com, zoho.com, tempmail.com` and known disposable email domains |
| password | Mot de passe | string | Yes | Min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit |
| passwordConfirm | Confirmer le mot de passe | string | Yes | Must match `password` |
| ice | Numéro ICE | string | Yes | Exactly 15 digits, numeric only |
| website | Site web de l'entreprise | string (URL) | Yes | Valid URL format, must start with http:// or https:// |
| city | Ville | string (select) | Yes | One of predefined Moroccan cities: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Ouarzazate, Essaouira, Chefchaouen, Dakhla, El Jadida, Ifrane, Tétouan, Nador, Oujda, Autre |
| sector | Secteur d'activité | string (select) | Yes | One of: `HOTELLERIE`, `RESTAURATION`, `AGENCE_VOYAGE`, `TRANSPORT`, `ANIMATION`, `BIEN_ETRE_SPA`, `GUIDE_TOURISTIQUE`, `MICE_EVENEMENTIEL`, `PATRIMOINE_CULTURE`, `AUTRE` |
| phone | Téléphone | string | Yes | Moroccan phone format: +212 followed by 9 digits, or 0 followed by 9 digits |
| contactName | Nom du responsable | string | Yes | Min 2 chars, max 100 chars |
| contactRole | Fonction du responsable | string | Yes | Min 2 chars, max 100 chars (e.g., "Directeur RH", "Gérant") |

### 5.2 Output — Created Records

#### Supabase Auth User
```typescript
{
  id: string;           // UUID from Supabase
  email: string;
  role: "EMPLOYER";
  email_confirmed_at: null; // Until email verified
  created_at: DateTime;
}
```

#### Company (Prisma Model)
```typescript
{
  id: string;                    // cuid
  userId: string;                // FK to Supabase Auth user
  companyName: string;
  email: string;
  ice: string;
  website: string;
  city: City;                    // enum
  sector: CompanySector;         // enum
  phone: string;
  contactName: string;
  contactRole: string;
  status: CompanyStatus;         // INACTIVE (default on creation)
  isVerified: boolean;           // false (default)
  logo: string | null;           // null on creation
  description: string | null;    // null on creation
  coverImage: string | null;     // null on creation
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

#### CompanyVerification (Prisma Model)
```typescript
{
  id: string;                         // cuid
  companyId: string;                  // FK to Company
  status: VerificationStatus;         // PENDING (default)
  submittedAt: DateTime;
  reviewedAt: DateTime | null;        // null until reviewed
  reviewedBy: string | null;          // null until reviewed (admin userId)
  rejectionReason: string | null;     // null unless rejected
  notes: string | null;              // internal admin notes
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 5.3 Enums

```prisma
enum CompanyStatus {
  INACTIVE
  ACTIVE
  SUSPENDED
}

enum VerificationStatus {
  PENDING
  VERIFIED
  REJECTED
}

enum CompanySector {
  HOTELLERIE
  RESTAURATION
  AGENCE_VOYAGE
  TRANSPORT
  ANIMATION
  BIEN_ETRE_SPA
  GUIDE_TOURISTIQUE
  MICE_EVENEMENTIEL
  PATRIMOINE_CULTURE
  AUTRE
}

enum City {
  CASABLANCA
  RABAT
  MARRAKECH
  FES
  TANGER
  AGADIR
  MEKNES
  OUARZAZATE
  ESSAOUIRA
  CHEFCHAOUEN
  DAKHLA
  EL_JADIDA
  IFRANE
  TETOUAN
  NADOR
  OUJDA
  AUTRE
}
```

### 5.4 Email Templates

| Email | Recipient | Subject (FR) | Trigger |
|-------|-----------|-------------|---------|
| employer-registration-confirm | Employer | Bienvenue sur SiyahaMag - Compte en attente de vérification | After successful registration |
| admin-new-employer | Admin team | Nouvel employeur inscrit - Vérification requise | After successful registration |

---

## 6. UI Components

### 6.1 Page: `/inscription/employeur`

```
┌─────────────────────────────────────────────────┐
│  SiyahaMag Logo                                  │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │  Créer votre compte employeur               │ │
│  │  Publiez vos offres d'emploi dans le        │ │
│  │  secteur du tourisme au Maroc               │ │
│  │                                              │ │
│  │  ── Informations de l'entreprise ──         │ │
│  │                                              │ │
│  │  Nom de l'entreprise *                      │ │
│  │  [________________________________]         │ │
│  │                                              │ │
│  │  Numéro ICE *                               │ │
│  │  [________________________________]         │ │
│  │  ℹ️ 15 chiffres, trouvable sur votre RC     │ │
│  │                                              │ │
│  │  Site web de l'entreprise *                 │ │
│  │  [________________________________]         │ │
│  │                                              │ │
│  │  Secteur d'activité *                       │ │
│  │  [▼ Sélectionner un secteur_______]         │ │
│  │                                              │ │
│  │  Ville *                                    │ │
│  │  [▼ Sélectionner une ville________]         │ │
│  │                                              │ │
│  │  Téléphone *                                │ │
│  │  [+212 ___________________________]         │ │
│  │                                              │ │
│  │  ── Responsable du compte ──                │ │
│  │                                              │ │
│  │  Nom du responsable *                       │ │
│  │  [________________________________]         │ │
│  │                                              │ │
│  │  Fonction *                                 │ │
│  │  [________________________________]         │ │
│  │                                              │ │
│  │  ── Identifiants de connexion ──            │ │
│  │                                              │ │
│  │  Email professionnel *                      │ │
│  │  [________________________________]         │ │
│  │  ⚠ Les adresses Gmail, Hotmail, Yahoo       │ │
│  │    ne sont pas acceptées                     │ │
│  │                                              │ │
│  │  Mot de passe *                             │ │
│  │  [________________________________] 👁      │ │
│  │  ░░░░░░░░ Force du mot de passe             │ │
│  │                                              │ │
│  │  Confirmer le mot de passe *                │ │
│  │  [________________________________] 👁      │ │
│  │                                              │ │
│  │  ☐ J'accepte les conditions générales       │ │
│  │    d'utilisation et la politique de          │ │
│  │    confidentialité                           │ │
│  │                                              │ │
│  │  [    Créer mon compte employeur    ]       │ │
│  │                                              │ │
│  │  Déjà inscrit ? Se connecter                │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 6.2 Component Tree

```
EmployerSignupPage (app/inscription/employeur/page.tsx)
├── PageHeader
│   ├── Logo
│   └── Title + subtitle text
├── EmployerSignupForm (components/employer/signup-form.tsx)
│   ├── SectionHeader ("Informations de l'entreprise")
│   ├── FormField (companyName) — TextInput
│   ├── FormField (ice) — TextInput with helper text
│   ├── FormField (website) — TextInput (url type)
│   ├── FormField (sector) — Select dropdown
│   ├── FormField (city) — Select dropdown
│   ├── FormField (phone) — PhoneInput (with +212 prefix)
│   ├── SectionHeader ("Responsable du compte")
│   ├── FormField (contactName) — TextInput
│   ├── FormField (contactRole) — TextInput
│   ├── SectionHeader ("Identifiants de connexion")
│   ├── FormField (email) — TextInput (email type) with warning text
│   ├── FormField (password) — PasswordInput with strength indicator
│   ├── FormField (passwordConfirm) — PasswordInput
│   ├── Checkbox (terms acceptance)
│   ├── SubmitButton ("Créer mon compte employeur")
│   └── LoginLink ("Déjà inscrit ? Se connecter")
├── FormErrorSummary (shown if server-side errors)
└── LoadingOverlay (shown during submission)
```

### 6.3 Page: `/inscription/confirmation`

```
┌─────────────────────────────────────────────────┐
│  SiyahaMag Logo                                  │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           ✓ (green checkmark icon)          │ │
│  │                                              │ │
│  │  Votre compte a été créé avec succès !      │ │
│  │                                              │ │
│  │  Votre inscription est en cours de           │ │
│  │  vérification par notre équipe.              │ │
│  │                                              │ │
│  │  Délai estimé : 24 à 48 heures ouvrées      │ │
│  │                                              │ │
│  │  Vous recevrez un email de confirmation      │ │
│  │  à l'adresse : contact@votrehotel.ma        │ │
│  │                                              │ │
│  │  ── Prochaines étapes ──                    │ │
│  │                                              │ │
│  │  1. Notre équipe vérifie vos informations   │ │
│  │  2. Vous recevez un email de validation     │ │
│  │  3. Vous pouvez publier vos offres          │ │
│  │                                              │ │
│  │  Des questions ?                            │ │
│  │  Contactez-nous à support@siyahamag.com     │ │
│  │                                              │ │
│  │  [     Retour à l'accueil     ]             │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 7. API Endpoints

### 7.1 POST `/api/auth/employer/register`

**Description:** Create a new employer account with company information.

**Auth:** Public (no authentication required)

**Rate Limit:** 3 requests per IP per hour

**Request Body:**
```typescript
interface EmployerRegisterRequest {
  companyName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  ice: string;
  website: string;
  city: City;
  sector: CompanySector;
  phone: string;
  contactName: string;
  contactRole: string;
  acceptedTerms: boolean;
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "message": "Compte créé avec succès. En attente de vérification.",
  "data": {
    "companyId": "clxyz...",
    "email": "contact@riad-marrakech.ma",
    "status": "INACTIVE",
    "verificationStatus": "PENDING"
  },
  "redirectUrl": "/inscription/confirmation"
}
```

**Response — 422 Unprocessable Entity:**
```json
{
  "success": false,
  "message": "Erreurs de validation.",
  "errors": {
    "email": "Cette adresse email est déjà utilisée.",
    "ice": "L'ICE doit contenir exactement 15 chiffres."
  }
}
```

**Response — 429 Too Many Requests:**
```json
{
  "success": false,
  "message": "Trop de tentatives. Veuillez réessayer dans une heure."
}
```

**Response — 500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Une erreur technique est survenue. Veuillez réessayer ultérieurement."
}
```

**Server-side Logic (pseudocode):**
```
function registerEmployer(body):
  // 1. Validate all fields
  validate(body) → throw 422 on failure

  // 2. Check email domain blocklist
  if isBlockedDomain(body.email):
    throw 422 { email: "Veuillez utiliser une adresse email professionnelle." }

  // 3. Check uniqueness
  if await emailExists(body.email):
    throw 422 { email: "Cette adresse email est déjà utilisée." }
  if await iceExists(body.ice):
    throw 422 { ice: "Ce numéro ICE est déjà enregistré sur la plateforme." }

  // 4. Create Supabase Auth user
  authUser = await supabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    user_metadata: { role: "EMPLOYER" }
  })

  // 5. Create Company record
  company = await prisma.company.create({
    data: {
      userId: authUser.id,
      companyName: body.companyName,
      email: body.email,
      ice: body.ice,
      website: body.website,
      city: body.city,
      sector: body.sector,
      phone: body.phone,
      contactName: body.contactName,
      contactRole: body.contactRole,
      status: "INACTIVE",
      isVerified: false
    }
  })

  // 6. Create CompanyVerification record
  await prisma.companyVerification.create({
    data: {
      companyId: company.id,
      status: "PENDING",
      submittedAt: new Date()
    }
  })

  // 7. Send emails
  await sendEmail("employer-registration-confirm", body.email, { companyName: body.companyName })
  await sendEmail("admin-new-employer", ADMIN_EMAIL, { companyName: body.companyName, ice: body.ice })

  // 8. Return success
  return 201 { success: true, ... }
```

### 7.2 GET `/api/auth/employer/status`

**Description:** Check current employer account/verification status (used on login attempt by inactive accounts).

**Auth:** Requires valid Supabase session with role EMPLOYER

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "companyStatus": "INACTIVE",
    "verificationStatus": "PENDING",
    "submittedAt": "2026-04-01T10:00:00Z",
    "message": "Votre compte est en attente de vérification."
  }
}
```

---

## 8. Edge Cases & Technical Notes

1. **Race condition on uniqueness checks:** Use database-level unique constraints on `email` and `ice` columns in addition to application-level checks. Wrap creation in a transaction.

2. **Supabase Auth user created but Prisma insert fails:** Implement a cleanup mechanism. If the Company record fails to create, delete the Supabase Auth user. Use a try/catch with rollback.

3. **Email domain validation edge cases:**
   - Subdomains of blocked domains (e.g., `user@mail.google.com`) should also be blocked.
   - Company emails hosted on Google Workspace (custom domain) should be allowed — the check is on the domain, not the provider.
   - Consider maintaining a list of known disposable email domains (updated periodically).

4. **ICE validation:** The ICE (Identifiant Commun de l'Entreprise) is a 15-digit number assigned by the Moroccan tax authority. Server-side, consider an optional future integration to validate ICE against a public registry if available.

5. **Concurrent duplicate registration:** If two users submit at the same time with the same email/ICE, the database unique constraint will catch the second attempt. Return a friendly error message.

6. **Browser back button after registration:** The confirmation page should handle the case where the user navigates back — do not resubmit the form. Use `router.replace()` instead of `router.push()`.

7. **Session handling for inactive accounts:** When an inactive employer logs in via Supabase Auth, the middleware should detect the `INACTIVE` status and redirect to a dedicated "pending verification" page instead of the dashboard.

8. **Accessibility:** All form fields must have proper labels, ARIA attributes, and keyboard navigation support. Error messages must be associated with their fields via `aria-describedby`.
