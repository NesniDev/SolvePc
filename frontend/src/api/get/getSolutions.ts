import type { Solutions } from "src/interfaces/Solutions";
import { getSolutions } from "../solutions";

export const prerender = false

export const getAllSolutions = async (
  query: string = '',
  category: string = '',
  difficulty: string[] = [],
  so: string[] = [],
  page: number = 1,
  limit: number = 8,
  offset: number = 0,
  totalPages: number = 0
) => {
  const response = await getSolutions.get<Solutions[]>("/solutions", {
    params: {
      query,
      category: category.toLowerCase(),
      difficulty: difficulty.join(','),
      so: so.join(','),
      page,
      limit,
      offset,
      totalPages,
    }
  });
  console.log("difficulty enviado:", difficulty);

  if (response.status !== 200) {
    throw new Error("Error en la API")
  }

  return response.data;
}