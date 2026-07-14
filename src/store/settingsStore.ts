import { makeAutoObservable } from "mobx";
import i18n from "../shared/localization/i18n";
import requestStore from "./request/requestStore";
import type { SettingsState, TemperatureUnit, WindSpeedUnit, PressureUnit, Language, Theme, TimeFormat } from "../shared/types/settings";

class SettingsStore {
  settings: SettingsState = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m_s",
    pressureUnit: "mmHg",
    language: "en",
    theme: "light",
    format: "24_hour",
  };

  constructor() {
    makeAutoObservable(this);
  }

  loadSettings() {
    const saved = localStorage.getItem("settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        this.settings = { ...this.settings, ...parsed };
      } catch (e) {
        console.error("Failed to parse settings from localStorage", e);
        this.saveSettings();
      }

      this.applyTheme(this.settings.theme);
      this.applyLanguage(this.settings.language);
    } else {
      this.saveSettings();
    }
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  private applyTheme(theme: string) {
    document.documentElement.className = theme;
  }

  private applyLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  private refreshForecast() {
    if (requestStore.local_names !== null && requestStore.forecast !== null && requestStore.airQuality !== null) {
      requestStore.updateForecast(requestStore.forecast, requestStore.airQuality, requestStore.local_names, this.settings);
    }
  }

  setTemperatureUnit(value: TemperatureUnit) {
    this.settings.temperatureUnit = value;
    this.saveSettings();
    this.refreshForecast();
  }

  setWindSpeedUnit(value: WindSpeedUnit) {
    this.settings.windSpeedUnit = value;
    this.saveSettings();
    this.refreshForecast();
  }

  setPressureUnit(value: PressureUnit) {
    this.settings.pressureUnit = value;
    this.saveSettings();
    this.refreshForecast();
  }

  setLanguage(value: Language) {
    this.settings.language = value;
    this.applyLanguage(value);
    this.saveSettings();
    this.refreshForecast();
  }

  setTheme(value: Theme) {
    this.settings.theme = value;
    this.applyTheme(value);
    this.saveSettings();
    this.refreshForecast();
  }

  setTimeFormat(value: TimeFormat) {
    this.settings.format = value;
    this.saveSettings();
    this.refreshForecast();
  }
}

export default new SettingsStore();
