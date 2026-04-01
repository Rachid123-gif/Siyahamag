# SiyahaMag.com — Guidelines UI/UX

> Langue UI : **Français uniquement**

---

## Palette de couleurs

Orientée tourisme, Maroc, professionnalisme.

### Couleurs principales

| Nom | Hex | Usage |
|-----|-----|-------|
| **Bleu Océan** (Primary) | `#0C4A6E` | Headers, boutons principaux, liens |
| **Bleu Ciel** (Primary Light) | `#0EA5E9` | Hover, accents, badges |
| **Or Sahara** (Accent) | `#D97706` | CTA secondaires, badges « Vérifié », highlights |
| **Vert Oasis** (Success) | `#059669` | Statuts positifs, badge vérifié |
| **Rouge Médina** (Danger) | `#DC2626` | Erreurs, suppression, alertes |

### Couleurs neutres

| Nom | Hex | Usage |
|-----|-----|-------|
| **Blanc** | `#FFFFFF` | Fond principal |
| **Gris Clair** | `#F8FAFC` | Fond secondaire, sections alternées |
| **Gris Moyen** | `#64748B` | Texte secondaire, labels |
| **Gris Foncé** | `#1E293B` | Texte principal |
| **Noir** | `#0F172A` | Titres, headers |

### Tailwind config

```typescript
colors: {
  primary: {
    DEFAULT: '#0C4A6E',
    light: '#0EA5E9',
    50: '#F0F9FF',
    100: '#E0F2FE',
    500: '#0EA5E9',
    700: '#0C4A6E',
    900: '#0C4A6E',
  },
  accent: {
    DEFAULT: '#D97706',
    light: '#FBBF24',
  },
  success: '#059669',
  danger: '#DC2626',
}
```

---

## Typographie

| Élément | Font | Taille | Poids |
|---------|------|--------|-------|
| H1 | Inter | 2.25rem (36px) | Bold (700) |
| H2 | Inter | 1.875rem (30px) | Semibold (600) |
| H3 | Inter | 1.5rem (24px) | Semibold (600) |
| H4 | Inter | 1.25rem (20px) | Medium (500) |
| Body | Inter | 1rem (16px) | Regular (400) |
| Small | Inter | 0.875rem (14px) | Regular (400) |
| Caption | Inter | 0.75rem (12px) | Medium (500) |

**Police :** Inter (Google Fonts) — Lisible, moderne, bonne gestion du français (accents).

---

## Espacements

Utiliser le système d'espacement Tailwind par défaut :

| Taille | Pixels | Usage |
|--------|--------|-------|
| `space-1` | 4px | Micro-espacement (entre icône et texte) |
| `space-2` | 8px | Espacement compact |
| `space-4` | 16px | Espacement standard |
| `space-6` | 24px | Espacement entre éléments |
| `space-8` | 32px | Espacement entre sections |
| `space-12` | 48px | Espacement entre grandes sections |
| `space-16` | 64px | Marge de page |

### Container

```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

---

## Breakpoints responsive

| Breakpoint | Taille | Layout |
|-----------|--------|--------|
| Mobile | < 640px | 1 colonne, menu hamburger, stack vertical |
| Tablette | 768px+ | 2 colonnes, sidebar optionnelle |
| Desktop | 1024px+ | 3-4 colonnes, navigation complète |

### Règles

- **Mobile-first** : écrire les styles mobile par défaut, puis `md:` et `lg:`
- Cards articles : 1 col → 2 col (md) → 3 col (lg)
- Cards offres : 1 col → 2 col (lg)
- Formulaires : pleine largeur → max-w-xl centré (md)
- Sidebar dashboard : menu hamburger (mobile) → sidebar fixe (lg)

---

## Conventions de texte français

### Boutons

| Action | Texte |
|--------|-------|
| Créer | « Publier », « Créer », « Ajouter » |
| Modifier | « Modifier », « Enregistrer » |
| Supprimer | « Supprimer » (avec confirmation) |
| Annuler | « Annuler » |
| Soumettre | « Envoyer », « Postuler », « Soumettre » |
| Connexion | « Se connecter » |
| Inscription | « Créer un compte » |
| Recherche | « Rechercher » |
| Filtrer | « Filtrer » |
| Voir plus | « Voir plus », « Tout voir » |

### Messages d'état

| Type | Exemple |
|------|---------|
| Succès | « Votre article a été publié avec succès. » |
| Erreur | « Une erreur est survenue. Veuillez réessayer. » |
| Validation | « Ce champ est requis. », « L'email n'est pas valide. » |
| Vide | « Aucun article trouvé. », « Aucune offre ne correspond à vos critères. » |
| Chargement | « Chargement en cours... » |
| Confirmation | « Êtes-vous sûr de vouloir supprimer cet élément ? » |

### Formulaires

- Labels au-dessus du champ (pas inline)
- Placeholders en gris clair, informatifs : « Ex: Réceptionniste bilingue »
- Messages d'erreur en rouge sous le champ
- Champs obligatoires marqués avec `*`
- Bouton de soumission désactivé pendant l'envoi

---

## Composants shadcn/ui à utiliser

### Layout & Navigation

| Composant | Usage |
|-----------|-------|
| `NavigationMenu` | Barre de navigation principale |
| `Sheet` | Menu mobile (sidebar) |
| `Breadcrumb` | Fil d'Ariane (pages internes) |
| `Tabs` | Navigation entre sous-sections |
| `Separator` | Séparation visuelle |

### Formulaires

| Composant | Usage |
|-----------|-------|
| `Form` (react-hook-form + Zod) | Tous les formulaires |
| `Input` | Champs texte |
| `Textarea` | Champs texte long |
| `Select` | Listes déroulantes |
| `Checkbox` | Cases à cocher |
| `RadioGroup` | Choix exclusifs |
| `Calendar` + `Popover` | Sélection de date |
| `Label` | Labels de champ |

### Affichage

| Composant | Usage |
|-----------|-------|
| `Card` | Articles, offres, opportunités |
| `Badge` | Statuts, catégories, « Vérifié » |
| `Avatar` | Photos de profil |
| `Table` | Listes admin, candidatures |
| `Pagination` | Navigation entre pages |
| `Skeleton` | États de chargement |

### Feedback

| Composant | Usage |
|-----------|-------|
| `Toast` | Notifications de succès/erreur |
| `Alert` | Messages importants |
| `AlertDialog` | Confirmations de suppression |
| `Dialog` | Modales (formulaires rapides) |

### Actions

| Composant | Usage |
|-----------|-------|
| `Button` | Tous les boutons |
| `DropdownMenu` | Menus d'actions (modifier, supprimer) |
| `Command` | Recherche rapide (palette) |

---

## Composants personnalisés à créer

| Composant | Description |
|-----------|-------------|
| `RichTextEditor` | Wrapper Tiptap avec toolbar |
| `RichTextRenderer` | Rendu du JSON Tiptap en HTML |
| `FileUpload` | Upload drag-and-drop (CV, images) |
| `ImageGallery` | Galerie d'images (investissements) |
| `ShareButtons` | Partage Facebook/LinkedIn/WhatsApp |
| `StatCard` | Carte de statistique avec icône et valeur |
| `SearchBar` | Barre de recherche avec suggestions |
| `VerifiedBadge` | Badge « Entreprise vérifiée » |
| `StatusBadge` | Badge de statut coloré |
| `EmptyState` | État vide avec illustration et CTA |

---

## Iconographie

Utiliser **Lucide Icons** (inclus avec shadcn/ui).

| Contexte | Icônes |
|----------|--------|
| Navigation | `Home`, `Newspaper`, `Briefcase`, `BarChart3`, `Building2`, `Settings` |
| Actions | `Plus`, `Pencil`, `Trash2`, `Search`, `Filter`, `Share2` |
| Statuts | `Check`, `X`, `Clock`, `AlertTriangle`, `Eye`, `EyeOff` |
| Utilisateurs | `User`, `Building`, `Shield`, `BadgeCheck` |
| Fichiers | `Upload`, `FileText`, `Image`, `Download` |
