import PosterCard from './PosterCard'

export default function Row({ title, movies }) {
  if (!movies?.length) return null

  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <PosterCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
