import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C6A75E",
          fontSize: 108,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: -4,
        }}
      >
        cm
      </div>
    ),
    size
  );
}
