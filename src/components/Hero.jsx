import { getImageUrl } from '../api/tmdb'

export default function Hero({ movie }) {
  if (!movie) return null

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280')
  const title = movie.title || movie.name
  const overview = movie.overview?.slice(0, 180) + (movie.overview?.length > 180 ? '...' : '') || ''

  return (
    <header
      className="hero"
      style={{ backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined }}
    >
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <p className="hero__overview">{overview}</p>
        <div className="hero__actions">
          <button type="button" className="hero__btn hero__btn--play">
            Play
          </button>
          <button type="button" className="hero__btn hero__btn--info">
            More Info
          </button>
        </div>
      </div>
    </header>
  )
}
