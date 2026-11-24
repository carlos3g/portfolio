"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LocaleToggle() {
  const locale = useLocale() as Locale;
  const t = useTranslations("localeToggle");
  const pathname = usePathname();
  const next: Locale = locale === "pt" ? "en" : "pt";

  return (
    <Link
      href={pathname}
      locale={next}
      hrefLang={next}
      lang={next}
      aria-label={t("label")}
      title={t("label")}
      className="grid h-10 min-w-10 place-items-center rounded-md text-sm font-semibold text-muted transition-colors hover:bg-soft hover:text-ink"
    >
      {t("short")}
    </Link>
  );
}
