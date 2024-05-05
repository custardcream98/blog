import { config } from "src/lib/config"

import axios from "axios"

export const nextApi = axios.create({
  baseURL: config.DEPLOYMENT_URL + "/api",
  headers: { "Content-Type": "application/json" },
})
