import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://api.openweathermap.org";

const ENDPOINTS: Record<string, string> = {
  forecast: "data/3.0/onecall",
  air: "data/2.5/air_pollution",
  geocoding: "geo/1.0/direct",
  reverse: "geo/1.0/reverse",
};

const CACHE_TTL: Record<string, number> = {
  forecast: 60 * 10, // 10 minutes
  air: 60 * 10,
  geocoding: 60 * 60 * 24 * 30,
  reverse: 60 * 60 * 24 * 30, // 30 days
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API key not configured" });

  const { endpoint, ...params } = req.query;

  if (endpoint === "autoip") {
    const vLat = req.headers["x-vercel-ip-latitude"];
    const vLon = req.headers["x-vercel-ip-longitude"];

    if (vLat && vLon) {
      res.setHeader("Cache-Control", "no-store");
      return res.json({
        latitude: parseFloat(vLat as string),
        longitude: parseFloat(vLon as string),
      });
    }

    // Fallback for local development
    return res.json({
      latitude: 50.4501,
      longitude: 30.5234,
    });
  }

  const path = ENDPOINTS[endpoint as string];
  if (!path) return res.status(400).json({ error: "Unknown endpoint" });

  const qs = new URLSearchParams({ ...(params as Record<string, string>), appid: API_KEY });
  const url = `${BASE}/${path}?${qs}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const ttl = CACHE_TTL[endpoint as string] ?? 60 * 10;
    res.setHeader("Cache-Control", `public, s-maxage=${ttl}, stale-while-revalidate=${ttl * 2}`);

    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: "Upstream request failed" });
  }
}
