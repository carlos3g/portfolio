"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePortfolioStore, type SectionId } from "@/store/use-portfolio-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { cn } from "@/lib/utils";

const linkConfig: { id: SectionId; numeral: string }[] = [
  { id: "about", numeral: "01" },
  { id: "experience", numeral: "02" },
  { id: "projects", numeral: "03" },
  { id: "skills", numeral: "04" },
  { id: "education", numeral: "05" },
  { id: "contact", numeral: "06" },
];

const observedSections: SectionId[] = ["hero", ...linkConfig.map((l) => l.id)];

export function Nav() {
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const t = useTranslations("nav");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id as SectionId;
          if (usePortfolioStore.getState().activeSection === id) return;
          usePortfolioStore.getState().setActiveSection(id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    observedSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-magnus/10 bg-obsidian/70 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-3 font-serif tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-magnus/40 bg-obsidian text-[10px] font-bold text-magnus group-hover:bg-magnus group-hover:text-obsidian transition-colors">
            cm
          </span>
          <span className="hidden text-ivory sm:inline">
            Carlos <span className="text-magnus">Mesquita</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {linkConfig.map((l) => {
            const active = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "group relative flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors",
                  active ? "text-magnus" : "text-frost hover:text-ivory"
                )}
              >
                <span className="text-magnus/60">{l.numeral}</span>
                <span>{t(`links.${l.id}`)}</span>
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-px bg-magnus transition-all duration-300",
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )}
                />
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden items-center gap-2 border border-magnus/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-magnus transition-all hover:bg-magnus hover:text-obsidian lg:inline-flex"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
