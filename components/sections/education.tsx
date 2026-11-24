import { getLocale, getTranslations } from "next-intl/server";
import { getEducation } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Education() {
  const locale = (await getLocale()) as Locale;
  const education = getEducation(locale);
  const t = await getTranslations("education");

  return (
    <section id="education" className="section">
      <div className="wrap split">
        <h2 className="section-title">{t("heading")}</h2>
        <ul className="grid gap-8">
          {education.map((e) => (
            <li key={e.id}>
              <h3 className="text-xl font-bold leading-snug tracking-[-0.02em]">
                {e.course}
              </h3>
              <p className="text-muted">
                {e.institution}, {e.location}
              </p>
              <p className="text-[15px] text-muted">{e.period}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
