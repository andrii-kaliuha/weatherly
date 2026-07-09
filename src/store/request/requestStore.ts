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

export const getErrorKey = (error: unknown): string => {
  if (error instanceof TypeError) return "failed_to_fetch";
  if (error instanceof Error) return error.message;
  return "generic_error";
};

class RequestStore {
  fastLocation: { local_names: { uk: string; en: string }; lat: number; lon: number } | null = null;
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

  async initFastLocation() {
    if (locationStore.getLocationByCache()) {
      console.log("IP підказка скасована: є координати в кеші");
      return;
    }

    const ipData = await locationStore.prefetchByIP();
    console.log("Дані з IP отримано:", ipData);

    if (ipData) {
      runInAction(() => {
        this.fastLocation = ipData;
      });
    }
  }

  async confirmFastLocation(settings: SettingsState) {
    if (!this.fastLocation) return;

    const { lat, lon } = this.fastLocation;
    runInAction(() => {
      this.setLoading(true);
      this.fastLocation = null;
      this.clearError();
    });

    try {
      await this.fetchWeatherByCoords(lat, lon, settings);
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }

  async fetchForecastByLocation(settings: SettingsState) {
    runInAction(() => {
      this.setLoading(true);
      this.clearError();
      this.fastLocation = null;
    });

    try {
      const { latitude, longitude } = await locationStore.getLocationByGPS();
      const local_names = await this.fetchWeatherByCoords(latitude, longitude, settings);
      const cityName = local_names?.uk || local_names?.en;
      saveGeoCache(latitude, longitude, cityName);
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
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
    } catch (error) {
      runInAction(() => this.addError(getErrorKey(error)));
    } finally {
      runInAction(() => this.setLoading(false));
    }
  }
}

export default new RequestStore();
