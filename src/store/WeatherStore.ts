import { makeAutoObservable, action } from "mobx";

class WeatherStore {
  city: string | null = null;
  date: number | null = null;
  temperature: number | null = null;
  feelsLike: number | null = null;
  description: string = "";
  icon: string = "";
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      updateWeatherData: action,
      setLoading: action,
      setError: action,
    });
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  updateWeatherData(data: any) {
    this.city = data.name;
    this.date = data.current.dt;
    this.temperature = Math.round(data.current.temp);
    this.feelsLike = Math.round(data.current.feels_like);
    this.description = data.current.weather[0].description;
    this.icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
  }

  async getWeather(cityName: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);
    try {
      const API_KEY: string = "ada53a53546a12851a13875d932b485b";
      const coordinatesResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);

      if (!coordinatesResponse.ok) {
        throw new Error("Не вдалося отримати координати міста");
      }

      const coordinates: any = await coordinatesResponse.json();
      if (coordinates.length === 0) {
        throw new Error("Місто не знайдено");
      }

      const lat = coordinates[0].lat;
      const lon = coordinates[0].lon;

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error("Не вдалося отримати дані погоди");
      }

      const forecastData: any = await forecastResponse.json();
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
