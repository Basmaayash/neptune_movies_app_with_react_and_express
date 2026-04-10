function Hero({ movie }) {
  return (
    <section className="hero">
      <h1>{movie?.primaryTitle || movie?.title}</h1>

      <div className="movie-info">
        <span>IMDB {movie?.rating?.aggregateRating || "N/A"}</span>
        <span>•</span>
        <span>{movie?.startYear || "N/A"}</span>
        <span>•</span>
        <span>
          {movie?.runtimeSeconds
            ? Math.floor(movie.runtimeSeconds / 60) + " min"
            : "N/A"}
        </span>
      </div>

      <p>{movie?.plot || "No description"}</p>
    </section>
  );
}

export default Hero;