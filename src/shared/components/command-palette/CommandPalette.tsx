import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Factory, Building2, Boxes,
  ShoppingCart, Package, Cpu, Truck, BarChart3,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navigation } from "@/shared/navigation";

/* ============================================================
   CommandPalette — Global ⌘K navigation command palette.
   Built on shadcn Command (cmdk).
   ============================================================ */

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* Flatten nested navigation into commands */
const COMMANDS = navigation.flatMap((item) =>
  item.items
    ? item.items.filter((s) => s.url && !s.url.includes(":")).map((sub) => ({
        title: sub.title,
        url: sub.url!,
        parent: item.title,
        icon: item.icon,
      }))
    : item.url && !item.url.includes(":")
    ? [{ title: item.title, url: item.url, parent: "", icon: item.icon }]
    : []
);

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  const runCommand = useCallback(
    (url: string) => {
      onOpenChange(false);
      navigate(url);
    },
    [navigate, onOpenChange]
  );

  /* Group commands by parent */
  const topLevel  = COMMANDS.filter((c) => !c.parent);
  const grouped   = COMMANDS.filter((c) => c.parent);
  const groupKeys = [...new Set(grouped.map((c) => c.parent))];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages and actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {topLevel.length > 0 && (
          <CommandGroup heading="Pages">
            {topLevel.map((cmd) => (
              <CommandItem
                key={cmd.url}
                value={cmd.title}
                onSelect={() => runCommand(cmd.url)}
                className="gap-2"
              >
                {cmd.icon && <cmd.icon className="h-4 w-4 text-muted-foreground" />}
                {cmd.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {groupKeys.map((group) => (
          <CommandGroup key={group} heading={group}>
            {grouped
              .filter((c) => c.parent === group)
              .map((cmd) => (
                <CommandItem
                  key={cmd.url}
                  value={`${group} ${cmd.title}`}
                  onSelect={() => runCommand(cmd.url)}
                  className="gap-2"
                >
                  {cmd.icon && (
                    <cmd.icon className="h-4 w-4 text-muted-foreground" />
                  )}
                  {cmd.title}
                </CommandItem>
              ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

/* ── Trigger Button ── exposed for AppHeader */
interface CommandPaletteTriggerProps {
  onClick: () => void;
}

export function CommandPaletteTrigger({ onClick }: CommandPaletteTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden md:flex h-9 items-center gap-2 rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Open command palette"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="w-36 text-left">Search...</span>
      <kbd className="hidden select-none items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:flex">
        <span className="text-[10px]">⌘</span>K
      </kbd>
    </button>
  );
}
