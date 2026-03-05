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

const PLACEHOLDERS = ['your_actual_tmdb_api_key_here', 'your_tmdb_api_key_here']

async function fetchTmdb(endpoint) {
  const key = getApiKey()
  const isPlaceholder = typeof key === 'string' && PLACEHOLDERS.includes(key.trim())
  if (!key || isPlaceholder) {
    throw new Error(
      'Missing or invalid VITE_TMDB_API_KEY. ' +
      'Local: set it in .env. Vercel: Project Settings → Environment Variables → add VITE_TMDB_API_KEY, then redeploy.'
    )
  }
  const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${encodeURIComponent(key)}`
  let res
  try {
    res = await fetch(url)
  } catch (networkErr) {
    throw new Error(
      'Cannot reach TMDB. If this is Vercel: add VITE_TMDB_API_KEY in Project Settings → Environment Variables and redeploy.'
    )
  }
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
