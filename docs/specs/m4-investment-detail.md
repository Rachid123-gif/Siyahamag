# M4 — Investment Detail & Contact

## Intent

When an investor clicks on a listing card, they land on a rich detail page that gives them everything they need to evaluate the opportunity: a photo gallery, full description, location, characteristics (surface, rooms, condition, price), and seller identity (name and company only — no direct contact info is exposed). The investor can reach the seller through a secure contact form that relays the message by email, ensuring privacy for both parties. A "report" button allows anyone to flag suspicious or fraudulent listings.

---

## User Stories Covered

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-4.3 | En tant qu'investisseur, je veux voir les photos et les details d'une opportunite afin d'evaluer si elle m'interesse. | Detail page shows: photo gallery (swipeable), full description (rich text), city, characteristics table (surface, rooms, condition, price), seller name and company. |
| US-4.4 | En tant qu'investisseur, je veux contacter le vendeur via un formulaire securise afin de poser des questions sans que mon email soit expose. | A "Contacter le vendeur" button opens a contact form. The form sends a message to the seller's email via Resend. The investor's email is included in the message body so the seller can reply. Neither party's email is shown in the UI. |

---

## System Flow

### Page Load

```
1. User navigates to /investissements/[slug]
2. Server component fetches the investment by slug:
   GET /api/investments/[slug]
3. API queries Prisma:
   - WHERE slug = :slug AND status = APPROVED
   - Include all photos (ordered by `order`)
   - Include seller (name, company only — NOT email/phone)
4. If not found or not APPROVED: return 404.
5. API returns the full InvestmentDetail object.
6. Page renders:
   a. Photo gallery (top)
   b. Title, type badge, city
   c. Price (prominent)
   d. Characteristics table
   e. Description (rendered from Tiptap HTML)
   f. Seller info card
   g. "Contacter le vendeur" button
   h. "Signaler cette annonce" button
```

### Contact Seller Flow

```
1. User clicks "Contacter le vendeur".
2. If not authenticated: redirect to /connexion?redirect=/investissements/[slug]
3. If authenticated: modal opens with the contact form.
4. User fills in:
   - Subject (pre-filled with investment title, editable)
   - Message (textarea, required, min 20 characters)
5. User clicks "Envoyer".
6. Client sends POST /api/investments/[id]/contact
   Body: { subject, message }
7. Server:
   a. Validates the message (non-empty, min length).
   b. Looks up the investment and seller's email.
   c. Sends an email via Resend:
      - To: seller's contactEmail
      - From: noreply@siyahamag.com
      - Reply-To: the authenticated user's email
      - Subject: "[SiyahaMag] Demande concernant: {investment title}"
      - Body: includes the message, the investment title/link, and the sender's name.
   d. Optionally logs the contact attempt in a ContactLog table for analytics/abuse prevention.
8. Server responds 200: { success: true }
9. Client shows success toast: "Votre message a ete envoye au vendeur."
10. Modal closes.
```

### Report Listing Flow

```
1. User clicks "Signaler cette annonce".
2. If not authenticated: redirect to /connexion.
3. If authenticated: small modal opens.
4. User selects a reason:
   - "Annonce frauduleuse"
   - "Contenu inapproprie"
   - "Informations incorrectes"
   - "Autre"
5. User optionally adds a comment.
6. Client sends POST /api/investments/[id]/report
   Body: { reason, comment? }
7. Server creates an InvestmentReport record.
8. Server responds 201.
9. Client shows toast: "Merci pour votre signalement. Notre equipe va examiner cette annonce."
10. Modal closes.
```

---

## Scenarios

### Success Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| S1 | User opens a listing detail page | Full detail page renders: gallery, description, characteristics, seller info. |
| S2 | User swipes through photo gallery | All photos (up to 10) are navigable. Current photo index shown (e.g., "3/7"). |
| S3 | Authenticated user sends a contact message | Email delivered to seller via Resend. Success toast shown. Modal closes. |
| S4 | Seller receives the email | Email contains: message text, investment title, link to the listing, sender's name, Reply-To header with sender's email. |
| S5 | User reports a listing | Report saved in database. Toast confirmation. Admin will see it in the moderation queue. |
| S6 | User visits the page and listing has no optional fields (rooms = null, surface = null) | Those rows are simply omitted from the characteristics table. No empty rows. |

### Failure / Edge Scenarios

| # | Scenario | Expected Result |
|---|----------|-----------------|
| F1 | Slug does not exist or listing is not APPROVED | 404 page: "Cette annonce n'existe pas ou n'est plus disponible." |
| F2 | Unauthenticated user clicks "Contacter le vendeur" | Redirected to /connexion with redirect param back to this page. |
| F3 | User submits empty message | Validation error: "Le message doit contenir au moins 20 caracteres." |
| F4 | Email delivery fails (Resend error) | Server returns 500. Client shows: "Erreur lors de l'envoi du message. Veuillez reessayer." Form data preserved. |
| F5 | User tries to report the same listing twice | Server returns 409: "Vous avez deja signale cette annonce." |
| F6 | Listing has no photos | A placeholder image is shown instead of the gallery. |
| F7 | User tries to contact their own listing | Server returns 400: "Vous ne pouvez pas contacter votre propre annonce." |

---

## Data

### Prisma Models (reference — additions to Investment model)

```prisma
model InvestmentReport {
  id            String     @id @default(cuid())
  reason        String     // "frauduleuse", "inapproprie", "incorrecte", "autre"
  comment       String?
  investmentId  String
  investment    Investment @relation(fields: [investmentId], references: [id], onDelete: Cascade)
  reporterId    String
  reporter      User       @relation(fields: [reporterId], references: [id])
  status        ReportStatus @default(PENDING)
  createdAt     DateTime   @default(now())

  @@unique([investmentId, reporterId]) // One report per user per listing
}

enum ReportStatus {
  PENDING
  REVIEWED
  DISMISSED
}

model ContactLog {
  id            String     @id @default(cuid())
  investmentId  String
  senderId      String
  subject       String
  createdAt     DateTime   @default(now())
}
```

### Output — Investment Detail

```ts
interface InvestmentDetail {
  id: string;
  slug: string;
  title: string;
  type: InvestmentType;
  description: string;          // Tiptap HTML
  price: number;
  city: string;
  region: string;
  surface: number | null;
  rooms: number | null;
  condition: InvestmentCondition | null;
  photos: {
    id: string;
    url: string;
    alt: string | null;
    order: number;
  }[];
  seller: {
    name: string;
    company: string | null;
  };
  createdAt: string;
  updatedAt: string;
}
```

Note: `seller.email`, `seller.phone` are **never** included in the public API response.

### Input — Contact Form

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| subject | `string` | Yes | 1–200 characters. Pre-filled with investment title. |
| message | `string` | Yes | Min 20 characters, max 2000 characters. |

### Input — Report Form

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| reason | `string` | Yes | One of: `frauduleuse`, `inapproprie`, `incorrecte`, `autre` |
| comment | `string` | No | Max 500 characters |

---

## Components UI

### Page Layout (`/investissements/[slug]`)

```
+----------------------------------------------------------+
|  Header / Navbar                                         |
+----------------------------------------------------------+
|  Breadcrumb: Investissements > Riad Traditionnel a ...   |
+----------------------------------------------------------+
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |           Photo Gallery (swipeable)                |  |
|  |           < [  Photo 3/7  ] >                      |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
+----------------------------------------------------------+
|  Left Column (2/3)          |  Right Column (1/3)        |
|                             |                            |
|  Title: "Riad Tradition..." |  +----------------------+  |
|  Type badge: [Riad]         |  | Prix                 |  |
|  City: Marrakech            |  | 2 500 000 MAD        |  |
|  Posted: 15 mars 2026       |  +----------------------+  |
|                             |                            |
|  Caracteristiques:          |  +----------------------+  |
|  +------------------------+ |  | Vendeur              |  |
|  | Surface  | 350 m2      | |  | Nom: Ahmed B.        |  |
|  | Chambres | 8           | |  | Societe: Invest SA   |  |
|  | Etat     | En activite | |  +----------------------+  |
|  | Prix     | 2 500 000   | |                            |
|  +------------------------+ |  [ Contacter le vendeur ]  |
|                             |                            |
|  Description:               |  [ Signaler cette annonce ]|
|  (rendered Tiptap HTML)     |  (text link, subtle)       |
|  ...                        |                            |
+----------------------------------------------------------+
|  Footer                                                  |
+----------------------------------------------------------+
```

### Component Tree

| Component | File | Description |
|-----------|------|-------------|
| `InvestmentDetailPage` | `app/(public)/investissements/[slug]/page.tsx` | Server component. Fetches investment by slug. Returns 404 if not found. |
| `InvestmentPhotoGallery` | `components/investments/InvestmentPhotoGallery.tsx` | Client component. Swipeable gallery with thumbnails. Supports keyboard navigation. |
| `InvestmentCharacteristics` | `components/investments/InvestmentCharacteristics.tsx` | Table of characteristics. Omits null fields. |
| `InvestmentDescription` | `components/investments/InvestmentDescription.tsx` | Renders Tiptap HTML safely (sanitized). |
| `SellerInfoCard` | `components/investments/SellerInfoCard.tsx` | Displays seller name and company. No contact info. |
| `ContactSellerButton` | `components/investments/ContactSellerButton.tsx` | Opens contact modal. Checks auth first. |
| `ContactSellerModal` | `components/investments/ContactSellerModal.tsx` | Modal with subject + message fields. Sends via API. |
| `ReportListingButton` | `components/investments/ReportListingButton.tsx` | Opens report modal. Checks auth first. |
| `ReportListingModal` | `components/investments/ReportListingModal.tsx` | Modal with reason select + optional comment. |
| `InvestmentBreadcrumb` | `components/investments/InvestmentBreadcrumb.tsx` | Breadcrumb: Investissements > {title}. |

### UI Text (French)

| Key | Text |
|-----|------|
| breadcrumb.list | "Investissements" |
| characteristics.title | "Caracteristiques" |
| characteristics.surface | "Surface" |
| characteristics.surfaceUnit | "m2" |
| characteristics.rooms | "Chambres" |
| characteristics.condition | "Etat" |
| characteristics.price | "Prix" |
| condition.neuf | "Neuf" |
| condition.aRenover | "A renover" |
| condition.enActivite | "En activite" |
| description.title | "Description" |
| seller.title | "Vendeur" |
| seller.company | "Societe" |
| contact.button | "Contacter le vendeur" |
| contact.modal.title | "Contacter le vendeur" |
| contact.form.subject | "Objet" |
| contact.form.message | "Votre message" |
| contact.form.messagePlaceholder | "Decrivez votre interet pour cette opportunite..." |
| contact.form.send | "Envoyer" |
| contact.form.cancel | "Annuler" |
| contact.success | "Votre message a ete envoye au vendeur." |
| contact.error | "Erreur lors de l'envoi du message. Veuillez reessayer." |
| contact.minLength | "Le message doit contenir au moins 20 caracteres." |
| contact.ownListing | "Vous ne pouvez pas contacter votre propre annonce." |
| report.button | "Signaler cette annonce" |
| report.modal.title | "Signaler cette annonce" |
| report.reason.label | "Raison du signalement" |
| report.reason.frauduleuse | "Annonce frauduleuse" |
| report.reason.inapproprie | "Contenu inapproprie" |
| report.reason.incorrecte | "Informations incorrectes" |
| report.reason.autre | "Autre" |
| report.comment | "Commentaire (optionnel)" |
| report.submit | "Envoyer le signalement" |
| report.success | "Merci pour votre signalement. Notre equipe va examiner cette annonce." |
| report.duplicate | "Vous avez deja signale cette annonce." |
| notFound | "Cette annonce n'existe pas ou n'est plus disponible." |
| photo.counter | "{current}/{total}" |

---

## API Endpoints

### `GET /api/investments/[slug]`

Returns the full detail of an approved investment listing.

**Auth:** Public (no authentication required).

**Path Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| slug | string | URL-friendly unique identifier |

**Response 200:**

```json
{
  "id": "clx...",
  "slug": "riad-traditionnel-marrakech",
  "title": "Riad Traditionnel a Marrakech",
  "type": "RIAD",
  "description": "<p>Magnifique riad de 350m2 situe en plein coeur de la medina...</p>",
  "price": 2500000,
  "city": "Marrakech",
  "region": "marrakech-safi",
  "surface": 350,
  "rooms": 8,
  "condition": "EN_ACTIVITE",
  "photos": [
    { "id": "ph1", "url": "https://storage.supabase.co/...", "alt": "Facade", "order": 0 },
    { "id": "ph2", "url": "https://storage.supabase.co/...", "alt": "Patio", "order": 1 }
  ],
  "seller": {
    "name": "Ahmed Bennani",
    "company": "Invest Tourisme SA"
  },
  "createdAt": "2026-03-15T09:00:00Z",
  "updatedAt": "2026-03-15T09:00:00Z"
}
```

**Response 404:** `{ "error": "Cette annonce n'existe pas ou n'est plus disponible." }`

---

### `POST /api/investments/[id]/contact`

Sends a contact message from an authenticated user to the listing's seller via email (Resend).

**Auth:** Authenticated user required. Must not be the seller of this listing.

**Request Body:**

```json
{
  "subject": "Interet pour le Riad Traditionnel a Marrakech",
  "message": "Bonjour, je suis interesse par votre riad. Serait-il possible d'organiser une visite la semaine prochaine ?"
}
```

**Validation:**
- `subject`: required, 1–200 characters
- `message`: required, 20–2000 characters

**Server-side logic:**
1. Fetch the investment and seller's contactEmail.
2. Build the email:
   - **To:** seller's contactEmail
   - **From:** `SiyahaMag <noreply@siyahamag.com>`
   - **Reply-To:** authenticated user's email
   - **Subject:** `[SiyahaMag] Demande concernant: {investment.title}`
   - **Body (HTML):** formatted message with investment link, sender name, and message content.
3. Send via Resend SDK.
4. Log the contact in `ContactLog`.

**Response 200:** `{ "success": true }`

**Response 400:** `{ "error": "Vous ne pouvez pas contacter votre propre annonce." }` or validation errors.

**Response 401:** `{ "error": "Non authentifie" }`

**Response 404:** `{ "error": "Annonce introuvable." }`

**Response 500:** `{ "error": "Erreur lors de l'envoi du message." }`

---

### `POST /api/investments/[id]/report`

Creates a report for a listing.

**Auth:** Authenticated user required.

**Request Body:**

```json
{
  "reason": "frauduleuse",
  "comment": "Les photos semblent etre copiees d'un autre site."
}
```

**Validation:**
- `reason`: required, one of `frauduleuse`, `inapproprie`, `incorrecte`, `autre`
- `comment`: optional, max 500 characters

**Response 201:** `{ "id": "rpt_...", "message": "Signalement enregistre." }`

**Response 401:** `{ "error": "Non authentifie" }`

**Response 404:** `{ "error": "Annonce introuvable." }`

**Response 409:** `{ "error": "Vous avez deja signale cette annonce." }`
