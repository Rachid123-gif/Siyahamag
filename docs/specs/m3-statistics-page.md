# M3 — Public Statistics Page

## Intent

Provide a single, visually rich page where any visitor can consult the key tourism figures of Morocco, explore historical trends through interactive charts, compare regions side-by-side, and verify the official source behind every number. The page must feel authoritative (government-grade data) while remaining accessible to investors, journalists, students, and curious citizens.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-3.1 | En tant que visiteur, je veux voir les chiffres clés du tourisme sur une seule page afin d'avoir une vue d'ensemble rapide. | Four KPI cards visible above the fold: total tourists, revenue, nights stayed, average occupancy rate. |
| US-3.2 | En tant que visiteur, je veux voir des graphiques d'évolution afin de comprendre les tendances sur plusieurs années. | At least one line chart showing yearly evolution for a selected indicator. User can switch indicator. |
| US-3.3 | En tant que visiteur, je veux comparer les régions afin de situer les performances relatives. | A bar chart showing the selected indicator broken down by region. User can select/deselect regions. |
| US-3.4 | En tant que visiteur, je veux voir la source de chaque statistique afin de vérifier la fiabilité des données. | Each KPI card and each chart tooltip displays the source name and the last update date. |

---

## System Flow

### Page Load

```
1. User navigates to /statistiques
2. Client requests GET /api/statistics/summary
3. API queries Prisma:
   a. Latest value for each StatisticIndicator (TOURISTS, REVENUE, NIGHTS, OCCUPANCY_RATE)
      aggregated nationally (region = null) for the most recent year.
   b. Yearly series for the default indicator (TOURISTS) for the last 10 years.
   c. Regional breakdown for the default indicator and the most recent year.
4. API returns JSON payload { kpis[], yearlySeries[], regionalBreakdown[] }
5. Client renders:
   a. Four KPI cards (top section)
   b. Line chart (evolution section)
   c. Bar chart (regional comparison section)
6. Each data point carries `source` and `updatedAt` — displayed in a tooltip or caption.
```

### Filter Interaction — Year

```
1. User selects a year range via the year filter (e.g., 2018–2025).
2. Client requests GET /api/statistics/series?indicator=TOURISTS&yearFrom=2018&yearTo=2025
3. API returns filtered yearly series.
4. Line chart re-renders with new data.
```

### Filter Interaction — Region

```
1. User toggles region checkboxes (e.g., Marrakech-Safi, Souss-Massa).
2. Client requests GET /api/statistics/regions?indicator=TOURISTS&year=2025&regions=marrakech-safi,souss-massa
3. API returns filtered regional data.
4. Bar chart re-renders with selected regions only.
```

### Indicator Switch

```
1. User clicks a different indicator tab (e.g., REVENUE).
2. Client fires two parallel requests:
   a. GET /api/statistics/series?indicator=REVENUE&yearFrom=...&yearTo=...
   b. GET /api/statistics/regions?indicator=REVENUE&year=...&regions=...
3. Both charts re-render for the new indicator.
4. KPI card for that indicator gets a visual highlight.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | First visit, no filters applied | Page loads with default data (latest year, all regions, TOURISTS indicator). Four KPI cards visible. Two charts rendered. |
| S2 | User selects "Recettes touristiques" indicator | Charts update to show REVENUE data. KPI card for revenue is highlighted. |
| S3 | User narrows year range to 2020–2025 | Line chart zooms into the 2020–2025 window. Bar chart still shows the latest selected year. |
| S4 | User deselects all regions except Marrakech-Safi and Dakhla-Oued Ed-Dahab | Bar chart shows only two bars. |
| S5 | User hovers over a data point on the line chart | Tooltip shows: value, year, source name, last update date. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | No data exists for the selected year range | Charts show an empty state: "Aucune donnee disponible pour cette periode." |
| F2 | API returns 500 | Toast error: "Impossible de charger les statistiques. Veuillez reessayer." Retry button shown. |
| F3 | User selects a single year (yearFrom = yearTo) | Line chart degrades to a single point; bar chart still works normally. |
| F4 | Data exists nationally but not for a specific region | That region's bar is absent; a footnote explains "Donnees non disponibles pour certaines regions." |

---

## Data

### Prisma Model (reference)

```prisma
enum StatisticIndicator {
  TOURISTS
  REVENUE
  NIGHTS
  OCCUPANCY_RATE
}

model Statistic {
  id          String              @id @default(cuid())
  indicator   StatisticIndicator
  value       Float
  year        Int
  region      String?             // null = national aggregate
  source      String              // e.g., "Ministere du Tourisme"
  updatedAt   DateTime            @updatedAt
  createdAt   DateTime            @default(now())
  createdById String
  createdBy   User                @relation(fields: [createdById], references: [id])

  @@unique([indicator, year, region])
}
```

### Input (filters from client)

| Field | Type | Required | Default | Validation |
|-------|------|----------|---------|------------|
| indicator | `StatisticIndicator` | No | `TOURISTS` | Must be one of the enum values |
| yearFrom | `number` | No | Current year minus 9 | >= 2000, <= current year |
| yearTo | `number` | No | Current year | >= yearFrom, <= current year |
| regions | `string` (comma-separated slugs) | No | All regions | Each slug must match a known region |

### Output — KPI Card

```ts
interface KpiCard {
  indicator: StatisticIndicator;
  value: number;
  unit: string;           // "visiteurs", "MAD", "nuitees", "%"
  year: number;
  source: string;
  updatedAt: string;      // ISO date
  changePercent?: number; // vs. previous year, nullable
}
```

### Output — Yearly Series Point

```ts
interface SeriesPoint {
  year: number;
  value: number;
  source: string;
  updatedAt: string;
}
```

### Output — Regional Breakdown Item

```ts
interface RegionalItem {
  region: string;       // e.g., "Marrakech-Safi"
  regionSlug: string;   // e.g., "marrakech-safi"
  value: number;
  source: string;
  updatedAt: string;
}
```

### Region Reference List

| Region | Slug |
|--------|------|
| Marrakech-Safi | `marrakech-safi` |
| Souss-Massa | `souss-massa` |
| Tanger-Tetouan-Al Hoceima | `tanger-tetouan` |
| Fes-Meknes | `fes-meknes` |
| Rabat-Sale-Kenitra | `rabat-sale-kenitra` |
| Dakhla-Oued Ed-Dahab | `dakhla-oued-ed-dahab` |
| Casablanca-Settat | `casablanca-settat` |
| Oriental | `oriental` |
| Beni Mellal-Khenifra | `beni-mellal-khenifra` |
| Draa-Tafilalet | `draa-tafilalet` |
| Guelmim-Oued Noun | `guelmim-oued-noun` |
| Laayoune-Sakia El Hamra | `laayoune-sakia-el-hamra` |

---

## Components UI

### Page Layout (`/statistiques`)

```
+----------------------------------------------------------+
|  Header / Navbar                                         |
+----------------------------------------------------------+
|  Page title: "Statistiques du Tourisme au Maroc"         |
|  Subtitle: "Donnees officielles et indicateurs cles"     |
+----------------------------------------------------------+
|  [KPI Card]  [KPI Card]  [KPI Card]  [KPI Card]         |
|  Touristes   Recettes    Nuitees     Taux d'occup.      |
+----------------------------------------------------------+
|  Filter bar:                                             |
|  [ Indicateur v ]  [ Annee de __ a __ ]  [ Regions v ]  |
+----------------------------------------------------------+
|  Section: "Evolution annuelle"                           |
|  +----------------------------------------------------+ |
|  | Recharts <LineChart>                                | |
|  | X-axis: years  Y-axis: value                       | |
|  | Tooltip: value, source, date de mise a jour        | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
|  Section: "Comparaison regionale"                        |
|  +----------------------------------------------------+ |
|  | Recharts <BarChart>                                 | |
|  | X-axis: regions  Y-axis: value                     | |
|  | Tooltip: value, source, date de mise a jour        | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
|  Footer: sources disclaimer                              |
+----------------------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `StatisticsPage` | `app/(public)/statistiques/page.tsx` | Server component. Fetches initial data via server action. |
| `KpiCardGrid` | `components/statistics/KpiCardGrid.tsx` | Renders 4 KPI cards in a responsive grid. |
| `KpiCard` | `components/statistics/KpiCard.tsx` | Single card: icon, label (FR), value, unit, change badge, source tooltip. |
| `StatisticsFilterBar` | `components/statistics/StatisticsFilterBar.tsx` | Client component. Indicator select, year range inputs, region multi-select. |
| `YearlyEvolutionChart` | `components/statistics/YearlyEvolutionChart.tsx` | Client component wrapping Recharts `LineChart`. |
| `RegionalComparisonChart` | `components/statistics/RegionalComparisonChart.tsx` | Client component wrapping Recharts `BarChart`. |
| `SourceBadge` | `components/statistics/SourceBadge.tsx` | Small UI element showing source name + update date. |
| `StatisticsEmptyState` | `components/statistics/StatisticsEmptyState.tsx` | Shown when no data matches the filters. |

### UI Text (French)

| Key | Text |
|-----|------|
| page.title | "Statistiques du Tourisme au Maroc" |
| page.subtitle | "Donnees officielles et indicateurs cles" |
| kpi.tourists | "Touristes" |
| kpi.revenue | "Recettes touristiques" |
| kpi.nights | "Nuitees" |
| kpi.occupancy | "Taux d'occupation moyen" |
| filter.indicator | "Indicateur" |
| filter.yearFrom | "De" |
| filter.yearTo | "A" |
| filter.regions | "Regions" |
| chart.evolution.title | "Evolution annuelle" |
| chart.regional.title | "Comparaison regionale" |
| empty.noData | "Aucune donnee disponible pour cette periode." |
| error.load | "Impossible de charger les statistiques. Veuillez reessayer." |
| source.label | "Source" |
| source.updatedAt | "Mis a jour le" |

---

## API Endpoints

### `GET /api/statistics/summary`

Returns the four KPI cards plus default chart data for initial page load.

**Auth:** Public (no authentication required).

**Query Parameters:** None.

**Response 200:**

```json
{
  "kpis": [
    {
      "indicator": "TOURISTS",
      "value": 14500000,
      "unit": "visiteurs",
      "year": 2025,
      "source": "Ministere du Tourisme",
      "updatedAt": "2026-02-15T10:00:00Z",
      "changePercent": 8.3
    }
  ],
  "yearlySeries": [
    { "year": 2016, "value": 10300000, "source": "Ministere du Tourisme", "updatedAt": "..." }
  ],
  "regionalBreakdown": [
    { "region": "Marrakech-Safi", "regionSlug": "marrakech-safi", "value": 3200000, "source": "...", "updatedAt": "..." }
  ]
}
```

**Response 500:** `{ "error": "Internal server error" }`

---

### `GET /api/statistics/series`

Returns yearly series for a given indicator and year range.

**Auth:** Public.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| indicator | string | Yes | — |
| yearFrom | number | No | current year - 9 |
| yearTo | number | No | current year |

**Response 200:**

```json
{
  "indicator": "REVENUE",
  "series": [
    { "year": 2020, "value": 36700000000, "source": "Bank Al-Maghrib", "updatedAt": "..." }
  ]
}
```

**Response 400:** `{ "error": "Invalid indicator" }`

---

### `GET /api/statistics/regions`

Returns regional breakdown for a given indicator, year, and optional region filter.

**Auth:** Public.

**Query Parameters:**

| Param | Type | Required | Default |
|-------|------|----------|---------|
| indicator | string | Yes | — |
| year | number | Yes | — |
| regions | string (comma-separated slugs) | No | all |

**Response 200:**

```json
{
  "indicator": "TOURISTS",
  "year": 2025,
  "regions": [
    { "region": "Marrakech-Safi", "regionSlug": "marrakech-safi", "value": 3200000, "source": "...", "updatedAt": "..." },
    { "region": "Souss-Massa", "regionSlug": "souss-massa", "value": 1800000, "source": "...", "updatedAt": "..." }
  ]
}
```

**Response 400:** `{ "error": "Invalid indicator or year" }`
