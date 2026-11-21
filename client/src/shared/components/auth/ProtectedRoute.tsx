import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

/**
 * ProtectedRoute — wraps routes that require authentication.
 * - While session is being restored from localStorage (isHydrated/isLoading), renders null.
 * - If not authenticated after hydration, redirects to /login with the original location in state.
 * - Otherwise renders children.
 *
 * Session restoration is handled by AppProviders on mount; this component only
 * gates on the resulting auth state to avoid duplicate fetchMe() calls.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
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

    // Guard: don't redirect if already on login page (prevents infinite loop)
    if (location.pathname === "/login" || location.pathname === "/auth/login") return;

    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, isHydrated, isLoading, navigate, location.pathname]);

  // Wait for hydration from localStorage before deciding
  if (!isHydrated || isLoading) return null;

  // Return null while navigation is pending
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

/**
 * RoleProtectedRoute — wraps routes that require specific roles.
 * - Requires authentication (same as ProtectedRoute)
 * - Additionally checks if user's role is in allowedRoles
 * - If not authorized, redirects to / (dashboard overview)
 */
export function RoleProtectedRoute({
  children,
  allowedRoles,
}: { children: React.ReactNode; allowedRoles: string[] }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigate in useEffect to avoid render-time navigation (infinite loop)
  // Hook MUST be called unconditionally to satisfy Rules of Hooks
  useEffect(() => {
    // Wait for hydration from localStorage before deciding
    if (!isHydrated || isLoading) return;

    // Guard: don't redirect if already on login page (prevents infinite loop)
    if (location.pathname === "/login" || location.pathname === "/auth/login") return;

    if (!isAuthenticated) {
      navigate("/auth/login", { replace: true, state: { from: location } });
    } else if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Guard: don't redirect if already on home page
      if (location.pathname === "/") return;
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isHydrated, isLoading, user, allowedRoles, navigate, location.pathname]);

  // Wait for hydration from localStorage before deciding
  if (!isHydrated || isLoading) return null;

  // Return null while navigation is pending
  if (!isAuthenticated) return null;
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}