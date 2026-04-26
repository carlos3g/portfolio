import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Carlos Mesquita — Fullstack Developer";
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src:\s*url\((.+?)\)\s*format/);
  if (!match) throw new Error(`Could not resolve font ${family}@${weight}`);
  const fontUrl = match[1].replace(/['"]/g, "");
  const response = await fetch(fontUrl);
  if (!response.ok) throw new Error(`Failed to load font ${family}@${weight}`);
  return await response.arrayBuffer();
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

  const [fraunces400, fraunces700, jakarta500] = await Promise.all([
    loadGoogleFont("Fraunces", 400),
    loadGoogleFont("Fraunces", 700),
    loadGoogleFont("Plus Jakarta Sans", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0D",
          backgroundImage:
            "radial-gradient(ellipse at 15% 0%, rgba(198,167,94,0.14), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(122,28,28,0.1), transparent 55%)",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          fontFamily: "Plus Jakarta Sans",
          color: "#E8E6E3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#0B0B0D",
              border: "1.5px solid rgba(198,167,94,0.55)",
              color: "#C6A75E",
              fontFamily: "Fraunces",
              fontWeight: 700,
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: -1,
            }}
          >
            cm
          </div>
          <div
            style={{
              color: "#8A9197",
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontWeight: 500,
              display: "flex",
            }}
          >
            carlos3g · dev
          </div>
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 168,
              fontWeight: 400,
              lineHeight: 0.95,
              color: "#E8E6E3",
            }}
          >
            Carlos
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 168,
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#C6A75E",
              letterSpacing: -2,
            }}
          >
            Mesquita
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            marginTop: 36,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "#C6A75E",
              marginTop: 18,
            }}
          />
          <div
            style={{
              color: "#BFC5C9",
              fontSize: 26,
              lineHeight: 1.4,
              maxWidth: 940,
              fontWeight: 500,
              display: "flex",
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
          name: "Fraunces",
          data: fraunces400,
          weight: 400,
          style: "normal",
        },
        {
          name: "Fraunces",
          data: fraunces700,
          weight: 700,
          style: "normal",
        },
        {
          name: "Plus Jakarta Sans",
          data: jakarta500,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
