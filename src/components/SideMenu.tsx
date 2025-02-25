import { observer } from "mobx-react-lite";
import { Settings } from "./Settings";

type SideMenuProps = {
  sideMenu: boolean;
  toggleSideMenu: () => void;
};

export const SideMenu = observer(({ sideMenu, toggleSideMenu }: SideMenuProps) => {
  return (
    <div
      className="fixed top-0 left-0 bg-background text-on-surface sm:w-80 w-full h-full z-20 "
      style={{ display: sideMenu ? "block" : "none" }}
    >
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="./src/assets/images/logo.svg" alt="Weatherly logo" className="w-8 h-8" />
          <h1 className="text-[20px] font-bold leading-none">weatherly</h1>
        </div>

        <button
          className="flex justify-center items-center absolute right-3 h-12 w-12 rounded-full hover:bg-surface"
          onClick={() => toggleSideMenu()}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <Settings />
    </div>
  );
});
