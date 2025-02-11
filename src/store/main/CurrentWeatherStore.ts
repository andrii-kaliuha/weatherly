import { makeAutoObservable } from "mobx";
import rootStore from "../rootStore";

class CurrentWeatherStore {
  cityName: string | null = null;
  date: string | null = null;
  temperature: number | null = null;
  icon: string = "";
  description: string | null = null;
  maxTemp: number | null = null;
  minTemp: number | null = null;
  summary: string | null = null;
  hourlyForecast: { temperature: number; icon: string; time: string }[] = [];
  weatherConditions: { icon: string; value: string; label: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: any, city: string) {
    this.cityName = city;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });
    this.temperature = rootStore.convertTemperature(data.current.temp);
    this.icon = `./src/assets/icons/${data.current.weather[0].icon}.svg`;
    this.description = data.current.weather[0].description;
    this.maxTemp = rootStore.convertTemperature(data.daily[0].temp.max);
    this.minTemp = rootStore.convertTemperature(data.daily[0].temp.min);
    this.summary = data.daily[0].summary;
    this.weatherConditions = [
      { icon: "pressure", value: `${rootStore.convertPressure(data.current.pressure)} ${rootStore.settings.pressure}`, label: "Pressure" },
      { icon: "humidity", value: `${Math.round(data.current.humidity)} %`, label: "Humidity" },
      { icon: "wind", value: `${rootStore.convertWindSpeed(data.current.wind_speed)} ${rootStore.settings.wind}`, label: "Wind" },
      { icon: "uv", value: `${Math.round(data.current.uvi)} / 12`, label: "UV index" },
      { icon: "precipitation", value: `${Math.round(data.daily[0]?.rain || 0)} mm`, label: "Precipitation" },
      {
        icon: "feels like",
        value: `${rootStore.convertTemperature(data.current.feels_like)}°${rootStore.settings.temperature.charAt(0).toUpperCase()}`,
        label: "Feels like",
      },
    ];
    this.hourlyForecast = data.hourly.map((hour: any) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
      }),
      icon: `./src/assets/icons/${hour.weather[0].icon}.svg`,
      temperature: rootStore.convertTemperature(hour.temp),
    }));
  }
}

export default new CurrentWeatherStore();
