import { makeAutoObservable } from "mobx";
import { t } from "i18next";

export type settingsProps = {
  temperatureUnit: string;
  windSpeedUnit: string;
  pressureUnit: string;
  language: string;
  theme: string;
  format: string;
};

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
  return new Date(timestamp * 1000).toLocaleTimeString(format === "24-hour format" ? "uk-UA" : "en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

const descriptions: Record<string, string> = {
  "clear sky": "ясне небо",
  "few clouds": "мало хмар",
  "scattered clouds": "розсіяні хмари",
  "broken clouds": "рвані хмари",
  "shower rain": "зливовий дощ",
  "overcast clouds": "хмарно",
  rain: "дощ",
  thunderstorm: "гроза",
  snow: "сніг",
  mist: "туман",
};

const translate = (description: string, locale: string): string => {
  if (locale === "uk-UA") {
    return descriptions[description.toLowerCase()] || description;
  }
  return description;
};

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

  updateCurrentWeather(data: any, local_names: Record<string, string>, settings: settingsProps) {
    const locale = settings.language === "Ukrainian" ? "uk-UA" : "en-US";
    this.cityName = local_names[settings.language.slice(0, 2).toLowerCase()] || local_names.en;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
    });
    this.weekday = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      weekday: "long",
    });
    this.temperature = convertTemperature(data.current.temp, settings.temperatureUnit);
    this.icon = `./src/assets/icons/${data.current.weather[0].icon}.svg`;
    this.description = translate(data.current.weather[0].description, locale);
    this.maxTemp = convertTemperature(data.daily[0].temp.max, settings.temperatureUnit);
    this.minTemp = convertTemperature(data.daily[0].temp.min, settings.temperatureUnit);
    this.summary = data.daily[0].summary;
    this.weatherConditions = [
      { icon: "speed", value: `${convertPressure(data.current.pressure, settings.pressureUnit)} ${settings.pressureUnit}`, name: "Pressure" },
      { icon: "humidity", value: `${Math.round(data.current.humidity)} %`, name: "Humidity" },
      { icon: "air", value: `${convertWindSpeed(data.current.wind_speed, settings.windSpeedUnit)} ${settings.windSpeedUnit}`, name: "Wind" },
      { icon: "uv", value: `${Math.round(data.current.uvi)} / 12`, name: "UV index" },
      { icon: "rainy", value: `${Math.round(data.daily[0]?.rain || 0)} mm`, name: "Precipitation" },
      {
        icon: "thermometer",
        value: `${convertTemperature(data.current.feels_like, settings.temperatureUnit)}°${settings.temperatureUnit.charAt(0).toUpperCase()}`,
        name: "Feels like",
      },
    ];
    this.hourlyForecast = data.hourly.slice(0, 24).map((hour: any) => ({
      time: formatTime(hour.dt, settings.format),
      icon: `./src/assets/icons/${hour.weather[0].icon}.svg`,
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

  updateAstronomy(data: any, { format }: settingsProps) {
    function getMoonPhase(moonPhase: number | null): string {
      if (moonPhase === null) return "Фаза Місяця не визначена";

      return (
        (moonPhase <= 0.03 && "Новий Місяць") ||
        (moonPhase <= 0.24 && "Зростаючий Місяць") ||
        (moonPhase === 0.25 && "Перша чверть") ||
        (moonPhase <= 0.49 && "Зростаючий опуклий") ||
        (moonPhase === 0.5 && "Повний Місяць") ||
        (moonPhase <= 0.74 && "Спадаючий опуклий") ||
        (moonPhase === 0.75 && "Остання чверть") ||
        (moonPhase <= 0.99 && "Спадаючий серп") ||
        "Невідома фаза Місяця"
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
  color: string | null = null;
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

  updateAirQuality(data: any, local_names: Record<string, string>, { language }: settingsProps) {
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

  updateWeeklyForecast(data: any, { language, temperatureUnit }: settingsProps) {
    const locale = language === "Ukrainian" ? "uk-UA" : "en-US";
    this.weeklyForecast = data.slice(0, 7).map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleString(locale, {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(day.dt * 1000).toLocaleString(locale, {
        weekday: "long",
      }),
      icon: day.weather[0].icon,
      description: translate(day.weather[0].description, locale),
      maxTemp: convertTemperature(day.temp.max, temperatureUnit),
      minTemp: convertTemperature(day.temp.min, temperatureUnit),
    }));
  }
}

export const currentWeatherStore = new CurrentWeatherStore();
export const weeklyForecastStore = new WeeklyForecastStore();
export const astronomyStore = new AstronomyStore();
export const airQualityStore = new AirQualityStore();
