import { useState, useEffect } from 'react'
import { translateGenre } from '../utils/genres'

function MediaDetail({ media, type, onFavorite, isFavorited = false }) {
  const [added, setAdded] = useState(isFavorited)

  useEffect(() => { setAdded(isFavorited) }, [isFavorited])

  const title = type === 'movies' ? media.title : media.name
  const date = type === 'movies' ? media.release_date : media.first_air_date
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Affiche+indisponible'

  const handleFavorite = async () => {
    setAdded(true)
    const ok = await onFavorite()
    if (!ok) setAdded(false)
  }

  return (
    <article className="choice-card media-card">
      <img className="media-poster" src={posterUrl} alt={title} />
      <h1>{title}</h1>
      <p className="lead">{media.overview || 'Aucun synopsis disponible.'}</p>
      <p><strong>Date :</strong> {date || 'Date inconnue'}</p>
      <p><strong>Genres :</strong> {(media.genres || []).map(g => translateGenre(g.name)).join(', ') || 'Non renseigné'}</p>
      <p><strong>Note :</strong> {media.vote_average ? `${media.vote_average.toFixed(1)}/10` : 'Non disponible'}</p>
      {onFavorite && (
        added
          ? <span className="favorite-star">★</span>
          : (
            <button type="button" className="favorite-btn" onClick={handleFavorite}>
              Ajouter aux favoris
            </button>
          )
      )}
    </article>
  )
}

export default MediaDetail
