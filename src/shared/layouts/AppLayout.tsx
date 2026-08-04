import { Outlet, useLocation } from "react-router-dom";
import { SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/shared/components/header/AppHeader";
import { AppSidebar } from "@/shared/components/sidebar/AppSidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { ErrorBoundary } from "@/shared/components/error-boundary/ErrorBoundary";

/* ============================================================
   AppLayout — Root application shell.
   Wraps the entire app in TooltipProvider (required for sidebar
   icon-mode tooltips) and the shadcn SidebarProvider.
   ============================================================ */

/**
 * `SidebarProvider` only reads `defaultOpen` once, on mount — official shadcn examples
 * source that from an SSR-read cookie. This app is CSR-only, so there's no server pass to
 * read it during; reading `document.cookie` here before the provider mounts is the client
 * equivalent, and it's what makes the collapsed/expanded state actually survive a reload
 * instead of resetting to expanded every time.
 */
function getInitialSidebarOpen() {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${SIDEBAR_COOKIE_NAME}=(true|false)`));
  return match ? match[1] === "true" : true;
}

export function AppLayout() {
  // Keying the boundary on the path means an error thrown by one page is cleared the moment
  // the user navigates away, instead of the fallback sticking around across routes.
  const { pathname } = useLocation();

  return (
    <TooltipProvider delay={0}>
      <SidebarProvider defaultOpen={getInitialSidebarOpen()}>
        <AppSidebar className="border-r border-sidebar-border" />
        {/* `min-w-0` is load-bearing here (and on PageContainer): without it this flex item
            defaults to `min-width:auto` and grows to fit its widest descendant (e.g. the
            many-column production progress table), pushing the whole page past the viewport
            instead of letting that table scroll inside its own `overflow-x-auto`. */}
        <SidebarInset className="flex min-h-svh min-w-0 flex-col">
          <AppHeader />
          {/* A <div>, not a nested <main> — SidebarInset already renders the page's <main>.
              All page margin/padding/max-width lives in PageContainer, in one place. */}
          <div className="min-w-0 flex-1 overflow-y-auto bg-background">
            <PageContainer>
              <ErrorBoundary key={pathname}>
                <Outlet />
              </ErrorBoundary>
            </PageContainer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
