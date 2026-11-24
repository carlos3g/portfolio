import { CreditCard, ServerCog, Waypoints } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

const cards = [
  { id: "endToEnd", icon: Waypoints },
  { id: "payments", icon: CreditCard },
  { id: "reliability", icon: ServerCog },
] as const;

export async function About() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("about");

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="reveal grid gap-8 min-[1081px]:grid-cols-2 min-[1081px]:gap-16">
          <SectionHeading eyebrow={t("eyebrow")} title={t("heading")} />
          <p className="text-[1.1875rem] leading-relaxed text-muted min-[1081px]:pt-10">
            {profile.summary}
          </p>
        </div>
        <ul className="mt-14 grid gap-5 min-[861px]:grid-cols-3">
          {cards.map(({ id, icon: Icon }) => (
            <li key={id} className="reveal">
              <div className="card card-hover h-full p-7">
                <span className="icon-tile">
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.375rem] font-bold tracking-[-0.025em]">
                  {t(`cards.${id}.title`)}
                </h3>
                <p className="mt-2 text-muted">{t(`cards.${id}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
