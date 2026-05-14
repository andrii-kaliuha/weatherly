const GEO_CACHE_KEY = "weatherly_geo_cache";
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface GeoCache {
  lat: number;
  lon: number;
  cityName: string;
  timestamp: number;
}

export function saveGeoCache(lat: number, lon: number, cityName: string): void {
  const data: GeoCache = { lat, lon, cityName, timestamp: Date.now() };
  localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(data));
}

export function loadGeoCache(): Omit<GeoCache, "timestamp"> | null {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const data: GeoCache = JSON.parse(raw);
    if (Date.now() - data.timestamp > GEO_CACHE_TTL) {
      localStorage.removeItem(GEO_CACHE_KEY);
      return null;
    }
    return { lat: data.lat, lon: data.lon, cityName: data.cityName };
  } catch {
    return null;
  }
}

export function clearGeoCache(): void {
  localStorage.removeItem(GEO_CACHE_KEY);
}
