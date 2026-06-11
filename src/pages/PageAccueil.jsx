import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPopularMovies, getPopularSeries, getGenres } from '../services/tmdbService'
import MediaRow from '../components/MediaRow'

const GENRE_GRADIENTS = {
  28:    'linear-gradient(135deg, #E50914 0%, #FF6B35 100%)',
  12:    'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
  16:    'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  35:    'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  80:    'linear-gradient(135deg, #374151 0%, #1F2937 100%)',
  99:    'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
  18:    'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
  10751: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  14:    'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
  36:    'linear-gradient(135deg, #B45309 0%, #78350F 100%)',
  27:    'linear-gradient(135deg, #4A0000 0%, #1A1A2E 100%)',
  10402: 'linear-gradient(135deg, #DB2777 0%, #9D174D 100%)',
  9648:  'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  10749: 'linear-gradient(135deg, #F472B6 0%, #EC4899 100%)',
  878:   'linear-gradient(135deg, #4338CA 0%, #0EA5E9 100%)',
  10770: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
  53:    'linear-gradient(135deg, #111827 0%, #E50914 100%)',
  10752: 'linear-gradient(135deg, #78350F 0%, #292524 100%)',
  37:    'linear-gradient(135deg, #92400E 0%, #78350F 100%)',
}

function PageAccueil() {
  const navigate = useNavigate()
  const [hero, setHero] = useState(null)
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    let ignore = false
    Promise.all([getPopularMovies(), getPopularSeries(), getGenres()]).then(([m, s, g]) => {
      if (ignore) return
      const results = m.results || []
      setHero(results[0] || null)
      setMovies(results)
      setSeries(s.results || [])
      setGenres(g.genres || [])
    })
    return () => { ignore = true }
  }, [])

  const backdropUrl = hero?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}`
    : null

  return (
    <div className="accueil">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="hero" style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="eyebrow">À l&apos;affiche</span>
            <h1 className="hero-title">{hero?.title || 'CINESCAPE'}</h1>
            {hero?.overview && (
              <p className="hero-overview">{hero.overview}</p>
            )}
            <div className="hero-cta">
              <Link to="/recherche-films" className="btn-primary">▶ Regarder</Link>
              {hero && (
                <Link to={`/film/${hero.id}`} className="btn-secondary">▶ Bande-annonce</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────── */}
      <div className="home-sections">
        <MediaRow
          title="Films populaires"
          items={movies}
          type="movies"
          onItemClick={item => navigate(`/film/${item.id}`)}
        />
        <MediaRow
          title="Séries populaires"
          items={series}
          type="tv"
          onItemClick={item => navigate(`/serie/${item.id}`)}
        />

        {/* Catégories */}
        {genres.length > 0 && (
          <div className="media-row">
            <h2 className="media-row-title">Catégories</h2>
            <div className="genre-cards-row">
              {genres.slice(0, 10).map(genre => (
                <div
                  key={genre.id}
                  className="genre-hero-card"
                  style={{ background: GENRE_GRADIENTS[genre.id] || 'linear-gradient(135deg,#222,#444)' }}
                  onClick={() => navigate('/par-genre')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate('/par-genre')}
                >
                  <span className="genre-hero-name">{genre.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PageAccueil
