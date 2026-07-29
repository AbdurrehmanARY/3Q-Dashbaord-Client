import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { LayoutProvider } from "./providers/LayoutProvider";

/**
 * Every cross-cutting provider, composed in one place and in dependency order:
 * data cache -> routing -> theme -> layout context.
 *
 * An AuthProvider slots in between QueryProvider and BrowserRouter when authentication
 * arrives — it needs the query cache, and the router needs to be able to redirect on it.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryProvider>
  );
}
