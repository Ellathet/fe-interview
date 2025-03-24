import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { SecurityService } from "./clients/security.service";
import { ChartService } from "./clients/chart.service";
import { useAuth } from "../../hooks/useAuth";

export class ApiService {
  public api: AxiosInstance;

  private API_URL = import.meta.env.VITE_API_URL;

  constructor(logout?: () => Promise<void>) {
    const api = axios.create({
      baseURL: this.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    api.interceptors.request.use(
      (config) => {
        const security = new SecurityService(api);
        const token = security.getToken();

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const security = new SecurityService(api);
        const originalRequest = error.config;
        console.log("JOIN IN HERE IN STATUS", error.response?.status)
        console.log("originalRequest._retry", originalRequest._retry)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = security.getRefreshToken();
            if (!refreshToken) {
              console.log("JOIN IN HERE")
              throw new Error("No refresh token available");
            }

            const { data } = await security.validateToken(refreshToken);
            security.setToken(data.access_token);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.access_token}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            if (logout) await logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    this.security = new SecurityService(api);
    this.chart = new ChartService(api);

    this.api = api;
  }

  readonly security;
  readonly chart;
}

export const useApi = () => {
  const { logout } = useAuth();

  return useMemo(() => new ApiService(logout), [logout]);
};
