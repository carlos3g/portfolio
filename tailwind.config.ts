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
        raised: "var(--raised)",
        ink: "var(--ink)",
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
        soft: "var(--soft)",
        fill: { DEFAULT: "var(--fill)", hover: "var(--fill-hover)" },
        "on-fill": "var(--on-fill)",

        // shadcn names, aliased to the same tokens so generated primitives fit.
        background: "var(--bg)",
        foreground: "var(--ink)",
        border: "var(--line)",
        input: "var(--line)",
        ring: "var(--accent)",
        card: { DEFAULT: "var(--surface)", foreground: "var(--ink)" },
        popover: { DEFAULT: "var(--surface)", foreground: "var(--ink)" },
        primary: { DEFAULT: "var(--fill)", foreground: "var(--on-fill)" },
        secondary: { DEFAULT: "var(--soft)", foreground: "var(--ink)" },
        muted: { DEFAULT: "var(--muted)", foreground: "var(--muted)" },
        accent: { DEFAULT: "var(--accent)", foreground: "var(--on-fill)" },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        button: "var(--shadow-button)",
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
