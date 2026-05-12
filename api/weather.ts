import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://api.openweathermap.org";

const ENDPOINTS: Record<string, string> = {
  forecast: "data/3.0/onecall",
  air: "data/2.5/air_pollution",
  geocoding: "geo/1.0/direct",
  reverse: "geo/1.0/reverse",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API key not configured" });

  const { endpoint, ...params } = req.query;
  const path = ENDPOINTS[endpoint as string];
  if (!path) return res.status(400).json({ error: "Unknown endpoint" });

  const qs = new URLSearchParams({ ...(params as Record<string, string>), appid: API_KEY });
  const url = `${BASE}/${path}?${qs}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: "Upstream request failed" });
  }
}
