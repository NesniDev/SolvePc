import data from '../solutions.json' with { type: 'json' }

export class SolutionsModel {

  static async getAllSolutions(req, res) {

    const { query, category, difficulty, so, limit = 10, offset = 0 } = req.query;

    let filteredSolutions = data;

    if (query) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (category) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.category.toLocaleLowerCase() === category.toLocaleLowerCase());
    }
    if (difficulty) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.difficulty.toLocaleLowerCase() === difficulty.toLocaleLowerCase());
    }
    if (so) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.so.toLocaleLowerCase() === so.toLocaleLowerCase());
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const paginateTournaments = filteredSolutions.slice(offsetNumber, offsetNumber + limitNumber);

    return {
      count: filteredSolutions.length,
      data: paginateTournaments,
    };

  }

  static getSolutionById(slug) {

    const filteredSolutionsById = data.filter((solution) => {
      return solution.slug === slug
    }
    );
    console.log(filteredSolutionsById)

    return filteredSolutionsById;


  }
}
