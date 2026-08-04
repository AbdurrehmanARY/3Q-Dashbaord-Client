import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** First letters of the first and last word — "Asif Raza" → "AR". */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export interface OperatorAvatarProps {
  name: string;
  /** Plain image URL. Falls back to initials when absent or when the image fails to load. */
  avatarUrl?: string | null;
  size?: "sm" | "default" | "lg";
  className?: string;
}

/**
 * An operator's avatar, used everywhere an operator is shown — tables, detail pages,
 * assignment dialogs and production screens.
 *
 * Wraps the shadcn `ui/avatar` primitives rather than re-implementing them. The image is a
 * plain URL today; the fallback renders the operator's initials, which also covers a broken
 * or unreachable URL, so a bad link degrades to something readable instead of a gap.
 *
 * Swapping in Cloudinary later only changes what produces `avatarUrl` — nothing here.
 */
export function OperatorAvatar({ name, avatarUrl, size = "default", className }: OperatorAvatarProps) {
  return (
    <Avatar size={size} className={cn("shrink-0", className)}>
      {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
      <AvatarFallback className="font-medium">{initialsOf(name)}</AvatarFallback>
    </Avatar>
  );
}

/** Avatar + name on one line — the standard way an operator appears in a table cell. */
export function OperatorAvatarName({
  name,
  avatarUrl,
  hint,
  size = "sm",
  className,
}: OperatorAvatarProps & { hint?: string | null }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2", className)}>
      <OperatorAvatar name={name} avatarUrl={avatarUrl} size={size} />
      <span className="min-w-0">
        <span className="block truncate font-medium leading-tight">{name}</span>
        {hint && <span className="block truncate text-xs text-muted-foreground">{hint}</span>}
      </span>
    </span>
  );
}
