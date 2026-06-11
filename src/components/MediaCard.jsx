import TrailerCard from './TrailerCard'

function MediaCard({ item, title, date, posterUrl, trailerKey, onCardClick, onFavorite }) {
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
      <button
        type="button"
        className="favorite-btn"
        onClick={e => { e.stopPropagation(); onFavorite(e) }}
      >
        Ajouter aux favoris
      </button>
    </article>
  )
}

export default MediaCard
