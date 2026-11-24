import { Blocks, FlaskConical, ServerCog, type LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { getSkillGroups } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const icons: Record<string, LucideIcon> = {
  build: Blocks,
  operate: ServerCog,
  test: FlaskConical,
};

export async function Skills() {
  const locale = (await getLocale()) as Locale;
  const groups = getSkillGroups(locale);
  const t = await getTranslations("skills");

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} />
        <div className="reveal card mt-14 grid gap-px overflow-hidden !bg-line min-[861px]:grid-cols-2">
          {groups.map((g, i) => {
            const Icon = icons[g.id] ?? Blocks;
            return (
              <div
                key={g.id}
                className={cn(
                  "bg-surface p-7 min-[561px]:p-9",
                  i === 0 && "col-span-full"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="icon-tile">
                    <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                  </span>
                  <h3 className="text-[1.375rem] font-bold tracking-[-0.025em]">
                    {g.label}
                  </h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="chip !px-3.5 !py-1.5 !text-[15px] transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
