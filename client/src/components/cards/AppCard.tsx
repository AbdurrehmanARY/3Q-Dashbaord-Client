import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AppCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
  /** Override the content padding — e.g. `p-0` when the body is a full-bleed table. */
  contentClassName?: string;
  children: React.ReactNode;
}

export const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, title, description, footer, headerActions, contentClassName, children, ...props }, ref) => {
    const hasHeader = title || description || headerActions;
    const isFullBleed = contentClassName?.includes("p-0");

    return (
      <Card ref={ref} className={cn("overflow-hidden border border-border/60 shadow-sm", className)} {...props}>
        {hasHeader && (
          <CardHeader className={cn(
            "flex flex-row items-center justify-between space-y-0 px-5 py-4",
            !isFullBleed && "border-b border-border/50"
          )}>
            <div className="space-y-0.5">
              {title && <CardTitle className="text-base font-semibold tracking-tight">{title}</CardTitle>}
              {description && <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>}
            </div>
            {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
          </CardHeader>
        )}
        <CardContent className={cn(hasHeader ? (isFullBleed ? "p-0" : "p-5 pt-4") : "p-5", contentClassName)}>
          {children}
        </CardContent>
        {footer && <CardFooter className="border-t border-border/50 bg-muted/20 px-5 py-3">{footer}</CardFooter>}
      </Card>
    );
  }
);

AppCard.displayName = "AppCard";
