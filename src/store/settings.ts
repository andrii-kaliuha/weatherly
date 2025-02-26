import { makeAutoObservable } from "mobx";
import request from "./request";
import i18n from "../i18n";

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
  sideMenuOpen: boolean = false;
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
      icon: "thermometer",
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
      value: "Ukrainian",
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

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);

      document.documentElement.className = this.settings.theme;

      const langCode = this.settings.language === "Ukrainian" ? "uk" : "en";
      i18n.changeLanguage(langCode);
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

    if (id === "language") {
      i18n.changeLanguage(value === "Ukrainian" ? "uk" : "en");
    }

    if (request.local_names !== null) {
      request.updateForecast(request.forecast, request.airQuality, request.local_names, this.settings);
    }
  }
}

export default new settingStore();
