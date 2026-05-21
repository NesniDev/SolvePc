
import { Router } from 'express'
import { CategoriesController } from '../controllers/categoriesController.js'

export const routerCategory = Router()

routerCategory.get('/categories', CategoriesController.getAllCategories)
routerCategory.get('/categories/:slug', CategoriesController.getCategoryById)