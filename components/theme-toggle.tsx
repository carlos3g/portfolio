"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const theme = usePortfolioStore((s) => s.theme);
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);
  const t = useTranslations("themeToggle");

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
      title={isDark ? t("light") : t("dark")}
      className={cn(
        "group inline-flex h-9 items-center gap-2 border border-magnus/30 bg-obsidian/40 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-magnus transition-all hover:bg-magnus hover:text-obsidian",
        className
      )}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">{isDark ? t("light") : t("dark")}</span>
    </button>
  );
}
