import { ArrowUpRight, Hammer } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ProjectCover } from "@/components/project-cover";
import { SectionHeading } from "@/components/section-heading";
import { getProjects, type ProjectItem } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export async function Projects() {
  const locale = (await getLocale()) as Locale;
  const projects = getProjects(locale);
  const t = await getTranslations("projects");

  const featured = projects.filter((p) => p.cover !== null);
  const others = projects.filter((p) => p.cover === null);

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          subtitle={t("subtitle")}
        />

        <ul className="mt-14 grid gap-5 min-[701px]:grid-cols-2 min-[1081px]:grid-cols-3">
          {featured.map((p, i) => {
            const lead = i === 0;
            return (
              <li
                key={p.id}
                className={cn(
                  "reveal min-w-0",
                  lead && "col-span-full",
                  i === featured.length - 1 &&
                    "min-[701px]:max-[1080px]:col-span-full"
                )}
              >
                <article
                  className={cn(
                    "card card-hover flex h-full flex-col overflow-hidden",
                    lead &&
                      "min-[861px]:grid min-[861px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                  )}
                >
                  <ProjectCover
                    project={p}
                    dashboardAlt={t("dashboardAlt")}
                    className={
                      lead
                        ? "h-64 min-[561px]:h-80 min-[861px]:order-2 min-[861px]:h-auto min-[861px]:min-h-[420px]"
                        : "h-56"
                    }
                  />
                  <ProjectBody
                    project={p}
                    lead={lead}
                    stackLabel={t("stack")}
                    featuredLabel={t("featured")}
                  />
                </article>
              </li>
            );
          })}
        </ul>

        {others.map((p) => (
          <article
            key={p.id}
            className="reveal mt-5 rounded-[28px] border border-dashed border-line-strong p-7 min-[861px]:flex min-[861px]:items-center min-[861px]:gap-8"
          >
            <span className="icon-tile">
              <Hammer className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="mt-4 min-[861px]:mt-0 min-[861px]:w-44 min-[861px]:shrink-0">
              <p className="text-sm text-muted">{t("also")}</p>
              <h3 className="text-[1.375rem] font-bold tracking-[-0.025em]">
                {p.title}
              </h3>
            </div>
            <p className="mt-2 text-muted min-[861px]:mt-0">{p.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectBody({
  project: p,
  lead,
  stackLabel,
  featuredLabel,
}: {
  project: ProjectItem;
  lead: boolean;
  stackLabel: string;
  featuredLabel: string;
}) {
  return (
    <div
      className={cn("flex grow flex-col p-7", lead && "min-[861px]:p-10")}
    >
      {lead && (
        <span className="mb-5 self-start rounded-full bg-soft px-3 py-0.5 text-sm font-semibold text-accent">
          {featuredLabel}
        </span>
      )}
      <h3
        className={cn(
          "font-bold leading-tight tracking-[-0.03em]",
          lead ? "text-[2rem]" : "text-[1.5rem]"
        )}
      >
        {p.title}
      </h3>
      <p className={cn("mt-3 text-muted", lead && "text-lg")}>{p.summary}</p>
      <ul aria-label={stackLabel} className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-7 text-base">
        {p.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {l.label}
              <span className="sr-only"> {p.title}</span>
              <ArrowUpRight className="arrow h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
