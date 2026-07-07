import { makeAutoObservable } from "mobx";
import { loadGeoCache } from "../../shared/utils/storage/locationCache";
import geocodingStore from "./geocodingStore";

class LocationStore {
  constructor() {
    makeAutoObservable(this);
  }

  async prefetchByIP(): Promise<{ lat: number; lon: number; city: string } | null> {
    try {
      const { latitude, longitude } = await this.getLocationByIP();
      const local_names = await geocodingStore.getCityNameByCoordinates(latitude, longitude);
      const cityName = local_names?.uk || local_names?.en || Object.values(local_names)[0] || "";

      return {
        lat: latitude,
        lon: longitude,
        city: cityName,
      };
    } catch {
      return null;
    }
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
    if (!cached) return null;
    return { latitude: cached.lat, longitude: cached.lon };
  }
}

export default new LocationStore();
