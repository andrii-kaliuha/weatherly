import { makeAutoObservable } from "mobx";

class CurrentWeatherStore {
  cityName: string | null = null;
  date: string | null = null;
  temperature: number | null = null;
  icon: string = "";
  description: string | null = null;
  maxTemp: number | null = null;
  minTemp: number | null = null;
  summary: string | null = null;
  hourlyForecast: { temperature: number; icon: string; time: string }[] = [];
  weatherConditions: { icon: string; value: string; label: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateCurrentWeather(data: any, cityName: string) {
    this.cityName = cityName;
    this.date = new Date(data.current.dt * 1000).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });
    this.temperature = Math.round(data.current.temp);
    this.icon = `./src/assets/icons/${data.current.weather[0].icon}.svg`;
    this.description = data.current.weather[0].description;
    this.maxTemp = Math.round(data.daily[0].temp.max);
    this.minTemp = Math.round(data.daily[0].temp.min);
    this.summary = data.daily[0].summary;
    this.weatherConditions = [
      { icon: "pressure", value: `${Math.round(data.current.pressure)} hPa`, label: "Pressure" },
      { icon: "humidity", value: `${Math.round(data.current.humidity)} %`, label: "Humidity" },
      { icon: "wind", value: `${Math.round(data.current.wind_speed)} m/s`, label: "Wind" },
      { icon: "uv", value: `${Math.round(data.current.uvi)} / 12`, label: "UV index" },
      { icon: "precipitation", value: `${Math.round(data.daily[0]?.rain || 0)} mm`, label: "Precipitation" },
      { icon: "feels like", value: `${Math.round(data.current.feels_like)}°C`, label: "Feels like" },
    ];
    this.hourlyForecast = data.hourly.map((hour: any) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
      }),
      icon: `./src/assets/icons/${hour.weather[0].icon}.svg`,
      temperature: Math.round(hour.temp),
    }));
  }
}

class WeeklyForecastStore {
  weeklyForecast: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateWeeklyForecast(data: any) {
    this.weeklyForecast = data.slice(0, 7).map((day: any) => ({
      date: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        day: "numeric",
        month: "long",
      }),
      weekday: new Date(day.dt * 1000).toLocaleString("uk-UA", {
        weekday: "long",
      }),
      minTemp: Math.round(day.temp.min),
      maxTemp: Math.round(day.temp.max),
      icon: day.weather[0].icon,
      description: day.weather[0].description,
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

  updateAstronomyInfo(data: any) {
    function getMoonPhase(moonPhase: number | null): string {
      if (moonPhase === null) {
        return "Фаза Місяця не визначена";
      }

      const moonPhases = [
        { phase: "Новий Місяць", range: [0, 0.03] },
        { phase: "Зростаючий Місяць", range: [0.04, 0.24] },
        { phase: "Перша чверть", range: [0.25, 0.25] },
        { phase: "Зростаючий опуклий", range: [0.26, 0.49] },
        { phase: "Повний Місяць", range: [0.5, 0.5] },
        { phase: "Спадаючий опуклий", range: [0.51, 0.74] },
        { phase: "Остання чверть", range: [0.75, 0.75] },
        { phase: "Спадаючий серп", range: [0.76, 0.99] },
      ];

      for (const { phase, range } of moonPhases) {
        const [min, max] = range;
        if (moonPhase >= min && moonPhase <= max) {
          return phase;
        }
      }

      return "Невідома фаза Місяця";
    }

    function formatTime(timestamp: number) {
      return new Date(timestamp * 1000).toLocaleTimeString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
      });
    }

    function calculateDuration(start: number, end: number) {
      const durationInSeconds = end - start;
      return new Date(durationInSeconds * 1000).toISOString().slice(11, 19);
    }

    this.sunrise = formatTime(data.daily[0].sunrise);
    this.sunset = formatTime(data.daily[0].sunset);
    this.moonrise = formatTime(data.daily[0].moonrise);
    this.moonset = formatTime(data.daily[0].moonset);
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
      id: 1,
      range: "AQI 0-50",
      color: "#a2d043",
      title: "Хороше повітря",
      description:
        "Повітря чисте, а рівень забруднення є мінімальним або не становить жодної загрози для здоров'я. Це безпечно для більшості людей.",
    },
    {
      id: 2,
      range: "AQI 51-100",
      color: "#f8cc4a",
      title: "Задовільне повітря",
      description:
        "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
    },
    {
      id: 3,
      range: "AQI 101-150",
      color: "#f19342",
      title: "Шкідливо для чутливих груп",
      description:
        "Забруднення повітря досягло високого рівня, воно є небезпечним для людей з підвищеною чутливістю. Якщо ви відчуєте утруднене дихання або подразнення горла, скоротите час перебування на вулиці.",
    },
    {
      id: 4,
      range: "AQI 151-200",
      color: "#d85f38",
      title: "Нездорове повітря",
      description:
        "Люди з підвищеною чутливістю можуть відчувати себе погано. При тривалому знаходженні на вулиці здорові люди можуть відчути утруднене дихання або подразнення горла. Обмежте тривале перебування на вулиці.",
    },
    {
      id: 5,
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
    const currentAirQuality = this.airQualityLevels.find((item) => item.id === this.aqi) || this.airQualityLevels[4];
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
