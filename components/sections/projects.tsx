import { getLocale, getTranslations } from "next-intl/server";
import { ProjectCover } from "@/components/project-cover";
import { getProjects } from "@/lib/portfolio-data";
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
        <h2 className="section-title">{t("heading")}</h2>
        <p className="mt-4 max-w-[52ch] text-muted">{t("subtitle")}</p>

        <ul className="mt-12 grid gap-6 min-[861px]:grid-cols-2">
          {featured.map((p) => (
            <li
              key={p.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-[10px] border bg-surface"
            >
              <ProjectCover project={p} imageAlt={t("shortcutfyAlt")} />
              <div className="flex grow flex-col p-6 min-[561px]:p-8">
                <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-3">{p.summary}</p>
                <p className="mt-4 text-[15px] text-muted">
                  <span className="sr-only">{t("stack")}: </span>
                  {p.stack.join(", ")}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6">
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
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {others.map((p) => (
          <div key={p.id} className="split mt-14 !gap-y-3">
            <div>
              <p className="text-[15px] text-muted">{t("also")}</p>
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em]">
                {p.title}
              </h3>
            </div>
            <div>
              <p className="max-w-[66ch]">{p.summary}</p>
              <p className="mt-3 text-[15px] text-muted">
                <span className="sr-only">{t("stack")}: </span>
                {p.stack.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
