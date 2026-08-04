import * as React from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  /** ISO date string (`yyyy-MM-dd`) or null. Kept as a string so it round-trips to the API unchanged. */
  value: string | null | undefined;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  "aria-label"?: string;
}

/** `yyyy-MM-dd` in local time — `toISOString()` would shift the day across timezones. */
function toISODate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * Generic date picker built on Calendar + Popover, for Order Date / Due Date style
 * fields. Values are exchanged as `yyyy-MM-dd` strings, matching what the API stores.
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
  clearable = true,
  className,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selected = React.useMemo(() => {
    if (!value) return undefined;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* className rather than `render={<Button/>}` — see data-table-column-header. */}
      <PopoverTrigger
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start font-normal",
          !selected && "text-muted-foreground",
          className
        )}
      >
        <CalendarIcon className="size-4 shrink-0 opacity-60" />
        <span className="truncate">{selected ? format(selected, "dd MMM yyyy") : placeholder}</span>
        {clearable && selected && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear date"
            className="ml-auto rounded p-0.5 opacity-50 hover:bg-muted hover:opacity-100"
            onClick={(event) => {
              // Clearing must not also open the calendar.
              event.stopPropagation();
              onChange(null);
            }}
          >
            <XIcon className="size-3.5" />
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          autoFocus
          onSelect={(date) => {
            onChange(date ? toISODate(date) : null);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
