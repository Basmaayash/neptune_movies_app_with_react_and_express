import axios from "axios";
import { movieRepository, externalDataRepository } from './repository.js';


export class ImdbService {

    static BASE_URL = "https://www.omdbapi.com/?apikey=24bbbb93";

    // GET movie by IMDB ID
    async getMovieByImdbId(imdbId) {
        try {
        const url = `${ImdbService.BASE_URL}&i=${imdbId}`;
        const response = await axios.get(url);

        return response.data;
        } catch (err) {
        throw new Error(`IMDB fetch failed: ${err.message}`);
        }
    }

    #buildPoster(url, size) {
      if (!url) return null;
      return url.replace(/_V1_.*\.jpg/, `_V1_SX${size}.jpg`);
    }
    
    async getMoviePosterImageDataByImdbID(imdbId) {
      const imdbData = await this.getMovieByImdbId(imdbId);
      const posterUrl = imdbData.Poster;
    
      if (!posterUrl || posterUrl === "N/A") {
        return {
          imdbId,
          message: "no image poster found for this imdb id"
        };
      }
    
      const sx300 = this.#buildPoster(posterUrl, 300);
      const sx500 = this.#buildPoster(posterUrl, 500);
    
      return {
        original: posterUrl,
        posters: {
          sx300: {
            url: sx300,
            width: 300
          },
          sx500: {
            url: sx500,
            width: 500
          }
        }
      };
    }
}

export const API_Service = new ImdbService();

export async function updateExternlDataFromImdbAPI(updateAll = false) {
  const movies = await movieRepository.getAll();

  const result = [];

  for (const movie of movies) {
    let externalData = null;

    // 1. try local cache (external DB)
    if (!updateAll) {
      externalData = await externalDataRepository.getDataByImdbID(
        movie.imdb_id
      );
    }

    // 2. if not found → call IMDB API
    if (!externalData) {
      try {
        // imdb api request
        const poster = await API_Service.getMoviePosterImageDataByImdbID(
          movie.imdb_id
        );

        externalData = {
          imdb_id: movie.imdb_id,
          poster_data:poster
        };
        // save to external DB (cache it)
        await externalDataRepository.upsertByImdbID(externalData);

      } catch (err) {
        externalData = {
          imdb_id: movie.imdb_id,
          poster_data: null,
          error: true
        };
      }
    }

    // 3. push in SAME ORDER as movies
    result.push({
      movie_id: movie.id,
      imdb_id: movie.imdb_id,
      ...externalData
    });
  }

  return result;
}


export async function getExternalApiDataForMovies (update=false) {
    const movies = await movieRepository.getAll();
    let external_api_data = await externalDataRepository.getAllExternalData();
    if(update || (movies.length > external_api_data.length)) {
        external_api_data= await updateExternlDataFromImdbAPI(update);
    }
    await externalDataRepository.updateExternalData(external_api_data);
    return external_api_data;
  }