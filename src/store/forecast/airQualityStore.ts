import { makeAutoObservable } from "mobx";
import { AirQualityState } from "../../shared/types/store";
import requestStore from "../request/requestStore";
import settingsStore from "../settingsStore";

const airQualityLevels = [
  { aqi: 0, color: "#9e9e9e", title: "air_quality.levels.unknown.title", description: "air_quality.levels.unknown.description" },
  { aqi: 1, color: "#a2d043", title: "air_quality.levels.good.title", description: "air_quality.levels.good.description" },
  { aqi: 2, color: "#f8cc4a", title: "air_quality.levels.satisfactory.title", description: "air_quality.levels.satisfactory.description" },
  { aqi: 3, color: "#f19342", title: "air_quality.levels.harmful.title", description: "air_quality.levels.harmful.description" },
  { aqi: 4, color: "#d85f38", title: "air_quality.levels.unhealthy.title", description: "air_quality.levels.unhealthy.description" },
  { aqi: 5, color: "#903c70", title: "air_quality.levels.bad.title", description: "air_quality.levels.bad.description" },
];

class AirQualityStore {
  constructor() {
    makeAutoObservable(this);
  }

  get airQuality(): AirQualityState | null {
    const rawAirData = requestStore.airQuality?.list?.[0];
    const localNames = requestStore.local_names;
    const currentLang = settingsStore.settings.language;

    if (!rawAirData || !localNames) return null;
    const currentLevel = airQualityLevels.find((item) => item.aqi === rawAirData.main.aqi) ?? airQualityLevels[0];

    return {
      cityName: localNames[currentLang] ?? "Unknown",
      aqi: rawAirData.main.aqi,
      color: currentLevel.color,
      title: currentLevel.title,
      description: currentLevel.description,
      airPollutants: [
        { name: "PM 2.5", value: Math.round(rawAirData.components.pm2_5), icon: "pm2_5" },
        { name: "PM 10", value: Math.round(rawAirData.components.pm10), icon: "pm10" },
        { name: "SO2", value: Math.round(rawAirData.components.so2), icon: "so2" },
        { name: "NO2", value: Math.round(rawAirData.components.no2), icon: "no2" },
      ],
    };
  }
}

export const airQualityStore = new AirQualityStore();
