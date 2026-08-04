import { useLayoutEffect, type ReactNode } from "react";
import { useUiStore } from "@/store/ui-store";

/**
 * The blocking script in `index.html` applies the initial theme class before first paint
 * (no FOUC). This provider then keeps `<html>` in sync with the ui-store — the single
 * source of truth for theme — so any programmatic change is reflected without each caller
 * touching the DOM. `useLayoutEffect` applies it before the browser paints the update.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useUiStore((state) => state.theme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
