import { getLocale, getTranslations } from "next-intl/server";
import { Divider } from "@/components/ornaments/divider";
import { Badge } from "@/components/ui/badge";
import { getSkillGroups } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Skills() {
  const locale = (await getLocale()) as Locale;
  const skillGroups = getSkillGroups(locale);
  const t = await getTranslations("skills");

  return (
    <section id="skills" className="relative py-32">
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
          <p className="mt-6 max-w-xl text-silver">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-magnus/20 bg-magnus/10 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="group relative flex flex-col gap-5 bg-charcoal/80 p-8 transition-colors hover:bg-charcoal"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl text-ivory">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                  {t("itemsLabel", { count: group.items.length })}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="steel">
                    {item}
                  </Badge>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
