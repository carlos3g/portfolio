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
  selectedProjectId: string | null;
  selectedExperienceId: string | null;
  theme: Theme;
  setActiveSection: (id: SectionId) => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  openExperience: (id: string) => void;
  closeExperience: () => void;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
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
  selectedProjectId: null,
  selectedExperienceId: null,
  theme: "dark",
  setActiveSection: (id) => set({ activeSection: id }),
  openProject: (id) => set({ selectedProjectId: id }),
  closeProject: () => set({ selectedProjectId: null }),
  openExperience: (id) => set({ selectedExperienceId: id }),
  closeExperience: () => set({ selectedExperienceId: null }),
  setTheme: (t) => {
    applyThemeClass(t);
    persistTheme(t);
    set({ theme: t });
  },
  toggleTheme: () => {
    const next: Theme = get().theme === "dark" ? "light" : "dark";
    applyThemeClass(next);
    persistTheme(next);
    set({ theme: next });
  },
}));

export { THEME_STORAGE_KEY };
