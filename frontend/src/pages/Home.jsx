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
      
      // التعديل هون: لازم نوصل لـ data.movies لأن الباك إند ببعتها هيك
      const moviesList = data.movies || []; 
      
      setMovies(moviesList);
      setSelectedMovie(moviesList.length ? moviesList[0] : null);
    } catch (err) {
      console.error("خطأ في جلب الأفلام:", err);
    }
  };

  return (
    <div className="container">
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