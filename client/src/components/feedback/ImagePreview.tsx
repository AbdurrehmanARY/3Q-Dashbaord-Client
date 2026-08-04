import * as React from "react";
import { ImageOff, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  url?: string | null;
  alt: string;
  /** Rendered when there is no URL at all. */
  emptyLabel?: string;
  className?: string;
}

/**
 * Renders an image from a plain URL, degrading gracefully in the two ways this can fail:
 * no URL at all, and a URL that doesn't load (dead link, hotlink blocked, wrong host).
 * Both show an explanatory placeholder rather than a browser broken-image glyph.
 *
 * The image is `object-contain` on a muted backdrop because artwork has its own aspect
 * ratio — cropping a label design to fill a box would misrepresent it.
 *
 * Only renders the URL it is given; swapping to Cloudinary later changes nothing here.
 */
export function ImagePreview({ url, alt, emptyLabel = "No image provided", className }: ImagePreviewProps) {
  const [failed, setFailed] = React.useState(false);

  // A new URL deserves a fresh attempt — otherwise one bad link poisons every later one.
  React.useEffect(() => {
    setFailed(false);
  }, [url]);

  const trimmed = url?.trim();

  if (!trimmed || failed) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 text-muted-foreground",
          className
        )}
      >
        {failed ? <ImageOff className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
        <p className="px-3 text-center text-xs">
          {failed ? "Image could not be loaded" : emptyLabel}
        </p>
      </div>
    );
  }

  return (
    <a
      href={trimmed}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block aspect-video w-full overflow-hidden rounded-lg border bg-muted/30 transition-opacity hover:opacity-90",
        className
      )}
      title="Open full size"
    >
      <img
        src={trimmed}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </a>
  );
}
