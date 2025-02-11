import { makeAutoObservable } from "mobx";
import rootStore from "../rootStore";

class WeeklyForecastStore {
  weeklyForecast: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: any) {
    this.weeklyForecast = data.slice(0, 7).map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        weekday: "long",
      }),
      minTemp: rootStore.convertTemperature(day.temp.min),
      maxTemp: rootStore.convertTemperature(day.temp.max),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
    }));
  }
}

export default new WeeklyForecastStore();
