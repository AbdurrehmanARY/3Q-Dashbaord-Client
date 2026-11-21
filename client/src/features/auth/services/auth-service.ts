import { api } from "@/lib/api";
import { User } from "@/store/auth-store";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>("/api/auth/login", { email, password }),
  me: () => api.get<User>("/api/auth/me"),
  refresh: (refreshToken: string) =>
    api.post<LoginResponse>("/api/auth/refresh", { refreshToken }),
};