import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { loadGoogleFont } from "@/lib/google-font";
import { getProfile } from "@/lib/portfolio-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Language-neutral: the same alt is served for every locale.
export const alt = "Carlos Mesquita";
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  setRequestLocale(safeLocale);
  const t = await getTranslations({
    locale: safeLocale,
    namespace: "metadata",
  });

  const profile = getProfile(safeLocale);

  const [regular, bold] = await Promise.all([
    loadGoogleFont("Schibsted Grotesk", 500),
    loadGoogleFont("Schibsted Grotesk", 800),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FEFDFC",
          backgroundImage:
            "linear-gradient(115deg, rgba(254,253,252,1) 48%, rgba(255,226,196,1) 76%, rgba(246,130,31,1) 118%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "Schibsted Grotesk",
          fontWeight: 500,
          color: "#1D1713",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#635A53" }}>
          carlos3g.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 152,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -7,
            }}
          >
            <span>Carlos</span>
            <span>Mesquita</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 36,
              fontWeight: 800,
              color: "#AD4A00",
            }}
          >
            {profile.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontSize: 30,
              color: "#635A53",
            }}
          >
            {t("ogDescription")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Schibsted Grotesk",
          data: regular,
          weight: 500,
          style: "normal",
        },
        {
          name: "Schibsted Grotesk",
          data: bold,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
