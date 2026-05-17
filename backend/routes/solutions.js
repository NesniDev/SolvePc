import { Router } from 'express';
import { SolutionsController } from '../controllers/solutionsController.js';



export const router_solutions = Router();

router_solutions.get('/solutions', SolutionsController.getAllSolutions);

router_solutions.get('/solutions/:slug', SolutionsController.getSolutionById);

