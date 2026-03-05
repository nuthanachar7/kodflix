import { useTmdb } from './hooks/useTmdb'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Row from './components/Row'

export default function App() {
  const { heroMovie, rows, loading, error } = useTmdb()

  if (error) {
    return (
      <div className="app">
        <Navbar />
        <div className="app__error">
          <p>{error}</p>
          <p className="app__error-hint">
            Use your <strong>API Key (v3 auth)</strong> from{' '}
            <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">TMDB API Settings</a>, not the Read Access Token.
            Local: in <code>.env</code> put <code>VITE_TMDB_API_KEY=your_key</code> and restart the dev server.
            Deployed (e.g. Vercel): add <code>VITE_TMDB_API_KEY</code> in Project Settings → Environment Variables, then redeploy.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app">
        <Navbar />
        <div className="app__loading">
          <div className="app__spinner" />
          <p>Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <Hero movie={heroMovie} />
      <main className="app__main">
        {rows.map((row) => (
          <Row key={row.id} title={row.title} movies={row.movies} />
        ))}
      </main>
    </div>
  )
}
