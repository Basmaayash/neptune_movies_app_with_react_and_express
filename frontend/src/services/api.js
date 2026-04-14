const BASE_URL = "http://localhost:5500/api/v1";

export async function getMovies(query = "") {
  const url = query
    ? `${BASE_URL}/movies?search=${query}`
    : `${BASE_URL}/movies`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("error");

  return await res.json();
}