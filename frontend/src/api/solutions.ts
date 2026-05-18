import axios from "axios";

export const getSolutions = axios.create({
  baseURL: `${import.meta.env.PUBLIC_API_URL}/api`,
})