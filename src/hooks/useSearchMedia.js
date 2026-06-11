import { useCallback, useEffect, useState } from 'react'
import { searchMedia } from '../services/tmdbService'

// Hook réutilisable pour la recherche de médias.
// Il gère la saisie, le chargement, l'erreur et les résultats.
function useSearchMedia(type, initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const runSearch = useCallback(async (term) => {
    const value = term.trim()
    if (!value) return

    setLoading(true)
    setResults([])
    setError(null)

    try {
      const data = await searchMedia(type, value)

      const sortedResults = [...(data.results || [])].sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || 0).getTime()
        const dateB = new Date(b.release_date || b.first_air_date || 0).getTime()
        return dateB - dateA
      })

      setResults(sortedResults)
    } catch {
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }, [type])

  const handleSearch = () => runSearch(query)

  useEffect(() => {
    if (!initialQuery.trim()) return
    runSearch(initialQuery)
  }, [initialQuery, runSearch])

  return { query, results, loading, error, handleChange, handleSearch }
}

export default useSearchMedia
