import { getImageUrl } from '../api/tmdb'

export default function PosterCard({ movie }) {
  if (!movie) return null

  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const title = movie.title || movie.name

  return (
    <div className="poster-card">
      <div className="poster-card__img-wrap">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="poster-card__img"
            loading="lazy"
          />
        ) : (
          <div className="poster-card__placeholder" />
        )}
      </div>
      <p className="poster-card__title">{title}</p>
    </div>
  )
}
