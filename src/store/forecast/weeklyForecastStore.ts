import { makeAutoObservable } from "mobx";
import { convertTemperature } from "../../shared/utils/converters";
import { WeeklyForecastState } from "../../shared/types/store";
import { findDescriptionById } from "../../shared/utils/weatherDescriptions";
import requestStore from "../request/requestStore";
import settingsStore from "../settingsStore";

class WeeklyForecastStore {
  constructor() {
    makeAutoObservable(this);
  }

  get weeklyForecast(): WeeklyForecastState[] {
    const weeklyForecast = requestStore.forecast?.daily;
    const { language, temperatureUnit } = settingsStore.settings;

    if (!weeklyForecast || weeklyForecast.length === 0) return [];

    return weeklyForecast.slice(0, 7).map((day) => {
      const description = findDescriptionById(day.weather[0].description);

      return {
        dateISO: new Date(day.dt * 1000).toISOString(),
        date: new Date(day.dt * 1000).toLocaleString(language, { day: "numeric", month: "long" }),
        weekday: new Date(day.dt * 1000).toLocaleString(language, { weekday: "long" }),
        icon: day.weather[0].icon,
        description: description ? description : day.weather[0].description,
        maxTemp: convertTemperature(day.temp.max, temperatureUnit),
        minTemp: convertTemperature(day.temp.min, temperatureUnit),
      };
    });
  }
}

export const weeklyForecastStore = new WeeklyForecastStore();
