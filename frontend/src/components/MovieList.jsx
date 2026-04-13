import MovieCard from "./MovieCard.jsx";
import { useRef } from "react";

function MovieList({ movies, onSelect, selectedMovie }) {
  const listRef = useRef();

  const scroll = (dir) => {
    listRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-container">
      <div className="nav-buttons-wrapper">
        <button onClick={() => scroll("left")} className="nav-btn">
          ◀
        </button>
        <button onClick={() => scroll("right")} className="nav-btn">
          ▶
        </button>
      </div>

      <div className="movies-list" ref={listRef}>
            {movies.map((movie) => (
      <MovieCard
        key={movie.id} 
        movie={movie}
        onSelect={onSelect}
        isActive={selectedMovie === movie}
      />
    ))}
          </div>
    </div>
  );
}

export default MovieList;