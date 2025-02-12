import { observer } from "mobx-react-lite";
import SettingStore from "../store/SettingStore";
import rootStore from "../store/rootStore";

const Settings = observer(() => {
  if (rootStore.isSettingVisible && SettingStore.activeSettingKey !== null) {
    return <Setting settingKey={SettingStore.activeSettingKey} />;
  }
  return <SettingsList />;
});

export { Settings };

const click = (key: string) => {
  rootStore.toggleSetting();
  console.log(click);
  SettingStore.setActiveSettingKey(key);
};
const { settingsList } = SettingStore;

const SettingsList = observer(() => {
  return (
    <ul>
      {settingsList.map((item) => (
        <li key={item.key} onClick={() => click(item.key)} className="flex items-center justify-between hover:bg-surface">
          <button className="flex justify-between w-full items-center py-3 px-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              <div className="text-start text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{item.value}</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
      ))}
    </ul>
  );
});

type SettingProps = { settingKey: string };

const Setting: React.FC<SettingProps> = observer(({ settingKey }) => {
  type SettingKey = "temperature" | "wind" | "pressure" | "language" | "interfaceTheme" | "formatTime";

  const item = SettingStore.settingsList.find((setting) => setting.key === settingKey) as
    | { key: SettingKey; icon: string; title: string; value: string; options: string[] }
    | undefined;

  if (!item) return null;

  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => rootStore.toggleSetting()} className="flex items-center gap-3 hover:bg-surface px-6 py-3">
        <span className="material-symbols-outlined">chevron_left</span> {item.title}
      </button>
      <div className="flex flex-col gap-3 px-6">
        {item.options.map((option) => (
          <label key={option} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={item.key}
              value={option}
              checked={item.value === option}
              onChange={() => {
                rootStore.setSettings(item.key, option);
                SettingStore.setSettingsList();
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
