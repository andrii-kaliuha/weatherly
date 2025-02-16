import { makeAutoObservable } from "mobx";
import { airQualityStore, astronomyStore, weeklyForecastStore, currentWeatherStore } from "./forecast";

const API_KEY = "ada53a53546a12851a13875d932b485b";

class Request {
  cityName: string = "";
  latitude: number | null = null;
  longitude: number | null = null;
  error: string | null = null;
  loading: boolean = false;

  forecast: any;
  airQuality: any;

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

  async getCityCoordinates(cityName: string, language: string) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      const coordinates = await response.json();

      const { lat, lon } = coordinates[0];
      this.getWeatherForecast(lat, lon);
      this.getAirQuality(lat, lon);
      this.cityName = coordinates[0].local_names[language];
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні координат міста. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  async getCityNameByCoordinates(lat: number, lon: number, language: string) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
      const cityName = await response.json();

      this.cityName = cityName[0].local_names[language];
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні даних міста. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude = latitude;
          this.longitude = longitude;
        },
        (error) => {
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
          } else {
            this.addError("Помилка при отриманні геолокації");
          }
        }
      );
    } else {
      this.addError("Геолокація не підтримується цим браузером.");
    }
  }

  // getCurrentLocation = async (language: string) => {
  //   this.setLoading(true);

  //   if (!("geolocation" in navigator)) {
  //     this.addError("Геолокація не підтримується вашим браузером.");
  //     this.setLoading(false);
  //     return;
  //   }

  //   try {
  //     const position = await new Promise<GeolocationPosition>((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(resolve, reject);
  //     });

  //     const { latitude, longitude } = position.coords;

  //     await Promise.all([
  //       this.getCityNameByCoordinates(latitude, longitude, language),
  //       this.getWeatherForecast(latitude, longitude),
  //       this.getAirQuality(latitude, longitude),
  //     ]);
  //   } catch (error: unknown) {
  //     if (error instanceof GeolocationPositionError) {
  //       switch (error.code) {
  //         case GeolocationPositionError.PERMISSION_DENIED:
  //           this.addError("Доступ до геолокації відхилено. Будь ласка, надайте дозвіл.");
  //           break;
  //         case GeolocationPositionError.POSITION_UNAVAILABLE:
  //           this.addError("Не вдалося визначити місцезнаходження. Спробуйте пізніше.");
  //           break;
  //         case GeolocationPositionError.TIMEOUT:
  //           this.addError("Час вичерпано при спробі визначити місцезнаходження.");
  //           break;
  //         default:
  //           this.addError("Не вдалося отримати геолокацію. Спробуйте ще раз.");
  //       }
  //     } else if (error instanceof Error) {
  //       this.addError(`Сталася помилка: ${error.message}`);
  //     } else {
  //       this.addError("Сталася невідома помилка при отриманні геолокації.");
  //     }
  //   } finally {
  //     this.setLoading(false);
  //   }
  // };

  async getWeatherForecast(lat: number, lon: number) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      const forecast = await response.json();

      astronomyStore.updateAstronomy(forecast, "12-hour format");
      weeklyForecastStore.updateWeeklyForecast(forecast.daily, "en", "fahrenheit");
      currentWeatherStore.updateCurrentWeather(forecast, this.cityName, "uk", "kelvin", "km/h", "mmHg", "12-hour format");
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні даних прогнозу погоди. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }

  async getAirQuality(lat: number, lon: number) {
    this.setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const AQI = await response.json();

      airQualityStore.updateAirQuality(AQI, this.cityName);
    } catch (error: any) {
      this.addError(error.message || "Помилка при отриманні даних якості повітря. Спробуйте пізніше.");
    } finally {
      this.setLoading(false);
    }
  }
}

export const request = new Request();
