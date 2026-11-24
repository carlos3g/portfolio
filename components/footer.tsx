import { getLocale, getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("footer");

  return (
    <footer className="border-t bg-surface">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-7 text-[15px] text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#hero" className="underline-offset-4 hover:text-ink hover:underline">
          {t("toTop")}
        </a>
      </div>
    </footer>
  );
}
