import { observer } from "mobx-react-lite";
import SettingStore from "../store/SettingStore";
import { useState } from "react";

type SettingProps = {
  id: string;
  icon: string;
  title: string;
  value: string;
  options: string[];
  function?: any;
  toggleSetting?: () => void;
  isSelectVisible?: boolean;
};

export const Settings = observer(() => {
  return (
    <ul className="relative">
      {SettingStore.settingsList.map((item) => (
        <Setting
          key={item.key}
          id={item.key}
          icon={item.icon}
          title={item.title}
          value={item.value}
          function={item.function}
          options={item.options}
        />
      ))}
    </ul>
  );
});

const Setting = observer(({ id, icon, title, value, options }: SettingProps) => {
  const [isSelectVisible, setSelectVisible] = useState(false);

  const toggleSetting = () => {
    setSelectVisible((prev) => !prev);
  };

  return (
    <li className="flex flex-col items-center justify-between hover:bg-surface">
      <button className="flex justify-between w-full items-center py-3 px-6" onClick={toggleSetting}>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">{icon}</span>
          <div className="text-start text-sm">
            <p className="font-medium">{title}</p>
            <p className="text-gray-500 dark:text-gray-400">{value}</p>
          </div>
        </div>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {isSelectVisible && <SettingSelect id={id} icon={icon} title={title} value={value} options={options} toggleSetting={toggleSetting} />}
    </li>
  );
});

const SettingSelect = observer(({ id, title, value, options, toggleSetting }: SettingProps) => {
  return (
    <div className="absolute top-0 left-0 bg-background w-full h-full flex flex-col gap-3">
      <button onClick={toggleSetting} className="flex items-center gap-3 hover:bg-surface px-6 py-3 w-full">
        <span className="material-symbols-outlined">chevron_left</span> {title}
      </button>
      <div className="flex flex-col gap-3 px-6 py-3">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={id}
              value={option}
              checked={value === option}
              onChange={() => {
                SettingStore.setSettings(id, option);
                SettingStore.setSettingsList();
                SettingStore.updateUnits();
              }}
              className="cursor-pointer"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
