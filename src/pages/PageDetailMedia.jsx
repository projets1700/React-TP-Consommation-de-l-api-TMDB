import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getMediaDetails, addFavorite } from '../services/tmdbService'
import MediaDetail from '../components/MediaDetail'

function PageDetailMedia({ type }) {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState('')

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
    return () => { ignore = true }
  }, [id, type])

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(''), 3000)
    return () => clearTimeout(timer)
  }, [feedback])

  const handleClose = () => {
    const returnPath = location.state?.returnPath || (type === 'movies' ? '/recherche-films' : '/recherche-series')
    navigate(returnPath, {
      replace: true,
      state: { restoreQuery: location.state?.searchQuery || '' },
    })
  }

  const handleAddFavorite = async () => {
    const saved = await addFavorite(type, media)
    const name = type === 'movies' ? media.title : media.name
    setFeedback(saved
      ? `${name} ajouté aux favoris.`
      : "Impossible d'ajouter aux favoris."
    )
  }

  if (loading) return <p className="page">Chargement du détail…</p>
  if (!media) return <p className="page">Aucune information disponible.</p>

  return (
    <section className="page">
      <button type="button" className="back-link" onClick={handleClose}>
        ← Retour à la recherche
      </button>
      <MediaDetail media={media} type={type} onFavorite={handleAddFavorite} feedback={feedback} />
    </section>
  )
}

export default PageDetailMedia
