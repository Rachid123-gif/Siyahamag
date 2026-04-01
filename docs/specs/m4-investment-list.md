# M4 — Investment Listings (Browse & Filter)

## Intent

Provide a searchable, filterable catalog of tourism investment opportunities in Morocco. Investors can browse available properties and projects (terrains, hotels, riads, restaurants, etc.), narrow results by type, location, and budget, and quickly identify opportunities that match their criteria. The listing page is the primary entry point into the investment module and must handle large result sets gracefully through pagination and fast filtering.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-4.1 | En tant qu'investisseur, je veux parcourir les opportunites d'investissement touristique afin de decouvrir les offres disponibles. | A paginated grid of investment cards is shown. Each card displays: title, type, city, price, and main photo. |
| US-4.2 | En tant qu'investisseur, je veux filtrer par type, ville et prix afin de trouver des opportunites qui correspondent a mes criteres. | Functional filters for investment type, city/region, and price range. Filters can be combined. Results update without full page reload. URL query params reflect active filters for shareable links. |

---

## System Flow

### Page Load

```
1. User navigates to /investissements
2. Client (or server component) reads URL query params for any pre-applied filters.
3. Request: GET /api/investments?page=1&pageSize=12&status=APPROVED
4. API queries Prisma:
   - WHERE status = APPROVED (only admin-approved listings are shown publicly)
   - Apply filters if present (type, city, region, priceMin, priceMax)
   - Apply sort (default: newest first)
   - Apply pagination (skip, take)
   - Include the main photo (first photo from the photos relation)
5. API returns { data: InvestmentCard[], pagination: {...} }
6. Client renders:
   a. Filter sidebar / bar
   b. Grid of investment cards
   c. Pagination controls
```

### Filter Interaction

```
1. User selects a filter (e.g., type = "riad").
2. Client updates URL query params: /investissements?type=riad
3. Client sends GET /api/investments?type=riad&page=1&pageSize=12&status=APPROVED
4. API returns filtered results.
5. Grid re-renders with matching listings. Pagination resets to page 1.
6. Active filters are shown as removable chips above the grid.
```

### Sort Interaction

```
1. User changes sort to "Prix croissant".
2. Client updates URL: /investissements?sort=price_asc
3. API returns sorted results.
4. Grid re-renders.
```

### Pagination

```
1. User clicks "Page 2" or "Suivant".
2. Client sends GET /api/investments?page=2&pageSize=12&...filters...
3. API returns page 2 results.
4. Grid re-renders. Scroll to top of grid.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | First visit, no filters | Grid shows the 12 most recent approved investments. Pagination shows total count. |
| S2 | User filters by type = "hotel" | Only hotel listings shown. Active filter chip: "Hotel". |
| S3 | User filters by region = "Marrakech-Safi" AND priceMin = 500000 | Only Marrakech-Safi listings above 500,000 MAD shown. Both filter chips visible. |
| S4 | User sorts by "Prix decroissant" | Most expensive listings appear first. |
| S5 | User clicks on a card | Navigated to /investissements/[slug] (detail page). |
| S6 | User clears all filters | Full unfiltered list returns. |
| S7 | User shares the URL with filters | Recipient sees the same filtered view. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | No listings match the applied filters | Empty state: "Aucune opportunite ne correspond a vos criteres. Essayez d'elargir vos filtres." |
| F2 | API returns 500 | Error banner: "Impossible de charger les opportunites. Veuillez reessayer." with retry button. |
| F3 | User enters priceMin > priceMax | Client prevents submission: "Le prix minimum ne peut pas depasser le prix maximum." |
| F4 | Invalid query params in URL | API ignores invalid params and returns unfiltered results. |
| F5 | Very slow network | Skeleton cards shown during loading. |

---

## Data

### Prisma Model (reference)

```prisma
enum InvestmentType {
  TERRAIN
  HOTEL
  RIAD
  RESTAURANT
  PROJET
  AUTRE
}

enum InvestmentStatus {
  PENDING     // Awaiting admin approval
  APPROVED    // Visible to public
  REJECTED    // Rejected by admin
  WITHDRAWN   // Withdrawn by seller
}

enum InvestmentCondition {
  NEUF
  A_RENOVER
  EN_ACTIVITE
}

model Investment {
  id            String              @id @default(cuid())
  title         String
  slug          String              @unique
  type          InvestmentType
  description   String              @db.Text    // Rich text (Tiptap HTML)
  price         Float
  city          String
  region        String              // Region slug
  surface       Float?              // Square meters
  rooms         Int?                // Number of rooms (if applicable)
  condition     InvestmentCondition?
  status        InvestmentStatus    @default(PENDING)
  rejectionReason String?

  photos        InvestmentPhoto[]
  contactName   String
  contactCompany String?
  contactEmail  String              // Not shown publicly — used for message relay
  contactPhone  String?             // Not shown publicly

  sellerId      String
  seller        User                @relation(fields: [sellerId], references: [id])

  reports       InvestmentReport[]

  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @updatedAt
}

model InvestmentPhoto {
  id            String     @id @default(cuid())
  url           String
  alt           String?
  order         Int        @default(0)
  investmentId  String
  investment    Investment @relation(fields: [investmentId], references: [id], onDelete: Cascade)
}
```

### Input — Filter Parameters

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| type | `InvestmentType` | No | all | Must be valid enum value |
| city | `string` | No | all | Free text, matched with ILIKE |
| region | `string` | No | all | Must be a known region slug |
| priceMin | `number` | No | 0 | >= 0 |
| priceMax | `number` | No | unlimited | >= priceMin if priceMin is set |
| sort | `string` | No | `date_desc` | One of: `date_desc`, `date_asc`, `price_asc`, `price_desc` |
| page | `number` | No | 1 | >= 1 |
| pageSize | `number` | No | 12 | 1–48 |

### Output — Investment Card

```ts
interface InvestmentCard {
  id: string;
  slug: string;
  title: string;
  type: InvestmentType;
  city: string;
  region: string;
  price: number;
  surface: number | null;
  mainPhoto: {
    url: string;
    alt: string | null;
  } | null;
  createdAt: string; // ISO date
}
```

### Output — List Response

```ts
interface InvestmentListResponse {
  data: InvestmentCard[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  activeFilters: {
    type?: InvestmentType;
    city?: string;
    region?: string;
    priceMin?: number;
    priceMax?: number;
    sort: string;
  };
}
```

---

## Components UI

### Page Layout (`/investissements`)

```
+----------------------------------------------------------+
|  Header / Navbar                                         |
+----------------------------------------------------------+
|  Page title: "Opportunites d'Investissement Touristique" |
|  Subtitle: "Decouvrez les projets disponibles au Maroc"  |
+----------------------------------------------------------+
|  Filter Bar:                                             |
|  [ Type v ] [ Ville / Region v ] [ Prix min ] [ Prix max ] [ Trier par v ] |
|                                                          |
|  Active filters: [Hotel x] [Marrakech-Safi x] [Tout effacer] |
+----------------------------------------------------------+
|  Results count: "42 opportunites trouvees"               |
+----------------------------------------------------------+
|  +----------+  +----------+  +----------+                |
|  |  Photo   |  |  Photo   |  |  Photo   |                |
|  |  Title   |  |  Title   |  |  Title   |                |
|  |  Type    |  |  Type    |  |  Type    |                |
|  |  City    |  |  City    |  |  City    |                |
|  |  Price   |  |  Price   |  |  Price   |                |
|  +----------+  +----------+  +----------+                |
|                                                          |
|  +----------+  +----------+  +----------+                |
|  |  ...     |  |  ...     |  |  ...     |                |
|  +----------+  +----------+  +----------+                |
+----------------------------------------------------------+
|  Pagination: < 1 2 3 ... 4 >                            |
+----------------------------------------------------------+
|  Footer                                                  |
+----------------------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `InvestmentListPage` | `app/(public)/investissements/page.tsx` | Server component. Reads search params, fetches initial data, renders page. |
| `InvestmentFilterBar` | `components/investments/InvestmentFilterBar.tsx` | Client component. Type select, city/region select, price range inputs, sort select. Updates URL params. |
| `ActiveFilterChips` | `components/investments/ActiveFilterChips.tsx` | Displays active filters as removable chips. |
| `InvestmentGrid` | `components/investments/InvestmentGrid.tsx` | Responsive CSS grid of investment cards. Shows skeleton during loading. |
| `InvestmentCard` | `components/investments/InvestmentCard.tsx` | Single card: photo, title, type badge, city, price. Links to detail page. |
| `InvestmentEmptyState` | `components/investments/InvestmentEmptyState.tsx` | Shown when no results match filters. |
| `InvestmentPagination` | `components/investments/InvestmentPagination.tsx` | Page number buttons, prev/next. |

### UI Text (French)

| Key | Text |
|-----|------|
| page.title | "Opportunites d'Investissement Touristique" |
| page.subtitle | "Decouvrez les projets disponibles au Maroc" |
| filter.type | "Type de bien" |
| filter.type.terrain | "Terrain" |
| filter.type.hotel | "Hotel" |
| filter.type.riad | "Riad" |
| filter.type.restaurant | "Restaurant" |
| filter.type.projet | "Projet" |
| filter.type.autre | "Autre" |
| filter.city | "Ville / Region" |
| filter.priceMin | "Prix min (MAD)" |
| filter.priceMax | "Prix max (MAD)" |
| filter.sort | "Trier par" |
| filter.sort.dateDesc | "Plus recentes" |
| filter.sort.dateAsc | "Plus anciennes" |
| filter.sort.priceAsc | "Prix croissant" |
| filter.sort.priceDesc | "Prix decroissant" |
| filter.clearAll | "Tout effacer" |
| results.count | "{count} opportunites trouvees" |
| results.countSingle | "1 opportunite trouvee" |
| card.price | "{price} MAD" |
| empty.title | "Aucune opportunite trouvee" |
| empty.message | "Aucune opportunite ne correspond a vos criteres. Essayez d'elargir vos filtres." |
| error.load | "Impossible de charger les opportunites. Veuillez reessayer." |
| error.priceRange | "Le prix minimum ne peut pas depasser le prix maximum." |
| pagination.previous | "Precedent" |
| pagination.next | "Suivant" |

---

## API Endpoints

### `GET /api/investments`

Returns a paginated, filterable list of approved investment listings.

**Auth:** Public (no authentication required). Only `APPROVED` status listings are returned.

**Query Parameters:**

| Param | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| type | string | No | all | Must be valid InvestmentType enum |
| city | string | No | all | Case-insensitive partial match |
| region | string | No | all | Exact region slug match |
| priceMin | number | No | 0 | >= 0 |
| priceMax | number | No | unlimited | >= priceMin |
| sort | string | No | `date_desc` | `date_desc`, `date_asc`, `price_asc`, `price_desc` |
| page | number | No | 1 | >= 1 |
| pageSize | number | No | 12 | 1–48, clamped |

**Response 200:**

```json
{
  "data": [
    {
      "id": "clx...",
      "slug": "riad-traditionnel-marrakech",
      "title": "Riad Traditionnel a Marrakech",
      "type": "RIAD",
      "city": "Marrakech",
      "region": "marrakech-safi",
      "price": 2500000,
      "surface": 350,
      "mainPhoto": {
        "url": "https://storage.supabase.co/investments/photo1.webp",
        "alt": "Facade du riad"
      },
      "createdAt": "2026-03-15T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 42,
    "totalPages": 4
  },
  "activeFilters": {
    "type": "RIAD",
    "sort": "date_desc"
  }
}
```

**Response 400:** `{ "error": "Invalid filter parameters", "details": {...} }`

**Response 500:** `{ "error": "Internal server error" }`
