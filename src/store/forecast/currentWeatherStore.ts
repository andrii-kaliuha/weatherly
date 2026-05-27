import { makeAutoObservable } from "mobx";
import type { SettingsState } from "../../shared/types/settings";
import type { WeatherResponse } from "../../shared/types/api";
import type { СurrentWeatherState, HourlyForecastState, WeatherConditionsState } from "../../shared/types/store";
import { convertPressure, convertTemperature, convertWindSpeed, formatTime } from "../../shared/utils/converters";
import { findDescriptionById } from "../../shared/utils/weatherDescriptions";

class CurrentWeatherStore {
  сurrentWeather: СurrentWeatherState | null = null;
  hourlyForecast: HourlyForecastState[] = [];
  weatherConditions: WeatherConditionsState[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: WeatherResponse, local_names: Record<string, string>, settings: SettingsState) {
    const current = data?.current;
    const firstDaily = data?.daily?.[0];
    const currentWeatherInfo = current?.weather?.[0];

    if (!current || !firstDaily || !currentWeatherInfo) {
      this.сurrentWeather = null;
      this.hourlyForecast = [];
      this.weatherConditions = [];
      return;
    }

    const { pressureUnit, temperatureUnit, windSpeedUnit } = settings;

    this.сurrentWeather = {
      cityName: local_names[settings.language] || local_names.en || "",
      date: new Date(current.dt * 1000).toLocaleDateString(settings.language, { day: "numeric", month: "long" }),
      weekday: new Date(current.dt * 1000).toLocaleDateString(settings.language, { weekday: "long" }),
      temperature: convertTemperature(current.temp, settings.temperatureUnit),
      icon: currentWeatherInfo.icon,
      maxTemp: convertTemperature(firstDaily.temp.max, settings.temperatureUnit),
      minTemp: convertTemperature(firstDaily.temp.min, settings.temperatureUnit),
      summary: findDescriptionById(currentWeatherInfo.description).summary,
      description: findDescriptionById(currentWeatherInfo.description).description,
    };

    this.weatherConditions = [
      { icon: "speed", value: Math.round(convertPressure(current.pressure, pressureUnit)), unit: pressureUnit, name: "pressure" },
      { icon: "humidity", value: Math.round(current.humidity), unit: "percent", name: "humidity" },
      { icon: "air", value: convertWindSpeed(current.wind_speed, windSpeedUnit), unit: windSpeedUnit, name: "wind" },
      { icon: "uv", value: Math.round(current.uvi), unit: "uv", name: "uv_index" },
      { icon: "rainy", value: Math.round(firstDaily.rain || 0), unit: "mm", name: "precipitation" },
      { icon: "thermostat", value: convertTemperature(current.feels_like, temperatureUnit), unit: temperatureUnit, name: "feels_like" },
    ];

    this.hourlyForecast = (data.hourly || []).slice(0, 24).map((hour) => {
      const hourWeatherInfo = hour.weather?.[0];

      return {
        time: formatTime(hour.dt, settings.format),
        dateISO: new Date(hour.dt * 1000).toISOString(),
        icon: hourWeatherInfo.icon,
        temperature: convertTemperature(hour.temp, settings.temperatureUnit),
        description: findDescriptionById(hourWeatherInfo.description).description,
      };
    });
  }
}

export const currentWeatherStore = new CurrentWeatherStore();
