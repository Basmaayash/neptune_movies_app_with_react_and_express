function MovieCard({ movie, onSelect, isActive }) {
  return (
    <div
      className="movie-item"
      style={{
        border: isActive ? "2px solid #F5C518" : "none",
        padding: "10px"
      }}
      onClick={() => onSelect(movie)}
    >
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        alt={movie.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h3>{movie.title}</h3>
    </div>
  );
}

export default MovieCard;