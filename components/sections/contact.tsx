import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Monogram } from "@/components/ornaments/monogram";
import { Divider } from "@/components/ornaments/divider";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Contact() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("contact");

  const channels = [
    {
      label: t("channels.email"),
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: t("channels.github"),
      value: "github.com/carlos3g",
      href: profile.github,
      icon: Github,
    },
    {
      label: t("channels.linkedin"),
      value: "linkedin.com/in/carlos3g",
      href: profile.linkedin,
      icon: Linkedin,
    },
    {
      label: t("channels.whatsapp"),
      value: profile.phone,
      href: profile.whatsapp,
      icon: MessageCircle,
    },
  ];

  return (
    <section id="contact" className="relative py-32">
      <Divider ornament />
      <div className="container">
        <div className="relative overflow-hidden rounded-sm border border-magnus/25 bg-charcoal/70 p-10 shadow-imperial sm:p-16">
          <div
            className="pointer-events-none absolute -top-20 right-0 h-64 w-64 opacity-20"
            aria-hidden="true"
          >
            <Monogram className="h-full w-full" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="eyebrow mb-6">
                <span>{t("eyebrow")}</span>
              </div>
              <h2 className="font-serif text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
                {t("headingLine1")}<br />
                <span className="gold-text">{t("headingLine2")}</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-silver">
                {t("subtitle")}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href={`mailto:${profile.email}`}>
                    {t("ctaEmail")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <a
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("ctaCv")}
                  </a>
                </Button>
              </div>
            </div>

            <ul className="grid gap-3">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 border border-magnus/15 bg-obsidian/40 p-5 transition-all hover:border-magnus/50 hover:bg-obsidian/70"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-9 w-9 items-center justify-center border border-magnus/25 text-magnus transition-colors group-hover:bg-magnus group-hover:text-obsidian">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-frost">
                            {c.label}
                          </p>
                          <p className="font-serif text-lg text-ivory">
                            {c.value}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-frost transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magnus" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
