import { makeAutoObservable, runInAction } from "mobx";

import { currentWeatherStore } from "../forecast/currentWeatherStore";
import { astronomyStore } from "../forecast/astronomyStore";
import { airQualityStore } from "../forecast/airQualityStore";
import { weeklyForecastStore } from "../forecast/weeklyForecastStore";

import { SettingsState } from "../../shared/types/settings";
import { cityValidation } from "../../shared/utils/cityValidation";
import { saveGeoCache } from "../../shared/utils/storage/locationCache";
import { saveToSearchHistory } from "../../shared/utils/storage/searchHistory";
import geocodingStore from "./geocodingStore";
import locationStore from "./locationStore";
import { getWeatherCacheByCity, getWeatherCacheByCoords, saveWeatherCache } from "../../shared/utils/storage/weatherCache";
import { AirPollutionResponse, WeatherResponse } from "../../shared/types/api";

class RequestStore {
  startScreen: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  forecast: WeatherResponse | null = null;
  airQuality: AirPollutionResponse | null = null;
  local_names: Record<string, string> | null = null;

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

  stats: {
    ip: number | null;
    gps: number | null;
    api: number;
    total: number;
    source: "cache" | "ip" | "gps";
  } | null = null;

  setStats(stats: typeof this.stats) {
    this.stats = stats;
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

  updateForecast(forecast: WeatherResponse, airQuality: AirPollutionResponse, local_names: Record<string, string>, settings: SettingsState) {
    currentWeatherStore.updateCurrentWeather(forecast, local_names, settings);
    astronomyStore.updateAstronomy(forecast, settings.format);
    airQualityStore.updateAirQuality(airQuality, local_names, settings.language);
    weeklyForecastStore.updateWeeklyForecast(forecast.daily, settings.language, settings.temperatureUnit);
  }

  async fetchForecastByLocation(settings: SettingsState) {
    this.setLoading(true);
    const totalStart = performance.now();

    try {
      // 1. Кеш або IP
      const ipStart = performance.now();
      const { latitude, longitude, fromCache } = await locationStore.getFastLocation();
      const ipEnd = performance.now();

      // 2. Погода за координатами
      const apiStart = performance.now();
      const local_names = await this.fetchWeatherByCoords(latitude, longitude, settings);
      const apiEnd = performance.now();

      runInAction(() => {
        this.setStats({
          ip: fromCache ? null : ipEnd - ipStart,
          gps: null, // заповниться фоново
          api: apiEnd - apiStart,
          total: apiEnd - totalStart,
          source: fromCache ? "cache" : "ip",
        });
      });

      // 3. GPS фоново — оновлює stats.gps окремо
      const gpsStart = performance.now();
      const currentCityName = local_names?.uk || local_names?.en || Object.values(local_names)[0];

      locationStore.startGpsRefinement(currentCityName).then(() => {
        runInAction(() => {
          if (this.stats) {
            this.stats.gps = performance.now() - gpsStart;
          }
        });
      });
    } catch (error: any) {
      runInAction(() => this.addError(error.message || "geolocation_failed"));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async confirmGpsLocation(settings: SettingsState) {
    if (!locationStore.pendingGpsLocation) return;
    const { lat, lon, cityName } = locationStore.pendingGpsLocation;
    locationStore.dismissGpsLocation();
    saveGeoCache(lat, lon, cityName);

    runInAction(() => this.setLoading(true));
    try {
      await this.fetchWeatherByCoords(lat, lon, settings);
    } catch (error: any) {
      runInAction(() => this.addError(error.message || "generic_error"));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async fetchWeatherByCoords(lat: number, lon: number, settings: SettingsState) {
    // Перевіряємо кеш по координатах
    const cached = getWeatherCacheByCoords(lat, lon);
    if (cached) {
      runInAction(() => {
        this.forecast = cached.forecast;
        this.airQuality = cached.airQuality;
        this.local_names = cached.local_names;
        this.updateForecast(cached.forecast, cached.airQuality, cached.local_names, settings);
        this.clearError();
      });
      return cached.local_names;
    }

    // Кешу немає — запит до API
    const [local_names, forecast, airQuality] = await Promise.all([
      geocodingStore.getCityNameByCoordinates(lat, lon),
      this.getWeatherForecast(lat, lon),
      this.getAirQuality(lat, lon),
    ]);

    const cityName = local_names?.uk || local_names?.en || Object.values(local_names)[0];

    runInAction(() => {
      this.forecast = forecast;
      this.airQuality = airQuality;
      this.local_names = local_names;
      this.updateForecast(forecast, airQuality, local_names, settings);
      this.clearError();
      saveWeatherCache({ name: cityName, lat, lon }, forecast, airQuality, local_names);
    });

    return local_names;
  }

  async fetchForecastByCityName(city: string, settings: SettingsState) {
    if (!this.validateCity(city)) return;

    runInAction(() => this.setLoading(true));
    try {
      // Перевіряємо кеш по назві
      const cached = getWeatherCacheByCity(city);
      if (cached) {
        runInAction(() => {
          this.forecast = cached.forecast;
          this.airQuality = cached.airQuality;
          this.local_names = cached.local_names;
          this.updateForecast(cached.forecast, cached.airQuality, cached.local_names, settings);
          this.clearError();
        });
        return;
      }

      // Кешу немає — запит до API
      const { latitude, longitude, local_names } = await geocodingStore.getCityCoordinates(city);
      const [forecast, airQuality] = await Promise.all([this.getWeatherForecast(latitude, longitude), this.getAirQuality(latitude, longitude)]);

      runInAction(() => {
        this.forecast = forecast;
        this.airQuality = airQuality;
        this.local_names = local_names;
        this.updateForecast(forecast, airQuality, local_names, settings);
        this.clearError();
        saveWeatherCache({ name: city, lat: latitude, lon: longitude }, forecast, airQuality, local_names);
        saveToSearchHistory(city, latitude, longitude);
      });
    } catch (error: any) {
      runInAction(() => this.addError(error.message || "generic_error"));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }
}

export default new RequestStore();
