import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavorites, deleteFavorite, updateFavoriteStatus } from '../services/tmdbService'
import { removeFavoritedId } from '../utils/favorites'

function FavCard({ item, type, onDelete, onMarkSeen, onNavigate }) {
  const title = type === 'movies' ? item.title : item.name
  const date = item.release_date || item.first_air_date || 'Date inconnue'
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Affiche+indisponible'

  return (
    <article className="fav-card" onClick={onNavigate} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate()} style={{ cursor: 'pointer' }}>
      <img
        className="fav-poster"
        src={posterUrl}
        alt={title}
        onError={e => { e.currentTarget.src = 'https://via.placeholder.com/500x750?text=Affiche+indisponible' }}
      />
      <div className="fav-info">
        <strong className="fav-title">{title}</strong>
        <span className="fav-date">{date}</span>
        <span className={`fav-status${item.status === 'vu' ? ' fav-status--vu' : ''}`}>
          {item.status === 'vu' ? '✓ Vu' : '● Pas vu'}
        </span>
        <div className="fav-actions">
          {item.status !== 'vu' && (
            <button type="button" className="fav-btn fav-btn--seen" onClick={e => { e.stopPropagation(); onMarkSeen(type, item.id) }}>
              Marquer comme vu
            </button>
          )}
          <button type="button" className="fav-btn fav-btn--delete" onClick={e => { e.stopPropagation(); onDelete(type, item.id) }}>
            Supprimer
          </button>
        </div>
      </div>
    </article>
  )
}

function PageFavoris() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      try {
        const [moviesData, seriesData] = await Promise.all([
          getFavorites('movies'),
          getFavorites('series'),
        ])
        if (!ignore) {
          setMovies(moviesData)
          setSeries(seriesData)
        }
      } catch {
        if (!ignore) setError('Impossible de charger les favoris.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => { ignore = true }
  }, [])

  const handleDelete = async (type, id) => {
    await deleteFavorite(type, id)
    removeFavoritedId(type === 'movies' ? 'movies' : 'series', id)
    if (type === 'movies') setMovies(prev => prev.filter(m => m.id !== id))
    else setSeries(prev => prev.filter(s => s.id !== id))
  }

  const handleMarkSeen = async (type, id) => {
    await updateFavoriteStatus(type, id, 'vu')
    if (type === 'movies') {
      setMovies(prev => prev.map(m => m.id === id ? { ...m, status: 'vu' } : m))
    } else {
      setSeries(prev => prev.map(s => s.id === id ? { ...s, status: 'vu' } : s))
    }
  }

  return (
    <section className="page">
      <h1>Mes favoris</h1>

      {loading && <p>Chargement…</p>}
      {error && <p className="search-error">{error}</p>}

      {!loading && !error && (
        <>
          <h2>Films ({movies.length})</h2>
          {movies.length === 0
            ? <p>Aucun film en favori.</p>
            : (
              <div className="fav-list">
                {movies.map(item => (
                  <FavCard key={item.id} item={item} type="movies" onDelete={handleDelete} onMarkSeen={handleMarkSeen} onNavigate={() => navigate(`/film/${item.id}`)} />
                ))}
              </div>
            )
          }

          <h2>Séries ({series.length})</h2>
          {series.length === 0
            ? <p>Aucune série en favori.</p>
            : (
              <div className="fav-list">
                {series.map(item => (
                  <FavCard key={item.id} item={item} type="series" onDelete={handleDelete} onMarkSeen={handleMarkSeen} onNavigate={() => navigate(`/serie/${item.id}`)} />
                ))}
              </div>
            )
          }
        </>
      )}

      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Page précédente</button>
    </section>
  )
}

export default PageFavoris
