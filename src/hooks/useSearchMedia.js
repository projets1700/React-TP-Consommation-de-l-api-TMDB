import { useState } from 'react'
import { searchMedia } from '../services/tmdbService'

// Hook réutilisable pour la recherche de médias.
// Il gère la saisie, le chargement, et les résultats.
function useSearchMedia(type) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    const data = await searchMedia(type, query)
    setResults(data.results || [])
    setLoading(false)
  }

  return { query, results, loading, handleChange, handleSearch }
}

export default useSearchMedia
