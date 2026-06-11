import { useCallback, useEffect, useState } from 'react'
import { searchMedia } from '../services/tmdbService'

function useSearchMedia(type, initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const runSearch = useCallback(async (term, pageNum = 1) => {
    const value = term.trim()
    if (!value) return

    setLoading(true)
    setResults([])
    setError(null)

    try {
      const data = await searchMedia(type, value, pageNum)

      const sortedResults = [...(data.results || [])].sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || 0).getTime()
        const dateB = new Date(b.release_date || b.first_air_date || 0).getTime()
        return dateB - dateA
      })

      setResults(sortedResults)
      setPage(pageNum)
      setTotalPages(data.total_pages || 1)
    } catch {
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }, [type])

  const handleSearch = () => runSearch(query, 1)
  const handlePageChange = (newPage) => runSearch(query, newPage)

  useEffect(() => {
    if (!initialQuery.trim()) return
    runSearch(initialQuery, 1)
  }, [initialQuery, runSearch])

  return { query, results, loading, error, handleChange, handleSearch, page, totalPages, handlePageChange }
}

export default useSearchMedia
