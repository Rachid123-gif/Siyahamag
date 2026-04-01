# Feature Spec: Job Alerts

**Module:** 2B -- Candidate Side
**Feature:** Alertes emploi par email
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Allow candidates to configure email alerts that automatically notify them when new job listings matching their criteria are published on the platform. This keeps candidates engaged without requiring them to manually check the site, and increases the time-to-application for new listings. Alerts are sent via Resend when a matching job is approved by an admin and published.

---

## 2. User Stories Covered

| ID | Story | Priority |
|----|-------|----------|
| US-2.17 | En tant que candidat, je peux configurer des alertes email pour etre notifie lorsque de nouvelles offres correspondant a mes criteres sont publiees afin de ne manquer aucune opportunite. | Should |

---

## 3. System Flow

### 3.1 Creating an Alert

1. Candidate navigates to `/mes-alertes` (authenticated) or encounters the alert creation prompt on the search results page.
2. Two entry points for creating an alert:
   - **From search results:** After performing a search, a banner appears: "Recevez les nouvelles offres correspondant a cette recherche par email" with a "Creer une alerte" button. Clicking pre-fills the alert criteria from the current search filters.
   - **From alert management page:** "Creer une nouvelle alerte" button opens a creation form.
3. Alert creation form collects:
   - **Ville** (required, dropdown from cities list)
   - **Categorie de poste** (`jobCategory`, optional, dropdown)
   - **Type de contrat** (`contractType`, optional, dropdown)
   - **Region** (optional, dropdown -- broader than city)
   - **Nom de l'alerte** (auto-generated from criteria, editable, e.g., "Receptionniste a Marrakech")
4. Candidate clicks "Creer l'alerte".
5. Backend creates a `job_alerts` record with `is_active = true`.
6. Confirmation: "Alerte creee ! Vous recevrez un email des qu'une offre correspondante sera publiee."

### 3.2 Managing Alerts

1. The `/mes-alertes` page lists all of the candidate's alerts.
2. Each alert card displays:
   - Alert name
   - Criteria summary (e.g., "CDI - Receptionniste - Marrakech")
   - Active/inactive toggle switch
   - Created date
   - Number of matches sent so far
   - Edit button
   - Delete button
3. **Toggle active/inactive:** Clicking the toggle immediately updates `is_active`. Inactive alerts stop sending emails but are not deleted.
4. **Edit alert:** Opens the creation form pre-filled with current criteria. Save updates the alert.
5. **Delete alert:** Confirmation dialog: "Etes-vous sur de vouloir supprimer cette alerte ?" -> Deletes the record.

### 3.3 Alert Matching & Sending

1. When an admin approves a new job listing (sets `status = 'approved'` and `is_active = true`), a background job is triggered.
2. The job runs a query to find all active alerts matching the new job:
   ```sql
   SELECT ja.* FROM job_alerts ja
   WHERE ja.is_active = true
     AND ja.city = :jobCity
     AND (ja.job_category IS NULL OR ja.job_category = :jobCategory)
     AND (ja.contract_type IS NULL OR ja.contract_type = :jobContractType)
     AND (ja.region IS NULL OR ja.region = :jobRegion);
   ```
3. For each matching alert:
   a. Check rate limiting: has this alert already sent an email in the last 15 minutes? If yes, skip (batch will catch it).
   b. Check daily limit: has this user received more than 10 alert emails today? If yes, skip and flag for daily digest.
   c. Generate the alert email via Resend.
   d. Record the send in `alert_emails_sent` table.
4. The email is sent immediately (frequency: on job approval).

### 3.4 Alert Email Content

**Subject:** "Nouvelle offre : {jobTitle} a {city} - SiyahaMag"

**Body:**
- Greeting: "Bonjour {candidateName},"
- Introduction: "Une nouvelle offre correspondant a votre alerte "{alertName}" vient d'etre publiee :"
- Job card:
  - Job title
  - Company name
  - City
  - Contract type
  - Short description excerpt (120 chars)
  - "Voir l'offre" button -> link to job detail page
- Footer:
  - "Gerer mes alertes" link -> `/mes-alertes`
  - "Se desabonner de cette alerte" link -> one-click deactivation via signed URL
  - SiyahaMag branding

### 3.5 Unsubscribe Flow

1. Each alert email includes a "Se desabonner de cette alerte" link.
2. The link contains a signed token: `/api/alerts/:alertId/unsubscribe?token=xyz`.
3. Clicking the link:
   a. Validates the token.
   b. Sets `is_active = false` on the alert.
   c. Displays a confirmation page: "Vous ne recevrez plus d'emails pour cette alerte. Vous pouvez la reactiver depuis votre compte."
   d. Provides a "Reactiver" button and a link to `/mes-alertes`.

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| S1 | Candidate creates alert for "Receptionniste, Marrakech, CDI" | Alert created. Confirmation displayed. Alert appears in `/mes-alertes`. |
| S2 | Candidate creates alert from search results page | Alert pre-filled with current search filters. One-click creation. |
| S3 | Admin approves a new "Receptionniste CDI" job in Marrakech | All active alerts matching these criteria trigger an email to their respective candidates. |
| S4 | Candidate toggles an alert to inactive | Alert stops triggering emails. Toggle reflects "inactive" state. |
| S5 | Candidate re-activates an alert | Alert resumes triggering emails for newly published jobs. |
| S6 | Candidate edits alert criteria from Marrakech to Agadir | Alert updated. Future matches use Agadir as the city filter. |
| S7 | Candidate deletes an alert | Alert removed from list. No further emails sent. |
| S8 | Candidate clicks "Se desabonner" link in email | Alert deactivated. Confirmation page shown. |
| S9 | Candidate receives alert email and clicks "Voir l'offre" | Navigates to the job detail page. |

### 4.2 Failure / Edge Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| F1 | Candidate tries to create an alert without specifying a city | Validation error: "Veuillez selectionner une ville." |
| F2 | Candidate tries to create more than 10 alerts | Error: "Vous avez atteint le nombre maximum d'alertes (10). Veuillez supprimer une alerte existante." |
| F3 | Candidate receives more than 10 emails in one day | Subsequent alerts are suppressed. A daily digest email is sent instead: "Vous avez {count} nouvelles offres correspondant a vos alertes." |
| F4 | Unsubscribe link with invalid/expired token | Error page: "Ce lien n'est plus valide. Connectez-vous a votre compte pour gerer vos alertes." |
| F5 | Resend API is down when alert should be sent | Email is queued in `email_queue` table with retry logic (exponential backoff, max 5 retries over 24h). |
| F6 | Candidate creates a duplicate alert (same criteria as existing) | Warning: "Vous avez deja une alerte avec des criteres similaires." Allow creation but warn. |
| F7 | Alert matches a job but the user has already applied | Email is still sent (candidate may want to track market activity). |
| F8 | Admin approves 50 jobs at once (bulk) | Alerts are processed in a background queue to avoid overloading Resend. Rate limiting ensures emails are sent gradually. |

---

## 5. Data

### 5.1 Alert Creation Input

```json
{
  "name": "Receptionniste a Marrakech",
  "city": "marrakech",
  "jobCategory": "reception",
  "contractType": "cdi",
  "region": null
}
```

### 5.2 Alert Data Model

```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Receptionniste a Marrakech",
  "city": "marrakech",
  "cityLabel": "Marrakech",
  "jobCategory": "reception",
  "jobCategoryLabel": "Reception",
  "contractType": "cdi",
  "contractTypeLabel": "CDI",
  "region": null,
  "regionLabel": null,
  "isActive": true,
  "matchesSent": 12,
  "lastSentAt": "2026-03-30T11:00:00Z",
  "createdAt": "2026-03-15T10:00:00Z",
  "updatedAt": "2026-03-30T11:00:00Z"
}
```

### 5.3 Alert List Response

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Receptionniste a Marrakech",
      "criteria": "CDI - Reception - Marrakech",
      "isActive": true,
      "matchesSent": 12,
      "lastSentAt": "2026-03-30T11:00:00Z",
      "createdAt": "2026-03-15T10:00:00Z"
    },
    {
      "id": "uuid",
      "name": "Saisonnier a Agadir",
      "criteria": "Saisonnier - Agadir",
      "isActive": false,
      "matchesSent": 5,
      "lastSentAt": "2026-03-20T08:00:00Z",
      "createdAt": "2026-03-10T14:00:00Z"
    }
  ],
  "meta": {
    "total": 2,
    "maxAlerts": 10
  }
}
```

### 5.4 Alert Email Record

```json
{
  "id": "uuid",
  "alertId": "uuid",
  "jobId": "uuid",
  "sentAt": "2026-03-30T11:00:00Z",
  "resendMessageId": "msg_abc123"
}
```

### 5.5 Database Tables

```sql
-- job_alerts table
CREATE TABLE job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  job_category VARCHAR(50),
  contract_type VARCHAR(30),
  region VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  matches_sent INTEGER DEFAULT 0,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_job_alerts_active ON job_alerts(is_active) WHERE is_active = true;
CREATE INDEX idx_job_alerts_user ON job_alerts(user_id);
CREATE INDEX idx_job_alerts_city ON job_alerts(city);

-- alert_emails_sent table (for tracking and rate limiting)
CREATE TABLE alert_emails_sent (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID NOT NULL REFERENCES job_alerts(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  sent_at TIMESTAMPTZ DEFAULT now(),
  resend_message_id VARCHAR(100),
  UNIQUE(alert_id, job_id)
);

CREATE INDEX idx_alert_emails_user_date ON alert_emails_sent(user_id, sent_at);
CREATE INDEX idx_alert_emails_alert ON alert_emails_sent(alert_id);

-- email_queue table (for retry logic)
CREATE TABLE email_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_type VARCHAR(50) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body_html TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','processing','sent','failed')),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_retry_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  sent_at TIMESTAMPTZ,
  error_message TEXT
);

CREATE INDEX idx_email_queue_pending ON email_queue(status, next_retry_at)
  WHERE status IN ('pending', 'failed');
```

### 5.6 Unsubscribe Token

The unsubscribe URL uses a signed JWT token with the following payload:

```json
{
  "alertId": "uuid",
  "userId": "uuid",
  "action": "unsubscribe",
  "exp": 1711979400
}
```

Token expiry: 30 days from email send date. Signed with `ALERT_UNSUBSCRIBE_SECRET` environment variable.

---

## 6. UI Components

### 6.1 Component Tree -- Alerts Management Page

```
AlertsPage (/mes-alertes)
├── PageHeader
│   ├── PageTitle              -- "Mes alertes emploi"
│   ├── AlertCount             -- "{count}/10 alertes"
│   └── CreateAlertButton      -- "Creer une nouvelle alerte"
├── AlertList
│   └── AlertCard (repeating)
│       ├── AlertName          -- Editable label
│       ├── CriteriaSummary    -- "CDI - Reception - Marrakech"
│       ├── ActiveToggle       -- Switch on/off
│       ├── MatchesSentCount   -- "12 offres envoyees"
│       ├── LastSentDate       -- "Derniere alerte : il y a 2 jours"
│       ├── EditButton         -- Pencil icon
│       └── DeleteButton       -- Trash icon
├── EmptyState
│   ├── EmptyIcon
│   ├── EmptyMessage           -- "Vous n'avez pas encore d'alerte."
│   └── CreateAlertCTA         -- "Creer votre premiere alerte"
└── AlertFormModal (create/edit)
    ├── ModalTitle             -- "Creer une alerte" / "Modifier l'alerte"
    ├── NameInput              -- "Nom de l'alerte"
    ├── CityDropdown           -- "Ville" (required)
    ├── JobCategoryDropdown    -- "Categorie de poste" (optional)
    ├── ContractTypeDropdown   -- "Type de contrat" (optional)
    ├── RegionDropdown         -- "Region" (optional)
    ├── SaveButton             -- "Creer l'alerte" / "Enregistrer"
    └── CancelButton           -- "Annuler"
```

### 6.2 Component -- Search Page Alert Banner

```
SearchAlertBanner (shown on /offres when filters are active)
├── BannerIcon                 -- Bell icon
├── BannerText                 -- "Recevez les nouvelles offres correspondant a cette recherche par email"
├── CreateAlertButton          -- "Creer une alerte"
└── DismissButton              -- "X" (close, remembered for session)
```

### 6.3 Component -- Unsubscribe Page

```
UnsubscribePage (/alertes/desabonnement)
├── SuccessView (if token valid)
│   ├── SuccessIcon
│   ├── SuccessMessage         -- "Vous ne recevrez plus d'emails pour cette alerte."
│   ├── ReactivateButton       -- "Reactiver cette alerte"
│   └── ManageAlertsLink       -- "Gerer mes alertes"
└── ErrorView (if token invalid)
    ├── ErrorIcon
    ├── ErrorMessage           -- "Ce lien n'est plus valide."
    └── LoginLink              -- "Connectez-vous pour gerer vos alertes"
```

### 6.4 Key UI Labels (French)

| Element | Text |
|---------|------|
| Page title | "Mes alertes emploi" |
| Alert count | "{count}/10 alertes" |
| Create button | "Creer une nouvelle alerte" |
| Modal title (create) | "Creer une alerte" |
| Modal title (edit) | "Modifier l'alerte" |
| Alert name label | "Nom de l'alerte" |
| Alert name placeholder | "Ex: Receptionniste a Marrakech" |
| City label | "Ville" |
| City placeholder | "Selectionner une ville" |
| Category label | "Categorie de poste (optionnel)" |
| Category placeholder | "Toutes les categories" |
| Contract type label | "Type de contrat (optionnel)" |
| Contract type placeholder | "Tous les types" |
| Region label | "Region (optionnel)" |
| Region placeholder | "Toutes les regions" |
| Save (create) | "Creer l'alerte" |
| Save (edit) | "Enregistrer" |
| Cancel | "Annuler" |
| Toggle active | "Active" |
| Toggle inactive | "Inactive" |
| Matches sent | "{count} offre(s) envoyee(s)" |
| Last sent | "Derniere alerte : {relative date}" |
| Delete confirm | "Etes-vous sur de vouloir supprimer cette alerte ?" |
| Delete button | "Supprimer" |
| Create success | "Alerte creee ! Vous recevrez un email des qu'une offre correspondante sera publiee." |
| Update success | "Alerte mise a jour." |
| Delete success | "Alerte supprimee." |
| Max alerts error | "Vous avez atteint le nombre maximum d'alertes (10). Veuillez supprimer une alerte existante." |
| City required | "Veuillez selectionner une ville." |
| Search banner text | "Recevez les nouvelles offres correspondant a cette recherche par email" |
| Search banner CTA | "Creer une alerte" |
| Empty state | "Vous n'avez pas encore d'alerte." |
| Empty CTA | "Creer votre premiere alerte" |
| Unsubscribe success | "Vous ne recevrez plus d'emails pour cette alerte." |
| Unsubscribe reactivate | "Reactiver cette alerte" |
| Unsubscribe manage | "Gerer mes alertes" |
| Unsubscribe error | "Ce lien n'est plus valide. Connectez-vous a votre compte pour gerer vos alertes." |
| Email subject | "Nouvelle offre : {jobTitle} a {city} - SiyahaMag" |
| Email greeting | "Bonjour {name}," |
| Email intro | "Une nouvelle offre correspondant a votre alerte \"{alertName}\" vient d'etre publiee :" |
| Email CTA | "Voir l'offre" |
| Email manage | "Gerer mes alertes" |
| Email unsubscribe | "Se desabonner de cette alerte" |

### 6.5 Responsive Behavior

- **Desktop (>=1024px):** Alert cards in a grid (2 columns). Modal centered overlay.
- **Tablet (768px-1023px):** Alert cards in single column. Modal centered.
- **Mobile (<768px):** Alert cards full-width stacked. Modal becomes full-screen bottom sheet. Search alert banner is sticky at bottom of viewport.

---

## 7. API Endpoints

### 7.1 List My Alerts

```
GET /api/alerts
```

**Authentication:** Required (Bearer token).

**Response:** `200 OK` with body as in Section 5.3.

### 7.2 Create Alert

```
POST /api/alerts
```

**Authentication:** Required.

**Request Body:**

```json
{
  "name": "Receptionniste a Marrakech",
  "city": "marrakech",
  "jobCategory": "reception",
  "contractType": "cdi",
  "region": null
}
```

**Validation:**

| Field | Rule |
|-------|------|
| `name` | Optional. Auto-generated if not provided (from criteria). Max 100 characters. |
| `city` | Required. Must be a valid city slug. |
| `jobCategory` | Optional. Must be a valid category enum value. |
| `contractType` | Optional. Must be a valid contract type enum value. |
| `region` | Optional. Must be a valid region slug. |

**Business Rules:**

| Rule | Error |
|------|-------|
| User has fewer than 10 alerts | `{ "error": "MAX_ALERTS_REACHED", "message": "Vous avez atteint le nombre maximum d'alertes (10)." }` |

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "name": "Receptionniste a Marrakech",
  "message": "Alerte creee avec succes."
}
```

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR", "details": [...] }` |
| 401 | Not authenticated | `{ "error": "UNAUTHORIZED" }` |
| 403 | Max alerts reached | `{ "error": "MAX_ALERTS_REACHED", "message": "..." }` |

### 7.3 Update Alert

```
PUT /api/alerts/:id
```

**Authentication:** Required. Must be the owner.

**Request Body:** Same as create.

**Response:** `200 OK` with updated alert data.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Validation error | `{ "error": "VALIDATION_ERROR" }` |
| 401 | Not authenticated | `{ "error": "UNAUTHORIZED" }` |
| 403 | Not the owner | `{ "error": "FORBIDDEN" }` |
| 404 | Alert not found | `{ "error": "NOT_FOUND" }` |

### 7.4 Toggle Alert Active/Inactive

```
PATCH /api/alerts/:id/toggle
```

**Authentication:** Required. Must be the owner.

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "isActive": false
}
```

### 7.5 Delete Alert

```
DELETE /api/alerts/:id
```

**Authentication:** Required. Must be the owner.

**Response:** `204 No Content`

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 401 | Not authenticated | `{ "error": "UNAUTHORIZED" }` |
| 403 | Not the owner | `{ "error": "FORBIDDEN" }` |
| 404 | Alert not found | `{ "error": "NOT_FOUND" }` |

### 7.6 Unsubscribe via Email Link

```
POST /api/alerts/:id/unsubscribe
```

**Authentication:** None (uses signed token).

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Signed JWT unsubscribe token |

**Response:** `200 OK`

```json
{
  "message": "Alerte desactivee avec succes.",
  "alertId": "uuid"
}
```

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Invalid or expired token | `{ "error": "INVALID_TOKEN", "message": "Ce lien n'est plus valide." }` |
| 404 | Alert not found | `{ "error": "NOT_FOUND" }` |

### 7.7 Process Alert (Internal -- triggered on job approval)

This is not a public API endpoint. It is an internal function triggered by the job approval workflow.

```
Internal: processJobAlerts(jobId: string)
```

**Logic:**
1. Fetch the newly approved job details.
2. Query `job_alerts` for matching active alerts.
3. For each match:
   a. Check `alert_emails_sent` for duplicates (same alert + same job).
   b. Check daily send count for the user (max 10 per day).
   c. If all checks pass, send email via Resend.
   d. Insert record into `alert_emails_sent`.
   e. Increment `matches_sent` on the alert.
   f. Update `last_sent_at` on the alert.
4. If Resend fails, insert into `email_queue` for retry.

**Execution:** Runs as a Supabase Edge Function or a background job triggered by a database trigger on `jobs.status` change to `approved`.

---

## 8. Technical Notes

- **Resend integration:** Alert emails are sent via the Resend API. Each email uses a pre-designed HTML template stored in the codebase. The template supports dynamic variables (candidate name, job details, alert name, unsubscribe link).
- **Rate limiting per user:** Max 10 alert emails per user per day. Tracked via `COUNT(*) FROM alert_emails_sent WHERE user_id = :userId AND sent_at > now() - interval '24 hours'`. Excess alerts are batched into a single daily digest email sent at 08:00 UTC+1 (Morocco time).
- **Alert-to-job deduplication:** The `UNIQUE(alert_id, job_id)` constraint on `alert_emails_sent` ensures that a candidate never receives the same job through the same alert twice.
- **Unsubscribe compliance:** Every alert email must include an unsubscribe link per CAN-SPAM / GDPR requirements. The signed token approach allows one-click unsubscription without requiring login.
- **Background processing:** Alert matching runs as an async background job (not blocking the admin's approval workflow). Processing time should be under 30 seconds for up to 1000 matching alerts.
- **Monitoring:** Track email delivery rates, bounce rates, and unsubscribe rates via Resend dashboard. Alert for anomalies (e.g., bounce rate > 5%).
- **Auto-name generation:** If the candidate does not provide an alert name, it is auto-generated: `"{jobCategoryLabel} a {cityLabel}"` or `"Offres a {cityLabel}"` if no category is specified.
