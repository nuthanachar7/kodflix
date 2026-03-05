const API_BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY
  return typeof key === 'string' ? key.trim() : key
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${IMAGE_BASE}/${size}${normalizedPath}`
}

async function fetchTmdb(endpoint) {
  const key = getApiKey()
  if (!key || key === 'your_actual_tmdb_api_key_here') {
    throw new Error('Missing or invalid VITE_TMDB_API_KEY in .env')
  }
  const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${encodeURIComponent(key)}`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.status_message || `TMDB API error: ${res.status}`)
  }
  return res.json()
}

export async function getTrendingMovies() {
  const data = await fetchTmdb('/trending/movie/day?language=en-US')
  return data.results || []
}

export async function getPopularMovies() {
  const data = await fetchTmdb('/movie/popular?language=en-US')
  return data.results || []
}

export async function getTopRatedMovies() {
  const data = await fetchTmdb('/movie/top_rated?language=en-US')
  return data.results || []
}

export async function getDiscoverMovies() {
  const data = await fetchTmdb('/discover/movie?sort_by=popularity.desc&language=en-US')
  return data.results || []
}
