import { ArrowDownRight, FileDown, Sparkles } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Monogram } from "@/components/ornaments/monogram";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("hero");
  const yearsActive = new Date().getFullYear() - 2020;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-laurel-radial blur-2xl" />
      </div>

      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="container relative grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl animate-fade-up">
          <div className="eyebrow mb-8">
            <span>{profile.handle} · {profile.title}</span>
          </div>

          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-[7.5rem]">
            <span className="block text-ivory/95">Carlos</span>
            <span className="gold-text block">Mesquita</span>
          </h1>

          <div className="mt-10 flex items-start gap-4">
            <span
              className="mt-2 inline-block h-px w-10 shrink-0 bg-magnus/70"
              aria-hidden="true"
            />
            <p className="max-w-xl text-balance text-base leading-relaxed text-silver sm:text-lg">
              {profile.tagline}
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <a href="#projects">
                {t("ctaProjects")} <ArrowDownRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                {t("ctaCv")} <FileDown className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-magnus/10 pt-8 text-xs">
            <Metric label={t("metrics.yearsCoding")} value={`${yearsActive}+`} />
            <Metric label={t("metrics.companies")} value="3" />
            <Metric label={t("metrics.stacks")} value="TS · PHP" />
            <Metric label={t("metrics.cloud")} value="AWS" />
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <div className="relative animate-slow-pulse">
            <Monogram className="h-56 w-56 drop-shadow-[0_0_40px_rgba(198,167,94,0.25)]" />
            <span className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-magnus/40 md:block">
              carlos3g · dev
            </span>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-frost transition-colors hover:text-magnus md:flex"
      >
        <Sparkles className="h-3 w-3" />
        <span className="font-mono text-[9px] uppercase tracking-[0.4em]">
          {t("continue")}
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-magnus/60 to-transparent" />
      </a>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-2xl text-magnus">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-frost">
        {label}
      </span>
    </div>
  );
}
