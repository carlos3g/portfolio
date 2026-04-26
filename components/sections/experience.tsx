"use client";

import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Divider } from "@/components/ornaments/divider";
import { Badge } from "@/components/ui/badge";
import { getExperience, getVolunteer } from "@/lib/portfolio-data";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import type { Locale } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Experience() {
  const locale = useLocale() as Locale;
  const t = useTranslations("experience");

  const experience = useMemo(() => getExperience(locale), [locale]);
  const volunteer = useMemo(() => getVolunteer(locale), [locale]);

  const selectedId = usePortfolioStore((s) => s.selectedExperienceId);
  const openExperience = usePortfolioStore((s) => s.openExperience);
  const closeExperience = usePortfolioStore((s) => s.closeExperience);

  const all = [...experience, ...volunteer];
  const selected = all.find((e) => e.id === selectedId) ?? null;

  return (
    <section id="experience" className="relative py-32">
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
            {t("positionsLabel", { count: experience.length })}
          </p>
        </div>

        <ol className="relative border-l border-magnus/25 pl-8 sm:pl-12">
          {experience.map((m, i) => (
            <li
              key={m.id}
              className="group relative pb-14 last:pb-0"
            >
              <span
                className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center sm:-left-[50px]"
                aria-hidden="true"
              >
                <span className="absolute inset-0 rounded-full bg-magnus/20 transition-all group-hover:bg-magnus/40" />
                <span className="relative h-2 w-2 rounded-full bg-magnus" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-magnus">
                  {m.period}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-frost/70">
                  {String(experience.length - i).padStart(2, "0")} · {m.location}
                </span>
              </div>

              <button
                type="button"
                onClick={() => openExperience(m.id)}
                className="group/btn mt-2 flex items-start gap-3 text-left transition-colors"
              >
                <h3 className="font-serif text-2xl text-ivory group-hover/btn:text-magnus transition-colors">
                  {m.role}
                  <span className="text-magnus/70"> · </span>
                  <span className="text-silver">{m.company}</span>
                </h3>
                <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-frost transition-all group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-magnus" />
              </button>

              <p className="mt-3 max-w-2xl leading-relaxed text-silver">
                {m.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.stack.slice(0, 6).map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
                {m.stack.length > 6 && (
                  <Badge variant="outline">+{m.stack.length - 6}</Badge>
                )}
              </div>
            </li>
          ))}
        </ol>

        {volunteer.length > 0 && (
          <div className="mt-20">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-magnus/70">
              {t("volunteerLabel")}
            </p>
            <ul className="grid gap-4 md:grid-cols-2">
              {volunteer.map((v) => (
                <li
                  key={v.id}
                  className="imperial-card flex flex-col gap-3 p-6"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-serif text-xl text-ivory">
                      {v.role}
                      <span className="text-magnus/70"> · </span>
                      <span className="text-silver">{v.company}</span>
                    </h4>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus">
                      {v.period}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-silver">
                    {v.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(o) => !o && closeExperience()}
      >
        {selected && (
          <DialogContent>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <span className="h-4 w-0.5 bg-magnus" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus">
                  {selected.period} · {selected.location}
                </span>
              </div>
              <DialogTitle>
                {selected.role}
                <span className="text-magnus/70"> · </span>
                <span className="text-silver">{selected.company}</span>
              </DialogTitle>
              <DialogDescription>{selected.summary}</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                  {t("deliveriesLabel")}
                </p>
                <ul className="space-y-2 text-sm text-ivory">
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
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
