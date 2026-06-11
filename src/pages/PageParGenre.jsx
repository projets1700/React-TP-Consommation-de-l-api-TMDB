import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getGenres, getMoviesByGenre, getMediaTrailer, addFavorite } from '../services/tmdbService'
import { addFavoritedId } from '../utils/favorites'
import MediaCard from '../components/MediaCard'
import Toast from '../components/Toast'
import { translateGenre } from '../utils/genres'

function PageParGenre() {
  const navigate = useNavigate()
  const location = useLocation()
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [genresLoading, setGenresLoading] = useState(true)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [trailers, setTrailers] = useState({})
  const [favoritedIds, setFavoritedIds] = useState(new Set())
  const searchGen = useRef(0)

  useEffect(() => {
    let ignore = false
    getGenres().then(data => {
      if (ignore) return
      const list = data.genres || []
      setGenres(list)
      const fromHome = location.state?.genre
      if (fromHome) {
        const match = list.find(g => g.id === fromHome.id)
        if (match) setSelectedGenre(match)
      }
    }).finally(() => { if (!ignore) setGenresLoading(false) })
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    if (!selectedGenre) return
    let ignore = false

    async function load() {
      setLoading(true)
      setResults([])
      setError(null)
      try {
        const data = await getMoviesByGenre(selectedGenre.id)
        if (!ignore) setResults(data.results || [])
      } catch {
        if (!ignore) setError('Une erreur est survenue.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [selectedGenre])

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

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(''), 3000)
    return () => clearTimeout(timer)
  }, [feedback])

  const handleAddFavorite = async (e, item) => {
    e.stopPropagation()
    const saved = await addFavorite('movies', item)
    setFeedback(saved
      ? `${item.title} ajouté aux favoris.`
      : "Impossible d'ajouter ce film aux favoris."
    )
    if (saved) {
      addFavoritedId('movies', item.id)
      setFavoritedIds(prev => new Set([...prev, item.id]))
    }
    return saved
  }

  const handleCardClick = (item) => {
    navigate(`/film/${item.id}`)
  }

  return (
    <section className="page">
      <h1>Parcourir par genre</h1>

      {genresLoading && <p>Chargement des genres…</p>}

      <div className="genre-list">
        {genres.map(genre => (
          <button
            key={genre.id}
            type="button"
            className={`genre-btn${selectedGenre?.id === genre.id ? ' genre-btn--active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {translateGenre(genre.name)}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <>
          <h2 className="genre-title">Films : {translateGenre(selectedGenre.name)}</h2>
          {loading && <p>Chargement…</p>}
          {error && <p className="search-error">{error}</p>}
          <Toast message={feedback} />
          {!loading && !error && results.length === 0 && (
            <p>Aucun film trouvé pour ce genre.</p>
          )}
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
        </>
      )}
      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Page précédente</button>
    </section>
  )
}

export default PageParGenre
