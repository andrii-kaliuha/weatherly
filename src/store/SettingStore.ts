import { makeAutoObservable } from "mobx";
import rootStore from "./rootStore";

class SettingStore {
  activeSettingKey: string | null = null;

  settingsList = [
    {
      key: "temperature",
      icon: "thermostat",
      title: "Temperature",
      get value() {
        return rootStore.settings.temperature;
      },
      options: ["celsius", "fahrenheit", "kelvin"],
      // fun: rootStore.convertTemperature(),
      fun: rootStore.log,
    },
    {
      key: "wind",
      icon: "air",
      title: "Wind speed",
      get value() {
        return rootStore.settings.wind;
      },
      options: ["m/s", "km/h", "mph"],
      fun: rootStore.log,
    },
    {
      key: "pressure",
      icon: "speed",
      title: "Pressure",
      get value() {
        return rootStore.settings.pressure;
      },
      options: ["hPa", "mmHg"],
      fun: rootStore.log,
    },
    {
      key: "language",
      icon: "translate",
      title: "Language",
      get value() {
        return rootStore.settings.language;
      },
      options: ["English", "Ukrainian"],
      fun: rootStore.log,
    },
    {
      key: "interfaceTheme",
      icon: "dark_mode",
      title: "Interface theme",
      get value() {
        return rootStore.settings.interfaceTheme;
      },
      options: ["Light", "Dark"],
      fun: rootStore.log,
    },
    {
      key: "formatTime",
      icon: "schedule",
      title: "Time format",
      get value() {
        return rootStore.settings.formatTime;
      },
      options: ["12-hour format", "24-hour format"],
      fun: rootStore.log,
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

    // console.log(JSON.stringify(this.settingsList, null, 2));
  }
}

export default new SettingStore();
