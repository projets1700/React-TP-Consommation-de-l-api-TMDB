import { useEffect, useState } from 'react'
import { searchMedia } from '../services/tmdbService'

// Hook réutilisable pour la recherche de médias.
// Il gère la saisie, le chargement, et les résultats.
function useSearchMedia(type, initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const runSearch = async (term) => {
    const value = term.trim()
    if (!value) return

    setLoading(true)
    const data = await searchMedia(type, value)

    const sortedResults = [...(data.results || [])].sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || 0).getTime()
      const dateB = new Date(b.release_date || b.first_air_date || 0).getTime()

      return dateB - dateA
    })

    setResults(sortedResults)
    setLoading(false)
  }

  const handleSearch = () => runSearch(query)

  useEffect(() => {
    if (!initialQuery.trim()) return

    runSearch(initialQuery)
  }, [initialQuery, type])

  return { query, results, loading, handleChange, handleSearch }
}

export default useSearchMedia
