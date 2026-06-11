function PosterCard({ item, type, onClick }) {
  const title = type === 'tv' ? item.name : item.title
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : 'https://via.placeholder.com/300x450?text=N/A'

  return (
    <div className="poster-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="poster-img-wrap">
        <img src={posterUrl} alt={title} className="poster-img" loading="lazy" />
        <div className="poster-overlay">
          <strong className="poster-title">{title}</strong>
          {item.vote_average > 0 && (
            <span className="poster-rating">⭐ {item.vote_average.toFixed(1)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PosterCard
