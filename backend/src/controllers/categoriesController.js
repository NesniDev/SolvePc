import { CategoriesModel } from '../models/categoriesModel.js';

export class CategoriesController {
  static async getAllCategories(req, res) {
    const categories = await CategoriesModel.getAllCategories()
    res.status(200).json(categories)
  }

  static async getCategoryById(req, res) {
    const { slug } = req.params
    const category = await CategoriesModel.getCategoryById(slug)
    res.status(200).json(category)
  }
}