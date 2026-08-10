import * as React from "react";
import { UploadIcon, XIcon } from "lucide-react";
import { AppButton } from "@/components/forms/AppButton";
import { ImagePreview } from "@/components/feedback/ImagePreview";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  label?: string;
  /** Current value: a base64 `data:` URI (uploaded) or an external URL. */
  value?: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  alt?: string;
  /** Max source-file size in bytes before rejection. Default 3 MB. */
  maxBytes?: number;
  className?: string;
}

const DEFAULT_MAX = 3 * 1024 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

/**
 * File-upload image field that stores the picked image inline as a base64 `data:` URI
 * (the app's chosen storage: no external bucket — the string is persisted straight into
 * the DB `text` column). The same field still shows, and lets you clear, an existing
 * external URL, so records saved before file-upload keep working.
 */
export function ImageUploadField({
  label,
  value,
  onChange,
  disabled,
  error,
  hint,
  alt = "Uploaded image",
  maxBytes = DEFAULT_MAX,
  className,
}: ImageUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const hasValue = !!value?.trim();

  const handleFile = async (file: File | undefined) => {
    setLocalError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLocalError("That file is not an image.");
      return;
    }
    if (file.size > maxBytes) {
      setLocalError(`Image is too large — keep it under ${Math.round(maxBytes / (1024 * 1024))} MB.`);
      return;
    }
    try {
      onChange(await readAsDataUrl(file));
    } catch {
      setLocalError("Could not read that file.");
    }
  };

  const clear = () => {
    setLocalError(null);
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const shownError = error ?? localError ?? undefined;

  return (
    <div className={cn("grid gap-1.5", className)}>
      {label && <span className="text-xs font-semibold">{label}</span>}

      {hasValue && (
        <div className="max-w-xs">
          <ImagePreview url={value} alt={alt} />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={disabled}
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />

      <div className="flex flex-wrap items-center gap-2">
        <AppButton
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          leftIcon={<UploadIcon className="h-4 w-4" />}
          onClick={() => inputRef.current?.click()}
        >
          {hasValue ? "Replace image" : "Upload image"}
        </AppButton>
        {hasValue && (
          <AppButton
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            leftIcon={<XIcon className="h-4 w-4" />}
            onClick={clear}
          >
            Remove
          </AppButton>
        )}
      </div>

      {shownError ? (
        <p className="text-xs text-destructive">{shownError}</p>
      ) : hint ? (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
