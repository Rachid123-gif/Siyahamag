# M1 - Article Detail

## Intent

Allow visitors to read a full article on SiyahaMag.com with rich content (text, images, embedded media), share it on social networks, and discover related articles within the same category. The page must be fully SEO-optimized with structured data to maximize organic visibility for Moroccan tourism content. All UI text is in French; all code identifiers are in English.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1.3 | En tant que visiteur, je veux lire un article complet et voir des articles similaires afin de decouvrir plus de contenu. | The article detail page displays the full article content rendered from Tiptap JSON. Below the article, a "Articles similaires" section shows 3 articles from the same category (excluding the current one). |
| US-1.4 | En tant que visiteur, je veux partager un article sur les reseaux sociaux afin de le recommander a mes contacts. | Share buttons for Facebook, LinkedIn, WhatsApp, and a "Copier le lien" button are visible on the article page. Each button opens the appropriate share dialog or copies the URL to the clipboard. |

---

## System Flow

### Reading an Article (US-1.3)

1. Visitor clicks an article card or navigates directly to `/actualites/{slug}`.
2. Server-side rendering (Next.js SSR or SSG with ISR) fetches the article data.
3. API call: `GET /api/articles/{slug}`.
4. Backend queries: `SELECT * FROM Article WHERE slug = :slug AND status = 'PUBLISHED' AND publishedAt <= NOW()`.
5. If found:
   a. The Tiptap JSON body is rendered to HTML on the server using a Tiptap server-side renderer (or pre-rendered HTML stored alongside JSON).
   b. SEO metadata is injected into `<head>`: Open Graph tags, Twitter Card tags, and JSON-LD `Article` schema.
   c. The page renders with: cover image (hero), category badge, title, author name, publication date, rendered body content, share buttons, and similar articles.
6. If not found: return 404 page.
7. Similar articles are fetched: `GET /api/articles?category={currentCategory}&exclude={currentId}&limit=3&status=PUBLISHED`.
8. The 3 similar articles render below the main content as `ArticleCard` components.

### Sharing an Article (US-1.4)

1. Visitor reads an article and wants to share it.
2. Share buttons are displayed in a sticky sidebar (desktop) or fixed bottom bar (mobile).
3. Visitor clicks a share button:

   **Facebook**:
   a. Opens `https://www.facebook.com/sharer/sharer.php?u={encodedArticleUrl}` in a new window (600x400 popup).
   b. Facebook scrapes the page's Open Graph tags for preview.

   **LinkedIn**:
   a. Opens `https://www.linkedin.com/sharing/share-offsite/?url={encodedArticleUrl}` in a new window.
   b. LinkedIn uses Open Graph tags for the share preview.

   **WhatsApp**:
   a. Opens `https://api.whatsapp.com/send?text={encodedTitle}%20{encodedArticleUrl}` in a new tab.
   b. On mobile, opens the WhatsApp app directly.

   **Copy Link**:
   a. Calls `navigator.clipboard.writeText(articleUrl)`.
   b. Button text changes to "Lien copie !" for 2 seconds, then reverts to "Copier le lien".
   c. If clipboard API is unavailable, falls back to a hidden input + `document.execCommand('copy')`.

---

## Scenarios

### Success Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| S1 | View published article | Article with slug "riads-marrakech" exists and is PUBLISHED | Navigate to `/actualites/riads-marrakech` | Full article page renders: hero image, title, category badge, author, date, full body content, share buttons, 3 similar articles. |
| S2 | Tiptap content renders correctly | Article body contains headings, paragraphs, bold, italic, lists, images, and links | View article | All Tiptap node types render as proper HTML with correct styling. Images are responsive with alt text. Links open in new tab for external URLs. |
| S3 | Similar articles displayed | 5+ articles exist in the same category | View article | 3 articles from the same category (not the current one) displayed below content, ordered by `publishedAt` DESC. |
| S4 | Similar articles with fewer available | Only 1 other article in the same category | View article | 1 similar article card displayed. No empty placeholders. Section heading still shows. |
| S5 | Share on Facebook | Article has proper Open Graph tags | Click Facebook share button | New window opens with Facebook share dialog. Preview shows article title, description, and cover image. |
| S6 | Share on LinkedIn | Article has proper Open Graph tags | Click LinkedIn share button | New window opens with LinkedIn share dialog. Preview shows article metadata. |
| S7 | Share on WhatsApp | Article URL is valid | Click WhatsApp share button | WhatsApp opens (app on mobile, web on desktop) with pre-filled message containing title and URL. |
| S8 | Copy article link | Clipboard API available | Click "Copier le lien" button | URL copied to clipboard. Button text changes to "Lien copie !" with a checkmark icon for 2 seconds. |
| S9 | SEO tags present | Article is published | View page source | `<head>` contains: `<title>`, `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter Card tags, and JSON-LD `Article` schema. |
| S10 | Direct URL access | Visitor pastes article URL in browser | Navigate directly | Article page loads fully server-rendered with all SEO metadata (no client-side hydration required for content). |

### Failure / Edge Scenarios

| # | Scenario | Precondition | Action | Expected Result |
|---|----------|-------------|--------|-----------------|
| F1 | Article not found | No article with slug "nonexistent" | Navigate to `/actualites/nonexistent` | 404 page: "Article introuvable. Retourner aux actualites." with link to `/actualites`. HTTP status 404. |
| F2 | Draft article accessed publicly | Article exists but `status = DRAFT` | Navigate to `/actualites/{slug}` | 404 page. Draft articles are not accessible to public visitors. |
| F3 | Scheduled article before publish date | Article status is SCHEDULED, `scheduledAt` is in the future | Navigate to `/actualites/{slug}` | 404 page. Article not visible until scheduled time. |
| F4 | No similar articles | Current article is the only one in its category | View article | "Articles similaires" section is hidden entirely. |
| F5 | Clipboard API unavailable | Browser doesn't support `navigator.clipboard` | Click "Copier le lien" | Fallback method used. If all methods fail, button shows "Echec de la copie" for 2 seconds. |
| F6 | Article with broken image | Cover image URL returns 404 from Supabase Storage | View article | Placeholder image displayed (SiyahaMag branded fallback). Alt text still shown. |
| F7 | Malformed Tiptap JSON | Body JSON is corrupted or invalid | View article | Graceful fallback: plain text extraction attempted. If impossible, show "Contenu indisponible" message with link back to article list. |
| F8 | Share popup blocked | Browser blocks the share popup window | Click Facebook share button | Fallback: open share URL in a new tab instead of a popup. |
| F9 | Very long article | Article body exceeds 5000 words | View article | Content renders fully. Table of contents (optional enhancement) generated from headings. Reading time estimate displayed below title. |
| F10 | Special characters in slug | Slug contains French characters "hotel-de-luxe-a-fes" | Navigate to URL | Slug resolves correctly. UTF-8 characters handled in URL encoding. |

---

## Data

### Input

| Parameter | Type | Source | Validation | Description |
|-----------|------|--------|------------|-------------|
| `slug` | string | URL path `/actualites/{slug}` | Non-empty, alphanumeric + hyphens, max 200 chars | Unique article identifier in the URL |

### Output (API Response)

```typescript
// GET /api/articles/{slug} response
interface ArticleDetailResponse {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: TiptapJSON;             // Raw Tiptap JSON document
  bodyHtml: string;             // Pre-rendered HTML from Tiptap JSON
  coverImageUrl: string;
  category: ArticleCategory;
  status: ArticleStatus;
  publishedAt: string;          // ISO 8601
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  seo: {
    metaTitle: string;          // Defaults to article title + " | SiyahaMag"
    metaDescription: string;    // Defaults to summary or first 160 chars of body
    ogImage: string;            // Defaults to coverImageUrl
    canonicalUrl: string;       // Full URL: https://siyahamag.com/actualites/{slug}
  };
  similarArticles: ArticleSummary[];  // 3 articles from same category
}

// Tiptap JSON structure (simplified)
interface TiptapJSON {
  type: "doc";
  content: TiptapNode[];
}

interface TiptapNode {
  type: string;                 // "paragraph", "heading", "image", "bulletList", etc.
  attrs?: Record<string, any>;
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
}

interface TiptapMark {
  type: string;                 // "bold", "italic", "link", etc.
  attrs?: Record<string, any>;
}
```

### SEO Metadata Output

```html
<!-- Primary Meta Tags -->
<title>{article.title} | SiyahaMag</title>
<meta name="description" content="{article.seo.metaDescription}" />
<link rel="canonical" href="https://siyahamag.com/actualites/{slug}" />

<!-- Open Graph -->
<meta property="og:type" content="article" />
<meta property="og:title" content="{article.title}" />
<meta property="og:description" content="{article.seo.metaDescription}" />
<meta property="og:image" content="{article.seo.ogImage}" />
<meta property="og:url" content="{article.seo.canonicalUrl}" />
<meta property="og:site_name" content="SiyahaMag" />
<meta property="og:locale" content="fr_MA" />
<meta property="article:published_time" content="{article.publishedAt}" />
<meta property="article:modified_time" content="{article.updatedAt}" />
<meta property="article:section" content="{article.category}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{article.title}" />
<meta name="twitter:description" content="{article.seo.metaDescription}" />
<meta name="twitter:image" content="{article.seo.ogImage}" />
```

### JSON-LD Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{article.title}",
  "description": "{article.seo.metaDescription}",
  "image": "{article.coverImageUrl}",
  "datePublished": "{article.publishedAt}",
  "dateModified": "{article.updatedAt}",
  "author": {
    "@type": "Person",
    "name": "{article.author.name}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SiyahaMag",
    "logo": {
      "@type": "ImageObject",
      "url": "https://siyahamag.com/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://siyahamag.com/actualites/{slug}"
  },
  "articleSection": "{article.category}",
  "inLanguage": "fr"
}
```

---

## Components UI

### `ArticleDetailPage`

- **Route**: `/actualites/{slug}`
- **Layout**: Full-width hero image at top, centered content column (max-width 720px), sidebar for share buttons on desktop
- **Sections** (top to bottom):
  1. Hero cover image (full-width, max-height 480px, gradient overlay at bottom)
  2. Category badge + publication date
  3. Article title (`<h1>`)
  4. Author info (avatar + name) + reading time estimate
  5. Share buttons (sticky sidebar desktop / inline mobile)
  6. Article body (rendered Tiptap HTML)
  7. Share buttons (repeated at bottom of article)
  8. Divider
  9. Similar articles section

### `ArticleHero`

- **Props**: `coverImageUrl: string`, `title: string`, `category: ArticleCategory`
- **Elements**:
  - Full-width cover image with aspect ratio 21:9 (desktop) / 16:9 (mobile)
  - Gradient overlay (transparent to dark) at the bottom
  - Category badge overlaid on image (top-left)
- **Image**: `<Image>` (Next.js) with `priority` loading, `sizes` for responsive, WebP format

### `ArticleMeta`

- **Props**: `author: Author`, `publishedAt: string`, `readingTime: number`
- **Elements**:
  - Author avatar (32px circle) + author name
  - Publication date: "Publie le 1 avril 2026"
  - Reading time: "5 min de lecture"
  - Divider line below

### `ArticleBody`

- **Props**: `html: string`
- **Rendering**: Uses `dangerouslySetInnerHTML` with sanitized HTML (DOMPurify on server)
- **Styles**: Scoped typography styles for article content:
  - `h2`: 28px, bold, margin-top 32px
  - `h3`: 22px, semibold, margin-top 24px
  - `p`: 18px, line-height 1.75, margin-bottom 16px
  - `img`: max-width 100%, rounded corners, centered, optional caption
  - `a`: primary color, underlined, opens in new tab (`target="_blank" rel="noopener"`)
  - `ul/ol`: Proper indentation, custom bullet styles
  - `blockquote`: Left border accent, italic, gray background

### `ShareButtons`

- **Props**: `url: string`, `title: string`
- **Layout**: Vertical stack (desktop sidebar) / horizontal row (mobile bottom bar)
- **Buttons**:
  - Facebook: blue icon, opens share popup
  - LinkedIn: blue icon, opens share popup
  - WhatsApp: green icon, opens WhatsApp share
  - Copy link: gray icon, copies URL, shows "Lien copie !" confirmation
- **Desktop**: Sticky positioned sidebar (left of content), becomes fixed after scroll past hero
- **Mobile**: Fixed bottom bar with 4 equally-spaced buttons, appears after scrolling past the hero
- **Accessibility**: Each button has `aria-label` (e.g., "Partager sur Facebook")

### `SimilarArticles`

- **Props**: `articles: ArticleSummary[]`
- **Layout**: Section heading "Articles similaires" + grid of 3 `ArticleCard` components
- **Responsive**: 3 columns desktop, 2 tablet, 1 mobile (with horizontal scroll option)
- **Behavior**: Only renders if `articles.length > 0`
- **Articles**: Use the same `ArticleCard` component from the articles list spec

### `Breadcrumb`

- **Location**: Above the article title
- **Structure**: `Accueil > Actualites > {Category} > {Article Title}`
- **Links**: Each segment links to its respective page
- **SEO**: Uses `BreadcrumbList` JSON-LD schema

---

## API Endpoints

### `GET /api/articles/{slug}`

**Description**: Retrieve a single published article by its slug, including pre-rendered HTML body and similar articles.

**Authentication**: None required (public endpoint).

**Path Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | Article URL slug |

**Response `200 OK`**:

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "title": "Les riads de Marrakech : guide complet 2026",
  "slug": "les-riads-de-marrakech-guide-complet-2026",
  "summary": "Decouvrez notre selection des plus beaux riads de Marrakech...",
  "body": { "type": "doc", "content": [ "..." ] },
  "bodyHtml": "<h2>Introduction</h2><p>Marrakech est celebre pour ses riads...</p>...",
  "coverImageUrl": "https://xyz.supabase.co/storage/v1/object/public/content/articles/cover-riads.webp",
  "category": "HEBERGEMENT",
  "status": "PUBLISHED",
  "publishedAt": "2026-03-25T09:00:00.000Z",
  "createdAt": "2026-03-20T14:30:00.000Z",
  "updatedAt": "2026-03-25T08:55:00.000Z",
  "author": {
    "id": "u-001",
    "name": "Redaction SiyahaMag",
    "avatarUrl": "https://xyz.supabase.co/storage/v1/object/public/avatars/redaction.webp"
  },
  "seo": {
    "metaTitle": "Les riads de Marrakech : guide complet 2026 | SiyahaMag",
    "metaDescription": "Decouvrez notre selection des plus beaux riads de Marrakech pour un sejour authentique au coeur de la medina.",
    "ogImage": "https://xyz.supabase.co/storage/v1/object/public/content/articles/cover-riads.webp",
    "canonicalUrl": "https://siyahamag.com/actualites/les-riads-de-marrakech-guide-complet-2026"
  },
  "similarArticles": [
    {
      "id": "b2c3d4e5-...",
      "title": "Top 10 des hotels de luxe a Casablanca",
      "slug": "top-10-hotels-luxe-casablanca",
      "summary": "Notre classement des etablissements les plus prestigieux...",
      "coverImageUrl": "https://...",
      "category": "HEBERGEMENT",
      "publishedAt": "2026-03-22T10:00:00.000Z",
      "author": { "id": "u-001", "name": "Redaction SiyahaMag" }
    }
  ]
}
```

**Response `404 Not Found`**:

```json
{
  "error": "NOT_FOUND",
  "message": "Article introuvable."
}
```

**Response `500 Internal Server Error`**:

```json
{
  "error": "INTERNAL_ERROR",
  "message": "An unexpected error occurred. Please try again later."
}
```

**Caching**:
- SSR pages cached with ISR (Incremental Static Regeneration): `revalidate: 300` (5 minutes).
- CDN cache: `Cache-Control: public, s-maxage=300, stale-while-revalidate=60`.
- Cache is invalidated when an article is updated or unpublished via admin.

---

## Notes

- **Reading time calculation**: Estimated at 200 words per minute. Extracted from the plain-text content of the Tiptap body. Displayed as "X min de lecture".
- **Image handling in body**: Inline images within the Tiptap body should be rendered as responsive `<figure>` elements with optional `<figcaption>`. Images should use lazy loading (`loading="lazy"`) except for the first image in the body.
- **Sanitization**: The `bodyHtml` must be sanitized server-side with DOMPurify (or equivalent) before being injected via `dangerouslySetInnerHTML` to prevent XSS.
- **Analytics**: Track article views. On page load, fire a `page_view` event with `article_id`, `category`, and `slug` to the analytics provider (e.g., PostHog or Google Analytics).
- **Accessibility**: Article body must have proper heading hierarchy (h2, h3, not skipping levels). Images must have alt text. Share buttons must be keyboard-navigable.
- **Print styles**: Consider a print-friendly stylesheet that hides navigation, share buttons, and similar articles, and optimizes the article body for print.
