import type { Config } from "tailwindcss";

const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./lib/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        obsidian: rgb("--c-obsidian"),
        charcoal: rgb("--c-charcoal"),
        magnus: {
          DEFAULT: rgb("--c-magnus"),
          deep: rgb("--c-magnus-deep"),
        },
        steel: rgb("--c-steel"),
        frost: rgb("--c-frost"),
        crimson: rgb("--c-crimson"),
        ivory: rgb("--c-ivory"),
        silver: rgb("--c-silver"),

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, rgb(var(--c-magnus)) 0%, rgb(var(--c-magnus-soft)) 45%, rgb(var(--c-magnus-deep)) 100%)",
        "gold-sheen":
          "linear-gradient(110deg, transparent 20%, rgb(var(--c-magnus-soft) / 0.6) 50%, transparent 80%)",
        "laurel-radial":
          "radial-gradient(circle at center, rgb(var(--c-magnus) / 0.12) 0%, transparent 65%)",
      },
      boxShadow: {
        imperial:
          "0 0 0 1px rgb(var(--c-magnus) / 0.25), 0 20px 60px -20px rgb(var(--c-shadow) / 0.9)",
        "gold-glow": "0 0 40px -10px rgb(var(--c-magnus) / 0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gold-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slow-pulse": {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        "gold-shimmer": "gold-shimmer 6s linear infinite",
        "slow-pulse": "slow-pulse 4s ease-in-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
