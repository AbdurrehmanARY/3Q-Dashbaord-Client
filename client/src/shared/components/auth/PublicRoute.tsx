import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

/**
 * PublicRoute — wraps routes that should only be visible to unauthenticated users (e.g. /login).
 * - While session is being restored from localStorage (isHydrated/isLoading), renders null.
 * - If authenticated after hydration, redirects to /.
 * - Otherwise renders children (e.g. login form).
 */
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigate in useEffect to avoid render-time navigation (infinite loop)
  // Hook MUST be called unconditionally to satisfy Rules of Hooks
  useEffect(() => {
    // Wait for hydration from localStorage before deciding
    if (!isHydrated || isLoading) return;

    // Guard: don't redirect if already on home page (prevents infinite loop)
    if (location.pathname === "/") return;

    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isHydrated, isLoading, navigate]);

  // Wait for hydration from localStorage before deciding
  if (!isHydrated || isLoading) return null;

  // Return null while navigation is pending
  if (isAuthenticated) return null;

  return <>{children}</>;
}