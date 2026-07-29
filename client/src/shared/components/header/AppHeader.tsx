import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppBreadcrumb } from "@/shared/components/breadcrumb/AppBreadcrumb";
import { ThemeToggle } from "@/shared/components/theme-toggle/ThemeToggle";
import {
  CommandPalette,
  CommandPaletteTrigger,
} from "@/shared/components/command-palette/CommandPalette";

/* ============================================================
   AppHeader — Top navigation bar.
   Contains: sidebar trigger, breadcrumb, ⌘K palette, theme, user.
   ============================================================ */

export function AppHeader() {
  const [cmdOpen, setCmdOpen] = useState(false);

  /* ⌘K keyboard shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
        {/* ── Left: Trigger + Breadcrumb ── */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5 opacity-50" />
          <AppBreadcrumb />
        </div>

        {/* ── Right: Search + Theme + User ── */}
        <div className="flex items-center gap-2">
          <CommandPaletteTrigger onClick={() => setCmdOpen(true)} />
          <ThemeToggle />
        </div>
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}