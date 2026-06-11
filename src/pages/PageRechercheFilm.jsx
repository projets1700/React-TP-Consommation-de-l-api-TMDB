import useSearchMedia from '../hooks/useSearchMedia'

// Page dédiée à la recherche de films.
// Elle utilise un hook pour gérer la saisie et l'appel à l'API.
function PageRechercheFilm() {
  const { query, loading, results, handleChange, handleSearch } = useSearchMedia('movies')

  return (
    <section className="page">
      <h1>Recherche de films</h1>
      <p className="lead">La page est désormais séparée dans une structure de type multi-pages.</p>

      <section className="search-panel">
        <label className="search-label" htmlFor="movie-search">Votre recherche</label>
        <div className="search-row">
          <input id="movie-search" type="search" value={query} onChange={handleChange} placeholder="Rechercher un film..." />
          <button type="button" onClick={handleSearch}>Chercher</button>
        </div>
      </section>

      {loading && <p>Chargement…</p>}

      {!loading && results.length === 0 && query && <p>Aucun résultat pour cette recherche.</p>}

      <section className="card-grid">
        {results.map((item) => {
          const posterUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://via.placeholder.com/500x750?text=Affiche+indisponible'

          return (
            <article className="choice-card media-card" key={item.id}>
              <img className="media-poster" src={posterUrl} alt={item.title} />
              <strong>{item.title}</strong>
              <small>{item.release_date || 'Date inconnue'}</small>
              <p>{item.overview || 'Aucune description disponible.'}</p>
            </article>
          )
        })}
      </section>
    </section>
  )
}

export default PageRechercheFilm
