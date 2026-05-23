export type WeatherResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: Minutely[];
  hourly: Current[];
  daily: Daily[];
};

type Current = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
  pop?: number;
  rain?: { "1h"?: number; "3h"?: number };
  snow?: { "1h"?: number; "3h"?: number };
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Daily = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: FeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  summary: string;
  sunrise: number;
  sunset: number;
  temp: Temp;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
  rain?: number;
  snow?: number;
};

type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

type Temp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type Minutely = {
  dt: number;
  precipitation: number;
};

export type AirPollutionResponse = {
  coord: [number, number];
  list: AirPollutionItem[];
};

export type AirPollutionItem = {
  dt: number;
  main: {
    /** Air Quality Index. 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor */
    aqi: number;
  };
  components: PollutionComponents;
};

type PollutionComponents = {
  co: number; // Оксид вуглецю (Carbon monoxide)
  no: number; // Оксид азоту (Nitrogen monoxide)
  no2: number; // Діоксид азоту (Nitrogen dioxide)
  o3: number; // Озон (Ozone)
  so2: number; // Діоксид сірки (Sulfur dioxide)
  pm2_5: number; // Дрібнодисперсні частинки PM2.5
  pm10: number; // Грубодисперсні частинки PM10
  nh3: number; // Аміак (Ammonia)
};
