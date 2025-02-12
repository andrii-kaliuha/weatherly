import { makeAutoObservable } from "mobx";
import rootStore from "./rootStore";

class SettingStore {
  activeSettingKey: string | null = null;

  settingsList = [
    {
      key: "temperature",
      icon: "thermostat",
      title: "Temperature",
      value: "celsius",
      options: ["celsius", "fahrenheit", "kelvin"],
    },
    {
      key: "wind",
      icon: "air",
      title: "Wind speed",
      value: "m/s",
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
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setActiveSettingKey(key: string) {
    this.activeSettingKey = key;
  }

  //подумати над реалізацію передачі обєкта через props
  setSettingsList() {
    this.settingsList = this.settingsList.map((item) => {
      if (item.key === "temperature") {
        return { ...item, value: rootStore.settings.temperature };
      }
      if (item.key === "wind") {
        return { ...item, value: rootStore.settings.wind };
      }
      if (item.key === "pressure") {
        return { ...item, value: rootStore.settings.pressure };
      }
      if (item.key === "language") {
        return { ...item, value: rootStore.settings.language };
      }
      if (item.key === "interfaceTheme") {
        return { ...item, value: rootStore.settings.interfaceTheme };
      }
      if (item.key === "formatTime") {
        return { ...item, value: rootStore.settings.formatTime };
      }
      return item;
    });

    console.log(JSON.stringify(this.settingsList, null, 2));
  }
}

export default new SettingStore();
