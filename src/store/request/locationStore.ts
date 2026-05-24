import { makeAutoObservable, runInAction } from "mobx";
import { saveGeoCache, loadGeoCache } from "../../shared/utils/storage/locationCache";
import geocodingStore from "./geocodingStore";

type PendingGpsLocation = {
  lat: number;
  lon: number;
  cityName: string;
};

class LocationStore {
  pendingGpsLocation: PendingGpsLocation | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPendingGpsLocation(data: PendingGpsLocation | null) {
    this.pendingGpsLocation = data;
  }

  dismissGpsLocation() {
    this.setPendingGpsLocation(null);
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    if (!navigator.geolocation) {
      throw new Error("geolocation_not_supported");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => {
          const msgs: Record<number, string> = { 1: "permission_denied", 2: "unavailable", 3: "timeout" };
          reject(new Error(msgs[err.code] || "generic_error"));
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 },
      );
    });
  }

  // IP
  async getLocationByIP(): Promise<{ latitude: number; longitude: number }> {
    const res = await fetch("/api/weather?endpoint=autoip");
    const data = await res.json();
    if (!data.latitude) throw new Error("ip_geolocation_failed");
    return { latitude: data.latitude, longitude: data.longitude };
  }

  // Повертає кеш або IP
  async getFastLocation(): Promise<{ latitude: number; longitude: number; fromCache: boolean }> {
    const cached = loadGeoCache();
    if (cached) {
      return { latitude: cached.lat, longitude: cached.lon, fromCache: true };
    }
    const { latitude, longitude } = await this.getLocationByIP();
    return { latitude, longitude, fromCache: false };
  }

  // GPS фоново — порівнює з поточним містом і показує модалку якщо інше
  async startGpsRefinement(currentCityName: string) {
    try {
      const { latitude, longitude } = await this.getCurrentLocation();
      const local_names = await geocodingStore.getCityNameByCoordinates(latitude, longitude);
      const gpsCityName = local_names?.uk || local_names?.en || Object.values(local_names)[0];

      if (gpsCityName && gpsCityName !== currentCityName) {
        runInAction(() => {
          this.setPendingGpsLocation({ lat: latitude, lon: longitude, cityName: gpsCityName });
        });
      } else {
        const cityName = local_names?.uk || local_names?.en || Object.values(local_names)[0];
        saveGeoCache(latitude, longitude, cityName);
      }
    } catch {}
  }
}

export default new LocationStore();
