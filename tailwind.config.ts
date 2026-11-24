import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        line: "var(--line)",
        soft: "var(--soft)",
        "on-accent": "var(--on-accent)",
        panel: {
          DEFAULT: "var(--panel)",
          ink: "var(--panel-ink)",
          muted: "var(--panel-muted)",
          accent: "var(--panel-accent)",
        },

        // shadcn names, aliased to the same tokens so generated primitives fit.
        background: "var(--bg)",
        foreground: "var(--ink)",
        border: "var(--line)",
        input: "var(--line)",
        ring: "var(--accent)",
        card: { DEFAULT: "var(--surface)", foreground: "var(--ink)" },
        popover: { DEFAULT: "var(--surface)", foreground: "var(--ink)" },
        primary: { DEFAULT: "var(--accent)", foreground: "var(--on-accent)" },
        secondary: { DEFAULT: "var(--soft)", foreground: "var(--ink)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted)" },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--on-accent)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
