import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";

import {
  getMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    year: "",
    poster: "",
  });

  const fetchMovies = async (query = "") => {
    try {
      const data = await getMovies(query);
      setMovies(data);

      if (!query) {
        setSelectedMovie(data?.[0] || null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing && formData.id) {
        await updateMovie(formData.id, {
          title: formData.title,
          description: formData.description,
          year: Number(formData.year),
          poster: formData.poster,
        });
      } else {
        await addMovie({
          title: formData.title,
          description: formData.description,
          year: Number(formData.year),
          poster: formData.poster,
        });
      }

      setShowModal(false);
      setIsEditing(false);
      setFormData({
        id: null,
        title: "",
        description: "",
        year: "",
        poster: "",
      });

      fetchMovies();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);

      setMovies((prev) => prev.filter((m) => m.id !== id));

      if (selectedMovie?.id === id) {
        setSelectedMovie(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (movie) => {
    setFormData(movie);
    setIsEditing(true);
    setShowModal(true);
  };

  const currentMovie =
    hoveredMovie !== null ? hoveredMovie : selectedMovie;

  return (
    <div>
      <Header onSearch={fetchMovies} />

      {currentMovie && <Hero movie={currentMovie} />}

      <MovieList
        movies={movies}
        selectedMovie={selectedMovie}
        onSelect={setSelectedMovie}
        onHover={setHoveredMovie}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddClick={() => {
          setIsEditing(false);
          setShowModal(true);
        }}
      />

      <MovieModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
      />
    </div>
  );
}

export default Home;