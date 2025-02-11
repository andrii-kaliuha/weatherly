import { makeAutoObservable, observable } from "mobx";

// type Settings = {
//   temperature: "celsius" | "fahrenheit" | "kelvin";
//   wind: "km/h" | "m/s";
//   pressure: "hPa" | "atm";
//   language: "English" | "Ukrainian" | "Spanish";
//   interfaceTheme: "Dark" | "Light";
//   formatTime: "12-hour format" | "24-hour format";
// };

class SettingStore {
  isSettingsItemVisible = false;

  currentSettings = {
    temperature: "celsius",
    wind: "km/h",
    pressure: "hPa",
    language: "English",
    interfaceTheme: "Light",
    formatTime: "24-hour format",
  };

  settingsList = observable([
    {
      key: "temperature",
      icon: "thermostat",
      title: "Temperature",
      value: this.currentSettings.temperature,
      options: ["celsius", "fahrenheit", "kelvin"],
    },
    {
      key: "wind",
      icon: "air",
      title: "Wind speed",
      value: this.currentSettings.wind,
      options: ["m/s", "km/h", "mph"],
    },
    {
      key: "pressure",
      icon: "speed",
      title: "Pressure",
      value: this.currentSettings.pressure,
      options: ["hPa", "mmHg"],
    },
    {
      key: "language",
      icon: "translate",
      title: "Language",
      value: this.currentSettings.language,
      options: ["English", "Ukrainian"],
    },
    {
      key: "interfaceTheme",
      icon: "dark_mode",
      title: "Interface theme",
      value: this.currentSettings.interfaceTheme,
      options: ["Light", "Dark"],
    },
    {
      key: "formatTime",
      icon: "schedule",
      title: "Time format",
      value: this.currentSettings.formatTime,
      options: ["12-hour format", "24-hour format"],
    },
  ]);

  constructor() {
    makeAutoObservable(this);
  }

  toggleSettings() {
    this.isSettingsItemVisible = !this.isSettingsItemVisible;
  }

  // setCurrentSettings(key: string) {
  //   this.currentSettings = this.settingsList.find((item) => item.key === key) || null;
  // }

  // setValue(value: string, key: any) {
  //   this.currentSettings ? (this.currentSettings.value = value) : null;
  //   rootStore.setSettings(key, value);

  // updateSetting(key: string, value: string) {
  //   // Тернарний оператор: перевіряємо чи існує ключ у об'єкті
  //   this.currentSettings.hasOwnProperty(key)
  //     ? (this.currentSettings[key] = value) // Якщо ключ існує, змінюємо значення
  //     : console.log(`Key '${key}' does not exist in settings.`); // Якщо ключ не знайдений, виводимо повідомлення
  // }

  setValue(key: keyof typeof this.currentSettings, value: string) {
    this.currentSettings[key] = value;
  }
}

export default new SettingStore();
