
import { SolutionsModel } from '../models/solutionsModel.js';

export class SolutionsController {
  static async getAllSolutions(req, res) {

    try {

      const response = await SolutionsModel.getAllSolutions(req);
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

}