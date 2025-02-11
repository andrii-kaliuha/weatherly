//API_KEY to env
//переробити структуру проекту
//переробити структуру компонентів
//Київ прибрати з стандартного вибору міст
//додати функціонал переключення мови за допомогою i18next
//додати історію запитів через input
//додати можливість добавляти міста в вибране
//додати About us User Agreement Legal information
//зміна одиниць вимірювання
// зміна теми
// add AQI Popup

// const RadioButton = () => {
//   return (
//     <div className="relative group">
//       <div className="h-6 w-6 border-[3px] border-on-surface opacity-0 rounded-full group-hover:opacity-100"></div>
//       <div className="absolute top-1/2 left-1/2 bg-on-surface h-3 w-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
//     </div>
//   );
// };

// export { RadioButton };

//  className="fixed top-0 left-0 bg-background text-on-surface w-[320px] h-full z-20 " тут можливо 30vw але треба буде ще обдумати це
//дизайн about us буду робити схожим на https://gemini.google.com/updates

// type Settings = {
//   temperature: "celsius" | "fahrenheit" | "kelvin";
//   wind: "km/h" | "m/s";
//   pressure: "hPa" | "atm";
//   language: "English" | "Ukrainian" | "Spanish";
//   interfaceTheme: "Dark" | "Light";
//   formatTime: "12-hour format" | "24-hour format";
// };

// import { makeAutoObservable, observable, action } from "mobx";
// import rootStore from "../rootStore";

// class SettingStore {
//   isSettingsItemVisible = false;
//   currentSettings: {
//     key: string;
//     icon: string;
//     title: string;
//     value: string;
//     options: string[];
//   } | null = null;

//   settingsList = observable([
//     {
//       key: "temperature",
//       icon: "thermostat",
//       title: "Temperature",
//       value: "celsius",
//       options: ["celsius", "fahrenheit", "kelvin"],
//     },
//     {
//       key: "wind",
//       icon: "air",
//       title: "Wind speed",
//       value: "m/s",
//       options: ["m/s", "km/h", "mph"],
//     },
//     {
//       key: "pressure",
//       icon: "speed",
//       title: "Pressure",
//       value: "hPa",
//       options: ["hPa", "mmHg"],
//     },
//     {
//       key: "language",
//       icon: "translate",
//       title: "Language",
//       value: "English",
//       options: ["English", "Ukrainian"],
//     },
//     {
//       key: "interfaceTheme",
//       icon: "dark_mode",
//       title: "Interface theme",
//       value: "Dark",
//       options: ["Light", "Dark"],
//     },
//     {
//       key: "formatTime",
//       icon: "schedule",
//       title: "Time format",
//       value: "24-hour format",
//       options: ["12-hour format", "24-hour format"],
//     },
//   ]);

//   constructor() {
//     makeAutoObservable(this, {
//       setValue: action,
//     });
//   }

//   toggleSettings() {
//     this.isSettingsItemVisible = !this.isSettingsItemVisible;
//   }

//   setCurrentSettings(key: string) {
//     this.currentSettings = this.settingsList.find((item) => item.key === key) || null;
//   }

//   setValue(value: string, key: any) {
//     this.currentSettings ? (this.currentSettings.value = value) : null;
//     rootStore.setSettings(key, value);
//   }
// }

// export default new SettingStore();

// import React from "react";

// type RadioButtonProps = {
//   item: string | undefined;
//   value: string;
//   onChange: (value: string) => void;
// };

// const RadioButton: React.FC<RadioButtonProps> = ({ item, value, onChange }) => {
//   if (!item) return null;

//   return (
//     <div className="relative group">
//       <input
//         type="radio"
//         name="custom-radio"
//         value={item}
//         checked={value === item}
//         onChange={() => onChange(item)}
//         className="absolute opacity-0"
//       />
//       <div className="h-6 w-6 border-2 border-gray-500 rounded-full relative">
//         <div
//           className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 h-3 w-3 rounded-full
//             ${value === item ? "opacity-100" : "opacity-0"}`}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export { RadioButton };
