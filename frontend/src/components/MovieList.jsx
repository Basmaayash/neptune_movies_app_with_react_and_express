function MovieList({ movies, onSelectMovie, selectedMovie }) {
  return (
    <div className="carousel-wrapper">

      {/* الأسهم */}
      <button className="arrow left">‹</button>

      <div className="movies-list">
        {movies.map((movie, index) => {
          const poster =
            movie.primaryImage?.url ||
            movie.image;

          const isActive = selectedMovie === movie;

          return (
            <div
              key={index}
              className={`movie-item ${isActive ? "active" : ""}`}
              style={{ backgroundImage: `url(${poster})` }}
              onClick={() => onSelectMovie(movie)}
            />
          );
        })}
      </div>

      <button className="arrow right">›</button>
    </div>
  );
}

export default MovieList;