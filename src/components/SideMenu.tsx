import { observer } from "mobx-react-lite";
import SideMenuStore from "../store/SideMenuStore";
import { useState } from "react";

const SideMenu = observer(() => {
  return (
    <div
      className="fixed top-0 left-0 bg-background text-on-surface md:w-[30vw] h-full z-20 "
      style={{
        display: SideMenuStore.isSideMenuVisible ? "block" : "none",
      }}
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="./src/assets/images/logo.svg" alt="Weatherly logo" className="w-8 h-8" />
          <h1 className="text-[20px] font-bold leading-none">weatherly</h1>
        </div>

        <button className="flex" onClick={() => SideMenuStore.toggleSideMenu()}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <Settings />
      <Footer />
    </div>
  );
});

export { SideMenu };

// const Settings = () => {
//   const settings = [
//     { icon: "thermostat", title: "Temperature", description: "Degree Celsius" },
//     { icon: "air", title: "Wind", description: "m/s" },
//     { icon: "speed", title: "Pressure", description: "hPa" },
//     { icon: "translate", title: "Language", description: "English" },
//     { icon: "dark_mode", title: "Interface theme", description: "Dark" },
//     { icon: "schedule", title: "Format time", description: "24-hour format" },
//   ];

//   return (
//     <ul>
//       {settings.map((item, index) => (
//         <li key={index} className="flex items-center justify-between hover:bg-surface py-3">
//           <div className="flex justify-between w-full items-center px-6">
//             <div className="flex items-center gap-3">
//               <span className="material-symbols-outlined">{item.icon}</span>
//               <div className="text-sm">
//                 <p className="font-medium">{item.title}</p>
//                 <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
//               </div>
//             </div>
//             <span className="material-symbols-outlined">chevron_right</span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

const Footer = () => {
  const titles = ["About us", "User Agreement", "Legal information"];

  return (
    <ul className="absolute bottom-0 text-[14px] pb-6 w-full">
      {titles.map((title, index) => (
        <li key={index}>
          <a className="px-6">{title}</a>
        </li>
      ))}
    </ul>
  );
};

// Тип для ключів налаштувань
type SettingKey = "temperature" | "wind" | "pressure" | "language" | "theme" | "timeFormat";

// Тип для користувацьких налаштувань
type UserPreferences = Record<SettingKey, string>;

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState<SettingKey | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    temperature: "°C",
    wind: "m/s",
    pressure: "hPa",
    language: "English",
    theme: "Dark",
    timeFormat: "24-hour format",
  });

  const handleSelect = (key: SettingKey, value: string) => {
    setUserPreferences((prev) => ({ ...prev, [key]: value }));
    setSelectedSetting(null); // Повертаємося до списку
  };

  return (
    <div className="p-4">
      {selectedSetting ? (
        <SettingOptions
          settingKey={selectedSetting}
          userPreferences={userPreferences}
          onSelect={handleSelect}
          onBack={() => setSelectedSetting(null)}
        />
      ) : (
        <SettingsList userPreferences={userPreferences} onSelectSetting={setSelectedSetting} />
      )}
    </div>
  );
};

export default Settings;

type SettingItem = {
  key: SettingKey;
  icon: string;
  title: string;
};

const settings: SettingItem[] = [
  { key: "temperature", icon: "thermostat", title: "Temperature" },
  { key: "wind", icon: "air", title: "Wind" },
  { key: "pressure", icon: "speed", title: "Pressure" },
  { key: "language", icon: "translate", title: "Language" },
  { key: "theme", icon: "dark_mode", title: "Interface theme" },
  { key: "timeFormat", icon: "schedule", title: "Format time" },
];

interface SettingsListProps {
  userPreferences: UserPreferences;
  onSelectSetting: (key: SettingKey) => void;
}

const SettingsList: React.FC<SettingsListProps> = ({ userPreferences, onSelectSetting }) => {
  return (
    <ul>
      {settings.map((item) => (
        <li
          key={item.key}
          className="flex items-center justify-between hover:bg-surface py-3 cursor-pointer"
          onClick={() => onSelectSetting(item.key)}
        >
          <div className="flex justify-between w-full items-center px-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              <div className="text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{userPreferences[item.key]}</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

// export default SettingsList;

const settingOptions: Record<SettingKey, string[]> = {
  temperature: ["°C", "°F", "K"],
  wind: ["m/s", "km/h", "mph"],
  pressure: ["hPa", "mmHg", "atm"],
  language: ["English", "Українська"],
  theme: ["Light", "Dark"],
  timeFormat: ["12-hour format", "24-hour format"],
};

interface SettingOptionsProps {
  settingKey: SettingKey;
  userPreferences: UserPreferences;
  onSelect: (key: SettingKey, value: string) => void;
  onBack: () => void;
}

const SettingOptions: React.FC<SettingOptionsProps> = ({ settingKey, userPreferences, onSelect, onBack }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-500">
        <span className="material-symbols-outlined">arrow_back</span> Back
      </button>
      <p className="font-medium text-lg mt-2">Change {settingKey.charAt(0).toUpperCase() + settingKey.slice(1)}</p>
      <div className="mt-4 space-y-3">
        {settingOptions[settingKey].map((option) => (
          <CustomRadio
            key={option}
            label={option}
            value={option}
            name={settingKey}
            checked={userPreferences[settingKey] === option}
            onChange={(value) => onSelect(settingKey, value)}
          />
        ))}
      </div>
    </div>
  );
};

// export default SettingOptions;

import React from "react";

interface CustomRadioProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ label, value, name, checked, onChange }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="hidden" />
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Зовнішнє коло при hover */}
        <div className="absolute w-6 h-6 rounded-full border border-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div>
        {/* Основне коло */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            checked ? "border-blue-500" : "border-gray-400"
          }`}
        >
          {/* Внутрішня точка, якщо вибрано */}
          {checked && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
        </div>
      </div>
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );
};

// export default CustomRadio;
