import { makeAutoObservable } from "mobx";
import { airQualityStore, astronomyStore, weeklyForecastStore, currentWeatherStore } from "./forecast";

class Request {
  cityName: string | null = null;
  error: string | null = null;
  loading: boolean = false;

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

  async getCityCoordinates(cityName: string) {
    this.setLoading(true);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);

      if (!response.ok) {
        throw new Error("Помилка при підключенні до сервера. Спробуйте ще раз.");
      }

      const coordinates = await response.json();

      if (!coordinates || coordinates.length === 0) {
        throw new Error("Місто не знайдено. Перевірте правильність введеної назви.");
      }

      const { lat, lon } = coordinates[0];
      this.getWeatherForecast(lat, lon);
      this.getAirQuality(lat, lon);
      this.cityName = coordinates[0].local_names.uk;
    } catch (error: any) {
      this.addError(error.message || "Сталася непередбачена помилка. Спробуйте ще раз.");
    } finally {
      this.setLoading(false);
    }
  }

  async getCityNameByCoordinates(lat: number, lon: number) {
    this.setLoading(true);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);

      if (!response.ok) {
        throw new Error("Помилка при підключенні до сервера. Спробуйте ще раз.");
      }

      const cityData = await response.json();

      if (!cityData || cityData.length === 0) {
        throw new Error("Місто з вказаними координатами не знайдено.");
      }

      this.cityName = cityData[0].local_names.uk;
    } catch (error: any) {
      this.addError(error.message || "Сталася непередбачена помилка. Спробуйте ще раз пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  getCurrentLocation = async () => {
    this.setLoading(true);

    if (!("geolocation" in navigator)) {
      this.addError("Геолокація не підтримується вашим браузером.");
      this.setLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;

      await Promise.all([
        this.getCityNameByCoordinates(latitude, longitude),
        this.getWeatherForecast(latitude, longitude),
        this.getAirQuality(latitude, longitude),
      ]);
    } catch (error: unknown) {
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            this.addError("Доступ до геолокації відхилено. Будь ласка, надайте дозвіл.");
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            this.addError("Не вдалося визначити місцезнаходження. Спробуйте пізніше.");
            break;
          case GeolocationPositionError.TIMEOUT:
            this.addError("Час вичерпано при спробі визначити місцезнаходження.");
            break;
          default:
            this.addError("Не вдалося отримати геолокацію. Спробуйте ще раз.");
        }
      } else if (error instanceof Error) {
        this.addError(`Сталася помилка: ${error.message}`);
      } else {
        this.addError("Сталася невідома помилка при отриманні геолокації.");
      }
    } finally {
      this.setLoading(false);
    }
  };

  async getWeatherForecast(lat: number, lon: number) {
    this.setLoading(true);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=uk&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Помилка під час запиту до серверу. Перевірте підключення до інтернету.");
      }

      const forecast = await response.json();

      console.log(forecast);

      astronomyStore.updateAstronomyInfo(forecast);
      weeklyForecastStore.updateWeeklyForecast(forecast.daily);
      currentWeatherStore.updateCurrentWeather(forecast, this.cityName !== null ? this.cityName : "unknown");
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні даних прогнозу погоди. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  async getAirQuality(lat: number, lon: number) {
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const AQI = await response.json();
      airQualityStore.updateAirQuality(AQI, this.cityName !== null ? this.cityName : "unknown");
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні даних якості повітря. Спробуйте пізніше.");
    }
  }
}

export const request = new Request();
