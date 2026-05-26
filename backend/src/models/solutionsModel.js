import data from '../data-mockup/solutions.json' with { type: 'json' }

export class SolutionsModel {
  static async getAllSolutions() {
    try {
      const soluciones = await prisma.Solution.findMany({
        include: {
          explain: {
            include: {
              commonErrors: true // Trae los errores comunes anidados dentro de explain
            }
          }
        }
      })

      return soluciones
    } catch (error) {
      throw new Error('Error al obtener las soluciones')
    }
  }

  static async getAllSolutionsWithFilters(req) {
    const { query, category, so, page, limit, offset } = req.query

    const difficulty = req.query.difficulty || req.query['difficulty[]']

    let filteredSolutions = data

    if (query) {
      filteredSolutions = filteredSolutions.filter((solution) =>
        solution.title.toLowerCase().includes(query.toLowerCase())
      )
    }
    if (category) {
      filteredSolutions = filteredSolutions.filter(
        (solution) =>
          solution.category.toLocaleLowerCase() === category.toLocaleLowerCase()
      )
    }

    if (difficulty) {
      const difficulties = Array.isArray(difficulty)
        ? difficulty
        : typeof difficulty === 'string' && difficulty.includes(',')
          ? difficulty.split(',')
          : difficulty
            ? [difficulty]
            : []

      filteredSolutions = filteredSolutions.filter((s) =>
        difficulty.includes(String(s.difficulty).trim().toLowerCase())
      )
    }
    if (so) {
      const systemOperating = Array.isArray(so)
        ? so
        : typeof so === 'string' && so.includes(',')
          ? so.split(',')
          : so
            ? [so]
            : []
      filteredSolutions = filteredSolutions.filter((solution) =>
        systemOperating.includes(String(solution.so).trim().toLowerCase())
      )
    }

    const limitNumber = Number(limit) || 8
    const pageNumber = Number(page) || 1

    const offsetNumber = (pageNumber - 1) * limitNumber

    const paginateSolutions = filteredSolutions.slice(
      offsetNumber,
      offsetNumber + limitNumber
    )
    return {
      page: pageNumber,
      limit: limitNumber,
      offset: offsetNumber,
      count: filteredSolutions.length,
      totalPages: Math.ceil(filteredSolutions.length / limitNumber),
      data: paginateSolutions
    }
  }

  static getSolutionById(slug) {
    const solution = data.find((solution) => solution.slug === slug)

    if (!solution) return null

    return solution
  }

  static getSolutionsByCategory(category) {
    const solutions = data.filter((solution) => solution.category === category)
    return solutions
  }

  static postSolution(solution) {
    data.push(solution)
  }
}
