import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/google-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const bold = await loadGoogleFont("Schibsted Grotesk", 800);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F6821F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2B1300",
          fontSize: 92,
          fontWeight: 800,
          fontFamily: "Schibsted Grotesk",
          letterSpacing: -5,
          paddingBottom: 18,
          paddingRight: 5,
        }}
      >
        cm
      </div>
    ),
    {
      ...size,
      fonts: [
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
