# TP React - Consommation de l'API TMDB

## Objectif

Créer une application React qui utilise l'API Express fournie pour chercher des films et des séries, afficher des détails, gérer des favoris et filtrer par genre.

Vous pouvez utiliser le projet avec OpenLibrary ou bien créer votre propre projet et interface, a vous de voir.

Les parties 1 et 2 sont obligatoires, les autres sont bonus. Si vous n'êtes pas a l'aise avec React, contentez-vous des deux premières parties mais faites en sortes qu'elles soient bien réalisées (design simple mais cohérent, module CSS, bonne réutilisation de composant).

## Partie 1 : Recherche de films et de séries

1. Avoir deux boutons ou liens sur la page d'accueil :
   - aller vers la recherche de films
   - aller vers la recherche de séries
2. Sur chaque page de recherche, afficher une zone de recherche :
   - recherche de films
   - recherche de séries
3. Chaque zone doit appeler l'API correspondante :
   - `GET /api/movies/search?query=...`
   - `GET /api/tv/search?query=...`
4. Afficher les résultats sous forme de cartes avec au minimum :
   - titre / nom
   - image (posters)
   - date de sortie / première diffusion
   - courte description
5. Prévoir un état de chargement et un affichage quand aucun résultat n'est trouvé.

## Partie 2 : Détail film / détail série sur une nouvelle page

1. Créer une page qui s'ouvre lorsque l'utilisateur clique sur un résultat.
2. L'utilisateur doit rester sur la même page de recherche : le détail ne doit pas recharger toute la page ni remplacer la liste.
3. Utiliser l'`id` dans les paramètres d'URL pour pouvoir partager ou revenir en arrière :
   - film : `/film/27205` ou bien `/recherche-de-film?movieId=27205`
   - série : `/serie/27205` ou bien `/recherche-de-serie?tvId=1399`
     Pensez a utiliser toutes les fonctionnalités de react router, comme useLocation !
4. Lorsque la page s'affiche, appeler l'API pour charger les infos complètes :
   - `GET /api/movies/:id`
   - `GET /api/tv/:id`
5. Afficher dans la page :
   - titre / nom
   - synopsis
   - date de sortie / première diffusion
   - liste du casting principal
   - genres

6. (OPTIONNEL) La page doit pouvoir se fermer facilement et revenir à l'état précédent (la recherche en cours) : vous pouvez envoyer un state (ce qui a été recherché par exemple et le renvoyer lors du retour pour éxécuter de nouveau la recherche)

## Partie 3 : Favoris

1. Ajouter un bouton pour mettre un film en favori.
2. Ce bouton peut être présent :
   - sur chaque carte de résultat de recherche
   - ou sur la page de détail du film
3. Quand l'utilisateur clique, envoyer une requête POST vers l'API :
   - `POST /api/favorites/movies`

   Tips : Regardez la doc si le fetch est encore un peu compliqué : (Fetch en POST avec un body)[https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch#d%C3%A9finir_un_corps_de_requ%C3%AAte]

4. Le corps de la requête doit contenir au moins :
   - `id`
   - `title`
   - `poster_path`
   - `release_date`
   - `overview`
   - `status` avec la valeur par défaut `pas vu`
5. Ajouter un message ou un indicateur visuel pour confirmer l'ajout en favori.

## Partie 4 : Navigation par genre (optionnel)

**Ceci est une fonctionnalité alternative à la recherche simple.**

1. Créer une page dédiée `Parcourir par genre` accessible depuis le menu/navigation.
2. Sur cette page, charger la liste des genres via l'API :
   - `GET /api/genres/movies`
3. Afficher les genres sous forme de boutons ou de liste.
4. Lorsque l'utilisateur clique sur un genre, afficher les films de ce genre.
5. Cette page **ne propose pas de recherche textuelle**, seulement la navigation par genre.
6. Afficher les résultats de la même manière que la recherche simple (cartes avec titre, image, date).
7. La navigation par genre doit appeler :
   - `GET /api/movies/genre/:genreId?page=1&sortBy=popularity.desc`

## Partie 5 : Affichage des favoris

1. Créer une page `Favoris`.
2. Sur cette page, charger la liste des favoris :
   - `GET /api/favorites/movies`
3. Afficher chaque film favori avec :
   - image
   - titre
   - date
   - statut `pas vu` / `vu`
   - bouton `Supprimer`
   - bouton `Marquer comme vu`(si le film n'est pas encore vu)
4. Lors du clic sur `Supprimer`, appeler :
   - `DELETE /api/favorites/movies/:id`
5. Lors du clic sur `Marquer comme vu`, mettre à jour le statut du favori localement.
6. Mettre à jour l'affichage sans recharger la page.

## Partie 6 : Gestion des favoris

- Ajouter la gestion des favoris de séries (`POST /api/favorites/series`, `GET /api/favorites/series`, `DELETE /api/favorites/series/:id`).
- Ajouter une page `Film recommandé` ou `Série recommandée`.
- Ajouter la pagination sur la page de recherche.
- Conserver l'état des favoris dans le local storage côté client pour améliorer l'expérience.

## Consignes techniques

- Utiliser React fonctionnel avec hooks.
- Utiliser React Router pour la navigation.
- Utiliser `fetch` ou `axios` pour les appels API.
- Gérer les états : chargement, erreur, vide.
- Styliser l'application simplement (CSS ou bibliothèque légère).
- Fournir un README décrivant la façon de lancer le projet.
