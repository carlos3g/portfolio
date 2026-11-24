import { getLocale, getTranslations } from "next-intl/server";
import { getSkillGroups } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Skills() {
  const locale = (await getLocale()) as Locale;
  const groups = getSkillGroups(locale);
  const t = await getTranslations("skills");

  return (
    <section id="skills" className="section">
      <div className="wrap split">
        <h2 className="section-title">{t("heading")}</h2>
        <div className="grid gap-10">
          {groups.map((g) => (
            <div
              key={g.id}
              className="grid gap-2 min-[561px]:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] min-[561px]:gap-6"
            >
              <h3 className="text-xl font-bold tracking-[-0.02em]">
                {g.label}
              </h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
