import { getLocale, getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand-mark";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

const sections = ["experience", "projects", "skills", "contact"] as const;

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("footer");
  const tNav = await getTranslations("header.links");

  const socials = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "WhatsApp", href: profile.whatsapp },
  ];

  const linkClass = "transition-colors hover:text-accent";

  return (
    <footer className="border-t">
      <div className="wrap grid gap-10 py-14 min-[701px]:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 font-bold tracking-[-0.02em]">
            <BrandMark />
            {profile.name}
          </p>
          <p className="mt-4 max-w-[38ch] text-[15px] text-muted">
            {profile.tagline}
          </p>
        </div>
        <nav aria-label={t("navigate")}>
          <p className="text-[15px] font-semibold">{t("navigate")}</p>
          <ul className="mt-3 grid gap-2 text-[15px] text-muted">
            {sections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {tNav(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[15px] font-semibold">{t("connect")}</p>
          <ul className="mt-3 grid gap-2 text-[15px] text-muted">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t py-6 text-[15px] text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#hero" className={linkClass}>
            {t("toTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
