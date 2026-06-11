const KEYS = { movies: 'cinescape_fav_movies', series: 'cinescape_fav_series' }

export function getFavoritedIds(type) {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEYS[type])) || [])
  } catch {
    return new Set()
  }
}

export function addFavoritedId(type, id) {
  const ids = getFavoritedIds(type)
  ids.add(id)
  localStorage.setItem(KEYS[type], JSON.stringify([...ids]))
}

export function removeFavoritedId(type, id) {
  const ids = getFavoritedIds(type)
  ids.delete(id)
  localStorage.setItem(KEYS[type], JSON.stringify([...ids]))
}
