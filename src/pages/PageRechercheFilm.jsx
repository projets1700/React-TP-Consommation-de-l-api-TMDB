import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSearchMedia from '../hooks/useSearchMedia'
import { addFavorite, getMediaTrailer } from '../services/tmdbService'
import SearchPanel from '../components/SearchPanel'
import MediaCard from '../components/MediaCard'

function PageRechercheFilm() {
  const location = useLocation()
  const navigate = useNavigate()
  const { query, loading, error, results, handleChange, handleSearch } = useSearchMedia('movies', location.state?.restoreQuery || '')
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
      getMediaTrailer('movies', item.id).then(key => {
        if (key && searchGen.current === gen) {
          setTrailers(prev => ({ ...prev, [item.id]: key }))
        }
      })
    })
  }, [results])

  const handleAddFavorite = async (e, item) => {
    e.stopPropagation()
    const saved = await addFavorite('movies', item)
    setFeedback(saved
      ? `${item.title} ajouté aux favoris.`
      : "Impossible d'ajouter ce film aux favoris."
    )
  }

  const handleCardClick = (item) => {
    navigate(`/film/${item.id}`, {
      state: { returnPath: '/recherche-films', searchQuery: query },
    })
  }

  return (
    <section className="page">
      <h1>Recherche de films</h1>

      <SearchPanel
        id="movie-search"
        placeholder="Rechercher un film..."
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
              title={item.title}
              date={item.release_date}
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

export default PageRechercheFilm
