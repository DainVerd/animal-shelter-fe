import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../stores/auth-store'; 

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:7001/api', 
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
  async (error: AxiosError) => {
    const originalRequest = error.config;
    

    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;
      
      try {
        const authStore = useAuthStore();
        await authStore.refreshToken(); 
        
 
        return apiClient(originalRequest);
      } catch (refreshError) {

        useAuthStore().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;