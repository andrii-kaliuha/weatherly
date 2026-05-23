export type СurrentWeatherState = {
  cityName: string;
  date: string;
  weekday: string;
  temperature: number;
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
  summary: string;
};

export type HourlyForecastState = { temperature: number; icon: string; time: string; dateISO: string; description: string };
export type WeatherConditionsState = { icon: string; value: number; unit: string; name: string };

export type WeeklyForecastState = {
  dateISO: string;
  date: string;
  weekday: string;
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
};

export type AstronomyState = {
  durationDay: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonrise: string;
  moonset: string;
};

export type AirQualityState = {
  cityName: string | null;
  aqi: number;
  color: string;
  title: string;
  description: string;
  airPollutants: { name: string; value: number; icon: string }[];
};
