import { useState, useEffect } from 'react'
import TrailerCard from './TrailerCard'

function MediaCard({ item, title, date, posterUrl, trailerKey, onCardClick, onFavorite, isFavorited = false }) {
  const [added, setAdded] = useState(isFavorited)

  useEffect(() => { setAdded(isFavorited) }, [isFavorited])

  const handleFavorite = async (e) => {
    e.stopPropagation()
    setAdded(true)
    const ok = await onFavorite(e)
    if (!ok) setAdded(false)
  }

  return (
    <article
      className="choice-card media-card"
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onCardClick()}
    >
      <TrailerCard
        trailerKey={trailerKey}
        posterUrl={posterUrl}
        alt={title}
      />
      <div className="media-link">
        <strong>{title}</strong>
        <small>{date || 'Date inconnue'}</small>
        <p>{item.overview || 'Aucune description disponible.'}</p>
      </div>
      {added
        ? <span className="favorite-star">★</span>
        : (
          <button type="button" className="favorite-btn" onClick={handleFavorite}>
            Ajouter aux favoris
          </button>
        )
      }
    </article>
  )
}

export default MediaCard
