import { observer } from "mobx-react-lite";
import SideMenuStore from "../../store/SideMenuStore";

const SideMenu = observer(() => {
  const titles = ["About us", "User Agreement", "Legal information"];

  return (
    <div
      className="fixed top-0 left-0 bg-background text-on-surface md:w-[30vw] h-full z-20 "
      style={{
        display: SideMenuStore.isSideMenuVisible ? "block" : "none",
      }}
    >
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="./src/assets/images/logo.svg" alt="Weatherly logo" className="w-8 h-8" />
          <h1 className="text-[20px] font-bold leading-none">weatherly</h1>
        </div>

        <button
          className="flex justify-center items-center absolute right-3 h-12 w-12 rounded-full hover:bg-surface"
          onClick={() => SideMenuStore.toggleSideMenu()}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <Settings />

      <ul className="absolute bottom-0 text-[14px] pb-6">
        {titles.map((title, index) => (
          <li key={index}>
            <a className="px-6">{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
});

export { SideMenu };

const Settings = () => {
  const { settings } = SideMenuStore;

  return (
    <ul>
      {settings.map((item, index) => (
        <li key={index} className="flex items-center justify-between hover:bg-surface">
          <button className="flex justify-between w-full items-center py-3 px-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              <div className="text-start text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{item.selected}</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export { Settings };
