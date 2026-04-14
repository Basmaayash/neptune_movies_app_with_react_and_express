function Hero({ movie }) {

  const bg =
    movie?.poster_data?.original ||
    "https://via.placeholder.com/800x1200";

  return (
    <>
      <div
        className="background-overlay"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <section className="hero">
        <h1>{movie.title}</h1>

        <div className="movie-info">
          <span className="rating">⭐ {movie.rating}</span>

          <span className="dot">•</span>

          <span className="meta">
            {movie.year?.split("/").pop()}
          </span>

          <span className="dot">•</span>

          <span className="meta">
            {movie.runtime} min
          </span>
        </div>

        <p>{movie.description}</p>
      </section>
    </>
  );
}

export default Hero;
