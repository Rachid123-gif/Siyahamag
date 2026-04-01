# Checklist pré-déploiement

Vérifie que tout est prêt avant de déployer.

## Instructions

Exécute chaque vérification dans l'ordre et rapporte le résultat.

### 1. Build
- [ ] `npm run build` passe sans erreur
- [ ] Aucun warning TypeScript critique

### 2. Base de données
- [ ] `npx prisma validate` passe
- [ ] `npx prisma generate` passe
- [ ] Les migrations sont à jour
- [ ] Le seed fonctionne sur une DB vide

### 3. Variables d'environnement
- [ ] `.env.example` est à jour avec toutes les variables nécessaires
- [ ] Aucun secret n'est hardcodé dans le code
- [ ] Les variables Vercel sont configurées

### 4. SEO
- [ ] Chaque page publique a des metadata (title, description)
- [ ] Les pages articles ont du JSON-LD Article
- [ ] Les pages offres ont du JSON-LD JobPosting
- [ ] `robots.txt` et `sitemap.xml` sont configurés

### 5. Sécurité
- [ ] Les routes admin sont protégées
- [ ] Les routes API vérifient l'authentification
- [ ] Les uploads sont validés (type, taille)
- [ ] Pas de données sensibles exposées dans les réponses API
- [ ] Les formulaires sont protégés contre le spam (rate limiting)

### 6. Responsive
- [ ] Test mobile (< 640px)
- [ ] Test tablette (768px)
- [ ] Test desktop (1024px+)

### 7. Performance
- [ ] Images optimisées avec `next/image`
- [ ] Lazy loading sur les composants lourds (charts, éditeur)
- [ ] Pas de re-renders inutiles

### 8. Contenu
- [ ] Tous les textes UI sont en français
- [ ] Les messages d'erreur sont explicites
- [ ] Les états vides ont un message approprié

$ARGUMENTS
