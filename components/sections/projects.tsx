"use client";

import { useMemo } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Divider } from "@/components/ornaments/divider";
import { Badge } from "@/components/ui/badge";
import { getProjects, type ProjectItem } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import type { Locale } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Projects() {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects");
  const projects = useMemo(() => getProjects(locale), [locale]);

  const selectedId = usePortfolioStore((s) => s.selectedProjectId);
  const openProject = usePortfolioStore((s) => s.openProject);
  const closeProject = usePortfolioStore((s) => s.closeProject);

  const selected = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <section id="projects" className="relative py-32">
      <Divider ornament />
      <div className="container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">
              <span>{t("eyebrow")}</span>
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
              {t("headingLine1")}<br />
              <span className="gold-text">{t("headingLine2")}</span>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-frost">
            {t("countLabel", { count: projects.length })}
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i + 1}
              onOpen={() => openProject(p.id)}
            />
          ))}
        </ul>
      </div>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(o) => !o && closeProject()}
      >
        {selected && (
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="h-4 w-0.5 bg-magnus" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus">
                  {selected.period} · {selected.role}
                </span>
              </div>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>{selected.summary}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <p className="leading-relaxed text-silver">{selected.narrative}</p>

              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                  {t("highlightsLabel")}
                </p>
                <ul className="space-y-1.5 text-sm">
                  {selected.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 before:mt-[0.7em] before:block before:h-px before:w-4 before:shrink-0 before:bg-magnus"
                    >
                      <span className="leading-relaxed text-silver">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                  {t("stackLabel")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.stack.map((s) => (
                    <Badge key={s} variant="steel">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {selected.link && (
                <a
                  href={selected.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-magnus/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-magnus transition-all hover:bg-magnus hover:text-obsidian"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {selected.link.label}
                </a>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectItem;
  index: number;
  onOpen: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="imperial-card group flex h-full w-full flex-col gap-5 border-l-2 border-l-transparent p-7 text-left transition-all duration-300 hover:border-l-magnus"
      >
        <header className="flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus/70">
            {String(index).padStart(2, "0")} · {project.period}
          </span>
          <ArrowUpRight className="h-4 w-4 text-frost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magnus" />
        </header>

        <div>
          <h3 className="font-serif text-2xl leading-tight text-ivory transition-colors group-hover:text-magnus">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-frost">
            {project.role}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-silver">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
          {project.stack.length > 5 && (
            <Badge variant="outline">+{project.stack.length - 5}</Badge>
          )}
        </div>
      </button>
    </li>
  );
}
