import { makeAutoObservable } from "mobx";

class SharedWeatherStore {
  weatherData: any = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setWeatherData(data: any) {
    this.weatherData = data;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }
}

export default new SharedWeatherStore();
