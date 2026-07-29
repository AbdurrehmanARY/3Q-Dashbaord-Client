import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

// The base-nova registry targets React 19's ref-as-prop convention, where a plain
// function component can receive `ref` directly. This app is React 18, which silently
// drops a `ref` passed to a non-forwardRef function component — so without this wrapper,
// any RHF `register()`-bound field rendered through this component never gets a working
// ref. RHF's uncontrolled field tracking depends on that ref to register the field at all;
// without it, the field gets unregistered and submits as `undefined` regardless of what's
// typed into it. Wrapping in `forwardRef` is the React 18-compatible equivalent.
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
