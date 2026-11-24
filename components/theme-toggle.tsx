"use client";

import { Contrast } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePortfolioStore } from "@/store/use-portfolio-store";

export function ThemeToggle() {
  const toggleTheme = usePortfolioStore((s) => s.toggleTheme);
  const t = useTranslations("themeToggle");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("label")}
      title={t("label")}
      className="grid h-10 min-w-10 place-items-center rounded-md text-muted transition-colors hover:bg-soft hover:text-ink"
    >
      <Contrast className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
