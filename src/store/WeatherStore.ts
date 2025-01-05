import { makeAutoObservable } from "mobx";

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
  windSpeed: string | null = null;
  chanceOfprecipitation: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setCity(data: any) {
    this.city = data[0].local_names.en;
  }

  updateWeatherData(data: any) {
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
    this.chanceOfprecipitation = data.current.pop;
  }

  async getWeather(cityName: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);

      if (!coordinatesResponse.ok) {
        throw new Error("Не вдалося отримати координати міста");
      }

      const coordinates = await coordinatesResponse.json();
      if (coordinates.length === 0) {
        throw new Error("Місто не знайдено");
      }

      this.setCity(coordinates);
      const lat = coordinates[0].lat;
      const lon = coordinates[0].lon;

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error("Не вдалося отримати дані погоди");
      }

      const forecastData = await forecastResponse.json();
      this.updateWeatherData(forecastData);

      console.log(forecastData);
    } catch (err: any) {
      this.setError(err.message || "Не вдалося отримати дані");
    } finally {
      this.setLoading(false);
    }
  }
}

export default new WeatherStore();
