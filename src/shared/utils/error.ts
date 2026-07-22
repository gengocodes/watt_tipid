import { AxiosError } from "axios";

export function getAxiosErrorMessage(error: unknown): string | null {
  if (!error) return null;
  const axiosError = error as AxiosError<{ detail?: string }>;
  return axiosError.response?.data?.detail || axiosError.message || null;
}
