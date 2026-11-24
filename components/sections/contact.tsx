import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { CopyEmail } from "@/components/copy-email";
import { SectionHeading } from "@/components/section-heading";
import { getProfile } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export async function Contact() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("contact");

  const channels = [
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", href: profile.github, icon: Github },
    { label: "WhatsApp", href: profile.whatsapp, icon: MessageCircle },
    { label: t("cv"), href: profile.cvUrl, icon: FileText },
  ];

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="on-deep overflow-hidden rounded-[32px] p-7 min-[561px]:p-12 min-[1081px]:p-16">
          <div className="grid gap-12 min-[1081px]:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] min-[1081px]:gap-16">
            <div className="min-w-0">
              <SectionHeading
                eyebrow={t("eyebrow")}
                title={t("heading")}
                subtitle={t("subtitle")}
              />
              <div className="mt-12">
                <CopyEmail email={profile.email} />
              </div>
            </div>
            <ul className="grid content-end gap-3">
              {channels.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="channel flex items-center gap-4 rounded-[20px] border bg-surface p-4 font-semibold transition-colors hover:border-line-strong hover:bg-raised"
                  >
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {label}
                    <ArrowUpRight
                      className="arrow ml-auto h-5 w-5 text-muted"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
