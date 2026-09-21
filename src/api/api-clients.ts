import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/auth-store";
import { ApiError } from "../models/api-error";
import type { ProblemDetails } from "../models/problem-details";
import router from "../router";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7001/api",
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError<ProblemDetails>) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const isRefreshRequest =
        originalRequest.url?.endsWith("/refresh-token");

      // Do not try to refresh the refresh-token request.
      if (isRefreshRequest) {
        const authStore = useAuthStore();

        authStore.logout();

        if (router.currentRoute.value.path !== "/") {
          await router.push("/");
        }

        return Promise.reject(error);
      }

      // Do not retry the same request more than once.
      if (!(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true;

        try {
          const authStore = useAuthStore();

          await authStore.refreshAccessToken();

          return apiClient(originalRequest);
        } catch (refreshError) {
          const authStore = useAuthStore();

          authStore.logout();

          if (router.currentRoute.value.path !== "/") {
            await router.push("/");
          }

          return Promise.reject(refreshError);
        }
      }

      // Original request was already retried and still returned 401.
      const authStore = useAuthStore();

      authStore.logout();

      if (router.currentRoute.value.path !== "/") {
        await router.push("/");
      }

      return Promise.reject(error);
    }

    if (error.response?.data) {
      return Promise.reject(
        new ApiError(error.response.data)
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;