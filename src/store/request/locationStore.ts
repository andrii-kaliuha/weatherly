import { makeAutoObservable } from "mobx";
import { loadGeoCache } from "../../shared/utils/storage/locationCache";

class LocationStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getLocationByGPS(): Promise<{ latitude: number; longitude: number }> {
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

  async getLocationByIP(): Promise<{ latitude: number; longitude: number }> {
    const res = await fetch("/api/weather?endpoint=autoip");
    const location = await res.json();
    if (!location.latitude) throw new Error("ip_geolocation_failed");
    return { latitude: location.latitude, longitude: location.longitude };
  }

  getLocationByCache(): { latitude: number; longitude: number } | null {
    const cached = loadGeoCache();
    if (cached === null) return null;
    return { latitude: cached.lat, longitude: cached.lon };
  }
}

export default new LocationStore();
