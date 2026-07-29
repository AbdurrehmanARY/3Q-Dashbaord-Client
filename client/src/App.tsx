import { ErrorBoundary } from "@/shared/components/error-boundary/ErrorBoundary";
import { AppProviders } from "@/app/AppProviders";
import { AppRoutes } from "@/app/AppRoutes";
import { ToastProvider } from "@/app/providers/ToastProvider";

/** Composition only — providers live in `app/AppProviders`, the route table in `app/routes`. */
export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
        <ToastProvider />
      </AppProviders>
    </ErrorBoundary>
  );
}
