import { GraduationCap, HeartHandshake } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { getEducation, getVolunteer } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Education() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("education");

  const items = [
    ...getEducation(locale).map((e) => ({
      id: e.id,
      icon: GraduationCap,
      title: e.course,
      detail: `${e.institution}, ${e.location}`,
      meta: e.period,
    })),
    ...getVolunteer(locale).map((v) => ({
      id: v.id,
      icon: HeartHandshake,
      title: `${v.role}, ${v.company}`,
      detail: v.highlights[0].text,
      meta: t("volunteer"),
    })),
  ];

  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} />
        <ul className="mt-14 grid gap-5 min-[861px]:grid-cols-3">
          {items.map(({ id, icon: Icon, title, detail, meta }) => (
            <li key={id} className="reveal">
              <div className="card card-hover flex h-full flex-col p-7">
                <span className="icon-tile">
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold leading-snug tracking-[-0.025em]">
                  {title}
                </h3>
                <p className="mt-2 text-muted">{detail}</p>
                <p className="mt-auto pt-5 text-[15px] text-muted">{meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
