import { makeAutoObservable } from "mobx";

export type settingsProps = {
  temperatureUnit: "celsius" | "fahrenheit" | "kelvin";
  windSpeedUnit: "m/s" | "mph" | "km/h";
  pressureUnit: "hPa" | "mmHg";
  language: "uk" | "en";
  format: "24-hour format" | "12-hour format";
};

const convertTemperature = (value: number, temperatureUnit: "celsius" | "fahrenheit" | "kelvin" = "kelvin"): number => {
  switch (temperatureUnit) {
    case "celsius":
      return Math.round(value - 273.15);
    case "fahrenheit":
      return Math.round(((value - 273.15) * 9) / 5 + 32);
    default:
      return Math.round(value);
  }
};

const convertWindSpeed = (value: number, windSpeedUnit: "m/s" | "mph" | "km/h" = "m/s"): number => {
  switch (windSpeedUnit) {
    case "mph":
      return Math.round(value * 2.236936);
    case "km/h":
      return Math.round(value * 3.6);
    default:
      return Math.round(value);
  }
};

const convertPressure = (value: number, pressureUnit: "hPa" | "mmHg" = "hPa"): number => {
  return pressureUnit === "mmHg" ? Math.round(value * 0.750061683) : Math.round(value);
};

const formatTime = (timestamp: number, format: "24-hour format" | "12-hour format" = "24-hour format") => {
  return new Date(timestamp * 1000).toLocaleTimeString(format === "24-hour format" ? "uk-UA" : "en-US", {
    hour: "numeric",
    minute: "numeric",
  });
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

  updateCurrentWeather(data: any, cityName: string, { language, temperatureUnit, windSpeedUnit, pressureUnit, format }: settingsProps) {
    const locale = language === "uk" ? "uk-UA" : "en-US";
    this.cityName = cityName;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
    });
    this.weekday = new Date(data.current.dt * 1000).toLocaleDateString(locale, {
      weekday: "long",
    });
    this.temperature = convertTemperature(data.current.temp, temperatureUnit);
    this.icon = `./src/assets/icons/${data.current.weather[0].icon}.svg`;
    this.description = data.current.weather[0].description;
    this.maxTemp = convertTemperature(data.daily[0].temp.max, temperatureUnit);
    this.minTemp = convertTemperature(data.daily[0].temp.min, temperatureUnit);
    this.summary = data.daily[0].summary;
    this.weatherConditions = [
      { icon: "speed", value: `${convertPressure(data.current.pressure, pressureUnit)} ${pressureUnit}`, name: "Pressure" },
      { icon: "humidity_mid", value: `${Math.round(data.current.humidity)} %`, name: "Humidity" },
      { icon: "air", value: `${convertWindSpeed(data.current.wind_speed, windSpeedUnit)} ${windSpeedUnit}`, name: "Wind" },
      { icon: "heat", value: `${Math.round(data.current.uvi)} / 12`, name: "UV index" },
      { icon: "rainy", value: `${Math.round(data.daily[0]?.rain || 0)} mm`, name: "Precipitation" },
      {
        icon: "thermometer",
        value: `${convertTemperature(data.current.feels_like, temperatureUnit)}°${temperatureUnit.charAt(0).toUpperCase()}`,
        name: "Feels like",
      },
    ];
    this.hourlyForecast = data.hourly.slice(0, 24).map((hour: any) => ({
      time: formatTime(hour.dt, format),
      icon: `./src/assets/icons/${hour.weather[0].icon}.svg`,
      temperature: convertTemperature(hour.temp, temperatureUnit),
    }));
  }
}

class WeeklyForecastStore {
  weeklyForecast: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: any, { language, temperatureUnit }: settingsProps) {
    const locale = language === "uk" ? "uk-UA" : "en-US";
    this.weeklyForecast = data.slice(0, 7).map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleString(locale, {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(day.dt * 1000).toLocaleString(locale, {
        weekday: "long",
      }),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
      maxTemp: convertTemperature(day.temp.max, temperatureUnit),
      minTemp: convertTemperature(day.temp.min, temperatureUnit),
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
    {
      aqi: 1,
      range: "AQI 0-50",
      color: "#a2d043",
      title: "Хороше повітря",
      description:
        "Повітря чисте, а рівень забруднення є мінімальним або не становить жодної загрози для здоров'я. Це безпечно для більшості людей.",
    },
    {
      aqi: 2,
      range: "AQI 51-100",
      color: "#f8cc4a",
      title: "Задовільне повітря",
      description:
        "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
    },
    {
      aqi: 3,
      range: "AQI 101-150",
      color: "#f19342",
      title: "Шкідливо для чутливих груп",
      description:
        "Забруднення повітря досягло високого рівня, воно є небезпечним для людей з підвищеною чутливістю. Якщо ви відчуєте утруднене дихання або подразнення горла, скоротите час перебування на вулиці.",
    },
    {
      aqi: 4,
      range: "AQI 151-200",
      color: "#d85f38",
      title: "Нездорове повітря",
      description:
        "Люди з підвищеною чутливістю можуть відчувати себе погано. При тривалому знаходженні на вулиці здорові люди можуть відчути утруднене дихання або подразнення горла. Обмежте тривале перебування на вулиці.",
    },
    {
      aqi: 5,
      range: "AQI 201-300",
      color: "#903c70",
      title: "Погане повітря",
      description:
        "Кожен може почати відчувати наслідки для здоров'я, члени чутливих груп можуть відчувати більш серйозні наслідки. Підвищена ймовірність погіршення роботи серця і легенів. Слід обмежити перебування на свіжому повітрі.",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateAirQuality(data: any, cityName: string) {
    this.cityName = cityName;
    this.aqi = data.list[0].main.aqi;
    const currentAirQuality = this.airQualityLevels.find((item) => item.aqi === this.aqi) || this.airQualityLevels[4];
    this.color = currentAirQuality.color;
    this.title = currentAirQuality.title;
    this.description = currentAirQuality.description;
    this.airPollutants = [
      {
        name: "PM 2.5",
        value: Math.round(data.list[0].components.pm2_5),
        icon: "pm2_5",
      },
      {
        name: "PM 10",
        value: Math.round(data.list[0].components.pm10),
        icon: "pm10",
      },
      {
        name: "SO2",
        value: Math.round(data.list[0].components.so2),
        icon: "so2",
      },
      {
        name: "NO2",
        value: Math.round(data.list[0].components.no2),
        icon: "no2",
      },
    ];
  }
}

export const currentWeatherStore = new CurrentWeatherStore();
export const weeklyForecastStore = new WeeklyForecastStore();
export const astronomyStore = new AstronomyStore();
export const airQualityStore = new AirQualityStore();
