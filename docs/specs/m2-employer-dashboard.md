# Feature Spec: Employer Dashboard

## Intent

Provide employers with a centralized dashboard to manage their job listings, view applications, track performance metrics, and manage their company profile. This is the employer's main workspace on SiyahaMag.

## User Stories Covered

| ID | User Story |
|----|-----------|
| US-2.4 | L'employeur peut voir le statut de ses offres (en attente, active, expirée) sur son tableau de bord. |
| US-2.5 | L'employeur peut consulter les candidatures reçues pour chaque offre. |
| US-2.6 | L'employeur peut télécharger le CV d'un candidat. |
| US-2.7 | L'employeur peut marquer une candidature comme vue, retenue ou refusée. |
| US-2.9 | L'employeur peut personnaliser sa page profil (logo, description, photos). |

---

## System Flow

### Dashboard Overview

1. Employer navigates to `/employeur`
2. System verifies auth + EMPLOYER role + company exists
3. Dashboard displays:
   - Summary cards: active jobs count, total applications, pending moderation, views this month
   - List of recent applications (last 5)
   - List of jobs with status indicators

### Application Management

1. Employer clicks on a job listing → sees applications list
2. Each application shows: candidate name, date, message preview, CV link, status badge
3. Employer can:
   - Click "Voir le CV" → download PDF from Supabase Storage
   - Change status: UNREAD → VIEWED → SHORTLISTED or REJECTED
4. When status changes, candidate receives email notification via Resend
5. Application list can be filtered by status

### Company Profile Management

1. Employer navigates to `/employeur/profil`
2. Form pre-filled with current company info
3. Employer can update: logo, description, city, sector, website
4. Changes saved immediately (no re-verification needed for non-critical fields)
5. Public profile page at `/entreprises/[companyId]` reflects changes

---

## Scenarios

### Success

- **View dashboard** — Employer sees summary cards and recent activity
- **View applications** — Employer sees all applications for a specific job
- **Download CV** — PDF opens in new tab from signed Supabase Storage URL
- **Mark as viewed** — Status changes, candidate notified
- **Shortlist candidate** — Status changes to SHORTLISTED, candidate notified
- **Reject candidate** — Status changes to REJECTED, candidate notified
- **Update company profile** — Logo and description updated, visible on public page

### Failure

- **No applications** — Empty state: "Aucune candidature reçue pour cette offre."
- **CV download fails** — Error: "Le CV n'est pas disponible. Le candidat a peut-être supprimé son compte."
- **Unauthorized access** — Redirect to `/connexion`
- **Unverified employer** — Banner: "Votre compte est en cours de vérification. Vous pourrez publier des offres après validation."

---

## Data

### Dashboard Summary

| Metric | Source |
|--------|--------|
| Offres actives | `JobListing.count(status: APPROVED, companyId)` |
| Candidatures reçues | `Application.count(job.companyId)` |
| En attente de modération | `JobListing.count(status: PENDING, companyId)` |
| Vues ce mois | `sum(JobListing.viewCount) for this month` |

### Application Status Change

| From | To | Email to Candidate |
|------|----|--------------------|
| UNREAD | VIEWED | "Votre candidature a été consultée" |
| VIEWED | SHORTLISTED | "Votre candidature a été retenue" |
| VIEWED | REJECTED | "Votre candidature n'a pas été retenue" |
| SHORTLISTED | REJECTED | "Votre candidature n'a pas été retenue" |

---

## Components UI

| Component | Description |
|-----------|-------------|
| `EmployerDashboard` | Main dashboard page with summary cards |
| `DashboardSummaryCards` | 4 metric cards (active jobs, applications, pending, views) |
| `JobListTable` | Table of employer's jobs with status badges and action buttons |
| `ApplicationList` | List of applications for a specific job |
| `ApplicationCard` | Individual application: name, date, message, CV link, status dropdown |
| `StatusSelect` | Dropdown to change application status |
| `CompanyProfileForm` | Form for editing company profile |
| `LogoUploader` | Image upload for company logo (Supabase Storage avatars bucket) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies/me` | Get current employer's company |
| PATCH | `/api/companies/me` | Update company profile |
| GET | `/api/jobs?companyId=mine` | List employer's jobs |
| GET | `/api/jobs/[id]/applications` | Applications for a job |
| PATCH | `/api/applications/[id]` | Change application status |
