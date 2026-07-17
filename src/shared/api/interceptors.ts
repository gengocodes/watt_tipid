import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

let refreshPromise: Promise<void> | null = null;
let isRedirecting = false;

const refreshAccessToken = async (instance: AxiosInstance): Promise<void> => {
  refreshPromise ??= instance
    .post("/auth/refresh")
    .then(() => {})
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

/**
 * Configures response interceptors for automatic authentication handling.
 *
 * When an access token expires (401 response), this interceptor:
 * 1. Refreshes the access token using the refresh cookie.
 * 2. Retries the original request once.
 * 3. Redirects the user to the login page if the refresh fails.
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (!originalRequest) {
        throw error;
      }

      const status = error.response?.status;
      const url = originalRequest.url ?? "";

      // Authentication endpoints should never trigger a refresh,
      // otherwise a failed refresh could result in an infinite loop.
      const isAuthEndpoint =
        url.includes("/auth/login") ||
        url.includes("/auth/register") ||
        url.includes("/auth/refresh");

      if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;

        try {
          // Wait for the current refresh operation (or start one if none exists).
          await refreshAccessToken(instance);

          // Retry the original request using the refreshed authentication cookies.
          return instance(originalRequest);
        } catch (refreshError) {
          // If the refresh token is no longer valid, redirect the user
          // to the login page so they can authenticate again.
          if (
            typeof window !== "undefined" &&
            !isRedirecting &&
            window.location.pathname !== "/login"
          ) {
            isRedirecting = true;
            window.location.replace("/login");
          }

          throw refreshError;
        }
      }

      throw error;
    },
  );
};
