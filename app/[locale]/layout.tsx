import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Schibsted_Grotesk } from "next/font/google";
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

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
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

const themeBootScript = `(()=>{var t='light';try{if(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})==='dark')t='dark';}catch(e){}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;})();`;

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
      <body className={sans.variable}>
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
