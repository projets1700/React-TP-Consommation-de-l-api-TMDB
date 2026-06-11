import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPopularMovies } from '../services/tmdbService'

function PageAccueil() {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    let ignore = false
    getPopularMovies().then(data => {
      if (!ignore) setHero(data.results?.[0] || null)
    })
    return () => { ignore = true }
  }, [])

  const backdropUrl = hero?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}`
    : null

  return (
    <>
      <div
        className="hero"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="eyebrow">À l&apos;affiche</span>
            <h1 className="hero-title">{hero?.title || 'CINESCAPE'}</h1>
            {hero?.overview && (
              <p className="hero-overview">{hero.overview}</p>
            )}
            <div className="hero-cta">
              <Link to="/recherche-films" className="btn-primary">Explorer les films</Link>
              <Link to="/recherche-series" className="btn-secondary">Explorer les séries</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="page">
        <h2>Découvrir</h2>
        <div className="card-grid">
          <Link className="choice-card" to="/recherche-films">
            <span>🎬</span>
            <h2>Films</h2>
            <p>Recherchez et explorez des milliers de films.</p>
          </Link>
          <Link className="choice-card" to="/recherche-series">
            <span>📺</span>
            <h2>Séries</h2>
            <p>Découvrez les meilleures séries du moment.</p>
          </Link>
          <Link className="choice-card" to="/par-genre">
            <span>🎭</span>
            <h2>Par genre</h2>
            <p>Naviguez par genre cinématographique.</p>
          </Link>
          <Link className="choice-card" to="/favoris">
            <span>❤️</span>
            <h2>Favoris</h2>
            <p>Retrouvez vos films et séries sauvegardés.</p>
          </Link>
        </div>
      </section>
    </>
  )
}

export default PageAccueil
