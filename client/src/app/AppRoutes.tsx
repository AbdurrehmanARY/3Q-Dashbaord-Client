import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/shared/layouts/AppLayout";
import { ProtectedRoute, PublicRoute, RoleProtectedRoute } from "@/shared/components/auth";
import { routes, redirects } from "./routes";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

function PageFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

/** Renders the route table from `routes.tsx`; every page is code-split behind Suspense. */
export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes — no auth required */}
      <Route path="/auth/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/auth/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Protected routes — auth required, wrapped in AppLayout */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        {routes.map(({ path, component: Page, roles }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageFallback />}>
                {roles && roles.length > 0 ? (
                  <RoleProtectedRoute allowedRoles={roles}>
                    <Page />
                  </RoleProtectedRoute>
                ) : (
                  <Page />
                )}
              </Suspense>
            }
          />
        ))}

        {redirects.map(({ path, to }) => (
          <Route key={path} path={path} element={<Navigate to={to} replace />} />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
