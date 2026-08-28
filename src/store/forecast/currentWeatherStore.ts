import { makeAutoObservable } from "mobx";
import type { CurrentWeatherState, HourlyForecastState, WeatherConditionsState } from "../../shared/types/store";
import { convertPressure, convertTemperature, convertWindSpeed, formatTime } from "../../shared/utils/converters";
import { findDescriptionById } from "../../shared/utils/weatherDescriptions";
import requestStore from "../requestStore";
import settingsStore from "../settingsStore";

class CurrentWeatherStore {
  constructor() {
    makeAutoObservable(this);
  }

  get currentWeather(): CurrentWeatherState | null {
    const weatherData = requestStore.forecast;
    const localNames = requestStore.local_names;
    const current = weatherData?.current;
    const firstDaily = weatherData?.daily?.[0];
    const currentWeatherInfo = current?.weather?.[0];

    if (!current || !firstDaily || !currentWeatherInfo || !localNames) return null;

    const { language, temperatureUnit } = settingsStore.settings;
    const description = findDescriptionById(currentWeatherInfo.description);

    return {
      cityName: localNames?.[language] ?? localNames?.["en"] ?? "Unknown",
      date: new Date(current.dt * 1000).toLocaleDateString(language, { day: "numeric", month: "long" }),
      weekday: new Date(current.dt * 1000).toLocaleDateString(language, { weekday: "long" }),
      temperature: convertTemperature(current.temp, temperatureUnit),
      icon: currentWeatherInfo.icon,
      maxTemp: convertTemperature(firstDaily.temp.max, temperatureUnit),
      minTemp: convertTemperature(firstDaily.temp.min, temperatureUnit),
      summary: description,
      description: description,
    };
  }

  get weatherConditions(): WeatherConditionsState[] {
    const weatherData = requestStore.forecast;
    const current = weatherData?.current;
    const firstDaily = weatherData?.daily?.[0];

    if (!current || !firstDaily) return [];

    const { pressureUnit, temperatureUnit, windSpeedUnit } = settingsStore.settings;

    return [
      { icon: "speed", value: Math.round(convertPressure(current.pressure, pressureUnit)), unit: pressureUnit, name: "pressure" },
      { icon: "humidity", value: Math.round(current.humidity), unit: "percent", name: "humidity" },
      { icon: "air", value: convertWindSpeed(current.wind_speed, windSpeedUnit), unit: windSpeedUnit, name: "wind" },
      { icon: "uv", value: Math.round(current.uvi), unit: "uv", name: "uv_index" },
      { icon: "rainy", value: Math.round(firstDaily.rain || 0), unit: "mm", name: "precipitation" },
      { icon: "thermostat", value: convertTemperature(current.feels_like, temperatureUnit), unit: temperatureUnit, name: "feels_like" },
    ];
  }

  get hourlyForecast(): HourlyForecastState[] {
    const hourlyData = requestStore.forecast?.hourly;
    if (!hourlyData || hourlyData.length === 0) return [];

    const { timeFormat, temperatureUnit } = settingsStore.settings;

    return hourlyData.slice(0, 24).map((hour) => {
      return {
        time: formatTime(hour.dt, timeFormat),
        dateISO: new Date(hour.dt * 1000).toISOString(),
        icon: hour.weather?.[0]?.icon ?? "01d",
        temperature: convertTemperature(hour.temp, temperatureUnit),
        description: findDescriptionById(hour.weather?.[0]?.description ?? ""),
      };
    });
  }
}

export const currentWeatherStore = new CurrentWeatherStore();
