import type { Column } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PinOffIcon,
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

/**
 * Sortable header with an asc/desc/hide menu. Columns that opt out of sorting and hiding
 * render as plain text, so this is safe to use for every header uniformly.
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const align = column.columnDef.meta?.align;
  const canPin = column.getCanPin();

  if (!column.getCanSort() && !column.getCanHide() && !canPin) {
    return (
      <div className={cn("text-xs font-semibold uppercase tracking-wider", align === "right" && "text-right", className)}>
        {title}
      </div>
    );
  }

  const sorted = column.getIsSorted();
  const pinned = column.getIsPinned();

  return (
    <div className={cn("flex items-center", align === "right" && "justify-end", className)}>
      <DropdownMenu>
        {/* `buttonVariants` as a className rather than `render={<Button/>}`: the
            registry Button is a plain function component, and this project is on React
            18, where a function component cannot receive the ref the trigger passes. */}
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-8 px-2 text-xs font-semibold uppercase tracking-wider",
            align === "right" ? "-mr-2" : "-ml-2"
          )}
        >
          <span>{title}</span>
          {sorted === "desc" ? (
            <ArrowDownIcon className="ml-1.5 size-3.5" />
          ) : sorted === "asc" ? (
            <ArrowUpIcon className="ml-1.5 size-3.5" />
          ) : (
            <ChevronsUpDownIcon className="ml-1.5 size-3.5 opacity-50" />
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon className="text-muted-foreground" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon className="text-muted-foreground" />
                Desc
              </DropdownMenuItem>
            </>
          )}
          {canPin && (
            <>
              {column.getCanSort() && <DropdownMenuSeparator />}
              {pinned !== "left" && (
                <DropdownMenuItem onClick={() => column.pin("left")}>
                  <ArrowLeftToLineIcon className="text-muted-foreground" />
                  Pin left
                </DropdownMenuItem>
              )}
              {pinned !== "right" && (
                <DropdownMenuItem onClick={() => column.pin("right")}>
                  <ArrowRightToLineIcon className="text-muted-foreground" />
                  Pin right
                </DropdownMenuItem>
              )}
              {pinned && (
                <DropdownMenuItem onClick={() => column.pin(false)}>
                  <PinOffIcon className="text-muted-foreground" />
                  Unpin
                </DropdownMenuItem>
              )}
            </>
          )}
          {column.getCanHide() && (column.getCanSort() || canPin) && <DropdownMenuSeparator />}
          {column.getCanHide() && (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOffIcon className="text-muted-foreground" />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
