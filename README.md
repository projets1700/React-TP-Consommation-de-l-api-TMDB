# Évaluation React — Explorateur de films & séries

Application React permettant de rechercher des films et séries, de consulter leurs fiches détail et de gérer une liste de favoris.

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
├── components/       # Composants réutilisables (Header, TrailerCard)
├── hooks/            # Hooks personnalisés (useSearchMedia)
├── pages/            # Pages de l'application
│   ├── PageRechercheFilm.jsx
│   ├── PageRechercheSerie.jsx
│   ├── PageDetailMedia.jsx
│   └── Layout.jsx
├── services/
│   └── tmdbService.js  # Appels à l'API
└── main.jsx
```

## Fonctionnalités

- Recherche de films et de séries via l'API
- Affichage des bandes-annonces YouTube dans la grille de résultats
- Fiche détail par film ou série (poster, synopsis, genres, note)
- Ajout aux favoris
- Thèmes visuels (Défaut, Gris, Lune)
- Gestion des états : chargement, erreur, aucun résultat

## Technologies utilisées

- React 19 (hooks fonctionnels)
- React Router v7
- Vite
- API REST (fetch natif)
