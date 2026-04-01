# M1 - Article Admin (CRUD)

## Intent

Provide admin users of SiyahaMag.com with a full content management interface to create, read, update, delete, and schedule articles. Admins use a Tiptap rich text editor to author content, upload cover images to Supabase Storage, and manage article lifecycle through statuses (DRAFT, PUBLISHED, SCHEDULED). All UI text is in French; all code identifiers are in English.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1.6 | En tant qu'administrateur, je veux creer un article avec un editeur riche afin de publier du contenu attractif. | Admin can create a new article via `/admin/articles/new`. The form includes: title, Tiptap rich text editor (with images, links, headings, lists), category selector, cover image upload, and summary. Article saves as DRAFT by default. |
| US-1.7 | En tant qu'administrateur, je veux programmer la publication d'un article afin qu'il soit publie automatiquement a une date future. | Admin can set a scheduled publication date/time. Article status becomes SCHEDULED. At the scheduled time, a cron job or server process promotes the article to PUBLISHED and sets `publishedAt` accordingly. |

---

## System Flow

### Creating an Article (US-1.6)

1. Admin navigates to `/admin/articles`.
2. Admin clicks "Nouvel article" button.
3. Redirect to `/admin/articles/new`.
4. The `ArticleForm` component renders with empty fields:
   - Title input (required)
   - Slug input (auto-generated from title, editable)
   - Category select dropdown (required, from `ArticleCategory` enum)
   - Summary textarea (optional, max 300 chars)
   - Cover image upload (required)
   - Tiptap rich text editor for body (required)
5. Admin fills in the form:
   a. Types the title. Slug auto-generates on blur (e.g., "Mon article" becomes "mon-article"). Admin can manually override the slug.
   b. Selects a category from the dropdown.
   c. Writes a summary or leaves it blank (will auto-generate from body).
   d. Uploads a cover image:
      - Click "Choisir une image" or drag-and-drop.
      - Client validates: file type (JPEG, PNG, WebP), max size 5MB.
      - File uploads to Supabase Storage bucket `content` at path `articles/cover-{uuid}.{ext}`.
      - API call: `POST /api/upload` with `FormData`.
      - On success, the image preview displays in the form.
   e. Writes article body in Tiptap editor.
6. Admin clicks "Enregistrer comme brouillon":
   a. API call: `POST /api/admin/articles` with status `DRAFT`.
   b. Server validates all fields.
   c. Server generates slug if not provided, checks uniqueness.
   d. Article saved to database with `status: DRAFT`, `publishedAt: null`.
   e. Redirect to `/admin/articles/{id}/edit` with success toast: "Article enregistre comme brouillon."
7. Alternatively, admin clicks "Publier maintenant":
   a. Same as step 6, but `status: PUBLISHED` and `publishedAt: NOW()`.
   b. Toast: "Article publie avec succes."
   c. Cache invalidation triggered for article list and homepage.

### Editing an Article

1. Admin navigates to `/admin/articles` and clicks on an existing article row.
2. Redirect to `/admin/articles/{id}/edit`.
3. API call: `GET /api/admin/articles/{id}`.
4. `ArticleForm` renders pre-populated with existing data.
5. Admin makes changes and clicks "Mettre a jour":
   a. API call: `PUT /api/admin/articles/{id}`.
   b. Server validates, updates article.
   c. If article was PUBLISHED, cache invalidation triggered.
   d. Toast: "Article mis a jour."
6. Status transitions allowed:
   - DRAFT -> PUBLISHED (publish now)
   - DRAFT -> SCHEDULED (set schedule)
   - SCHEDULED -> DRAFT (cancel schedule)
   - SCHEDULED -> PUBLISHED (publish now)
   - PUBLISHED -> DRAFT (unpublish)

### Scheduling Publication (US-1.7)

1. Admin creates or edits an article.
2. Admin clicks "Programmer la publication" instead of "Publier maintenant".
3. A date-time picker modal or inline component appears.
4. Admin selects a future date and time (minimum: current time + 15 minutes).
5. Admin confirms the schedule.
6. API call: `POST /api/admin/articles` (or `PUT` for edit) with `status: SCHEDULED` and `scheduledAt: {selectedDateTime}`.
7. Server validates that `scheduledAt` is in the future.
8. Article saved with `status: SCHEDULED`.
9. Toast: "Article programme pour le {formattedDate}."
10. A cron job runs every minute (or every 5 minutes):
    a. Queries: `SELECT * FROM Article WHERE status = 'SCHEDULED' AND scheduledAt <= NOW()`.
    b. For each matching article: update `status = 'PUBLISHED'`, set `publishedAt = scheduledAt`.
    c. Trigger cache invalidation for public endpoints.

### Deleting an Article

1. Admin clicks the delete icon/button on an article row or detail page.
2. Confirmation dialog: "Etes-vous sur de vouloir supprimer cet article ? Cette action est irreversible."
3. Admin confirms.
4. API call: `DELETE /api/admin/articles/{id}`.
5. Server soft-deletes (sets `deletedAt` timestamp) or hard-deletes depending on retention policy.
6. If article was PUBLISHED, cache invalidation triggered.
7. Redirect to `/admin/articles` with toast: "Article supprime."

### Listing Articles (Admin)

1. Admin navigates to `/admin/articles`.
2. API call: `GET /api/admin/articles?page=1&limit=20&sort=updatedAt:desc`.
3. Admin article list renders with columns: Title, Category, Status, Published Date, Updated Date, Actions.
4. Admin can filter by status using tabs or dropdown: `Tous | Brouillons | Publies | Programmes`.
5. Admin can search articles by title.
6. Each row has action buttons: Edit, Delete.
7. Status is displayed as a colored badge:
   - DRAFT: gray badge "Brouillon"
   - PUBLISHED: green badge "Publie"
   - SCHEDULED: orange badge "Programme" + scheduled date

---

## Scenarios

### Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| S1 | Create draft article | Admin is authenticated | Fill form, click "Enregistrer comme brouillon" | Article saved with `status: DRAFT`. Redirect to edit page. Success toast. |
| S2 | Publish article immediately | Admin is authenticated, form is valid | Fill form, click "Publier maintenant" | Article saved with `status: PUBLISHED`, `publishedAt: NOW()`. Visible on public site. |
| S3 | Schedule article | Admin is authenticated, form is valid | Fill form, click "Programmer", select future date | Article saved with `status: SCHEDULED`, `scheduledAt` set. Article not yet visible publicly. |
| S4 | Scheduled article auto-publishes | Article status is SCHEDULED, `scheduledAt` has passed | Cron job runs | Status changes to PUBLISHED. `publishedAt` set to `scheduledAt`. Article visible publicly. |
| S5 | Edit existing article | Article exists in DRAFT status | Navigate to edit, change title, click "Mettre a jour" | Article updated. Title changed. `updatedAt` refreshed. |
| S6 | Upload cover image | Admin is on article form | Drag image file onto upload area | Image uploads to Supabase Storage. Preview displayed. URL stored in form state. |
| S7 | Auto-generate slug | Title field is filled | Admin fills title "Les meilleurs riads du Maroc" | Slug field auto-populates with "les-meilleurs-riads-du-maroc". |
| S8 | Override auto-generated slug | Slug was auto-generated | Admin manually edits slug to "riads-maroc-2026" | Custom slug is used. Server validates uniqueness. |
| S9 | Delete article | Article exists | Click delete, confirm dialog | Article removed. No longer appears in admin list or public site. |
| S10 | Filter admin list by status | Multiple articles with different statuses | Click "Programmes" tab | Only SCHEDULED articles displayed. |
| S11 | Unpublish article | Article is currently PUBLISHED | Edit article, click "Retirer de la publication" | Status changes to DRAFT. Article removed from public site. Cache invalidated. |
| S12 | Cancel scheduled publication | Article is SCHEDULED | Edit article, click "Annuler la programmation" | Status changes to DRAFT. `scheduledAt` cleared. |
| S13 | Tiptap image insertion | Admin is editing body | Click image button in toolbar, upload image | Image uploaded to Supabase Storage. Image node inserted into Tiptap document at cursor position. |
| S14 | Preview article | Admin is editing | Click "Apercu" button | New tab opens showing the article as it would appear publicly (using a preview token for unpublished articles). |

### Failure / Edge Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| F1 | Missing required fields | Title is empty | Click "Publier maintenant" | Validation error: "Le titre est obligatoire." Form field highlighted in red. |
| F2 | Missing cover image | No cover image uploaded | Click "Publier maintenant" | Validation error: "L'image de couverture est obligatoire." |
| F3 | Duplicate slug | Another article has slug "riads-maroc" | Submit with same slug | Server returns 409. Error: "Ce slug est deja utilise. Veuillez en choisir un autre." |
| F4 | Schedule in the past | Admin selects a past date | Confirm schedule | Validation error: "La date de programmation doit etre dans le futur." Date picker prevents past selection. |
| F5 | Image too large | Admin uploads a 10MB image | Drop file on upload area | Client-side error: "L'image ne doit pas depasser 5 Mo." File rejected before upload. |
| F6 | Invalid image type | Admin uploads a .gif file | Drop file on upload area | Client-side error: "Format non supporte. Utilisez JPEG, PNG ou WebP." |
| F7 | Supabase Storage upload fails | Storage service is down | Upload image | Error: "Echec du telechargement de l'image. Veuillez reessayer." Retry button displayed. |
| F8 | Concurrent edit conflict | Two admins edit the same article | Both submit changes | Optimistic concurrency: second save fails with "Cet article a ete modifie par un autre utilisateur. Veuillez recharger la page." (compare `updatedAt` timestamps). |
| F9 | Unauthorized access | Non-admin user accesses `/admin/articles` | Navigate to admin URL | Redirect to login page or 403 Forbidden: "Acces non autorise." |
| F10 | Network error during save | Internet connection drops | Click "Publier" | Error: "Erreur de connexion. Vos modifications n'ont pas ete enregistrees. Veuillez reessayer." Form state preserved. |
| F11 | Empty body | Admin leaves Tiptap editor empty | Click "Publier maintenant" | Validation error: "Le contenu de l'article est obligatoire." |
| F12 | Slug with special characters | Admin types slug with spaces/accents | Blur from slug field | Auto-sanitization: spaces become hyphens, accents removed, lowercase enforced. Preview of final slug shown. |
| F13 | Delete published article | Article is PUBLISHED with public traffic | Click delete, confirm | Article removed. Public URL returns 404. Cache invalidated. Consider soft-delete to allow recovery. |

---

## Data

### Input (Create / Update Article)

```typescript
interface CreateArticleInput {
  title: string;              // Required, 5-200 chars
  slug?: string;              // Optional, auto-generated if absent. 3-200 chars, lowercase, alphanumeric + hyphens
  summary?: string;           // Optional, max 300 chars. Auto-generated from body if empty.
  body: TiptapJSON;           // Required, valid Tiptap document JSON
  coverImage: string;         // Required, Supabase Storage URL (uploaded separately)
  category: ArticleCategory;  // Required, valid enum value
  status: ArticleStatus;      // Required: DRAFT | PUBLISHED | SCHEDULED
  scheduledAt?: string;       // Required if status is SCHEDULED. ISO 8601 datetime, must be in the future.
}

interface UpdateArticleInput {
  title?: string;
  slug?: string;
  summary?: string;
  body?: TiptapJSON;
  coverImage?: string;
  category?: ArticleCategory;
  status?: ArticleStatus;
  scheduledAt?: string | null;  // Set to null to clear schedule
}
```

### Output (Admin Article Response)

```typescript
interface AdminArticleResponse {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  body: TiptapJSON;
  coverImageUrl: string;
  category: ArticleCategory;
  status: ArticleStatus;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}

interface AdminArticlesListResponse {
  data: AdminArticleListItem[];
  meta: PaginationMeta;
}

interface AdminArticleListItem {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  status: ArticleStatus;
  publishedAt: string | null;
  scheduledAt: string | null;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}
```

### Cover Image Upload

```typescript
// POST /api/upload request
interface UploadRequest {
  file: File;                 // The image file
  bucket: "content";          // Supabase Storage bucket
  path: "articles";           // Subdirectory in bucket
}

// POST /api/upload response
interface UploadResponse {
  url: string;                // Public URL: https://xyz.supabase.co/storage/v1/object/public/content/articles/cover-{uuid}.webp
  path: string;               // Storage path: articles/cover-{uuid}.webp
  size: number;               // File size in bytes
  mimeType: string;           // e.g., "image/webp"
}
```

### Validation Rules

| Field | Rule | Error Message (FR) |
|-------|------|-------------------|
| `title` | Required, 5-200 chars | "Le titre est obligatoire (5 a 200 caracteres)." |
| `slug` | Unique, 3-200 chars, `^[a-z0-9]+(?:-[a-z0-9]+)*$` | "Le slug doit etre unique et ne contenir que des lettres minuscules, chiffres et tirets." |
| `body` | Required, valid Tiptap JSON, non-empty content | "Le contenu de l'article est obligatoire." |
| `coverImage` | Required, valid URL, must point to Supabase Storage | "L'image de couverture est obligatoire." |
| `category` | Required, valid `ArticleCategory` enum | "La categorie est obligatoire." |
| `status` | Required, valid `ArticleStatus` enum | "Le statut est invalide." |
| `scheduledAt` | Required if SCHEDULED, must be future datetime, min +15 min | "La date de programmation doit etre dans le futur (au moins 15 minutes)." |
| `summary` | Optional, max 300 chars | "Le resume ne doit pas depasser 300 caracteres." |
| Cover image file | JPEG/PNG/WebP, max 5MB, min 800x450px recommended | "L'image doit etre au format JPEG, PNG ou WebP et ne pas depasser 5 Mo." |

---

## Components UI

### `AdminArticleList` (Page)

- **Route**: `/admin/articles`
- **Layout**: Full-width admin layout with sidebar navigation
- **Elements**:
  - Page heading: "Gestion des articles"
  - "Nouvel article" primary button (top-right)
  - Status filter tabs: `Tous ({count}) | Brouillons ({count}) | Publies ({count}) | Programmes ({count})`
  - Search input: "Rechercher par titre..."
  - Data table with columns:
    | Column | Width | Content |
    |--------|-------|---------|
    | Titre | 35% | Article title (clickable, links to edit) |
    | Categorie | 15% | Category badge |
    | Statut | 12% | Status badge (colored) |
    | Date de publication | 18% | Formatted date or "---" for drafts |
    | Mis a jour | 12% | Relative time (e.g., "il y a 2h") |
    | Actions | 8% | Edit icon, Delete icon |
  - Pagination below table (20 items per page)
- **Empty state**: "Aucun article. Creez votre premier article !" with CTA button.

### `ArticleForm` (Create / Edit)

- **Routes**: `/admin/articles/new` and `/admin/articles/{id}/edit`
- **Layout**: Two-column layout on desktop. Main content (left, 65%) and sidebar (right, 35%).

**Main Content Column**:
- Title input: large text field, placeholder "Titre de l'article"
- Slug input: smaller field below title, prefix display "siyahamag.com/actualites/", auto-generated, editable
- Tiptap editor: rich text area with toolbar

**Sidebar Column**:
- **Publication panel** (card):
  - Status display: current status badge
  - Action buttons (contextual):
    - If DRAFT: "Publier maintenant", "Programmer la publication", "Enregistrer le brouillon"
    - If PUBLISHED: "Mettre a jour", "Retirer de la publication"
    - If SCHEDULED: "Publier maintenant", "Annuler la programmation", "Mettre a jour"
  - Schedule picker (visible when scheduling): date input + time input
  - Scheduled date display if SCHEDULED: "Programme pour le 15 avril 2026 a 09:00"
- **Category panel** (card):
  - Select dropdown with all `ArticleCategory` options (French labels)
  - Labels map: `HEBERGEMENT -> "Hebergement"`, `TRANSPORT -> "Transport"`, `AERIEN -> "Aerien"`, `GASTRONOMIE -> "Gastronomie"`, `EVENEMENTS -> "Evenements"`, `DEVELOPPEMENT -> "Developpement"`, `MICE -> "MICE"`
- **Cover image panel** (card):
  - Heading: "Image de couverture"
  - Upload area: drag-and-drop zone or file picker button
  - Image preview (16:9 aspect ratio) once uploaded
  - "Changer l'image" and "Supprimer" buttons when image exists
  - File info: filename, size
- **Summary panel** (card):
  - Textarea, placeholder "Resume de l'article (optionnel)"
  - Character counter: "{count}/300"

### `TiptapEditor`

- **Integration**: `@tiptap/react` with `@tiptap/starter-kit`
- **Toolbar**:
  | Group | Tools |
  |-------|-------|
  | Text format | Bold, Italic, Underline, Strikethrough |
  | Headings | H2, H3, H4 (no H1, reserved for article title) |
  | Lists | Bullet list, Ordered list |
  | Media | Image upload, Link |
  | Block | Blockquote, Horizontal rule |
  | Utility | Undo, Redo |
- **Image upload in editor**:
  1. Click image button in toolbar.
  2. File picker opens (or drag-and-drop onto editor).
  3. Image uploaded to Supabase Storage at `content/articles/body-{uuid}.{ext}`.
  4. On success, image node inserted into document with public URL.
  5. Uploading state: placeholder with spinner in editor.
- **Editor config**:
  - Placeholder text: "Commencez a ecrire votre article..."
  - Min-height: 400px
  - Autosave: draft saved to localStorage every 30 seconds (prevents data loss on accidental navigation)
  - Keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), etc.

### `ImageUploader`

- **Props**: `onUpload: (url: string) => void`, `currentImage?: string`, `bucket: string`, `path: string`
- **Elements**:
  - Dashed border drop zone (when no image)
  - Icon: cloud upload
  - Text: "Glissez une image ici ou cliquez pour selectionner"
  - Subtext: "JPEG, PNG ou WebP. Maximum 5 Mo."
  - Progress bar during upload
  - Preview with remove button (when image exists)
- **Validation**: Client-side before upload (file type, size)

### `SchedulePicker`

- **Props**: `value: string | null`, `onChange: (datetime: string) => void`
- **Elements**:
  - Date input (calendar picker)
  - Time input (hour:minute selector, 15-minute increments)
  - Timezone note: "Heure du Maroc (UTC+1)"
  - Minimum date: current datetime + 15 minutes
- **Validation**: Prevents selection of past dates. Inline error if manually entered past date.

### `StatusBadge`

- **Props**: `status: ArticleStatus`
- **Variants**:
  - DRAFT: gray background, "Brouillon"
  - PUBLISHED: green background, "Publie"
  - SCHEDULED: orange background, "Programme"

### `DeleteConfirmDialog`

- **Type**: Modal dialog
- **Elements**:
  - Warning icon
  - Title: "Supprimer l'article"
  - Message: "Etes-vous sur de vouloir supprimer '{articleTitle}' ? Cette action est irreversible."
  - Buttons: "Annuler" (secondary), "Supprimer" (destructive red)

---

## API Endpoints

### `GET /api/admin/articles`

**Description**: List all articles for admin management (includes all statuses).

**Authentication**: Required. Role: `ADMIN`.

**Query Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `20` | Items per page (max 100) |
| `status` | string | No | — | Filter by status: DRAFT, PUBLISHED, SCHEDULED |
| `q` | string | No | — | Search by title |
| `sort` | string | No | `updatedAt:desc` | Sort field and direction |

**Response `200 OK`**:

```json
{
  "data": [
    {
      "id": "a1b2c3d4-...",
      "title": "Les riads de Marrakech",
      "slug": "les-riads-de-marrakech",
      "category": "HEBERGEMENT",
      "status": "PUBLISHED",
      "publishedAt": "2026-03-25T09:00:00.000Z",
      "scheduledAt": null,
      "updatedAt": "2026-03-25T08:55:00.000Z",
      "author": { "id": "u-001", "name": "Redaction SiyahaMag" }
    }
  ],
  "meta": { "total": 42, "page": 1, "limit": 20, "totalPages": 3 }
}
```

**Response `401 Unauthorized`**:

```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentification requise."
}
```

**Response `403 Forbidden`**:

```json
{
  "error": "FORBIDDEN",
  "message": "Acces reserve aux administrateurs."
}
```

---

### `GET /api/admin/articles/{id}`

**Description**: Retrieve a single article by ID for editing (includes all statuses).

**Authentication**: Required. Role: `ADMIN`.

**Response `200 OK`**: Full `AdminArticleResponse` (see Data section).

**Response `404 Not Found`**:

```json
{
  "error": "NOT_FOUND",
  "message": "Article introuvable."
}
```

---

### `POST /api/admin/articles`

**Description**: Create a new article.

**Authentication**: Required. Role: `ADMIN`.

**Request Body**: `CreateArticleInput` (see Data section).

**Response `201 Created`**: Full `AdminArticleResponse`.

**Response `400 Bad Request`** (validation errors):

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Erreurs de validation.",
  "details": [
    { "field": "title", "message": "Le titre est obligatoire (5 a 200 caracteres)." },
    { "field": "coverImage", "message": "L'image de couverture est obligatoire." }
  ]
}
```

**Response `409 Conflict`** (duplicate slug):

```json
{
  "error": "CONFLICT",
  "message": "Ce slug est deja utilise. Veuillez en choisir un autre."
}
```

---

### `PUT /api/admin/articles/{id}`

**Description**: Update an existing article.

**Authentication**: Required. Role: `ADMIN`.

**Request Body**: `UpdateArticleInput` (see Data section). Only provided fields are updated.

**Response `200 OK`**: Updated `AdminArticleResponse`.

**Response `404 Not Found`**: Article not found.

**Response `409 Conflict`**: Duplicate slug or concurrent edit conflict.

**Response `400 Bad Request`**: Validation errors.

---

### `DELETE /api/admin/articles/{id}`

**Description**: Delete an article.

**Authentication**: Required. Role: `ADMIN`.

**Response `204 No Content`**: Successfully deleted.

**Response `404 Not Found`**: Article not found.

---

### `POST /api/upload`

**Description**: Upload a file to Supabase Storage.

**Authentication**: Required. Role: `ADMIN`.

**Request**: `multipart/form-data` with fields:
- `file`: The image file
- `bucket`: Storage bucket name (e.g., "content")
- `path`: Subdirectory (e.g., "articles")

**Response `200 OK`**:

```json
{
  "url": "https://xyz.supabase.co/storage/v1/object/public/content/articles/cover-abc123.webp",
  "path": "articles/cover-abc123.webp",
  "size": 245760,
  "mimeType": "image/webp"
}
```

**Response `400 Bad Request`**: Invalid file type or size.

**Response `413 Payload Too Large`**: File exceeds 5MB limit.

---

## Notes

- **Autosave**: The article form should autosave to `localStorage` every 30 seconds to prevent data loss. Key format: `draft-article-{id}` or `draft-article-new`. Clear on successful save.
- **Image optimization**: On upload, consider server-side optimization (resize to max 1920px width, convert to WebP, compress to ~80% quality) using Supabase Edge Functions or a middleware.
- **Cron job for scheduling**: Use a serverless cron (e.g., Vercel Cron, Supabase pg_cron, or a separate worker) that runs every minute to promote SCHEDULED articles. Query: `UPDATE Article SET status = 'PUBLISHED', publishedAt = scheduledAt WHERE status = 'SCHEDULED' AND scheduledAt <= NOW()`.
- **Audit trail**: Consider logging admin actions (create, update, delete, publish, schedule) in an `AuditLog` table for accountability.
- **Soft delete**: Recommended to implement soft delete (`deletedAt` column) so articles can be recovered within 30 days. Hard delete after retention period.
- **Optimistic concurrency**: Use the `updatedAt` timestamp as a version field. On update, include the current `updatedAt` in the request. If it does not match the database value, reject with 409 Conflict.
- **Role-based access**: All `/api/admin/*` endpoints must verify the user's role. Middleware should check for authenticated session + `ADMIN` role before processing the request.
