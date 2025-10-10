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

export type ButtonProps = { icon: string; label?: string; style?: string; onClick?: () => void };
export type RadioButtonProps = { checked?: boolean; onChange?: () => void };

export type SettingProps = { item: (typeof SettingStore.settingsList)[number] };
export type SettingSelectProps = { item: (typeof SettingStore.settingsList)[number]; onClose: () => void };

export type WeeklyForecastListProps = { theme: string; weeklyForecastList: WeeklyForecastItemProps[] };
export type WeeklyForecastItemProps = {
  date: string;
  weekday: string;
  icon: string;
  description: string;
  maxTemp: number;
  minTemp: number;
};

export type CircleProps = { color: string; aqi: number | null };
export type AirPollutantsListProps = { color: string; list: { name: string; value: number; icon: string }[] };

export type AstronomyIconProps = { style?: string; width: number; height: number; icon: string };
export type AstronomyDataItemProps = { icon: string; label: string; value: string | null };
