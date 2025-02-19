import { makeAutoObservable } from "mobx";
import request from "./request";

type Settings = {
  temperatureUnit: string;
  windSpeedUnit: string;
  pressureUnit: string;
  language: string;
  theme: string;
  format: string;
};

type Setting = {
  id: keyof Settings;
  icon: string;
  title: string;
  value: string;
  options: string[];
};

class settingStore {
  settings: Settings = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m/s",
    pressureUnit: "mmHg",
    language: "Ukrainian",
    theme: "light",
    format: "24-hour format",
  };

  constructor() {
    makeAutoObservable(this);
  }

  settingsList: Setting[] = [
    {
      id: "temperatureUnit",
      icon: "thermostat",
      title: "Temperature",
      value: "celsius",
      options: ["celsius", "fahrenheit", "kelvin"],
    },
    {
      id: "windSpeedUnit",
      icon: "air",
      title: "Wind speed",
      value: "m/s",
      options: ["m/s", "km/h", "mph"],
    },
    {
      id: "pressureUnit",
      icon: "speed",
      title: "Pressure",
      value: "hPa",
      options: ["hPa", "mmHg"],
    },
    {
      id: "language",
      icon: "translate",
      title: "Language",
      value: "English",
      options: ["English", "Ukrainian"],
    },
    {
      id: "theme",
      icon: "dark_mode",
      title: "Interface theme",
      value: "light",
      options: ["light", "dark"],
    },
    {
      id: "format",
      icon: "schedule",
      title: "Time format",
      value: "12-hour format",
      options: ["12-hour format", "24-hour format"],
    },
  ];

  loadSettings() {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);

      document.documentElement.className = this.settings.theme;
    }
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  updateSetting(id: keyof Settings, value: string) {
    this.settings[id] = value;
    this.saveSettings();

    if (id === "theme") {
      document.documentElement.className = value;
    }
    request.updateForecast(request.forecast, request.airQuality, request.cityName, this.settings);
  }
}

export default new settingStore();
