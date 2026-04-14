function Hero({ movie }) {
  // دمجنا رابط الباك إند مع صورة الـ Hero
  const bg = movie?.image 
    ? `http://localhost:5500/assets/${movie.image}` 
    : "https://placeholder.com";

  return (
    <>
      <div
        className="background-overlay"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <section className="hero">
        <h1>{movie.title}</h1>

        <div className="movie-info">
          <span className="rating">
            <strong>IMDB</strong> {movie.rating || "N/A"}
          </span>

          <span>{movie.year}</span>

          <span>{movie.duration || "120 min"}</span>

          <span>{movie.genre || "N/A"}</span>
        </div>

        <p>{movie.description}</p>
      </section>
    </>
  );
}

export default Hero;
