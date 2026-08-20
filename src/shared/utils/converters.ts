import { PressureUnit, TemperatureUnit, TimeFormat, WindSpeedUnit } from "../types/settings";

export const convertTemperature = (value: number, temperatureUnit: TemperatureUnit): number => {
  switch (temperatureUnit) {
    case "celsius":
      return Math.round(value - 273.15);
    case "fahrenheit":
      return Math.round(((value - 273.15) * 9) / 5 + 32);
    default:
      return Math.round(value);
  }
};

export const convertWindSpeed = (value: number, windSpeedUnit: WindSpeedUnit): number => {
  switch (windSpeedUnit) {
    case "mph":
      return Math.round(value * 2.236936);
    case "km_h":
      return Math.round(value * 3.6);
    default:
      return Math.round(value);
  }
};

export const convertPressure = (value: number, pressureUnit: PressureUnit): number => {
  return pressureUnit === "mmHg" ? Math.round(value * 0.750061683) : Math.round(value);
};

export const formatTime = (timestamp: number, timeFormat: TimeFormat) => {
  return new Date(timestamp * 1000).toLocaleTimeString(timeFormat === "24_hour" ? "uk-UA" : "en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};
