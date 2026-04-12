import { Router } from 'express';
import  MovController from './controller.js';

const MovieRouter = Router();

MovieRouter.get('/',MovController.getAllMovies);

MovieRouter.get('/:id',MovController.getMovieById);

MovieRouter.post('/',MovController.createMovie);

MovieRouter.patch('/:id',MovController.updateMovie);

MovieRouter.delete('/:id',MovController.deleteMovie);

export default MovieRouter;