import { observer } from "mobx-react-lite";
import SettingsStore from "../store/settings";
import { useState } from "react";
import { RadioButton, Icon } from "./ui";
import type {
  Language,
  PressureUnit,
  SettingOption,
  SettingProps,
  SettingSelectProps,
  TemperatureUnit,
  Theme,
  TimeFormat,
  WindSpeedUnit,
} from "../types";
import { useTranslation } from "react-i18next";

export const Settings = observer(() => {
  const { settings } = SettingsStore;

  return (
    <ul className="relative">
      <Setting
        icon="thermostat"
        title="temperature"
        value={settings.temperatureUnit}
        options={[
          { value: "celsius", title: "celsius" },
          { value: "fahrenheit", title: "fahrenheit" },
          { value: "kelvin", title: "kelvin" },
        ]}
        onChange={(value) => SettingsStore.setTemperatureUnit(value as TemperatureUnit)}
      />
      <Setting
        icon="air"
        title="wind_speed"
        value={settings.windSpeedUnit}
        options={[
          { value: "m_s", title: "m_s" },
          { value: "km_h", title: "km_h" },
          { value: "mph", title: "mph" },
        ]}
        onChange={(value) => SettingsStore.setWindSpeedUnit(value as WindSpeedUnit)}
      />
      <Setting
        icon="speed"
        title="pressure"
        value={settings.pressureUnit}
        options={[
          { value: "hPa", title: "hPa" },
          { value: "mmHg", title: "mmHg" },
        ]}
        onChange={(value) => SettingsStore.setPressureUnit(value as PressureUnit)}
      />
      <Setting
        icon="translate"
        title="language"
        value={settings.language}
        options={[
          { value: "en", title: "english" },
          { value: "uk", title: "ukrainian" },
        ]}
        onChange={(value) => SettingsStore.setLanguage(value as Language)}
      />
      <Setting
        icon="dark-mode"
        title="interface_theme"
        value={settings.theme}
        options={[
          { value: "light", title: "light" },
          { value: "dark", title: "dark" },
        ]}
        onChange={(value) => SettingsStore.setTheme(value as Theme)}
      />
      <Setting
        icon="schedule"
        title="time_format"
        value={settings.format}
        options={[
          { value: "12_hour", title: "12_hour" },
          { value: "24_hour", title: "24_hour" },
        ]}
        onChange={(value) => SettingsStore.setTimeFormat(value as TimeFormat)}
      />
    </ul>
  );
});

const Setting = observer(({ icon, title, value, options, onChange }: SettingProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <li className="flex flex-col justify-between items-center hover:bg-surface">
      <button className="flex justify-between items-center px-6 py-3 w-full" onClick={() => setIsSelectOpen(true)}>
        <div className="flex items-center gap-3">
          <Icon name={icon} width={24} height={24} />
          <div className="text-start text-sm">
            <p className="font-medium">{t(title)}</p>
            <p className="opacity-55">{t(value)}</p>
          </div>
        </div>
        <Icon name="chevron-right" width={24} height={24} />
      </button>

      {isSelectOpen && (
        <SettingSelect title={title} value={value} options={options} onChange={onChange} onClose={() => setIsSelectOpen(false)} />
      )}
    </li>
  );
});

const SettingSelect = observer(({ title, value, options, onClose, onChange }: SettingSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-0 z-3 flex flex-col gap-3 bg-background w-full h-full">
      <button className="flex items-center gap-3 hover:bg-surface px-6 py-3 w-full" onClick={onClose}>
        <Icon name="chevron-left" width={24} height={24} />
        {t(title)}
      </button>

      <div className="flex flex-col gap-3 px-6">
        {options.map((option: SettingOption) => {
          console.log("id:", value, "option.value:", option.value, "checked:", value === option.value);
          return (
            <label key={option.value} className="group flex items-center gap-3 cursor-pointer">
              <RadioButton checked={value === option.value} onChange={() => onChange(t(option.value))} />
              <span>{t(option.title)}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
});
