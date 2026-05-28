import { makeAutoObservable } from "mobx";
import { Daily } from "../../shared/types/api";
import { Language, TemperatureUnit } from "../../shared/types/settings";
import { convertTemperature } from "../../shared/utils/converters";
import { WeeklyForecastState } from "../../shared/types/store";
import { findDescriptionById } from "../../shared/utils/weatherDescriptions";

class WeeklyForecastStore {
  weeklyForecast: WeeklyForecastState[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: Daily[], language: Language, temperatureUnit: TemperatureUnit) {
    if (data.length === 0) {
      this.weeklyForecast = [];
      return;
    }

    this.weeklyForecast = data.slice(0, 7).map((day: Daily) => {
      const descriptionData = findDescriptionById(day.weather[0].description);

      return {
        dateISO: new Date(day.dt * 1000).toISOString(),
        date: new Date(day.dt * 1000).toLocaleString(language, { day: "numeric", month: "long" }),
        weekday: new Date(day.dt * 1000).toLocaleString(language, { weekday: "long" }),
        icon: day.weather[0].icon,
        description: descriptionData ? descriptionData : day.weather[0].description,
        maxTemp: convertTemperature(day.temp.max, temperatureUnit),
        minTemp: convertTemperature(day.temp.min, temperatureUnit),
      };
    });
  }
}

export const weeklyForecastStore = new WeeklyForecastStore();
