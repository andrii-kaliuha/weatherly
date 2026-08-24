import { AirPollutionResponse, WeatherResponse } from "../../shared/types/api";

const WEATHER_CACHE_KEY = "weather_cache";
const WEATHER_CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const MAX_CACHED_CITIES = 5;

type WeatherCacheItem = {
  city: {
    name: string;
    lat: number;
    lon: number;
  };
  forecast: WeatherResponse;
  airQuality: AirPollutionResponse;
  local_names: Record<string, string>;
  timestamp: number;
};

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

function roundCoord(n: number): number {
  return parseFloat(n.toFixed(2));
}

export function getWeatherCacheByCity(cityName: string): WeatherCacheItem | null {
  const cache = loadCache();
  const item = cache.find((c) => c.city.name.toLowerCase() === cityName.toLowerCase());
  if (!item || isExpired(item)) return null;
  return item;
}

export function getWeatherCacheByCoords(lat: number, lon: number): WeatherCacheItem | null {
  const cache = loadCache();
  const item = cache.find((c) => roundCoord(c.city.lat) === roundCoord(lat) && roundCoord(c.city.lon) === roundCoord(lon));
  if (!item || isExpired(item)) return null;
  return item;
}

export function saveWeatherCache(
  city: { name: string; lat: number; lon: number },
  forecast: WeatherResponse,
  airQuality: AirPollutionResponse,
  local_names: Record<string, string>,
): void {
  const cache = loadCache();
  const filtered = cache.filter((c) => roundCoord(c.city.lat) !== roundCoord(city.lat) || roundCoord(c.city.lon) !== roundCoord(city.lon));
  const updated: WeatherCacheItem[] = [{ city, forecast, airQuality, local_names, timestamp: Date.now() }, ...filtered].slice(
    0,
    MAX_CACHED_CITIES,
  );

  saveCache(updated);
}
