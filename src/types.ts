export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";
export type WindSpeedUnit = "m_s" | "km_h" | "mph";
export type PressureUnit = "hPa" | "mmHg";
export type Language = "en" | "uk";
export type Theme = "light" | "dark";
export type TimeFormat = "12_hour" | "24_hour";

export type SettingsState = {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  pressureUnit: PressureUnit;
  language: Language;
  theme: Theme;
  format: TimeFormat;
};

export type SettingOption = { title: string; value: string };

export type SettingProps = {
  icon: string;
  title: string;
  value: string;
  options: SettingOption[];
  onChange: (value: string) => void;
};

export type SettingSelectProps = {
  title: string;
  value: string;
  options: SettingOption[];
  onClose: () => void;
  onChange: (value: string) => void;
};

export type ButtonProps = { icon: string; label?: string; style?: string; onClick?: () => void };
export type RadioButtonProps = { checked?: boolean; onChange?: () => void };

export type WeeklyForecastListProps = { theme: string; weeklyForecastList: WeeklyForecastItemProps[] };
export type WeeklyForecastItemProps = {
  dateISO: string;
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
