import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const theme = searchParams.get("theme") || "light";

  const isDark = theme === "dark";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        fontSize: 60,
        color: isDark ? "#ffffff" : "#000000",
        background: isDark ? "#1e1e1e" : "#ffffff",
        width: "100%",
        height: "100%",
        padding: "50px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>👋 Привіт! Тема прев'ю:</span>
      <b style={{ marginTop: 20, color: "#3b82f6" }}>{theme.toUpperCase()}</b>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
