export const GENRES_FR = {
  'Action':           'Action',
  'Adventure':        'Aventure',
  'Animation':        'Animation',
  'Comedy':           'Comédie',
  'Crime':            'Crime',
  'Documentary':      'Documentaire',
  'Drama':            'Drame',
  'Family':           'Famille',
  'Fantasy':          'Fantastique',
  'History':          'Histoire',
  'Horror':           'Horreur',
  'Music':            'Musique',
  'Mystery':          'Mystère',
  'Romance':          'Romance',
  'Science Fiction':  'Science-fiction',
  'TV Movie':         'Téléfilm',
  'Thriller':         'Thriller',
  'War':              'Guerre',
  'Western':          'Western',
  'Action & Adventure': 'Action & Aventure',
  'Kids':             'Jeunesse',
  'News':             'Actualités',
  'Reality':          'Téléréalité',
  'Sci-Fi & Fantasy': 'SF & Fantastique',
  'Soap':             'Feuilleton',
  'Talk':             'Talk-show',
  'War & Politics':   'Guerre & Politique',
}

export function translateGenre(name) {
  return GENRES_FR[name] ?? name
}
