# Feature Spec: Employer Verification (Module 2A)

**Module:** 2A - Employer Side
**Feature:** Employer Verification / Vérification Employeur
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Establish a trust and safety mechanism where administrators verify employer accounts before they can publish job listings. This two-sided flow allows employers to submit their registration for review, and administrators to verify ICE numbers, professional email domains, and company websites. Verified employers receive the "Entreprise vérifiée" badge displayed on their profile and job listings, signaling legitimacy to job seekers. This protects the platform from fraudulent companies and ensures the quality of the Moroccan tourism job marketplace.

---

## 2. User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|-------------------|
| US-2.2 | En tant qu'employeur, je veux soumettre mes documents pour vérification afin d'obtenir le badge "Vérifié" et gagner la confiance des candidats. | Employer can view verification status. Employer sees "En attente" status after registration. Employer receives email when status changes. Badge "Entreprise vérifiée" appears on profile and listings after approval. |
| US-2.21 | En tant qu'administrateur, je veux vérifier les documents des employeurs afin d'assurer que seules les entreprises légitimes publient des offres. | Admin can view pending verifications queue. Admin can view employer details (ICE, email domain, website). Admin can approve or reject with reason. Status transitions are logged. Emails sent on each status change. |

---

## 3. System Flow

### 3.1 Employer Side — Verification Status Tracking

```
1. Employer registers (see m2-employer-signup spec)
   → CompanyVerification status = PENDING
   → Employer receives email: "Inscription reçue, en attente de vérification"

2. Employer logs in while INACTIVE
   → Middleware detects INACTIVE status
   → Redirects to /employeur/verification-en-attente

3. Page shows:
   - Current status (En attente / Rejeté)
   - Submitted date
   - Estimated review time
   - If REJECTED: rejection reason + option to update info and resubmit

4. If admin approves:
   → Company status = ACTIVE, isVerified = true
   → CompanyVerification status = VERIFIED
   → Email sent: "Votre compte a été vérifié"
   → Employer can now log in to full dashboard

5. If admin rejects:
   → Company status remains INACTIVE
   → CompanyVerification status = REJECTED with reason
   → Email sent: "Vérification refusée" with reason
   → Employer can update info and resubmit
```

### 3.2 Admin Side — Verification Review

```
1. Admin navigates to /admin/verifications
2. System displays queue of pending verifications, ordered by submission date (oldest first)
3. Admin clicks on a pending employer to review
4. System shows employer detail panel:
   a. Company name, ICE, sector, city
   b. Professional email + domain analysis
   c. Website (clickable link, opens in new tab)
   d. Contact person info
   e. Registration date
   f. Any previous verification attempts (if resubmission)
5. Admin performs manual checks:
   a. ICE validity: cross-reference if possible
   b. Email domain: visit domain, check it matches company
   c. Website: verify it's a real business, matches company name/sector
   d. Overall coherence of submitted information
6. Admin chooses action:
   a. APPROVE → sets VERIFIED + ACTIVE
   b. REJECT → must provide reason (dropdown + free text)
   c. REQUEST_INFO → (future: ask employer for additional documents)
7. System processes the action:
   a. Updates CompanyVerification record
   b. Updates Company status
   c. Logs the action with admin userId and timestamp
   d. Sends appropriate email to employer
8. Verification is removed from pending queue
```

### 3.3 Resubmission Flow (After Rejection)

```
1. Employer receives rejection email with reason
2. Employer logs in → sees /employeur/verification-en-attente with rejection details
3. Employer updates their company information (fields that caused rejection)
4. Employer clicks "Soumettre à nouveau pour vérification"
5. System:
   a. Creates NEW CompanyVerification record (status: PENDING)
   b. Keeps old record for audit trail
   c. Sends notification to admin
6. Employer sees updated status: "En attente de vérification (soumis à nouveau)"
7. Admin reviews again with access to previous rejection history
```

### 3.4 State Machine

```
CompanyVerification.status:

  ┌──────────┐
  │ PENDING  │──── admin approves ────→ ┌──────────┐
  │          │                           │ VERIFIED │
  └──────────┘                           └──────────┘
       │
       │ admin rejects
       ▼
  ┌──────────┐
  │ REJECTED │──── employer resubmits ──→ NEW record: PENDING
  └──────────┘

Company.status:

  ┌──────────┐                           ┌──────────┐
  │ INACTIVE │──── verification approved ─→│  ACTIVE  │
  └──────────┘                           └──────────┘
       │                                       │
       │                      admin suspends   │
       │                           ┌───────────┘
       │                           ▼
       │                     ┌───────────┐
       │                     │ SUSPENDED │
       │                     └───────────┘
       │                           │
       │     admin reactivates     │
       │           ┌───────────────┘
       ▼           ▼
    (stays INACTIVE until approved)
```

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| S1 | Admin approves employer | CompanyVerification is PENDING | Admin clicks "Approuver" | Status → VERIFIED, Company → ACTIVE, isVerified = true, badge granted, email sent to employer |
| S2 | Admin rejects employer with reason | CompanyVerification is PENDING | Admin selects reason, adds note, clicks "Rejeter" | Status → REJECTED, Company stays INACTIVE, email with reason sent to employer |
| S3 | Employer resubmits after rejection | CompanyVerification is REJECTED | Employer updates info, clicks "Soumettre à nouveau" | New CompanyVerification (PENDING) created, old record preserved, admin notified |
| S4 | Admin approves resubmission | Resubmitted CompanyVerification is PENDING | Admin reviews updated info, approves | Same as S1, employer finally gets access |
| S5 | Employer views pending status | CompanyVerification is PENDING | Employer logs in | Shown waiting page with status, submitted date, estimated time |
| S6 | Employer views rejection reason | CompanyVerification is REJECTED | Employer logs in | Shown rejection reason, editable fields, resubmit button |
| S7 | Admin views verification history | Multiple verification records exist | Admin opens employer detail | All verification attempts shown chronologically |

### 4.2 Failure Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|----------------|
| F1 | Admin rejects without reason | CompanyVerification is PENDING | Admin clicks "Rejeter" without selecting reason | Error: "Veuillez indiquer le motif du rejet." Button disabled until reason provided. |
| F2 | Duplicate approval attempt | CompanyVerification already VERIFIED | Admin somehow sends approve request again | Server returns 409: "Cette vérification a déjà été traitée." No duplicate processing. |
| F3 | Employer tries to access dashboard while INACTIVE | Company status is INACTIVE | Employer navigates to /employeur/dashboard | Middleware redirects to /employeur/verification-en-attente |
| F4 | Employer tries to post job while INACTIVE | Company status is INACTIVE | Employer calls POST /api/jobs | Server returns 403: "Votre compte doit être vérifié avant de publier des offres." |
| F5 | Resubmission with unchanged info | CompanyVerification is REJECTED | Employer resubmits without changing anything | Allowed (admin may have made an error), but admin sees "Aucune modification détectée" warning |
| F6 | Concurrent admin actions | Two admins review same employer | Both click approve/reject simultaneously | Database transaction ensures only one action processes. Second admin gets 409 conflict. |
| F7 | Email delivery failure | Approval processed | Email service fails | Action still completes. Failed email logged. Retry queue picks it up. Employer can check status on next login. |
| F8 | Admin navigates to non-existent verification | Invalid verification ID in URL | Admin accesses /admin/verifications/invalid-id | 404 page: "Vérification introuvable." |

---

## 5. Data

### 5.1 Input — Admin Verification Decision

```typescript
interface VerificationDecisionRequest {
  verificationId: string;
  action: "APPROVE" | "REJECT";
  rejectionCategory?: RejectionCategory;  // Required if action is REJECT
  rejectionNote?: string;                 // Optional free-text detail
  adminNotes?: string;                    // Internal notes, not shared with employer
}

enum RejectionCategory {
  INVALID_ICE = "ICE invalide ou introuvable",
  EMAIL_MISMATCH = "L'email ne correspond pas au domaine de l'entreprise",
  FAKE_WEBSITE = "Le site web n'est pas légitime ou ne correspond pas",
  INCOMPLETE_INFO = "Informations incomplètes ou incohérentes",
  DUPLICATE_COMPANY = "Entreprise déjà enregistrée",
  SUSPECTED_FRAUD = "Suspicion de fraude",
  OTHER = "Autre motif"
}
```

### 5.2 Input — Employer Resubmission

```typescript
interface ResubmissionRequest {
  companyName?: string;    // Updated fields only
  ice?: string;
  website?: string;
  city?: City;
  sector?: CompanySector;
  phone?: string;
  contactName?: string;
  contactRole?: string;
  message?: string;        // Optional message to admin explaining changes
}
```

### 5.3 Output — Verification Queue Item (Admin View)

```typescript
interface VerificationQueueItem {
  verificationId: string;
  company: {
    id: string;
    companyName: string;
    email: string;
    emailDomain: string;
    ice: string;
    website: string;
    city: string;
    sector: string;
    phone: string;
    contactName: string;
    contactRole: string;
  };
  submittedAt: DateTime;
  isResubmission: boolean;
  previousAttempts: number;
  previousRejectionReason: string | null;
}
```

### 5.4 Output — Employer Verification Status (Employer View)

```typescript
interface EmployerVerificationStatus {
  status: "PENDING" | "VERIFIED" | "REJECTED";
  submittedAt: DateTime;
  reviewedAt: DateTime | null;
  rejectionCategory: string | null;
  rejectionNote: string | null;
  previousAttempts: VerificationAttempt[];
  canResubmit: boolean;          // true if REJECTED
  estimatedReviewTime: string;   // "24 à 48 heures ouvrées"
}

interface VerificationAttempt {
  status: "VERIFIED" | "REJECTED";
  submittedAt: DateTime;
  reviewedAt: DateTime;
  rejectionCategory: string | null;
  rejectionNote: string | null;
}
```

### 5.5 Database: VerificationLog (Audit Trail)

```typescript
{
  id: string;                     // cuid
  verificationId: string;         // FK to CompanyVerification
  companyId: string;              // FK to Company
  action: "APPROVED" | "REJECTED";
  adminUserId: string;            // FK to admin user
  rejectionCategory: string | null;
  rejectionNote: string | null;
  adminNotes: string | null;      // Internal, never shown to employer
  previousStatus: VerificationStatus;
  newStatus: VerificationStatus;
  createdAt: DateTime;
}
```

### 5.6 Email Templates

| Email | Recipient | Subject (FR) | Content Summary | Trigger |
|-------|-----------|-------------|-----------------|---------|
| verification-pending | Employer | Votre inscription est en cours de vérification | Status confirmation, estimated time, next steps | On registration / resubmission |
| verification-approved | Employer | Félicitations ! Votre entreprise est vérifiée | Badge granted, can now post jobs, link to dashboard | Admin approves |
| verification-rejected | Employer | Vérification de votre compte - Action requise | Rejection reason, what to fix, link to resubmit | Admin rejects |
| admin-new-verification | Admin | Nouvelle vérification en attente : {companyName} | Company summary, link to review | On registration / resubmission |
| admin-resubmission | Admin | Vérification resoumise : {companyName} | Previous rejection reason, changes made, link to review | On resubmission |

---

## 6. UI Components

### 6.1 Admin: Verification Queue — `/admin/verifications`

```
┌─────────────────────────────────────────────────────────────┐
│  Administration > Vérifications employeurs                   │
│                                                               │
│  ┌─── Filtres ──────────────────────────────────────────┐   │
│  │ Statut: [Tous ▼] [En attente ▼] [Vérifié ▼]        │   │
│  │         [Rejeté ▼]                                    │   │
│  │ Recherche: [_________________________] 🔍             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  En attente de vérification (12)                             │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🏢 Riad Atlas Marrakech                              │   │
│  │ ICE: 001234567890123 | Hôtellerie | Marrakech        │   │
│  │ contact@riad-atlas.ma | www.riad-atlas.ma            │   │
│  │ Soumis le : 01/04/2026 à 10:00                       │   │
│  │ ⚡ Première soumission                                │   │
│  │                              [Examiner →]             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 🏢 Transport Sahara Tours                            │   │
│  │ ICE: 009876543210123 | Transport | Ouarzazate        │   │
│  │ info@sahara-tours.ma | www.sahara-tours.ma           │   │
│  │ Soumis le : 31/03/2026 à 14:30                       │   │
│  │ 🔄 Resoumission (rejeté le 30/03 - ICE invalide)    │   │
│  │                              [Examiner →]             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  [◀ Précédent]  Page 1 sur 2  [Suivant ▶]                  │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Admin: Verification Detail — `/admin/verifications/[id]`

```
┌─────────────────────────────────────────────────────────────┐
│  ← Retour aux vérifications                                 │
│                                                               │
│  Vérification de : Riad Atlas Marrakech                      │
│  Statut actuel : 🟡 En attente                               │
│                                                               │
│  ┌─── Informations de l'entreprise ────────────────────┐    │
│  │                                                       │    │
│  │  Nom :        Riad Atlas Marrakech                   │    │
│  │  ICE :        001234567890123  [Vérifier ↗]          │    │
│  │  Secteur :    Hôtellerie                             │    │
│  │  Ville :      Marrakech                              │    │
│  │  Site web :   www.riad-atlas.ma  [Ouvrir ↗]         │    │
│  │  Téléphone :  +212 624 123 456                       │    │
│  │                                                       │    │
│  │  ── Responsable ──                                   │    │
│  │  Nom :      Fatima Benali                            │    │
│  │  Fonction : Directrice des Ressources Humaines       │    │
│  │  Email :    f.benali@riad-atlas.ma                   │    │
│  │                                                       │    │
│  │  ── Analyse du domaine email ──                      │    │
│  │  Domaine : riad-atlas.ma                             │    │
│  │  Correspond au site web : ✅ Oui                     │    │
│  │  Domaine créé le : 15/06/2019                        │    │
│  │                                                       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Historique des vérifications ────────────────────┐    │
│  │  Aucune tentative précédente (première soumission)   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Notes internes (non visibles par l'employeur) ──┐    │
│  │  [________________________________________________] │    │
│  │  [________________________________________________] │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─── Décision ──────────────────────────────────────────┐  │
│  │                                                         │  │
│  │  [  ✓ Approuver  ]    [  ✗ Rejeter  ]                 │  │
│  │                                                         │  │
│  │  ── Si rejet : ──                                      │  │
│  │  Motif : [▼ Sélectionner un motif________________]    │  │
│  │  Détails :                                             │  │
│  │  [________________________________________________]   │  │
│  │  [________________________________________________]   │  │
│  │                                                         │  │
│  │  [   Confirmer la décision   ]                         │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Employer: Verification Pending — `/employeur/verification-en-attente`

```
┌─────────────────────────────────────────────────────────────┐
│  SiyahaMag Logo                                              │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │          ⏳ Vérification en cours                     │    │
│  │                                                       │    │
│  │  Votre compte est en attente de vérification          │    │
│  │  par notre équipe.                                    │    │
│  │                                                       │    │
│  │  ── Statut ──                                        │    │
│  │  📋 Soumis le : 01/04/2026 à 10:00                  │    │
│  │  ⏱  Délai estimé : 24 à 48 heures ouvrées           │    │
│  │                                                       │    │
│  │  Nous vérifions les informations suivantes :          │    │
│  │  • Numéro ICE de votre entreprise                    │    │
│  │  • Domaine de votre adresse email                    │    │
│  │  • Site web de l'entreprise                          │    │
│  │                                                       │    │
│  │  Vous recevrez un email dès que la vérification      │    │
│  │  sera terminée.                                       │    │
│  │                                                       │    │
│  │  Des questions ? support@siyahamag.com               │    │
│  │                                                       │    │
│  │  [  Se déconnecter  ]                                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 6.4 Employer: Verification Rejected — `/employeur/verification-en-attente` (rejected state)

```
┌─────────────────────────────────────────────────────────────┐
│  SiyahaMag Logo                                              │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                       │    │
│  │          ❌ Vérification refusée                      │    │
│  │                                                       │    │
│  │  Votre demande de vérification a été refusée.         │    │
│  │                                                       │    │
│  │  ── Motif du rejet ──                                │    │
│  │  ┌─────────────────────────────────────────────┐     │    │
│  │  │ ICE invalide ou introuvable                  │     │    │
│  │  │                                               │     │    │
│  │  │ Le numéro ICE que vous avez fourni ne        │     │    │
│  │  │ correspond à aucune entreprise enregistrée.  │     │    │
│  │  │ Veuillez vérifier votre numéro et le         │     │    │
│  │  │ corriger.                                     │     │    │
│  │  └─────────────────────────────────────────────┘     │    │
│  │                                                       │    │
│  │  ── Corriger et resoumettre ──                       │    │
│  │                                                       │    │
│  │  Numéro ICE *                                        │    │
│  │  [001234567890123_____________________]              │    │
│  │                                                       │    │
│  │  Message à l'équipe (optionnel)                      │    │
│  │  [________________________________________________] │    │
│  │                                                       │    │
│  │  [ Soumettre à nouveau pour vérification ]           │    │
│  │                                                       │    │
│  │  [  Se déconnecter  ]                                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 6.5 Badge Component — "Entreprise vérifiée"

```
┌──────────────────────────┐
│ ✓ Entreprise vérifiée    │   (green background, white text, shield icon)
└──────────────────────────┘
```

Displayed on:
- Company profile page (next to company name)
- Each job listing card in search results
- Job detail page header
- Employer dashboard header

### 6.6 Component Tree

```
AdminVerificationQueuePage (app/admin/verifications/page.tsx)
├── PageHeader ("Vérifications employeurs")
├── VerificationFilters
│   ├── StatusFilter (Select: Tous / En attente / Vérifié / Rejeté)
│   └── SearchInput
├── VerificationList
│   ├── VerificationCard (repeated)
│   │   ├── CompanyIcon
│   │   ├── CompanyNameBadge
│   │   ├── CompanyMetadata (ICE, sector, city)
│   │   ├── ContactInfo (email, website)
│   │   ├── SubmissionInfo (date, resubmission indicator)
│   │   └── ReviewButton ("Examiner")
│   └── EmptyState ("Aucune vérification en attente")
└── Pagination

AdminVerificationDetailPage (app/admin/verifications/[id]/page.tsx)
├── BackLink
├── PageHeader (company name + current status badge)
├── CompanyInfoPanel
│   ├── CompanyDetails
│   ├── ContactDetails
│   └── EmailDomainAnalysis
├── VerificationHistoryPanel
│   └── VerificationAttemptCard (repeated)
├── AdminNotesTextarea
└── DecisionPanel
    ├── ApproveButton
    ├── RejectButton
    ├── RejectionReasonSelect (conditional)
    ├── RejectionDetailTextarea (conditional)
    └── ConfirmButton

EmployerVerificationPage (app/employeur/verification-en-attente/page.tsx)
├── Logo
├── StatusIcon (pending or rejected)
├── StatusTitle
├── StatusDescription
├── PendingContent (if PENDING)
│   ├── SubmissionDetails
│   ├── ChecklistInfo
│   └── SupportContact
├── RejectedContent (if REJECTED)
│   ├── RejectionReasonCard
│   ├── EditableFields (only fields related to rejection)
│   ├── MessageTextarea
│   └── ResubmitButton
└── LogoutButton

VerifiedBadge (components/ui/verified-badge.tsx)
├── ShieldIcon (green)
└── Text ("Entreprise vérifiée")
```

---

## 7. API Endpoints

### 7.1 GET `/api/admin/verifications`

**Description:** Retrieve the verification queue for admin review.

**Auth:** Requires Supabase session with role ADMIN.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| status | string | "PENDING" | Filter: PENDING, VERIFIED, REJECTED, ALL |
| search | string | — | Search by company name, ICE, or email |
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 50) |
| sort | string | "submittedAt" | Sort field |
| order | string | "asc" | Sort order: asc, desc |

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "verificationId": "clxyz...",
        "company": {
          "id": "clabc...",
          "companyName": "Riad Atlas Marrakech",
          "email": "contact@riad-atlas.ma",
          "emailDomain": "riad-atlas.ma",
          "ice": "001234567890123",
          "website": "https://www.riad-atlas.ma",
          "city": "MARRAKECH",
          "sector": "HOTELLERIE",
          "phone": "+212624123456",
          "contactName": "Fatima Benali",
          "contactRole": "Directrice RH"
        },
        "status": "PENDING",
        "submittedAt": "2026-04-01T10:00:00Z",
        "isResubmission": false,
        "previousAttempts": 0,
        "previousRejectionReason": null
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    }
  }
}
```

### 7.2 GET `/api/admin/verifications/[id]`

**Description:** Get detailed verification info for a specific employer.

**Auth:** Requires Supabase session with role ADMIN.

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "verification": {
      "id": "clxyz...",
      "status": "PENDING",
      "submittedAt": "2026-04-01T10:00:00Z",
      "reviewedAt": null,
      "reviewedBy": null
    },
    "company": {
      "id": "clabc...",
      "companyName": "Riad Atlas Marrakech",
      "email": "contact@riad-atlas.ma",
      "emailDomain": "riad-atlas.ma",
      "ice": "001234567890123",
      "website": "https://www.riad-atlas.ma",
      "city": "MARRAKECH",
      "sector": "HOTELLERIE",
      "phone": "+212624123456",
      "contactName": "Fatima Benali",
      "contactRole": "Directrice RH",
      "status": "INACTIVE",
      "createdAt": "2026-04-01T10:00:00Z"
    },
    "history": [
      {
        "verificationId": "clxyz...",
        "status": "PENDING",
        "submittedAt": "2026-04-01T10:00:00Z",
        "reviewedAt": null,
        "rejectionCategory": null,
        "rejectionNote": null
      }
    ]
  }
}
```

**Response — 404 Not Found:**
```json
{
  "success": false,
  "message": "Vérification introuvable."
}
```

### 7.3 POST `/api/admin/verifications/[id]/decide`

**Description:** Approve or reject an employer verification.

**Auth:** Requires Supabase session with role ADMIN.

**Request Body:**
```typescript
{
  action: "APPROVE" | "REJECT";
  rejectionCategory?: RejectionCategory;  // Required if REJECT
  rejectionNote?: string;                 // Optional detail for REJECT
  adminNotes?: string;                    // Internal notes
}
```

**Response — 200 OK (Approved):**
```json
{
  "success": true,
  "message": "Employeur vérifié avec succès.",
  "data": {
    "verificationStatus": "VERIFIED",
    "companyStatus": "ACTIVE",
    "emailSent": true
  }
}
```

**Response — 200 OK (Rejected):**
```json
{
  "success": true,
  "message": "Vérification rejetée.",
  "data": {
    "verificationStatus": "REJECTED",
    "companyStatus": "INACTIVE",
    "rejectionCategory": "INVALID_ICE",
    "emailSent": true
  }
}
```

**Response — 409 Conflict:**
```json
{
  "success": false,
  "message": "Cette vérification a déjà été traitée."
}
```

**Response — 422 Unprocessable Entity:**
```json
{
  "success": false,
  "message": "Veuillez indiquer le motif du rejet.",
  "errors": {
    "rejectionCategory": "Ce champ est obligatoire pour un rejet."
  }
}
```

**Server-side Logic:**
```
function decideVerification(id, body, adminUser):
  // 1. Fetch verification
  verification = await prisma.companyVerification.findUnique({ where: { id } })
  if !verification → throw 404

  // 2. Check not already processed
  if verification.status !== "PENDING" → throw 409

  // 3. Validate rejection reason
  if body.action === "REJECT" && !body.rejectionCategory → throw 422

  // 4. Transaction
  await prisma.$transaction([
    // Update verification
    prisma.companyVerification.update({
      where: { id },
      data: {
        status: body.action === "APPROVE" ? "VERIFIED" : "REJECTED",
        reviewedAt: new Date(),
        reviewedBy: adminUser.id,
        rejectionReason: body.rejectionCategory
          ? `${body.rejectionCategory}: ${body.rejectionNote || ""}`
          : null
      }
    }),

    // Update company status
    prisma.company.update({
      where: { id: verification.companyId },
      data: {
        status: body.action === "APPROVE" ? "ACTIVE" : "INACTIVE",
        isVerified: body.action === "APPROVE"
      }
    }),

    // Create audit log
    prisma.verificationLog.create({
      data: {
        verificationId: id,
        companyId: verification.companyId,
        action: body.action === "APPROVE" ? "APPROVED" : "REJECTED",
        adminUserId: adminUser.id,
        rejectionCategory: body.rejectionCategory || null,
        rejectionNote: body.rejectionNote || null,
        adminNotes: body.adminNotes || null,
        previousStatus: "PENDING",
        newStatus: body.action === "APPROVE" ? "VERIFIED" : "REJECTED"
      }
    })
  ])

  // 5. Send email
  company = await prisma.company.findUnique({ where: { id: verification.companyId } })
  if body.action === "APPROVE":
    await sendEmail("verification-approved", company.email, { companyName: company.companyName })
  else:
    await sendEmail("verification-rejected", company.email, {
      companyName: company.companyName,
      reason: body.rejectionCategory,
      detail: body.rejectionNote
    })

  return 200
```

### 7.4 GET `/api/employer/verification-status`

**Description:** Get current verification status for the logged-in employer.

**Auth:** Requires Supabase session with role EMPLOYER.

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "status": "PENDING",
    "submittedAt": "2026-04-01T10:00:00Z",
    "reviewedAt": null,
    "rejectionCategory": null,
    "rejectionNote": null,
    "canResubmit": false,
    "estimatedReviewTime": "24 à 48 heures ouvrées",
    "previousAttempts": []
  }
}
```

### 7.5 POST `/api/employer/verification/resubmit`

**Description:** Resubmit company info for verification after rejection.

**Auth:** Requires Supabase session with role EMPLOYER. Company must have a REJECTED verification.

**Request Body:**
```typescript
{
  companyName?: string;
  ice?: string;
  website?: string;
  city?: City;
  sector?: CompanySector;
  phone?: string;
  contactName?: string;
  contactRole?: string;
  message?: string;
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "message": "Votre demande a été resoumise avec succès.",
  "data": {
    "verificationId": "clnew...",
    "status": "PENDING",
    "submittedAt": "2026-04-02T09:00:00Z"
  }
}
```

**Response — 403 Forbidden:**
```json
{
  "success": false,
  "message": "Vous ne pouvez resoumettre que si votre vérification a été rejetée."
}
```

---

## 8. Edge Cases & Technical Notes

1. **Optimistic locking for concurrent admin decisions:** Store a `version` or `updatedAt` timestamp on the CompanyVerification record. When an admin submits a decision, include the version they loaded. If it changed (another admin decided), return 409 Conflict.

2. **Admin audit trail completeness:** Every decision must be logged in `VerificationLog` regardless of outcome. This is non-negotiable for compliance and dispute resolution.

3. **Resubmission limits:** Consider implementing a maximum number of resubmissions (e.g., 3) to prevent abuse. After max attempts, employer must contact support directly.

4. **Email domain analysis:** The admin detail page could show WHOIS-like info for the email domain (creation date, registrar). This is informational only and should not block the verification flow.

5. **Webhook for external ICE validation:** If a public API for Moroccan ICE validation becomes available, integrate it as an optional automated check. The admin always has the final decision.

6. **Batch operations:** For a future version, consider allowing admins to bulk-approve/reject verifications from the queue page. Current spec requires individual review for safety.

7. **Notification preferences:** Admins should be able to configure whether they receive email notifications for new verifications or just check the dashboard.

8. **Data privacy:** Employer information submitted for verification should be handled per CNDP (Commission Nationale de controle de la protection des Donnees a caractere Personnel) guidelines. Admin notes are internal and never exposed to the employer.
