import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, children, loading, disabled, leftIcon, rightIcon, variant, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        className={cn("gap-1.5 font-medium transition-all", className)}
        {...props}
      >
        {loading && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && <span className="flex shrink-0 items-center justify-center">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="flex shrink-0 items-center justify-center">{rightIcon}</span>}
      </Button>
    );
  }
);

AppButton.displayName = "AppButton";
