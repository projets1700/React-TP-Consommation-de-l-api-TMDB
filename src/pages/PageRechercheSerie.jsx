import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSearchMedia from '../hooks/useSearchMedia'
import { addFavorite, getMediaTrailer } from '../services/tmdbService'
import { addFavoritedId } from '../utils/favorites'
import SearchPanel from '../components/SearchPanel'
import MediaCard from '../components/MediaCard'
import Toast from '../components/Toast'

function PageRechercheSerie() {
  const location = useLocation()
  const navigate = useNavigate()
  const { query, loading, error, results, handleChange, handleSearch, page, totalPages, handlePageChange } = useSearchMedia('tv', location.state?.restoreQuery || '')
  const [feedback, setFeedback] = useState('')
  const [trailers, setTrailers] = useState({})
  const [favoritedIds, setFavoritedIds] = useState(new Set())
  const searchGen = useRef(0)

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(''), 3000)
    return () => clearTimeout(timer)
  }, [feedback])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrailers({})
    const gen = ++searchGen.current
    results.forEach(item => {
      getMediaTrailer('tv', item.id).then(key => {
        if (key && searchGen.current === gen) {
          setTrailers(prev => ({ ...prev, [item.id]: key }))
        }
      })
    })
  }, [results])

  const handleAddFavorite = async (e, item) => {
    e.stopPropagation()
    const saved = await addFavorite('tv', item)
    setFeedback(saved
      ? `${item.name} ajouté aux favoris.`
      : "Impossible d'ajouter cette série aux favoris."
    )
    if (saved) {
      addFavoritedId('series', item.id)
      setFavoritedIds(prev => new Set([...prev, item.id]))
    }
    return saved
  }

  const handleCardClick = (item) => {
    navigate(`/serie/${item.id}`, {
      state: { returnPath: '/recherche-series', searchQuery: query },
    })
  }

  return (
    <section className="page">
      <h1>Recherche de séries</h1>

      <SearchPanel
        id="serie-search"
        placeholder="Rechercher une série..."
        value={query}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      {loading && <p>Chargement…</p>}
      {error && <p className="search-error">{error}</p>}
      <Toast message={feedback} />
      {!loading && !error && results.length === 0 && query && <p>Aucun résultat pour cette recherche.</p>}

      <section className="card-grid">
        {results.map(item => {
          const posterUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://via.placeholder.com/500x750?text=Affiche+indisponible'

          return (
            <MediaCard
              key={item.id}
              item={item}
              title={item.name}
              date={item.first_air_date}
              posterUrl={posterUrl}
              trailerKey={trailers[item.id] || null}
              onCardClick={() => handleCardClick(item)}
              onFavorite={e => handleAddFavorite(e, item)}
              isFavorited={favoritedIds.has(item.id)}
            />
          )
        })}
      </section>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination-btn"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            ← Précédent
          </button>
          <span className="pagination-info">Page {page} / {totalPages}</span>
          <button
            type="button"
            className="pagination-btn"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Suivant →
          </button>
        </div>
      )}

      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Page précédente</button>
    </section>
  )
}

export default PageRechercheSerie
