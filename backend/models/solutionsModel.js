import data from '../solutions.json' with { type: 'json' }

export class SolutionsModel {

  static async getAllSolutions(req) {

    const { query, category, so, limit = 10, offset = 0 } = req.query;

    const difficulty =
      req.query.difficulty || req.query["difficulty[]"];

    let filteredSolutions = data;

    if (query) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (category) {
      filteredSolutions = filteredSolutions.filter((solution) => solution.category.toLocaleLowerCase() === category.toLocaleLowerCase());
    }

    if (difficulty) {

      const difficulties = Array.isArray(difficulty)
        ? difficulty
        : typeof difficulty === "string" && difficulty.includes(",")
          ? difficulty.split(",")
          : difficulty
            ? [difficulty]
            : [];

      filteredSolutions = filteredSolutions.filter((s) =>
        difficulty.includes(String(s.difficulty).trim().toLowerCase())
      );
    }
    if (so) {
      const systemOperating = Array.isArray(so) ? so : typeof so === "string" && so.includes(",") ? so.split(",") : so ? [so] : [];
      filteredSolutions = filteredSolutions.filter((solution) => systemOperating.includes(String(solution.so).trim().toLowerCase()));
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const paginateTournaments = filteredSolutions.slice(offsetNumber, offsetNumber + limitNumber);
    console.log("RESULTADO FINAL:", filteredSolutions.length);
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
