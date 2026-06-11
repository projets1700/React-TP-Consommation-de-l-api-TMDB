// Page d'accueil du projet.
// Elle présente les deux grandes zones de recherche du TP.
function PageAccueil() {
  return (
    <section className="page">
      <p className="eyebrow">Étape 1 — structure multi-pages</p>
      <h1>Bienvenue dans TMDB Explorer</h1>
      <p className="lead">Cette structure reprend l’organisation du projet de référence pour préparer la recherche et les détails.</p>

      <div className="card-grid">
        <article className="choice-card">
          <h2>Recherche de films</h2>
          <p>Page dédiée pour appeler l’API des films.</p>
        </article>
        <article className="choice-card">
          <h2>Recherche de séries</h2>
          <p>Page dédiée pour appeler l’API des séries.</p>
        </article>
      </div>
    </section>
  )
}

export default PageAccueil
