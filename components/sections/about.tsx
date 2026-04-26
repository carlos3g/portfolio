import { getLocale, getTranslations } from "next-intl/server";
import { Divider } from "@/components/ornaments/divider";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function About() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("about");

  return (
    <section id="about" className="relative py-32">
      <Divider ornament />
      <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="eyebrow mb-6">
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            {t("headingLine1")}<br />
            <span className="gold-text">{t("headingLine2")}</span>
          </h2>
        </div>

        <div className="space-y-6 border-l border-magnus/20 pl-8 text-lg leading-relaxed text-silver">
          <p>{profile.summary}</p>
          <p className="text-frost">{profile.focus}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Fact label={t("facts.current")} value={t("facts.currentValue")} />
            <Fact label={t("facts.based")} value={t("facts.basedValue")} />
            <Fact label={t("facts.modality")} value={t("facts.modalityValue")} />
            <Fact label={t("facts.available")} value={t("facts.availableValue")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-magnus/15 pt-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-magnus/70">
        {label}
      </p>
      <p className="mt-1 font-serif text-base text-ivory">{value}</p>
    </div>
  );
}
