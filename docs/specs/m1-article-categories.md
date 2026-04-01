# M1 - Category Management

## Intent

Provide admin users of SiyahaMag.com with a management interface for article categories. Categories are defined as a fixed enum in the Prisma schema, reflecting the core content pillars of Moroccan tourism. Since categories are enum-based, management is primarily about viewing, mapping display labels, and understanding how categories are used across the platform. Any structural change to the category list requires a Prisma schema migration and redeployment. All UI text is in French; all code identifiers are in English.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1.8 | En tant qu'administrateur, je veux gerer les categories d'articles afin d'organiser le contenu par thematique. | Admin can view all available categories on `/admin/categories`. Each category displays its enum key, French display label, article count, and a color indicator. Admin understands that adding/removing categories requires a code change (Prisma migration). |

---

## System Flow

### Viewing Categories

1. Admin navigates to `/admin/categories`.
2. API call: `GET /api/admin/categories`.
3. Backend retrieves the fixed list of `ArticleCategory` enum values from the Prisma schema (or a configuration file).
4. For each category, the backend queries the article count: `SELECT category, COUNT(*) FROM Article WHERE status = 'PUBLISHED' GROUP BY category`.
5. Response returns an array of category objects with enum key, display label, color, and article counts.
6. The `CategoryList` component renders a table or card grid showing all categories.

### Category Details

1. Admin clicks on a category row (e.g., "Hebergement").
2. Navigates to `/admin/categories/{category}` (e.g., `/admin/categories/HEBERGEMENT`).
3. API call: `GET /api/admin/categories/HEBERGEMENT`.
4. Page displays:
   - Category name and description
   - Total article count (all statuses)
   - Breakdown by status: X brouillons, Y publies, Z programmes
   - List of the 10 most recent articles in this category
   - Link to filtered admin article list: `/admin/articles?category=HEBERGEMENT`

### Category Configuration (Code-Level)

Since categories are enum-based, the following operations require developer intervention:

**Adding a new category**:
1. Developer adds new value to `ArticleCategory` enum in `prisma/schema.prisma`.
2. Developer adds the French label mapping in the category configuration file (`src/config/categories.ts`).
3. Developer assigns a display color for the new category.
4. Developer runs `npx prisma migrate dev` to generate and apply the migration.
5. Developer deploys the updated application.
6. New category becomes available in the article form dropdown and filter bar.

**Removing a category** (rare, requires data migration):
1. Developer ensures no articles use the category to be removed (or migrates them to another category).
2. Developer removes the value from the enum in Prisma schema.
3. Developer updates the configuration file.
4. Developer runs the migration.
5. Developer deploys.

---

## Scenarios

### Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| S1 | View all categories | Admin is authenticated | Navigate to `/admin/categories` | All 7 categories displayed: Hebergement, Transport, Aerien, Gastronomie, Evenements, Developpement, MICE. Each shows article count. |
| S2 | View category with articles | HEBERGEMENT has 15 published articles | Click "Hebergement" | Category detail page shows: 15 articles publies, list of 10 most recent articles, link to full filtered list. |
| S3 | View empty category | MICE has 0 articles | Click "MICE" | Category detail shows 0 articles. Message: "Aucun article dans cette categorie." |
| S4 | Navigate to filtered articles | On GASTRONOMIE detail page | Click "Voir tous les articles" link | Navigated to `/admin/articles?category=GASTRONOMIE`. Article list pre-filtered. |
| S5 | Category colors consistent | Categories have assigned colors | View category list and article cards | Category badges use consistent colors everywhere (list page, article cards, admin table). |
| S6 | All categories available in article form | Admin creates new article | Open category dropdown | All 7 categories listed with French labels. No option is missing. |

### Failure / Edge Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| F1 | Invalid category in URL | User navigates to `/admin/categories/INVALID` | Direct URL navigation | 404 page or redirect to `/admin/categories` with error: "Categorie introuvable." |
| F2 | Unauthorized access | Non-admin user | Navigate to `/admin/categories` | Redirect to login or 403: "Acces reserve aux administrateurs." |
| F3 | API error | Backend returns 500 | Navigate to `/admin/categories` | Error state: "Une erreur est survenue. Veuillez reessayer." with retry button. |
| F4 | Category count mismatch | Database is slow to update counts | View categories | Counts should be eventually consistent. Consider caching counts with short TTL (60s). |
| F5 | Admin tries to create custom category | Admin looks for "add category" button | Explore the UI | No "add category" button exists. An informational note explains: "Les categories sont definies dans la configuration du systeme. Contactez l'equipe technique pour toute modification." |

---

## Data

### Category Enum (Prisma Schema)

```prisma
enum ArticleCategory {
  HEBERGEMENT
  TRANSPORT
  AERIEN
  GASTRONOMIE
  EVENEMENTS
  DEVELOPPEMENT
  MICE
}
```

### Category Configuration

```typescript
// src/config/categories.ts

export interface CategoryConfig {
  key: ArticleCategory;
  label: string;           // French display label
  description: string;     // French description
  color: string;           // Tailwind color class or hex value
  icon: string;            // Icon identifier (e.g., Lucide icon name)
}

export const CATEGORY_CONFIG: Record<ArticleCategory, CategoryConfig> = {
  HEBERGEMENT: {
    key: "HEBERGEMENT",
    label: "Hebergement",
    description: "Hotels, riads, maisons d'hotes et autres types d'hebergement touristique au Maroc.",
    color: "teal",         // bg-teal-100 text-teal-800
    icon: "hotel",
  },
  TRANSPORT: {
    key: "TRANSPORT",
    label: "Transport",
    description: "Transport terrestre, maritime et interurbain pour les voyageurs au Maroc.",
    color: "blue",         // bg-blue-100 text-blue-800
    icon: "bus",
  },
  AERIEN: {
    key: "AERIEN",
    label: "Aerien",
    description: "Compagnies aeriennes, nouvelles lignes, aeroports et actualites du transport aerien.",
    color: "sky",          // bg-sky-100 text-sky-800
    icon: "plane",
  },
  GASTRONOMIE: {
    key: "GASTRONOMIE",
    label: "Gastronomie",
    description: "Cuisine marocaine, restaurants, festivals culinaires et tendances gastronomiques.",
    color: "orange",       // bg-orange-100 text-orange-800
    icon: "utensils",
  },
  EVENEMENTS: {
    key: "EVENEMENTS",
    label: "Evenements",
    description: "Salons, conferences, festivals et evenements touristiques au Maroc.",
    color: "purple",       // bg-purple-100 text-purple-800
    icon: "calendar",
  },
  DEVELOPPEMENT: {
    key: "DEVELOPPEMENT",
    label: "Developpement",
    description: "Projets d'infrastructure, investissements et developpement du secteur touristique marocain.",
    color: "green",        // bg-green-100 text-green-800
    icon: "trending-up",
  },
  MICE: {
    key: "MICE",
    label: "MICE",
    description: "Meetings, Incentives, Conferences & Exhibitions - tourisme d'affaires au Maroc.",
    color: "indigo",       // bg-indigo-100 text-indigo-800
    icon: "briefcase",
  },
};

// Helper to get label from enum value
export function getCategoryLabel(category: ArticleCategory): string {
  return CATEGORY_CONFIG[category].label;
}

// Helper to get color from enum value
export function getCategoryColor(category: ArticleCategory): string {
  return CATEGORY_CONFIG[category].color;
}

// Get all categories as an array (for dropdowns, filters)
export function getAllCategories(): CategoryConfig[] {
  return Object.values(CATEGORY_CONFIG);
}
```

### API Response

```typescript
// GET /api/admin/categories response
interface CategoriesListResponse {
  data: CategoryWithStats[];
}

interface CategoryWithStats {
  key: ArticleCategory;
  label: string;
  description: string;
  color: string;
  icon: string;
  articleCount: {
    total: number;
    published: number;
    draft: number;
    scheduled: number;
  };
}

// GET /api/admin/categories/{category} response
interface CategoryDetailResponse {
  key: ArticleCategory;
  label: string;
  description: string;
  color: string;
  icon: string;
  articleCount: {
    total: number;
    published: number;
    draft: number;
    scheduled: number;
  };
  recentArticles: AdminArticleListItem[];  // 10 most recent articles
}
```

---

## Components UI

### `AdminCategoryList` (Page)

- **Route**: `/admin/categories`
- **Layout**: Admin layout with sidebar
- **Elements**:
  - Page heading: "Categories d'articles"
  - Informational banner (subtle, dismissible):
    "Les categories sont definies dans la configuration du systeme. Pour ajouter ou modifier une categorie, contactez l'equipe technique."
  - Category cards grid (responsive: 3 columns desktop, 2 tablet, 1 mobile)

### `CategoryCard`

- **Props**: `category: CategoryWithStats`
- **Elements**:
  - Color-coded left border or top accent (using category color)
  - Category icon (from Lucide icons)
  - Category label (French, bold, `<h3>`)
  - Description (1-2 lines, gray text)
  - Article count stats:
    - Total: "{n} article(s)"
    - Breakdown: "{x} publies, {y} brouillons, {z} programmes"
  - Arrow icon indicating clickable
- **Interaction**: Click navigates to `/admin/categories/{key}`
- **Hover**: Subtle elevation shadow

### `CategoryDetailPage`

- **Route**: `/admin/categories/{category}`
- **Layout**: Admin layout with sidebar
- **Elements**:
  - Breadcrumb: "Categories > {Category Label}"
  - Category header:
    - Icon + label (large)
    - Description paragraph
    - Color badge sample
  - Stats cards (horizontal row):
    | Card | Content |
    |------|---------|
    | Total | "{n} articles" |
    | Publies | "{n}" with green indicator |
    | Brouillons | "{n}" with gray indicator |
    | Programmes | "{n}" with orange indicator |
  - Recent articles table:
    - Heading: "Articles recents"
    - Table with columns: Titre, Statut, Date, Actions (edit link)
    - Max 10 rows
    - "Voir tous les articles de cette categorie" link at bottom (links to `/admin/articles?category={key}`)
  - Empty state (if no articles): "Aucun article dans cette categorie. Creez un article dans cette categorie." with link to `/admin/articles/new`.

### `CategoryBadge`

- **Props**: `category: ArticleCategory`, `size?: "sm" | "md" | "lg"`
- **Rendering**: Colored pill/badge using category's configured color
- **Variants**:
  - `sm`: Compact, used in tables and lists
  - `md`: Standard, used in article cards
  - `lg`: Large, used in category detail headers
- **Usage**: Reused across the entire application (article cards, admin tables, filter chips, detail pages)

### `CategorySelect`

- **Props**: `value: ArticleCategory | null`, `onChange: (category: ArticleCategory) => void`, `placeholder?: string`
- **Type**: Dropdown select component
- **Options**: All 7 categories with French labels and color indicators
- **Placeholder**: "Selectionner une categorie"
- **Usage**: Used in the `ArticleForm` sidebar for category selection
- **Rendering**: Each option shows the category color dot + French label

---

## API Endpoints

### `GET /api/admin/categories`

**Description**: Retrieve all categories with article count statistics.

**Authentication**: Required. Role: `ADMIN`.

**Response `200 OK`**:

```json
{
  "data": [
    {
      "key": "HEBERGEMENT",
      "label": "Hebergement",
      "description": "Hotels, riads, maisons d'hotes et autres types d'hebergement touristique au Maroc.",
      "color": "teal",
      "icon": "hotel",
      "articleCount": {
        "total": 15,
        "published": 12,
        "draft": 2,
        "scheduled": 1
      }
    },
    {
      "key": "TRANSPORT",
      "label": "Transport",
      "description": "Transport terrestre, maritime et interurbain pour les voyageurs au Maroc.",
      "color": "blue",
      "icon": "bus",
      "articleCount": {
        "total": 8,
        "published": 6,
        "draft": 1,
        "scheduled": 1
      }
    },
    {
      "key": "AERIEN",
      "label": "Aerien",
      "description": "Compagnies aeriennes, nouvelles lignes, aeroports et actualites du transport aerien.",
      "color": "sky",
      "icon": "plane",
      "articleCount": {
        "total": 10,
        "published": 9,
        "draft": 1,
        "scheduled": 0
      }
    },
    {
      "key": "GASTRONOMIE",
      "label": "Gastronomie",
      "description": "Cuisine marocaine, restaurants, festivals culinaires et tendances gastronomiques.",
      "color": "orange",
      "icon": "utensils",
      "articleCount": {
        "total": 6,
        "published": 5,
        "draft": 0,
        "scheduled": 1
      }
    },
    {
      "key": "EVENEMENTS",
      "label": "Evenements",
      "description": "Salons, conferences, festivals et evenements touristiques au Maroc.",
      "color": "purple",
      "icon": "calendar",
      "articleCount": {
        "total": 4,
        "published": 3,
        "draft": 1,
        "scheduled": 0
      }
    },
    {
      "key": "DEVELOPPEMENT",
      "label": "Developpement",
      "description": "Projets d'infrastructure, investissements et developpement du secteur touristique marocain.",
      "color": "green",
      "icon": "trending-up",
      "articleCount": {
        "total": 7,
        "published": 6,
        "draft": 0,
        "scheduled": 1
      }
    },
    {
      "key": "MICE",
      "label": "MICE",
      "description": "Meetings, Incentives, Conferences & Exhibitions - tourisme d'affaires au Maroc.",
      "color": "indigo",
      "icon": "briefcase",
      "articleCount": {
        "total": 0,
        "published": 0,
        "draft": 0,
        "scheduled": 0
      }
    }
  ]
}
```

**Response `401 Unauthorized`**:

```json
{
  "error": "UNAUTHORIZED",
  "message": "Authentification requise."
}
```

---

### `GET /api/admin/categories/{category}`

**Description**: Retrieve a single category with detailed statistics and recent articles.

**Authentication**: Required. Role: `ADMIN`.

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | Yes | Enum value (e.g., `HEBERGEMENT`) |

**Response `200 OK`**:

```json
{
  "key": "HEBERGEMENT",
  "label": "Hebergement",
  "description": "Hotels, riads, maisons d'hotes et autres types d'hebergement touristique au Maroc.",
  "color": "teal",
  "icon": "hotel",
  "articleCount": {
    "total": 15,
    "published": 12,
    "draft": 2,
    "scheduled": 1
  },
  "recentArticles": [
    {
      "id": "a1b2c3d4-...",
      "title": "Les riads de Marrakech : guide complet",
      "slug": "les-riads-de-marrakech-guide-complet",
      "category": "HEBERGEMENT",
      "status": "PUBLISHED",
      "publishedAt": "2026-03-25T09:00:00.000Z",
      "scheduledAt": null,
      "updatedAt": "2026-03-25T08:55:00.000Z",
      "author": { "id": "u-001", "name": "Redaction SiyahaMag" }
    }
  ]
}
```

**Response `404 Not Found`** (invalid category enum value):

```json
{
  "error": "NOT_FOUND",
  "message": "Categorie introuvable."
}
```

---

### `GET /api/categories` (Public)

**Description**: Retrieve all categories for public use (filter bars, dropdowns). Lightweight response without article counts.

**Authentication**: None required.

**Response `200 OK`**:

```json
{
  "data": [
    { "key": "HEBERGEMENT", "label": "Hebergement", "color": "teal" },
    { "key": "TRANSPORT", "label": "Transport", "color": "blue" },
    { "key": "AERIEN", "label": "Aerien", "color": "sky" },
    { "key": "GASTRONOMIE", "label": "Gastronomie", "color": "orange" },
    { "key": "EVENEMENTS", "label": "Evenements", "color": "purple" },
    { "key": "DEVELOPPEMENT", "label": "Developpement", "color": "green" },
    { "key": "MICE", "label": "MICE", "color": "indigo" }
  ]
}
```

**Caching**: `Cache-Control: public, s-maxage=86400, stale-while-revalidate=3600` (24-hour cache, since categories rarely change).

---

## Notes

- **Enum-based design**: Categories are intentionally stored as a Prisma enum rather than a separate database table. This ensures type safety at the database and application level, prevents orphaned category references, and simplifies queries. The trade-off is that adding or removing categories requires a schema migration and deployment.
- **Why not a database table**: For SiyahaMag's use case, the category list is stable and closely tied to the editorial strategy. A database table would add unnecessary complexity (CRUD operations, orphan handling, slug management) for a list that changes at most once or twice per year.
- **Future extensibility**: If the business needs dynamic categories (e.g., user-created tags, sub-categories), the architecture can evolve to a `Category` table. The `CATEGORY_CONFIG` pattern makes this migration straightforward by centralizing label/color mappings.
- **Consistency**: The `CategoryBadge` and `CategorySelect` components must be used consistently across all pages (public and admin) to ensure uniform category representation. Avoid hardcoding category labels or colors outside of the `CATEGORY_CONFIG` object.
- **Public endpoint caching**: The `GET /api/categories` public endpoint is aggressively cached since the data only changes on deployment. Consider making it a static JSON file generated at build time for even better performance.
- **Localization readiness**: Although UI text is currently French-only, the `CATEGORY_CONFIG` structure can be extended with a `labels: Record<Locale, string>` field if multi-language support is added later.
