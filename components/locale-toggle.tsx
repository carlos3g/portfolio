"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function LocaleToggle({ className }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("localeToggle");
  const router = useRouter();
  const pathname = usePathname();

  const next: Locale = locale === "pt" ? "en" : "pt";

  const handleClick = () => {
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("label")}
      title={t("label")}
      className={cn(
        "group inline-flex h-9 items-center gap-2 border border-magnus/30 bg-obsidian/40 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-magnus transition-all hover:bg-magnus hover:text-obsidian",
        className
      )}
    >
      <span aria-hidden="true">
        <span className={locale === "pt" ? "" : "opacity-40"}>
          {t("pt")}
        </span>
        <span className="mx-1 opacity-40">/</span>
        <span className={locale === "en" ? "" : "opacity-40"}>
          {t("en")}
        </span>
      </span>
    </button>
  );
}
