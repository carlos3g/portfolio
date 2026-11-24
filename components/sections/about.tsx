import { getLocale, getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

const facts = ["based", "modality", "available"] as const;

export async function About() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("about");

  return (
    <section id="about" className="section">
      <div className="wrap split">
        <h2 className="section-title">{t("heading")}</h2>
        <div>
          <p className="max-w-[62ch] text-xl leading-relaxed">
            {profile.summary}
          </p>
          <dl className="mt-10 grid gap-6 min-[561px]:grid-cols-3">
            {facts.map((f) => (
              <div key={f}>
                <dt className="text-[15px] text-muted">{t(`facts.${f}`)}</dt>
                <dd className="font-semibold">{t(`facts.${f}Value`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
