import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPopularMovies, getPopularSeries } from '../services/tmdbService'
import MediaRow from '../components/MediaRow'

function PageRecommandes() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    Promise.all([getPopularMovies(), getPopularSeries()]).then(([m, s]) => {
      if (ignore) return
      setMovies(m.results || [])
      setSeries(s.results || [])
      setLoading(false)
    })
    return () => { ignore = true }
  }, [])

  return (
    <section className="page">
      <h1>Recommandés pour vous</h1>
      <p className="recommandes-intro">Découvrez les films et séries les plus appréciés du moment.</p>

      {loading && <p>Chargement…</p>}

      {!loading && (
        <div className="home-sections">
          <MediaRow
            title="Films du moment"
            items={movies}
            type="movies"
            onItemClick={item => navigate(`/film/${item.id}`)}
          />
          <MediaRow
            title="Séries du moment"
            items={series}
            type="tv"
            onItemClick={item => navigate(`/serie/${item.id}`)}
          />
        </div>
      )}

      <button type="button" className="back-link" onClick={() => navigate(-1)}>← Page précédente</button>
    </section>
  )
}

export default PageRecommandes
