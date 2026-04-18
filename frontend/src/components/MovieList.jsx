import { useRef } from "react";
import MovieCard from "./MovieCard";

function MovieList({
  movies = [],
  onSelect,
  selectedMovie,
  onHover,
  onDelete,
  onEdit,
  onAddClick,
}) {
  const ref = useRef();

  const scroll = (dir) => {
    ref.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-container">
      <div className="nav-buttons-wrapper">
        <div className="left-controls">
          <button onClick={() => scroll("left")} className="nav-btn">◀</button>
          <button onClick={() => scroll("right")} className="nav-btn">▶</button>
        </div>

        <button className="add-btn-small" onClick={onAddClick}>
          + Add
        </button>
      </div>

      <div className="movies-list" ref={ref}>
        {movies?.filter(Boolean).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelect}
            onHover={onHover}
            onDelete={onDelete}
            onEdit={onEdit}
            isActive={selectedMovie?.id === movie.id}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;