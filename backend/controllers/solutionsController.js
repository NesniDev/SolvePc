
import { SolutionsModel } from '../models/solutionsModel.js';

export class SolutionsController {

  static async getAllSolutions(req, res) {
    const solutions = await SolutionsModel.getAllSolutions()
    res.status(200).json(solutions)
  }

  static async getAllSolutionsWithFilters(req, res) {

    try {

      const response = await SolutionsModel.getAllSolutionsWithFilters(req);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  static async getSolutionById(req, res) {

    try {
      const { slug } = req.params;

      console.log(slug)

      const response = await SolutionsModel.getSolutionById(slug);
      if (response.length === 0) {

        return res.status(404).json({
          message: "No encontrado"
        });

      }
      res.status(200).json(response);
    }
    catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }

  }

  static async getSolutionsByCategory(req, res) {
    try {
      const { slug } = req.params;

      if (!slug) {
        return res.status(400).json({
          message: "Category slug is required"
        });
      }

      const response = await SolutionsModel.getSolutionsByCategory(slug);

      return res.status(200).json({
        category: slug,
        count: response.length,
        data: response
      });

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
}