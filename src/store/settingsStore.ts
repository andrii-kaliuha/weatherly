import { makeAutoObservable } from "mobx";
import i18n from "../shared/localization/i18n";
import type { SettingsState, TemperatureUnit, WindSpeedUnit, PressureUnit, Language, Theme, TimeFormat } from "../shared/types/settings";

class SettingsStore {
  settings: SettingsState = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m_s",
    pressureUnit: "mmHg",
    language: "en",
    theme: "light",
    timeFormat: "24_hour",
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

  setTemperatureUnit(value: TemperatureUnit) {
    this.settings.temperatureUnit = value;
    this.saveSettings();
  }

  setWindSpeedUnit(value: WindSpeedUnit) {
    this.settings.windSpeedUnit = value;
    this.saveSettings();
  }

  setPressureUnit(value: PressureUnit) {
    this.settings.pressureUnit = value;
    this.saveSettings();
  }

  setLanguage(value: Language) {
    this.settings.language = value;
    this.applyLanguage(value);
    this.saveSettings();
  }

  setTheme(value: Theme) {
    this.settings.theme = value;
    this.applyTheme(value);
    this.saveSettings();
  }

  setTimeFormat(value: TimeFormat) {
    this.settings.timeFormat = value;
    this.saveSettings();
  }
}

export default new SettingsStore();
