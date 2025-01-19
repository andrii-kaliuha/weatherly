import { makeAutoObservable } from "mobx";
import AirQualityStore from "./AirQualityStore";

class WeatherStore {
  city: string | null = null;
  date: string | null = null;
  temperature: number | null = null;
  feelsLike: number | null = null;
  description: string = "";
  icon: string = "";
  loading: boolean = false;
  error: string | null = null;
  dailyForecast: any;
  hourlyForecast: any;
  humidity: string | null = null;
  pressure: string | null = null;
  uv: string | null = null;
  summary: string | null = null;
  windSpeed: string | null = null;
  visibility: string | null = null;
  airQualityIndex: any;
  maxTempDay: number | null = null;
  minTempDay: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  updateWeatherData(data: any) {
    // const date = new Date(data.current.dt * 1000);

    // // Кастомна мапа для днів тижня у називному відмінку
    // const weekdays = ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"];

    // // Кастомна мапа для місяців у називному відмінку
    // const months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

    // // Отримуємо складові дати
    // const day = date.getDate(); // число
    // const month = months[date.getMonth()]; // місяць
    // const weekday = weekdays[date.getDay()]; // день тижня

    // // Форматуємо дату
    // const formattedDate = `${day} ${month} ${weekday}`;

    // console.log(formattedDate);
    // this.date = formattedDate;

    this.date = new Date(data.current.dt * 1000).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });
    this.temperature = Math.round(data.current.temp);
    this.feelsLike = Math.round(data.current.feels_like);
    this.description = data.current.weather[0].description;
    this.icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    this.dailyForecast = data.daily;
    this.hourlyForecast = data.hourly;
    this.humidity = data.current.humidity;
    this.pressure = data.current.pressure;
    this.uv = data.current.uvi;
    this.windSpeed = data.current.wind_speed;
    this.visibility = data.current.visibility;
    this.summary = data.daily[0].summary;
    this.maxTempDay = Math.round(data.daily[0].temp.max);
    this.minTempDay = Math.round(data.daily[0].temp.min);
  }

  async getCityCoordinates(cityName: string) {
    this.setLoading(true);
    this.setError(null);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      const coordinates = await coordinatesResponse.json();

      if (!coordinates || coordinates.length === 0) {
        throw new Error("City not found");
      }
      this.city = coordinates[0].local_names.en;
      const { lat, lon } = coordinates[0];
      this.getWeatherForecast(lat, lon);
      AirQualityStore.getAirQuality(lat, lon);
    } catch (error: any) {
      this.setError(error.message || "Error getting city coordinates");
    } finally {
      this.setLoading(false);
    }
  }

  getCityFromCoordinates = (lat: number, lon: number) => {
    const API_KEY = "ada53a53546a12851a13875d932b485b";
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          this.city = data[0].name;
        } else {
          console.error("Не вдалося знайти місто за цими координатами.");
        }
      })
      .catch((error) => {
        console.error("Помилка при отриманні даних:", error);
      });
  };

  getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.getCityFromCoordinates(latitude, longitude);
          this.getWeatherForecast(latitude, longitude);
          AirQualityStore.getAirQuality(latitude, longitude);
        },
        (error) => {
          console.error("Помилка геолокації:", error);
        }
      );
    } else {
      console.error("Невідома помилка геолокації.");
    }
  };

  async getWeatherForecast(lat: number, lon: number) {
    this.setLoading(true);
    this.setError(null);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecast = await forecastResponse.json();

      if (!forecastResponse.ok) {
        throw new Error("Failed to retrieve weather data");
      }

      this.updateWeatherData(forecast);

      console.log(forecast);
    } catch (error: any) {
      this.setError(error.message || "Error when receiving data");
    } finally {
      this.setLoading(false);
    }
  }
}

export default new WeatherStore();
