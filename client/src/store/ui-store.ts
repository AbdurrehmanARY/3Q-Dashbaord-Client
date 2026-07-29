import { create } from "zustand";

type Theme = "light" | "dark";

interface UiState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: (() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  })(),
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(nextTheme);
      return { theme: nextTheme };
    }),
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem("theme", theme);
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      return { theme };
    }),
}));
