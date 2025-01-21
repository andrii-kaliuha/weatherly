import { makeAutoObservable } from "mobx";

class WeeklyForecastStore {
  weeklyForecast: any;

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: any) {
    const formatForecast = data.map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        weekday: "long",
      }),
      minTemp: Math.round(day.temp.min),
      maxTemp: Math.round(day.temp.max),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
    }));
    this.weeklyForecast = formatForecast;
  }
}

export default new WeeklyForecastStore();
