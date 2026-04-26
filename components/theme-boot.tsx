"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme-storage";

export function ThemeBoot() {
  const setTheme = usePortfolioStore((s) => s.setTheme);

  useEffect(() => {
    let stored: Theme | null = null;
    try {
      const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (raw === "dark" || raw === "light") stored = raw;
    } catch {
      /* ignore */
    }

    const current = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    const next = stored ?? current;

    if (next !== current) {
      setTheme(next);
    } else {
      usePortfolioStore.setState({ theme: next });
    }
  }, [setTheme]);

  return null;
}
