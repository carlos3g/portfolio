"use client";

import { useEffect } from "react";
import { applyTheme, usePortfolioStore } from "@/store/use-portfolio-store";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme-storage";

/**
 * Syncs the store with the class the inline boot script applied. Next renders
 * not-found pages on the client, where that script does not run, so the theme
 * is applied here when the class is missing.
 */
export function ThemeBoot() {
  useEffect(() => {
    const { classList } = document.documentElement;
    let theme: Theme = classList.contains("dark") ? "dark" : "light";

    if (!classList.contains("dark") && !classList.contains("light")) {
      try {
        if (window.localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
          theme = "dark";
        }
      } catch {
        /* ignore */
      }
      applyTheme(theme);
    }

    usePortfolioStore.setState({ theme });
  }, []);

  return null;
}
