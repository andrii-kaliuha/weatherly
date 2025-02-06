import { makeAutoObservable, observable, action } from "mobx";

class SideMenuStore {
  isSideMenuVisible = false;
  isSettingsItemVisible = false;
  currentSettings: {
    key: string;
    icon: string;
    title: string;
    value: string;
    options: string[];
  } | null = null;

  settingsList = observable([
    {
      key: "temperature",
      icon: "thermostat",
      title: "Temperature",
      value: "Celsius",
      options: ["Celsius", "Fahrenheit", "Kelvin"],
    },
    {
      key: "wind",
      icon: "air",
      value: "m/s",
      title: "Wind speed",
      options: ["m/s", "km/h", "mph"],
    },
    {
      key: "pressure",
      icon: "speed",
      title: "Pressure",
      value: "hPa",
      options: ["hPa", "mmHg"],
    },
    {
      key: "language",
      icon: "translate",
      title: "Language",
      value: "English",
      options: ["English", "Ukrainian"],
    },
    {
      key: "interfaceTheme",
      icon: "dark_mode",
      title: "Interface theme",
      value: "Dark",
      options: ["Light", "Dark"],
    },
    {
      key: "formatTime",
      icon: "schedule",
      title: "Time format",
      value: "24-hour format",
      options: ["12-hour format", "24-hour format"],
    },
  ]);

  constructor() {
    makeAutoObservable(this, {
      setValue: action,
    });
  }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

  toggleSettings() {
    this.isSettingsItemVisible = !this.isSettingsItemVisible;
    console.log(this.isSettingsItemVisible);
  }

  setCurrentSettings(key: string) {
    const SettingItem = this.settingsList.find((item) => item.key === key);
    if (SettingItem) {
      this.currentSettings = SettingItem;
    }
  }

  setValue(value: string) {
    if (this.currentSettings) {
      this.currentSettings.value = value;
    }
  }

  get units() {
    const tempSetting = this.settingsList.find((s) => s.key === "temperature")?.value;

    if (tempSetting === "Celsius") return "metric";
    if (tempSetting === "Fahrenheit") return "imperial";
    return "standard";
  }
}

export default new SideMenuStore();
