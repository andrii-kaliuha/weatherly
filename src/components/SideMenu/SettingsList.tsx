import { observer } from "mobx-react-lite";
import SideMenuStore from "../../store/SideMenuStore";

const SettingsList = observer(() => {
  const { settingsList } = SideMenuStore;

  return (
    <ul>
      {settingsList.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            SideMenuStore.toggleSettings();
            SideMenuStore.setCurrentSettings(item.key);
          }}
          className="flex items-center justify-between hover:bg-surface"
        >
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

export { SettingsList };
