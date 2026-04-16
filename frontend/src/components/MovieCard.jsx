function MovieCard({ movie, onSelect, onHover, onDelete, isActive }) {
  const posterUrl =
    movie.poster_data?.original ||
    movie.poster_data?.posters?.sx300?.url ||
    "https://dummyimage.com/300x450/000/fff&text=No+Image";

  return (
    <div
      className="movie-item"
      onClick={() => onSelect(movie)}
      onMouseEnter={() => onHover(movie)}
      onMouseLeave={() => onHover(null)}
      style={{
        border: isActive ? "2px solid #F5C518" : "none",
      }}
    >
      <img src={posterUrl} alt={movie.title} />

      {/* 🔥 زر الحذف */}
      
      <button className="delete-btn"
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          zIndex: 9999,
          background: "red",
          color: "white",
          border: "none",
          padding: "5px",
          fontSize: "12px",
          cursor: "pointer"
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("DELETE CLICKED:", movie.id);
          onDelete(movie.id);
        }}
      >
        X
      </button>
    </div>
  );
}

export default MovieCard;