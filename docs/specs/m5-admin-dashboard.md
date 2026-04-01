# M5 — Global Admin Dashboard

## Intent

Provide platform administrators with a single command center that surfaces all critical platform metrics, gives immediate access to every moderation queue, and enables management of user accounts. The dashboard is the first page an admin sees upon login and must answer the question "What needs my attention right now?" within seconds. It aggregates data from every module (articles, jobs, investments, users) into a unified view.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-5.1 | En tant qu'administrateur, je veux voir un tableau de bord global avec des metriques afin de suivre l'activite de la plateforme. | Dashboard displays at minimum: total visitors (current month), published articles, active job listings, applications received, active investments, and registered users. Each metric shows current value and trend vs. previous period. |
| US-5.2 | En tant qu'administrateur, je veux acceder rapidement aux files d'attente de moderation afin de traiter les elements en attente. | Moderation section shows: pending job listings count, pending investment listings count, pending employer verifications count. Each item links to the corresponding moderation page. |
| US-5.3 | En tant qu'administrateur, je veux pouvoir suspendre un compte en cas d'abus afin de proteger la communaute. | User management table lists all accounts. Admin can suspend or delete an account. Suspended users cannot log in or perform actions. |

---

## System Flow

### Dashboard Load

```
1. Admin navigates to /admin (or /admin/dashboard).
2. Server component checks authentication and admin role.
   - Not authenticated: redirect to /connexion
   - Not admin: redirect to / with 403 toast
3. Server fetches dashboard data via server action or API:
   a. GET /api/admin/dashboard/metrics
   b. GET /api/admin/dashboard/moderation-counts
   c. GET /api/admin/dashboard/recent-activity
4. Page renders three main sections:
   a. Metrics cards (top)
   b. Moderation queues (middle)
   c. Recent activity feed (bottom)
```

### View Moderation Queues

```
1. Dashboard shows moderation cards with counts:
   - "Offres d'emploi en attente" — count badge
   - "Investissements en attente" — count badge
   - "Verifications employeurs en attente" — count badge
   - "Signalements a traiter" — count badge
2. Admin clicks on a moderation card.
3. Navigation to the corresponding moderation page:
   - /admin/emplois/moderation
   - /admin/investissements/moderation
   - /admin/employeurs/verifications
   - /admin/signalements
```

### User Management — List

```
1. Admin clicks "Utilisateurs" in the admin sidebar (or navigates to /admin/utilisateurs).
2. Page loads with a paginated table of all users.
3. Filters available:
   - Role: All, Candidat, Employeur, Investisseur, Admin
   - Status: All, Actif, Suspendu
   - Search: by name or email
4. Table columns: Name, Email, Role, Status, Registration date, Last login, Actions.
```

### User Management — Suspend Account

```
1. Admin finds the user in the table.
2. Admin clicks "Suspendre" in the actions column.
3. Confirmation dialog:
   "Etes-vous sur de vouloir suspendre le compte de {userName} ?
   L'utilisateur ne pourra plus se connecter ni effectuer d'actions."
4. Admin confirms.
5. Client sends PATCH /api/admin/users/[id]/suspend
6. Server:
   a. Sets user status to SUSPENDED.
   b. Invalidates all active sessions for this user.
   c. If user has active listings (jobs or investments), sets them to WITHDRAWN.
7. Server responds 200.
8. Toast: "Compte suspendu."
9. Table row updates: status badge changes to "Suspendu".
```

### User Management — Reactivate Account

```
1. Admin finds a suspended user.
2. Admin clicks "Reactiver".
3. Client sends PATCH /api/admin/users/[id]/reactivate
4. Server sets user status to ACTIVE.
5. Toast: "Compte reactive."
6. Previously withdrawn listings are NOT automatically re-published (seller must re-submit).
```

### User Management — Delete Account

```
1. Admin clicks "Supprimer" on a user.
2. Confirmation dialog with strong warning:
   "Attention : la suppression du compte de {userName} est irreversible.
   Toutes les annonces, candidatures et donnees associees seront supprimees."
3. Admin types the user's email to confirm (safety measure).
4. Client sends DELETE /api/admin/users/[id]
5. Server:
   a. Soft-deletes the user (anonymizes personal data, marks as deleted).
   b. Cascades: withdraws/deletes all related listings.
   c. Sends a notification email to the user informing them of the deletion.
6. Toast: "Compte supprime."
```

### Reports Management

```
1. Admin navigates to /admin/signalements.
2. Centralized list of all reports across all modules:
   - Investment reports (from M4)
   - Job listing reports (from M2, if applicable)
3. Each row shows: type (investissement/emploi), listing title, reason, reporter, date, status.
4. Admin can filter by type, status (pending/reviewed/dismissed).
5. Clicking a report navigates to the specific listing with admin actions available.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | Admin logs in and sees the dashboard | All six metric cards load with current values and trend indicators. |
| S2 | There are 3 pending investments and 2 pending jobs | Moderation cards show badges: "Investissements (3)", "Emplois (2)". |
| S3 | Admin clicks on "Investissements en attente" | Navigated to /admin/investissements/moderation with the 3 pending listings. |
| S4 | Admin suspends a user account | User status changes to SUSPENDED. User's active session is invalidated. User cannot log in. |
| S5 | Admin reactivates a suspended account | User can log in again. Status badge changes to "Actif". |
| S6 | Admin deletes a user account | User data anonymized. All associated listings withdrawn. Confirmation email sent. |
| S7 | Admin filters users by role = "Employeur" | Table shows only employer accounts. |
| S8 | Admin searches for a user by email | Table filters to matching users instantly (debounced search). |
| S9 | No pending moderation items | Moderation cards show "0" with a green checkmark. Message: "Aucun element en attente." |
| S10 | Admin views the reports page | Centralized list of all reports from all modules, filterable and sortable. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | Non-admin user accesses /admin | Redirected to home page. Toast: "Acces reserve aux administrateurs." |
| F2 | Admin tries to suspend their own account | Server returns 400: "Vous ne pouvez pas suspendre votre propre compte." |
| F3 | Admin tries to delete their own account | Server returns 400: "Vous ne pouvez pas supprimer votre propre compte." |
| F4 | Admin types wrong email in delete confirmation | Delete button remains disabled. |
| F5 | Dashboard metrics API fails | Metric cards show a loading/error state: "Impossible de charger les metriques." with retry button. |
| F6 | Admin tries to suspend an already suspended user | Button shows "Reactiver" instead. No duplicate suspension possible. |
| F7 | There are 0 registered users (fresh install) | Table shows empty state: "Aucun utilisateur enregistre." |

---

## Data

### Prisma Model Additions (reference)

```prisma
enum UserStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

enum UserRole {
  CANDIDATE
  EMPLOYER
  INVESTOR
  ADMIN
}

model User {
  id            String      @id @default(cuid())
  name          String
  email         String      @unique
  role          UserRole    @default(CANDIDATE)
  status        UserStatus  @default(ACTIVE)
  lastLoginAt   DateTime?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // Relations
  statistics    Statistic[]
  investments   Investment[]
  reports       InvestmentReport[]  @relation("Reporter")
  // ... other relations (jobs, applications, etc.)
}
```

### Output — Dashboard Metrics

```ts
interface DashboardMetrics {
  visitors: {
    current: number;           // Current month
    previous: number;          // Previous month
    changePercent: number;     // e.g., +12.5
  };
  publishedArticles: {
    current: number;
    previous: number;
    changePercent: number;
  };
  activeJobs: {
    current: number;
    previous: number;
    changePercent: number;
  };
  applicationsReceived: {
    current: number;
    previous: number;
    changePercent: number;
  };
  activeInvestments: {
    current: number;
    previous: number;
    changePercent: number;
  };
  registeredUsers: {
    current: number;
    previous: number;
    changePercent: number;
  };
}
```

### Output — Moderation Counts

```ts
interface ModerationCounts {
  pendingJobs: number;
  pendingInvestments: number;
  pendingEmployerVerifications: number;
  pendingReports: number;
}
```

### Output — Recent Activity Item

```ts
interface RecentActivityItem {
  id: string;
  type: "investment_submitted" | "job_submitted" | "user_registered" |
        "report_filed" | "investment_approved" | "job_approved";
  title: string;           // Human-readable description in French
  actorName: string;       // Who performed the action
  timestamp: string;       // ISO date
  link: string;            // URL to the relevant admin page
}
```

### Output — User List Item

```ts
interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLoginAt: string | null;
  listingsCount: number;    // Total active listings (jobs + investments)
}
```

### Input — User Filters

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| role | `UserRole` | No | all | Must be valid enum |
| status | `UserStatus` | No | all | Must be valid enum (ACTIVE or SUSPENDED for filter) |
| search | `string` | No | none | Min 2 characters, matches name or email |
| page | `number` | No | 1 | >= 1 |
| pageSize | `number` | No | 20 | 1–100 |

---

## Components UI

### Dashboard Layout (`/admin` or `/admin/dashboard`)

```
+----------------------------------------------------------+
|  Admin Sidebar       |  Main Content                     |
+---------------------+------------------------------------+
|  [Logo]             |                                    |
|  Tableau de bord *  |  "Tableau de bord"                 |
|  Statistiques       |  "Bienvenue, {adminName}"          |
|  Investissements    |                                    |
|  Emplois            |  METRICS SECTION                   |
|  Utilisateurs       |  +--------+ +--------+ +--------+ |
|  Signalements       |  |Visiteurs| |Articles| |Emplois | |
|                     |  | 12,450  | |   87   | |   34   | |
|                     |  | +12.5%  | |  +5.2% | | -2.1%  | |
|                     |  +--------+ +--------+ +--------+ |
|                     |  +--------+ +--------+ +--------+ |
|                     |  |Candid. | |Invest. | |Utilisat| |
|                     |  |  156   | |   23   | |  1,204 | |
|                     |  | +8.3%  | | +15.0% | |  +3.7% | |
|                     |  +--------+ +--------+ +--------+ |
|                     |                                    |
|                     |  MODERATION SECTION                |
|                     |  "Elements en attente"             |
|                     |  +-------------------------------+ |
|                     |  | Emplois en attente        (5) | |
|                     |  | Investissements en att.   (3) | |
|                     |  | Verif. employeurs         (2) | |
|                     |  | Signalements              (7) | |
|                     |  +-------------------------------+ |
|                     |                                    |
|                     |  RECENT ACTIVITY SECTION           |
|                     |  "Activite recente"                |
|                     |  +-------------------------------+ |
|                     |  | [icon] Nouvel investissement  | |
|                     |  |   soumis par Ahmed B.         | |
|                     |  |   il y a 2 heures             | |
|                     |  |                               | |
|                     |  | [icon] Nouveau candidat       | |
|                     |  |   inscrit: Sara M.            | |
|                     |  |   il y a 3 heures             | |
|                     |  +-------------------------------+ |
+---------------------+------------------------------------+
```

### User Management Page (`/admin/utilisateurs`)

```
+----------------------------------------------------------+
|  Admin Sidebar | Main Content                            |
+--------------+-------------------------------------------+
|              | "Gestion des utilisateurs"                |
|              |                                           |
|              | Filter bar:                               |
|              | [ Role v ] [ Statut v ] [ Rechercher... ] |
|              |                                           |
|              | +---------------------------------------+ |
|              | | Nom | Email | Role | Statut | Inscrit | |
|              | | Derniere connexion | Actions          | |
|              | +---------------------------------------+ |
|              | | Ahmed B. | ahmed@... | Investisseur | | |
|              | | Actif | 15/03/2026 | 01/04/2026      | |
|              | | [Suspendre] [Supprimer]               | |
|              | +---------------------------------------+ |
|              | | Sara M. | sara@... | Candidat |       | |
|              | | Suspendu | 10/02/2026 | —             | |
|              | | [Reactiver] [Supprimer]               | |
|              | +---------------------------------------+ |
|              |                                           |
|              | Pagination: < 1 2 3 ... 12 >              |
+--------------+-------------------------------------------+
```

### Reports Management Page (`/admin/signalements`)

```
+----------------------------------------------------------+
|  Admin Sidebar | Main Content                            |
+--------------+-------------------------------------------+
|              | "Gestion des signalements"                |
|              |                                           |
|              | Filter bar:                               |
|              | [ Type v ] [ Statut v ]                   |
|              |                                           |
|              | +---------------------------------------+ |
|              | | Type | Annonce | Raison | Signale par | |
|              | | Date | Statut | Actions              | |
|              | +---------------------------------------+ |
|              | | Investissement | "Riad Marrakech" |   | |
|              | | Frauduleuse | user@... | 30/03/2026  | |
|              | | En attente |                          | |
|              | | [Voir] [Ignorer] [Suspendre] [Suppr.] | |
|              | +---------------------------------------+ |
+--------------+-------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `AdminDashboardPage` | `app/admin/(dashboard)/page.tsx` | Server component. Auth + role check. Fetches all dashboard data. |
| `MetricsGrid` | `components/admin/dashboard/MetricsGrid.tsx` | 6 metric cards in a responsive grid (2x3 or 3x2). |
| `MetricCard` | `components/admin/dashboard/MetricCard.tsx` | Single metric: icon, label, value, trend badge (green up / red down). |
| `ModerationOverview` | `components/admin/dashboard/ModerationOverview.tsx` | List of moderation queues with counts and links. |
| `ModerationQueueCard` | `components/admin/dashboard/ModerationQueueCard.tsx` | Single queue: label, count badge, link arrow. |
| `RecentActivityFeed` | `components/admin/dashboard/RecentActivityFeed.tsx` | Chronological list of recent platform events. |
| `RecentActivityItem` | `components/admin/dashboard/RecentActivityItem.tsx` | Single activity: icon, description, timestamp, link. |
| `AdminUserManagementPage` | `app/admin/utilisateurs/page.tsx` | Server component for user management. |
| `UserTable` | `components/admin/users/UserTable.tsx` | Paginated, filterable table of all users. |
| `UserTableFilters` | `components/admin/users/UserTableFilters.tsx` | Role select, status select, search input. |
| `UserTableRow` | `components/admin/users/UserTableRow.tsx` | Single row with action buttons (suspend/reactivate/delete). |
| `SuspendUserDialog` | `components/admin/users/SuspendUserDialog.tsx` | Confirmation dialog for suspension. |
| `DeleteUserDialog` | `components/admin/users/DeleteUserDialog.tsx` | Confirmation dialog with email verification. |
| `AdminReportsManagementPage` | `app/admin/signalements/page.tsx` | Centralized reports management page. |
| `ReportsTable` | `components/admin/reports/ReportsTable.tsx` | Table of all reports with filters and actions. |
| `ReportsTableFilters` | `components/admin/reports/ReportsTableFilters.tsx` | Filter by type, status. |
| `AdminSidebar` | `components/admin/AdminSidebar.tsx` | Persistent sidebar navigation for all admin pages. |

### UI Text (French)

| Key | Text |
|-----|------|
| dashboard.title | "Tableau de bord" |
| dashboard.welcome | "Bienvenue, {name}" |
| metrics.visitors | "Visiteurs ce mois" |
| metrics.articles | "Articles publies" |
| metrics.jobs | "Offres d'emploi actives" |
| metrics.applications | "Candidatures recues" |
| metrics.investments | "Investissements actifs" |
| metrics.users | "Utilisateurs inscrits" |
| metrics.trend.up | "+{percent}%" |
| metrics.trend.down | "{percent}%" |
| metrics.error | "Impossible de charger les metriques." |
| moderation.title | "Elements en attente" |
| moderation.jobs | "Offres d'emploi en attente" |
| moderation.investments | "Investissements en attente" |
| moderation.employers | "Verifications employeurs en attente" |
| moderation.reports | "Signalements a traiter" |
| moderation.empty | "Aucun element en attente." |
| activity.title | "Activite recente" |
| activity.investmentSubmitted | "Nouvel investissement soumis par {name}" |
| activity.jobSubmitted | "Nouvelle offre d'emploi soumise par {name}" |
| activity.userRegistered | "Nouveau candidat inscrit : {name}" |
| activity.reportFiled | "Signalement depose sur \"{title}\"" |
| activity.timeAgo | "il y a {time}" |
| users.title | "Gestion des utilisateurs" |
| users.filter.role | "Role" |
| users.filter.status | "Statut" |
| users.filter.search | "Rechercher par nom ou email..." |
| users.role.candidate | "Candidat" |
| users.role.employer | "Employeur" |
| users.role.investor | "Investisseur" |
| users.role.admin | "Administrateur" |
| users.status.active | "Actif" |
| users.status.suspended | "Suspendu" |
| users.status.deleted | "Supprime" |
| users.action.suspend | "Suspendre" |
| users.action.reactivate | "Reactiver" |
| users.action.delete | "Supprimer" |
| users.suspend.title | "Suspendre le compte" |
| users.suspend.message | "Etes-vous sur de vouloir suspendre le compte de {name} ? L'utilisateur ne pourra plus se connecter ni effectuer d'actions." |
| users.suspend.confirm | "Suspendre" |
| users.reactivate.success | "Compte reactive." |
| users.suspend.success | "Compte suspendu." |
| users.delete.title | "Supprimer le compte" |
| users.delete.warning | "Attention : la suppression du compte de {name} est irreversible. Toutes les annonces, candidatures et donnees associees seront supprimees." |
| users.delete.confirmLabel | "Saisissez l'email de l'utilisateur pour confirmer" |
| users.delete.confirm | "Supprimer definitivement" |
| users.delete.success | "Compte supprime." |
| users.selfAction | "Vous ne pouvez pas {action} votre propre compte." |
| users.empty | "Aucun utilisateur enregistre." |
| reports.title | "Gestion des signalements" |
| reports.filter.type | "Type" |
| reports.filter.status | "Statut" |
| reports.type.investment | "Investissement" |
| reports.type.job | "Offre d'emploi" |
| reports.action.view | "Voir l'annonce" |
| reports.action.dismiss | "Ignorer" |
| reports.action.suspend | "Suspendre l'annonce" |
| reports.action.delete | "Supprimer l'annonce" |
| sidebar.dashboard | "Tableau de bord" |
| sidebar.statistics | "Statistiques" |
| sidebar.investments | "Investissements" |
| sidebar.jobs | "Emplois" |
| sidebar.users | "Utilisateurs" |
| sidebar.reports | "Signalements" |
| error.forbidden | "Acces reserve aux administrateurs." |

---

## API Endpoints

### `GET /api/admin/dashboard/metrics`

Returns the six platform-wide metrics with trend data.

**Auth:** Admin only.

**Response 200:**

```json
{
  "visitors": {
    "current": 12450,
    "previous": 11070,
    "changePercent": 12.5
  },
  "publishedArticles": {
    "current": 87,
    "previous": 82,
    "changePercent": 6.1
  },
  "activeJobs": {
    "current": 34,
    "previous": 35,
    "changePercent": -2.9
  },
  "applicationsReceived": {
    "current": 156,
    "previous": 144,
    "changePercent": 8.3
  },
  "activeInvestments": {
    "current": 23,
    "previous": 20,
    "changePercent": 15.0
  },
  "registeredUsers": {
    "current": 1204,
    "previous": 1161,
    "changePercent": 3.7
  }
}
```

**Response 401/403:** Authentication/authorization errors.

---

### `GET /api/admin/dashboard/moderation-counts`

Returns the count of pending items across all moderation queues.

**Auth:** Admin only.

**Response 200:**

```json
{
  "pendingJobs": 5,
  "pendingInvestments": 3,
  "pendingEmployerVerifications": 2,
  "pendingReports": 7
}
```

---

### `GET /api/admin/dashboard/recent-activity`

Returns the most recent platform activity events.

**Auth:** Admin only.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| limit | number | No | 10 |

**Response 200:**

```json
{
  "activities": [
    {
      "id": "act_...",
      "type": "investment_submitted",
      "title": "Nouvel investissement soumis par Ahmed Bennani",
      "actorName": "Ahmed Bennani",
      "timestamp": "2026-04-01T14:30:00Z",
      "link": "/admin/investissements/moderation"
    },
    {
      "id": "act_...",
      "type": "user_registered",
      "title": "Nouveau candidat inscrit : Sara Moussaoui",
      "actorName": "Sara Moussaoui",
      "timestamp": "2026-04-01T12:15:00Z",
      "link": "/admin/utilisateurs"
    }
  ]
}
```

---

### `GET /api/admin/users`

Returns a paginated list of all users with optional filters.

**Auth:** Admin only.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| role | UserRole | No | all |
| status | UserStatus | No | all |
| search | string | No | none |
| page | number | No | 1 |
| pageSize | number | No | 20 |
| sortBy | string | No | `createdAt` |
| sortOrder | `asc` or `desc` | No | `desc` |

**Response 200:**

```json
{
  "data": [
    {
      "id": "usr_...",
      "name": "Ahmed Bennani",
      "email": "ahmed@example.com",
      "role": "INVESTOR",
      "status": "ACTIVE",
      "createdAt": "2026-01-15T10:00:00Z",
      "lastLoginAt": "2026-04-01T09:30:00Z",
      "listingsCount": 3
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 1204,
    "totalPages": 61
  }
}
```

---

### `PATCH /api/admin/users/[id]/suspend`

Suspends a user account.

**Auth:** Admin only. Cannot target self.

**Server-side logic:**
1. Set user status = SUSPENDED.
2. Invalidate all active sessions (delete from session table or revoke JWT).
3. Set all user's APPROVED listings (jobs + investments) to WITHDRAWN.
4. Send notification email to user: "Votre compte a ete suspendu."

**Response 200:** `{ "id": "usr_...", "status": "SUSPENDED" }`

**Response 400:** `{ "error": "Vous ne pouvez pas suspendre votre propre compte." }`

**Response 404:** `{ "error": "Utilisateur introuvable." }`

---

### `PATCH /api/admin/users/[id]/reactivate`

Reactivates a suspended user account.

**Auth:** Admin only.

**Server-side logic:**
1. Set user status = ACTIVE.
2. Send notification email: "Votre compte a ete reactive."
3. Note: Previously withdrawn listings are NOT automatically re-published.

**Response 200:** `{ "id": "usr_...", "status": "ACTIVE" }`

**Response 400:** `{ "error": "Ce compte n'est pas suspendu." }`

---

### `DELETE /api/admin/users/[id]`

Permanently deletes (soft-deletes) a user account and all associated data.

**Auth:** Admin only. Cannot target self.

**Request Body:**

```json
{
  "confirmEmail": "ahmed@example.com"
}
```

**Validation:** `confirmEmail` must match the target user's email.

**Server-side logic:**
1. Verify confirmEmail matches.
2. Anonymize user data (name -> "Utilisateur supprime", email -> hash, etc.).
3. Set status = DELETED.
4. Cascade: withdraw/delete all listings, anonymize applications.
5. Send final notification email before anonymization.

**Response 200:** `{ "id": "usr_...", "status": "DELETED" }`

**Response 400:** `{ "error": "L'email de confirmation ne correspond pas." }` or self-action error.

**Response 404:** `{ "error": "Utilisateur introuvable." }`

---

### `GET /api/admin/reports`

Returns a centralized list of all reports across all modules.

**Auth:** Admin only.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| type | `investment` or `job` | No | all |
| status | ReportStatus | No | `PENDING` |
| page | number | No | 1 |
| pageSize | number | No | 20 |

**Response 200:**

```json
{
  "data": [
    {
      "id": "rpt_...",
      "type": "investment",
      "reason": "frauduleuse",
      "comment": "Photos copiees d'un autre site.",
      "status": "PENDING",
      "createdAt": "2026-03-30T18:00:00Z",
      "reporter": {
        "id": "usr_...",
        "name": "Karim El Fassi"
      },
      "listing": {
        "id": "clx...",
        "title": "Riad Suspect a Fes",
        "type": "investment",
        "status": "APPROVED"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 7,
    "totalPages": 1
  }
}
```
