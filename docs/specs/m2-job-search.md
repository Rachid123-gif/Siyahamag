# Feature Spec: Job Search & Filtering

**Module:** 2B -- Candidate Side
**Feature:** Recherche et filtrage des offres d'emploi
**Status:** Draft
**Last updated:** 2026-04-01

---

## 1. Intent

Allow candidates to search and discover tourism job listings across Morocco using keyword search, location, and structured filters. The search experience must be fast, relevant, and accessible to both authenticated and anonymous users. All UI text is rendered in French.

---

## 2. User Stories Covered

| ID | Story | Priority |
|----|-------|----------|
| US-2.10 | En tant que candidat, je peux rechercher des offres par ville et type de poste afin de trouver rapidement les emplois qui correspondent a mes criteres. | Must |
| US-2.11 | En tant que candidat, je peux filtrer les offres par type de contrat (CDI, saisonnier, stage) afin de cibler les opportunites adaptees a ma situation. | Must |

---

## 3. System Flow

### 3.1 Search Entry

1. Candidate lands on the search page (`/offres`).
2. The search bar displays two placeholder fields in a single row:
   - "Quel poste ?" (keyword: job title, skill, or company name)
   - "Quelle ville ?" (location: city or region name)
3. Candidate types a query and presses Enter or clicks the "Rechercher" button.
4. The frontend sends a `GET /api/jobs/search` request with query parameters.
5. The backend performs a PostgreSQL full-text search against the `jobs` table.
6. Results are returned as a paginated list of job cards.

### 3.2 Filter Application

1. Below the search bar, a filter panel is displayed (collapsible on mobile).
2. Available filters:
   - **Ville / Region** -- dropdown or autocomplete populated from the `cities` and `regions` tables.
   - **Categorie de poste** (`jobCategory`) -- dropdown: Reception, Restauration, Cuisine, Housekeeping, Animation, Spa & Bien-etre, Management, Guide touristique, Autre.
   - **Type de contrat** (`contractType`) -- checkboxes: CDI, CDD, Saisonnier, Stage, Freelance.
   - **Date de publication** (`postedSince`) -- radio buttons: "Cette semaine", "Ce mois", "Toutes les offres".
3. Each filter change triggers a new search request (debounced at 300ms).
4. Active filters are reflected in the URL query string for shareability and back-button support.

### 3.3 Sorting

1. A "Trier par" dropdown appears above the results list.
2. Options:
   - **Date (plus recentes)** -- default; `ORDER BY published_at DESC`
   - **Pertinence** -- ranked by PostgreSQL `ts_rank` score when a keyword query is present.
3. Sorting selection is preserved across filter changes within the same session.

### 3.4 Results Display

1. Results render as a vertical list of job cards.
2. Each **job card** displays:
   - Job title (linked to `/offres/:slug`)
   - Company name + verified badge (blue checkmark icon if `company.is_verified = true`)
   - City name
   - Contract type badge (color-coded: CDI green, Saisonnier orange, Stage blue, CDD gray, Freelance purple)
   - Publication date (relative format: "il y a 2 jours", "il y a 3 semaines")
   - Short excerpt of the description (first 120 characters, truncated with ellipsis)
3. If no results match, display: "Aucune offre ne correspond a vos criteres. Essayez d'elargir votre recherche."

### 3.5 Pagination

1. Results are paginated with 20 items per page.
2. Pagination controls appear at the bottom: Previous / page numbers / Next.
3. Current page is stored in the `page` query parameter.
4. Total result count is displayed above the list: "42 offres trouvees".

---

## 4. Scenarios

### 4.1 Success Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| S1 | Candidate searches "receptionniste Marrakech" | Returns job listings matching "receptionniste" in Marrakech, sorted by newest first. |
| S2 | Candidate selects filter "Saisonnier" + "Agadir" | Results narrow to seasonal jobs in Agadir. URL updates to `/offres?city=agadir&contractType=saisonnier`. |
| S3 | Candidate changes sort to "Pertinence" | Results re-rank by full-text relevance score. |
| S4 | Candidate navigates to page 3 | Third page of results loads. Scroll position resets to top. |
| S5 | Candidate opens search page with no query | All approved/active jobs are displayed, sorted by newest. |
| S6 | Candidate shares the URL with filters applied | Recipient sees the same filtered results when opening the link. |

### 4.2 Failure / Edge Scenarios

| # | Scenario | Expected Outcome |
|---|----------|-----------------|
| F1 | No results match the query | Empty state message: "Aucune offre ne correspond a vos criteres. Essayez d'elargir votre recherche." |
| F2 | API request fails (500) | Toast notification: "Une erreur est survenue. Veuillez reessayer." Retry button displayed. |
| F3 | Candidate enters only whitespace in search | Treated as empty query; all jobs returned. |
| F4 | Candidate enters excessively long query (>200 chars) | Query is truncated to 200 characters before sending to the API. |
| F5 | Invalid page number in URL (e.g., `page=999`) | Redirect to last valid page. |
| F6 | SQL injection attempt in search query | Query is parameterized; no injection possible. Standard results or empty results returned. |

---

## 5. Data

### 5.1 Input (Search Request)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | No | `""` | Keyword search term (job title, skill, company) |
| `city` | string | No | `null` | City slug (e.g., `marrakech`, `casablanca`) |
| `region` | string | No | `null` | Region slug (e.g., `marrakech-safi`, `souss-massa`) |
| `jobCategory` | string | No | `null` | Category enum value |
| `contractType` | string[] | No | `[]` | One or more contract types |
| `postedSince` | enum | No | `all` | `week`, `month`, `all` |
| `sort` | enum | No | `date` | `date`, `relevance` |
| `page` | integer | No | `1` | Page number (1-indexed) |
| `limit` | integer | No | `20` | Results per page (max 50) |

### 5.2 Output (Search Response)

```json
{
  "data": [
    {
      "id": "uuid",
      "slug": "receptionniste-hotel-marrakech-abc123",
      "title": "Receptionniste Hotel 5 etoiles",
      "company": {
        "id": "uuid",
        "name": "Hotel Atlas Prestige",
        "slug": "hotel-atlas-prestige",
        "isVerified": true,
        "logoUrl": "https://storage.siyahamag.com/logos/hotel-atlas.webp"
      },
      "city": "Marrakech",
      "region": "Marrakech-Safi",
      "contractType": "CDI",
      "jobCategory": "reception",
      "descriptionExcerpt": "Nous recherchons un(e) receptionniste experimente(e) pour notre hotel...",
      "publishedAt": "2026-03-28T10:30:00Z",
      "salaryMin": 5000,
      "salaryMax": 7000,
      "salaryCurrency": "MAD"
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### 5.3 Database: Full-Text Search Setup

```sql
-- Add tsvector column to jobs table
ALTER TABLE jobs ADD COLUMN search_vector tsvector;

-- Populate the search vector (French configuration for stemming)
UPDATE jobs SET search_vector =
  setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('french', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('french', coalesce(city, '')), 'C') ||
  setweight(to_tsvector('french', coalesce(company_name, '')), 'C');

-- GIN index for fast lookups
CREATE INDEX idx_jobs_search_vector ON jobs USING GIN(search_vector);

-- Trigger to keep search_vector up to date
CREATE TRIGGER jobs_search_vector_update
  BEFORE INSERT OR UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(search_vector, 'pg_catalog.french', title, description, city, company_name);
```

---

## 6. UI Components

### 6.1 Component Tree

```
SearchPage
├── SearchBar
│   ├── KeywordInput          -- "Quel poste ?"
│   ├── LocationInput         -- "Quelle ville ?" (autocomplete)
│   └── SearchButton          -- "Rechercher"
├── FilterPanel
│   ├── CityRegionFilter      -- Dropdown with search
│   ├── JobCategoryFilter     -- Dropdown
│   ├── ContractTypeFilter    -- Checkbox group
│   └── DateFilter            -- Radio group
├── ResultsHeader
│   ├── ResultCount           -- "42 offres trouvees"
│   └── SortDropdown          -- "Trier par"
├── JobCardList
│   └── JobCard (repeating)
│       ├── JobTitle          -- Link to detail page
│       ├── CompanyBadge      -- Name + verified icon
│       ├── CityLabel
│       ├── ContractBadge     -- Color-coded pill
│       ├── DateLabel         -- Relative date
│       └── DescriptionExcerpt
├── EmptyState                -- Shown when no results
└── Pagination
    ├── PrevButton
    ├── PageNumbers
    └── NextButton
```

### 6.2 Key UI Labels (French)

| Element | Text |
|---------|------|
| Search keyword placeholder | "Quel poste ? (ex: receptionniste, cuisinier)" |
| Search location placeholder | "Quelle ville ? (ex: Marrakech, Agadir)" |
| Search button | "Rechercher" |
| Filter heading | "Filtrer les resultats" |
| City/Region label | "Ville / Region" |
| Job category label | "Categorie de poste" |
| Contract type label | "Type de contrat" |
| Date label | "Date de publication" |
| Date option: week | "Cette semaine" |
| Date option: month | "Ce mois" |
| Date option: all | "Toutes les offres" |
| Sort label | "Trier par" |
| Sort option: date | "Date (plus recentes)" |
| Sort option: relevance | "Pertinence" |
| Result count | "{count} offres trouvees" |
| Empty state | "Aucune offre ne correspond a vos criteres. Essayez d'elargir votre recherche." |
| Verified badge tooltip | "Entreprise verifiee" |

### 6.3 Responsive Behavior

- **Desktop (>=1024px):** Filters in a left sidebar; results in the main column.
- **Tablet (768px-1023px):** Filters collapse into a toggleable panel above results.
- **Mobile (<768px):** Filters hidden behind a "Filtres" button that opens a bottom sheet. Search bar stacks vertically.

---

## 7. API Endpoints

### 7.1 Search Jobs

```
GET /api/jobs/search
```

**Authentication:** None required (public endpoint).

**Query Parameters:** See Section 5.1.

**Response:** `200 OK` with body as described in Section 5.2.

**Error Responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Invalid parameter value (e.g., `page=-1`) | `{ "error": "INVALID_PARAMETER", "message": "Le parametre 'page' doit etre un entier positif." }` |
| 500 | Internal server error | `{ "error": "INTERNAL_ERROR", "message": "Une erreur interne est survenue." }` |

**Rate Limiting:** 60 requests per minute per IP.

**Caching:** Responses are cached for 60 seconds at the CDN level. Cache key includes all query parameters.

### 7.2 Get Filter Options

```
GET /api/jobs/filters
```

**Authentication:** None required.

**Response:** `200 OK`

```json
{
  "cities": [
    { "slug": "marrakech", "name": "Marrakech", "region": "Marrakech-Safi", "jobCount": 58 },
    { "slug": "agadir", "name": "Agadir", "region": "Souss-Massa", "jobCount": 34 }
  ],
  "regions": [
    { "slug": "marrakech-safi", "name": "Marrakech-Safi", "jobCount": 72 }
  ],
  "jobCategories": [
    { "value": "reception", "label": "Reception", "jobCount": 25 },
    { "value": "restauration", "label": "Restauration", "jobCount": 40 }
  ],
  "contractTypes": [
    { "value": "cdi", "label": "CDI", "jobCount": 30 },
    { "value": "saisonnier", "label": "Saisonnier", "jobCount": 55 },
    { "value": "stage", "label": "Stage", "jobCount": 12 },
    { "value": "cdd", "label": "CDD", "jobCount": 18 },
    { "value": "freelance", "label": "Freelance", "jobCount": 5 }
  ]
}
```

**Caching:** Cached for 5 minutes. Invalidated when a job is published or unpublished.

### 7.3 Get City Autocomplete Suggestions

```
GET /api/cities/autocomplete?q={query}
```

**Authentication:** None required.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Partial city or region name (min 2 chars) |

**Response:** `200 OK`

```json
{
  "suggestions": [
    { "type": "city", "slug": "marrakech", "name": "Marrakech", "region": "Marrakech-Safi" },
    { "type": "region", "slug": "marrakech-safi", "name": "Marrakech-Safi" }
  ]
}
```

**Rate Limiting:** 120 requests per minute per IP (autocomplete generates more requests).

---

## 8. Technical Notes

- **PostgreSQL full-text search** uses the `french` text search configuration for proper stemming of French terms (e.g., "receptionniste" matches "reception").
- **URL-driven state:** All search parameters are stored in the URL query string. The frontend reads from the URL on mount and syncs changes back. This ensures shareability and browser history support.
- **Debouncing:** Filter changes are debounced at 300ms to avoid excessive API calls. Autocomplete input is debounced at 200ms.
- **SEO:** The search page renders server-side (Next.js SSR) for the initial load so that search engines can index job listings.
- **Accessibility:** All filter controls have proper `aria-label` attributes. The search bar uses `role="search"`. Job cards are rendered as an `<ol>` list.
