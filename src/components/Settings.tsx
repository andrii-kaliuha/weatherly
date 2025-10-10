import { observer } from "mobx-react-lite";
import SettingStore from "../store/settings";
import { useState } from "react";
import { RadioButton, SVG } from "./ui";
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
    <li className="flex flex-col justify-between items-center hover:bg-surface">
      <button className="flex justify-between items-center px-6 py-3 w-full" onClick={() => setIsSelectOpen(true)}>
        <div className="flex items-center gap-3">
          <SVG name={item.icon} width={24} height={24} />
          <div className="text-start text-sm">
            <p className="font-medium">{item.title}</p>
            <p className="opacity-55">{item.value}</p>
          </div>
        </div>
        <SVG name="chevron-right" width={24} height={24} />
      </button>

      {isSelectOpen && <SettingSelect item={item} onClose={() => setIsSelectOpen(false)} />}
    </li>
  );
});

const SettingSelect = observer(({ item, onClose }: SettingSelectProps) => {
  return (
    <div className="absolute top-0 left-0 z-3 flex flex-col gap-3 bg-background w-full h-full">
      <button className="flex items-center gap-3 hover:bg-surface px-6 py-3 w-full" onClick={onClose}>
        <SVG name="chevron-left" width={24} height={24} />
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
