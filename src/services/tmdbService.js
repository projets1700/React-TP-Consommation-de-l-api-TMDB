// Service qui appelle l'API TMDB.
// On lui donne le type de média (movies ou tv) et la recherche saisie.
const API_BASE = 'https://api.themoviedb.org/3'

export async function searchMedia(type, query) {
  try {
    const response = await fetch(`${API_BASE}/search/${type}?query=${encodeURIComponent(query)}&include_adult=false&language=fr-FR`)
    if (!response.ok) throw new Error('Erreur API TMDB')
    return await response.json()
  } catch (error) {
    console.error(error)
    return { results: [] }
  }
}
