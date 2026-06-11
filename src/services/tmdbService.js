// Service qui appelle l'API fournie pour le TP.
// On lui donne le type de média (movies ou tv) et la recherche saisie.
const API_BASE = 'https://api-media-ipssi.julienpoirier-webdev.com'

export async function searchMedia(type, query) {
  try {
    const response = await fetch(
      `${API_BASE}/api/${type}/search?query=${encodeURIComponent(query)}&page=1&includeFavorites=false`,
    )
    if (!response.ok) throw new Error('Erreur API fournie')
    return await response.json()
  } catch (error) {
    console.error(error)
    return { results: [] }
  }
}
