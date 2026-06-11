import { Link } from 'react-router-dom'

// Page d'accueil du projet.
// Elle distingue clairement la recherche de films et la recherche de séries.
function PageAccueil() {
  return (
    <section className="page">
      <p className="eyebrow">Étape 1 — structure multi-pages</p>
      <h1>Bienvenue dans TMDB Explorer</h1>
      <p className="lead">Choisissez la catégorie à explorer : films ou séries.</p>

      <div className="card-grid">
        <Link className="choice-card" to="/recherche-films">
          <h2>Recherche de films</h2>
          <p>Accéder à la page dédiée aux films.</p>
        </Link>

        <Link className="choice-card" to="/recherche-series">
          <h2>Recherche de séries</h2>
          <p>Accéder à la page dédiée aux séries.</p>
        </Link>
      </div>
    </section>
  )
}

export default PageAccueil
