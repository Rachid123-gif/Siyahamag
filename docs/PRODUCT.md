# SiyahaMag.com — Cahier des fonctionnalités

> Version 1.0 — Avril 2026
> Source de vérité pour **quoi** construire.

---

## 1. But du projet

SiyahaMag.com est une plateforme web dédiée au secteur touristique marocain. Son but est de devenir la référence en ligne pour :

- **L'actualité** du tourisme au Maroc
- **L'emploi** dans le secteur touristique
- **Les opportunités d'investissement** touristique

### Ce que fait le site

1. Publier des actualités sur le secteur touristique marocain (ouvertures d'hôtels, décisions gouvernementales, événements, chiffres clés)
2. Permettre aux employeurs du tourisme (hôtels, riads, agences, restaurants) de publier des offres d'emploi
3. Permettre aux chercheurs d'emploi de consulter les offres et de postuler directement
4. Publier les statistiques officielles du secteur touristique marocain
5. Proposer un espace pour les opportunités d'investissement touristique

### Le différenciateur

Aujourd'hui au Maroc, il existe des médias touristiques (PremiumTravelNews, CHR Magazine) et des plateformes d'emploi généralistes (Rekrute, Indeed). Mais **personne ne combine les deux**. SiyahaMag est le premier site qui réunit l'information touristique, l'emploi spécialisé, les données du secteur et les opportunités d'investissement dans un seul endroit.

### Le contexte

- Le Maroc vise **26 millions de touristes** d'ici 2030
- La **Coupe du Monde 2030** au Maroc va créer un besoin massif en recrutement touristique
- Des centaines de nouveaux hôtels sont en construction
- Aucun site ne centralise l'emploi touristique marocain
- Recettes touristiques record de 87,6 milliards de dirhams (8 premiers mois 2025)

---

## 2. Types d'utilisateurs

### Visiteur (non connecté)

- **Qui :** Toute personne qui arrive sur le site sans être connectée
- **Peut faire :** Lire les articles, consulter les offres d'emploi, voir les statistiques, consulter les opportunités d'investissement, s'inscrire

### Candidat (chercheur d'emploi)

- **Qui :** Un chercheur d'emploi dans le secteur touristique (diplômé en hôtellerie, restauration, gestion touristique, guide, animation...)
- **Peut faire :** Tout ce qu'un visiteur peut faire + créer un profil, uploader son CV, postuler aux offres, suivre ses candidatures, configurer des alertes

### Employeur

- **Qui :** Un hôtel, riad, agence de voyage, restaurant, office de tourisme, club de vacances, ou toute entreprise du secteur touristique qui recrute
- **Peut faire :** Créer un compte entreprise (avec vérification), publier des offres d'emploi, gérer les candidatures reçues, créer une page profil entreprise
- **Vérification obligatoire :** L'employeur doit fournir son ICE, un email professionnel et un lien vers son site web. Le compte est activé uniquement après vérification manuelle par l'admin.

### Investisseur / Vendeur

- **Qui :** Une personne ou société qui veut vendre un bien touristique ou qui cherche à investir dans le tourisme
- **Deux profils :**
  - **Le vendeur/promoteur :** publie une opportunité d'investissement touristique
  - **L'investisseur :** consulte les opportunités et contacte les vendeurs
- **Important :** Cette section concerne **uniquement** les investissements touristiques. Pas de l'immobilier général.
- **Exemples :** terrain en zone touristique pour construire un hôtel, hôtel en activité à reprendre, riad à transformer en maison d'hôtes, projet de resort en recherche de financement, restaurant dans une zone touristique.

### Administrateur

- **Qui :** Le fondateur du site (et plus tard, son équipe de modération)
- **Peut faire :** Publier des articles, modérer les offres d'emploi et les opportunités d'investissement, vérifier les comptes employeurs, gérer les signalements, mettre à jour les statistiques, administrer les utilisateurs

---

## 3. Modules et fonctionnalités

Le site est organisé en **5 modules**. Chaque module est indépendant et peut être développé séparément.

---

### Module 1 — Articles & Actualités

Ce module permet à l'admin de publier des articles sur le secteur touristique marocain et aux visiteurs de les lire.

#### Page d'accueil du site

- Affiche les 6 derniers articles publiés avec image, titre, date et résumé
- Barre de recherche globale (chercher dans les articles, les offres d'emploi, les opportunités)
- Accès rapide aux sections principales : Actualités, SiyahaJobs, Statistiques, Investissement
- Bandeau avec les chiffres clés du tourisme (nombre de touristes, recettes, offres actives)

#### Liste des articles

- Articles affichés par ordre chronologique (le plus récent en premier)
- Filtre par catégorie : Hébergement, Transport, Aérien, Gastronomie, Événements, Développement, MICE
- Pagination (10 articles par page)

#### Page d'un article

- Titre, image principale, date de publication, auteur
- Contenu de l'article (texte riche avec images)
- Boutons de partage : Facebook, LinkedIn, WhatsApp, copier le lien
- Section « Articles similaires » en bas (3 articles de la même catégorie)

#### Back-office articles (Admin)

- Créer un article : titre, catégorie, image, contenu (éditeur de texte riche), résumé
- Modifier ou supprimer un article existant
- Programmer la publication d'un article à une date future
- Voir la liste de tous les articles avec leur statut (brouillon, publié, programmé)

#### User Stories — Module 1

| ID | User Story |
|----|-----------|
| US-1.1 | Le visiteur peut voir les derniers articles sur la page d'accueil pour rester informé du secteur touristique. |
| US-1.2 | Le visiteur peut filtrer les articles par catégorie pour trouver les sujets qui l'intéressent. |
| US-1.3 | Le visiteur peut lire un article complet et voir des articles similaires pour approfondir un sujet. |
| US-1.4 | Le visiteur peut partager un article sur Facebook, LinkedIn ou WhatsApp pour informer ses contacts. |
| US-1.5 | Le visiteur peut chercher un article par mot-clé pour retrouver une information précise. |
| US-1.6 | L'admin peut créer un article avec un éditeur riche (texte + images) pour publier du contenu de qualité. |
| US-1.7 | L'admin peut programmer un article pour une date future pour planifier son calendrier éditorial. |
| US-1.8 | L'admin peut gérer les catégories pour organiser le contenu du site. |

---

### Module 2 — SiyahaJobs (Emploi Tourisme)

C'est le module principal du site et son différenciateur. Il permet aux employeurs du tourisme de publier des offres d'emploi et aux candidats de postuler.

#### 2A — Publication des offres (côté employeur)

##### Inscription et vérification employeur

- L'employeur crée un compte avec : nom de l'entreprise, email professionnel (pas Gmail/Hotmail), ICE, lien site web, ville, secteur (hôtellerie, restauration, agence de voyage, transport...)
- Le compte reste inactif tant que l'admin n'a pas vérifié les informations
- Après vérification, l'employeur reçoit un badge « Entreprise vérifiée » visible sur son profil et ses offres

##### Publier une offre

- **Formulaire :** titre du poste, catégorie du métier (réception, cuisine, service, animation, guide, bien-être, management, MICE, transport, entretien), type de contrat (CDI, CDD, saisonnier, stage, freelance), ville, description du poste, compétences requises, expérience demandée, salaire (optionnel), date limite de candidature
- L'offre est envoyée en modération. Elle n'est visible qu'après approbation par l'admin
- L'employeur reçoit un email quand son offre est approuvée ou rejetée

##### Tableau de bord employeur

- Liste de toutes ses offres avec statut : en attente de modération, active, expirée, désactivée
- Pour chaque offre active : nombre de candidatures reçues, nombre de vues
- Modifier une offre existante (repart en modération)
- Désactiver ou supprimer une offre

##### Gérer les candidatures

- Pour chaque offre, voir la liste des candidatures reçues
- Pour chaque candidature : nom du candidat, date de candidature, message de motivation, lien pour télécharger le CV
- Marquer une candidature comme : non lue, vue, retenue, refusée
- Le candidat reçoit un email quand sa candidature change de statut

##### Page profil entreprise

- Page publique visible par tous : logo, nom, description, ville, secteur, site web, badge « Vérifié »
- Liste de toutes les offres actives de cette entreprise
- L'employeur peut modifier son profil depuis son tableau de bord

#### 2B — Recherche et candidature (côté candidat)

##### Recherche d'offres

- Barre de recherche principale : « Quel poste ? Quelle ville ? »
- Filtres : ville/région, catégorie de métier, type de contrat, date de publication (dernière semaine, dernier mois, tout)
- Tri par : date (plus récent), pertinence
- Chaque offre dans la liste affiche : titre, entreprise (avec badge vérifié), ville, type de contrat, date de publication

##### Page détail d'une offre

- Toutes les informations de l'offre : description, compétences, salaire, entreprise
- Bouton « Postuler » bien visible
- Lien vers le profil de l'entreprise
- Section « Offres similaires » (même ville ou même métier)
- Bouton « Signaler cette offre »

##### Postuler

- Le candidat peut postuler **avec ou sans compte**
- **Sans compte :** entrer son email, uploader son CV (PDF), écrire un message de motivation
- **Avec compte :** son CV est déjà enregistré, il peut juste ajouter un message et envoyer
- Confirmation par email après la candidature

##### Profil candidat

- **Création de compte :** nom, email, mot de passe, ville, téléphone
- **Profil :** photo, CV (upload PDF), expériences professionnelles, compétences, formation, ville souhaitée, disponibilité (immédiate, 1 mois, 3 mois)
- **Page « Mes candidatures » :** historique des offres où j'ai postulé avec le statut de chaque candidature
- **Alertes :** configurer des alertes email par critères (ville + métier) pour recevoir les nouvelles offres

#### 2C — Modération (côté admin)

- File d'attente des offres à approuver : voir l'offre, le profil de l'employeur, puis approuver ou rejeter (avec motif)
- File d'attente des comptes employeurs à vérifier : vérifier l'ICE, l'email, le site web, puis activer ou rejeter
- Gestion des signalements : voir les offres signalées par les utilisateurs, examiner et décider
- **Critères de rejet d'une offre :** pas de description claire, salaire irréaliste, demande d'argent au candidat, entreprise non vérifiée

#### User Stories — Module 2

**Employeur**

| ID | User Story |
|----|-----------|
| US-2.1 | L'employeur peut créer un compte avec ses informations d'entreprise pour accéder à la plateforme. |
| US-2.2 | L'employeur peut soumettre ses documents (ICE, site web) pour être vérifié et obtenir le badge « Vérifié ». |
| US-2.3 | L'employeur peut publier une offre d'emploi en remplissant un formulaire détaillé pour attirer des candidats qualifiés. |
| US-2.4 | L'employeur peut voir le statut de ses offres (en attente, active, expirée) sur son tableau de bord pour suivre ses publications. |
| US-2.5 | L'employeur peut consulter les candidatures reçues pour chaque offre pour sélectionner les meilleurs profils. |
| US-2.6 | L'employeur peut télécharger le CV d'un candidat pour l'examiner en détail. |
| US-2.7 | L'employeur peut marquer une candidature comme vue, retenue ou refusée pour organiser son recrutement. |
| US-2.8 | L'employeur peut modifier ou désactiver une offre pour mettre à jour ses besoins. |
| US-2.9 | L'employeur peut personnaliser sa page profil (logo, description, photos) pour renforcer sa marque employeur. |

**Candidat**

| ID | User Story |
|----|-----------|
| US-2.10 | Le candidat peut chercher des offres par ville et par métier pour trouver un poste qui lui correspond. |
| US-2.11 | Le candidat peut filtrer les offres par type de contrat (CDI, saisonnier, stage) pour cibler sa recherche. |
| US-2.12 | Le candidat peut voir le détail complet d'une offre (description, salaire, entreprise) pour décider s'il postule. |
| US-2.13 | Le candidat peut postuler en uploadant son CV et en écrivant un message pour envoyer sa candidature. |
| US-2.14 | Le candidat peut postuler sans créer de compte (juste email + CV) pour une candidature rapide. |
| US-2.15 | Le candidat peut créer un profil avec ses expériences et compétences pour postuler plus rapidement. |
| US-2.16 | Le candidat peut suivre le statut de ses candidatures (non lue, vue, retenue, refusée) pour savoir où il en est. |
| US-2.17 | Le candidat peut configurer des alertes email pour recevoir les nouvelles offres qui correspondent à ses critères. |
| US-2.18 | Le candidat peut voir le profil vérifié de l'entreprise pour s'assurer que c'est une vraie entreprise. |
| US-2.19 | Le candidat peut signaler une offre douteuse pour protéger les autres utilisateurs. |

**Admin**

| ID | User Story |
|----|-----------|
| US-2.20 | L'admin peut approuver ou rejeter une offre en attente pour garantir la qualité du contenu. |
| US-2.21 | L'admin peut vérifier les documents d'un employeur pour s'assurer que c'est une vraie entreprise. |
| US-2.22 | L'admin peut traiter les signalements pour maintenir la confiance sur la plateforme. |

---

### Module 3 — Statistiques du Tourisme

Ce module publie les statistiques officielles du tourisme marocain. Les données proviennent de sources publiques (ONMT, Ministère du Tourisme, Bank Al-Maghrib, HCP). L'admin les saisit et les met à jour manuellement.

#### Page statistiques

- Chiffres clés en haut de page : nombre total de touristes, recettes touristiques, nuitées, taux d'occupation moyen
- Graphiques interactifs : évolution par année (courbes), comparaison par région (barres)
- Filtres : par année, par région (Marrakech-Safi, Souss-Massa, Tanger-Tétouan, Fès-Meknès, Rabat-Salé-Kénitra, Dakhla-Oued Ed-Dahab...)
- Chaque statistique affiche sa source officielle et la date de dernière mise à jour

#### Back-office statistiques (Admin)

- Ajouter une nouvelle donnée : indicateur, valeur, année, région (optionnel), source
- Modifier ou supprimer une donnée existante
- Les graphiques se mettent à jour automatiquement

#### User Stories — Module 3

| ID | User Story |
|----|-----------|
| US-3.1 | Le visiteur peut voir les chiffres clés du tourisme marocain sur une seule page pour comprendre l'état du secteur. |
| US-3.2 | Le visiteur peut voir des graphiques d'évolution pour visualiser les tendances. |
| US-3.3 | Le visiteur peut comparer les statistiques entre régions pour identifier les zones les plus dynamiques. |
| US-3.4 | Le visiteur peut voir la source de chaque statistique pour vérifier la fiabilité. |
| US-3.5 | L'admin peut ajouter et mettre à jour les données statistiques pour garder le site à jour. |

---

### Module 4 — Investissement Touristique

Uniquement des investissements liés au tourisme. Cette section permet aux propriétaires et promoteurs de publier des biens à vendre ou des projets à financer dans le secteur touristique. Et aux investisseurs de les découvrir.

#### Types d'opportunités acceptées

- Terrain en zone touristique destiné à la construction d'un hôtel, resort ou maison d'hôtes
- Hôtel en activité à reprendre (fonds de commerce ou murs)
- Riad à vendre ou à transformer en maison d'hôtes
- Restaurant en zone touristique à reprendre
- Projet de resort, club de vacances ou complexe touristique en recherche de financement
- Centre de bien-être ou activité de loisirs touristique à vendre

#### Liste des opportunités

- Annonces affichées avec : titre, type de bien, ville, prix, photo principale
- Filtres : type de bien (terrain, hôtel, riad, restaurant, projet, autre), ville/région, fourchette de prix
- Tri par : date de publication, prix

#### Page détail d'une opportunité

- Photos (galerie), description détaillée, localisation (ville + carte si possible)
- Caractéristiques : superficie, nombre de chambres (si applicable), état (neuf, à rénover, en activité), prix
- Informations sur le vendeur/promoteur (nom, entreprise) — mais pas de téléphone ni email visible
- Bouton « Contacter le vendeur » : formulaire de contact sécurisé (message envoyé par email)
- Bouton « Signaler cette annonce »

#### Publier une opportunité (côté vendeur)

- **Formulaire :** titre, type de bien, ville, prix, superficie, description, photos (jusqu'à 10), coordonnées
- L'annonce est envoyée en modération. Visible uniquement après approbation par l'admin
- Le vendeur peut modifier ou retirer son annonce depuis son espace

#### Modération (côté admin)

- File d'attente des opportunités à approuver
- Vérifier que le bien est réellement lié au tourisme (pas de l'immobilier résidentiel)
- Approuver ou rejeter (avec motif)
- Gérer les signalements

#### User Stories — Module 4

| ID | User Story |
|----|-----------|
| US-4.1 | L'investisseur peut consulter les opportunités d'investissement touristique pour trouver un bien à acheter ou un projet à financer. |
| US-4.2 | L'investisseur peut filtrer par type de bien, ville et prix pour trouver ce qui correspond à son budget. |
| US-4.3 | L'investisseur peut voir les photos et les détails d'un bien pour évaluer l'opportunité. |
| US-4.4 | L'investisseur peut contacter le vendeur via un formulaire sécurisé pour demander plus d'informations sans risque de spam. |
| US-4.5 | Le vendeur peut publier une opportunité avec photos et détails pour trouver un acheteur ou un investisseur. |
| US-4.6 | Le vendeur peut modifier ou retirer son annonce pour la mettre à jour. |
| US-4.7 | L'admin peut vérifier que chaque opportunité est liée au tourisme avant de l'approuver pour garder la section spécialisée. |
| US-4.8 | L'admin peut traiter les signalements pour éviter les arnaques. |

---

### Module 5 — Administration Globale

Ce module centralise la gestion de l'ensemble du site.

#### Fonctionnalités

- **Tableau de bord** avec métriques globales : nombre de visiteurs, articles publiés, offres actives, candidatures reçues, opportunités actives, utilisateurs inscrits
- **Files d'attente de modération :** offres d'emploi en attente + opportunités en attente + comptes employeurs à vérifier
- **Gestion des utilisateurs :** voir tous les comptes (candidats, employeurs, vendeurs), suspendre ou supprimer un compte
- **Gestion des signalements :** liste centralisée de toutes les offres et annonces signalées
- **Gestion des statistiques :** ajouter, modifier, supprimer les données du module statistiques

#### User Stories — Module 5

| ID | User Story |
|----|-----------|
| US-5.1 | L'admin peut voir un tableau de bord global pour suivre la santé de la plateforme d'un coup d'œil. |
| US-5.2 | L'admin peut accéder rapidement aux files de modération pour traiter les éléments en attente. |
| US-5.3 | L'admin peut suspendre un compte en cas d'abus pour protéger les utilisateurs. |

---

## 4. Récapitulatif

| Module | User Stories | Priorité |
|--------|-------------|----------|
| Module 1 — Articles & Actualités | 8 (US-1.1 à US-1.8) | Haute |
| Module 2 — SiyahaJobs (Emploi) | 22 (US-2.1 à US-2.22) | Critique |
| Module 3 — Statistiques | 5 (US-3.1 à US-3.5) | Moyenne |
| Module 4 — Investissement | 8 (US-4.1 à US-4.8) | Moyenne |
| Module 5 — Administration | 3 (US-5.1 à US-5.3) | Haute |
| **Total** | **46 user stories** | |
