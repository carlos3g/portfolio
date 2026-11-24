"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePortfolioStore } from "@/store/use-portfolio-store";

export function ThemeToggle() {
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);
  const t = useTranslations("themeToggle");

  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || !("startViewTransition" in document)) {
      toggleTheme();
      return;
    }
    document.startViewTransition(toggleTheme);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("label")}
      title={t("label")}
      className="icon-button !h-10 !w-10"
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
