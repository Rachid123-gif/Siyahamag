# Créer un endpoint API

Crée une route API Next.js avec validation et authentification.

## Instructions

1. Demande l'endpoint (ex: "/api/articles", "/api/jobs/[id]/apply")
2. Demande les méthodes HTTP nécessaires (GET, POST, PATCH, DELETE)
3. Consulte `docs/TECHNICAL.md` pour les spécifications de l'endpoint
4. Crée le fichier `route.ts` avec :

### Structure

```typescript
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Schéma de validation
const schema = z.object({ ... })

export async function METHOD(request: Request) {
  // 1. Auth (si requis)
  // 2. Validation input (Zod)
  // 3. Logique métier (Prisma)
  // 4. Réponse JSON
}
```

### Règles

- Validation Zod sur chaque input (body, query params)
- Auth guard via Supabase `getUser()` + vérification rôle dans table User
- Réponses cohérentes : `{ data, error, message }`
- Codes HTTP corrects : 200, 201, 400, 401, 403, 404, 500
- Try/catch avec `{ error: 'Une erreur est survenue' }` en 500
- Pas de données sensibles dans les réponses (emails de contact, etc.)

$ARGUMENTS
