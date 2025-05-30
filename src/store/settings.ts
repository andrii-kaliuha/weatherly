import { makeAutoObservable } from "mobx";
import request from "./request";
import i18n from "../i18n";
import { t } from "i18next";
import type { SettingsProps, Setting } from "../types";

class settingStore {
  sideMenuOpen: boolean = false;
  settings: SettingsProps = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m_s",
    pressureUnit: "hPa",
    language: "english",
    theme: "dark",
    format: "12_hour",
  };

  constructor() {
    makeAutoObservable(this);
  }

  get settingsList(): Setting[] {
    return [
      {
        id: "temperatureUnit",
        icon: "thermostat",
        title: t("temperature"),
        value: t(this.settings.temperatureUnit),
        options: [
          { value: "celsius", title: t("celsius") },
          { value: "fahrenheit", title: t("fahrenheit") },
          { value: "kelvin", title: t("kelvin") },
        ],
      },
      {
        id: "windSpeedUnit",
        icon: "air",
        title: t("wind_speed"),
        value: t(this.settings.windSpeedUnit),
        options: [
          { value: "m_s", title: t("m_s") },
          { value: "km_h", title: t("km_h") },
          { value: "mph", title: t("mph") },
        ],
      },
      {
        id: "pressureUnit",
        icon: "speed",
        title: t("pressure"),
        value: t(this.settings.pressureUnit),
        options: [
          { value: "hPa", title: t("hPa") },
          { value: "mmHg", title: t("mmHg") },
        ],
      },
      {
        id: "language",
        icon: "translate",
        title: t("language"),
        value: t(this.settings.language),
        options: [
          { value: "english", title: t("english") },
          { value: "ukrainian", title: t("ukrainian") },
        ],
      },
      {
        id: "theme",
        icon: "dark_mode",
        title: t("interface_theme"),
        value: t(this.settings.theme),
        options: [
          { value: "light", title: t("light") },
          { value: "dark", title: t("dark") },
        ],
      },
      {
        id: "format",
        icon: "schedule",
        title: t("time_format"),
        value: t(this.settings.format),
        options: [
          { value: "12_hour", title: t("12_hour") },
          { value: "24_hour", title: t("24_hour") },
        ],
      },
    ];
  }

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    } else {
      this.saveSettings();
    }

    document.documentElement.className = this.settings.theme;

    const langCode = this.settings.language === "ukrainian" ? "uk" : "en";
    i18n.changeLanguage(langCode);
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  updateSetting(id: keyof SettingsProps, value: string) {
    this.settings[id] = value;
    this.saveSettings();

    if (id === "theme") {
      document.documentElement.className = value;
    }

    if (id === "language") {
      i18n.changeLanguage(value === "ukrainian" ? "uk" : "en");
    }

    if (request.local_names !== null) {
      request.updateForecast(request.forecast, request.airQuality, request.local_names, this.settings);
    }
  }
}

export default new settingStore();
