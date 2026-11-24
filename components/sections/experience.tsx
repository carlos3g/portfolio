import { ChevronDown } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { getExperience, type Highlight } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const VISIBLE_HIGHLIGHTS = 3;

export async function Experience() {
  const locale = (await getLocale()) as Locale;
  const experience = getExperience(locale);
  const t = await getTranslations("experience");

  return (
    <section id="experience" className="section">
      <div className="wrap grid gap-14 min-[1081px]:grid-cols-[minmax(0,4.4fr)_minmax(0,7fr)] min-[1081px]:gap-16">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          subtitle={t("subtitle")}
          className="self-start min-[1081px]:sticky min-[1081px]:top-32"
        />
        <ol className="rail relative grid min-w-0 gap-16">
          <li
            aria-hidden="true"
            role="presentation"
            className="absolute bottom-0 left-[23px] top-3 w-0.5 bg-line max-[560px]:hidden"
          >
            <span className="rail-fill block h-full w-full bg-accent" />
          </li>
          {experience.map((e) => {
            const rest = e.highlights.slice(VISIBLE_HIGHLIGHTS);
            return (
              <li
                key={e.id}
                id={`exp-${e.id}`}
                className="relative min-[561px]:pl-[76px]"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mb-4 grid h-12 w-12 place-items-center rounded-2xl text-lg font-extrabold ring-8 ring-bg min-[561px]:absolute min-[561px]:left-0 min-[561px]:top-0",
                    e.current
                      ? "bg-accent text-on-accent shadow-button"
                      : "border border-line-strong bg-surface text-accent"
                  )}
                >
                  {e.company.replace("Grupo ", "").charAt(0)}
                </span>
                <div className="reveal">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[1.75rem] font-bold leading-tight tracking-[-0.03em]">
                      {e.company}
                    </h3>
                    {e.current && (
                      <span className="rounded-full bg-soft px-3 py-0.5 text-sm font-semibold text-accent">
                        {t("current")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-lg">{e.role}</p>
                  <p className="text-[15px] text-muted">
                    {e.location}, {e.period}
                  </p>
                  <Deliveries
                    items={e.highlights.slice(0, VISIBLE_HIGHLIGHTS)}
                    className="mt-6"
                  />
                  {rest.length > 0 && (
                    <details className="group">
                      <summary className="mt-4 inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full font-semibold text-accent">
                        <span className="group-open:hidden">
                          {t("showMore", { count: rest.length })}
                        </span>
                        <span className="hidden group-open:inline">
                          {t("showLess")}
                        </span>
                        <ChevronDown
                          className="h-4 w-4 transition-transform duration-300 group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <Deliveries items={rest} className="mt-4" />
                    </details>
                  )}
                  <ul
                    aria-label={t("stack")}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {e.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Deliveries({
  items,
  className,
}: {
  items: Highlight[];
  className: string;
}) {
  return (
    <ul className={cn("grid max-w-[64ch] gap-3 text-muted", className)}>
      {items.map((h) => (
        <li key={h.id} className="relative pl-6">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.62em] h-2 w-2 rounded-full bg-accent ring-4 ring-soft"
          />
          {h.text}
        </li>
      ))}
    </ul>
  );
}
