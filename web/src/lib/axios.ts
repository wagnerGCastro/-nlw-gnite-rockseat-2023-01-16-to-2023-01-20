import axios from "axios";

console.log("VITE_BASE_URL_API", import.meta.env.VITE_BASE_URL_API);

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API || "http://localhost:3333",
});
