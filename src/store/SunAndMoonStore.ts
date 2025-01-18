import { makeAutoObservable } from "mobx";
import WeatherStore from "./WeatherStore";

class SunAndMoonStore {
  durationDay: string | null = null;
  sunriseTime: string | null = null;
  sunsetTime: string | null = null;
  moonPhase: string | null = null;
  moonriseTime: string | null = null;
  moonsetTime: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateSunAndMoonInfo() {}
}
