

import type { Solutions } from "src/interfaces/Solutions";
import { getSolutions } from "../solutions";



export const getAllSolutions = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000)) // simulación

  const response = await getSolutions.get< Solutions[]>("/solutions");
  
  if (response.status !== 200) {
    throw new Error("Error en la API")
  }

  return response.data;


}