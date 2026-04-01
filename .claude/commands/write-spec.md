# Écrire une feature spec

Crée une spécification détaillée pour une fonctionnalité.

## Instructions

1. Demande quelle fonctionnalité spécifier
2. Lis les user stories correspondantes dans `docs/PRODUCT.md`
3. Crée un fichier dans `docs/specs/` avec cette structure :

### Structure du fichier

```markdown
# [Nom de la feature]

## Intent
Pourquoi cette feature existe. Quel problème elle résout.

## User Stories couvertes
- US-X.X : ...
- US-X.Y : ...

## System Flow

### [Scénario principal]
1. L'utilisateur fait X
2. Le système vérifie Y
3. Le système crée/affiche Z
4. L'utilisateur voit le résultat

### [Scénario alternatif]
1. ...

## Scenarios

### Succès
- **[Nom du scénario]** : Quand X, alors Y

### Échec
- **[Nom du scénario]** : Quand X, alors message d'erreur Y

## Données

### Input
| Champ | Type | Requis | Validation |
|-------|------|--------|-----------|

### Output
| Champ | Type | Description |
|-------|------|-------------|

## Composants UI
- Liste des composants nécessaires

## API Endpoints
- Liste des endpoints concernés
```

## Règles

- Être exhaustif sur les cas d'erreur
- Inclure les cas limites (champs optionnels, limites de taille, etc.)
- Référencer les user stories de `docs/PRODUCT.md`
- Texte des messages d'erreur en français

$ARGUMENTS
