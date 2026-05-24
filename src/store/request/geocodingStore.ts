import { makeAutoObservable } from "mobx";

class GeocodingStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getCityCoordinates(city: string): Promise<{ latitude: number; longitude: number; local_names: Record<string, string> }> {
    const response = await fetch(`/api/weather?endpoint=geocoding&q=${encodeURIComponent(city)}&limit=1`);
    const coordinates = await response.json();
    if (!coordinates.length) throw new Error("city_not_found");
    const { lat: latitude, lon: longitude, local_names } = coordinates[0];
    return { latitude, longitude, local_names };
  }

  async getCityNameByCoordinates(lat: number, lon: number): Promise<Record<string, string>> {
    const response = await fetch(`/api/weather?endpoint=reverse&lat=${lat}&lon=${lon}&limit=1`);
    const data = await response.json();
    if (!data.length) throw new Error("city_not_found");
    return data[0].local_names;
  }
}

export default new GeocodingStore();
