import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import { getMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    try {
      const data = await getMovies(query);
      const moviesList = data.movies || [];

      setMovies(moviesList);

      // أول فيلم افتراضي
      setSelectedMovie(moviesList.length ? moviesList[0] : null);
    } catch (err) {
      console.error("خطأ في جلب الأفلام:", err);
    }
  };

  return (
    <div
     
  style={{
    minHeight: "100vh",
    transition: "0.5s",
    backgroundImage: selectedMovie?.poster_data?.original
      ? `url(${selectedMovie.poster_data.original})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}

    >
      <Header onSearch={fetchMovies} />

      {selectedMovie && <Hero movie={selectedMovie} />}

      <MovieList
        movies={movies}
        selectedMovie={selectedMovie}
        onSelect={setSelectedMovie}
      />
    </div>
  );
}

export default Home;