function MovieCard({
  movie,
  onSelect,
  onHover,
  onDelete,
  onEdit,
  isActive,
}) {
  if (!movie) return null;

  const poster =
    movie.poster ||
    movie.poster_data?.posters?.sx300?.url ||
    movie.poster_data?.original ||
    "https://dummyimage.com/300x450/000/fff&text=No+Image";

  return (
    <div
      className="movie-item"
      onClick={() => onSelect(movie)}
      onMouseEnter={() => onHover(movie)}
      onMouseLeave={() => onHover(null)}
      style={{ border: isActive ? "2px solid #F5C518" : "none" }}
    >
      <img src={poster} alt={movie.title} />

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(movie.id);
        }}
      >
        X
      </button>

      <button
        className="edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(movie);
        }}
      >
        ✏
      </button>
    </div>
  );
}

export default MovieCard;