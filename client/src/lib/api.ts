import axios from "axios";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const axiosInstance = axios.create({
  baseURL: "/api",
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
