import SettingStore from "./store/settings";

export type SettingsProps = {
  temperatureUnit: string;
  windSpeedUnit: string;
  pressureUnit: string;
  language: string;
  theme: string;
  format: string;
};
export type Setting = { id: keyof SettingsProps; icon: string; title: string; value: string; options: SettingOption[] };
export type SettingOption = { title: string; value: string };

export type ButtonProps = { icon: string; label?: string; additionalClass?: string; onClick?: () => void };
export type RadioButtonProps = { checked?: boolean; onChange?: () => void };

export type SettingProps = { item: (typeof SettingStore.settingsList)[number] };
export type SettingSelectProps = { item: (typeof SettingStore.settingsList)[number]; onClose: () => void };

export type ForecastDay = {
  date: string;
  weekday: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;
};
