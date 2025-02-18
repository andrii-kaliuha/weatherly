import { makeAutoObservable } from "mobx";
import request from "./request";

type Settings = {
  temperatureUnit: any;
  windSpeedUnit: any;
  pressureUnit: any;
  language: any;
  theme: any;
  format: any;
  [key: string]: string;
};

class SettingStore {
  activeSettingKey: string | null = null;

  settings: Settings = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m/s",
    pressureUnit: "mmHg",
    language: "Ukrainian",
    theme: "Light",
    format: "24-hour format",
  };

  constructor() {
    makeAutoObservable(this);
  }

  settingsList = [
    {
      key: "temperatureUnit",
      icon: "thermostat",
      title: "Temperature",
      value: this.settings.temperatureUnit,
      options: ["celsius", "fahrenheit", "kelvin"],
      function: () => this.updateUnits(),
    },
    {
      key: "windSpeedUnit",
      icon: "air",
      title: "Wind speed",
      value: this.settings.windSpeedUnit,
      options: ["m/s", "km/h", "mph"],
      function: () => this.updateUnits(),
    },
    {
      key: "pressureUnit",
      icon: "speed",
      title: "Pressure",
      value: this.settings.pressureUnit,
      options: ["hPa", "mmHg"],
      function: () => this.updateUnits(),
    },
    {
      key: "language",
      icon: "translate",
      title: "Language",
      value: this.settings.language,
      options: ["English", "Ukrainian"],
      function: () => this.updateUnits(),
    },
    {
      key: "theme",
      icon: "dark_mode",
      title: "Interface theme",
      value: this.settings.theme,
      options: ["Light", "Dark"],
      function: () => console.log("theme"),
    },
    {
      key: "format",
      icon: "schedule",
      title: "Time format",
      value: this.settings.format,
      options: ["12-hour format", "24-hour format"],
      function: () => this.updateUnits(),
    },
  ];

  setActiveSettingKey(key: string) {
    this.activeSettingKey = key;
  }

  setSettings(key: string, value: string): void {
    this.settings[key] = value;
  }

  toggleTheme() {
    this.settings.theme = this.settings.theme === "light" ? "dark" : "light";
    if (this.settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  updateUnits() {
    request.updateForecast(request.forecast, request.airQuality, request.cityName, this.settings);
  }

  setSettingsList() {
    this.settingsList = this.settingsList.map((item) => {
      if (item.key === "temperatureUnit") {
        return { ...item, value: this.settings.temperatureUnit };
      }
      if (item.key === "windSpeedUnit") {
        return { ...item, value: this.settings.windSpeedUnit };
      }
      if (item.key === "pressureUnit") {
        return { ...item, value: this.settings.pressureUnit };
      }
      if (item.key === "language") {
        return { ...item, value: this.settings.language };
      }
      if (item.key === "theme") {
        return { ...item, value: this.settings.theme };
      }
      if (item.key === "format") {
        return { ...item, value: this.settings.format };
      }
      return item;
    });
  }
}

export default new SettingStore();
