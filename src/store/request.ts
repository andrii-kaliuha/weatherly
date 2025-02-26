import { makeAutoObservable } from "mobx";
import { airQualityStore, astronomyStore, weeklyForecastStore, currentWeatherStore, settingsProps } from "./forecast";

const API_KEY = "ada53a53546a12851a13875d932b485b";

class request {
  startScreen: boolean = true;
  loading: boolean = false;
  error: string | null = null;

  forecast: any = null;
  airQuality: any = null;
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
    if (!city.trim()) {
      this.addError("Будь ласка, введіть назву міста.");
      return false;
    }

    if (!/^[a-zA-Zа-яА-ЯіЇїІєЄўЎґҐ'’\s-]+$/.test(city.trim())) {
      this.addError("Будь ласка, введіть дійсну назву міста.");
      return false;
    }

    this.clearError();
    return true;
  }

  async getCityCoordinates(city: string): Promise<{ latitude: number; longitude: number; local_names: Record<string, string> }> {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
      const coordinates = await response.json();

      if (!coordinates.length) {
        throw new Error("Місто не знайдено");
      }

      const { lat: latitude, lon: longitude, local_names } = coordinates[0];
      return { latitude, longitude, local_names };
    } catch (error: any) {
      throw new Error(error.message || "Помилка при отриманні координат міста. Спробуйте пізніше.");
    }
  }

  async getCityNameByCoordinates(lat: number, lon: number): Promise<{ [key: string]: string }> {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const data = await response.json();

      if (!data.length) {
        throw new Error("Місто не знайдено");
      }

      return data[0].local_names;
    } catch (error: any) {
      throw new Error(error.message || "Помилка при отриманні даних міста. Спробуйте пізніше.");
    }
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    if (!navigator.geolocation) {
      return Promise.reject(new Error("Геолокація не підтримується цим браузером."));
    }
    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          const errorMessages: { [key: number]: string } = {
            [GeolocationPositionError.PERMISSION_DENIED]: "Доступ до геолокації відхилено. Будь ласка, надайте дозвіл.",
            [GeolocationPositionError.POSITION_UNAVAILABLE]: "Не вдалося визначити місцезнаходження. Спробуйте пізніше.",
            [GeolocationPositionError.TIMEOUT]: "Час вичерпано при спробі визначити місцезнаходження.",
          };
          const errorMessage = errorMessages[error.code] || "Не вдалося отримати геолокацію. Спробуйте ще раз.";
          reject(new Error(errorMessage));
        }
      );
    });
  }

  async getWeatherForecast(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Помилка при отриманні даних прогнозу погоди. Спробуйте пізніше.");
    }
  }

  async getAirQuality(lat: number, lon: number): Promise<any> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Помилка при отриманні даних якості повітря. Спробуйте пізніше.");
    }
  }

  updateForecast(forecast: any, airQuality: any, local_names: Record<string, string>, settings: settingsProps) {
    currentWeatherStore.updateCurrentWeather(forecast, local_names, settings);
    astronomyStore.updateAstronomy(forecast, settings);
    airQualityStore.updateAirQuality(airQuality, local_names, settings);
    weeklyForecastStore.updateWeeklyForecast(forecast.daily, settings);
  }

  async fetchForecastByCityName(city: string, settings: settingsProps) {
    if (!this.validateCity(city)) {
      return;
    }

    this.setLoading(true);
    try {
      const { latitude, longitude, local_names } = await this.getCityCoordinates(city);
      const forecast = await this.getWeatherForecast(latitude, longitude);
      const airQuality = await this.getAirQuality(latitude, longitude);

      this.forecast = forecast;
      this.airQuality = airQuality;
      this.local_names = local_names;

      this.updateForecast(forecast, airQuality, local_names, settings);
      this.clearError();
    } catch (error: any) {
      this.addError(error.message || "Помилка отримання прогнозу погоди.");
    } finally {
      this.setLoading(false);
    }
  }

  async fetchForecastByLocation(settings: settingsProps) {
    this.setLoading(true);
    try {
      const { latitude, longitude } = await this.getCurrentLocation();
      const local_names = await this.getCityNameByCoordinates(latitude, longitude);
      const forecast = await this.getWeatherForecast(latitude, longitude);
      const airQuality = await this.getAirQuality(latitude, longitude);

      this.forecast = forecast;
      this.airQuality = airQuality;
      this.local_names = local_names;

      this.updateForecast(forecast, airQuality, local_names, settings);
      this.clearError();
    } catch (error: any) {
      this.addError(error.message || "Помилка отримання прогнозу погоди.");
    } finally {
      this.setLoading(false);
    }
  }
}

export default new request();
