"use client";

import { Globe } from "lucide-react";
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
      className="icon-button !h-10 !w-auto !grid-flow-col gap-1.5 px-2.5 text-sm font-semibold"
    >
      <Globe className="hidden h-[17px] w-[17px] min-[561px]:block" aria-hidden="true" />
      {t("short")}
    </Link>
  );
}
