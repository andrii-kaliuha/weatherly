import { makeAutoObservable } from "mobx";
import SharedWeatherStore from "./SharedWeatherStore";
import { getCity } from "../request";

class WeeklyForecastStore {
  constructor() {
    makeAutoObservable(this);
  }

  get weatherData() {
    return SharedWeatherStore.weatherData;
  }

  get loading() {
    return SharedWeatherStore.loading;
  }

  get error() {
    return SharedWeatherStore.error;
  }

  get formattedForecast() {
    if (!this.weatherData || !this.weatherData.daily) return [];

    return this.weatherData.daily.map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      tempMax: Math.round(item.temp.max),
      tempMin: Math.round(item.temp.min),
    }));
  }

  fetchCityWeather = async (cityName: string) => {
    SharedWeatherStore.setLoading(true);
    SharedWeatherStore.setError(null);
    try {
      await getCity(cityName);
    } catch (e: any) {
      SharedWeatherStore.setError(e.message || "Failed to fetch data");
      SharedWeatherStore.setWeatherData(null);
    } finally {
      SharedWeatherStore.setLoading(false);
    }
  };
}

export default new WeeklyForecastStore();
