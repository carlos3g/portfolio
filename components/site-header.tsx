"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    <header className="sticky top-0 z-40 border-b bg-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        {t("skip")}
      </a>
      <div className="wrap flex min-h-[68px] items-center gap-3 min-[861px]:gap-7">
        <a
          href="#hero"
          className="mr-auto whitespace-nowrap font-bold tracking-[-0.02em]"
        >
          {name}
        </a>
        <nav
          aria-label={t("nav")}
          className="hidden gap-[26px] text-[15px] font-medium min-[861px]:flex"
        >
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
              className={cn(
                "transition-colors hover:text-ink",
                activeSection === id ? "text-ink" : "text-muted"
              )}
            >
              {t(`links.${id}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center min-[561px]:gap-1.5">
          <LocaleToggle />
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 min-w-10 place-items-center rounded-md text-muted transition-colors hover:bg-soft hover:text-ink min-[861px]:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <Button asChild size="sm">
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t("cvLabel")}
          >
            {t("cv")}
          </a>
        </Button>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t("nav")}
        hidden={!open}
        className="border-t min-[861px]:hidden"
      >
        <ul className="wrap divide-y">
          {links.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-3.5 font-semibold"
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
