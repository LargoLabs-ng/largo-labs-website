import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { services } from "@/content/services";

export const alt = `${site.legalName} — software, platforms and websites`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a1323",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#ffffff" />
            <path d="M10.5 8.5V22.5H24" fill="none" stroke="#0a1323" strokeWidth="3.2" strokeLinecap="square" />
            <rect x="18.5" y="8.5" width="5.5" height="5.5" rx="1" fill="#2fd0bf" />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>Largo Labs</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, maxWidth: 950 }}>
            We build software that does real work.
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#b4bdcd", display: "flex", flexWrap: "wrap", gap: 14 }}>
            {services.map((s) => (
              <span key={s.slug} style={{ display: "flex" }}>
                {s.title.replace(" and Development", "")}
                {s.index !== "05" ? "  ·" : ""}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8a96ad" }}>
          <span>{site.legalName}</span>
          <span style={{ color: "#6fe6d8" }}>Technology company · {site.country}</span>
        </div>
      </div>
    ),
    size,
  );
}
