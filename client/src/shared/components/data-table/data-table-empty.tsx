import { InboxIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface DataTableEmptyProps {
  title?: string;
  description?: string;
  /** Any icon; defaults to an inbox. */
  icon?: React.ReactNode;
  /** Call to action — "Create the first one", "Clear filters", etc. */
  children?: React.ReactNode;
}

/**
 * Shown when the table resolves to zero rows. Copy is entirely caller-supplied — the
 * defaults are deliberately generic so no feature wording leaks into shared code.
 */
export function DataTableEmpty({
  title = "No results",
  description = "Nothing matches the current view.",
  icon,
  children,
}: DataTableEmptyProps) {
  return (
    <Empty className="border-0 py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon ?? <InboxIcon />}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children}
    </Empty>
  );
}
