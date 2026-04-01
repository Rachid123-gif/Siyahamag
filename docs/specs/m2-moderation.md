# Feature Spec: Admin Moderation (Jobs & Employers)

## Intent

Enable administrators to maintain platform quality by reviewing and approving/rejecting job listings and employer accounts. Handle user reports of suspicious content. Ensure only legitimate, tourism-related job postings appear on SiyahaMag.

## User Stories Covered

| ID | User Story |
|----|-----------|
| US-2.20 | L'admin peut approuver ou rejeter une offre en attente pour garantir la qualité du contenu. |
| US-2.21 | L'admin peut vérifier les documents d'un employeur pour s'assurer que c'est une vraie entreprise. |
| US-2.22 | L'admin peut traiter les signalements pour maintenir la confiance sur la plateforme. |

---

## System Flow

### Job Moderation

1. Admin navigates to `/admin/moderation/offres`
2. System displays queue of pending jobs (status: PENDING), ordered by submission date (oldest first)
3. Admin clicks on a job to review
4. Review page shows:
   - Full job listing content
   - Employer profile (company name, ICE, verification status, website)
   - Previous moderation history for this employer
5. Admin can:
   - **Approve** → status changes to APPROVED, `approvedAt` set, employer notified by email
   - **Reject** → must provide reason, status changes to REJECTED, employer notified with reason
6. Action logged in `ModerationLog`

### Employer Verification

1. Admin navigates to `/admin/moderation/entreprises`
2. System displays pending employer accounts (CompanyVerification: PENDING)
3. Admin reviews: company name, ICE, professional email, website link
4. Admin can:
   - **Verify** → CompanyVerification changes to VERIFIED, `verifiedAt` set, employer notified
   - **Reject** → must provide reason, employer notified with reason
5. Action logged in `ModerationLog`

### Report Handling

1. Admin navigates to `/admin/signalements`
2. System displays all pending reports (status: PENDING)
3. Each report shows: target (job or investment), reason, reporter email, date
4. Admin reviews the reported content and can:
   - **Dismiss** → report status changes to DISMISSED (false positive)
   - **Resolve** → report status changes to RESOLVED, admin takes action on the content (disable job, contact employer, etc.)
5. Action logged in `ModerationLog`

---

## Scenarios

### Success

- **Approve job** — Job becomes visible to candidates, employer gets approval email
- **Reject job** — Employer notified with specific reason, can edit and resubmit
- **Verify employer** — Company gets "Vérifié" badge, can now publish jobs
- **Reject employer** — Employer notified with reason (e.g., invalid ICE, no website)
- **Dismiss false report** — Report marked as dismissed, no action on content
- **Resolve valid report** — Job disabled or removed, reporter thanked

### Failure

- **Reject without reason** — Error: "Veuillez indiquer le motif du rejet."
- **Empty queue** — Message: "Aucun élément en attente de modération."

### Rejection Criteria for Jobs

- Description not clear or too short
- Unrealistic salary (too low or suspiciously high)
- Asking candidates for money
- Company not verified
- Not related to tourism sector
- Duplicate posting
- Discriminatory content

---

## Data

### Moderation Log Entry

| Field | Type | Description |
|-------|------|-------------|
| action | string | APPROVE, REJECT, VERIFY, DISMISS, RESOLVE |
| targetType | string | COMPANY, JOB_LISTING, INVESTMENT, REPORT |
| targetId | string | ID of the target |
| reason | string? | Required for REJECT actions |
| adminId | string | Admin who performed the action |

---

## Components UI

| Component | Description |
|-----------|-------------|
| `ModerationQueue` | Tabbed view: Offres / Entreprises / Signalements |
| `JobModerationCard` | Full job preview with employer info and action buttons |
| `EmployerVerificationCard` | Company details (ICE, email, website) with verify/reject buttons |
| `ReportCard` | Report details with target content preview and action buttons |
| `RejectionDialog` | Modal with textarea for rejection reason (required) |
| `ModerationBadge` | Badge showing queue count per category |
| `ModerationHistory` | Timeline of past moderation actions for an employer |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/moderation/jobs` | Pending jobs queue |
| PATCH | `/api/admin/moderation/jobs/[id]` | Approve or reject a job |
| GET | `/api/admin/moderation/companies` | Pending employer verifications |
| PATCH | `/api/admin/moderation/companies/[id]` | Verify or reject employer |
| GET | `/api/admin/reports` | All reports |
| PATCH | `/api/admin/reports/[id]` | Dismiss or resolve report |
