import axios from "axios";
import { ENV } from "../config/env";
import { setupInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply request and response interceptors
setupInterceptors(apiClient);
