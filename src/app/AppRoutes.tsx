import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/shared/layouts/AppLayout";
import { routes, redirects } from "./routes";

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
      <Route element={<AppLayout />}>
        {routes.map(({ path, component: Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageFallback />}>
                <Page />
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
