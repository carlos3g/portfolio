import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeBoot } from "@/components/theme-boot";
import { THEME_STORAGE_KEY } from "@/lib/theme-storage";
import { SITE_URL } from "@/lib/site";
import { getStructuredData } from "@/lib/structured-data";
import { routing } from "@/i18n/routing";
import "../globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "metadata" });

  const canonicalPath =
    safeLocale === routing.defaultLocale ? "/" : `/${safeLocale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    authors: [{ name: "Carlos Mesquita", url: SITE_URL }],
    creator: "Carlos Mesquita",
    alternates: {
      canonical: canonicalPath,
      languages: {
        pt: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      url: canonicalPath,
      siteName: "Carlos Mesquita",
      locale: safeLocale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: safeLocale === "pt" ? "en_US" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

const themeBootScript = `(()=>{try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=='light'&&t!=='dark')t='dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getStructuredData(locale)),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} noise-overlay`}
      >
        <NextIntlClientProvider>
          <ThemeBoot />
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId="G-MVVG4R41HS" />
    </html>
  );
}
