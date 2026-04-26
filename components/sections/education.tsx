import { getLocale, getTranslations } from "next-intl/server";
import { Divider } from "@/components/ornaments/divider";
import { getEducation } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Education() {
  const locale = (await getLocale()) as Locale;
  const education = getEducation(locale);
  const t = await getTranslations("education");

  return (
    <section id="education" className="relative py-32">
      <Divider ornament />
      <div className="container">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-6">
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            {t("headingLine1")}<br />
            <span className="gold-text">{t("headingLine2")}</span>
          </h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {education.map((e) => (
            <li
              key={`${e.institution}-${e.period}`}
              className="imperial-card flex flex-col gap-3 p-7"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus">
                {e.period}
              </span>
              <div>
                <h3 className="font-serif text-xl leading-tight text-ivory">
                  {e.course}
                </h3>
                <p className="mt-1 text-sm text-silver">{e.institution}</p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                {e.location}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
