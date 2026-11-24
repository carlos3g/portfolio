import { Download, Github, Laptop, Linkedin, Mail, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SystemsMap } from "@/components/systems-map";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/portfolio-data";
import { getSystemsMap } from "@/lib/systems-map";
import type { Locale } from "@/i18n/routing";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const profile = getProfile(locale);
  const t = await getTranslations("hero");
  const tMap = await getTranslations("map");

  const socials = [
    { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    { label: "GitHub", href: profile.github, icon: Github },
    { label: t("email"), href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <section id="hero" className="relative isolate -mt-[73px] pt-[73px]">
      <div className="aurora" aria-hidden="true" />
      <div className="wrap grid items-center gap-14 pb-20 pt-12 min-[561px]:pt-16 min-[1081px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[1081px]:gap-12 min-[1081px]:pb-28 min-[1081px]:pt-20">
        <div>
          <p
            className="enter inline-flex items-center gap-2.5 rounded-full border bg-surface py-1.5 pl-3 pr-4 text-sm font-medium shadow-card"
            style={step(0)}
          >
            <span className="relative grid h-2.5 w-2.5 place-items-center">
              <span className="halo absolute inset-0 rounded-full bg-[#1fb486]" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#1fb486]" />
            </span>
            {t("status")}
          </p>
          <h1
            className="enter mt-7 text-[clamp(3.5rem,7vw,5.75rem)] font-extrabold leading-[0.95] tracking-[-0.05em]"
            style={step(1)}
          >
            Carlos <br />
            Mesquita
          </h1>
          <p
            className="enter mt-5 text-[1.375rem] font-semibold tracking-[-0.02em] text-accent"
            style={step(2)}
          >
            {profile.title}
          </p>
          <ul
            className="enter mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[15px] text-muted"
            style={step(3)}
          >
            <li className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("based")}
            </li>
            <li className="flex items-center gap-1.5">
              <Laptop className="h-4 w-4 text-accent" aria-hidden="true" />
              {t("modality")}
            </li>
          </ul>
          <p
            className="enter mt-6 max-w-[40ch] text-xl leading-normal text-muted"
            style={step(4)}
          >
            {profile.tagline}
          </p>
          <div
            className="enter mt-9 flex flex-wrap items-center gap-3"
            style={step(5)}
          >
            <Button asChild>
              <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                <Download className="h-[18px] w-[18px]" aria-hidden="true" />
                {t("ctaCv")}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">{t("ctaContact")}</a>
            </Button>
            <ul className="-ml-3 flex basis-full min-[561px]:mt-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className="icon-button"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="enter min-w-0" style={step(4)}>
          <SystemsMap
            data={getSystemsMap(locale)}
            title={tMap("title")}
            subtitle={tMap("subtitle")}
            label={tMap("label")}
          />
        </div>
      </div>
    </section>
  );
}
