import { MovieDTO } from './movieDTO.js';
import { MovieMapper } from './mapper.js';
import { Movie } from './movie.js';
import { movieRepository } from './repository.js';

//custom http error
class HttpError extends Error {
  constructor (code,message) {
    super(message);
    this.code=code;
  }
}

// GET all movies
export async function getAllMovies(req, res, next) {
  try {
    const { search, limit } = req.query;
    let dbMovies = await movieRepository.getAll();
    //filter data based on the search 
    if(search) {
      const searchLower = search.toLowerCase();
      dbMovies = dbMovies.filter (movie => {
        return movie.title && movie.title.toLowerCase().includes(searchLower);
      })
    }
    // reduce the results return
    if (limit) {
      if(Number(limit) === NaN) throw new HttpError(303,'limit must number');
      dbMovies = dbMovies.slice(0,Number(limit));
    }
    // change the db object fields to API view keys
    const moviesDto = dbMovies.map(dbMovie => MovieMapper.mapDbToObject(dbMovie, true));
    res.status(200).json({ success: true, movies: moviesDto });
  } catch (err) {
    next(err);
  }
}

// GET movie by ID
export async function getMovieById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!id) throw new HttpError(400, 'ID is required');
    const dbMovie = await movieRepository.getById(Number(id));
    if (!dbMovie) throw new HttpError(404,'Movie not found');
    const movieDto = MovieMapper.mapDbToObject(dbMovie, true);
    res.status(200).json({ success: true, movie: movieDto });
  } catch (err) {
    next(err);
  }
}

// POST create a new movie
export async function createMovie(req, res, next) {
  try {
    if (!req.body) throw new HttpError (400, 'Body data not included');
    const dto = MovieDTO.create(req.body); // validate & normalize
    const movieEntity = new Movie(MovieMapper.mapDtoToObject(dto));
    movieEntity.id = await movieRepository.getNextId();
    const dbData = MovieMapper.mapDtoToObject(dto, true); // map Entity -> DB
    dbData.id = movieEntity.id;
    const created = await movieRepository.create(dbData);
    res.status(201).json({
      success: true,
      message: 'Movie created',
      data: MovieMapper.mapDbToObject(created, true) // DB -> DTO
    });
  } catch (err) {
    err.code = 400;
    next(err);
  }
}

// PATCH update movie by ID
export async function updateMovie(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) throw new HttpError (400, 'ID is required');
    if (!req.body) throw new HttpError (400, 'Body data not included');
    const dto = MovieDTO.create(req.body, true); // true => update mode
    const patchData = MovieMapper.mapDtoToObject(dto, true); // map only provided fields DTO -> DB
    const updated = await movieRepository.update(Number(id), patchData);
    if (!updated) throw new HttpError (404, 'Movie not found');

    res.status(200).json({
      success: true,
      message: `Movie ${id} updated`,
      data: MovieMapper.mapDbToObject(updated, true)
    });
  } catch (err) {
    next(err);
  }
}

// DELETE movie by ID
export async function deleteMovie(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) throw new HttpError (400, 'ID is required');
    const deleted = await movieRepository.delete(Number(id));
    if (!deleted) throw new HttpError (404, 'Movie not found');
    
    res.status(200).json({
      success: true,
      message: `Movie ${id} deleted`,
      data: MovieMapper.mapDbToObject(deleted, true)
    })
  } catch (err) {
    next(err);
  }
}

export default {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};