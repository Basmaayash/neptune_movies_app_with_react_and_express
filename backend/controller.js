import { MovieDTO } from './movieDTO.js';
import { DTOMapper, EntityMapper } from './mapper.js';
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
      if(isNaN(Number(limit))) throw new HttpError(400,'limit must number');
      dbMovies = dbMovies.slice(0,Number(limit));
    }
    // change the db object fields to API view keys
    let moviesDto = dbMovies.map(dbMovie => DTOMapper.fromDbToDTO(dbMovie));
    if (moviesDto.length === 0) {
      return res.status(404).json({success:true,message:"no movies found"});
    }
    return res.status(200).json({ success: true, movies: moviesDto });
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
    if (!dbMovie) return res.status(404).json({success:true,message:'no movies found'});
    const movieDto = DTOMapper.fromDbToDTO(dbMovie);
    return res.status(200).json({ success: true, movie: movieDto });
  } catch (err) {
    next(err);
  }
}

// POST create a new movie
export async function createMovie(req, res, next) {
  try {
    if (!req.body) throw new HttpError (400, 'Body data not included');
    let id = req.body.id;
    const valid_id = await Movie.idGenerator(id);
    console.log(valid_id);
    const dto = MovieDTO.create(req.body); // validate & normalize
    const entity = new Movie(DTOMapper.fromDtoToEntity(dto));
    entity.id = valid_id;
    console.log(entity)
    const dbData = EntityMapper.fromEntityToDB(entity);
    const created = await movieRepository.create(dbData);
    
    return res.status(201).json({
      success: true,
      message: 'Movie created',
      data: DTOMapper.fromDbToDTO(created)
    });
  } catch (err) {
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
    const patchData = DTOMapper.fromDtoToDB(dto); 
    const updated = await movieRepository.update(Number(id), patchData);
    if (!updated) throw new HttpError (404, 'Movie not found');
    return res.status(200).json({
      success: true,
      message: `Movie ${id} updated`,
      data: DTOMapper.fromDbToDTO(updated)
    });
  } catch (err) {
    if (!err.code) err.code = 400;
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
    
    return res.status(200).json({
      success: true,
      message: `Movie ${id} deleted`,
      data: DTOMapper.fromDbToDTO(deleted)
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