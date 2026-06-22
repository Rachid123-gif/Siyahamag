# SEO Ops — Runbook SiyahaMag.ma

Guide opérationnel des automatisations SEO et de leur activation.

---

## 1. Automatisations (GitHub Actions)

| Workflow | Cron (UTC) | Rôle |
|----------|-----------|------|
| `trending-keywords.yml` | 05:30 | Détecte les mots-clés tourisme tendance au Maroc (Google Trends) → issue |
| `daily-seo.yml` | 06:00 | Génère 1-3 articles, commit, push, soumet aux moteurs |
| `health-check.yml` | 08:00 | Vérifie homepage, sitemap, pages clés |
| `link-checker.yml` | 09:00 | Vérifie que chaque URL du sitemap renvoie 200 |
| `weekly-report.yml` | Lundi 09:00 | Rapport SEO hebdomadaire (issue) |
| `refresh-evergreen.yml` | 1er du mois | Rafraîchit la date des pages guide |
| `keep-supabase-alive.yml` | tous les 2 j | Empêche la pause Supabase free-tier |

---

## 2. Génération de contenu — deux modes

Le script `scripts/daily-seo.mjs` :

1. Récupère les flux RSS marocains.
2. Filtre **strictement** par mot-clé tourisme fort dans le titre (le bruit sport/festival/politique/santé est exclu).
3. Pour chaque sujet retenu :
   - **Si `ANTHROPIC_API_KEY` est défini** → `scripts/ai-content.mjs` génère un **article original** (900-1400 mots, intro, sections H2, FAQ, JSON-LD NewsArticle + FAQPage, maillage interne) → page **indexable**.
   - **Sinon** → page résumé **mince marquée `noindex`** (ne dilue pas le domaine).

> Tant que `ANTHROPIC_API_KEY` n'est pas configuré, le système reste sûr : il publie du contenu mince en `noindex` plutôt que du *thin content* indexé.

---

## 3. Soumission aux moteurs

| Outil | Script | Moteurs | Clé requise |
|-------|--------|---------|-------------|
| IndexNow | `scripts/indexnow.mjs` | Bing, Yandex | Clé déjà déposée dans `/public/<key>.txt` |
| Google Indexing API | `scripts/google-index.mjs` | Google (pages `/news/`, `/emplois/`) | `GOOGLE_INDEXING_SA_JSON` |

> Le « ping sitemap » Google a été supprimé (no-op depuis 2023) et retiré des workflows. La découverte Google passe par le sitemap (Search Console) + l'Indexing API.

---

## 4. Secrets GitHub à configurer

Dans **Settings → Secrets and variables → Actions** du dépôt :

### 4.1 `ANTHROPIC_API_KEY` (recommandé — active le contenu premium)
1. Créer une clé sur https://console.anthropic.com/
2. Ajouter le secret `ANTHROPIC_API_KEY`.
3. Le prochain run de `daily-seo` générera des articles originaux.

Modèle par défaut : `claude-opus-4-8` (surchargeable via la variable `AI_MODEL`).

### 4.2 `GOOGLE_INDEXING_SA_JSON` (recommandé — indexation rapide Google)
1. Google Cloud Console → créer un projet → activer **Indexing API**.
2. Créer un **service account**, générer une **clé JSON**.
3. Dans **Google Search Console** → propriété siyahamag.ma → Paramètres → Utilisateurs → ajouter l'email du service account en **Propriétaire**.
4. Coller tout le contenu du fichier JSON dans le secret `GOOGLE_INDEXING_SA_JSON`.

---

## 5. Vérifications manuelles utiles

```bash
# Le filtre tourisme et la génération (sans clé = mode thin)
node scripts/daily-seo.mjs

# Avec génération IA en local
ANTHROPIC_API_KEY=sk-ant-... node scripts/daily-seo.mjs

# Soumettre une URL à Google
URLS="https://siyahamag.ma/emplois/marrakech" \
GOOGLE_INDEXING_SA_JSON="$(cat sa.json)" node scripts/google-index.mjs
```

À surveiller hebdomadairement dans **Search Console** :
- Pages indexées vs sitemap (couverture).
- Requêtes en position 5-20 → cibles prioritaires à renforcer.
- Pages à fort taux d'impressions mais faible CTR → réécrire title/description.

---

## 6. Feuille de route (voir `AUDIT-SEO-2026.md`)

- **Phase 0** (fait) : assainissement filtre + contenu mince.
- **Phase 1** : connexion Supabase réelle + suivi GSC.
- **Phase 2** : contenu premium IA + clusters + version arabe.
- **Phase 3** : backlinks + données propriétaires citables.
