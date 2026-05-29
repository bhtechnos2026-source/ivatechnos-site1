import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral tokens backed by CSS variables — auto-switch in dark mode
        card:    "rgb(var(--clr-card)    / <alpha-value>)",
        surface: "rgb(var(--clr-surface) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--clr-ink)       / <alpha-value>)",
          soft:    "rgb(var(--clr-ink-soft)  / <alpha-value>)",
          muted:   "rgb(var(--clr-ink-muted) / <alpha-value>)",
          faint:   "rgb(var(--clr-ink-faint) / <alpha-value>)",
        },
        line: "rgb(var(--clr-line) / <alpha-value>)",
        // Fixed accent (same in both themes)
        accent: {
          DEFAULT: "#4f46e5",
          soft:    "#eef2ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        lift: "0 4px 12px rgba(16,24,40,0.06), 0 12px 32px rgba(16,24,40,0.08)",
      },
      borderRadius: {
        xl:  "0.875rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
