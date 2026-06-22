# SiyahaMag.ma — Audit SEO & Plan d'évolution premium

> Date : 22 juin 2026
> Objectif : ranker siyahamag.ma en première page de Google au Maroc sur les requêtes tourisme / emploi / investissement.

---

## 1. Audit — état des lieux

### 1.1 Forces (déjà en place)

- Site **en ligne et stable** : HTTP 200, réponse < 0,7 s, HTTPS valide.
- **129 URLs** dans `sitemap.xml` + `news-sitemap.xml`, `robots.txt` correct.
- SEO technique de base : canonical, OpenGraph, hreflang `fr-MA`, JSON-LD (WebSite, Organization, NewsArticle, JobPosting, FAQPage, BreadcrumbList).
- **23 pages « guide »** longues (2000+ mots) — ce sont elles qui ont le vrai potentiel de ranking.
- **Automatisation CI/CD** : 7 workflows GitHub Actions (daily-seo, health-check, link-checker, trending-keywords, weekly-report, refresh-evergreen, keep-supabase-alive).

### 1.2 Problèmes critiques 🔴

| # | Problème | Impact SEO | Statut |
|---|----------|-----------|--------|
| 1 | **Pages `/news/*` minces** : résumé RSS recopié + lien sortant proéminent vers la source | *Thin/scraped content* → non indexé ou pénalisant au niveau domaine ; envoie le trafic chez le concurrent | Corrigé Phase 0 |
| 2 | **Dilution thématique** : foot, festivals de poésie, santé, industrie passent le filtre | Affaiblit l'autorité « tourisme » du domaine | Corrigé Phase 0 |
| 3 | **Plateforme sur données démo** (BDD ~10 % connectée) | Pas de signal d'engagement réel → plafond de ranking | Phase 1 |
| 4 | **Ping sitemap Google mort** (endpoint supprimé en 2023) | Étapes no-op dans 2 workflows | Corrigé |
| 5 | **Pas de suivi Search Console automatisé** | Pilotage à l'aveugle | Phase 1 |
| 6 | **Pas de version arabe** | Gros gisement de trafic non capté au Maroc | Phase 2 |
| 7 | **Backlinks ≈ 0** | Facteur n°1 bloquant sur requêtes compétitives | Phase 3 |

---

## 2. Plan d'évolution premium

### Phase 0 — Assainissement (fait dans ce commit)
- Filtre tourisme durci (1 mot-clé fort requis, hors-sujet exclus).
- Template `/news` : lien source en `nofollow` discret, `noindex` si contenu mince (pas d'IA).
- Suppression du ping sitemap Google obsolète.

### Phase 1 — Connexion réelle + mesure
- Brancher Supabase (emplois, stats, investissements réels).
- Google Search Console API + Indexing API (suivi positions, soumission d'URL).
- Analytics (engagement).

### Phase 2 — Contenu premium qui ranke
- **Génération d'articles originaux via Claude API** (1000-1500 mots, FAQ, JSON-LD, maillage interne) — voir `scripts/ai-content.mjs`.
- Clusters thématiques (pillar + cluster).
- Version arabe des pages piliers (hreflang `ar`).
- E-E-A-T : auteurs, expertise.

### Phase 3 — Autorité & croissance
- Stratégie backlinks (annuaires, partenariats ONMT/CRT, RP digitale).
- Données propriétaires citables (« Observatoire de l'emploi touristique »).
- Optimisation continue pilotée par GSC (pages position 5-15 → page 1).

---

## 3. Plan de tâches automatiques quotidiennes

| Heure (Maroc) | Tâche | Workflow |
|---------------|-------|----------|
| 06h00 | Détection de sujets (Trends MA + RSS + requêtes GSC pos. 5-20) | `trending-keywords.yml` + GSC |
| 06h30 | **Génération 1-2 articles ORIGINAUX (Claude API)** | `daily-seo.yml` → `ai-content.mjs` |
| 07h00 | Publication (commit + push + déploiement, sitemaps) | `daily-seo.yml` |
| 07h15 | Soumission index (Google Indexing API + IndexNow) | `daily-seo.yml` → `google-index.mjs` + `indexnow.mjs` |
| 08h00 | Maillage interne automatique | `daily-seo.yml` |
| 08h30 | Health-check + link-checker | `health-check.yml`, `link-checker.yml` |
| 09h00 | Rafraîchissement page sous-performante (signalée GSC) | (Phase 1) |
| Lundi | Rapport GSC (positions, pages à améliorer) | `weekly-report.yml` |
| Mensuel | Refresh evergreen + rapport « Observatoire » | `refresh-evergreen.yml` |

---

## 4. Attente réaliste

Aucune automatisation ne garantit la page 1 (dépend de la concurrence et des backlinks).

- **1-3 mois** : page 1 sur longue-traîne peu concurrentielle (« emploi réceptionniste hôtel Dakhla »).
- **6-12 mois** : page 1 sur « tourisme Maroc » / « emploi tourisme Maroc », avec contenu premium **+ backlinks**.

---

## 5. Secrets GitHub requis pour activer le premium

Voir `docs/SEO-OPS.md` pour la procédure complète.

| Secret | Usage |
|--------|-------|
| `ANTHROPIC_API_KEY` | Génération d'articles originaux (Claude API) |
| `GOOGLE_INDEXING_SA_JSON` | Service account Google Indexing API (JSON) |
| `INDEXNOW_KEY` | Soumission Bing/Yandex (déjà en place) |
