import { makeAutoObservable, runInAction } from "mobx";

class WeeklyForecastStore {
  data: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getWeatherData() {
    this.loading = true;
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/3.0/onecall?lat=50.4333&lon=30.5167&units=metric&appid=ada53a53546a12851a13875d932b485b"
      );
      const result = await response.json();

      runInAction(() => {
        this.data = result;
        this.error = null;
      });
    } catch (e) {
      runInAction(() => {
        this.error = "Failed to fetch data";
        this.data = null;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get formattedForecast() {
    if (!this.data?.daily) return [];
    return this.data.daily.map((item: any) => ({
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
}

export default new WeeklyForecastStore();
