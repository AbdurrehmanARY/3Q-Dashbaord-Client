import { Toaster } from "@/components/ui/sonner";

/** Global toast outlet. Rendered once, at the root — `toast()` is called from anywhere. */
export function ToastProvider() {
  return <Toaster />;
}
