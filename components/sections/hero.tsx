import { getLocale, getTranslations } from "next-intl/server";
import { SystemsMap } from "@/components/systems-map";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/portfolio-data";
import { getSystemsMap } from "@/lib/systems-map";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("hero");
  const tMap = await getTranslations("map");

  return (
    <section
      id="hero"
      className="wrap grid items-center gap-10 pb-16 pt-11 min-[561px]:gap-12 min-[561px]:pb-20 min-[561px]:pt-16 min-[1081px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[1081px]:gap-[72px] min-[1081px]:pb-[104px] min-[1081px]:pt-[84px]"
    >
      <div>
        <h1 className="text-[clamp(3.25rem,6.6vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Carlos <br />
          Mesquita
        </h1>
        <p className="mt-5 text-[21px] font-semibold text-accent">
          {profile.title}
        </p>
        <p className="mt-4 max-w-[46ch] text-xl leading-normal text-muted min-[1081px]:max-w-[32ch]">
          {profile.tagline}
        </p>
        <div className="mt-[34px] flex flex-wrap gap-3">
          <Button asChild>
            <a href={profile.cvUrl} target="_blank" rel="noreferrer">
              {t("ctaCv")}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">{t("ctaContact")}</a>
          </Button>
        </div>
      </div>
      <SystemsMap
        data={getSystemsMap(locale)}
        title={tMap("title")}
        subtitle={tMap("subtitle")}
        label={tMap("label")}
      />
    </section>
  );
}
