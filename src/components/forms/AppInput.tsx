import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, error, icon, id, type = "text", ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="grid w-full gap-1.5">
        {label && (
          <Label htmlFor={inputId} className={cn("text-xs font-semibold", error && "text-destructive")}>
            {label}
          </Label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              icon && "pl-9",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[11px] font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
