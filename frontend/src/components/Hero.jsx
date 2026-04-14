function Hero({ movie }) {
  const bg =
    movie?.poster_data?.original ||
    "https://dummyimage.com/1920x1080/000/fff&text=No+Image";

  return (
    <>
      {/* الخلفية */}
      <div
        className="background-overlay"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* المحتوى */}
      <section className="hero">
        <h1>{movie?.title}</h1>

        <div className="movie-info">
          <span className="rating">⭐ {movie?.rating}</span>

          <span className="dot">•</span>

          <span className="meta">
            {movie?.year?.split("-")[0]}
          </span>

          <span className="dot">•</span>

          <span className="meta">
            {movie?.runtime} min
          </span>
        </div>

        <p>{movie?.description}</p>
      </section>
    </>
  );
}

export default Hero;