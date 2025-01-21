import { makeAutoObservable } from "mobx";

class CurrentWeatherStore {
  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: any) {
    console.log(data);
  }
}

export default new CurrentWeatherStore();
