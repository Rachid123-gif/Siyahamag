# SiyahaMag.com — Claude Code Instructions

## Projet

SiyahaMag.com est la première plateforme marocaine combinant **média touristique + emploi spécialisé + statistiques + investissement**. 5 modules, 46 user stories.

**Langue UI :** Français uniquement | **Code :** Anglais

## Stack

- **Framework :** Next.js 16 (App Router, Server Components, Server Actions)
- **Base de données :** Supabase (PostgreSQL) via Prisma ORM
- **Auth :** Supabase Auth (email/password)
- **Storage :** Supabase Storage (avatars, cvs, content)
- **Styling :** Tailwind CSS + shadcn/ui
- **Rich text :** Tiptap (stockage JSON, pas HTML)
- **Charts :** Recharts
- **Emails :** Resend API
- **Validation :** Zod
- **Hébergement :** Vercel + Supabase

## Documentation

Toujours lire la documentation pertinente AVANT d'implémenter :

| Fichier | Contenu |
|---------|---------|
| `docs/PRODUCT.md` | Cahier des fonctionnalités complet (source de vérité) |
| `docs/TECHNICAL.md` | Schéma DB, API, Auth, Storage, Emails, SEO, phases de build |
| `docs/UI.md` | Palette, typographie, composants, conventions UI françaises |
| `docs/specs/*.md` | Feature specs détaillées (Intent, Flow, Scenarios) |

## Workflow de développement

Pour chaque fonctionnalité, suivre cet ordre :

1. **Lire la spec** — `docs/specs/<feature>.md` + sections pertinentes de `PRODUCT.md`
2. **DB** — Vérifier/créer les modèles Prisma nécessaires, migrer
3. **API** — Créer les routes API avec validation Zod + auth
4. **UI** — Construire les pages et composants (Server Components par défaut)
5. **Test** — Vérifier manuellement que tout fonctionne
6. **Commit** — Un commit par fonctionnalité complète

## Conventions de code

### Fichiers et dossiers
- Routes : `src/app/(public)/` et `src/app/(dashboard)/`
- Composants : `src/components/<module>/` (PascalCase, ex: `ArticleCard.tsx`)
- API routes : `src/app/api/<resource>/route.ts`
- Lib : `src/lib/<concern>.ts`
- Types : `src/types/<module>.ts`
- Validations : `src/lib/validations/<module>.ts`
- Hooks : `src/hooks/use<Name>.ts`

### Nommage
- **Composants :** PascalCase (`ArticleCard.tsx`)
- **Fichiers utilitaires :** camelCase (`formatDate.ts`)
- **DB tables :** PascalCase dans Prisma, snake_case dans PostgreSQL (Prisma gère via `@@map`)
- **API routes :** kebab-case (`/api/job-listings`)
- **Variables/fonctions :** camelCase en anglais
- **Texte UI :** Français uniquement

### Composants
- Server Components par défaut, `"use client"` uniquement si nécessaire (interactivité, hooks)
- Utiliser shadcn/ui avant de créer un composant custom
- Props typées avec TypeScript interfaces
- Pas de `any` — typer correctement

### Base de données
- Toujours passer par Prisma (jamais de SQL direct)
- Relations explicites avec `@relation`
- Soft delete avec `deletedAt` pour les données sensibles
- `createdAt` et `updatedAt` sur chaque modèle

### API Routes
- Validation Zod sur chaque input
- Vérification auth via Supabase `getUser()`
- Retourner des réponses JSON cohérentes : `{ data, error, message }`
- Codes HTTP corrects (200, 201, 400, 401, 403, 404, 500)

## Règles strictes

1. **JAMAIS** implémenter sans avoir lu la spec correspondante dans `docs/specs/`
2. **Texte UI en français** — Tous les labels, boutons, messages d'erreur, placeholders en français
3. **Code en anglais** — Variables, fonctions, commentaires en anglais
4. **shadcn/ui d'abord** — Toujours vérifier si un composant shadcn/ui existe avant de créer un custom
5. **Pas de données mockées en prod** — Utiliser le seed uniquement en dev
6. **Validation côté serveur** — Ne jamais faire confiance au client seul
7. **Images optimisées** — Utiliser `next/image` avec des dimensions explicites
8. **SEO** — Chaque page publique doit avoir des metadata (title, description, og:image)
9. **Responsive** — Mobile-first, tester sur 3 breakpoints (mobile, tablette, desktop)
10. **Accessibilité** — Labels sur les formulaires, alt sur les images, navigation clavier

## Patterns communs

### Auth Guard (Server Component)
```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')
  // ...
}
```

### Auth Guard (API Route)
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  // ...
}
```

### Validation Zod
```typescript
import { z } from 'zod'

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200),
  categoryId: z.string().uuid(),
  content: z.any(), // Tiptap JSON
  summary: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
})
```

### File Upload (Supabase Storage)
```typescript
const { data, error } = await supabase.storage
  .from('cvs')
  .upload(`${userId}/${fileName}`, file, {
    contentType: file.type,
    upsert: true,
  })
```

### Email (Resend)
```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'SiyahaMag <noreply@siyahamag.com>',
  to: email,
  subject: 'Votre candidature a été envoyée',
  html: template,
})
```

### SEO Metadata
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offres d\'emploi tourisme Maroc | SiyahaMag',
  description: 'Trouvez votre emploi dans le secteur touristique marocain.',
  openGraph: {
    title: 'SiyahaMag — Emploi Tourisme Maroc',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

## Phases de build

| Phase | Module | Dépendances |
|-------|--------|-------------|
| 1 | Auth + Layout + Navigation | Aucune |
| 2 | Module 1 — Articles & Actualités | Auth |
| 3 | Module 2A — Employeurs & Offres | Auth |
| 4 | Module 2B — Candidats & Candidatures | Auth, Module 2A |
| 5 | Module 3 — Statistiques | Auth |
| 6 | Module 4 — Investissement | Auth |
| 7 | Module 5 — Admin Dashboard | Tous les modules |

## Notes techniques importantes

### Next.js 16
- `middleware.ts` est renommé `proxy.ts` — exporter `proxy()` au lieu de `middleware()`
- Lire `node_modules/next/dist/docs/` pour les API à jour

### Prisma 7
- Utilise `prisma-client` (pas `prisma-client-js`) comme provider
- Le client est généré dans `src/generated/prisma/`
- Import depuis `@/generated/prisma/client` (pas `@prisma/client`)
- Requiert un adapter : `new PrismaClient({ adapter: new PrismaPg(connectionString) })`
- Le datasource URL est dans `prisma.config.ts` (pas dans `schema.prisma`)

### Zod 4
- `z.enum()` second argument : `{ message: '...' }` (pas `{ required_error: '...' }`)
- Vérifier la doc Zod 4 pour les breaking changes

## Commandes utiles

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npx prisma migrate dev  # Appliquer les migrations
npx prisma generate  # Générer le client Prisma
npx prisma studio    # Interface DB visuelle
npx prisma db seed   # Peupler la DB avec les données de test
```
