import { makeAutoObservable } from "mobx";
import { AirQualityState } from "../../shared/types/store";
import { AirPollutionResponse } from "../../shared/types/api";
import { Language } from "../../shared/types/settings";

const airQualityLevels = [
  {
    aqi: 1,
    range: "AQI 0-50",
    color: "#a2d043",
    title: "air_quality.levels.good.title",
    description: "air_quality.levels.good.description",
  },
  {
    aqi: 2,
    range: "AQI 51-100",
    color: "#f8cc4a",
    title: "air_quality.levels.satisfactory.title",
    description: "air_quality.levels.satisfactory.description",
  },
  {
    aqi: 3,
    range: "AQI 101-150",
    color: "#f19342",
    title: "air_quality.levels.harmful.title",
    description: "air_quality.levels.harmful.description",
  },
  {
    aqi: 4,
    range: "AQI 151-200",
    color: "#d85f38",
    title: "air_quality.levels.unhealthy.title",
    description: "air_quality.levels.unhealthy.description",
  },
  {
    aqi: 5,
    range: "AQI 201-300",
    color: "#903c70",
    title: "air_quality.levels.bad.title",
    description: "air_quality.levels.bad.description",
  },
];

class AirQualityStore {
  airQuality: AirQualityState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAirQuality(data: AirPollutionResponse, local_names: Record<string, string>, language: Language) {
    const airQualityData = data?.list?.[0];

    if (!airQualityData) {
      this.airQuality = null;
      return;
    }

    const currentLevel = airQualityLevels.find((item) => item.aqi === airQualityData.main.aqi) ?? airQualityLevels[-1];

    this.airQuality = {
      cityName: local_names[language] ?? null,
      aqi: airQualityData.main.aqi,
      color: currentLevel.color,
      title: currentLevel.title,
      description: currentLevel.description,
      airPollutants: [
        { name: "PM 2.5", value: Math.round(airQualityData.components.pm2_5), icon: "pm2_5" },
        { name: "PM 10", value: Math.round(airQualityData.components.pm10), icon: "pm10" },
        { name: "SO2", value: Math.round(airQualityData.components.so2), icon: "so2" },
        { name: "NO2", value: Math.round(airQualityData.components.no2), icon: "no2" },
      ],
    };
  }
}

export const airQualityStore = new AirQualityStore();
