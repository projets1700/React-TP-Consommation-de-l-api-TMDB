import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSearchMedia from '../hooks/useSearchMedia'
import { addFavorite, getMediaTrailer } from '../services/tmdbService'
import SearchPanel from '../components/SearchPanel'
import MediaCard from '../components/MediaCard'

function PageRechercheSerie() {
  const location = useLocation()
  const navigate = useNavigate()
  const { query, loading, error, results, handleChange, handleSearch } = useSearchMedia('tv', location.state?.restoreQuery || '')
  const [feedback, setFeedback] = useState('')
  const [trailers, setTrailers] = useState({})
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
  }

  const handleCardClick = (item) => {
    navigate(`/serie/${item.id}`, {
      state: { returnPath: '/recherche-series', searchQuery: query },
    })
  }

  return (
    <section className="page">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Page précédente</button>
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
      {feedback && <p className="favorite-feedback">{feedback}</p>}
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
            />
          )
        })}
      </section>
    </section>
  )
}

export default PageRechercheSerie
