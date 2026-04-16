import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import { getMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
const [loadingDelete, setLoadingDelete] = useState(false);
  // 🔥 states مطلوبة
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const deleteMovie = async (id) => {
  try {
    setLoadingDelete(true);

    await fetch(`http://localhost:5500/api/v1/movies/${id}`, {
      method: "DELETE",
    });

    setMovies((prev) => prev.filter((movie) => movie.id !== id));

    setSelectedMovie((prev) =>
      prev?.id === id ? null : prev
    );

  } catch (err) {
    console.log("Delete error:", err);
  } finally {
    setLoadingDelete(false);
  }
};


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMovies(query);
      const moviesList = data.movies || [];

      setMovies(moviesList);
      setSelectedMovie(moviesList.length ? moviesList[0] : null);
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 hover له أولوية
  const currentMovie = hoveredMovie || selectedMovie;

  return (
    <div style={{ minHeight: "100vh" }}>
      
      <Header onSearch={fetchMovies} />

      {/* 🔥 حالات */}
      {loading && <p style={{ padding: "20px" }}>Loading...</p>}
      
      {error && (
        <p style={{ padding: "20px", color: "red" }}>
          {error}
        </p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p style={{ padding: "20px" }}>
          No movies found
        </p>
      )}

      {/* 🔥 Hero */}
      {currentMovie && <Hero movie={currentMovie} />}

      {/* 🔥 Movie List */}
      <MovieList
  movies={movies}
  selectedMovie={selectedMovie}
  onSelect={setSelectedMovie}
  onHover={setHoveredMovie}
  onDelete={deleteMovie}
/>

    </div>
  );
}

export default Home;