// Service qui appelle l'API fournie pour le TP.
// On lui donne le type de média (movies ou tv) et la recherche saisie.
const API_BASE = 'https://api-media-ipssi.julienpoirier-webdev.com'

export async function searchMedia(type, query) {
  const response = await fetch(
    `${API_BASE}/api/${type}/search?query=${encodeURIComponent(query)}&page=1&includeFavorites=false`,
  )
  if (!response.ok) throw new Error('Erreur API fournie')
  return await response.json()
}

export async function getMediaDetails(type, id) {
  try {
    const response = await fetch(`${API_BASE}/api/${type}/${id}`)
    if (!response.ok) throw new Error('Erreur API détail')
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getMediaTrailer(type, id) {
  try {
    const data = await getMediaDetails(type, id)
    if (!data) return null
    const videos = data.videos?.results || []

    const frTrailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer' && v.iso_639_1 === 'fr')
    if (frTrailer) return frTrailer.key

    const anyTrailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer')
    if (anyTrailer) return anyTrailer.key

    const anyVideo = videos.find(v => v.site === 'YouTube')
    return anyVideo?.key || null
  } catch {
    return null
  }
}

export async function addFavorite(type, item) {
  const endpoint = type === 'movies' ? 'movies' : 'series'
  const payload =
    type === 'movies'
      ? {
          id: item.id,
          title: item.title,
          poster_path: item.poster_path || '',
          release_date: item.release_date || '',
          overview: item.overview || '',
          status: 'pas vu',
        }
      : {
          id: item.id,
          name: item.name,
          poster_path: item.poster_path || '',
          release_date: item.first_air_date || '',
          overview: item.overview || '',
          status: 'pas vu',
        }

  try {
    const response = await fetch(`${API_BASE}/api/favorites/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error('Erreur lors de l’ajout au favori')
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
