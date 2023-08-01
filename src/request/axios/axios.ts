import axios from "axios";

export const nextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST + "/api",
  headers: { "Content-Type": "application/json" },
});
