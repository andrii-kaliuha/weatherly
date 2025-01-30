import { makeAutoObservable } from "mobx";
import AirQualityStore from "./AirQualityStore";
import SunAndMoonStore from "./SunAndMoonStore";
import WeeklyForecastStore from "./WeeklyForecastStore";
import CurrentWeatherStore from "./CurrentWeatherStore";
import ErrorStore from "./ErrorStore";

class request {
  cityName: string | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
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
      AirQualityStore.getAirQuality(lat, lon);
      AirQualityStore.setCity(coordinates[0].local_names.uk);
      this.cityName = coordinates[0].local_names.uk;
    } catch (error: any) {
      ErrorStore.addError(error.message || "Сталася непередбачена помилка. Спробуйте ще раз.");
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
      AirQualityStore.setCity(cityData[0].local_names.uk);
    } catch (error: any) {
      ErrorStore.addError(error.message || "Сталася непередбачена помилка. Спробуйте ще раз пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  getCurrentLocation = async () => {
    this.setLoading(true);

    if (!("geolocation" in navigator)) {
      ErrorStore.addError("Геолокація не підтримується вашим браузером.");
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
        AirQualityStore.getAirQuality(latitude, longitude),
      ]);
    } catch (error: unknown) {
      console.error("Помилка геолокації:", error);

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            ErrorStore.addError("Доступ до геолокації відхилено. Будь ласка, надайте дозвіл.");
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            ErrorStore.addError("Не вдалося визначити місцезнаходження. Спробуйте пізніше.");
            break;
          case GeolocationPositionError.TIMEOUT:
            ErrorStore.addError("Час вичерпано при спробі визначити місцезнаходження.");
            break;
          default:
            ErrorStore.addError("Не вдалося отримати геолокацію. Спробуйте ще раз.");
        }
      } else if (error instanceof Error) {
        ErrorStore.addError(`Сталася помилка: ${error.message}`);
      } else {
        ErrorStore.addError("Сталася невідома помилка при отриманні геолокації.");
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

      SunAndMoonStore.updateSunAndMoon(forecast);
      WeeklyForecastStore.updateWeeklyForecast(forecast.daily);
      CurrentWeatherStore.updateCurrentWeather(forecast);
    } catch (error: any) {
      ErrorStore.addError(error.message || "Помилка при отриманні даних прогнозу погоди. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }
}

export default new request();
