import { makeAutoObservable, runInAction } from "mobx";
import { cityValidation } from "../shared/utils/cityValidation";
import { saveGeoCache } from "../services/storage/locationCache";
import { saveToSearchHistory } from "../services/storage/searchHistory";
import { getCityCoordinates, getCityNameByCoordinates } from "../services/geocoding";
import { getLocationByCache, getLocationByGPS, getLocationByIP } from "../services/location";
import { getWeatherCacheByCity, getWeatherCacheByCoords, saveWeatherCache } from "../services/storage/weatherCache";
import { AirPollutionResponse, WeatherResponse } from "../shared/types/api";

export const getErrorKey = (error: unknown): string => {
  if (error instanceof TypeError) return "failed_to_fetch";
  if (error instanceof Error) return error.message;
  return "generic_error";
};

class RequestStore {
  forecast: WeatherResponse | null = null;
  airQuality: AirPollutionResponse | null = null;
  local_names: Record<string, string> | null = null;

  fastLocation: { local_names: { uk: string; en: string }; lat: number; lon: number } | null = null;
  startScreen: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hideStartScreen() {
    this.startScreen = false;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  addError(message: string) {
    this.error = message;
  }

  clearError() {
    this.error = null;
  }

  validateCity(city: string): boolean {
    const { isValid, error } = cityValidation(city);
    if (!isValid && error) {
      this.addError(error);
      return false;
    }
    this.clearError();
    return true;
  }

  private async getWeatherForecast(lat: number, lon: number) {
    const res = await fetch(`/api/weather?endpoint=forecast&lat=${lat}&lon=${lon}`);
    return res.json();
  }

  private async getAirQuality(lat: number, lon: number) {
    const res = await fetch(`/api/weather?endpoint=air&lat=${lat}&lon=${lon}`);
    return res.json();
  }

  updateForecast(forecast: WeatherResponse, airQuality: AirPollutionResponse, local_names: Record<string, string>) {
    this.forecast = forecast;
    this.airQuality = airQuality;
    this.local_names = local_names;
  }

  async initFastLocation() {
    if (getLocationByCache()) return;

    try {
      const { latitude, longitude } = await getLocationByIP();
      const names = await getCityNameByCoordinates(latitude, longitude);

      runInAction(() => {
        this.fastLocation = { lat: latitude, lon: longitude, local_names: { uk: names?.uk, en: names?.en } };
      });
    } catch (error) {
      console.error("Failed to initialize IP fast location:", error);
    }
  }

  async confirmFastLocation() {
    if (this.fastLocation === null) return;
    const { lat, lon } = this.fastLocation;

    runInAction(() => {
      this.setLoading(true);
      this.dismissFastLocation();
      this.clearError();
    });

    try {
      const { local_names, forecast, airQuality } = await this.fetchWeatherByCoords(lat, lon);

      runInAction(() => {
        this.updateForecast(forecast, airQuality, local_names);
        this.clearError();
      });
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  dismissFastLocation() {
    this.fastLocation = null;
  }

  async fetchWeatherByCoords(lat: number, lon: number) {
    const cached = getWeatherCacheByCoords(lat, lon);
    if (cached) {
      return { local_names: cached.local_names, forecast: cached.forecast, airQuality: cached.airQuality };
    }

    const [local_names, forecast, airQuality] = await Promise.all([
      getCityNameByCoordinates(lat, lon),
      this.getWeatherForecast(lat, lon),
      this.getAirQuality(lat, lon),
    ]);

    const cityName = local_names?.en || "Unknown";
    saveWeatherCache({ name: cityName, lat, lon }, forecast, airQuality, local_names);

    return { local_names, forecast, airQuality };
  }

  async fetchForecastByLocation() {
    runInAction(() => {
      this.setLoading(true);
      this.dismissFastLocation();
      this.clearError();
    });

    try {
      const { latitude, longitude } = await getLocationByGPS();
      const { local_names, forecast, airQuality } = await this.fetchWeatherByCoords(latitude, longitude);

      const cityName = local_names?.en || "Unknown";
      saveGeoCache(latitude, longitude, cityName);

      runInAction(() => {
        this.updateForecast(forecast, airQuality, local_names);
        this.clearError();
      });
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async fetchForecastByCityName(city: string) {
    if (!this.validateCity(city)) return;

    runInAction(() => this.setLoading(true));
    try {
      const cached = getWeatherCacheByCity(city);
      if (cached) {
        saveToSearchHistory({ name: city, lat: cached.city.lat, lon: cached.city.lon, local_names: cached.local_names });
        runInAction(() => {
          this.updateForecast(cached.forecast, cached.airQuality, cached.local_names);
          this.clearError();
        });
        return;
      }

      const { latitude, longitude, local_names } = await getCityCoordinates(city);
      const { forecast, airQuality } = await this.fetchWeatherByCoords(latitude, longitude);

      saveToSearchHistory({ name: city, lat: latitude, lon: longitude, local_names });

      runInAction(() => {
        this.updateForecast(forecast, airQuality, local_names);
        this.clearError();
      });
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async fetchForecastByHistory(item: { name: string; lat: number; lon: number }) {
    runInAction(() => {
      this.setLoading(true);
      this.dismissFastLocation();
      this.clearError();
    });

    try {
      const { local_names, forecast, airQuality } = await this.fetchWeatherByCoords(item.lat, item.lon);
      saveToSearchHistory({ name: item.name, lat: item.lat, lon: item.lon, local_names });

      runInAction(() => {
        this.updateForecast(forecast, airQuality, local_names);
        this.clearError();
      });
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }
}

export default new RequestStore();
