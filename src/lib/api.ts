import axios from "axios";

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
