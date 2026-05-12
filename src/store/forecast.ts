import { makeAutoObservable } from "mobx";
import { t } from "i18next";
import type { SettingsProps } from "../types";

const convertTemperature = (value: number, temperatureUnit: string): number => {
  switch (temperatureUnit) {
    case "celsius":
      return Math.round(value - 273.15);
    case "fahrenheit":
      return Math.round(((value - 273.15) * 9) / 5 + 32);
    default:
      return Math.round(value);
  }
};

const convertWindSpeed = (value: number, windSpeedUnit: string): number => {
  switch (windSpeedUnit) {
    case "mph":
      return Math.round(value * 2.236936);
    case "km/h":
      return Math.round(value * 3.6);
    default:
      return Math.round(value);
  }
};

const convertPressure = (value: number, pressureUnit: string): number => {
  return pressureUnit === "mmHg" ? Math.round(value * 0.750061683) : Math.round(value);
};

const formatTime = (timestamp: number, format: string) => {
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

class CurrentWeatherStore {
  cityName: string | null = null;
  date: string | null = null;
  weekday: string | null = null;
  temperature: number | null = null;
  icon: string = "";
  description: string | null = null;
  maxTemp: number | null = null;
  minTemp: number | null = null;
  summary: string | null = null;
  hourlyForecast: { temperature: number; icon: string; time: string }[] = [];
  weatherConditions: { icon: string; value: string; name: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: any, local_names: Record<string, string>, settings: SettingsProps) {
    const locale = settings.language === "ukrainian" ? "uk-UA" : "en-US";
    this.cityName = local_names[settings.language.slice(0, 2).toLowerCase()] || local_names.en;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
    });
    this.weekday = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      weekday: "long",
    });
    this.temperature = convertTemperature(data.current.temp, settings.temperatureUnit);
    this.icon = `./weather-icons/${settings.theme === "dark" ? "dark" : "light"}/${data.current.weather[0].icon}.svg`;
    this.maxTemp = convertTemperature(data.daily[0].temp.max, settings.temperatureUnit);
    this.minTemp = convertTemperature(data.daily[0].temp.min, settings.temperatureUnit);

    const descData = findDescriptionById(data.current.weather[0].description);
    this.summary = t(`${descData?.summary}`);
    this.description = t(`${descData?.description}`);

    this.weatherConditions = [
      {
        icon: "speed",
        value: `${convertPressure(data.current.pressure, settings.pressureUnit)} ${t(settings.pressureUnit)}`,
        name: t("pressure"),
      },
      { icon: "humidity", value: `${Math.round(data.current.humidity)} %`, name: t("humidity") },
      {
        icon: "air",
        value: `${convertWindSpeed(data.current.wind_speed, settings.windSpeedUnit)} ${t(settings.windSpeedUnit)}`,
        name: t("wind"),
      },
      { icon: "uv", value: `${Math.round(data.current.uvi)} / 12`, name: t("uv_index") },
      { icon: "rainy", value: `${Math.round(data.daily[0]?.rain || 0)} ${t("mm")}`, name: t("precipitation") },
      {
        icon: "thermostat",
        value: `${convertTemperature(data.current.feels_like, settings.temperatureUnit)}°${settings.temperatureUnit.charAt(0).toUpperCase()}`,
        name: t("feels_like"),
      },
    ];
    this.hourlyForecast = data.hourly.slice(0, 24).map((hour: any) => ({
      time: formatTime(hour.dt, settings.format),
      icon: `./weather-icons/${settings.theme === "dark" ? "dark" : "light"}/${hour.weather[0].icon}.svg`,
      temperature: convertTemperature(hour.temp, settings.temperatureUnit),
    }));
  }
}

class AstronomyStore {
  durationDay: string | null = null;
  sunrise: string | null = null;
  sunset: string | null = null;
  moonPhase: string | null = null;
  moonrise: string | null = null;
  moonset: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAstronomy(data: any, { format }: SettingsProps) {
    function getMoonPhase(moonPhase: number | null): string {
      if (moonPhase === null) return t("moon_phase_is_undefined");

      return (
        (moonPhase <= 0.03 && t("new_moon")) ||
        (moonPhase <= 0.24 && t("waxing_crescent")) ||
        (moonPhase === 0.25 && t("first_quarter")) ||
        (moonPhase <= 0.49 && t("waxing_gibbous")) ||
        (moonPhase === 0.5 && t("full_moon")) ||
        (moonPhase <= 0.74 && t("waning_gibbous")) ||
        (moonPhase === 0.75 && t("last_quarter")) ||
        (moonPhase <= 0.99 && t("waning_crescent")) ||
        t("unknown_moon_phase")
      );
    }

    function calculateDuration(start: number, end: number): string {
      return new Date((end - start) * 1000).toISOString().slice(11, 19);
    }

    this.sunrise = formatTime(data.daily[0].sunrise, format);
    this.sunset = formatTime(data.daily[0].sunset, format);
    this.moonrise = formatTime(data.daily[0].moonrise, format);
    this.moonset = formatTime(data.daily[0].moonset, format);
    this.moonPhase = getMoonPhase(data.daily[0].moon_phase);
    this.durationDay = calculateDuration(data.daily[0].sunrise, data.daily[0].sunset);
  }
}

class AirQualityStore {
  cityName: string | null = null;
  aqi: number | null = null;
  color: string | "inherit" = "inherit";
  title: string | null = null;
  description: string | null = null;
  airPollutants: { name: string; value: number; icon: string }[] = [];
  airQualityLevels = [
    { aqi: 1, range: "AQI 0-50", color: "#a2d043", title: "good_air_title", description: "good_air_description" },
    { aqi: 2, range: "AQI 51-100", color: "#f8cc4a", title: "satisfactory_air_title", description: "satisfactory_air_description" },
    { aqi: 3, range: "AQI 101-150", color: "#f19342", title: "harmful_air_title", description: "harmful_air_description" },
    { aqi: 4, range: "AQI 151-200", color: "#d85f38", title: "unhealthy_air_title", description: "unhealthy_air_description" },
    { aqi: 5, range: "AQI 201-300", color: "#903c70", title: "bad_air_title", description: "bad_air_description" },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateAirQuality(data: any, local_names: Record<string, string>, { language }: SettingsProps) {
    this.cityName = local_names[language.slice(0, 2).toLowerCase()];
    this.aqi = data.list[0].main.aqi;
    const currentAirQuality = this.airQualityLevels.find((item) => item.aqi === this.aqi) || this.airQualityLevels[4];
    this.color = currentAirQuality.color;
    this.title = t(currentAirQuality.title);
    this.description = t(currentAirQuality.description);
    this.airPollutants = [
      { name: "PM 2.5", value: Math.round(data.list[0].components.pm2_5), icon: "pm2_5" },
      { name: "PM 10", value: Math.round(data.list[0].components.pm10), icon: "pm10" },
      { name: "SO2", value: Math.round(data.list[0].components.so2), icon: "so2" },
      { name: "NO2", value: Math.round(data.list[0].components.no2), icon: "no2" },
    ];
  }
}

class WeeklyForecastStore {
  weeklyForecast: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: any, { language, temperatureUnit }: SettingsProps) {
    const locale = language === "ukrainian" ? "uk-UA" : "en-US";

    this.weeklyForecast = data.slice(0, 7).map((day: any) => {
      const descriptionData = findDescriptionById(day.weather[0].description);
      const description = descriptionData ? t(descriptionData.description) : day.weather[0].description;

      return {
        date: new Date(day.dt * 1000).toLocaleString(locale, {
          day: "numeric",
          month: "long",
        }),
        weekday: new Date(day.dt * 1000).toLocaleString(locale, {
          weekday: "long",
        }),
        icon: day.weather[0].icon,
        description: description,
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
