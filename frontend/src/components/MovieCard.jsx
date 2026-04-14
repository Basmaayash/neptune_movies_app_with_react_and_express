function MovieCard({ movie, onSelect, isActive }) {
  const posterUrl =
    movie.poster_data?.original ||
    "https://dummyimage.com/300x450/000/fff.jpg&text=No+Image";

  return (
    <div
      className="movie-item"
      onClick={() => onSelect(movie)}
      style={{
        border: isActive ? "2px solid #F5C518" : "none"
      }}
    >
      <img src={posterUrl} alt={movie.title} />
    </div>
  );
}

export default MovieCard;