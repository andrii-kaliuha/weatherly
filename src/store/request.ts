import { makeAutoObservable } from "mobx";
import { airQualityStore, astronomyStore, weeklyForecastStore, currentWeatherStore, settingsProps } from "./forecast";

const API_KEY = "ada53a53546a12851a13875d932b485b";

class request {
  error: string | null = null;
  loading: boolean = false;

  forecast: any = null;
  airQuality: any = null;
  cityName: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  addError(message: string) {
    this.error = message;
  }

  clearError() {
    this.error = null;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async getCityCoordinates(city: string, language: "uk" | "en"): Promise<{ latitude: number; longitude: number; cityName: string }> {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
      const coordinates = await response.json();

      const { lat: latitude, lon: longitude, local_names } = coordinates[0];
      return { latitude, longitude, cityName: local_names[language] };
    } catch (error: any) {
      throw new Error(error.message || "Помилка при отриманні координат міста. Спробуйте пізніше.");
    }
  }

  async getCityNameByCoordinates(lat: number, lon: number, language: "uk" | "en"): Promise<string> {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const cityName = await response.json();

      return cityName[0].local_names[language];
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

  updateForecast(forecast: any, airQuality: any, cityName: string, settings: settingsProps) {
    currentWeatherStore.updateCurrentWeather(forecast, cityName, settings);
    astronomyStore.updateAstronomy(forecast, settings);
    airQualityStore.updateAirQuality(airQuality, cityName);
    weeklyForecastStore.updateWeeklyForecast(forecast.daily, settings);
  }

  async fetchForecastByCityName(city: string, settings: settingsProps) {
    this.setLoading(true);
    try {
      const { latitude, longitude, cityName } = await this.getCityCoordinates(city, settings.language);
      const forecast = await this.getWeatherForecast(latitude, longitude);
      const airQuality = await this.getAirQuality(latitude, longitude);

      this.forecast = forecast;
      this.airQuality = airQuality;
      this.cityName = cityName;
      console.log(settings);

      this.updateForecast(forecast, airQuality, cityName, settings);
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
      const cityName = await this.getCityNameByCoordinates(latitude, longitude, settings.language);
      const forecast = await this.getWeatherForecast(latitude, longitude);
      const airQuality = await this.getAirQuality(latitude, longitude);

      this.forecast = forecast;
      this.airQuality = airQuality;
      this.cityName = cityName;
      console.log(settings);

      this.updateForecast(forecast, airQuality, cityName, settings);
      this.clearError();
    } catch (error: any) {
      this.addError(error.message || "Помилка отримання прогнозу погоди.");
    } finally {
      this.setLoading(false);
    }
  }
}

export default new request();
