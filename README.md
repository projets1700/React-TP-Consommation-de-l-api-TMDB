# CINESCAPE — Explorateur de films & séries

Application React cinématique permettant de rechercher des films et séries, consulter leurs fiches détail, gérer des favoris et naviguer par genre.

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure
- npm (inclus avec Node.js)

## Installation

```bash
npm install
```

## Lancer le projet

### Mode développement

```bash
npm run dev
```

L'application est ensuite accessible sur [http://localhost:5173](http://localhost:5173).

### Build de production

```bash
npm run build
```

### Prévisualiser le build

```bash
npm run preview
```

## Structure du projet

```
src/
├── components/       # Composants réutilisables
│   ├── Header.jsx        # Navigation fixe avec effet scroll
│   ├── MediaCard.jsx     # Carte de résultat avec trailer et favori
│   ├── MediaDetail.jsx   # Fiche détail d'un film ou série
│   ├── MediaRow.jsx      # Rangée horizontale scrollable
│   ├── PosterCard.jsx    # Carte poster simple
│   ├── SearchPanel.jsx   # Barre de recherche
│   ├── Toast.jsx         # Notification animée
│   └── TrailerCard.jsx   # Lecteur de bande-annonce YouTube
├── hooks/
│   └── useSearchMedia.js # Hook de recherche avec pagination
├── pages/
│   ├── PageAccueil.jsx         # Hero plein écran + sections horizontales
│   ├── PageRechercheFilm.jsx   # Recherche de films avec pagination
│   ├── PageRechercheSerie.jsx  # Recherche de séries avec pagination
│   ├── PageDetailMedia.jsx     # Fiche détail (film ou série)
│   ├── PageParGenre.jsx        # Navigation par genre
│   ├── PageFavoris.jsx         # Liste des favoris
│   ├── PageRecommandes.jsx     # Films et séries du moment
│   └── Layout.jsx              # Structure globale
├── services/
│   └── tmdbService.js    # Tous les appels à l'API
├── utils/
│   ├── favorites.js      # Persistance des favoris en localStorage
│   └── genres.js         # Traduction des genres en français
└── main.jsx              # Routes et point d'entrée
```

## Fonctionnalités

- **Recherche** de films et de séries avec pagination
- **Bandes-annonces** YouTube intégrées dans les cartes de résultats (VF prioritaire)
- **Fiche détail** : poster, synopsis, genres traduits, note, date de sortie
- **Favoris** : ajout depuis les cartes ou la fiche détail, avec étoile gold persistante
- **Gestion des favoris** : affichage, suppression, marquage "vu" / "pas vu"
- **Favoris persistants** : état conservé en localStorage, synchronisé avec l'API
- **Navigation par genre** : films filtrés par genre avec pré-sélection depuis l'accueil
- **Page Recommandés** : films et séries populaires du moment
- **Notifications toast** animées lors de l'ajout aux favoris
- **Interface entièrement en français** (genres traduits, libellés, messages)
- **Design cinématique** : thème sombre, accent rouge, header transparent au scroll, sections horizontales

## Technologies utilisées

- React 19 (hooks fonctionnels)
- React Router v7
- Vite
- API REST (fetch natif)
- localStorage pour la persistance côté client
