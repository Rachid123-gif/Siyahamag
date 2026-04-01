# Scaffolder un nouveau module

Crée la structure complète pour un module SiyahaMag.

## Instructions

1. Demande le nom du module (ex: "articles", "jobs", "investments", "statistics")
2. Lis la spec correspondante dans `docs/specs/` et `docs/PRODUCT.md`
3. Crée les fichiers suivants :

### Pages (dans `src/app/`)
- Pages publiques dans `(public)/`
- Pages dashboard dans `(dashboard)/`
- Chaque page avec `page.tsx` + `loading.tsx`

### API Routes (dans `src/app/api/`)
- Un fichier `route.ts` par endpoint
- Validation Zod sur chaque input
- Auth guard selon le rôle requis

### Composants (dans `src/components/<module>/`)
- Composants spécifiques au module
- Utiliser shadcn/ui en priorité

### Validations (dans `src/lib/validations/`)
- Schémas Zod pour chaque formulaire

### Types (dans `src/types/`)
- Interfaces TypeScript pour le module

## Checklist après création

- [ ] Toutes les pages sont accessibles
- [ ] Les API routes fonctionnent
- [ ] La validation Zod est en place
- [ ] L'auth guard protège les routes sensibles
- [ ] Le texte UI est en français
- [ ] Les metadata SEO sont configurées sur les pages publiques

$ARGUMENTS
