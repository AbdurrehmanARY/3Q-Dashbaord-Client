import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth-store";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// In dev, `/api` is proxied to the local server by Vite (see vite.config.ts). In production
// the client and API are on separate origins (two Vercel projects), so point at the deployed
// backend via VITE_API_URL, e.g. "https://your-server.vercel.app/api".
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function onTokenRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

// Request interceptor — attach Authorization header from auth store
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 by attempting token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { refreshAccessToken } = useAuthStore.getState();
          await refreshAccessToken();
          const { accessToken } = useAuthStore.getState();
          isRefreshing = false;
          onTokenRefreshed(accessToken);
        } catch (refreshError) {
          isRefreshing = false;
          onTokenRefreshed(null);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest._retry = true;
            resolve(axiosInstance(originalRequest));
          } else {
            resolve(Promise.reject(error));
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: unknown,
  params?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    let message = "Something went wrong";
    let status = 500;

    if (axios.isAxiosError(error)) {
      status = error.response?.status ?? 500;
      message = error.response?.data?.message ?? error.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    throw new ApiError(message, status);
  }
}

export const api = {
  get: <T>(path: string, query?: Record<string, unknown>) =>
    request<T>("GET", path, undefined, query),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};

export interface Paginated<T> {
  data: T[];
}
