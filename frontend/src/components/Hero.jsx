function Hero({ movie }) {
  const bg =
    movie?.poster ||
    movie?.poster_data?.original ||
    movie?.poster_data?.posters?.sx500?.url ||
    "https://dummyimage.com/1920x1080/000/fff&text=No+Image";

  return (
    <>
      <div
        className="background-overlay"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <section className="hero">
        <h1>{movie?.title}</h1>

        <div className="movie-info">
          <span className="rating">⭐ {movie?.rating || "N/A"}</span>
          <span className="dot">•</span>
          <span>{movie?.year || "Unknown"}</span>
          <span className="dot">•</span>
          <span>{movie?.runtime || "?"} min</span>
        </div>

        <p>{movie?.description || "No description"}</p>
      </section>
    </>
  );
}

export default Hero;