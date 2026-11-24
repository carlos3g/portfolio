import { getLocale, getTranslations } from "next-intl/server";
import {
  getExperience,
  getVolunteer,
  type Highlight,
} from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

const VISIBLE_HIGHLIGHTS = 3;

export async function Experience() {
  const locale = (await getLocale()) as Locale;
  const experience = getExperience(locale);
  const volunteer = getVolunteer(locale);
  const t = await getTranslations("experience");

  return (
    <section id="experience" className="section">
      <div className="wrap split">
        <div className="self-start min-[1081px]:sticky min-[1081px]:top-28">
          <h2 className="section-title">{t("heading")}</h2>
          <p className="mt-4 max-w-[30ch] text-muted">{t("subtitle")}</p>
        </div>
        <div className="grid min-w-0 gap-[72px]">
          {experience.map((e) => {
            const rest = e.highlights.slice(VISIBLE_HIGHLIGHTS);
            return (
              <article key={e.id} id={`exp-${e.id}`}>
                <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] min-[561px]:text-[28px]">
                  {e.company}
                </h3>
                <p className="mt-1 text-lg text-muted">{e.role}</p>
                <p className="mt-0.5 text-[15px] text-muted">
                  {e.location}, {e.period}
                </p>
                <Deliveries
                  items={e.highlights.slice(0, VISIBLE_HIGHLIGHTS)}
                  className="mt-[22px]"
                />
                {rest.length > 0 && (
                  <details className="group">
                    <summary className="mt-4 inline-block cursor-pointer list-none rounded font-semibold text-accent">
                      <span className="group-open:hidden">
                        {t("showMore", { count: rest.length })}
                      </span>
                      <span className="hidden group-open:inline">
                        {t("showLess")}
                      </span>
                    </summary>
                    <Deliveries items={rest} className="mt-3.5" />
                  </details>
                )}
                <p className="mt-[22px] max-w-[66ch] text-[15px] text-muted">
                  <span className="sr-only">{t("stack")}: </span>
                  {e.stack.join(", ")}
                </p>
              </article>
            );
          })}
          {volunteer.map((v) => (
            <article key={v.id} className="border-t pt-10">
              <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em]">
                {v.company}
              </h3>
              <p className="mt-1 text-lg text-muted">
                {v.role}, {t("volunteer")}
              </p>
              <Deliveries items={v.highlights} className="mt-4" />
            </article>
          ))}
        </div>
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
    <ul className={`delivery-list ${className}`}>
      {items.map((h) => (
        <li key={h.id}>{h.text}</li>
      ))}
    </ul>
  );
}
