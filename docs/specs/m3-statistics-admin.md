# M3 — Admin Statistics Management

## Intent

Give platform administrators a dedicated interface to add, update, and delete tourism statistics data points. Every change propagates immediately to the public statistics page, ensuring the platform always reflects the latest official figures. The admin interface enforces data integrity through strict validation rules while keeping the workflow fast — an admin should be able to enter a batch of new annual figures in under five minutes.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-3.5 | En tant qu'administrateur, je veux ajouter et mettre a jour les statistiques afin de maintenir les donnees a jour sur la plateforme. | Admin can create a new data point (indicator + value + year + optional region + source). Admin can edit or delete any existing data point. Public charts update immediately after save. |

---

## System Flow

### Add a New Data Point

```
1. Admin navigates to /admin/statistiques
2. Page loads existing data points in a paginated, filterable table.
3. Admin clicks "Ajouter une statistique".
4. Modal/drawer opens with the creation form.
5. Admin fills in:
   - Indicator (select: TOURISTS | REVENUE | NIGHTS | OCCUPANCY_RATE)
   - Value (number input)
   - Year (number input)
   - Region (optional select — blank means national aggregate)
   - Source (text input, e.g., "Ministere du Tourisme")
6. Admin clicks "Enregistrer".
7. Client validates locally:
   a. Value > 0
   b. Year >= 2000 and <= current year
   c. Source is not empty
   d. No duplicate (indicator + year + region) — client does an optimistic check;
      server enforces the unique constraint.
8. Client sends POST /api/admin/statistics
9. Server validates, creates the row in the Statistic table.
10. Server responds 201 with the created record.
11. Client closes the modal, inserts the new row at the top of the table,
    and shows a success toast: "Statistique ajoutee avec succes."
12. Public statistics page will pick up the new data on next request
    (no cache or short cache TTL).
```

### Edit an Existing Data Point

```
1. Admin finds the row in the table (using search / filters).
2. Admin clicks the edit icon on that row.
3. Modal opens pre-filled with the existing values.
4. Admin modifies the desired fields.
5. Client validates (same rules as creation).
6. Client sends PUT /api/admin/statistics/:id
7. Server validates, updates the row.
8. Server responds 200 with the updated record.
9. Client updates the table row in place.
10. Success toast: "Statistique mise a jour avec succes."
```

### Delete a Data Point

```
1. Admin clicks the delete icon on a row.
2. Confirmation dialog: "Etes-vous sur de vouloir supprimer cette statistique ?
   Cette action est irreversible."
3. Admin confirms.
4. Client sends DELETE /api/admin/statistics/:id
5. Server soft-deletes or hard-deletes the row.
6. Client removes the row from the table.
7. Success toast: "Statistique supprimee."
```

### Automatic Chart Update

```
After any CUD operation, the public /statistiques page reflects the change
because:
- The API fetches live from Prisma on each request (SSR or short revalidation).
- No long-lived cache sits between the database and the public page.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | Admin adds national tourist count for 2025 | Row created. Public KPI card for "Touristes" updates on next page load. |
| S2 | Admin adds regional data for Marrakech-Safi, REVENUE, 2025 | Row created with region = "Marrakech-Safi". Regional bar chart reflects the value. |
| S3 | Admin edits an existing value (correcting a typo) | Row updated. Old value replaced everywhere. |
| S4 | Admin deletes an obsolete data point | Row removed. Charts adjust (that year/region bar disappears if no other data). |
| S5 | Admin filters table by indicator = OCCUPANCY_RATE | Table shows only occupancy rate rows, sorted by year descending. |
| S6 | Admin adds data then immediately checks the public page | New data visible on public page without delay. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | Admin submits value = -500 | Client-side validation error: "La valeur doit etre positive." Form not submitted. |
| F2 | Admin submits year = 1990 | Validation error: "L'annee doit etre comprise entre 2000 et [annee courante]." |
| F3 | Admin leaves source field empty | Validation error: "La source est obligatoire." |
| F4 | Admin tries to create a duplicate (same indicator + year + region) | Server returns 409 Conflict: "Une statistique existe deja pour cet indicateur, cette annee et cette region." Modal stays open. |
| F5 | Non-admin user tries to access /admin/statistiques | Redirected to /connexion or shown 403 "Acces refuse". |
| F6 | Server error during save | Toast: "Erreur lors de l'enregistrement. Veuillez reessayer." Form data is preserved. |
| F7 | Admin submits value = 0 | Validation error: "La valeur doit etre strictement positive." |

---

## Data

### Input — Create / Update Form

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| indicator | `StatisticIndicator` | Yes | Must be one of: `TOURISTS`, `REVENUE`, `NIGHTS`, `OCCUPANCY_RATE` |
| value | `number` | Yes | Must be > 0. For `OCCUPANCY_RATE`, must be <= 100. |
| year | `number` | Yes | Integer, >= 2000, <= current year |
| region | `string` or `null` | No | If provided, must match a known region slug. Null = national aggregate. |
| source | `string` | Yes | Non-empty, max 255 characters |

### Output — Created / Updated Record

```ts
interface StatisticRecord {
  id: string;
  indicator: StatisticIndicator;
  value: number;
  year: number;
  region: string | null;
  source: string;
  updatedAt: string;   // ISO date
  createdAt: string;   // ISO date
  createdBy: {
    id: string;
    name: string;
  };
}
```

### Output — Table List Response

```ts
interface StatisticsListResponse {
  data: StatisticRecord[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
```

---

## Components UI

### Page Layout (`/admin/statistiques`)

```
+----------------------------------------------------------+
|  Admin Sidebar  |  Main Content                          |
+-----------------+----------------------------------------+
|  ...            |  Breadcrumb: Admin > Statistiques       |
|  Statistiques * |  Page title: "Gestion des Statistiques" |
|  ...            |                                        |
|                 |  Filter bar:                           |
|                 |  [ Indicateur v ] [ Annee v ] [ Region v ] [ Rechercher ] |
|                 |                                        |
|                 |  [ + Ajouter une statistique ]         |
|                 |                                        |
|                 |  +----------------------------------+  |
|                 |  | Table                            |  |
|                 |  | Indicateur | Valeur | Annee |    |  |
|                 |  | Region | Source | Modifie le |   |  |
|                 |  | Actions (edit / delete)          |  |
|                 |  +----------------------------------+  |
|                 |                                        |
|                 |  Pagination: < 1 2 3 ... 10 >          |
+-----------------+----------------------------------------+
```

### Modals

**Create/Edit Modal:**

```
+------------------------------------------+
|  Ajouter une statistique                 |
|  (or "Modifier la statistique")          |
+------------------------------------------+
|  Indicateur *    [ Select v            ] |
|  Valeur *        [ __________________ ] |
|  Annee *         [ __________________ ] |
|  Region          [ Select v (optionnel)] |
|  Source *         [ __________________ ] |
+------------------------------------------+
|  [ Annuler ]              [ Enregistrer ] |
+------------------------------------------+
```

**Delete Confirmation Dialog:**

```
+------------------------------------------+
|  Supprimer la statistique                |
|                                          |
|  Etes-vous sur de vouloir supprimer      |
|  cette statistique ? Cette action est    |
|  irreversible.                           |
|                                          |
|  [ Annuler ]             [ Supprimer ]   |
+------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `AdminStatisticsPage` | `app/admin/statistiques/page.tsx` | Server component. Checks admin auth. Fetches initial table data. |
| `StatisticsTable` | `components/admin/statistics/StatisticsTable.tsx` | Client component. Sortable, filterable data table. |
| `StatisticsTableFilters` | `components/admin/statistics/StatisticsTableFilters.tsx` | Filter controls above the table. |
| `StatisticFormModal` | `components/admin/statistics/StatisticFormModal.tsx` | Modal with the create/edit form. Uses react-hook-form + zod validation. |
| `StatisticDeleteDialog` | `components/admin/statistics/StatisticDeleteDialog.tsx` | Confirmation dialog for deletion. |
| `StatisticTableRow` | `components/admin/statistics/StatisticTableRow.tsx` | Single table row with edit/delete action buttons. |

### UI Text (French)

| Key | Text |
|-----|------|
| page.title | "Gestion des Statistiques" |
| button.add | "Ajouter une statistique" |
| modal.create.title | "Ajouter une statistique" |
| modal.edit.title | "Modifier la statistique" |
| form.indicator | "Indicateur" |
| form.value | "Valeur" |
| form.year | "Annee" |
| form.region | "Region (optionnel)" |
| form.source | "Source" |
| form.save | "Enregistrer" |
| form.cancel | "Annuler" |
| delete.title | "Supprimer la statistique" |
| delete.message | "Etes-vous sur de vouloir supprimer cette statistique ? Cette action est irreversible." |
| delete.confirm | "Supprimer" |
| toast.created | "Statistique ajoutee avec succes." |
| toast.updated | "Statistique mise a jour avec succes." |
| toast.deleted | "Statistique supprimee." |
| error.valueMustBePositive | "La valeur doit etre strictement positive." |
| error.yearRange | "L'annee doit etre comprise entre 2000 et {currentYear}." |
| error.sourceRequired | "La source est obligatoire." |
| error.duplicate | "Une statistique existe deja pour cet indicateur, cette annee et cette region." |
| error.save | "Erreur lors de l'enregistrement. Veuillez reessayer." |
| error.forbidden | "Acces refuse." |

---

## API Endpoints

### `GET /api/admin/statistics`

Returns a paginated list of all statistics data points for the admin table.

**Auth:** Admin only (role = `ADMIN`).

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| page | number | No | 1 |
| pageSize | number | No | 20 |
| indicator | StatisticIndicator | No | all |
| year | number | No | all |
| region | string | No | all |
| sortBy | string | No | `year` |
| sortOrder | `asc` or `desc` | No | `desc` |

**Response 200:**

```json
{
  "data": [
    {
      "id": "clx...",
      "indicator": "TOURISTS",
      "value": 14500000,
      "year": 2025,
      "region": null,
      "source": "Ministere du Tourisme",
      "updatedAt": "2026-03-01T12:00:00Z",
      "createdAt": "2026-03-01T12:00:00Z",
      "createdBy": { "id": "usr_...", "name": "Admin Rachid" }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 87,
    "totalPages": 5
  }
}
```

**Response 401:** `{ "error": "Non authentifie" }`
**Response 403:** `{ "error": "Acces refuse" }`

---

### `POST /api/admin/statistics`

Creates a new statistic data point.

**Auth:** Admin only.

**Request Body:**

```json
{
  "indicator": "TOURISTS",
  "value": 14500000,
  "year": 2025,
  "region": null,
  "source": "Ministere du Tourisme"
}
```

**Validation:**
- `indicator`: required, must be valid enum value
- `value`: required, must be > 0. If `OCCUPANCY_RATE`, must be <= 100.
- `year`: required, integer, 2000 <= year <= current year
- `region`: optional, if provided must be a known region slug
- `source`: required, 1–255 characters

**Response 201:** The created `StatisticRecord`.

**Response 400:** `{ "error": "Validation failed", "details": { "value": "La valeur doit etre positive." } }`

**Response 409:** `{ "error": "Une statistique existe deja pour cet indicateur, cette annee et cette region." }`

---

### `PUT /api/admin/statistics/:id`

Updates an existing statistic data point.

**Auth:** Admin only.

**Request Body:** Same shape as POST. All fields required (full replace).

**Response 200:** The updated `StatisticRecord`.

**Response 400:** Validation errors (same as POST).

**Response 404:** `{ "error": "Statistique introuvable." }`

**Response 409:** `{ "error": "Duplicate entry" }` (if changing indicator/year/region creates a conflict).

---

### `DELETE /api/admin/statistics/:id`

Deletes a statistic data point.

**Auth:** Admin only.

**Response 200:** `{ "message": "Statistique supprimee." }`

**Response 404:** `{ "error": "Statistique introuvable." }`
