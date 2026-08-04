/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geist Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        /* --- Core semantic tokens (resolved from CSS vars) --- */
        border:     "oklch(from var(--border) l c h)",
        input:      "oklch(from var(--input) l c h)",
        ring:       "oklch(from var(--ring) l c h)",
        background: "oklch(from var(--background) l c h)",
        foreground: "oklch(from var(--foreground) l c h)",

        primary: {
          DEFAULT:    "oklch(from var(--primary) l c h)",
          foreground: "oklch(from var(--primary-foreground) l c h)",
        },
        secondary: {
          DEFAULT:    "oklch(from var(--secondary) l c h)",
          foreground: "oklch(from var(--secondary-foreground) l c h)",
        },
        destructive: {
          DEFAULT:    "oklch(from var(--destructive) l c h)",
          foreground: "oklch(from var(--destructive-foreground) l c h)",
        },
        success: {
          DEFAULT:    "oklch(from var(--success) l c h)",
          foreground: "oklch(from var(--success-foreground) l c h)",
        },
        warning: {
          DEFAULT:    "oklch(from var(--warning) l c h)",
          foreground: "oklch(from var(--warning-foreground) l c h)",
        },
        muted: {
          DEFAULT:    "oklch(from var(--muted) l c h)",
          foreground: "oklch(from var(--muted-foreground) l c h)",
        },
        accent: {
          DEFAULT:    "oklch(from var(--accent) l c h)",
          foreground: "oklch(from var(--accent-foreground) l c h)",
        },
        popover: {
          DEFAULT:    "oklch(from var(--popover) l c h)",
          foreground: "oklch(from var(--popover-foreground) l c h)",
        },
        card: {
          DEFAULT:    "oklch(from var(--card) l c h)",
          foreground: "oklch(from var(--card-foreground) l c h)",
        },

        /* --- Sidebar tokens --- */
        sidebar: {
          DEFAULT:            "oklch(from var(--sidebar) l c h)",
          foreground:         "oklch(from var(--sidebar-foreground) l c h)",
          primary:            "oklch(from var(--sidebar-primary) l c h)",
          "primary-foreground": "oklch(from var(--sidebar-primary-foreground) l c h)",
          accent:             "oklch(from var(--sidebar-accent) l c h)",
          "accent-foreground":"oklch(from var(--sidebar-accent-foreground) l c h)",
          border:             "oklch(from var(--sidebar-border) l c h)",
          ring:               "oklch(from var(--sidebar-ring) l c h)",
        },

        /* --- Chart tokens --- */
        chart: {
          1: "oklch(from var(--chart-1) l c h)",
          2: "oklch(from var(--chart-2) l c h)",
          3: "oklch(from var(--chart-3) l c h)",
          4: "oklch(from var(--chart-4) l c h)",
          5: "oklch(from var(--chart-5) l c h)",
          6: "oklch(from var(--chart-6) l c h)",
        },
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xl:  "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        "brand-sm":  "0 1px 3px oklch(0.534 0.198 264 / 15%), 0 1px 2px oklch(0.534 0.198 264 / 10%)",
        "brand-md":  "0 4px 6px oklch(0.534 0.198 264 / 15%), 0 2px 4px oklch(0.534 0.198 264 / 10%)",
        "brand-lg":  "0 10px 15px oklch(0.534 0.198 264 / 15%), 0 4px 6px oklch(0.534 0.198 264 / 10%)",
        "card":      "0 1px 3px oklch(0 0 0 / 8%), 0 1px 2px oklch(0 0 0 / 6%)",
        "card-hover":"0 4px 12px oklch(0 0 0 / 12%), 0 2px 4px oklch(0 0 0 / 8%)",
        "glow":      "0 0 20px oklch(0.534 0.198 264 / 30%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0", opacity: "0" },
          to:   { height: "var(--radix-collapsible-content-height)", opacity: "1" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)", opacity: "1" },
          to:   { height: "0", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 oklch(0.534 0.198 264 / 40%)" },
          "70%":  { boxShadow: "0 0 0 8px oklch(0.534 0.198 264 / 0%)" },
          "100%": { boxShadow: "0 0 0 0 oklch(0.534 0.198 264 / 0%)" },
        },
      },
      animation: {
        "accordion-down":   "accordion-down 0.2s ease-out",
        "accordion-up":     "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up":   "collapsible-up 0.2s ease-out",
        "fade-in":          "fade-in 0.4s ease-out both",
        "slide-up":         "slide-up 0.4s ease-out both",
        "scale-in":         "scale-in 0.2s ease-out both",
        shimmer:            "shimmer 1.8s ease-in-out infinite",
        "pulse-ring":       "pulse-ring 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
