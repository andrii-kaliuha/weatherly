const WEATHER_CACHE_KEY = "weatherly_weather_cache";
const WEATHER_CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const MAX_CACHED_CITIES = 5;

interface WeatherCacheItem {
  town: {
    name: string;
    lat: number;
    lon: number;
  };
  forecast: any;
  airQuality: any;
  local_names: Record<string, string>;
  timestamp: number;
}

function loadCache(): WeatherCacheItem[] {
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCache(items: WeatherCacheItem[]): void {
  localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(items));
}

function isExpired(item: WeatherCacheItem): boolean {
  return Date.now() - item.timestamp > WEATHER_CACHE_TTL;
}

// Округлення координат для порівняння (~1км)
function roundCoord(n: number): number {
  return parseFloat(n.toFixed(2));
}

export function getWeatherCacheByCity(cityName: string): WeatherCacheItem | null {
  const cache = loadCache();
  const item = cache.find((c) => c.town.name.toLowerCase() === cityName.toLowerCase());
  if (!item || isExpired(item)) return null;
  return item;
}

export function getWeatherCacheByCoords(lat: number, lon: number): WeatherCacheItem | null {
  const cache = loadCache();
  const item = cache.find((c) => roundCoord(c.town.lat) === roundCoord(lat) && roundCoord(c.town.lon) === roundCoord(lon));
  if (!item || isExpired(item)) return null;
  return item;
}

export function saveWeatherCache(
  town: { name: string; lat: number; lon: number },
  forecast: any,
  airQuality: any,
  local_names: Record<string, string>,
): void {
  const cache = loadCache();

  // Видаляємо старий запис якщо є (по координатах)
  const filtered = cache.filter((c) => roundCoord(c.town.lat) !== roundCoord(town.lat) || roundCoord(c.town.lon) !== roundCoord(town.lon));

  // Додаємо свіжий на початок, обрізаємо до MAX
  const updated: WeatherCacheItem[] = [{ town, forecast, airQuality, local_names, timestamp: Date.now() }, ...filtered].slice(
    0,
    MAX_CACHED_CITIES,
  );

  saveCache(updated);
}

export function clearWeatherCache(): void {
  localStorage.removeItem(WEATHER_CACHE_KEY);
}
