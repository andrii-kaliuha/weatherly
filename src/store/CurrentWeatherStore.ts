import { makeAutoObservable } from "mobx";
import SharedWeatherStore from "./SharedWeatherStore";
import { getCity } from "../request";

class CurrentWeatherStore {
  city: string | null = null;
  date: number | null = null;
  temperature: number | null = null;
  feelsLike: number | null = null;
  description: string = "";
  icon: string = "";
  loading: boolean = false;
  error: string | null = null;

  weatherIcons: { [key: string]: string } = {
    ясно: "icons/sunny.svg",
    хмарно: "icons/cloudy.svg",
    дощ: "icons/rainy.svg",
    сніг: "icons/snowy.svg",
    туман: "icons/foggy.svg",
    вітряно: "icons/windy.svg",
    "хмарно з проясненнями": "icons/partly_cloudy.svg",
    "невеликий дощ": "icons/light_rain.svg",
    "перемінна хмарність": "icons/variable_cloudy.svg",
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateWeatherData(data: any) {
    this.city = data.name;
    this.date = data.dt;
    this.temperature = Math.round(data.main.temp); // Округлення температури
    this.feelsLike = Math.round(data.main.feels_like); // Округлення "відчувається як"
    this.description = data.weather[0].description;
    this.icon = this.weatherIcons[data.weather[0].main.toLowerCase()] || "icons/1.svg";
  }

  async getWeather(city: string): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const apiKey: string = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`);
      const data: any = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Не вдалося отримати дані");
      }

      this.updateWeatherData(data);
    } catch (err: any) {
      this.error = err.message || "Не вдалося отримати дані";
    } finally {
      this.loading = false;
    }
  }
}

export default new CurrentWeatherStore();
