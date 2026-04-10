import { Router } from 'express';
import {getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie} from './controller.js';

const MovieRouter = Router();

MovieRouter.get('/',getAllMovies);

MovieRouter.get('/:id',getMovieById);

MovieRouter.post('/',createMovie);

MovieRouter.patch('/:id',updateMovie);

MovieRouter.delete('/:id',deleteMovie);

export default MovieRouter;