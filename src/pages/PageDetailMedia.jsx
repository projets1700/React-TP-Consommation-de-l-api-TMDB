import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getMediaDetails } from '../services/tmdbService'

function PageDetailMedia({ type }) {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadMedia() {
      setLoading(true)
      const data = await getMediaDetails(type, id)
      if (!ignore) {
        setMedia(data)
        setLoading(false)
      }
    }

    loadMedia()

    return () => {
      ignore = true
    }
  }, [id, type])

  const handleClose = () => {
    const returnPath = location.state?.returnPath || (type === 'movies' ? '/recherche-films' : '/recherche-series')

    navigate(returnPath, {
      replace: true,
      state: { restoreQuery: location.state?.searchQuery || '' },
    })
  }

  if (loading) return <p className="page">Chargement du détail…</p>
  if (!media) return <p className="page">Aucune information disponible.</p>

  const title = type === 'movies' ? media.title : media.name
  const date = type === 'movies' ? media.release_date : media.first_air_date
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Affiche+indisponible'

  return (
    <section className="page">
      <button type="button" className="back-link" onClick={handleClose}>
        ← Retour à la recherche
      </button>

      <article className="choice-card media-card">
        <img className="media-poster" src={posterUrl} alt={title} />
        <h1>{title}</h1>
        <p className="lead">{media.overview || 'Aucun synopsis disponible.'}</p>
        <p><strong>Date :</strong> {date || 'Date inconnue'}</p>
        <p><strong>Genres :</strong> {(media.genres || []).map((genre) => genre.name).join(', ') || 'Non renseigné'}</p>
        <p><strong>Note :</strong> {media.vote_average ? `${media.vote_average.toFixed(1)}/10` : 'Non disponible'}</p>
      </article>
    </section>
  )
}

export default PageDetailMedia
