import { makeAutoObservable } from "mobx";

class rootStore {
  isStartScreenVisible = true;
  isSideMenuVisible = false;
  isSettingVisible = false;

  settings = {
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
    this.isSettingVisible = !this.isSettingVisible;
  }

  convertTemperature(value: number): number | null {
    if (this.settings.temperature === "celsius") return Math.round(value);
    if (this.settings.temperature === "fahrenheit") return Math.round((value * 9) / 5 + 32);
    if (this.settings.temperature === "kelvin") return Math.round(value + 273.15);
    return null;
  }

  convertPressure(value: number): number | null {
    if (this.settings.pressure === "hPa") return Math.round(value);
    if (this.settings.pressure === "mmhg") return Math.round(value * 0.750061683);
    return null;
  }

  convertWindSpeed(value: number): number | null {
    if (this.settings.wind === "m/s") return Math.round(value);
    if (this.settings.wind === "mph") return Math.round(value * 2.236936);
    if (this.settings.wind === "km/h") return Math.round(value * 3.6);
    return null;
  }

  setSettings(key: keyof typeof this.settings, value: string): void {
    key in this.settings ? (this.settings[key] = value) : null;
    console.log(JSON.stringify(this.settings, null, 2));
  }
}

export default new rootStore();
