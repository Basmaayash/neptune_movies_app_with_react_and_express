export async function getMovies() {
  const res = await fetch("https://api.imdbapi.dev/titles");
  const data = await res.json();
  return data.titles.slice(0, 20);
}