import { Link, useLocation } from 'react-router-dom'
import useSearchMedia from '../hooks/useSearchMedia'

// Page dédiée à la recherche de séries.
// Elle suit la même logique que la page des films.
function PageRechercheSerie() {
  const location = useLocation()
  const { query, loading, results, handleChange, handleSearch } = useSearchMedia('tv', location.state?.restoreQuery || '')

  return (
    <section className="page">
      <h1>Recherche de séries</h1>
      <p className="lead">Même logique que pour les films, avec une page dédiée.</p>

      <section className="search-panel">
        <label className="search-label" htmlFor="serie-search">Votre recherche</label>
        <div className="search-row">
          <input id="serie-search" type="search" value={query} onChange={handleChange} placeholder="Rechercher une série..." />
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
            <Link
              to={`/serie/${item.id}`}
              state={{ returnPath: '/recherche-series', searchQuery: query }}
              className="choice-card media-card"
              key={item.id}
            >
              <img className="media-poster" src={posterUrl} alt={item.name} />
              <strong>{item.name}</strong>
              <small>{item.first_air_date || 'Date inconnue'}</small>
              <p>{item.overview || 'Aucune description disponible.'}</p>
            </Link>
          )
        })}
      </section>
    </section>
  )
}

export default PageRechercheSerie
