const BASE_URL = "http://localhost:5500/api/v1";

export async function getMovies(query = "") {
  const url = query
    ? `${BASE_URL}/movies?search=${encodeURIComponent(query)}`
    : `${BASE_URL}/movies`;

  const res = await fetch(url);
  const data = await res.json();
  return data.movies || [];
}

export async function addMovie(movie) {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  return await res.json();
}

export async function deleteMovie(id) {
  await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
  });
}

export async function updateMovie(id, data) {
  await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}