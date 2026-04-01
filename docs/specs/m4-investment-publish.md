# M4 — Investment Publishing & Moderation

## Intent

Allow sellers (investors, property owners, entrepreneurs) to publish tourism investment opportunities on the platform, and give administrators the tools to moderate those listings before they become public. The workflow ensures only genuine tourism-related opportunities appear on the site — filtering out general real estate that has nothing to do with tourism. Sellers can manage their own listings (edit, withdraw), and admins can handle reports of fraudulent or inappropriate content.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-4.5 | En tant que vendeur, je veux publier une opportunite avec photos et details afin de la rendre visible aux investisseurs. | Seller can fill a multi-step form (title, type, city, price, surface, description via Tiptap, up to 10 photos, contact info). On submit, listing goes to PENDING status. |
| US-4.6 | En tant que vendeur, je veux modifier ou retirer mon annonce afin de la maintenir a jour ou la supprimer si elle n'est plus d'actualite. | Seller can edit any field of their listing (returns to PENDING if already APPROVED). Seller can withdraw (set status to WITHDRAWN). |
| US-4.7 | En tant qu'administrateur, je veux verifier que l'annonce est liee au tourisme avant de l'approuver afin de garantir la pertinence du contenu. | Admin sees a moderation queue of PENDING listings. Admin can preview the full listing. Admin can approve (status -> APPROVED) or reject (status -> REJECTED, with mandatory reason). |
| US-4.8 | En tant qu'administrateur, je veux traiter les signalements afin de retirer les annonces frauduleuses. | Admin sees reported listings with report details. Admin can dismiss the report, suspend the listing, or delete it. |

---

## System Flow

### Seller Publishes a New Listing

```
1. Authenticated user navigates to /investissements/publier
2. If user is not authenticated: redirect to /connexion?redirect=/investissements/publier
3. Multi-step form renders:

   Step 1 — Basic Information:
   - Title (text input)
   - Type (select: TERRAIN, HOTEL, RIAD, RESTAURANT, PROJET, AUTRE)
   - City (text input with autocomplete)
   - Region (select from known regions)
   - Price (number input, in MAD)
   - Surface (number input, m2, optional)
   - Rooms (number input, optional — shown only for HOTEL, RIAD, RESTAURANT)
   - Condition (select: NEUF, A_RENOVER, EN_ACTIVITE — optional)

   Step 2 — Description:
   - Rich text editor (Tiptap): headings, bold, italic, lists, links.
   - Min 100 characters required.

   Step 3 — Photos:
   - Upload up to 10 photos (drag & drop or file picker).
   - At least 1 photo required.
   - Accepted formats: JPEG, PNG, WebP. Max 5 MB per photo.
   - Photos are uploaded to Supabase Storage.
   - User can reorder photos (drag & drop). First photo = main photo.
   - User can delete uploaded photos before submission.

   Step 4 — Contact Information:
   - Contact name (text, required — pre-filled from user profile)
   - Company name (text, optional)
   - Contact email (email, required — pre-filled from user email)
   - Contact phone (text, optional)
   - Note: "Votre email et telephone ne seront pas affiches publiquement."

   Step 5 — Review & Submit:
   - Summary of all entered data.
   - Preview of how the listing will appear.
   - Checkbox: "Je confirme que cette opportunite est liee au secteur touristique."
   - Submit button: "Soumettre pour verification"

4. On submit:
   a. Client validates all fields.
   b. Client sends POST /api/investments
   c. Server validates, creates the Investment record with status = PENDING.
   d. Server associates uploaded photos with the investment.
   e. Server responds 201.
   f. Client redirects to /mon-compte/investissements with success toast:
      "Votre annonce a ete soumise. Elle sera visible apres verification par notre equipe."
```

### Seller Edits a Listing

```
1. Seller navigates to /mon-compte/investissements (their listings dashboard).
2. Table/cards show all their listings with status badges.
3. Seller clicks "Modifier" on a listing.
4. Same multi-step form opens, pre-filled with existing data.
5. Seller makes changes and submits.
6. Client sends PUT /api/investments/[id]
7. Server validates:
   a. Seller must own this listing.
   b. Listing must not be REJECTED (rejected listings cannot be edited; seller must create new).
   c. If listing was APPROVED, status reverts to PENDING (requires re-moderation).
8. Server responds 200.
9. Toast: "Votre annonce a ete mise a jour. Elle sera re-verifiee par notre equipe."
```

### Seller Withdraws a Listing

```
1. Seller navigates to /mon-compte/investissements.
2. Seller clicks "Retirer" on a listing.
3. Confirmation dialog: "Etes-vous sur de vouloir retirer cette annonce ?
   Elle ne sera plus visible par les investisseurs."
4. Client sends PATCH /api/investments/[id]/withdraw
5. Server sets status = WITHDRAWN.
6. Toast: "Votre annonce a ete retiree."
7. Listing disappears from public search but remains in seller's dashboard (grayed out).
```

### Admin Moderates a Pending Listing

```
1. Admin navigates to /admin/investissements/moderation
2. Page shows a list of PENDING listings, ordered by submission date (oldest first).
3. A count badge shows the number of pending listings.
4. Admin clicks on a listing to preview it.
5. Full preview page opens (same layout as public detail page, with admin action bar at top).
6. Admin evaluates:
   - Is this genuinely tourism-related? (Not general real estate)
   - Are photos appropriate and genuine?
   - Is the description adequate?
   - Is pricing reasonable?
7. Admin clicks either:
   a. "Approuver" -> status = APPROVED. Listing becomes publicly visible.
      Toast: "Annonce approuvee."
   b. "Rejeter" -> modal opens asking for a rejection reason (required).
      Admin types reason (e.g., "Cette annonce concerne de l'immobilier residentiel sans lien avec le tourisme.")
      Status = REJECTED. Seller receives email notification with the reason.
      Toast: "Annonce rejetee."
```

### Admin Handles Reports

```
1. Admin navigates to /admin/investissements/signalements
   (or sees reports in the global admin dashboard).
2. Table shows all reports with: listing title, reporter name, reason, comment, date, status.
3. Admin clicks on a report to see the full listing + report details.
4. Admin actions:
   a. "Ignorer le signalement" — report status = DISMISSED. Listing remains live.
   b. "Suspendre l'annonce" — listing status = WITHDRAWN (forced). Seller notified.
   c. "Supprimer l'annonce" — listing hard-deleted or permanently archived. Seller notified.
5. After action, report status = REVIEWED.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | Seller publishes a valid listing with 5 photos | Listing created with PENDING status. Seller sees it in their dashboard with "En attente" badge. |
| S2 | Admin approves a pending listing | Listing status becomes APPROVED. It appears in public search results. |
| S3 | Admin rejects a listing with reason | Listing status becomes REJECTED. Seller receives email with the rejection reason. |
| S4 | Seller edits an approved listing | Listing reverts to PENDING. It disappears from public results until re-approved. |
| S5 | Seller withdraws a listing | Listing status becomes WITHDRAWN. Removed from public results. Remains in seller dashboard (grayed out). |
| S6 | Admin dismisses a report | Report marked as DISMISSED. Listing remains live. |
| S7 | Admin suspends a reported listing | Listing set to WITHDRAWN. Seller notified by email. |
| S8 | Seller reorders photos before submission | Photos saved with the new order. Main photo (order=0) shown on card in search results. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | Seller tries to submit without photos | Validation error: "Au moins une photo est requise." |
| F2 | Seller uploads a 15 MB image | Client-side error: "La taille maximale par photo est de 5 Mo." Upload rejected. |
| F3 | Seller tries to upload 12 photos | After 10th upload, button disabled: "Maximum 10 photos." |
| F4 | Seller submits description under 100 chars | Validation error: "La description doit contenir au moins 100 caracteres." |
| F5 | Non-owner tries to edit a listing | Server returns 403: "Vous n'etes pas autorise a modifier cette annonce." |
| F6 | Seller tries to edit a REJECTED listing | Server returns 400: "Une annonce rejetee ne peut pas etre modifiee. Veuillez creer une nouvelle annonce." |
| F7 | Admin rejects without providing a reason | Validation error: "La raison du rejet est obligatoire." |
| F8 | Unauthenticated user tries to access /investissements/publier | Redirected to /connexion. |
| F9 | File upload to Supabase fails | Toast: "Erreur lors du telechargement de l'image. Veuillez reessayer." Other uploaded photos preserved. |
| F10 | Seller does not check the tourism confirmation checkbox | Submit button remains disabled. Tooltip: "Vous devez confirmer que l'annonce est liee au tourisme." |

---

## Data

### Input — Create / Update Investment

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | `string` | Yes | 5–150 characters |
| type | `InvestmentType` | Yes | Must be valid enum |
| city | `string` | Yes | 2–100 characters |
| region | `string` | Yes | Must be a known region slug |
| price | `number` | Yes | > 0 |
| surface | `number` | No | > 0 if provided |
| rooms | `number` | No | >= 0, integer, if provided |
| condition | `InvestmentCondition` | No | Must be valid enum if provided |
| description | `string` | Yes | Min 100 characters (HTML from Tiptap, text content measured) |
| photos | `File[]` | Yes (create) | 1–10 files, each max 5 MB, JPEG/PNG/WebP |
| contactName | `string` | Yes | 2–100 characters |
| contactCompany | `string` | No | Max 150 characters |
| contactEmail | `string` | Yes | Valid email format |
| contactPhone | `string` | No | Valid phone format if provided |
| tourismConfirmation | `boolean` | Yes | Must be true |

### Output — Seller's Listing (Dashboard)

```ts
interface SellerInvestmentItem {
  id: string;
  slug: string;
  title: string;
  type: InvestmentType;
  city: string;
  price: number;
  status: InvestmentStatus;
  rejectionReason: string | null;
  mainPhoto: { url: string; alt: string | null } | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  contactCount: number;
}
```

### Output — Admin Moderation Queue Item

```ts
interface ModerationQueueItem {
  id: string;
  slug: string;
  title: string;
  type: InvestmentType;
  city: string;
  region: string;
  price: number;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  mainPhoto: { url: string; alt: string | null } | null;
  createdAt: string;
  photosCount: number;
}
```

### Output — Report List Item

```ts
interface ReportListItem {
  id: string;
  reason: string;
  comment: string | null;
  status: ReportStatus;
  createdAt: string;
  reporter: {
    id: string;
    name: string;
  };
  investment: {
    id: string;
    slug: string;
    title: string;
    status: InvestmentStatus;
  };
}
```

---

## Components UI

### Seller — Publish Form (`/investissements/publier`)

```
+----------------------------------------------------------+
|  Header / Navbar                                         |
+----------------------------------------------------------+
|  Page title: "Publier une opportunite d'investissement"  |
+----------------------------------------------------------+
|  Step indicator: [1. Infos] [2. Description] [3. Photos] |
|                  [4. Contact] [5. Apercu]                |
+----------------------------------------------------------+
|  Step 1: Informations generales                          |
|  +----------------------------------------------------+  |
|  | Titre *         [ ______________________________ ] |  |
|  | Type *          [ Select v                       ] |  |
|  | Ville *         [ ______________________________ ] |  |
|  | Region *        [ Select v                       ] |  |
|  | Prix (MAD) *    [ ______________________________ ] |  |
|  | Surface (m2)    [ ______________________________ ] |  |
|  | Chambres        [ ______________________________ ] |  |
|  | Etat            [ Select v                       ] |  |
|  +----------------------------------------------------+  |
|  [ Precedent ]                        [ Suivant ]        |
+----------------------------------------------------------+
```

### Seller — Listings Dashboard (`/mon-compte/investissements`)

```
+----------------------------------------------------------+
|  Page title: "Mes annonces d'investissement"             |
+----------------------------------------------------------+
|  [ + Publier une nouvelle annonce ]                      |
+----------------------------------------------------------+
|  +------------------------------------------------------+|
|  | Photo | Title       | Type  | Prix     | Statut     ||
|  |       |             |       |          | [Badge]    ||
|  |       |             |       |          | [Modifier] ||
|  |       |             |       |          | [Retirer]  ||
|  +------------------------------------------------------+|
|  | ...                                                   ||
|  +------------------------------------------------------+|
+----------------------------------------------------------+
```

Status badges:
- PENDING: yellow badge "En attente de verification"
- APPROVED: green badge "Publiee"
- REJECTED: red badge "Rejetee" (+ clickable to see reason)
- WITHDRAWN: gray badge "Retiree"

### Admin — Moderation Queue (`/admin/investissements/moderation`)

```
+----------------------------------------------------------+
|  Admin Sidebar | Main Content                            |
+--------------+-------------------------------------------+
|              | Breadcrumb: Admin > Investissements >     |
|              |   Moderation                              |
|              | Title: "Moderation des annonces" (3)      |
|              |                                           |
|              | +---------------------------------------+ |
|              | | Photo | Title | Type | Ville | Prix  | |
|              | |       | Vendeur | Date soumission     | |
|              | |       | [ Voir ] [ Approuver ] [ Rej ] | |
|              | +---------------------------------------+ |
|              | | ...                                   | |
|              | +---------------------------------------+ |
+--------------+-------------------------------------------+
```

### Admin — Report Handling (`/admin/investissements/signalements`)

```
+----------------------------------------------------------+
|  Admin Sidebar | Main Content                            |
+--------------+-------------------------------------------+
|              | Title: "Signalements" (5)                 |
|              |                                           |
|              | +---------------------------------------+ |
|              | | Annonce | Signale par | Raison |      | |
|              | | Date | Statut |                       | |
|              | | [ Voir annonce ] [ Ignorer ]           | |
|              | | [ Suspendre ] [ Supprimer ]            | |
|              | +---------------------------------------+ |
+--------------+-------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `PublishInvestmentPage` | `app/(auth)/investissements/publier/page.tsx` | Server component. Auth check. Renders the multi-step form. |
| `InvestmentMultiStepForm` | `components/investments/publish/InvestmentMultiStepForm.tsx` | Client component. Manages steps, validation, submission. |
| `StepBasicInfo` | `components/investments/publish/StepBasicInfo.tsx` | Step 1: title, type, city, region, price, surface, rooms, condition. |
| `StepDescription` | `components/investments/publish/StepDescription.tsx` | Step 2: Tiptap editor for rich text description. |
| `StepPhotos` | `components/investments/publish/StepPhotos.tsx` | Step 3: drag-and-drop photo upload, reorder, delete. |
| `StepContact` | `components/investments/publish/StepContact.tsx` | Step 4: contact name, company, email, phone. |
| `StepReview` | `components/investments/publish/StepReview.tsx` | Step 5: summary, preview, tourism confirmation checkbox. |
| `SellerInvestmentsDashboard` | `app/(auth)/mon-compte/investissements/page.tsx` | Seller's listing management page. |
| `SellerInvestmentTable` | `components/investments/seller/SellerInvestmentTable.tsx` | Table of seller's own listings. |
| `WithdrawConfirmDialog` | `components/investments/seller/WithdrawConfirmDialog.tsx` | Confirmation dialog for withdrawing a listing. |
| `AdminModerationPage` | `app/admin/investissements/moderation/page.tsx` | Admin moderation queue page. |
| `ModerationQueue` | `components/admin/investments/ModerationQueue.tsx` | List of pending listings with approve/reject actions. |
| `ModerationPreview` | `components/admin/investments/ModerationPreview.tsx` | Full preview of a listing for moderation. |
| `RejectReasonModal` | `components/admin/investments/RejectReasonModal.tsx` | Modal prompting admin for rejection reason. |
| `AdminReportsPage` | `app/admin/investissements/signalements/page.tsx` | Admin reports management page. |
| `ReportsList` | `components/admin/investments/ReportsList.tsx` | Table of reports with action buttons. |

### UI Text (French)

| Key | Text |
|-----|------|
| publish.title | "Publier une opportunite d'investissement" |
| publish.step1 | "Informations generales" |
| publish.step2 | "Description" |
| publish.step3 | "Photos" |
| publish.step4 | "Contact" |
| publish.step5 | "Apercu et soumission" |
| form.title | "Titre de l'annonce" |
| form.type | "Type de bien" |
| form.city | "Ville" |
| form.region | "Region" |
| form.price | "Prix (MAD)" |
| form.surface | "Surface (m2)" |
| form.rooms | "Nombre de chambres" |
| form.condition | "Etat du bien" |
| form.description | "Description detaillee" |
| form.descriptionHint | "Decrivez le bien, son emplacement, son potentiel touristique..." |
| form.photos | "Photos" |
| form.photosHint | "Glissez vos photos ici ou cliquez pour parcourir. Max 10 photos, 5 Mo chacune." |
| form.contactName | "Nom du contact" |
| form.contactCompany | "Nom de l'entreprise (optionnel)" |
| form.contactEmail | "Email de contact" |
| form.contactPhone | "Telephone (optionnel)" |
| form.contactPrivacy | "Votre email et telephone ne seront pas affiches publiquement." |
| form.tourismConfirm | "Je confirme que cette opportunite est liee au secteur touristique." |
| form.submit | "Soumettre pour verification" |
| form.next | "Suivant" |
| form.previous | "Precedent" |
| toast.submitted | "Votre annonce a ete soumise. Elle sera visible apres verification par notre equipe." |
| toast.updated | "Votre annonce a ete mise a jour. Elle sera re-verifiee par notre equipe." |
| toast.withdrawn | "Votre annonce a ete retiree." |
| seller.dashboard.title | "Mes annonces d'investissement" |
| seller.newListing | "Publier une nouvelle annonce" |
| status.pending | "En attente de verification" |
| status.approved | "Publiee" |
| status.rejected | "Rejetee" |
| status.withdrawn | "Retiree" |
| seller.edit | "Modifier" |
| seller.withdraw | "Retirer" |
| seller.viewRejection | "Voir la raison du rejet" |
| withdraw.title | "Retirer l'annonce" |
| withdraw.message | "Etes-vous sur de vouloir retirer cette annonce ? Elle ne sera plus visible par les investisseurs." |
| withdraw.confirm | "Retirer" |
| admin.moderation.title | "Moderation des annonces" |
| admin.approve | "Approuver" |
| admin.reject | "Rejeter" |
| admin.reject.reasonLabel | "Raison du rejet" |
| admin.reject.reasonPlaceholder | "Expliquez pourquoi cette annonce est rejetee..." |
| admin.reject.reasonRequired | "La raison du rejet est obligatoire." |
| admin.toast.approved | "Annonce approuvee." |
| admin.toast.rejected | "Annonce rejetee." |
| admin.reports.title | "Signalements" |
| admin.report.dismiss | "Ignorer le signalement" |
| admin.report.suspend | "Suspendre l'annonce" |
| admin.report.delete | "Supprimer l'annonce" |
| error.notOwner | "Vous n'etes pas autorise a modifier cette annonce." |
| error.rejectedEdit | "Une annonce rejetee ne peut pas etre modifiee. Veuillez creer une nouvelle annonce." |
| error.minPhotos | "Au moins une photo est requise." |
| error.maxPhotos | "Maximum 10 photos." |
| error.photoSize | "La taille maximale par photo est de 5 Mo." |
| error.descriptionMin | "La description doit contenir au moins 100 caracteres." |
| error.tourismConfirm | "Vous devez confirmer que l'annonce est liee au tourisme." |

---

## API Endpoints

### `POST /api/investments`

Creates a new investment listing (PENDING status).

**Auth:** Authenticated user required.

**Request Body (multipart/form-data):**

```
title: "Riad Traditionnel a Marrakech"
type: "RIAD"
city: "Marrakech"
region: "marrakech-safi"
price: 2500000
surface: 350           (optional)
rooms: 8               (optional)
condition: "EN_ACTIVITE" (optional)
description: "<p>Magnifique riad...</p>"
contactName: "Ahmed Bennani"
contactCompany: "Invest SA" (optional)
contactEmail: "ahmed@example.com"
contactPhone: "+212600000000" (optional)
tourismConfirmation: true
photos[0]: (file)
photos[1]: (file)
...
```

**Validation:** See the Input table above.

**Server-side logic:**
1. Validate all fields.
2. Upload photos to Supabase Storage (`investments/{investmentId}/`).
3. Generate slug from title (unique, append random suffix if collision).
4. Create Investment record with status = PENDING, sellerId = current user.
5. Create InvestmentPhoto records with order matching the upload order.

**Response 201:**

```json
{
  "id": "clx...",
  "slug": "riad-traditionnel-marrakech",
  "status": "PENDING"
}
```

**Response 400:** Validation errors.

**Response 401:** `{ "error": "Non authentifie" }`

---

### `PUT /api/investments/[id]`

Updates an existing listing owned by the authenticated user.

**Auth:** Authenticated user, must be the owner.

**Request Body:** Same shape as POST.

**Server-side logic:**
1. Verify ownership.
2. Verify listing is not REJECTED.
3. If listing was APPROVED, set status back to PENDING.
4. Handle photo changes (new uploads, deletions, reordering).
5. Update the record.

**Response 200:** Updated investment summary.

**Response 400:** Validation errors or "rejected listing" error.

**Response 403:** `{ "error": "Vous n'etes pas autorise a modifier cette annonce." }`

**Response 404:** `{ "error": "Annonce introuvable." }`

---

### `PATCH /api/investments/[id]/withdraw`

Withdraws a listing (seller action).

**Auth:** Authenticated user, must be the owner.

**Response 200:** `{ "id": "clx...", "status": "WITHDRAWN" }`

**Response 403:** Not owner.

**Response 404:** Not found.

---

### `GET /api/seller/investments`

Returns the authenticated user's own listings.

**Auth:** Authenticated user.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| page | number | No | 1 |
| pageSize | number | No | 10 |
| status | InvestmentStatus | No | all |

**Response 200:**

```json
{
  "data": [ /* SellerInvestmentItem[] */ ],
  "pagination": { "page": 1, "pageSize": 10, "total": 3, "totalPages": 1 }
}
```

---

### `GET /api/admin/investments/pending`

Returns pending listings for moderation.

**Auth:** Admin only.

**Response 200:**

```json
{
  "data": [ /* ModerationQueueItem[] */ ],
  "pagination": { ... },
  "count": 3
}
```

---

### `PATCH /api/admin/investments/[id]/approve`

Approves a pending listing.

**Auth:** Admin only.

**Response 200:** `{ "id": "clx...", "status": "APPROVED" }`

---

### `PATCH /api/admin/investments/[id]/reject`

Rejects a pending listing with a reason.

**Auth:** Admin only.

**Request Body:**

```json
{
  "reason": "Cette annonce concerne de l'immobilier residentiel sans lien avec le tourisme."
}
```

**Validation:** `reason` required, 10–500 characters.

**Server-side logic:**
1. Set status = REJECTED, store rejectionReason.
2. Send notification email to seller via Resend with the rejection reason.

**Response 200:** `{ "id": "clx...", "status": "REJECTED" }`

**Response 400:** `{ "error": "La raison du rejet est obligatoire." }`

---

### `GET /api/admin/investments/reports`

Returns all investment reports for admin review.

**Auth:** Admin only.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| status | ReportStatus | No | `PENDING` |
| page | number | No | 1 |
| pageSize | number | No | 20 |

**Response 200:**

```json
{
  "data": [ /* ReportListItem[] */ ],
  "pagination": { ... }
}
```

---

### `PATCH /api/admin/investments/reports/[reportId]`

Updates a report's status and optionally takes action on the listing.

**Auth:** Admin only.

**Request Body:**

```json
{
  "action": "dismiss"  // "dismiss" | "suspend" | "delete"
}
```

**Server-side logic:**
- `dismiss`: report status = DISMISSED. No change to listing.
- `suspend`: report status = REVIEWED. Listing status = WITHDRAWN. Seller notified.
- `delete`: report status = REVIEWED. Listing permanently removed. Photos deleted from storage. Seller notified.

**Response 200:** `{ "reportId": "rpt_...", "action": "dismiss", "status": "DISMISSED" }`
