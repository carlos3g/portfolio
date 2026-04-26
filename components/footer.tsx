import { getLocale, getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-magnus/15 bg-obsidian">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-magnus/40 text-[10px] font-bold text-magnus">
            cm
          </span>
          <div>
            <p className="font-serif text-sm text-ivory">
              Carlos <span className="text-magnus">Mesquita</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
              {profile.title}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
          <span>© {year}</span>
          <span className="h-px w-6 bg-magnus/40" />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-magnus"
          >
            {t("github")}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-magnus"
          >
            {t("linkedin")}
          </a>
          <a href="#hero" className="transition-colors hover:text-magnus">
            {t("toTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
