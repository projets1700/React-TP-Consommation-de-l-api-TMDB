import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGenres, getMoviesByGenre, getMediaTrailer, addFavorite } from '../services/tmdbService'
import MediaCard from '../components/MediaCard'

function PageParGenre() {
  const navigate = useNavigate()
  const [mediaType, setMediaType] = useState('movies')
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [genresLoading, setGenresLoading] = useState(true)
  const [error, setError] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [trailers, setTrailers] = useState({})
  const searchGen = useRef(0)

  useEffect(() => {
    let ignore = false
    setGenresLoading(true)
    getGenres().then(data => {
      if (!ignore) setGenres(data.genres || [])
    }).finally(() => { if (!ignore) setGenresLoading(false) })
    return () => { ignore = true }
  }, [])

  const handleTypeChange = (type) => {
    setMediaType(type)
    setSelectedGenre(null)
    setResults([])
    setError(null)
  }

  useEffect(() => {
    if (!selectedGenre || mediaType !== 'movies') return
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
  }, [selectedGenre, mediaType])

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
  }

  const handleCardClick = (item) => {
    navigate(`/film/${item.id}`)
  }

  return (
    <section className="page">
      <h1>Parcourir par genre</h1>

      <div className="type-tabs">
        <button
          type="button"
          className={`type-tab${mediaType === 'movies' ? ' type-tab--active' : ''}`}
          onClick={() => handleTypeChange('movies')}
        >
          Films
        </button>
        <button
          type="button"
          className={`type-tab${mediaType === 'tv' ? ' type-tab--active' : ''}`}
          onClick={() => handleTypeChange('tv')}
        >
          Séries
        </button>
      </div>

      {mediaType === 'tv' ? (
        <p className="genre-unavailable">
          La navigation par genre n&apos;est pas disponible pour les séries : l&apos;API ne fournit pas d&apos;endpoint <code>/api/genres/tv</code> ni <code>/api/tv/genre/:id</code>.
        </p>
      ) : (
        <>
          {genresLoading && <p>Chargement des genres…</p>}
          <div className="genre-list">
            {genres.map(genre => (
              <button
                key={genre.id}
                type="button"
                className={`genre-btn${selectedGenre?.id === genre.id ? ' genre-btn--active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {selectedGenre && (
            <>
              <h2 className="genre-title">Films : {selectedGenre.name}</h2>
              {loading && <p>Chargement…</p>}
              {error && <p className="search-error">{error}</p>}
              {feedback && <p className="favorite-feedback">{feedback}</p>}
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
        </>
      )}
    </section>
  )
}

export default PageParGenre
