# Ajouter une page

Crée une nouvelle page Next.js avec la bonne structure.

## Instructions

1. Demande le chemin de la page (ex: "/actualites/[slug]", "/emploi", "/admin/moderation")
2. Détermine si c'est une page publique `(public)/` ou dashboard `(dashboard)/`
3. Crée les fichiers :

### `page.tsx`
- Server Component par défaut
- Metadata SEO (title, description, openGraph) pour les pages publiques
- Auth guard si page protégée
- Récupération des données via Prisma
- Rendu avec composants shadcn/ui

### `loading.tsx`
- Skeleton de chargement avec les composants shadcn/ui Skeleton

### `error.tsx` (si pertinent)
- Page d'erreur avec message en français

## Conventions

- Texte UI en français
- Utiliser `generateMetadata()` pour les pages dynamiques
- Import des composants depuis `@/components/`
- Pas de `"use client"` sauf si nécessaire (interactivité)

$ARGUMENTS
