import { useState, useEffect } from 'react'
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getDiscoverMovies,
} from '../api/tmdb'

export function useTmdb() {
  const [heroMovie, setHeroMovie] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [trending, popular, topRated, discover] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getDiscoverMovies(),
        ])

        if (cancelled) return

        const hero = trending[0] || popular[0] || null
        setHeroMovie(hero)
        setRows([
          { id: 'trending', title: 'Trending Now', movies: trending },
          { id: 'popular', title: 'Popular', movies: popular },
          { id: 'top-rated', title: 'Top Rated', movies: topRated },
          { id: 'discover', title: 'Discover', movies: discover },
        ])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load movies')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { heroMovie, rows, loading, error }
}
