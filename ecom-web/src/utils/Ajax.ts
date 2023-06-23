import axios from "axios";

export const Ajax = axios.create({
  baseURL: import.meta.env.VITE_API, // 'http://localhost:8080'
  headers: { "Content-Type": "application/json" },
});
