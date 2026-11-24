"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { BrandMark } from "@/components/brand-mark";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePortfolioStore, type SectionId } from "@/store/use-portfolio-store";

const links = ["experience", "projects", "skills", "contact"] as const;

const observedSections: SectionId[] = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

export function SiteHeader({ name, cvUrl }: { name: string; cvUrl: string }) {
  const t = useTranslations("header");
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          usePortfolioStore
            .getState()
            .setActiveSection(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const id of observedSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="wrap flex min-h-[72px] items-center gap-2 min-[981px]:grid min-[981px]:grid-cols-[1fr_auto_1fr]">
        <a
          href="#hero"
          className="mr-auto flex items-center gap-2.5 whitespace-nowrap font-bold tracking-[-0.02em]"
        >
          <BrandMark />
          <span className="max-[420px]:sr-only">{name}</span>
        </a>
        <nav
          aria-label={t("nav")}
          className="hidden gap-1 text-[15px] font-medium min-[981px]:flex"
        >
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className="nav-link"
            >
              {t(`links.${id}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-0.5">
          <LocaleToggle />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2">
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t("cvLabel")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("cv")}
            </a>
          </Button>
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="icon-button !h-10 !w-10 min-[981px]:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t("nav")}
        hidden={!open}
        className="border-t bg-bg min-[981px]:hidden"
      >
        <ul className="wrap divide-y py-2">
          {links.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-4 text-lg font-semibold"
              >
                {t(`links.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
