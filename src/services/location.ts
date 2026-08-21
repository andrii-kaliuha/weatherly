import { loadGeoCache } from "./storage/locationCache";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function getLocationByGPS(): Promise<Coordinates> {
  if (!navigator.geolocation) {
    throw new Error("geolocation_not_supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => {
        const messages: Record<number, string> = {
          1: "geolocation_permission_denied",
          2: "geolocation_unavailable",
          3: "geolocation_timeout",
        };
        reject(new Error(messages[error.code] || "generic_error"));
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 },
    );
  });
}

export async function getLocationByIP(): Promise<Coordinates> {
  const res = await fetch("/api/weather?endpoint=autoip");
  if (!res.ok) throw new Error("ip_geolocation_failed");

  const location = await res.json();
  if (!location.latitude) throw new Error("ip_geolocation_failed");

  return { latitude: location.latitude, longitude: location.longitude };
}

export function getLocationByCache(): Coordinates | null {
  const cached = loadGeoCache();
  if (!cached) return null;
  return { latitude: cached.lat, longitude: cached.lon };
}
