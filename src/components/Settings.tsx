import { observer } from "mobx-react-lite";
import SettingStore from "../store/settings";
import { useState } from "react";
import { RadioButton } from "./ui";
import type { SettingProps, SettingSelectProps } from "../types";

export const Settings = observer(() => {
  return (
    <ul className="relative">
      {SettingStore.settingsList.map((item) => (
        <Setting key={item.id} item={item} />
      ))}
    </ul>
  );
});

const Setting = observer(({ item }: SettingProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  return (
    <li className="flex flex-col items-center justify-between hover:bg-surface">
      <button className="flex justify-between w-full items-center py-3 px-6" onClick={() => setIsSelectOpen(true)}>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">{item.icon}</span>
          <div className="text-start text-sm">
            <p className="font-medium">{item.title}</p>
            <p className="text-gray-500 dark:text-gray-400">{item.value}</p>
          </div>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {isSelectOpen && <SettingSelect item={item} onClose={() => setIsSelectOpen(false)} />}
    </li>
  );
});

const SettingSelect = observer(({ item, onClose }: SettingSelectProps) => {
  return (
    <div className="absolute top-0 left-0 bg-background w-full h-full flex flex-col gap-3">
      <button className="flex items-center gap-3 hover:bg-surface px-6 py-3 w-full" onClick={onClose}>
        <span className="material-symbols-outlined">chevron_left</span>
        {item.title}
      </button>

      <div className="flex flex-col gap-3 px-6">
        {item.options.map((option) => (
          <label key={option.value} className="group flex items-center gap-3 cursor-pointer">
            <RadioButton
              checked={SettingStore.settings[item.id] === option.value}
              onChange={() => SettingStore.updateSetting(item.id, option.value)}
            />
            <span>{option.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
