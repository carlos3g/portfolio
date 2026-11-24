import { getLocale, getTranslations } from "next-intl/server";
import { CopyEmail } from "@/components/copy-email";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Contact() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("contact");

  const channels = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "WhatsApp", href: profile.whatsapp },
    { label: t("cv"), href: profile.cvUrl },
  ];

  return (
    <section id="contact" className="section bg-surface">
      <div className="wrap split">
        <div>
          <h2 className="section-title">{t("heading")}</h2>
          <p className="mt-4 max-w-[34ch] text-muted">{t("subtitle")}</p>
        </div>
        <div className="min-w-0">
          <CopyEmail email={profile.email} />
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {channels.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
