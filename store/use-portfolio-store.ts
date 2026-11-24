"use client";

import { create } from "zustand";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme-storage";

export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "contact";

export type { Theme };

interface PortfolioState {
  activeSection: SectionId;
  theme: Theme;
  setActiveSection: (id: SectionId) => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

function persistTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore quota/denied */
  }
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  activeSection: "hero",
  theme: "light",
  setActiveSection: (id) => set({ activeSection: id }),
  setTheme: (t) => {
    applyTheme(t);
    persistTheme(t);
    set({ theme: t });
  },
  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
}));
