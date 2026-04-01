# M1 - Articles List & Filtering

## Intent

Provide visitors of SiyahaMag.com with a browsable, filterable, and searchable listing of tourism-related articles. The homepage surfaces the 6 most recent published articles as a curated preview, while the dedicated articles page (`/actualites`) offers full pagination, category filtering, and keyword search. All UI text is in French; all code identifiers are in English.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1.1 | En tant que visiteur, je veux voir les derniers articles sur la page d'accueil afin de rester informe des actualites du tourisme marocain. | Homepage displays 6 latest published articles ordered by `publishedAt` DESC. Each card shows: cover image, title, date, and summary (truncated to 150 characters). |
| US-1.2 | En tant que visiteur, je veux filtrer les articles par categorie afin de trouver du contenu qui m'interesse. | The `/actualites` page displays a horizontal category filter bar. Selecting a category immediately filters the list. The active category is visually highlighted. Selecting "Toutes" resets the filter. |
| US-1.5 | En tant que visiteur, je veux rechercher des articles par mot-cle afin de trouver rapidement un sujet precis. | A global search bar in the site header accepts free-text input (min 2 characters). Results appear on `/actualites?q={query}` filtered by keyword match on title and body. |

---

## System Flow

### Homepage Latest Articles (US-1.1)

1. Visitor lands on `/` (homepage).
2. Client component `HomepageLatestArticles` mounts and triggers a server-side fetch (Next.js Server Component or `getServerSideProps` equivalent).
3. API call: `GET /api/articles?limit=6&status=PUBLISHED&sort=publishedAt:desc`.
4. Backend queries the `Article` table: `WHERE status = 'PUBLISHED' AND publishedAt <= NOW() ORDER BY publishedAt DESC LIMIT 6`.
5. Response returns an array of `ArticleSummary` objects.
6. Client renders 6 `ArticleCard` components in a responsive grid (3 columns desktop, 2 tablet, 1 mobile).
7. Each card links to `/actualites/{slug}`.

### Articles Listing with Filtering (US-1.2)

1. Visitor navigates to `/actualites`.
2. Page loads with default state: no category filter, page 1, 10 articles per page.
3. Client renders the `CategoryFilterBar` with options: `Toutes | Hebergement | Transport | Aerien | Gastronomie | Evenements | Developpement | MICE`.
4. API call: `GET /api/articles?page=1&limit=10&status=PUBLISHED&sort=publishedAt:desc`.
5. Backend queries with pagination: `OFFSET = (page - 1) * limit`.
6. Response includes `{ data: ArticleSummary[], meta: { total, page, limit, totalPages } }`.
7. Client renders article list and `Pagination` component.
8. When visitor clicks a category chip (e.g., "Gastronomie"):
   a. URL updates to `/actualites?category=GASTRONOMIE`.
   b. API call: `GET /api/articles?page=1&limit=10&status=PUBLISHED&category=GASTRONOMIE&sort=publishedAt:desc`.
   c. List re-renders with filtered results.
   d. Active chip receives highlighted styling.
9. Clicking "Toutes" removes the `category` query param and reloads all articles.

### Keyword Search (US-1.5)

1. Visitor types in the global search bar in the site header.
2. On input change (debounced 400ms, minimum 2 characters), a dropdown with up to 5 quick suggestions appears (optional enhancement).
3. On pressing Enter or clicking the search icon:
   a. Visitor is navigated to `/actualites?q={encodedQuery}`.
   b. API call: `GET /api/articles?page=1&limit=10&status=PUBLISHED&q={query}&sort=publishedAt:desc`.
   c. Backend performs a case-insensitive search: `WHERE (title ILIKE '%query%' OR body::text ILIKE '%query%') AND status = 'PUBLISHED'`.
   d. Results render in the same `ArticleList` layout.
4. If a category filter is also active, both filters combine: `/actualites?category=TRANSPORT&q=train`.
5. The search query is displayed above the results: "Resultats pour : train" with a clear button.

---

## Scenarios

### Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| S1 | Homepage loads latest articles | At least 6 published articles exist | Visit `/` | 6 article cards displayed in chronological order (newest first). Each card shows cover image, title, formatted date (e.g., "1 avril 2026"), and summary. |
| S2 | Homepage with fewer than 6 articles | Only 3 published articles exist | Visit `/` | 3 article cards displayed. No empty placeholders. Grid adjusts. |
| S3 | Articles page default load | Published articles exist | Visit `/actualites` | First 10 articles displayed. Pagination shows correct total pages. "Toutes" category is active by default. |
| S4 | Filter by category | Articles exist in GASTRONOMIE | Click "Gastronomie" chip | Only GASTRONOMIE articles shown. Chip is highlighted. URL updates. Page resets to 1. |
| S5 | Switch category filter | Currently filtering GASTRONOMIE | Click "Transport" chip | TRANSPORT articles shown. GASTRONOMIE chip deselected. |
| S6 | Clear category filter | Filtering by TRANSPORT | Click "Toutes" | All articles shown. No category param in URL. |
| S7 | Paginate to page 2 | More than 10 articles exist | Click page 2 button | Articles 11-20 displayed. URL updates to `?page=2`. Scroll to top. |
| S8 | Search by keyword | Articles with "Marrakech" in title exist | Type "Marrakech" and press Enter | Filtered results shown. "Resultats pour : Marrakech" label displayed. |
| S9 | Combined search + category | Articles matching both filters exist | Filter HEBERGEMENT, then search "riad" | Results match both category=HEBERGEMENT and q=riad. URL: `?category=HEBERGEMENT&q=riad`. |
| S10 | Clear search | Currently searching "Marrakech" | Click clear (X) button on search label | Search param removed. Full list (with any active category) restored. |

### Failure / Edge Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| F1 | No articles exist | Database has 0 published articles | Visit `/actualites` | Empty state: illustration + message "Aucun article disponible pour le moment." |
| F2 | No articles in category | No articles in MICE category | Click "MICE" chip | Empty state: "Aucun article dans cette categorie." with suggestion to explore other categories. |
| F3 | Search yields no results | No articles match "xyz123" | Search "xyz123" | Empty state: "Aucun resultat pour 'xyz123'. Essayez un autre mot-cle." |
| F4 | Search query too short | User types only 1 character | Type "a" | Search does not trigger. Tooltip or subtle hint: "Saisissez au moins 2 caracteres." |
| F5 | Invalid page number | User manually sets `?page=999` | Navigate to URL | Redirect to last valid page, or show empty state with link to page 1. |
| F6 | API error | Backend returns 500 | Visit `/actualites` | Error state: "Une erreur est survenue. Veuillez reessayer." with retry button. |
| F7 | Slow network | API takes >3 seconds | Visit `/actualites` | Skeleton loaders displayed for article cards and filters while loading. |
| F8 | Invalid category param | User sets `?category=INVALID` | Navigate to URL | Parameter ignored. All articles displayed. "Toutes" is active. |

---

## Data

### Input (Query Parameters)

| Parameter | Type | Default | Validation | Description |
|-----------|------|---------|------------|-------------|
| `page` | integer | `1` | >= 1 | Current page number |
| `limit` | integer | `10` | 1-50 | Articles per page |
| `category` | enum string | `null` | Must be valid `ArticleCategory` enum value | Filter by category |
| `q` | string | `null` | Min 2 chars, max 200 chars, sanitized | Keyword search |
| `sort` | string | `publishedAt:desc` | `publishedAt:asc` or `publishedAt:desc` | Sort order |
| `status` | enum string | `PUBLISHED` | Forced server-side for public endpoints | Article status filter (always PUBLISHED for public) |

### Output (API Response)

```typescript
// GET /api/articles response
interface ArticlesListResponse {
  data: ArticleSummary[];
  meta: PaginationMeta;
}

interface ArticleSummary {
  id: string;               // UUID
  title: string;            // e.g., "Les riads de Marrakech : guide complet"
  slug: string;             // e.g., "les-riads-de-marrakech-guide-complet"
  summary: string;          // Truncated to 150 chars from body or explicit excerpt
  coverImageUrl: string;    // Supabase Storage public URL
  category: ArticleCategory;
  publishedAt: string;      // ISO 8601 datetime
  author: {
    id: string;
    name: string;
  };
}

interface PaginationMeta {
  total: number;       // Total matching articles
  page: number;        // Current page
  limit: number;       // Items per page
  totalPages: number;  // Calculated: ceil(total / limit)
}

enum ArticleCategory {
  HEBERGEMENT = "HEBERGEMENT",
  TRANSPORT = "TRANSPORT",
  AERIEN = "AERIEN",
  GASTRONOMIE = "GASTRONOMIE",
  EVENEMENTS = "EVENEMENTS",
  DEVELOPPEMENT = "DEVELOPPEMENT",
  MICE = "MICE",
}
```

### Database Query (Prisma)

```prisma
model Article {
  id           String          @id @default(uuid())
  title        String
  slug         String          @unique
  body         Json            // Tiptap JSON
  summary      String?
  coverImage   String          // URL from Supabase Storage
  category     ArticleCategory
  status       ArticleStatus
  publishedAt  DateTime?
  scheduledAt  DateTime?
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
  authorId     String
  author       User            @relation(fields: [authorId], references: [id])
}

enum ArticleCategory {
  HEBERGEMENT
  TRANSPORT
  AERIEN
  GASTRONOMIE
  EVENEMENTS
  DEVELOPPEMENT
  MICE
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
}
```

---

## Components UI

### `HomepageLatestArticles`

- **Location**: Homepage `/`
- **Layout**: Section with heading "Dernieres Actualites" and a "Voir tout" link to `/actualites`
- **Children**: Grid of 6 `ArticleCard` components
- **Responsive**: 3 columns (desktop >= 1024px), 2 columns (tablet >= 768px), 1 column (mobile)
- **Loading state**: 6 skeleton cards matching card dimensions

### `ArticleCard`

- **Props**: `article: ArticleSummary`
- **Elements**:
  - Cover image (aspect ratio 16:9, `object-fit: cover`, lazy loaded)
  - Category badge (colored chip, e.g., teal for HEBERGEMENT)
  - Title (max 2 lines, ellipsis overflow, `<h3>`)
  - Date (formatted: "1 avril 2026", gray text)
  - Summary (max 2 lines, ellipsis overflow)
- **Interaction**: Entire card is clickable, links to `/actualites/{slug}`
- **Hover**: Subtle shadow elevation + image zoom transition

### `CategoryFilterBar`

- **Location**: Top of `/actualites` page, below page heading
- **Layout**: Horizontal scrollable row of chips/pills
- **Items**: `["Toutes", "Hebergement", "Transport", "Aerien", "Gastronomie", "Evenements", "Developpement", "MICE"]`
- **Active state**: Filled background (primary color), white text
- **Inactive state**: Outlined, gray text
- **Behavior**: Click updates URL query param, resets page to 1
- **Mobile**: Horizontally scrollable with fade edges

### `ArticleList`

- **Location**: `/actualites` page, main content area
- **Layout**: Vertical list or grid of `ArticleCard` components (list view on desktop for readability, grid on mobile)
- **Empty state**: Centered illustration + contextual French message
- **Loading state**: 10 skeleton cards

### `SearchBar` (Global)

- **Location**: Site header/navbar, always visible
- **Elements**:
  - Search icon (magnifying glass)
  - Text input, placeholder: "Rechercher un article..."
  - Clear button (X) when input has text
- **Behavior**:
  - Debounced input (400ms)
  - Enter key or icon click navigates to `/actualites?q={query}`
  - Minimum 2 characters to trigger
- **Mobile**: Collapses to icon, expands on tap to full-width overlay

### `Pagination`

- **Location**: Below article list
- **Elements**:
  - Previous/Next arrow buttons
  - Page number buttons (show max 5, with ellipsis for gaps)
  - Current page highlighted
- **Behavior**: Click updates `?page=N`, scrolls to top of list
- **Edge cases**: Previous disabled on page 1, Next disabled on last page
- **Accessibility**: `aria-label` on navigation, `aria-current="page"` on active

### `SearchResultsHeader`

- **Location**: Above article list when `q` param is present
- **Elements**:
  - Text: "Resultats pour : {query}" (bold query)
  - Clear button (X) to remove search filter
  - Result count: "{n} article(s) trouve(s)"

---

## API Endpoints

### `GET /api/articles`

**Description**: Retrieve a paginated, filterable list of published articles.

**Authentication**: None required (public endpoint).

**Query Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | `1` | Page number |
| `limit` | integer | No | `10` | Items per page (max 50) |
| `category` | string | No | — | Enum value from `ArticleCategory` |
| `q` | string | No | — | Search keyword (min 2 chars) |
| `sort` | string | No | `publishedAt:desc` | Sort field and direction |

**Response `200 OK`**:

```json
{
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Les nouvelles lignes aeriennes vers le Maroc en 2026",
      "slug": "nouvelles-lignes-aeriennes-maroc-2026",
      "summary": "Decouvrez les nouvelles connexions aeriennes qui faciliteront l'acces au Maroc cette annee...",
      "coverImageUrl": "https://xyz.supabase.co/storage/v1/object/public/content/articles/cover-abc123.webp",
      "category": "AERIEN",
      "publishedAt": "2026-03-28T10:00:00.000Z",
      "author": {
        "id": "u-001",
        "name": "Redaction SiyahaMag"
      }
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

**Response `400 Bad Request`** (invalid parameters):

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid category value. Must be one of: HEBERGEMENT, TRANSPORT, AERIEN, GASTRONOMIE, EVENEMENTS, DEVELOPPEMENT, MICE",
  "details": [
    { "field": "category", "issue": "Invalid enum value" }
  ]
}
```

**Response `500 Internal Server Error`**:

```json
{
  "error": "INTERNAL_ERROR",
  "message": "An unexpected error occurred. Please try again later."
}
```

### `GET /api/articles/latest`

**Description**: Retrieve the N most recent published articles (optimized for homepage).

**Authentication**: None required.

**Query Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | `6` | Number of articles (max 12) |

**Response `200 OK`**:

```json
{
  "data": [
    {
      "id": "...",
      "title": "...",
      "slug": "...",
      "summary": "...",
      "coverImageUrl": "...",
      "category": "GASTRONOMIE",
      "publishedAt": "2026-04-01T08:00:00.000Z",
      "author": { "id": "...", "name": "..." }
    }
  ]
}
```

**Notes**:
- This endpoint always returns articles with `status = PUBLISHED` and `publishedAt <= NOW()`.
- Results are cached at the edge (CDN) with `Cache-Control: public, s-maxage=300, stale-while-revalidate=60` (5-minute cache).
- The `sort` is always `publishedAt:desc` and cannot be overridden.

---

## Notes

- **Scheduled articles**: Articles with `status = SCHEDULED` and `scheduledAt <= NOW()` should be automatically promoted to `PUBLISHED` via a cron job or database trigger. They must NOT appear in public listings until their `publishedAt` date.
- **Slug generation**: Slugs are auto-generated from the title on creation (using a French-aware slugify library) and can be manually edited by admins.
- **Image optimization**: Cover images should be served via Supabase Storage with transformation parameters for responsive sizes (e.g., `?width=400&height=225` for cards).
- **SEO**: The `/actualites` page should have a canonical URL and meta description. Category-filtered pages use `rel="canonical"` pointing to the unfiltered page to avoid duplicate content.
- **Performance**: The articles list API should use database indexes on `status`, `category`, `publishedAt`, and a GIN index on `title` for full-text search if PostgreSQL is used.
