import { makeAutoObservable } from "mobx";
import { t } from "i18next";
import type { TemperatureUnit, PressureUnit, WindSpeedUnit, Language, TimeFormat, SettingsState } from "../types";
import type { AirPollutionResponse, Daily, WeatherResponse } from "../shared/types/api";
import type {
  AirQualityState,
  AstronomyState,
  СurrentWeatherState,
  HourlyForecastState,
  WeatherConditionsState,
  WeeklyForecastState,
} from "../shared/types/store";

const convertTemperature = (value: number, temperatureUnit: TemperatureUnit): number => {
  switch (temperatureUnit) {
    case "celsius":
      return Math.round(value - 273.15);
    case "fahrenheit":
      return Math.round(((value - 273.15) * 9) / 5 + 32);
    default:
      return Math.round(value);
  }
};

const convertWindSpeed = (value: number, windSpeedUnit: WindSpeedUnit): number => {
  switch (windSpeedUnit) {
    case "mph":
      return Math.round(value * 2.236936);
    case "km_h":
      return Math.round(value * 3.6);
    default:
      return Math.round(value);
  }
};

const convertPressure = (value: number, pressureUnit: PressureUnit): number => {
  return pressureUnit === "mmHg" ? Math.round(value * 0.750061683) : Math.round(value);
};

const formatTime = (timestamp: number, format: TimeFormat) => {
  return new Date(timestamp * 1000).toLocaleTimeString(format === "24_hour" ? "uk-UA" : "en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

const findDescriptionById = (id: string) => {
  return descriptions.find((item) => item.id === id);
};

const descriptions = [
  { id: "clear sky", description: "description_clear_sky", summary: "clear_sky" },
  { id: "few clouds", description: "description_few_clouds", summary: "few_clouds" },
  { id: "scattered clouds", description: "description_scattered_clouds", summary: "scattered_clouds" },
  { id: "broken clouds", description: "description_broken_clouds", summary: "broken_clouds" },
  { id: "overcast clouds", description: "description_overcast_clouds", summary: "overcast_clouds" },
  { id: "shower rain", description: "description_shower_rain", summary: "shower_rain" },
  { id: "rain", description: "description_rain", summary: "rain" },
  { id: "thunderstorm", description: "description_thunderstorm", summary: "thunderstorm" },
  { id: "snow", description: "description_snow", summary: "snow" },
  { id: "mist", description: "description_mist", summary: "mist" },
  { id: "fog", description: "description_fog", summary: "fog" },
  { id: "drizzle", description: "description_drizzle", summary: "drizzle" },
  { id: "light rain", description: "description_light_rain", summary: "light_rain" },
  { id: "moderate rain", description: "description_moderate_rain", summary: "moderate_rain" },
  { id: "heavy intensity rain", description: "description_heavy_intensity_rain", summary: "heavy_intensity_rain" },
  { id: "very heavy rain", description: "description_very_heavy_rain", summary: "very_heavy_rain" },
  { id: "extreme rain", description: "description_extreme_rain", summary: "extreme_rain" },
  { id: "freezing rain", description: "description_freezing_rain", summary: "freezing_rain" },
  { id: "light intensity shower rain", description: "description_light_intensity_shower_rain", summary: "light_intensity_shower_rain" },
  { id: "heavy intensity shower rain", description: "description_heavy_intensity_shower_rain", summary: "heavy_intensity_shower_rain" },
  { id: "light snow", description: "description_light_snow", summary: "light_snow" },
  { id: "heavy snow", description: "description_heavy_snow", summary: "heavy_snow" },
  { id: "sleet", description: "description_sleet", summary: "sleet" },
  { id: "light shower sleet", description: "description_light_shower_sleet", summary: "light_shower_sleet" },
  { id: "shower sleet", description: "description_shower_sleet", summary: "shower_sleet" },
  { id: "light rain and snow", description: "description_light_rain_and_snow", summary: "light_rain_and_snow" },
  { id: "rain and snow", description: "description_rain_and_snow", summary: "rain_and_snow" },
  { id: "light shower snow", description: "description_light_shower_snow", summary: "light_shower_snow" },
  { id: "shower snow", description: "description_shower_snow", summary: "shower_snow" },
  { id: "heavy shower snow", description: "description_heavy_shower_snow", summary: "heavy_shower_snow" },
  { id: "haze", description: "description_haze", summary: "haze" },
  { id: "smoke", description: "description_smoke", summary: "smoke" },
  { id: "dust", description: "description_dust", summary: "dust" },
  { id: "sand", description: "description_sand", summary: "sand" },
  { id: "volcanic ash", description: "description_volcanic_ash", summary: "volcanic_ash" },
  { id: "squalls", description: "description_squalls", summary: "squalls" },
  { id: "tornado", description: "description_tornado", summary: "tornado" },
];

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

const getMoonPhase = (moonPhase: number | null): string => {
  if (moonPhase === null) return "astronomy.moon_phases.undefined";

  switch (true) {
    case moonPhase <= 0.03:
      return "astronomy.moon_phases.new_moon";
    case moonPhase <= 0.24:
      return "astronomy.moon_phases.waxing_crescent";
    case moonPhase === 0.25:
      return "astronomy.moon_phases.first_quarter";
    case moonPhase <= 0.49:
      return "astronomy.moon_phases.waxing_gibbous";
    case moonPhase === 0.5:
      return "astronomy.moon_phases.full_moon";
    case moonPhase <= 0.74:
      return "astronomy.moon_phases.waning_gibbous";
    case moonPhase === 0.75:
      return "astronomy.moon_phases.last_quarter";
    case moonPhase <= 0.99:
      return "astronomy.moon_phases.waning_crescent";
    default:
      return "astronomy.moon_phases.unknown";
  }
};

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

    const descData = findDescriptionById(currentWeatherInfo.description);

    this.сurrentWeather = {
      cityName: local_names[settings.language] || local_names.en || "",
      date: new Date(current.dt * 1000).toLocaleDateString(settings.language, { day: "numeric", month: "long" }),
      weekday: new Date(current.dt * 1000).toLocaleDateString(settings.language, { weekday: "long" }),
      temperature: convertTemperature(current.temp, settings.temperatureUnit),
      icon: `/weather-icons/${settings.theme === "dark" ? "dark" : "light"}/${currentWeatherInfo.icon}.svg`,
      maxTemp: convertTemperature(firstDaily.temp.max, settings.temperatureUnit),
      minTemp: convertTemperature(firstDaily.temp.min, settings.temperatureUnit),
      summary: descData ? t(descData.summary) : currentWeatherInfo.description,
      description: descData ? t(descData.description) : currentWeatherInfo.description,
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
      const hourDescData = findDescriptionById(hourWeatherInfo?.description || "");

      return {
        time: formatTime(hour.dt, settings.format),
        dateISO: new Date(hour.dt * 1000).toISOString(),
        icon: `/weather-icons/${settings.theme === "dark" ? "dark" : "light"}/${hourWeatherInfo?.icon || "01d"}.svg`,
        temperature: convertTemperature(hour.temp, settings.temperatureUnit),
        description: hourDescData ? t(hourDescData.description) : hourWeatherInfo?.description || "",
      };
    });
  }
}

class AstronomyStore {
  astronomy: AstronomyState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAstronomy(data: WeatherResponse, format: TimeFormat) {
    const daily = data?.daily?.[0];

    if (!daily) {
      this.astronomy = null;
      return;
    }

    this.astronomy = {
      sunrise: formatTime(daily.sunrise, format),
      sunset: formatTime(daily.sunset, format),
      moonrise: formatTime(daily.moonrise, format),
      moonset: formatTime(daily.moonset, format),
      moonPhase: getMoonPhase(daily.moon_phase),
      durationDay: new Date((daily.sunset - daily.sunrise) * 1000).toISOString().slice(11, 19),
    };
  }
}

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
        date: new Date(day.dt * 1000).toLocaleString(language, {
          day: "numeric",
          month: "long",
        }),
        weekday: new Date(day.dt * 1000).toLocaleString(language, {
          weekday: "long",
        }),
        icon: day.weather[0].icon,
        description: descriptionData ? descriptionData.description : day.weather[0].description,
        maxTemp: convertTemperature(day.temp.max, temperatureUnit),
        minTemp: convertTemperature(day.temp.min, temperatureUnit),
      };
    });
  }
}

export const currentWeatherStore = new CurrentWeatherStore();
export const astronomyStore = new AstronomyStore();
export const airQualityStore = new AirQualityStore();
export const weeklyForecastStore = new WeeklyForecastStore();
