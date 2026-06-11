function MediaRow({ title, items, type, onItemClick }) {
  if (!items.length) return null

  return (
    <div className="media-row">
      <h2 className="media-row-title">{title}</h2>
      <div className="media-row-scroll">
        {items.map(item => {
          const label = type === 'tv' ? item.name : item.title
          const posterUrl = item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : 'https://via.placeholder.com/300x450?text=N/A'

          return (
            <div
              key={item.id}
              className="row-card"
              onClick={() => onItemClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onItemClick(item)}
            >
              <img src={posterUrl} alt={label} className="row-card-img" loading="lazy" />
              <div className="row-card-overlay">
                <strong className="row-card-title">{label}</strong>
                {item.vote_average > 0 && (
                  <span className="row-card-rating">⭐ {item.vote_average.toFixed(1)}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MediaRow
