import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string, user: User) => void;
  register: (credentials: RegisterCredentials) => Promise<void>;
  fetchMe: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: string;
}

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const response = await axios.post("/api/auth/login", credentials);
          // Server wraps response in { data: { user, accessToken, refreshToken } }
          const { accessToken, refreshToken, user } = response.data.data;
          set({
            accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false, isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          const response = await axios.post("/api/auth/register", credentials);
          // Server wraps response in { data: { user, accessToken, refreshToken } }
          const { accessToken, refreshToken, user } = response.data.data;
          set({
            accessToken,
            refreshToken,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false, isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setTokens: (accessToken: string, refreshToken: string, user: User) => {
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      fetchMe: async () => {
        const { accessToken } = get();
        if (!accessToken) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }
        try {
          const response = await axios.get("/api/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          // Server wraps response in { data: user }
          set({ user: response.data.data, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          // Token invalid/expired — clear session
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          set({ isAuthenticated: false, accessToken: null, user: null });
          return;
        }
        try {
          const response = await axios.post("/api/auth/refresh", { refreshToken });
          const { accessToken, refreshToken: newRefreshToken, user } = response.data.data;
          set({ accessToken, refreshToken: newRefreshToken, user, isAuthenticated: true });
        } catch (error: any) {
          set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null });
        }
      },

      setHydrated: (hydrated: boolean) => {
        set({ isHydrated: hydrated });
        // If no stored token, we're done loading - no fetchMe needed
        if (hydrated && !get().accessToken) {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);