import { makeAutoObservable } from "mobx";
import i18n from "../shared/localization/i18n";
import requestStore from "./request/requestStore";
import type { SettingsState, TemperatureUnit, WindSpeedUnit, PressureUnit, Language, Theme, TimeFormat } from "../types";

class SettingsStore {
  sideMenuOpen: boolean = false;
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

  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  loadSettings() {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) this.settings = JSON.parse(savedSettings);
    else this.saveSettings();

    document.documentElement.className = this.settings.theme;

    const langCode = this.settings.language;
    i18n.changeLanguage(langCode);
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  private refreshForecast() {
    if (requestStore.local_names !== null) {
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
    i18n.changeLanguage(value);
    this.saveSettings();
    this.refreshForecast();
  }

  setTheme(value: Theme) {
    this.settings.theme = value;
    document.documentElement.className = value;
    this.saveSettings();
  }

  setTimeFormat(value: TimeFormat) {
    this.settings.format = value;
    this.saveSettings();
  }
}

export default new SettingsStore();
