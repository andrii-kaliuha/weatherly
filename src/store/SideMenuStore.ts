import { makeAutoObservable } from "mobx";

class SideMenuStore {
  isSideMenuVisible = false;
  isSelectSettingsVisible = false;
  currentSettings: string | null = null;

  settings = [
    {
      key: "temperature",
      options: ["Celsius", "Fahrenheit", "Kelvin"],
      selected: "Celsius",
      icon: "thermostat",
      title: "Temperature",
    },
    {
      key: "wind",
      options: ["m/s", "km/h", "mph"],
      selected: "m/s",
      icon: "air",
      title: "Wind speed",
    },
    {
      key: "pressure",
      options: ["hPa", "mmHg"],
      selected: "hPa",
      icon: "speed",
      title: "Pressure",
    },
    {
      key: "language",
      options: ["English", "Ukrainian"],
      selected: "English",
      icon: "translate",
      title: "Language",
    },
    {
      key: "interfaceTheme",
      options: ["Light", "Dark"],
      selected: "Dark",
      icon: "translate",
      title: "Interface theme",
    },
    {
      key: "formatTime",
      options: ["12-hour format", "24-hour format"],
      selected: "24-hour format",
      icon: "translate",
      title: "Time format",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

  toggleSettings() {
    this.isSelectSettingsVisible = !this.isSelectSettingsVisible;
  }

  updateSetting(key: string, value: string) {
    const setting = this.settings.find((s) => s.key === key);
    if (setting) {
      setting.selected = value;
    }
  }
}

export default new SideMenuStore();
