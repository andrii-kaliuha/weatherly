import { makeAutoObservable } from "mobx";
import WeatherRequest from "./request";

class CurrentWeatherStore {
  city: string | null = null;
  date: string | null = null;
  temperature: number | null = null;
  icon: string = "";
  description: string | null = null;
  maxTempDay: number | null = null;
  minTempDay: number | null = null;
  summary: string | null = null;
  hourlyForecast: { temperature: number; icon: string; time: string }[] = [];
  weatherConditions: { icon: string; value: string; label: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: any) {
    this.city = WeatherRequest.city;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });
    this.temperature = Math.round(data.current.temp);
    this.icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    this.description = data.current.weather[0].description;
    this.maxTempDay = Math.round(data.daily[0].temp.max);
    this.minTempDay = Math.round(data.daily[0].temp.min);
    this.summary = data.daily[0].summary;
    this.weatherConditions = [
      { icon: "icon-meater", value: `${Math.round(data.current.pressure)} hPa`, label: "Pressure" },
      { icon: "icon-dropp", value: `${Math.round(data.current.humidity)} %`, label: "Humidity" },
      { icon: "icon-wind", value: `${Math.round(data.current.wind_speed)} m/s`, label: "Wind" },
      { icon: "icon-uv", value: `${Math.round(data.current.uvi)} / 12`, label: "UV index" },
      { icon: "icon-rainfall", value: `${Math.round(data.daily[0]?.rain || 0)} mm`, label: "Precipitation" },
      { icon: "icon-feels-like", value: `${Math.round(data.current.feels_like)}°`, label: "Feels like" },
    ];
    this.hourlyForecast = data.hourly.map((hour: any) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
      }),
      icon: hour.weather[0].icon,
      temperature: Math.round(hour.temp),
    }));
  }
}

export default new CurrentWeatherStore();
