import { makeAutoObservable } from "mobx";
// import { astronomyStore, currentWeatherStore } from "./forecast";
// import i18n from "../i18n";

type Settings = {
  temperature: string;
  wind: string;
  pressure: string;
  language: string;
  interfaceTheme: string;
  formatTime: string;
  [key: string]: string;
};

class rootStore {
  isStartScreenVisible = true;
  isSideMenuVisible = false;
  isSelectVisible = false;

  settings: Settings = {
    temperature: "kelvin",
    wind: "m/s",
    pressure: "hPa",
    language: "Ukrainian",
    interfaceTheme: "Dark",
    formatTime: "24-hour format",
  };

  constructor() {
    makeAutoObservable(this);
  }

  hideStartScreen() {
    this.isStartScreenVisible = false;
  }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

  toggleSetting() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  convertTemperature(value: number, temperatureUnit: "celsius" | "fahrenheit" | "kelvin" = "celsius"): number {
    switch (temperatureUnit) {
      case "fahrenheit":
        return Math.round((value * 9) / 5 + 32);
      case "kelvin":
        return Math.round(value + 273.15);
      default:
        return Math.round(value);
    }
  }

  convertWindSpeed(value: number, windSpeedUnit: "m/s" | "mph" | "km/h" = "m/s"): number {
    switch (windSpeedUnit) {
      case "mph":
        return Math.round(value * 2.236936);
      case "km/h":
        return Math.round(value * 3.6);
      default:
        return Math.round(value);
    }
  }

  convertPressure(value: number, pressureUnit: "hPa" | "mmHg" = "hPa"): number {
    return pressureUnit === "mmHg" ? Math.round(value * 0.750061683) : Math.round(value);
  }

  formatTime(timestamp: number, format: "24-hour format" | "12-hour format" = "24-hour format") {
    return new Date(timestamp * 1000).toLocaleTimeString(format === "24-hour format" ? "uk-UA" : "en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: format === "12-hour format",
    });
  }

  // changeLanguage(lang: string) {
  //   this.settings.language = lang;
  //   i18n.changeLanguage(lang.toLowerCase());
  // }

  log() {
    console.log(this.formatTime);
  }

  toggleTheme() {
    this.settings.interfaceTheme = this.settings.interfaceTheme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", this.settings.interfaceTheme === "dark");
  }

  // formatTime(timestamp: number) {
  //   return new Date(timestamp * 1000).toLocaleTimeString(this.settings.formatTime === "24-hour format" ? "uk-UA" : "en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //   });
  // }

  // setFormatTime() {
  //   currentWeatherStore.updateCurrentWeather;
  //   astronomyStore.updateAstronomyInfo;
  // }

  setSettings(key: string, value: string): void {
    this.settings[key] = value;
  }
}

export default new rootStore();
