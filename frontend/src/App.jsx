import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import { getMovies } from "./api";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      const data = await getMovies();
      setMovies(data);
      setSelectedMovie(data[0]);
    }

    loadMovies();
  }, []);

  const bgImage =
    selectedMovie?.primaryImage?.url ||
    selectedMovie?.image;

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="overlay" />

      <Hero movie={selectedMovie} />

      <MovieList
        movies={movies}
        selectedMovie={selectedMovie}
        onSelectMovie={setSelectedMovie}
      />
    </div>
  );
}

export default App;