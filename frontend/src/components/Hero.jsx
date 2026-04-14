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
  <span className="rating">⭐ {movie.vote_average}</span>

  <span className="dot">•</span>

  <span className="meta">
    {movie.release_date?.split("-")[0]}
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
