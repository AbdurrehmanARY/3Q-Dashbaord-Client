import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { LayoutProvider } from './providers/LayoutProvider';
import { useAuthStore } from '@/store/auth-store';

/**
 * Every cross-cutting provider, composed in one place and in dependency order:
 * data cache -> auth -> routing -> theme -> layout context.
 *
 * AuthProvider waits for Zustand persist to rehydrate from localStorage,
 * then validates the stored access token via fetchMe().
 */
export function AppProviders({ children }: { children: ReactNode }) {
  // Use selector to get stable references - prevents infinite loop in useEffect
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // Restore session on app mount — wait for localStorage rehydration first
  // fetchMe() handles both cases: validates token if present, or sets isLoading=false if absent
  useEffect(() => {
    if (!isHydrated) return;
    fetchMe();
  }, [fetchMe, isHydrated]);

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
