import { env } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
